"use client";

export default function PaperTrading() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Paper Trading</h3>
        <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--info-dim)] text-[var(--info)] mono">SIMULATED</span>
      </div>

      {/* Account summary */}
      <div className="bg-[var(--bg-secondary)] rounded-lg p-4 mb-3">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-xs text-[var(--text-muted)]">Account Value</span>
          <span className="mono text-lg font-bold text-[var(--text-primary)]">$100,000</span>
        </div>
        <div className="flex justify-between">
          <div>
            <span className="text-[10px] text-[var(--text-muted)] block">P&L</span>
            <span className="mono text-sm text-[var(--text-muted)]">$0.00</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[var(--text-muted)] block">Win Rate</span>
            <span className="mono text-sm text-[var(--text-muted)]">—</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[var(--text-muted)] block">Trades</span>
            <span className="mono text-sm text-[var(--text-muted)]">0</span>
          </div>
        </div>
      </div>

      {/* Open positions */}
      <div>
        <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Open Positions</span>
        <div className="mt-2 text-center py-6 text-xs text-[var(--text-muted)] bg-[var(--bg-secondary)] rounded-lg">
          No open positions
          <br />
          <span className="text-[10px]">Waiting for consensus signal...</span>
        </div>
      </div>
    </div>
  );
}
