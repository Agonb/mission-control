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
  rsi?: number | null;
  macro_verdict?: string;
  in_position?: boolean;
}

interface SignalResponse {
  signals: Signal[];
  consensus: string;
  avgConfidence: number;
  lastUpdate: string;
  macro?: { verdict: string; score: number; context: string } | null;
}

const verdictColors = {
  LONG: { bg: "var(--success-dim)", text: "var(--success)", bar: "var(--success)" },
  SHORT: { bg: "var(--danger-dim)", text: "var(--danger)", bar: "var(--danger)" },
  HOLD: { bg: "var(--warning-dim)", text: "var(--warning)", bar: "var(--warning)" },
};

export default function SignalPanel() {
  const [data, setData] = useState<SignalResponse | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSignals = () => {
    fetch("/api/signals")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 60000);
    return () => clearInterval(interval);
  }, []);

  const signals = data?.signals || [];
  const consensus = data?.consensus || "HOLD";
  const avgConfidence = data?.avgConfidence || 0;

  return (
    <div className="card card-accent">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Agent Debate</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[var(--text-muted)]">CONSENSUS</span>
            <span
              className="px-3 py-1 rounded-md text-xs font-bold mono"
              style={{ background: verdictColors[consensus as keyof typeof verdictColors]?.bg, color: verdictColors[consensus as keyof typeof verdictColors]?.text }}
            >
              {consensus}
            </span>
          </div>
          <div className="text-right">
            <span className="mono text-xs text-[var(--text-muted)]">avg conf </span>
            <span className="mono text-sm font-medium text-[var(--text-secondary)]">{avgConfidence}%</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] pulse-dot" />
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <div key={i} className="shimmer h-20 w-full" />)}
        </div>
      ) : (
        <div className="space-y-3">
          {signals.map((s) => {
            const vc = verdictColors[s.verdict];
            const isExpanded = expanded === s.agent;
            return (
              <div
                key={s.agent}
                className="bg-[var(--bg-secondary)] rounded-lg p-4 cursor-pointer transition-all hover:bg-[var(--bg-card-hover)]"
                onClick={() => setExpanded(isExpanded ? null : s.agent)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: vc.bg }}>
                      {s.verdict === "LONG" ? "🐂" : s.verdict === "SHORT" ? "🐻" : "⏸️"}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{s.agent}</span>
                      <span className="text-[10px] text-[var(--text-muted)] ml-2 mono">{s.timeframe}</span>
                      {s.price && <span className="text-[10px] text-[var(--text-muted)] ml-2 mono">${s.price.toLocaleString()}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold mono" style={{ background: vc.bg, color: vc.text }}>
                      {s.verdict}
                    </span>
                    <div className="w-20">
                      <div className="w-full h-1.5 rounded-full bg-[var(--bg-primary)] overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${s.confidence}%`, background: vc.bar }} />
                      </div>
                    </div>
                    <span className="mono text-xs text-[var(--text-muted)] w-8 text-right">{s.confidence}%</span>
                  </div>
                </div>
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[var(--border-subtle)]">
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{s.reason}</p>
                    <div className="flex gap-4 mt-2">
                      {s.rsi && <span className="text-[10px] text-[var(--text-muted)]">RSI: {s.rsi.toFixed(1)}</span>}
                      {s.macro_verdict && <span className="text-[10px] text-[var(--text-muted)]">Macro: {s.macro_verdict}</span>}
                      {s.in_position && <span className="text-[10px] text-[var(--success)]">● In position</span>}
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)] mt-1 block">{s.timestamp}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {data?.lastUpdate && (
        <div className="mt-3 text-right">
          <span className="text-[10px] text-[var(--text-muted)]">Last update: {new Date(data.lastUpdate).toLocaleTimeString()}</span>
        </div>
      )}
    </div>
  );
}
