import { BatteryMedium, CircleDot } from "lucide-react";
import {
  CartesianGrid,
  Dot,
  Line,
  LineChart,
  ResponsiveContainer,
  YAxis,
} from "recharts";

const powerStats = [
  { label: "Solar", value: "5.36 kW", tone: "solar" },
  { label: "Home", value: "2.37 kW", tone: "home" },
  { label: "Battery", value: "+2.15 kW", tone: "battery" },
  { label: "Export", value: "0.84 kW", tone: "export" },
];

const energyStats = [
  { label: "Generated", value: "21.4 kWh", tone: "solar" },
  { label: "Consumed", value: "11.9 kWh", tone: "home" },
  { label: "Stored", value: "6.8 kWh", tone: "battery" },
  { label: "Exported", value: "2.7 kWh", tone: "export" },
];

const colors = {
  solar: "#e69200",
  home: "#6d35c4",
  battery: "#2d963f",
};

const chartData = [
  { solar: 0.02, home: 0.27, battery: 0.2 },
  { solar: 0.03, home: 0.28, battery: 0.2 },
  { solar: 0.1, home: 0.29, battery: 0.21 },
  { solar: 0.31, home: 0.34, battery: 0.27 },
  { solar: 0.61, home: 0.39, battery: 0.4 },
  { solar: 0.87, home: 0.4, battery: 0.58 },
  { solar: 0.98, home: 0.49, battery: 0.71 },
  { solar: 0.94, home: 0.47, battery: 0.69 },
  { solar: 0.72, home: 0.53, battery: 0.54 },
  { solar: 0.35, home: 0.52, battery: 0.3 },
  { solar: 0.12, home: 0.55, battery: 0.18 },
];

function renderEndDot(props) {
  return props.index === chartData.length - 1
    ? <Dot {...props} r={4.5} strokeWidth={0} />
    : null;
}

function PowerChart() {
  return (
    <div className="chart">
      <div
        className="chart-graphic"
        role="img"
        aria-label="Power today: solar, load and battery power from midnight to now"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 2, bottom: 2, left: 2 }}>
            <CartesianGrid stroke="#e5e8ed" />
            <YAxis domain={[0, 1]} hide />
            <Line
              type="monotone"
              dataKey="solar"
              stroke={colors.solar}
              strokeWidth={3}
              dot={renderEndDot}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="home"
              stroke={colors.home}
              strokeWidth={3}
              dot={renderEndDot}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="battery"
              stroke={colors.battery}
              strokeWidth={3}
              strokeDasharray="7 7"
              dot={renderEndDot}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-axis" aria-hidden="true">
        <span>12 am</span>
        <span>6 am</span>
        <span>12 pm</span>
        <span>6 pm</span>
        <span>Now</span>
      </div>
    </div>
  );
}

function BatteryGraphic() {
  return (
    <div className="battery-graphic" role="img" aria-label="Battery 78 percent charged">
      <div className="battery-shell">
        <div className="battery-fill" />
      </div>
      <div className="battery-cap" />
    </div>
  );
}

export function App() {
  return (
    <main className="prototype-stage">
      <article className="energy-card" aria-label="Solar and storage overview">
        <header className="card-header">
          <div className="title-group">
            <div className="icon-tile" aria-hidden="true">
              <BatteryMedium size={29} strokeWidth={2.1} />
            </div>
            <div>
              <h1>Solar &amp; storage</h1>
              <p>Battery outlook <span aria-hidden="true">·</span> Today</p>
            </div>
          </div>
          <div className="status-pill">
            <span className="status-dot" />
            Charging
          </div>
        </header>

        <section className="battery-hero">
          <div className="battery-summary">
            <div className="percentage">78<span>%</span></div>
            <strong>Full by 4:10 pm</strong>
          </div>
          <BatteryGraphic />
          <div className="charge-line">
            <span>Charging from solar</span>
            <strong>+2.15 kW</strong>
          </div>
        </section>

        <section className="power-stats" aria-label="Current power">
          {powerStats.map((item) => (
            <div className={`power-stat ${item.tone}`} key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </section>

        <section className="chart-section">
          <div className="section-heading">
            <h2>Power today</h2>
            <time dateTime="12:42">12:42 pm</time>
          </div>
          <PowerChart />
          <div className="legend" aria-label="Chart legend">
            <span className="solar"><i />Solar</span>
            <span className="home"><i />Load</span>
            <span className="battery"><i />Battery</span>
          </div>
        </section>

        <section className="energy-stats" aria-label="Energy today">
          {energyStats.map((item) => (
            <div className={`energy-stat ${item.tone}`} key={item.label}>
              <i aria-hidden="true" />
              <div>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            </div>
          ))}
        </section>

        <footer className="card-footer">
          <CircleDot size={14} strokeWidth={0} fill="currentColor" aria-hidden="true" />
          <span>Solar covering home, charging battery and exporting</span>
        </footer>
      </article>
    </main>
  );
}
