import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { execSync } from "child_process";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const raw = execSync("openclaw cron list --json 2>/dev/null || echo '[]'", { timeout: 10000 }).toString();
    let data: any[];
    try { data = JSON.parse(raw); } catch { data = []; }

    const jobs = data.map((j: any) => ({
      name: j.name || j.id?.slice(0, 8),
      schedule: j.schedule?.expr || j.schedule?.kind || "—",
      lastRun: j.state?.lastRunAtMs ? new Date(j.state.lastRunAtMs).toLocaleString("en-GB", { timeZone: "Europe/Belgrade", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : null,
      lastStatus: j.state?.lastStatus || "pending",
      nextRun: j.state?.nextRunAtMs ? new Date(j.state.nextRunAtMs).toLocaleString("en-GB", { timeZone: "Europe/Belgrade", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "—",
    }));

    return NextResponse.json({ jobs });
  } catch {
    return NextResponse.json({ jobs: [] });
  }
}
