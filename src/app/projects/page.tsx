import { ExternalLink } from "lucide-react";

const projects = [
  {
    name: "Trading Bot",
    status: "live",
    emoji: "🤖",
    desc: "Multi-agent consensus trading system with debate protocol",
    tech: ["Python", "Anthropic API", "SQLite"],
    metrics: "4 signal crons • 3 agents • Paper trading",
    color: "var(--success)",
    link: "/trading",
  },
  {
    name: "Kreova Store",
    status: "live",
    emoji: "🛒",
    desc: "E-commerce for laser-cut decorative metal products",
    tech: ["React", "Supabase", "Tailwind"],
    metrics: "15+ products • Ops dashboard • Chatbot",
    color: "var(--success)",
    link: "https://kreova.store",
  },
  {
    name: "Mission Control",
    status: "live",
    emoji: "🚀",
    desc: "This command center — trading, projects, intelligence",
    tech: ["Next.js", "Tailwind", "lightweight-charts"],
    metrics: "v2.0 • Trading dashboard • PhD tracker",
    color: "var(--success)",
    link: "/",
  },
  {
    name: "Student Hub",
    status: "built",
    emoji: "🏫",
    desc: "Academic management for university students",
    tech: ["React", "Supabase"],
    metrics: "XP system • Slide presenter • Course mgmt",
    color: "var(--info)",
    link: null,
  },
  {
    name: "Portfolio Site",
    status: "built",
    emoji: "💼",
    desc: "Personal portfolio — template for client work",
    tech: ["React", "Vite", "Framer Motion"],
    metrics: "20 sections • Dynamic routing",
    color: "var(--info)",
    link: "https://agonbajgora.com",
  },
  {
    name: "DaoFlow",
    status: "paused",
    emoji: "🧘",
    desc: "Meditation & breathwork PWA",
    tech: ["React", "Dexie.js", "Framer Motion"],
    metrics: "MVP complete • PWA ready",
    color: "var(--text-muted)",
    link: "https://daoflow.agonbajgora.com",
  },
  {
    name: "Argjent Hoti",
    status: "paused",
    emoji: "🏥",
    desc: "Physiotherapy booking platform",
    tech: ["React", "Supabase", "Twilio"],
    metrics: "OTP auth • Booking flow",
    color: "var(--text-muted)",
    link: "https://argjenthoti.com",
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-6 fade-in">
      <div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Projects</h2>
        <p className="text-sm text-[var(--text-muted)] mt-1">{projects.length} projects tracked</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div key={p.name} className="card hover:bg-[var(--bg-card-hover)] transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{p.emoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">{p.name}</h3>
                    <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                    <span className="text-[10px] text-[var(--text-muted)] uppercase">{p.status}</span>
                  </div>
                </div>
              </div>
              {p.link && (
                <a href={p.link} target={p.link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
            </div>
            <p className="text-xs text-[var(--text-muted)] mb-3">{p.desc}</p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {p.tech.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--text-muted)]">{t}</span>
              ))}
            </div>
            <span className="text-[10px] text-[var(--text-muted)]">{p.metrics}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
