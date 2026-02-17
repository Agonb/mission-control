import { NextResponse } from "next/server";
import { readFileSync } from "fs";

export const dynamic = "force-dynamic";

const CRON_CACHE = "/data/mission-control/crons.json";
const WORKSPACE_CRONS = "/root/.openclaw/workspace/data/crons.json";

export async function GET() {
  try {
    let raw = "[]";
    for (const path of [CRON_CACHE, WORKSPACE_CRONS]) {
      try { raw = readFileSync(path, "utf-8"); break; } catch {}
    }
    const data: any[] = JSON.parse(raw);

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
