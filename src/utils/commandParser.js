import { storyTree } from '../data/storyTree';

// Command parser for terminal input
export function parseCommand(input, gamePhase, currentNode) {
  const cmd = input.trim().toLowerCase();

  if (gamePhase === 'welcome') {
    return { type: 'ADVANCE_STORY' };
  }

  if (gamePhase === 'story') {
    const node = storyTree[currentNode];
    if (!node) return { type: 'INVALID', message: 'Something went wrong.' };

    // Node with choices — accept "1", "2", "3" or the choice text
    if (node.choices) {
      // Try numeric input
      const num = parseInt(cmd, 10);
      if (num >= 1 && num <= node.choices.length) {
        return { type: 'CHOOSE', choiceIndex: num - 1 };
      }

      // Try matching choice text (case-insensitive partial match)
      for (let i = 0; i < node.choices.length; i++) {
        if (node.choices[i].text.toLowerCase().includes(cmd) && cmd.length >= 3) {
          return { type: 'CHOOSE', choiceIndex: i };
        }
      }

      if (cmd === 'help') {
        const options = node.choices.map((c, i) => `${i + 1}. ${c.text}`).join(', ');
        return { type: 'HELP', message: `Choose: ${options}` };
      }

      return {
        type: 'INVALID',
        message: `Enter ${node.choices.map((_, i) => i + 1).join(', ')} to choose.`
      };
    }

    // Linear node (next) or combat node — any input continues
    if (node.next || node.combat) {
      return { type: 'CONTINUE' };
    }

    return { type: 'INVALID', message: 'Something went wrong.' };
  }

  if (gamePhase === 'ended') {
    if (['reset', 'restart', 'start over', 'start', 'again'].includes(cmd)) {
      return { type: 'RESET' };
    }
    return { type: 'INVALID', message: 'Game over. Type "reset" to play again.' };
  }

  return { type: 'INVALID', message: 'Unknown command.' };
}
