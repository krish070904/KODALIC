"use server";

import { getMediaUsage } from "../../admin/media/get-media-usage";

export async function getMediaUsageAction(mediaId: string) {
  if (!mediaId) {
    throw new Error("Media ID is required");
  }

  return getMediaUsage(mediaId);
}