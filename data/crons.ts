export type CronStatus = "ok" | "error" | "idle";

export interface CronJob {
  id: string;
  name: string;
  schedule: string;
  lastRun: string;
  status: CronStatus;
  nextRun: string;
}

export const cronJobs: CronJob[] = [
  {
    id: "1",
    name: "Portfolio Sync",
    schedule: "*/15 * * * *",
    lastRun: "2026-03-12 14:45",
    status: "ok",
    nextRun: "2026-03-12 15:00",
  },
  {
    id: "2",
    name: "Order Scraper",
    schedule: "0 */2 * * *",
    lastRun: "2026-03-12 14:00",
    status: "ok",
    nextRun: "2026-03-12 16:00",
  },
  {
    id: "3",
    name: "DB Backup",
    schedule: "0 3 * * *",
    lastRun: "2026-03-12 03:00",
    status: "error",
    nextRun: "2026-03-13 03:00",
  },
  {
    id: "4",
    name: "Uptime Monitor",
    schedule: "*/5 * * * *",
    lastRun: "2026-03-12 14:55",
    status: "ok",
    nextRun: "2026-03-12 15:00",
  },
  {
    id: "5",
    name: "Email Digest",
    schedule: "0 8 * * 1",
    lastRun: "2026-03-09 08:00",
    status: "idle",
    nextRun: "2026-03-16 08:00",
  },
  {
    id: "6",
    name: "Log Cleanup",
    schedule: "0 0 * * 0",
    lastRun: "2026-03-09 00:00",
    status: "ok",
    nextRun: "2026-03-16 00:00",
  },
];
