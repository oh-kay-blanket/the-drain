import './Terminal.css';

export function HealthStats({ playerHealth, creatureHealth }) {
  const getHealthColor = (health, maxHealth = 10) => {
    if (health >= 10) return '#81fc16'; // green
    if (health >= 5) return '#e2b100'; // yellow
    return '#e00000'; // red
  };

  return (
    <div className="health-stats">
      <div className="stat" style={{ backgroundColor: getHealthColor(playerHealth) }}>
        <p>Your Health:&nbsp;</p>
        <p className="digit">{playerHealth}</p>
      </div>
      <div className="stat" style={{ backgroundColor: getHealthColor(creatureHealth) }}>
        <p>Its Health:&nbsp;</p>
        <p className="digit">{creatureHealth}</p>
      </div>
    </div>
  );
}
