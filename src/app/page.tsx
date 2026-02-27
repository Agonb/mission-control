import PortfolioOverview from "@/components/dashboard/PortfolioOverview";
import SignalSummary from "@/components/dashboard/SignalSummary";
import MarketPulse from "@/components/dashboard/MarketPulse";
import ActiveProjects from "@/components/dashboard/ActiveProjects";
import CronHealth from "@/components/dashboard/CronHealth";
import QuickActions from "@/components/dashboard/QuickActions";

export default function Home() {
  return (
    <div className="space-y-6 fade-in">
      {/* Page header */}
      <div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Overview</h2>
        <p className="text-sm text-[var(--text-muted)] mt-1">Your command center at a glance</p>
      </div>

      {/* Top row — key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 fade-in-delay-1">
        <MetricCard label="Portfolio Value" value="—" change={null} icon="💰" />
        <MetricCard label="24h P&L" value="—" change={null} icon="📊" />
        <MetricCard label="Active Signals" value="3" change={null} icon="⚡" accent />
        <MetricCard label="Cron Jobs" value="4/4" change={null} icon="✓" success />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column — 2/3 */}
        <div className="lg:col-span-2 space-y-5 fade-in-delay-2">
          <PortfolioOverview />
          <SignalSummary />
        </div>

        {/* Right column — 1/3 */}
        <div className="space-y-5 fade-in-delay-3">
          <MarketPulse />
          <ActiveProjects />
          <CronHealth />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, change, icon, accent, success }: {
  label: string; value: string; change: number | null; icon: string; accent?: boolean; success?: boolean;
}) {
  return (
    <div className={`card ${accent ? "card-accent" : ""}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{label}</span>
        <span className="text-base">{icon}</span>
      </div>
      <div className={`text-2xl font-bold mono ${success ? "text-[var(--success)]" : accent ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`}>
        {value}
      </div>
      {change !== null && (
        <div className={`text-xs mt-1 mono ${change >= 0 ? "text-[var(--success)]" : "text-[var(--danger)]"}`}>
          {change >= 0 ? "+" : ""}{change}%
        </div>
      )}
    </div>
  );
}
