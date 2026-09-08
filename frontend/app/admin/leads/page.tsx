import Link from "next/link";
import { requirePermission } from "../../../lib/auth/require-permission";
import { requireAAL2 } from "../../../lib/auth/require-aal2";
import { getAdminLeads } from "../../../lib/auth/get-admin-leads";

function getLeadName(
  contactFields: Record<string, unknown>,
): string {
  return typeof contactFields.name === "string" &&
    contactFields.name.trim()
    ? contactFields.name
    : "Unknown";
}

function getLeadEmail(
  contactFields: Record<string, unknown>,
): string | null {
  return typeof contactFields.email === "string" &&
    contactFields.email.trim()
    ? contactFields.email
    : null;
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getStatusClasses(status: string): string {
  switch (status) {
    case "new":
      return "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-200";

    case "reviewed":
      return "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200";

    case "transferred_to_crm":
      return "border-purple-500/20 bg-purple-500/10 text-purple-700 dark:border-purple-400/20 dark:bg-purple-400/10 dark:text-purple-200";

    case "archived":
      return "border-slate-300 bg-slate-100 text-slate-500 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/50";

    case "spam":
      return "border-red-500/20 bg-red-500/10 text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-200";

    default:
      return "border-slate-300 bg-slate-100 text-slate-500 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/60";
  }
}

export default async function LeadsPage() {
  await requirePermission("leads.view");
  await requireAAL2();

  const leads = await getAdminLeads();

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

          {/* ================================================== */}
          {/* HEADER */}
          {/* ================================================== */}

          <div className="mb-8">

            <div className="flex items-center justify-between gap-6">

              <div>

                <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-white/35">
                  CRM
                </p>

                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  Leads
                </h1>

                <p className="mt-2 text-sm text-slate-500 dark:text-white/45">
                  Manage enquiries and follow-ups received by Kodalic.
                </p>

              </div>

              <div className="hidden rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-4 py-3 text-right sm:block transition-colors duration-200">

                <p className="text-xs text-slate-400 dark:text-white/35">
                  Total Leads
                </p>

                <p className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
                  {leads.length}
                </p>

              </div>

            </div>

          </div>

          {/* ================================================== */}
          {/* FILTER BAR */}
          {/* ================================================== */}

          <div className="mb-5 flex flex-wrap items-center gap-2">

            <button
              type="button"
              className="rounded-lg border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-white/[0.08] px-3 py-2 text-xs font-medium text-slate-900 dark:text-white"
            >
              All
            </button>

            <button
              type="button"
              className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-3 py-2 text-xs text-slate-500 dark:text-white/50"
            >
              New
            </button>

            <button
              type="button"
              className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-3 py-2 text-xs text-slate-500 dark:text-white/50"
            >
              Reviewed
            </button>

            <button
              type="button"
              className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-3 py-2 text-xs text-slate-500 dark:text-white/50"
            >
              Transferred
            </button>

            <button
              type="button"
              className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-3 py-2 text-xs text-slate-500 dark:text-white/50"
            >
              Archived
            </button>

            <button
              type="button"
              className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-3 py-2 text-xs text-slate-500 dark:text-white/50"
            >
              Spam
            </button>

          </div>

          {/* ================================================== */}
          {/* LEADS TABLE */}
          {/* ================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] shadow-sm dark:shadow-none transition-colors duration-200">

            <div className="border-b border-slate-200 dark:border-white/10 px-6 py-5">

              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                All Leads
              </h2>

              <p className="mt-1 text-xs text-slate-400 dark:text-white/40">
                Most recent enquiries appear first.
              </p>

            </div>

            {leads.length === 0 ? (

              <div className="flex min-h-[300px] items-center justify-center px-6">

                <div className="text-center">

                  <p className="text-sm font-medium text-slate-600 dark:text-white/70">
                    No leads yet
                  </p>

                  <p className="mt-2 text-xs text-slate-400 dark:text-white/35">
                    New enquiries will appear here automatically.
                  </p>

                </div>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[800px]">

                  <thead>

                    <tr className="border-b border-slate-200 dark:border-white/10 text-left">

                      <th className="px-6 py-4 text-xs font-medium text-slate-400 dark:text-white/35">
                        Lead
                      </th>

                      <th className="px-6 py-4 text-xs font-medium text-slate-400 dark:text-white/35">
                        Service
                      </th>

                      <th className="px-6 py-4 text-xs font-medium text-slate-400 dark:text-white/35">
                        Budget
                      </th>

                      <th className="px-6 py-4 text-xs font-medium text-slate-400 dark:text-white/35">
                        Source
                      </th>

                      <th className="px-6 py-4 text-xs font-medium text-slate-400 dark:text-white/35">
                        Status
                      </th>

                      <th className="px-6 py-4 text-xs font-medium text-slate-400 dark:text-white/35">
                        Date
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-200 dark:divide-white/10">

                    {leads.map((lead) => {

                      const name = getLeadName(
                        lead.contact_fields,
                      );

                      const email = getLeadEmail(
                        lead.contact_fields,
                      );

                      return (

                        <tr
                          key={lead.id}
                          className="transition hover:bg-slate-50 dark:hover:bg-white/[0.025]"
                        >

                          {/* Lead */}

                          <td className="px-6 py-5">

                            <Link
                              href={`/admin/leads/${lead.id}`}
                              className="group flex items-center gap-3"
                            >

                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7357ff]/15 text-xs font-semibold text-[#5b3df5] dark:text-[#b8a8ff]">
                                {name
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div className="min-w-0">

                                <p className="truncate text-sm font-medium text-slate-900 dark:text-white group-hover:text-[#5b3df5] dark:group-hover:text-[#b8a8ff]">
                                  {name}
                                </p>

                                {email && (
                                  <p className="mt-1 truncate text-xs text-slate-400 dark:text-white/35">
                                    {email}
                                  </p>
                                )}

                              </div>

                            </Link>

                          </td>

                          {/* Service */}

                          <td className="px-6 py-5">

                            <p className="text-sm text-slate-600 dark:text-white/65">
                              {lead.service ||
                                "Not specified"}
                            </p>

                          </td>

                          {/* Budget */}

                          <td className="px-6 py-5">

                            <p className="text-sm text-slate-500 dark:text-white/55">
                              {lead.budget ||
                                "Not specified"}
                            </p>

                          </td>

                          {/* Source */}

                          <td className="px-6 py-5">

                            <p className="text-sm text-slate-500 dark:text-white/55">
                              {lead.source ||
                                "Unknown"}
                            </p>

                          </td>

                          {/* Status */}

                          <td className="px-6 py-5">

                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize ${getStatusClasses(
                                lead.status,
                              )}`}
                            >
                              {lead.status.replaceAll(
                                "_",
                                " ",
                              )}
                            </span>

                          </td>

                          {/* Date */}

                          <td className="px-6 py-5">

                            <p className="whitespace-nowrap text-xs text-slate-400 dark:text-white/40">
                              {formatDate(
                                lead.created_at,
                              )}
                            </p>

                          </td>

                        </tr>

                      );
                    })}

                  </tbody>

                </table>

              </div>
            )}
          </section>
        </div>
      </div>
  );
}