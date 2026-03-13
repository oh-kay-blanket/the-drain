import { useReducer } from 'react';
import { welcomeMessage } from '../data/story';
import { storyTree } from '../data/storyTree';

const initialState = {
  phase: 'welcome', // 'welcome' | 'story' | 'ended'
  currentNode: 'start',
  outputLines: welcomeMessage.map((line, i) => ({ id: `welcome-${i}`, ...line })),
  isTyping: true,
  awaitingInput: false,
  skipTyping: 0
};

function getNodeLines(node, nodeId, timestamp) {
  const lines = [];

  // Main story text
  if (node.text) {
    lines.push({
      id: `story-${nodeId}-${timestamp}`,
      text: node.text,
      speed: node.speed
    });
  }

  // If this is an ending node, show the ending title and reset instruction
  if (node.ending) {
    lines.push({
      id: `ending-title-${timestamp}`,
      text: `— ${node.ending.title} —`,
      speed: 25
    });
    lines.push({
      id: `reset-instruction-${timestamp}`,
      text: '["reset" to play again]',
      speed: 18
    });
  }
  // If this has choices, show each as its own line
  else if (node.choices) {
    node.choices.forEach((c, i) => {
      lines.push({
        id: `choice-${nodeId}-${i}-${timestamp}`,
        text: `${i + 1}. ${c.text}`,
        speed: 12
      });
    });
  }
  // If this has a combat moment, show the action text
  else if (node.combat) {
    // Combat resolves automatically — no prompt needed, but we show a
    // "press Enter" hint since the outcome appears on CONTINUE
    lines.push({
      id: `combat-hint-${timestamp}`,
      text: '[Enter to continue]',
      speed: 18
    });
  }
  // If this is a linear node with next, show continue prompt
  else if (node.next) {
    lines.push({
      id: `continue-${nodeId}-${timestamp}`,
      text: '[Enter to continue]',
      speed: 18
    });
  }

  return lines;
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'TYPING_COMPLETE': {
      const lastTypingLine = [...state.outputLines]
        .reverse()
        .find(line => !line.isHealthStats && !line.isUserInput && !line.isArt);
      const allLinesTyped = action.lineId === lastTypingLine?.id;
      return {
        ...state,
        isTyping: !allLinesTyped,
        awaitingInput: allLinesTyped
      };
    }

    case 'ADVANCE_STORY': {
      const userInputLine = {
        id: `input-${Date.now()}`,
        text: action.userInput || '',
        speed: 0,
        isUserInput: true
      };

      if (state.phase === 'welcome') {
        const ts = Date.now();
        const node = storyTree['start'];
        const nodeLines = getNodeLines(node, 'start', ts);

        return {
          ...state,
          phase: 'story',
          currentNode: 'start',
          outputLines: [...state.outputLines, userInputLine, ...nodeLines],
          isTyping: true,
          awaitingInput: false
        };
      }
      return state;
    }

    case 'CONTINUE': {
      const userInputLine = {
        id: `input-${Date.now()}`,
        text: action.userInput || '',
        speed: 0,
        isUserInput: true
      };

      const currentNode = storyTree[state.currentNode];
      if (!currentNode) return state;

      const ts = Date.now();

      // Combat node — resolve RNG
      if (currentNode.combat) {
        const roll = Math.random();
        const hit = roll < currentNode.combat.hitChance;
        const resultText = hit ? currentNode.combat.hitText : currentNode.combat.missText;
        const nextId = hit ? currentNode.combat.hitNext : currentNode.combat.missNext;
        const nextNode = storyTree[nextId];

        // Build lines: combat result text
        const combatLines = [{
          id: `combat-result-${ts}`,
          text: resultText,
          speed: 28
        }];

        // Then show the next node (which may be an ending or have further content)
        if (nextNode) {
          combatLines.push(...getNodeLines(nextNode, nextId, ts + 1));
        }

        return {
          ...state,
          phase: nextNode?.ending ? 'ended' : 'story',
          currentNode: nextId,
          outputLines: [...state.outputLines, userInputLine, ...combatLines],
          isTyping: true,
          awaitingInput: false
        };
      }

      // Linear node — advance to next
      if (currentNode.next) {
        const nextId = currentNode.next;
        const nextNode = storyTree[nextId];
        if (!nextNode) return state;

        const nodeLines = getNodeLines(nextNode, nextId, ts);
        return {
          ...state,
          phase: nextNode.ending ? 'ended' : 'story',
          currentNode: nextId,
          outputLines: [...state.outputLines, userInputLine, ...nodeLines],
          isTyping: true,
          awaitingInput: false
        };
      }

      return state;
    }

    case 'CHOOSE': {
      const userInputLine = {
        id: `input-${Date.now()}`,
        text: action.userInput || '',
        speed: 0,
        isUserInput: true
      };

      const currentNode = storyTree[state.currentNode];
      if (!currentNode?.choices) return state;

      const choiceIndex = action.choiceIndex;
      if (choiceIndex < 0 || choiceIndex >= currentNode.choices.length) return state;

      const nextId = currentNode.choices[choiceIndex].next;
      const nextNode = storyTree[nextId];
      if (!nextNode) return state;

      const ts = Date.now();
      const nodeLines = getNodeLines(nextNode, nextId, ts);

      return {
        ...state,
        phase: nextNode.ending ? 'ended' : 'story',
        currentNode: nextId,
        outputLines: [...state.outputLines, userInputLine, ...nodeLines],
        isTyping: true,
        awaitingInput: false
      };
    }

    case 'INVALID_COMMAND':
      return {
        ...state,
        outputLines: [...state.outputLines, {
          id: `error-${Date.now()}`,
          text: action.message,
          speed: 18
        }],
        isTyping: true,
        awaitingInput: false
      };

    case 'HELP':
      return {
        ...state,
        outputLines: [...state.outputLines, {
          id: `help-${Date.now()}`,
          text: action.message,
          speed: 18
        }],
        isTyping: true,
        awaitingInput: false
      };

    case 'SKIP_TYPING':
      return {
        ...state,
        skipTyping: state.skipTyping + 1
      };

    case 'RESET': {
      // Save ending title to localStorage for tracking
      const currentNode = storyTree[state.currentNode];
      if (currentNode?.ending) {
        try {
          const endings = JSON.parse(localStorage.getItem('drain_endings') || '[]');
          if (!endings.includes(currentNode.ending.title)) {
            endings.push(currentNode.ending.title);
            localStorage.setItem('drain_endings', JSON.stringify(endings));
          }
        } catch {
          // localStorage not available, ignore
        }
      }

      return {
        ...initialState,
        outputLines: initialState.outputLines.map((line, i) => ({
          ...line,
          id: `welcome-${i}-${Date.now()}`
        }))
      };
    }

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return { state, dispatch };
}
