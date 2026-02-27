import { ExternalLink } from "lucide-react";

const projects = [
  { name: "Trading Bot", status: "live", emoji: "🤖", desc: "4 signal crons active", color: "var(--success)" },
  { name: "Kreova Store", status: "live", emoji: "🛒", desc: "E-commerce operational", color: "var(--success)" },
  { name: "PhD Research", status: "active", emoji: "🎓", desc: "CETA conf Apr 27-29", color: "var(--info)" },
  { name: "Student Hub", status: "paused", emoji: "🏫", desc: "Awaiting deploy", color: "var(--text-muted)" },
  { name: "Portfolio Site", status: "paused", emoji: "💼", desc: "Built, needs QA", color: "var(--text-muted)" },
];

export default function ActiveProjects() {
  return (
    <div className="card">
      <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4">Projects</h3>
      <div className="space-y-2">
        {projects.map((p) => (
          <div key={p.name} className="flex items-center gap-3 py-2 hover:bg-[var(--bg-secondary)] rounded-lg px-2 transition-colors cursor-pointer">
            <span className="text-base">{p.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--text-primary)]">{p.name}</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
              </div>
              <span className="text-[11px] text-[var(--text-muted)] truncate block">{p.desc}</span>
            </div>
            <ExternalLink className="w-3 h-3 text-[var(--text-muted)] opacity-0 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
