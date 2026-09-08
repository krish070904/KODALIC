"use server";

import { createClient } from "../../../lib/supabase/server";

export async function getMediaUrl(mediaId: string) {
  if (!mediaId) {
    throw new Error("Media ID is required");
  }

  const supabase = await createClient();

  const { data: media, error: mediaError } = await supabase
    .from("media")
    .select("id")
    .eq("id", mediaId)
    .maybeSingle();

  if (mediaError) {
    console.error("Failed to load media:", mediaError);
    throw new Error("Failed to load media");
  }

  if (!media) {
    throw new Error("Media not found");
  }

  return {
    url: `/api/media/${mediaId}`,
  };
}