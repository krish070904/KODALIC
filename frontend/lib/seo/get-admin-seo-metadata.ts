import { createClient } from "../supabase/server";

export type AdminSeoMetadata = {
  id: string;
  entity_type: string;
  entity_id: string;
  title: string | null;
  description: string | null;
  canonical: string | null;
  og_media_id: string | null;
  indexable: boolean;
  created_at: string;
  updated_at: string;
};

type AdminSeoMetadataRow = {
  id: string;
  entity_type: string;
  entity_id: string;
  title: string | null;
  description: string | null;
  canonical: string | null;
  og_media_id: string | null;
  indexable: boolean;
  created_at: string;
  updated_at: string;
};

export async function getAdminSeoMetadata(): Promise<AdminSeoMetadata[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc(
    "get_admin_seo_metadata",
  );

  if (error) {
    console.error("Failed to load SEO metadata:", error);

    throw new Error("Failed to load SEO metadata");
  }

  const rows = (data ?? []) as AdminSeoMetadataRow[];

  return rows.map((item) => ({
    id: String(item.id),
    entity_type: String(item.entity_type),
    entity_id: String(item.entity_id),
    title: item.title ?? null,
    description: item.description ?? null,
    canonical: item.canonical ?? null,
    og_media_id: item.og_media_id ?? null,
    indexable: Boolean(item.indexable),
    created_at: String(item.created_at),
    updated_at: String(item.updated_at),
  }));
}