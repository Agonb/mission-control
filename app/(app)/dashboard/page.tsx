import Link from "next/link";
import {
  FolderKanban,
  Clock,
  BarChart3,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { projects } from "@/data/projects";
import { cronJobs } from "@/data/crons";
import { totalPortfolioValue } from "@/data/portfolio";
import { orders } from "@/data/orders";

function StatCard({
  title,
  value,
  icon: Icon,
  href,
  accent,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  href: string;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 transition-colors hover:bg-white/[0.05]"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(ellipse at top left, ${accent}10, transparent 60%)`,
        }}
      />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            {title}
          </p>
          <p className="mt-2 text-3xl font-semibold text-zinc-100">{value}</p>
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${accent}15`, color: accent }}
        >
          <Icon size={18} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1 text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">
        <span>View details</span>
        <ArrowRight size={12} />
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const activeCrons = cronJobs.filter((c) => c.status !== "idle").length;
  const openOrders = orders.filter(
    (o) => o.status === "pending" || o.status === "confirmed"
  ).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Overview of your ops — {new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={projects.length}
          icon={FolderKanban}
          href="/projects"
          accent="#2dd4bf"
        />
        <StatCard
          title="Active Crons"
          value={activeCrons}
          icon={Clock}
          href="/crons"
          accent="#818cf8"
        />
        <StatCard
          title="Portfolio Value"
          value={`$${totalPortfolioValue.toLocaleString()}`}
          icon={BarChart3}
          href="/portfolio"
          accent="#34d399"
        />
        <StatCard
          title="Open Orders"
          value={openOrders}
          icon={ShoppingBag}
          href="/orders"
          accent="#fb923c"
        />
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Recent projects */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-300">
              Active Projects
            </h2>
            <Link
              href="/projects"
              className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300"
            >
              All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {projects
              .filter((p) => p.status === "active")
              .slice(0, 4)
              .map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-white/[0.03]"
                >
                  <span className="text-sm text-zinc-300">{project.name}</span>
                  <span className="text-xs text-zinc-600">
                    {project.lastUpdated}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Cron status */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-300">Cron Jobs</h2>
            <Link
              href="/crons"
              className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300"
            >
              All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {cronJobs.slice(0, 4).map((cron) => (
              <div
                key={cron.id}
                className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-white/[0.03]"
              >
                <span className="text-sm text-zinc-300">{cron.name}</span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    cron.status === "ok"
                      ? "bg-emerald-400/10 text-emerald-400"
                      : cron.status === "error"
                      ? "bg-red-400/10 text-red-400"
                      : "bg-zinc-400/10 text-zinc-400"
                  }`}
                >
                  {cron.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
