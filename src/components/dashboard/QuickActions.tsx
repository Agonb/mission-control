import { ExternalLink } from "lucide-react";

const links = [
  { name: "Kreova Store", url: "https://kreova.store", icon: "🛒" },
  { name: "Kreova Ops", url: "https://kreova.store/ops", icon: "⚙️" },
  { name: "Supabase", url: "https://supabase.com/dashboard/project/safxdihanzgqdbruomzc", icon: "🗄️" },
  { name: "GitHub", url: "https://github.com/Agonb", icon: "🐙" },
  { name: "Coolify", url: "https://coolify.agonbajgora.com", icon: "🚀" },
  { name: "arXiv", url: "https://arxiv.org/search/?searchtype=all&query=multi-agent+trading", icon: "📄" },
];

export default function QuickActions() {
  return (
    <div className="card">
      <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4">Quick Links</h3>
      <div className="grid grid-cols-2 gap-2">
        {links.map((l) => (
          <a
            key={l.name}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-card-hover)] border border-transparent hover:border-[var(--border)] transition-all text-xs group"
          >
            <span>{l.icon}</span>
            <span className="text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">{l.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
