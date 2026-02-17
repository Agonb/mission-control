import { NextResponse } from "next/server";
import { readFileSync } from "fs";

export const dynamic = "force-dynamic";

const TODO_PATH = "/root/.openclaw/workspace/projects/TODO.md";

export async function GET() {
  try {
    const content = readFileSync(TODO_PATH, "utf-8");
    const lines = content.split("\n");
    const todos: { text: string; done: boolean; priority: string }[] = [];
    let currentPriority = "blue";

    for (const line of lines) {
      if (line.includes("🔴") || line.includes("Urgent")) currentPriority = "red";
      else if (line.includes("🟡") || line.includes("High Priority")) currentPriority = "yellow";
      else if (line.includes("🟢") || line.includes("Ongoing")) currentPriority = "green";
      else if (line.includes("💡") || line.includes("Ideas")) currentPriority = "blue";

      const match = line.match(/^- \[([ x])\] (.+)$/);
      if (match) {
        todos.push({ text: match[2], done: match[1] === "x", priority: currentPriority });
      }
    }

    return NextResponse.json({ todos });
  } catch {
    return NextResponse.json({ todos: [] });
  }
}
