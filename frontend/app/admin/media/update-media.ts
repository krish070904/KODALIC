"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../../lib/supabase/server";

export async function updateMediaMetadata(input: {
  id: string;
  altText: string;
  caption: string;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("media")
    .update({
      alt_text: input.altText.trim() || null,
      caption: input.caption.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.id);

  if (error) {
    console.error("Failed to update media metadata:", error);
    throw new Error("Failed to update media metadata");
  }

  revalidatePath("/admin/media");

  return {
    success: true,
  };
}