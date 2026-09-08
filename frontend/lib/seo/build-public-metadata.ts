import type { Metadata } from "next";
import { getPublicSeoMetadata } from "./get-public-seo-metadata";

type BuildPublicMetadataOptions = {
  path: string;
  defaultTitle: string;
  defaultDescription: string;
};

export async function buildPublicMetadata({
  path,
  defaultTitle,
  defaultDescription,
}: BuildPublicMetadataOptions): Promise<Metadata> {
  const seo = await getPublicSeoMetadata(path);

  const title = seo?.title || defaultTitle;
  const description = seo?.description || defaultDescription;
  const canonical = seo?.canonical || path;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots:
      seo?.indexable === false
        ? {
            index: false,
            follow: true,
          }
        : undefined,
  };
}