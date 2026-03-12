import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { projects, type ProjectStatus } from "@/data/projects";

function StatusBadge({ status }: { status: ProjectStatus }) {
  const styles: Record<ProjectStatus, string> = {
    active: "bg-emerald-400/10 text-emerald-400",
    paused: "bg-amber-400/10 text-amber-400",
    done: "bg-zinc-400/10 text-zinc-400",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100">Projects</h1>
        <p className="mt-1 text-sm text-zinc-500">
          {projects.length} projects tracked
        </p>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Name
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Description
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Status
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Last Updated
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                Link
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {projects.map((project) => (
              <tr
                key={project.id}
                className="transition-colors hover:bg-white/[0.02]"
              >
                <td className="px-5 py-4 font-medium text-zinc-200">
                  {project.name}
                </td>
                <td className="px-5 py-4 text-zinc-500 max-w-xs truncate">
                  {project.description}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={project.status} />
                </td>
                <td className="px-5 py-4 text-zinc-500 tabular-nums">
                  {project.lastUpdated}
                </td>
                <td className="px-5 py-4">
                  {project.link !== "#" ? (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      Visit <ExternalLink size={12} />
                    </Link>
                  ) : (
                    <span className="text-zinc-700">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
