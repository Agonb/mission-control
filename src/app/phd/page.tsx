export default function PhdPage() {
  return (
    <div className="space-y-6 fade-in">
      <div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">PhD Research</h2>
        <p className="text-sm text-[var(--text-muted)] mt-1">Autonomous Multi-Agent LLM Trading Systems</p>
      </div>

      {/* Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Conference Papers</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="mono text-2xl font-bold text-[var(--accent)]">2</span>
            <span className="text-sm text-[var(--text-muted)]">/ 5 planned</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[var(--bg-secondary)] mt-2 overflow-hidden">
            <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: "40%" }} />
          </div>
        </div>
        <div className="card">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Exams</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="mono text-2xl font-bold text-[var(--success)]">3</span>
            <span className="text-sm text-[var(--text-muted)]">/ 3 — All 10s ✓</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[var(--bg-secondary)] mt-2 overflow-hidden">
            <div className="h-full rounded-full bg-[var(--success)]" style={{ width: "100%" }} />
          </div>
        </div>
        <div className="card">
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Next Deadline</span>
          <div className="mt-2">
            <span className="mono text-lg font-bold text-[var(--warning)]">Apr 27-29</span>
            <span className="text-xs text-[var(--text-muted)] block mt-0.5">CETA 2026, Antalya 🇹🇷</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="card">
        <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4">Research Timeline</h3>
        <div className="space-y-4">
          {[
            { date: "Nov 2025", title: "Conference 1 — Literature Review", status: "done", detail: "Published. Thesis announced." },
            { date: "Feb 2026", title: "Conference 2 — Consensus-Gated Execution", status: "done", detail: "Paper submitted to CETA." },
            { date: "Apr 27-29", title: "CETA 2026 — Antalya, Turkey", status: "upcoming", detail: "Present paper. University-funded." },
            { date: "Jun-Nov 2026", title: "Live Trading Experiments", status: "planned", detail: "Paper trade → collect data → compare vs baselines." },
            { date: "Dec 2026", title: "Conference 3 — Results Paper (Skopje)", status: "planned", detail: "Full experimental results." },
            { date: "2026-2027", title: "3 Journal Papers", status: "planned", detail: "Methodology + Experiments + Survey" },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${
                  item.status === "done" ? "bg-[var(--success)]" : item.status === "upcoming" ? "bg-[var(--warning)] pulse-dot" : "bg-[var(--border)]"
                }`} />
                <div className="w-px flex-1 bg-[var(--border-subtle)]" />
              </div>
              <div className="pb-4">
                <span className="mono text-[10px] text-[var(--text-muted)]">{item.date}</span>
                <h4 className="text-sm font-medium text-[var(--text-primary)] mt-0.5">{item.title}</h4>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
