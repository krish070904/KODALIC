import Link from "next/link";
import { requirePermission } from "../../../lib/auth/require-permission";
import { requireAAL2 } from "../../../lib/auth/require-aal2";
import { getAdminProjects } from "../../../lib/auth/get-admin-projects";

function getStatusClasses(status: string): string {
  switch (status) {
    case "published":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300";

    case "draft":
      return "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300";

    case "archived":
      return "border-slate-300 bg-slate-100 text-slate-500 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/50";

    default:
      return "border-slate-300 bg-slate-100 text-slate-500 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/60";
  }
}

function formatDate(
  value: string | null,
): string {
  if (!value) {
    return "Not published";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function ProjectsPage() {
  await requirePermission("projects.view");
  await requireAAL2();

  const projects = await getAdminProjects();

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

          {/* ================================================== */}
          {/* HEADER */}
          {/* ================================================== */}

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-white/35">
                Portfolio
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Projects
              </h1>

              <p className="mt-2 text-sm text-slate-500 dark:text-white/45">
                Manage the projects displayed across the Kodalic portfolio.
              </p>
            </div>

            <Link
              href="/admin/projects/new"
              className="rounded-xl bg-[#7357ff] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#8066ff]"
            >
              New project
            </Link>
          </div>

          {/* ================================================== */}
          {/* PROJECT LIST */}
          {/* ================================================== */}

          <section className="mt-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] shadow-sm dark:shadow-none transition-colors duration-200">

            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 px-6 py-5">
              <div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                  All Projects
                </h2>

                <p className="mt-1 text-xs text-slate-400 dark:text-white/40">
                  {projects.length}{" "}
                  {projects.length === 1 ? "project" : "projects"}
                </p>
              </div>
            </div>

            {projects.length === 0 ? (
              <div className="flex min-h-[280px] items-center justify-center px-6">
                <div className="text-center">
                  <p className="text-sm text-slate-400 dark:text-white/40">
                    No projects yet.
                  </p>

                  <Link
                    href="/admin/projects/new"
                    className="mt-4 inline-flex rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-600 dark:text-white/70 transition hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white"
                  >
                    Create your first project
                  </Link>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-slate-200 dark:divide-white/10">

                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex flex-col gap-5 px-6 py-5 transition hover:bg-slate-50 dark:hover:bg-white/[0.02] lg:flex-row lg:items-center"
                  >

                    {/* Project information */}

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                          {project.title}
                        </h3>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize ${getStatusClasses(
                            project.status,
                          )}`}
                        >
                          {project.status.replaceAll(
                            "_",
                            " ",
                          )}
                        </span>

                        {project.featured && (
                          <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-[11px] font-medium text-purple-700 dark:border-purple-400/20 dark:bg-purple-400/10 dark:text-purple-300">
                            Featured
                          </span>
                        )}

                      </div>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-white/45">
                        {project.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400 dark:text-white/30">

                        <span>
                          /{project.slug}
                        </span>

                        {project.solution_type && (
                          <span>
                            {project.solution_type}
                          </span>
                        )}

                        <span>
                          Order {project.project_order}
                        </span>

                        <span>
                          Published{" "}
                          {formatDate(
                            project.published_at,
                          )}
                        </span>

                      </div>

                    </div>

                    {/* Actions */}

                    <div className="flex shrink-0 items-center gap-2">

                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-600 dark:text-white/65 transition hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white"
                      >
                        Edit
                      </Link>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </section>

        </div>
      </div>
  );
}