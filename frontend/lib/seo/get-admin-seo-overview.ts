import { createClient } from "../supabase/server";

export type AdminSeoOverview = {
  total_metadata: number;
  indexable_pages: number;
  non_indexable_pages: number;
  missing_metadata: number;
  og_images: number;
  health_score: number;
};

type AdminSeoOverviewRow = {
  total_metadata: number | string;
  indexable_pages: number | string;
  non_indexable_pages: number | string;
  missing_metadata: number | string;
  og_images: number | string;
  health_score: number | string;
};

export async function getAdminSeoOverview(): Promise<AdminSeoOverview> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc(
    "get_admin_seo_overview",
  );

  if (error) {
    console.error("Failed to load SEO overview:", error);

    throw new Error("Failed to load SEO overview");
  }

  const row = data as AdminSeoOverviewRow | null;

  if (!row) {
    throw new Error("SEO overview data was not returned");
  }

  return {
    total_metadata: Number(row.total_metadata),
    indexable_pages: Number(row.indexable_pages),
    non_indexable_pages: Number(row.non_indexable_pages),
    missing_metadata: Number(row.missing_metadata),
    og_images: Number(row.og_images),
    health_score: Number(row.health_score),
  };
}