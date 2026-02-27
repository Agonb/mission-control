"use client";
import { useState, useEffect } from "react";

interface Signal {
  agent: string;
  verdict: "LONG" | "SHORT" | "HOLD";
  confidence: number;
  reason: string;
  timestamp: string;
}

const mockSignals: Signal[] = [
  { agent: "Trend (1D)", verdict: "HOLD", confidence: 45, reason: "No clear trend — price ranging between 95k-100k support/resistance", timestamp: "2h ago" },
  { agent: "Trend (4H)", verdict: "LONG", confidence: 62, reason: "Higher lows forming, MACD crossing bullish on 4H", timestamp: "4h ago" },
  { agent: "Contrarian", verdict: "HOLD", confidence: 38, reason: "F&G at 55 (Neutral) — no extreme to fade", timestamp: "4h ago" },
];

const verdictStyle: Record<string, string> = {
  LONG: "signal-long",
  SHORT: "signal-short",
  HOLD: "signal-hold",
};

export default function SignalSummary() {
  const [signals, setSignals] = useState<Signal[]>(mockSignals);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/signals")
      .then((r) => r.json())
      .then((data) => { if (data.signals?.length) setSignals(data.signals); })
      .catch(() => {});
  }, []);

  const consensus = () => {
    const votes = signals.reduce((acc, s) => {
      acc[s.verdict] = (acc[s.verdict] || 0) + s.confidence;
      return acc;
    }, {} as Record<string, number>);
    const sorted = Object.entries(votes).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] || "HOLD";
  };

  return (
    <div className="card card-accent">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Agent Signals</h3>
          <span className={`px-2 py-0.5 rounded text-xs font-bold mono ${verdictStyle[consensus()]}`}>
            Consensus: {consensus()}
          </span>
        </div>
        <span className="w-2 h-2 rounded-full bg-[var(--accent)] pulse-dot" />
      </div>

      <div className="space-y-3">
        {signals.map((s) => (
          <div key={s.agent} className="bg-[var(--bg-secondary)] rounded-lg p-3 hover:bg-[var(--bg-card-hover)] transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--text-primary)]">{s.agent}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold mono ${verdictStyle[s.verdict]}`}>
                  {s.verdict}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 rounded-full bg-[var(--bg-primary)] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      s.verdict === "LONG" ? "bg-[var(--success)]" : s.verdict === "SHORT" ? "bg-[var(--danger)]" : "bg-[var(--warning)]"
                    }`}
                    style={{ width: `${s.confidence}%` }}
                  />
                </div>
                <span className="mono text-[10px] text-[var(--text-muted)]">{s.confidence}%</span>
              </div>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">{s.reason}</p>
            <span className="text-[10px] text-[var(--text-muted)] mt-1 block">{s.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
