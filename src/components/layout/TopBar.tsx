"use client";
import { useState, useEffect } from "react";

export default function TopBar() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { timeZone: "Europe/Belgrade", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDate(now.toLocaleDateString("en-GB", { timeZone: "Europe/Belgrade", weekday: "short", day: "numeric", month: "short" }));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[var(--bg-primary)]/80 border-b border-[var(--border-subtle)] px-6 py-3">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--success)] pulse-dot" />
            <span className="text-xs text-[var(--text-muted)]">All systems operational</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-[var(--text-muted)]">{date}</span>
          <span className="mono text-sm text-[var(--text-secondary)] font-medium">{time}</span>
          <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-card)] px-2 py-0.5 rounded">CET</span>
        </div>
      </div>
    </header>
  );
}
