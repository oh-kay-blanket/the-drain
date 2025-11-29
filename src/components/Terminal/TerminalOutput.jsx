import { useEffect, useRef } from 'react';
import { TypedLine } from './TypedLine';
import './Terminal.css';

export function TerminalOutput({ lines, onLineComplete, playerHealth, creatureHealth, skipTyping }) {
  const outputRef = useRef(null);

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

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

        // Regular typed line - only pass skipTyping to the last typing line
        const isLastLine = index === lines.length - 1;
        return (
          <TypedLine
            key={line.id}
            text={line.text}
            speed={line.speed}
            onComplete={() => onLineComplete(line.id)}
            skipTrigger={isLastLine ? skipTyping : 0}
          />
        );
      })}
    </div>
  );
}

function getHealthColor(health) {
  if (health >= 10) return '#81fc16'; // green
  if (health >= 5) return '#e2b100'; // yellow
  return '#e00000'; // red
}
