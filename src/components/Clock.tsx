"use client";
import { useState, useEffect } from "react";

export default function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const cetTime = now.toLocaleTimeString("en-GB", { timeZone: "Europe/Belgrade", hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const cetDate = now.toLocaleDateString("en-GB", { timeZone: "Europe/Belgrade", weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const utcTime = now.toLocaleTimeString("en-GB", { timeZone: "UTC", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="text-center mb-8">
      <div className="text-5xl font-bold tracking-tight text-[var(--text-primary)]">{cetTime}</div>
      <div className="text-[var(--text-secondary)] mt-1">{cetDate}</div>
      <div className="text-[var(--text-muted)] text-sm mt-1">UTC {utcTime}</div>
    </div>
  );
}
