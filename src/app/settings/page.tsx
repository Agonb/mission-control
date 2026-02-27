export default function SettingsPage() {
  return (
    <div className="space-y-6 fade-in">
      <div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Settings</h2>
        <p className="text-sm text-[var(--text-muted)] mt-1">Configure your command center</p>
      </div>

      <div className="card">
        <div className="text-center py-12">
          <span className="text-4xl mb-4 block">⚙️</span>
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">Coming Soon</h3>
          <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
            API keys, alert thresholds, portfolio holdings, notification preferences.
          </p>
        </div>
      </div>
    </div>
  );
}
