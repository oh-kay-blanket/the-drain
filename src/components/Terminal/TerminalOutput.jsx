import { useEffect, useRef, useState } from 'react';
import { TypedLine } from './TypedLine';
import './Terminal.css';

export function TerminalOutput({ lines, onLineComplete, skipTyping, currentInput, disabled }) {
  const outputRef = useRef(null);
  const [completedLines, setCompletedLines] = useState(new Set());

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines, currentInput, completedLines]);

  // Additional auto-scroll during typing
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    }, 100); // Scroll every 100ms during typing

    return () => clearInterval(scrollInterval);
  }, []);

  // Track the line IDs to detect when we have a new set of lines
  const lineIdsRef = useRef('');

  useEffect(() => {
    const currentLineIds = lines.map(l => l.id).join(',');
    if (lineIdsRef.current !== currentLineIds) {
      // Only reset if the actual lines changed, not just skipTyping
      const oldIds = new Set(lineIdsRef.current.split(','));
      const newIds = new Set(currentLineIds.split(','));

      // Check if this is truly new content (not just a skip trigger)
      const hasNewContent = lines.some(l => !oldIds.has(l.id));

      if (hasNewContent && lines.length !== completedLines.size) {
        // Keep completed lines that still exist in the new set
        const preservedCompleted = new Set(
          [...completedLines].filter(id => newIds.has(id))
        );
        setCompletedLines(preservedCompleted);
      }

      lineIdsRef.current = currentLineIds;
    }
  }, [lines, completedLines]);

  const handleLineComplete = (lineId) => {
    setCompletedLines(prev => new Set([...prev, lineId]));
    onLineComplete(lineId);
  };

  return (
    <div className="terminal-output" ref={outputRef}>
      {lines.map((line, index) => {
        // User input line with prompt
        if (line.isUserInput) {
          return (
            <p key={line.id} className="terminal-line user-input">
              # {line.text}
            </p>
          );
        }

        // Health stats line - removed, skip rendering
        if (line.isHealthStats) {
          return null;
        }

        // Check if previous line is completed (or doesn't need typing)
        // Need to find the previous non-healthStats, non-userInput line
        let prevLineIndex = index - 1;
        let prevLine = null;
        while (prevLineIndex >= 0) {
          const candidate = lines[prevLineIndex];
          if (!candidate.isHealthStats && !candidate.isUserInput) {
            prevLine = candidate;
            break;
          }
          prevLineIndex--;
        }
        const shouldWait = prevLine && !completedLines.has(prevLine.id);

        // If waiting for previous line, show nothing yet
        if (shouldWait) {
          return null;
        }

        // Regular typed line - only pass skipTyping to the last typing line
        const isLastLine = index === lines.length - 1;
        return (
          <TypedLine
            key={line.id}
            text={line.text}
            speed={line.speed}
            onComplete={() => handleLineComplete(line.id)}
            skipTrigger={isLastLine ? skipTyping : 0}
          />
        );
      })}

      {/* Current input line inline with terminal output */}
      <div className="terminal-line current-input">
        # {currentInput}<span className={`cursor ${disabled ? 'disabled' : ''}`}></span>
      </div>
    </div>
  );
}

