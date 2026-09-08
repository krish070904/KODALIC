import type { MetadataRoute } from "next";
import { getPublicBlogPostsForSitemap } from "../lib/blog/get-public-blog-posts-for-sitemap";
import { getPublicCaseStudies } from "../lib/get-public-case-studies";
import { SITE_URL } from "./seo";

export const dynamic = "force-dynamic";

const STATIC_ROUTES = [
  "",
  "/about",
  "/ai-solutions",
  "/automation",
  "/digital-marketing",
  "/software-development",
  "/website-development",
  "/blog",
  "/case-studies",
  "/privacy",
  "/terms",
  "/cookies",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  try {
    const [posts, caseStudies] = await Promise.all([
      getPublicBlogPostsForSitemap(),
      getPublicCaseStudies(),
    ]);

    entries.push(
      ...posts.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.updated_at
          ? new Date(post.updated_at)
          : post.published_at
            ? new Date(post.published_at)
            : undefined,
      })),
    );

    entries.push(
      ...caseStudies.map((item) => ({
        url: `${SITE_URL}/case-studies/${item.slug}`,
      })),
    );
  } catch (error) {
    console.error("Failed to generate complete sitemap:", error);
  }

  return entries;
}