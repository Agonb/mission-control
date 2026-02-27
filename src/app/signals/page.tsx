export default function SignalsPage() {
  return (
    <div className="space-y-6 fade-in">
      <div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Signal Explorer</h2>
        <p className="text-sm text-[var(--text-muted)] mt-1">Detailed agent debate transcripts and signal analytics</p>
      </div>

      <div className="card card-accent">
        <div className="text-center py-12">
          <span className="text-4xl mb-4 block">⚡</span>
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">Coming Soon</h3>
          <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
            Full debate transcripts, signal accuracy tracking, and agent performance analytics.
            This is the PhD showcase — where Bull vs Bear debates are visualized.
          </p>
        </div>
      </div>
    </div>
  );
}
