"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Clock,
  BarChart3,
  ShoppingBag,
  Radio,
  Menu,
  X,
  User,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/crons", label: "Crons", icon: Clock },
  { href: "/portfolio", label: "Portfolio", icon: BarChart3 },
  { href: "/orders", label: "Orders", icon: ShoppingBag },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="fixed top-4 left-4 z-50 flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-zinc-400 md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-white/[0.06] bg-[oklch(0.10_0_0)] transition-transform duration-200",
          "md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-white/[0.06] px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-400/10 text-teal-400">
            <Radio size={16} />
          </div>
          <span className="text-sm font-semibold tracking-wide text-zinc-100">
            Mission Control
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-teal-400/10 text-teal-400"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100"
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User area */}
        <div className="border-t border-white/[0.06] px-3 py-4">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-zinc-400">
              <User size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs font-medium text-zinc-300">
                Operator
              </p>
              <p className="truncate text-xs text-zinc-600">
                mission-control
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
