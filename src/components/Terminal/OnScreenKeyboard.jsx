import './OnScreenKeyboard.css';

export function OnScreenKeyboard({ onKeyPress, disabled }) {
  const handleKeyPress = (key) => {
    if (disabled) return;
    onKeyPress(key);

    // Optional haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const keyRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'BACKSPACE'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER']
  ];

  return (
    <div className="on-screen-keyboard">
      {keyRows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map(key => (
            <button
              key={key}
              className={`key ${key.length > 1 ? 'key-special' : ''} ${disabled ? 'disabled' : ''}`}
              onClick={() => handleKeyPress(key)}
              disabled={disabled}
              aria-label={key === 'BACKSPACE' ? 'Backspace' : key === 'ENTER' ? 'Enter' : key}
            >
              {key === 'BACKSPACE' ? '⌫' : key === 'ENTER' ? 'ENTER' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
