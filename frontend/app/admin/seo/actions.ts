"use server";

import { revalidatePath } from "next/cache";
import { updateAdminSeoMetadata } from "../../../lib/seo/update-admin-seo-metadata";

export async function saveSeoMetadata(input: {
  entityId: string;
  title: string;
  description: string;
  canonical: string;
  ogMediaId: string | null;
  indexable: boolean;
}) {
  const result = await updateAdminSeoMetadata({
    entityType: "page",
    entityId: input.entityId,
    title: input.title,
    description: input.description,
    canonical: input.canonical,
    ogMediaId: input.ogMediaId,
    indexable: input.indexable,
  });

  revalidatePath("/");
  revalidatePath(input.canonical || "/");

  return result;
}