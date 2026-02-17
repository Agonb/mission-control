"use client";
import { useState, useEffect } from "react";
import Widget from "./Widget";

interface CronJob {
  name: string;
  schedule: string;
  lastRun: string | null;
  lastStatus: string;
  nextRun: string;
}

export default function CronStatus() {
  const [jobs, setJobs] = useState<CronJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/crons")
      .then((r) => r.json())
      .then((data) => { setJobs(data.jobs || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const statusColor = (s: string) => {
    if (s === "ok") return "text-[var(--success)]";
    if (s === "error") return "text-[var(--danger)]";
    return "text-[var(--text-muted)]";
  };

  return (
    <Widget title="Cron Jobs" icon="⏰" live>
      {loading ? (
        <div className="text-[var(--text-muted)] text-sm">Loading...</div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {jobs.map((j) => (
            <div key={j.name} className="flex items-center justify-between text-sm py-1.5 border-b border-[var(--border)] last:border-0">
              <div>
                <div className="text-[var(--text-primary)] font-medium">{j.name}</div>
                <div className="text-[var(--text-muted)] text-xs">{j.schedule}</div>
              </div>
              <div className="text-right">
                <div className={`text-xs font-medium ${statusColor(j.lastStatus)}`}>
                  {j.lastStatus === "ok" ? "✓" : j.lastStatus === "error" ? "✗" : "—"} {j.lastRun || "never"}
                </div>
                <div className="text-[var(--text-muted)] text-xs">next: {j.nextRun}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Widget>
  );
}
