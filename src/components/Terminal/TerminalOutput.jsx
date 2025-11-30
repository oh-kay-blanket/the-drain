import { useEffect, useRef, useState } from 'react';
import { TypedLine } from './TypedLine';
import './Terminal.css';

export function TerminalOutput({ lines, onLineComplete, playerHealth, creatureHealth, skipTyping, currentInput, disabled }) {
  const outputRef = useRef(null);
  const [completedLines, setCompletedLines] = useState(new Set());

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines, currentInput]);

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
        setCompletedLines(new Set());
      }

      lineIdsRef.current = currentLineIds;
    }
  }, [lines, completedLines.size]);

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

        // Health stats line
        if (line.isHealthStats) {
          return (
            <div key={line.id} className="health-stats-inline">
              <p className="terminal-line">
                # your health: <span style={{ color: getHealthColor(playerHealth) }}>{playerHealth}</span> | its health: <span style={{ color: getHealthColor(creatureHealth) }}>{creatureHealth}</span>
              </p>
            </div>
          );
        }

        // Check if previous line is completed (or doesn't need typing)
        const prevLine = lines[index - 1];
        const shouldWait = prevLine && !prevLine.isUserInput && !prevLine.isHealthStats && !completedLines.has(prevLine.id);

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

function getHealthColor(health) {
  if (health >= 10) return '#81fc16'; // green
  if (health >= 5) return '#e2b100'; // yellow
  return '#e00000'; // red
}
