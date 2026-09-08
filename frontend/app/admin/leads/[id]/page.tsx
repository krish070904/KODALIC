import Link from "next/link";
import { notFound } from "next/navigation";
import { requirePermission } from "../../../../lib/auth/require-permission";
import { requireAAL2 } from "../../../../lib/auth/require-aal2";
import { getAdminLead } from "../../../../lib/auth/get-admin-lead";
import { getAdminUsers } from "../../../../lib/auth/get-admin-users";
import { getAdminLeadNotes } from "../../../../lib/auth/get-admin-lead-notes";
import { getAdminLeadActivity } from "../../../../lib/auth/get-admin-lead-activity";
import LeadNotes from "../../../../components/admin/lead-notes";
import LeadActivity from "../../../../components/admin/lead-activity";
import LeadActions from "../../../../components/admin/lead-actions";

type LeadDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getStringValue(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

function formatDate(value: string | null | undefined): string {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
function formatJson(value: Record<string, unknown>): string {
  return JSON.stringify(value, null, 2);
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

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  await requirePermission("leads.view");
  await requireAAL2();

  const { id } = await params;

  const lead = await getAdminLead(id);
  const users = await getAdminUsers();
  const notes = await getAdminLeadNotes(id);
  const activities = await getAdminLeadActivity(id);
  if (!lead) {
    notFound();
  }

  const name = getStringValue(lead.contact_fields?.name) ?? "Unknown";

  const email = getStringValue(lead.contact_fields?.email);

  const phone = getStringValue(lead.contact_fields?.phone);
  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* ================================================== */}
        {/* BACK */}
        {/* ================================================== */}

        <Link
            href="/admin/leads"
            className="inline-flex items-center text-sm text-slate-500 dark:text-white/45 transition hover:text-slate-900 dark:hover:text-white"
          >
            ← Back to leads
          </Link>

          {/* ================================================== */}
          {/* HEADER */}
          {/* ================================================== */}

          <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#7357ff]/15 text-lg font-semibold text-[#5b3df5] dark:text-[#b8a8ff]">
                {name.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-white/35">
                  Lead
                </p>

                <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  {name}
                </h1>

                {email && <p className="mt-1 text-sm text-slate-500 dark:text-white/40">{email}</p>}
              </div>
            </div>

            <span
              className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize ${getStatusClasses(
                lead.status ?? "unknown",
              )}`}
            >
              {(lead.status ?? "unknown").replaceAll("_", " ")}
            </span>
          </div>

          {/* ================================================== */}
          {/* CONTENT */}
          {/* ================================================== */}

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            {/* ================================================== */}
            {/* LEFT */}
            {/* ================================================== */}

            <div className="space-y-6">
              {/* Contact */}

              <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] shadow-sm dark:shadow-none transition-colors duration-200">
                <div className="border-b border-slate-200 dark:border-white/10 px-6 py-5">
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                    Contact Information
                  </h2>
                </div>

                <div className="grid gap-5 p-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-400 dark:text-white/35">Name</p>

                    <p className="mt-1 text-sm text-slate-700 dark:text-white/75">{name}</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 dark:text-white/35">Email</p>

                    <p className="mt-1 break-all text-sm text-slate-700 dark:text-white/75">
                      {email ?? "Not provided"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 dark:text-white/35">Phone</p>

                    <p className="mt-1 text-sm text-slate-700 dark:text-white/75">
                      {phone ?? "Not provided"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 dark:text-white/35">Received</p>

                    <p className="mt-1 text-sm text-slate-700 dark:text-white/75">
                      {formatDate(lead.created_at)}
                    </p>
                  </div>
                </div>
              </section>

              {/* Enquiry */}

              <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] shadow-sm dark:shadow-none transition-colors duration-200">
                <div className="border-b border-slate-200 dark:border-white/10 px-6 py-5">
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">Enquiry</h2>
                </div>

                <div className="space-y-5 p-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-slate-400 dark:text-white/35">Service</p>

                      <p className="mt-1 text-sm text-slate-700 dark:text-white/75">
                        {lead.service ?? "Not specified"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 dark:text-white/35">Budget</p>

                      <p className="mt-1 text-sm text-slate-700 dark:text-white/75">
                        {lead.budget ?? "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 dark:text-white/35">Message</p>

                    <div className="mt-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/10 p-4">
                      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-white/70">
                        {lead.message}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Source */}

              <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] shadow-sm dark:shadow-none transition-colors duration-200">
                <div className="border-b border-slate-200 dark:border-white/10 px-6 py-5">
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">Attribution</h2>
                </div>

                <div className="grid gap-5 p-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-400 dark:text-white/35">Source</p>

                    <p className="mt-1 text-sm text-slate-600 dark:text-white/70">
                      {lead.source ?? "Unknown"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 dark:text-white/35">Landing Page</p>

                    <p className="mt-1 break-all text-sm text-slate-600 dark:text-white/70">
                      {lead.landing_page ?? "Unknown"}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-xs text-slate-400 dark:text-white/35">UTM Data</p>

                    <pre className="mt-2 overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 p-4 text-xs leading-5 text-slate-500 dark:text-white/50">
                      {formatJson(lead.utm)}
                    </pre>
                  </div>
                </div>
              </section>

              {/* ================================================== */}
              {/* INTERNAL NOTES */}
              {/* ================================================== */}

              <LeadNotes leadId={lead.id} notes={notes} />
            </div>

            {/* ================================================== */}
            {/* RIGHT */}
            {/* ================================================== */}

            <div className="space-y-6">
              {/* Status / Actions */}

              <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] shadow-sm dark:shadow-none transition-colors duration-200">
                <div className="border-b border-slate-200 dark:border-white/10 px-6 py-5">
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">Lead Actions</h2>

                  <p className="mt-1 text-xs text-slate-400 dark:text-white/40">
                    Update the lead status and assignment.
                  </p>
                </div>

                <div className="p-6">
                  <LeadActions
                    leadId={lead.id}
                    currentStatus={lead.status}
                    currentAssignedUserId={lead.assigned_user_id}
                    users={users}
                  />
                  <LeadActivity activities={activities} />
                </div>
              </section>

              {/* CRM */}

              <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] shadow-sm dark:shadow-none transition-colors duration-200">
                <div className="border-b border-slate-200 dark:border-white/10 px-6 py-5">
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">CRM</h2>
                </div>

                <div className="p-6">
                  <p className="text-xs text-slate-400 dark:text-white/35">External CRM ID</p>

                  <p className="mt-1 break-all text-sm text-slate-600 dark:text-white/70">
                    {lead.crm_external_id ?? "Not transferred"}
                  </p>
                </div>
              </section>

              {/* Timestamps */}

              <section className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] shadow-sm dark:shadow-none transition-colors duration-200">
                <div className="border-b border-slate-200 dark:border-white/10 px-6 py-5">
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">Record</h2>
                </div>

                <div className="space-y-4 p-6">
                  <div>
                    <p className="text-xs text-slate-400 dark:text-white/35">Created</p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-white/60">
                      {formatDate(lead.created_at)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 dark:text-white/35">Last Updated</p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-white/60">
                      {formatDate(lead.updated_at)}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
  );
}
