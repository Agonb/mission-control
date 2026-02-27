"use client";

interface HistoricalSignal {
  date: string;
  consensus: "LONG" | "SHORT" | "HOLD";
  btcPrice: string;
  outcome: "win" | "loss" | "pending" | null;
  agents: { trend: string; momentum: string; contrarian: string };
}

const mockHistory: HistoricalSignal[] = [
  { date: "2026-02-27", consensus: "HOLD", btcPrice: "$97,200", outcome: null, agents: { trend: "HOLD", momentum: "LONG", contrarian: "HOLD" } },
  { date: "2026-02-26", consensus: "HOLD", btcPrice: "$96,800", outcome: null, agents: { trend: "HOLD", momentum: "HOLD", contrarian: "HOLD" } },
  { date: "2026-02-25", consensus: "HOLD", btcPrice: "$95,500", outcome: null, agents: { trend: "SHORT", momentum: "HOLD", contrarian: "HOLD" } },
];

const verdictPill = (v: string) => {
  if (v === "LONG") return "signal-long";
  if (v === "SHORT") return "signal-short";
  return "signal-hold";
};

export default function SignalHistory() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Signal History</h3>
        <span className="text-[10px] text-[var(--text-muted)]">Last 7 days</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider border-b border-[var(--border-subtle)]">
              <th className="text-left py-2 font-medium">Date</th>
              <th className="text-center py-2 font-medium">Trend</th>
              <th className="text-center py-2 font-medium">Momentum</th>
              <th className="text-center py-2 font-medium">Contrarian</th>
              <th className="text-center py-2 font-medium">Consensus</th>
              <th className="text-right py-2 font-medium">BTC Price</th>
              <th className="text-right py-2 font-medium">Outcome</th>
            </tr>
          </thead>
          <tbody>
            {mockHistory.map((h) => (
              <tr key={h.date} className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-secondary)] transition-colors">
                <td className="py-2.5 mono text-[var(--text-secondary)]">{h.date}</td>
                <td className="py-2.5 text-center">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold mono ${verdictPill(h.agents.trend)}`}>{h.agents.trend}</span>
                </td>
                <td className="py-2.5 text-center">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold mono ${verdictPill(h.agents.momentum)}`}>{h.agents.momentum}</span>
                </td>
                <td className="py-2.5 text-center">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold mono ${verdictPill(h.agents.contrarian)}`}>{h.agents.contrarian}</span>
                </td>
                <td className="py-2.5 text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold mono ${verdictPill(h.consensus)}`}>{h.consensus}</span>
                </td>
                <td className="py-2.5 text-right mono text-[var(--text-secondary)]">{h.btcPrice}</td>
                <td className="py-2.5 text-right">
                  {h.outcome === "win" && <span className="text-[var(--success)]">✓</span>}
                  {h.outcome === "loss" && <span className="text-[var(--danger)]">✗</span>}
                  {h.outcome === "pending" && <span className="text-[var(--warning)]">⏳</span>}
                  {h.outcome === null && <span className="text-[var(--text-muted)]">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
