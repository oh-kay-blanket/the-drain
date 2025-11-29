import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
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
  return (
    <div className="terminal-wrapper">
      <div className="bash-border">
        <div className="bash-box">
          <TerminalOutput
            lines={lines}
            onLineComplete={onLineComplete}
            playerHealth={playerHealth}
            creatureHealth={creatureHealth}
            skipTyping={skipTyping}
          />
          <TerminalInput onSubmit={onCommand} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
}
