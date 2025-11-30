import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import './Terminal.css';

export const TerminalInput = forwardRef(({ onSubmit, disabled }, ref) => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    setInput,
    getInput: () => input,
    clearInput: () => setInput('')
  }));

  // Auto-focus input on mount and when enabled
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Always allow submit (even when disabled) to enable skip functionality
    onSubmit(input || '');
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="terminal-input">
      <span className="prompt"># </span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => !disabled && setInput(e.target.value)}
        className={disabled ? 'disabled' : ''}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        inputMode="none"
      />
      <span className={`cursor ${disabled ? 'disabled' : ''}`}></span>
    </form>
  );
});
