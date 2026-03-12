import { portfolioAssets, totalPortfolioValue } from "@/data/portfolio";
import { TrendingUp } from "lucide-react";

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100">Portfolio</h1>
        <p className="mt-1 text-sm text-zinc-500">Crypto holdings overview</p>
      </div>

      {/* Total value card */}
      <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] p-6">
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at top left, #34d39920, transparent 60%)" }} />
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
            <TrendingUp size={18} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Total Portfolio Value
            </p>
            <p className="text-3xl font-semibold text-zinc-100">
              ${totalPortfolioValue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Holdings table */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Coin
              </th>
              <th className="px-5 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">
                Amount
              </th>
              <th className="px-5 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">
                Value (USD)
              </th>
              <th className="px-5 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">
                % of Portfolio
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {portfolioAssets
              .sort((a, b) => b.valueUsd - a.valueUsd)
              .map((asset) => {
                const pct = ((asset.valueUsd / totalPortfolioValue) * 100).toFixed(1);
                return (
                  <tr
                    key={asset.id}
                    className="transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-xs font-bold text-zinc-300">
                          {asset.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-zinc-200">
                            {asset.coin}
                          </p>
                          <p className="text-xs text-zinc-600">{asset.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right tabular-nums text-zinc-400">
                      {asset.amount.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-right tabular-nums font-medium text-zinc-200">
                      ${asset.valueUsd.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-white/[0.06] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-teal-400"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-10 tabular-nums text-zinc-400">
                          {pct}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr className="border-t border-white/[0.06]">
              <td className="px-5 py-3.5 text-xs font-medium uppercase tracking-wider text-zinc-500">
                Total
              </td>
              <td />
              <td className="px-5 py-3.5 text-right tabular-nums font-semibold text-zinc-200">
                ${totalPortfolioValue.toLocaleString()}
              </td>
              <td className="px-5 py-3.5 text-right tabular-nums text-zinc-400">
                100%
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
