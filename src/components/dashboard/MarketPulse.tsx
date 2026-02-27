"use client";
import { useState, useEffect } from "react";

interface MarketData {
  fearGreed: number;
  fearGreedLabel: string;
  btcDominance: string;
  totalMarketCap: string;
  funding: number;
}

export default function MarketPulse() {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/market")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="card">
        <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4">Market Pulse</h3>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="shimmer h-8 w-full" />)}
        </div>
      </div>
    );
  }

  const fgColor = data.fearGreed <= 25 ? "var(--danger)" : data.fearGreed <= 45 ? "var(--warning)" : data.fearGreed <= 55 ? "var(--text-secondary)" : "var(--success)";

  return (
    <div className="card">
      <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4">Market Pulse</h3>

      <div className="bg-[var(--bg-secondary)] rounded-lg p-4 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[var(--text-muted)]">Fear & Greed</span>
          <span className="mono text-lg font-bold" style={{ color: fgColor }}>{data.fearGreed}</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[var(--bg-primary)] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${data.fearGreed}%`,
              background: `linear-gradient(90deg, var(--danger), var(--warning), var(--success))`,
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-[var(--danger)]">Extreme Fear</span>
          <span className="text-[10px] font-medium" style={{ color: fgColor }}>{data.fearGreedLabel}</span>
          <span className="text-[10px] text-[var(--success)]">Extreme Greed</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center py-1.5">
          <span className="text-xs text-[var(--text-muted)]">BTC Dominance</span>
          <span className="mono text-sm text-[var(--text-secondary)]">{data.btcDominance}%</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-t border-[var(--border-subtle)]">
          <span className="text-xs text-[var(--text-muted)]">Total Market Cap</span>
          <span className="mono text-sm text-[var(--text-secondary)]">{data.totalMarketCap}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-t border-[var(--border-subtle)]">
          <span className="text-xs text-[var(--text-muted)]">BTC Funding Rate</span>
          <span className={`mono text-sm ${data.funding >= 0 ? "text-[var(--success)]" : "text-[var(--danger)]"}`}>
            {data.funding >= 0 ? "+" : ""}{data.funding}%
          </span>
        </div>
      </div>
    </div>
  );
}
