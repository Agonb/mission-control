"use client";
import { useState, useEffect } from "react";

interface CronJob {
  name: string;
  schedule: string;
  lastRun: string | null;
  lastStatus: string;
  nextRun: string;
}

export default function CronHealth() {
  const [jobs, setJobs] = useState<CronJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/crons")
      .then((r) => r.json())
      .then((data) => { setJobs(data.jobs || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4">Cron Health</h3>
      {loading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => <div key={i} className="shimmer h-8 w-full" />)}
        </div>
      ) : jobs.length === 0 ? (
        <p className="text-xs text-[var(--text-muted)]">No cron data available</p>
      ) : (
        <div className="space-y-1.5">
          {jobs.map((j) => (
            <div key={j.name} className="flex items-center justify-between py-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  j.lastStatus === "ok" ? "bg-[var(--success)]" : j.lastStatus === "error" ? "bg-[var(--danger)]" : "bg-[var(--text-muted)]"
                }`} />
                <span className="text-[var(--text-secondary)] font-medium">{j.name}</span>
              </div>
              <span className="mono text-[var(--text-muted)] text-[10px]">{j.lastRun || "—"}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
