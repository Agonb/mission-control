"use client";
import { useState, useEffect } from "react";

interface Signal {
  agent: string;
  verdict: "LONG" | "SHORT" | "HOLD";
  confidence: number;
  reason: string;
  timestamp: string;
  timeframe: string;
  price?: number;
}

const verdictStyle: Record<string, string> = {
  LONG: "signal-long",
  SHORT: "signal-short",
  HOLD: "signal-hold",
};

export default function SignalSummary() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [consensus, setConsensus] = useState("HOLD");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/signals")
      .then((r) => r.json())
      .then((data) => {
        if (data.signals?.length) setSignals(data.signals);
        if (data.consensus) setConsensus(data.consensus);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="card card-accent">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Agent Signals</h3>
          <span className={`px-2 py-0.5 rounded text-xs font-bold mono ${verdictStyle[consensus]}`}>
            {consensus}
          </span>
        </div>
        <span className="w-2 h-2 rounded-full bg-[var(--accent)] pulse-dot" />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <div key={i} className="shimmer h-16 w-full" />)}
        </div>
      ) : (
        <div className="space-y-3">
          {signals.map((s) => (
            <div key={s.agent} className="bg-[var(--bg-secondary)] rounded-lg p-3 hover:bg-[var(--bg-card-hover)] transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--text-primary)]">{s.agent}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold mono ${verdictStyle[s.verdict]}`}>
                    {s.verdict}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] mono">{s.timeframe}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 rounded-full bg-[var(--bg-primary)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${s.confidence}%`,
                        background: s.verdict === "LONG" ? "var(--success)" : s.verdict === "SHORT" ? "var(--danger)" : "var(--warning)",
                      }}
                    />
                  </div>
                  <span className="mono text-[10px] text-[var(--text-muted)]">{s.confidence}%</span>
                </div>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed truncate">{s.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
