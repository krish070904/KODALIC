import Link from "next/link";

import { requirePermission } from "../../../lib/auth/require-permission";
import { getAdminCaseStudies } from "../../../lib/auth/get-admin-case-studies";

function formatDate(value: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function CaseStudiesPage() {
  await requirePermission("case_studies.view");

  const caseStudies = await getAdminCaseStudies();

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-white/35">
              Portfolio
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Case Studies
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-white/45">
              Create and manage the case studies published on the Kodalic website.
            </p>
          </div>

          <Link
            href="/admin/case-studies/new"
            className="inline-flex items-center justify-center rounded-xl bg-[#7357ff] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#8066ff]"
          >
            + New Case Study
          </Link>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] shadow-sm dark:shadow-none transition-colors duration-200">
          {caseStudies.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-sm text-slate-400 dark:text-white/40">
                No case studies yet.
              </p>

              <Link
                href="/admin/case-studies/new"
                className="mt-4 inline-block text-sm text-[#5b3df5] dark:text-[#a99cff] hover:text-slate-900 dark:hover:text-white"
              >
                Create your first case study →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-white/10">
              {caseStudies.map((caseStudy) => (
                <div
                  key={caseStudy.id}
                  className="flex flex-col gap-5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-base font-semibold text-slate-900 dark:text-white">
                        {caseStudy.title}
                      </h2>

                      <span className="rounded-full bg-slate-100 dark:bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-white/45">
                        {caseStudy.domain}
                      </span>

                      {caseStudy.featured && (
                        <span className="rounded-full bg-[#7357ff]/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-[#5b3df5] dark:text-[#a99cff]">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-white/45">
                      {caseStudy.description}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400 dark:text-white/30">
                      <span>
                        {caseStudy.published
                          ? "Published"
                          : "Draft"}
                      </span>

                      <span>
                        Order: {caseStudy.order}
                      </span>

                      <span>
                        Completed:{" "}
                        {formatDate(
                          caseStudy.completed_at,
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Link
                      href={`/admin/case-studies/${caseStudy.id}`}
                      className="inline-flex rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-slate-600 dark:text-white/65 transition hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}