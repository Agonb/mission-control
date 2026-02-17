import Widget from "./Widget";

const projects = [
  { name: "Kreova Store", status: "live", emoji: "🛒", desc: "E-commerce, Ramadan campaign" },
  { name: "PhD Research", status: "active", emoji: "🎓", desc: "2 papers written, Turkey conf Apr/May" },
  { name: "Trading Bot", status: "active", emoji: "🤖", desc: "Signals running, ETH client pipeline" },
  { name: "Mission Control", status: "building", emoji: "🚀", desc: "This dashboard" },
  { name: "Portfolio Site", status: "paused", emoji: "💼", desc: "Built, needs deploy + visual QA" },
  { name: "Student Hub", status: "paused", emoji: "🏫", desc: "Built, needs deployment" },
];

const statusColors: Record<string, string> = {
  live: "bg-[var(--success)]",
  active: "bg-[var(--info)]",
  building: "bg-[var(--warning)]",
  paused: "bg-[var(--text-muted)]",
};

export default function Projects() {
  return (
    <Widget title="Projects" icon="🗂️">
      <div className="space-y-2">
        {projects.map((p) => (
          <div key={p.name} className="flex items-center gap-3 py-1.5">
            <span className="text-lg">{p.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{p.name}</span>
                <span className={`w-2 h-2 rounded-full ${statusColors[p.status]}`} />
              </div>
              <div className="text-xs text-[var(--text-muted)] truncate">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </Widget>
  );
}
