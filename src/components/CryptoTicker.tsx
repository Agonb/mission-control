"use client";
import { useState, useEffect } from "react";
import Widget from "./Widget";

interface Coin {
  symbol: string;
  price: string;
  change24h: number;
}

export default function CryptoTicker() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/crypto")
      .then((r) => r.json())
      .then((data) => { setCoins(data.coins || []); setLoading(false); })
      .catch(() => setLoading(false));

    const interval = setInterval(() => {
      fetch("/api/crypto").then((r) => r.json()).then((data) => setCoins(data.coins || []));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Widget title="Crypto Portfolio" icon="📈" live>
      {loading ? (
        <div className="text-[var(--text-muted)] text-sm">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {coins.map((c) => (
            <div key={c.symbol} className="flex items-center justify-between bg-[var(--bg-secondary)] rounded-lg px-3 py-2">
              <span className="text-sm font-medium">{c.symbol}</span>
              <div className="text-right">
                <div className="text-sm">${c.price}</div>
                <div className={`text-xs font-medium ${c.change24h >= 0 ? "text-[var(--success)]" : "text-[var(--danger)]"}`}>
                  {c.change24h >= 0 ? "+" : ""}{c.change24h.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Widget>
  );
}
