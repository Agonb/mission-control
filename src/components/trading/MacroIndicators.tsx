"use client";
import { useState, useEffect } from "react";

interface Indicator {
  name: string;
  value: string;
  signal: "bullish" | "bearish" | "neutral";
  detail?: string;
}

export default function MacroIndicators() {
  const [indicators, setIndicators] = useState<Indicator[]>([
    { name: "Fear & Greed", value: "55", signal: "neutral", detail: "Neutral — no extreme" },
    { name: "BTC RSI (1D)", value: "52", signal: "neutral", detail: "Mid-range, no signal" },
    { name: "Funding Rate", value: "+0.01%", signal: "neutral", detail: "Slightly long-biased" },
    { name: "DXY", value: "104.2", signal: "bearish", detail: "Strong dollar pressuring crypto" },
    { name: "JPY Liquidity", value: "↑", signal: "bullish", detail: "BOJ easing = risk-on" },
    { name: "ETH/BTC", value: "0.039", signal: "bearish", detail: "Alt weakness" },
  ]);

  const signalColor = (s: string) =>
    s === "bullish" ? "var(--success)" : s === "bearish" ? "var(--danger)" : "var(--warning)";

  const signalIcon = (s: string) =>
    s === "bullish" ? "▲" : s === "bearish" ? "▼" : "●";

  return (
    <div className="card h-full">
      <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4">Macro</h3>
      <div className="space-y-3">
        {indicators.map((ind) => (
          <div key={ind.name} className="bg-[var(--bg-secondary)] rounded-lg p-3">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-xs text-[var(--text-muted)]">{ind.name}</span>
              <div className="flex items-center gap-1.5">
                <span className="mono text-sm font-medium text-[var(--text-primary)]">{ind.value}</span>
                <span className="text-xs" style={{ color: signalColor(ind.signal) }}>{signalIcon(ind.signal)}</span>
              </div>
            </div>
            {ind.detail && (
              <span className="text-[10px] text-[var(--text-muted)]">{ind.detail}</span>
            )}
          </div>
        ))}
      </div>

      {/* Aggregate */}
      <div className="mt-4 pt-3 border-t border-[var(--border-subtle)]">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text-muted)]">Macro Bias</span>
          <span className="mono text-xs font-medium text-[var(--warning)]">NEUTRAL</span>
        </div>
        <div className="flex gap-1 mt-2">
          {indicators.map((ind) => (
            <div
              key={ind.name}
              className="flex-1 h-1.5 rounded-full"
              style={{ background: signalColor(ind.signal) }}
              title={`${ind.name}: ${ind.signal}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
