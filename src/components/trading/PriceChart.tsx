"use client";
import { useEffect, useRef, useState } from "react";

export default function PriceChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [timeframe, setTimeframe] = useState("4H");
  const [price, setPrice] = useState<string>("—");
  const [change, setChange] = useState<number>(0);

  useEffect(() => {
    // Fetch current BTC price
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true")
      .then(r => r.json())
      .then(d => {
        if (d.bitcoin) {
          setPrice(d.bitcoin.usd.toLocaleString());
          setChange(d.bitcoin.usd_24h_change || 0);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    let chart: ReturnType<typeof import("lightweight-charts").createChart> | null = null;

    const initChart = async () => {
      const { createChart, ColorType } = await import("lightweight-charts");
      if (!chartRef.current) return;

      chart = createChart(chartRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: "#111118" },
          textColor: "#585868",
          fontSize: 11,
        },
        grid: {
          vertLines: { color: "#1e1e2e" },
          horzLines: { color: "#1e1e2e" },
        },
        crosshair: {
          vertLine: { color: "#c084fc", width: 1, style: 2 },
          horzLine: { color: "#c084fc", width: 1, style: 2 },
        },
        timeScale: {
          borderColor: "#1e1e2e",
          timeVisible: true,
        },
        rightPriceScale: { borderColor: "#1e1e2e" },
        width: chartRef.current.clientWidth,
        height: 400,
      });

      const candleSeries = chart.addCandlestickSeries({
        upColor: "#34d399",
        downColor: "#f87171",
        borderUpColor: "#34d399",
        borderDownColor: "#f87171",
        wickUpColor: "#34d399",
        wickDownColor: "#f87171",
      });

      // Fetch OHLC data from CoinGecko
      const tfMap: Record<string, { days: string; interval?: string }> = {
        "1H": { days: "1" },
        "4H": { days: "7" },
        "1D": { days: "90" },
        "1W": { days: "365" },
      };
      const tf = tfMap[timeframe] || tfMap["4H"];

      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=${tf.days}`
        );
        const ohlc = await res.json();

        if (Array.isArray(ohlc)) {
          const candles = ohlc.map((d: number[]) => ({
            time: Math.floor(d[0] / 1000) as unknown as import("lightweight-charts").UTCTimestamp,
            open: d[1],
            high: d[2],
            low: d[3],
            close: d[4],
          }));
          candleSeries.setData(candles);
          chart.timeScale().fitContent();
        }
      } catch {
        // Show empty chart on error
      }

      const handleResize = () => {
        if (chartRef.current && chart) {
          chart.applyOptions({ width: chartRef.current.clientWidth });
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    };

    initChart();
    return () => { chart?.remove(); };
  }, [timeframe]);

  const timeframes = ["1H", "4H", "1D", "1W"];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">BTC/USD</h3>
          <span className="mono text-lg font-bold text-[var(--text-primary)]">${price}</span>
          <span className={`mono text-xs font-medium ${change >= 0 ? "text-[var(--success)]" : "text-[var(--danger)]"}`}>
            {change >= 0 ? "+" : ""}{change.toFixed(2)}%
          </span>
        </div>
        <div className="flex gap-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded text-xs mono transition-colors ${
                timeframe === tf
                  ? "bg-[var(--accent-glow)] text-[var(--accent)] font-medium"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div ref={chartRef} className="chart-container" />
    </div>
  );
}
