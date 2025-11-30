import { useGameState } from './hooks/useGameState';
import { TerminalContainer } from './components/Terminal/TerminalContainer';
import { parseCommand } from './utils/commandParser';
import './App.css';

function App() {
  const { state, dispatch } = useGameState();

  const handleLineComplete = (lineId) => {
    dispatch({ type: 'TYPING_COMPLETE', lineId });
  };

  const handleCommand = (input) => {
    // Check for "skip" command during intro
    if (state.phase === 'intro' && input.trim().toLowerCase() === 'skip') {
      dispatch({ type: 'SKIP_INTRO' });
      return;
    }

    // If currently typing, skip to end of current line
    if (state.isTyping) {
      console.log('Skipping - isTyping:', state.isTyping, 'skipTyping:', state.skipTyping);
      dispatch({ type: 'SKIP_TYPING' });
      return;
    }

    const command = parseCommand(input, state.phase);

    switch (command.type) {
      case 'ADVANCE_STORY':
        dispatch({ type: 'ADVANCE_STORY', userInput: input });
        break;
      case 'FIGHT':
        dispatch({ type: 'FIGHT', userInput: input });
        break;
      case 'RUN':
        dispatch({ type: 'RUN', userInput: input });
        break;
      case 'RESET':
        dispatch({ type: 'RESET' });
        break;
      case 'HELP':
        dispatch({ type: 'HELP', message: command.message });
        break;
      case 'INVALID':
        dispatch({ type: 'INVALID_COMMAND', message: command.message });
        break;
      default:
        break;
    }
  };

  return (
    <div className="app">
      <TerminalContainer
        lines={state.outputLines}
        onLineComplete={handleLineComplete}
        onCommand={handleCommand}
        isTyping={state.isTyping}
        phase={state.phase}
        playerHealth={state.playerHealth}
        creatureHealth={state.creatureHealth}
        skipTyping={state.skipTyping}
      />
    </div>
  );
}

export default App;
