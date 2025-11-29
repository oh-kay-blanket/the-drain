// Command parser for terminal input
export function parseCommand(input, gamePhase) {
  const cmd = input.trim().toLowerCase();

  if (gamePhase === 'welcome' || gamePhase === 'intro') {
    // Any input advances story during intro
    return { type: 'ADVANCE_STORY' };
  }

  if (gamePhase === 'combat') {
    // Fight synonyms
    if (['fight', 'attack', 'f', 'strike', 'hit', 'stab'].includes(cmd)) {
      return { type: 'FIGHT' };
    }
    // Run synonyms
    if (['run', 'flee', 'r', 'escape', 'run away', 'runaway'].includes(cmd)) {
      return { type: 'RUN' };
    }
    // Help command
    if (cmd === 'help') {
      return { type: 'HELP', message: 'Available commands: fight, run' };
    }
    // Invalid command
    return { type: 'INVALID', message: 'Invalid command. Try "fight" or "run".' };
  }

  if (gamePhase === 'ended') {
    if (['reset', 'restart', 'start over', 'start', 'again'].includes(cmd)) {
      return { type: 'RESET' };
    }
    return { type: 'INVALID', message: 'Game over. Type "reset" to play again.' };
  }

  return { type: 'INVALID', message: 'Unknown command.' };
}
