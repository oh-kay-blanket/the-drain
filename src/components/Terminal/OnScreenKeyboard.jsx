import './OnScreenKeyboard.css';

export function OnScreenKeyboard({ onKeyPress, disabled }) {
  const handleKeyPress = (key) => {
    if (disabled && key !== 'ENTER') return;
    onKeyPress(key);

    // Optional haptic feedback - short, sharp "clack"
    if (navigator.vibrate) {
      navigator.vibrate(3);
    }
  };

  const keyRows = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
  ];

  return (
    <div className="on-screen-keyboard">
      {keyRows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map(key => (
            <button
              key={key}
              className={`key ${key.length > 1 ? 'key-special' : ''} ${disabled && key !== 'ENTER' ? 'disabled' : ''}`}
              onClick={() => handleKeyPress(key)}
              disabled={disabled && key !== 'ENTER'}
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
