import { createClient } from "../supabase/server";

export type UpdateAdminSeoMetadataInput = {
  entityType: "page";
  entityId: string;
  title: string;
  description: string;
  canonical: string;
  ogMediaId: string | null;
  indexable: boolean;
};

export async function updateAdminSeoMetadata(
  input: UpdateAdminSeoMetadataInput
): Promise<string> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("update_admin_seo_metadata", {
    p_entity_type: input.entityType,
    p_entity_id: input.entityId,
    p_title: input.title,
    p_description: input.description,
    p_canonical: input.canonical,
    p_og_media_id: input.ogMediaId,
    p_indexable: input.indexable,
  });

  if (error) {
    console.error("Failed to update SEO metadata:", error);
    throw new Error(error.message || "Failed to update SEO metadata");
  }

  return String(data);
}