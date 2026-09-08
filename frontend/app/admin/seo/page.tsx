import {
  AlertTriangle,
  CheckCircle2,
  FileSearch,
  Globe,
  Image,
  Link2,
  Search,
} from "lucide-react";

import { requirePermission } from "../../../lib/auth/require-permission";
import { requireAAL2 } from "../../../lib/auth/require-aal2";
import { getAdminSeoOverview } from "../../../lib/seo/get-admin-seo-overview";
import { getAdminSeoMetadata } from "../../../lib/seo/get-admin-seo-metadata";
import SeoMetadataEditor from "./SeoMetadataEditor";
import { SEO_PAGE_REGISTRY } from "../../../lib/seo/seo-page-registry";
function StatusCard({
  label,
  value,
  description,
  icon,
  status = "good",
}: {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  status?: "good" | "warning";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] p-5 shadow-sm dark:shadow-none transition-colors duration-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-white/45">{label}</p>

          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${status === "good"
            ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300"
            : "bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300"
            }`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-400 dark:text-white/35">{description}</p>
    </div>
  );
}

function CheckRow({
  label,
  description,
  status,
}: {
  label: string;
  description: string;
  status: "good" | "warning";
}) {
  return (
    <div className="flex items-start gap-4 px-6 py-5">
      <div className="mt-0.5">
        {status === "good" ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
        ) : (
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-300" />
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700 dark:text-white/75">{label}</p>
        <p className="mt-1 text-xs leading-5 text-slate-400 dark:text-white/35">
          {description}
        </p>
      </div>
    </div>
  );
}

export default async function SeoPage() {
  await requirePermission("seo.view");
  await requireAAL2();

  const seoOverview = await getAdminSeoOverview();
  const seoMetadata = await getAdminSeoMetadata();

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-white/35">
              SEO
            </p>

            <div className="mt-2">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Search Engine Optimization
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-white/45">
                Manage and monitor the SEO health of the Kodalic website.
              </p>
            </div>
          </div>

          {/* Overview */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Search className="h-4 w-4 text-[#5b3df5] dark:text-[#a78bfa]" />

              <h2 className="text-sm font-semibold text-slate-700 dark:text-white/75">
                Overview
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatusCard
                label="SEO Health"
                value={`${seoOverview.health_score}%`}
                description="Health score will be calculated from your site's SEO data."
                icon={<FileSearch className="h-5 w-5" />}
              />

              <StatusCard
                label="Indexable Pages"
                value={String(seoOverview.indexable_pages)}
                description={
                  seoMetadata.length === 1
                    ? "1 SEO metadata record is explicitly configured."
                    : `${seoMetadata.length} SEO metadata records are explicitly configured.`
                }
                icon={<Globe className="h-5 w-5" />}
              />

              <StatusCard
                label="Missing Metadata"
                value={String(seoOverview.missing_metadata)}
                description="Pages that need SEO title or description improvements."
                icon={<Search className="h-5 w-5" />}
                status="warning"
              />

              <StatusCard
                label="OG Images"
                value={String(seoOverview.og_images)}
                description="Pages with Open Graph images configured."
                icon={<Image className="h-5 w-5" />}
              />
            </div>
          </section>
          {/* SEO Pages */}
          <section className="mt-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] shadow-sm dark:shadow-none transition-colors duration-200">
            <div className="border-b border-slate-200 dark:border-white/10 px-6 py-5">
              <div className="flex items-center gap-2">
                <FileSearch className="h-4 w-4 text-[#5b3df5] dark:text-[#a78bfa]" />
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">SEO Pages</h2>
              </div>
              <p className="mt-1 text-xs text-slate-400 dark:text-white/35">
                Manage search engine metadata for the public website pages.
              </p>
            </div>

            {SEO_PAGE_REGISTRY.map((page) => {
              const metadata = seoMetadata.find(
                (item) =>
                  item.entity_type === page.entityType &&
                  item.entity_id === page.entityId
              );

              return (
                <SeoMetadataEditor
                  key={page.entityId}
                  entityId={page.entityId}
                  name={page.name}
                  path={page.path}
                  title={metadata?.title ?? page.defaultTitle ?? ""}
                  description={
                    metadata?.description ?? page.defaultDescription ?? ""
                  }
                  canonical={metadata?.canonical ?? page.path}
                  indexable={metadata?.indexable ?? true}
                  ogMediaId={metadata?.og_media_id ?? null}
                  isConfigured={Boolean(metadata)}
                />
              );
            })}
          </section>
          {/* Technical SEO */}
          <section className="mt-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] shadow-sm dark:shadow-none transition-colors duration-200">
            <div className="border-b border-slate-200 dark:border-white/10 px-6 py-5">
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-[#5b3df5] dark:text-[#a78bfa]" />

                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Technical SEO
                </h2>
              </div>

              <p className="mt-1 text-xs text-slate-400 dark:text-white/35">
                Core technical SEO systems currently configured for the
                website.
              </p>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-white/10">
              <CheckRow
                label="XML Sitemap"
                description="/sitemap.xml is configured and includes the site's public routes."
                status="good"
              />

              <CheckRow
                label="Robots.txt"
                description="Search crawler rules are configured through the Next.js robots configuration."
                status="good"
              />

              <CheckRow
                label="Canonical URLs"
                description="Public pages use canonical metadata to establish their preferred URLs."
                status="good"
              />

              <CheckRow
                label="Open Graph Images"
                description={
                  seoOverview.total_metadata === 0
                    ? "No SEO metadata records are configured yet."
                    : `${seoOverview.og_images} of ${seoOverview.total_metadata} SEO records have Open Graph images configured.`
                }
                status={
                  seoOverview.total_metadata > 0 &&
                    seoOverview.og_images === seoOverview.total_metadata
                    ? "good"
                    : "warning"
                }
              />
            </div>
          </section>

          {/* Management */}
          <section className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] p-6 shadow-sm dark:shadow-none transition-colors duration-200">
              <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-white/30">
                Page SEO
              </p>

              <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                Metadata Management
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-white/40">
                Manage SEO titles, descriptions, canonical URLs, indexing,
                and Open Graph images for individual pages.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] p-6 shadow-sm dark:shadow-none transition-colors duration-200">
              <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-white/30">
                Redirects
              </p>

              <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                301 Redirect Management
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-white/40">
                Manage permanent redirects and keep old URLs pointing to
                their correct destinations.
              </p>
            </div>
          </section>
        </div>
      </div>
  );
}