import Widget from "./Widget";

const links = [
  { name: "Kreova Store", url: "https://kreova.store", icon: "🛒" },
  { name: "Kreova Ops", url: "https://kreova.store/ops", icon: "⚙️" },
  { name: "Supabase", url: "https://supabase.com/dashboard/project/safxdihanzgqdbruomzc", icon: "🗄️" },
  { name: "GitHub", url: "https://github.com/Agonb", icon: "🐙" },
  { name: "ClawHub", url: "https://clawhub.com", icon: "🦞" },
  { name: "arXiv", url: "https://arxiv.org/search/?searchtype=all&query=multi-agent+trading", icon: "📄" },
  { name: "Coolify", url: "https://coolify.agonbajgora.com", icon: "🚀" },
  { name: "Portfolio", url: "https://agonbajgora.com", icon: "💼" },
];

export default function QuickLinks() {
  return (
    <Widget title="Quick Links" icon="🔗">
      <div className="grid grid-cols-2 gap-2">
        {links.map((l) => (
          <a
            key={l.name}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-card-hover)] border border-transparent hover:border-[var(--border)] transition-all text-sm"
          >
            <span>{l.icon}</span>
            <span className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">{l.name}</span>
          </a>
        ))}
      </div>
    </Widget>
  );
}
