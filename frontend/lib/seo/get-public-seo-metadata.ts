import { createClient } from "../supabase/server";
import { getSeoPageByPath } from "./seo-page-registry";

export type PublicSeoMetadata = {
  title: string | null;
  description: string | null;
  canonical: string | null;
  og_media_id: string | null;
  indexable: boolean;
};

export async function getPublicSeoMetadata(
  path: string
): Promise<PublicSeoMetadata | null> {
  const page = getSeoPageByPath(path);

  if (!page) {
    return null;
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("seo_metadata")
    .select(
      "title, description, canonical, og_media_id, indexable"
    )
    .eq("entity_type", page.entityType)
    .eq("entity_id", page.entityId)
    .maybeSingle();

  if (error) {
    console.error("Failed to load public SEO metadata:", error);
    return null;
  }

  if (!data) {
    return null;
  }

  return {
    title: data.title ?? null,
    description: data.description ?? null,
    canonical: data.canonical ?? null,
    og_media_id: data.og_media_id ?? null,
    indexable: Boolean(data.indexable),
  };
}