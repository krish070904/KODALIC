import {
  Activity,
  BarChart3,
  Eye,
  FileText,
  Users,
} from "lucide-react";

import { requirePermission } from "../../../lib/auth/require-permission";
import { requireAAL2 } from "../../../lib/auth/require-aal2";
import { getAdminUser } from "../../../lib/auth/get-admin-user";
import { getAdminNavigation } from "../../../lib/auth/get-admin-navigation";
import {
  getGA4Overview,
  getGA4TopPages,
} from "../../../lib/analytics/ga4";
import AdminSidebar from "../../../components/admin/sidebar";

function MetricCard({
  label,
  value,
  description,
  icon,
}: {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111528] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-white/45">{label}</p>

          <p className="mt-3 text-3xl font-semibold tracking-tight">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-white/55">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-xs text-white/35">
        {description}
      </p>
    </div>
  );
}

export default async function AnalyticsPage() {
  await requirePermission("analytics.view");
  await requireAAL2();

  const adminUser = await getAdminUser();
  const navigation = await getAdminNavigation();

  const [overview, topPages] = await Promise.all([
    getGA4Overview(30),
    getGA4TopPages(30, 10),
  ]);

  const engagementRate = `${(
    overview.engagementRate * 100
  ).toFixed(1)}%`;

  const maxViews = Math.max(
    ...topPages.map((page) => page.view_count),
    1,
  );

  return (
    <div className="min-h-screen bg-[#080c1e] text-white">
      <AdminSidebar
        name={adminUser.name}
        email={adminUser.email}
        role={adminUser.role}
        navigation={navigation}
      />

      <main className="min-h-screen ml-64 px-8 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-wider text-white/35">
              Analytics
            </p>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Website Analytics
                </h1>

                <p className="mt-2 text-sm text-white/45">
                  Understand how visitors are using the Kodalic website.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-white/30">
                  Reporting period
                </p>

                <p className="mt-1 text-sm font-medium text-white/70">
                  Last 30 days
                </p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#a78bfa]" />

              <h2 className="text-sm font-semibold text-white/75">
                Overview
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                label="Active Users"
                value={overview.activeUsers.toLocaleString("en-IN")}
                description="Users over the last 30 days"
                icon={<Users className="h-5 w-5" />}
              />

              <MetricCard
                label="Sessions"
                value={overview.sessions.toLocaleString("en-IN")}
                description="Website sessions over the last 30 days"
                icon={<BarChart3 className="h-5 w-5" />}
              />

              <MetricCard
                label="Page Views"
                value={overview.screenPageViews.toLocaleString("en-IN")}
                description="Total page views over the last 30 days"
                icon={<Eye className="h-5 w-5" />}
              />

              <MetricCard
                label="Engagement Rate"
                value={engagementRate}
                description="Percentage of engaged sessions"
                icon={<Activity className="h-5 w-5" />}
              />
            </div>
          </section>

          {/* Top Pages */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#111528]">
            <div className="border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#a78bfa]" />

                <h2 className="text-sm font-semibold">
                  Top Pages
                </h2>
              </div>

              <p className="mt-1 text-xs text-white/35">
                Most viewed website pages over the last 30 days.
              </p>
            </div>

            {topPages.length === 0 ? (
              <div className="flex min-h-[220px] items-center justify-center px-6">
                <div className="text-center">
                  <p className="text-sm text-white/45">
                    No page views yet.
                  </p>

                  <p className="mt-1 text-xs text-white/25">
                    GA4 has not returned any page-view data for this period.
                  </p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {topPages.map((page, index) => {
                  const percentage =
                    (page.view_count / maxViews) * 100;

                  return (
                    <div
                      key={`${page.path}-${index}`}
                      className="px-6 py-5"
                    >
                      <div className="flex items-center justify-between gap-6">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-3">
                            <span className="w-5 text-xs text-white/25">
                              {index + 1}
                            </span>

                            <p className="truncate text-sm font-medium text-white/75">
                              {page.path}
                            </p>
                          </div>

                          <div className="mt-3 ml-8 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                            <div
                              className="h-full rounded-full bg-[#7357ff]"
                              style={{
                                width: `${percentage}%`,
                              }}
                            />
                          </div>
                        </div>

                        <p className="shrink-0 text-sm font-semibold text-white/70">
                          {page.view_count.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Data source */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#111528] px-6 py-5">
            <p className="text-xs uppercase tracking-wider text-white/30">
              Data source
            </p>

            <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/65">
                Google Analytics 4
              </p>

              <p className="text-xs text-white/30">
                Property ID: 553008172
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}