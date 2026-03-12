import { cronJobs, type CronStatus } from "@/data/crons";

function StatusBadge({ status }: { status: CronStatus }) {
  const styles: Record<CronStatus, string> = {
    ok: "bg-emerald-400/10 text-emerald-400",
    error: "bg-red-400/10 text-red-400",
    idle: "bg-zinc-400/10 text-zinc-500",
  };
  const dots: Record<CronStatus, string> = {
    ok: "bg-emerald-400",
    error: "bg-red-400",
    idle: "bg-zinc-500",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
}

export default function CronsPage() {
  const okCount = cronJobs.filter((c) => c.status === "ok").length;
  const errorCount = cronJobs.filter((c) => c.status === "error").length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Cron Jobs</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {cronJobs.length} jobs scheduled &mdash;{" "}
            <span className="text-emerald-400">{okCount} ok</span>
            {errorCount > 0 && (
              <>
                {", "}
                <span className="text-red-400">{errorCount} error</span>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Name
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Schedule
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Last Run
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Status
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Next Run
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {cronJobs.map((cron) => (
              <tr
                key={cron.id}
                className="transition-colors hover:bg-white/[0.02]"
              >
                <td className="px-5 py-4 font-medium text-zinc-200">
                  {cron.name}
                </td>
                <td className="px-5 py-4 font-mono text-xs text-zinc-400 tabular-nums">
                  {cron.schedule}
                </td>
                <td className="px-5 py-4 text-zinc-500 tabular-nums">
                  {cron.lastRun}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={cron.status} />
                </td>
                <td className="px-5 py-4 text-zinc-500 tabular-nums">
                  {cron.nextRun}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
