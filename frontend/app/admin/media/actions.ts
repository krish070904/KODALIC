"use server";

import { revalidatePath } from "next/cache";
import sharp from "sharp";
import { createClient } from "../../../lib/supabase/server";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
]);

export async function uploadMedia(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unauthorized");
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    throw new Error("No file provided");
  }

  if (file.size <= 0) {
    throw new Error("File is empty");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size must be 20 MB or less");
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error("Unsupported file type");
  }

  const extension = file.name.includes(".")
    ? file.name.split(".").pop()?.toLowerCase()
    : "";

  const safeExtension = extension ? `.${extension}` : "";

  const storageKey = `${crypto.randomUUID()}${safeExtension}`;

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(storageKey, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error("Failed to upload media file:", uploadError);
    throw new Error("Failed to upload media file");
  }

  let dimensions: { width: number; height: number } | null = null;

  if (file.type.startsWith("image/") && file.type !== "image/svg+xml") {
    try {
      const buffer = await file.arrayBuffer();
      const metadata = await sharp(Buffer.from(buffer)).metadata();

      if (metadata.width && metadata.height) {
        dimensions = {
          width: metadata.width,
          height: metadata.height,
        };
      }
    } catch (error) {
      console.error("Failed to read image dimensions:", error);
    }
  }

  const { error: databaseError } = await supabase
    .from("media")
    .insert({
      storage_key: storageKey,
      filename: file.name,
      mime: file.type,
      size: file.size,
      dimensions,
      created_by: user.id,
    });

  if (databaseError) {
    console.error("Failed to create media record:", databaseError);

    await supabase.storage.from("media").remove([storageKey]);

    throw new Error("Failed to create media record");
  }

  revalidatePath("/admin/media");

  return {
    success: true,
    id: storageKey,
  };
}