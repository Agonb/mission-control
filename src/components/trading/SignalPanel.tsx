"use client";
import { useState, useEffect } from "react";

interface Signal {
  agent: string;
  verdict: "LONG" | "SHORT" | "HOLD";
  confidence: number;
  reason: string;
  timestamp: string;
  timeframe: string;
}

const mockSignals: Signal[] = [
  {
    agent: "Trend Agent",
    verdict: "HOLD",
    confidence: 45,
    reason: "Daily trend neutral. Price consolidating between 95k-100k. EMA 20 flat, no crossover signal. Waiting for breakout confirmation above 101k or breakdown below 94k.",
    timestamp: "2h ago",
    timeframe: "1D",
  },
  {
    agent: "Momentum Agent",
    verdict: "LONG",
    confidence: 62,
    reason: "4H showing higher lows since Monday. MACD histogram turning positive. Volume increasing on green candles. RSI at 58 — room to run before overbought.",
    timestamp: "4h ago",
    timeframe: "4H",
  },
  {
    agent: "Contrarian Agent",
    verdict: "HOLD",
    confidence: 38,
    reason: "F&G index at 55 (Neutral). No extreme sentiment to fade. Funding rates slightly positive (0.01%) — no crowded trade. Waiting for extremes.",
    timestamp: "4h ago",
    timeframe: "Multi",
  },
];

const verdictColors = {
  LONG: { bg: "var(--success-dim)", text: "var(--success)", bar: "var(--success)" },
  SHORT: { bg: "var(--danger-dim)", text: "var(--danger)", bar: "var(--danger)" },
  HOLD: { bg: "var(--warning-dim)", text: "var(--warning)", bar: "var(--warning)" },
};

export default function SignalPanel() {
  const [signals, setSignals] = useState<Signal[]>(mockSignals);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/signals")
      .then((r) => r.json())
      .then((data) => { if (data.signals?.length) setSignals(data.signals); })
      .catch(() => {});
  }, []);

  const consensus = () => {
    const scores: Record<string, number> = {};
    signals.forEach(s => { scores[s.verdict] = (scores[s.verdict] || 0) + s.confidence; });
    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "HOLD";
  };

  const avgConfidence = Math.round(signals.reduce((a, s) => a + s.confidence, 0) / signals.length);
  const con = consensus();

  return (
    <div className="card card-accent">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Agent Debate</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[var(--text-muted)]">CONSENSUS</span>
            <span
              className="px-3 py-1 rounded-md text-xs font-bold mono"
              style={{ background: verdictColors[con as keyof typeof verdictColors]?.bg, color: verdictColors[con as keyof typeof verdictColors]?.text }}
            >
              {con}
            </span>
          </div>
          <div className="text-right">
            <span className="mono text-xs text-[var(--text-muted)]">avg conf </span>
            <span className="mono text-sm font-medium text-[var(--text-secondary)]">{avgConfidence}%</span>
          </div>
        </div>
      </div>

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
                  <span className="text-[10px] text-[var(--text-muted)] mt-2 block">Signal generated {s.timestamp}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
