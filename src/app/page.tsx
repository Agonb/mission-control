import Clock from "@/components/Clock";
import CryptoTicker from "@/components/CryptoTicker";
import CronStatus from "@/components/CronStatus";
import TodoList from "@/components/TodoList";
import Projects from "@/components/Projects";
import QuickLinks from "@/components/QuickLinks";

export default function Home() {
  return (
    <main className="min-h-screen p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🧘</span>
          <h1 className="text-2xl font-bold tracking-tight">Mission Control</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <span className="w-2 h-2 rounded-full bg-[var(--success)] pulse-dot" />
          <span>Systems Online</span>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mb-8 opacity-30" />

      {/* Clock */}
      <Clock />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <TodoList />
        <CryptoTicker />
        <CronStatus />
        <Projects />
        <QuickLinks />
        
        {/* Placeholder for future widgets */}
        <div className="border border-dashed border-[var(--border)] rounded-xl p-5 flex items-center justify-center text-[var(--text-muted)] text-sm hover:border-[var(--accent)] transition-colors cursor-pointer">
          <span>+ Add Widget</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-[var(--text-muted)]">
        Mission Control v0.1 · Built for Agon · Powered by OpenClaw 🦞
      </div>
    </main>
  );
}
