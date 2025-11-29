import { useState, useEffect, useRef } from 'react';

/**
 * Hook for character-by-character typing effect
 * @param {string} text - The text to type out
 * @param {number} speed - Milliseconds per character
 * @param {function} onComplete - Callback when typing completes
 * @param {number} skipTrigger - Counter that triggers skip when incremented
 * @returns {string} The currently displayed text
 */
export function useTypingEffect(text, speed, onComplete, skipTrigger = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const timerRef = useRef(null);
  const prevSkipTrigger = useRef(0);

  // Update ref when callback changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Watch for skip trigger changes
  useEffect(() => {
    if (skipTrigger !== prevSkipTrigger.current && skipTrigger > 0 && currentIndex < text.length) {
      // Skip to end
      console.log('Skipping typing:', { skipTrigger, prevSkipTrigger: prevSkipTrigger.current, currentIndex, textLength: text.length });
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setDisplayedText(text);
      setCurrentIndex(text.length);
      prevSkipTrigger.current = skipTrigger;
    }
  }, [skipTrigger, currentIndex, text]);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    setHasCompleted(false);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      timerRef.current = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timerRef.current);
    } else if (currentIndex === text.length && !hasCompleted) {
      // Typing complete (handles empty strings too)
      setHasCompleted(true);
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }
  }, [currentIndex, text.length, speed, hasCompleted, text]);

  return displayedText;
}
