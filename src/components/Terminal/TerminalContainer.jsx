import { useRef, useState, useEffect } from 'react';
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
  const hiddenInputRef = useRef(null);
  const [currentInput, setCurrentInput] = useState('');

  // Auto-focus hidden input for real keyboard support
  useEffect(() => {
    if (hiddenInputRef.current && !isTyping) {
      hiddenInputRef.current.focus();
    }
  }, [isTyping, currentInput]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onCommand(currentInput);
    setCurrentInput('');
  };

  const handleRealKeyboardInput = (e) => {
    if (isTyping) {
      // Don't allow typing during animation, but keep input synced
      e.target.value = currentInput;
      return;
    }
    setCurrentInput(e.target.value);
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
            {/* Hidden input for real keyboard support on mobile */}
            <form onSubmit={handleSubmit} style={{ position: 'absolute', left: '-9999px' }}>
              <input
                ref={hiddenInputRef}
                type="text"
                value={currentInput}
                onChange={handleRealKeyboardInput}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </form>
          </div>
        </div>
        <OnScreenKeyboard onKeyPress={handleKeyPress} disabled={isTyping} />
      </div>
    </div>
  );
}
