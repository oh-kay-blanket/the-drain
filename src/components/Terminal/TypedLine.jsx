import { useTypingEffect } from '../../hooks/useTypingEffect';

export function TypedLine({ text, speed, onComplete, skipTrigger }) {
  const displayedText = useTypingEffect(text, speed, onComplete, skipTrigger);

  return (
    <p className="terminal-line">
      # {displayedText}
    </p>
  );
}
