import PriceChart from "@/components/trading/PriceChart";
import SignalPanel from "@/components/trading/SignalPanel";
import MacroIndicators from "@/components/trading/MacroIndicators";
import PaperTrading from "@/components/trading/PaperTrading";
import SignalHistory from "@/components/trading/SignalHistory";

export default function TradingPage() {
  return (
    <div className="space-y-6 fade-in">
      <div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Trading Intelligence</h2>
        <p className="text-sm text-[var(--text-muted)] mt-1">Multi-agent consensus trading system</p>
      </div>

      {/* Top: Chart + Macro */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 fade-in-delay-1">
        <div className="lg:col-span-3">
          <PriceChart />
        </div>
        <div>
          <MacroIndicators />
        </div>
      </div>

      {/* Bottom: Signals + Paper Trading */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 fade-in-delay-2">
        <div className="lg:col-span-2">
          <SignalPanel />
        </div>
        <div className="space-y-5">
          <PaperTrading />
        </div>
      </div>

      {/* Signal history */}
      <div className="fade-in-delay-3">
        <SignalHistory />
      </div>
    </div>
  );
}
