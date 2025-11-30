import { useState } from 'react';
import { TerminalOutput } from './TerminalOutput';
import { OnScreenKeyboard } from './OnScreenKeyboard';
import './Terminal.css';

export function TerminalContainer({
  lines,
  onLineComplete,
  onCommand,
  isTyping,
  phase,
  playerHealth,
  creatureHealth,
  skipTyping
}) {
  const [currentInput, setCurrentInput] = useState('');

  const handleKeyPress = (key) => {
    switch(key) {
      case 'ENTER':
        // Always allow Enter (for skip functionality)
        onCommand(currentInput);
        setCurrentInput('');
        break;
      case 'BACKSPACE':
        if (isTyping) return; // Block other keys during typing
        // Remove last character
        setCurrentInput(prev => prev.slice(0, -1));
        break;
      default:
        if (isTyping) return; // Block other keys during typing
        // Regular letter key - add to input (lowercase)
        setCurrentInput(prev => prev + key.toLowerCase());
        break;
    }
  };


  return (
    <div className="terminal-wrapper">
      <div className="terminal-with-keyboard">
        <div className="bash-border">
          <div className="bash-box">
            <TerminalOutput
              lines={lines}
              onLineComplete={onLineComplete}
              playerHealth={playerHealth}
              creatureHealth={creatureHealth}
              skipTyping={skipTyping}
              currentInput={currentInput}
              disabled={isTyping}
            />
          </div>
        </div>
        <OnScreenKeyboard onKeyPress={handleKeyPress} disabled={isTyping} />
      </div>
    </div>
  );
}
