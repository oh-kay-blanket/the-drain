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
    // If currently typing, skip to end of current line
    if (state.isTyping) {
      dispatch({ type: 'SKIP_TYPING' });
      return;
    }

    const command = parseCommand(input, state.phase, state.currentNode);

    switch (command.type) {
      case 'ADVANCE_STORY':
        dispatch({ type: 'ADVANCE_STORY', userInput: input });
        break;
      case 'CHOOSE':
        dispatch({ type: 'CHOOSE', choiceIndex: command.choiceIndex, userInput: input });
        break;
      case 'CONTINUE':
        dispatch({ type: 'CONTINUE', userInput: input });
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
        skipTyping={state.skipTyping}
      />
    </div>
  );
}

export default App;
