import { useReducer } from 'react';
import { storySegments, welcomeMessage } from '../data/story';
import { calculateFightOutcome, calculateRunOutcome, getVictoryMessage, getDeathMessage } from '../data/combat';

const initialState = {
  phase: 'welcome', // 'welcome' | 'intro' | 'combat' | 'ended'
  storyIndex: 0,
  creatureHealth: 10,
  playerHealth: 10,
  outputLines: welcomeMessage.map((line, i) => ({ id: `welcome-${i}`, ...line })),
  isTyping: true,
  awaitingInput: false,
  firstStrike: true,
  skipTyping: 0 // Counter to trigger skip
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'TYPING_COMPLETE':
      // Check if all lines have completed typing
      // Find the last line that actually needs typing (not healthStats, not userInput)
      const lastTypingLine = [...state.outputLines]
        .reverse()
        .find(line => !line.isHealthStats && !line.isUserInput);
      const allLinesTyped = action.lineId === lastTypingLine?.id;
      return {
        ...state,
        isTyping: !allLinesTyped,
        awaitingInput: allLinesTyped
      };

    case 'SKIP_INTRO':
      // Type out all remaining story segments very fast
      const userSkipLine = {
        id: `input-${Date.now()}`,
        text: 'skip',
        speed: 0,
        isUserInput: true
      };

      const remainingStoryLines = storySegments
        .slice(state.storyIndex)
        .map((segment, i) => ({
          id: `story-${state.storyIndex + i}`,
          text: segment.text,
          speed: 5 // Very fast typing
        }));

      const healthLine = {
        id: `health-${Date.now()}`,
        text: '',
        speed: 0,
        isHealthStats: true
      };

      const combatInstructionLine = {
        id: `combat-instruction-${Date.now()}`,
        text: '["fight" to attack or "run" to flee]',
        speed: 30
      };

      return {
        ...state,
        phase: 'combat',
        storyIndex: storySegments.length,
        outputLines: [...state.outputLines, userSkipLine, ...remainingStoryLines, healthLine, combatInstructionLine],
        isTyping: true,
        awaitingInput: false
      };

    case 'ADVANCE_STORY':
      // Add user input echo
      const userInputLine = {
        id: `input-${Date.now()}`,
        text: action.userInput || '',
        speed: 0,
        isUserInput: true
      };

      if (state.phase === 'welcome') {
        // Start the actual story
        const firstStoryLine = { id: `story-0`, ...storySegments[0] };
        const instructionLine = {
          id: `instruction-0`,
          text: '[Enter to continue or "skip" to skip]',
          speed: 30
        };
        return {
          ...state,
          phase: 'intro',
          storyIndex: 1,
          outputLines: [...state.outputLines, userInputLine, firstStoryLine, instructionLine],
          isTyping: true,
          awaitingInput: false
        };
      } else if (state.phase === 'intro' && state.storyIndex < storySegments.length) {
        // Continue story
        const nextLine = { id: `story-${state.storyIndex}`, ...storySegments[state.storyIndex] };
        const newIndex = state.storyIndex + 1;

        if (newIndex >= storySegments.length) {
          // Story complete, start combat - add health stats and combat instruction
          const healthLine = {
            id: `health-${Date.now()}`,
            text: '',
            speed: 0,
            isHealthStats: true
          };
          const combatInstructionLine = {
            id: `combat-instruction-${Date.now()}`,
            text: '["fight" to attack or "run" to flee]',
            speed: 30
          };
          return {
            ...state,
            phase: 'combat',
            storyIndex: newIndex,
            outputLines: [...state.outputLines, userInputLine, nextLine, healthLine, combatInstructionLine],
            isTyping: true,
            awaitingInput: false
          };
        }

        const instructionLine = {
          id: `instruction-${newIndex}`,
          text: '[Enter to continue or "skip" to skip]',
          speed: 30
        };

        return {
          ...state,
          storyIndex: newIndex,
          outputLines: [...state.outputLines, userInputLine, nextLine, instructionLine],
          isTyping: true,
          awaitingInput: false
        };
      }
      return state;

    case 'FIGHT': {
      const outcome = calculateFightOutcome(state.firstStrike);
      const newCreatureHealth = Math.max(0, state.creatureHealth - outcome.creatureDamage);
      const newPlayerHealth = Math.max(0, state.playerHealth - outcome.playerDamage);

      const userInput = {
        id: `input-${Date.now()}`,
        text: action.userInput || 'fight',
        speed: 0,
        isUserInput: true
      };

      const combatResult = {
        id: `combat-${Date.now()}`,
        text: outcome.message,
        speed: outcome.speed
      };

      const healthUpdate = {
        id: `health-${Date.now() + 1}`,
        text: '',
        speed: 0,
        isHealthStats: true
      };

      const newLines = [...state.outputLines, userInput, combatResult, healthUpdate];

      // Check for victory
      if (newCreatureHealth <= 0) {
        const victoryMsg = getVictoryMessage();
        const resetInstruction = {
          id: `reset-instruction-${Date.now()}`,
          text: '["reset" to play again]',
          speed: 30
        };
        return {
          ...state,
          phase: 'ended',
          creatureHealth: 0,
          playerHealth: newPlayerHealth,
          outputLines: [...newLines, {
            id: `victory-${Date.now()}`,
            text: victoryMsg.message,
            speed: victoryMsg.speed
          }, resetInstruction],
          isTyping: true,
          awaitingInput: false,
          firstStrike: false
        };
      }

      // Check for death (took second hit)
      if (newPlayerHealth <= 0) {
        const deathMsg = getDeathMessage();
        const resetInstruction = {
          id: `reset-instruction-${Date.now()}`,
          text: '["reset" to try again]',
          speed: 30
        };
        return {
          ...state,
          phase: 'ended',
          creatureHealth: newCreatureHealth,
          playerHealth: 0,
          outputLines: [...newLines, {
            id: `death-${Date.now()}`,
            text: deathMsg.message,
            speed: deathMsg.speed
          }, resetInstruction],
          isTyping: true,
          awaitingInput: false,
          firstStrike: false
        };
      }

      const combatInstruction = {
        id: `combat-instruction-${Date.now()}`,
        text: '["fight" to attack or "run" to flee]',
        speed: 30
      };

      return {
        ...state,
        creatureHealth: newCreatureHealth,
        playerHealth: newPlayerHealth,
        outputLines: [...newLines, combatInstruction],
        isTyping: true,
        awaitingInput: false,
        firstStrike: false
      };
    }

    case 'RUN': {
      const outcome = calculateRunOutcome();
      const newPlayerHealth = Math.max(0, state.playerHealth - outcome.playerDamage);

      const userInput = {
        id: `input-${Date.now()}`,
        text: action.userInput || 'run',
        speed: 0,
        isUserInput: true
      };

      const resetInstruction = {
        id: `reset-instruction-${Date.now()}`,
        text: '["reset" to play again]',
        speed: 30
      };

      return {
        ...state,
        phase: 'ended',
        playerHealth: newPlayerHealth,
        outputLines: [...state.outputLines, userInput, {
          id: `run-${Date.now()}`,
          text: outcome.message,
          speed: outcome.speed
        }, resetInstruction],
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
          speed: 30
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
          speed: 30
        }],
        isTyping: true,
        awaitingInput: false
      };

    case 'SKIP_TYPING':
      return {
        ...state,
        skipTyping: state.skipTyping + 1
      };

    case 'RESET':
      return {
        ...initialState,
        outputLines: initialState.outputLines.map((line, i) => ({ ...line, id: `welcome-${i}-${Date.now()}` }))
      };

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return { state, dispatch };
}
