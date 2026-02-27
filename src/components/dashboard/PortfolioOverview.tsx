"use client";
import { useState, useEffect } from "react";

interface Coin {
  symbol: string;
  price: string;
  change24h: number;
  holdings?: number;
}

export default function PortfolioOverview() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/crypto")
      .then((r) => r.json())
      .then((data) => { setCoins(data.coins || []); setLoading(false); })
      .catch(() => setLoading(false));

    const interval = setInterval(() => {
      fetch("/api/crypto").then((r) => r.json()).then((data) => setCoins(data.coins || []));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Portfolio</h3>
          <span className="w-2 h-2 rounded-full bg-[var(--success)] pulse-dot" />
        </div>
        <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2 py-0.5 rounded">30s refresh</span>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="shimmer h-10 w-full" />)}
        </div>
      ) : (
        <div className="space-y-1">
          {/* Header */}
          <div className="grid grid-cols-4 text-[10px] text-[var(--text-muted)] uppercase tracking-wider py-2 border-b border-[var(--border-subtle)]">
            <span>Asset</span>
            <span className="text-right">Price</span>
            <span className="text-right">24h</span>
            <span className="text-right">Value</span>
          </div>
          {coins.map((c, i) => (
            <div key={c.symbol} className={`grid grid-cols-4 items-center py-2.5 text-sm border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-secondary)] rounded px-1 transition-colors fade-in-delay-${Math.min(i, 4)}`}>
              <div className="flex items-center gap-2">
                <span className="font-medium text-[var(--text-primary)]">{c.symbol}</span>
              </div>
              <span className="text-right mono text-[var(--text-secondary)]">${c.price}</span>
              <span className={`text-right mono text-xs font-medium ${c.change24h >= 0 ? "text-[var(--success)]" : "text-[var(--danger)]"}`}>
                {c.change24h >= 0 ? "▲" : "▼"} {Math.abs(c.change24h).toFixed(1)}%
              </span>
              <span className="text-right mono text-[var(--text-muted)] text-xs">—</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
