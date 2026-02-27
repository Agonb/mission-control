"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, TrendingUp, GraduationCap, FolderKanban,
  Settings, Zap, Activity
} from "lucide-react";

const navItems = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/trading", label: "Trading", icon: TrendingUp },
  { href: "/signals", label: "Signals", icon: Zap },
  { href: "/phd", label: "PhD", icon: GraduationCap },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-[var(--bg-sidebar)] border-r border-[var(--border-subtle)] flex flex-col z-50">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent-glow)] flex items-center justify-center">
            <Activity className="w-4 h-4 text-[var(--accent)]" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-[var(--text-primary)]">Mission Control</h1>
            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">v2.0</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-[var(--accent-glow)] text-[var(--accent)] font-medium"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-card)]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
              {item.label === "Trading" && (
                <span className="ml-auto w-2 h-2 rounded-full bg-[var(--success)] pulse-dot" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--bg-card)] flex items-center justify-center text-sm">
            🧘
          </div>
          <div>
            <p className="text-xs font-medium text-[var(--text-secondary)]">Agon</p>
            <p className="text-[10px] text-[var(--text-muted)]">Zen • Online</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
