import { createClient } from "../supabase/server";

export type AdminMedia = {
  id: string;
  storage_key: string;
  filename: string;
  mime: string;
  size: number;
  dimensions: Record<string, unknown> | null;
  alt_text: string | null;
  caption: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export async function getAdminMedia(): Promise<AdminMedia[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("media")
    .select(
      "id, storage_key, filename, mime, size, dimensions, alt_text, caption, created_by, created_at, updated_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load admin media:", error);
    throw new Error("Failed to load media");
  }

  return (data ?? []).map((item) => ({
    id: String(item.id),
    storage_key: String(item.storage_key),
    filename: String(item.filename),
    mime: String(item.mime),
    size: Number(item.size),
    dimensions: item.dimensions ?? null,
    alt_text: item.alt_text ?? null,
    caption: item.caption ?? null,
    created_by: item.created_by ?? null,
    created_at: String(item.created_at),
    updated_at: String(item.updated_at),
  }));
}