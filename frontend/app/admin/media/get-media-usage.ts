import { createClient } from "../../../lib/supabase/server";

export type MediaUsage = {
  blog: number;
  caseStudies: number;
  caseStudyMedia: number;
  projects: number;
  seo: number;
  technologies: number;
};

export async function getMediaUsage(
  mediaId: string
): Promise<MediaUsage> {
  const supabase = await createClient();

  const [
    blogResult,
    caseStudyResult,
    caseStudyMediaResult,
    projectResult,
    seoResult,
    technologyResult,
  ] = await Promise.all([
    supabase
      .from("blog_posts")
      .select("id", { count: "exact", head: true })
      .eq("cover_media_id", mediaId),

    supabase
      .from("case_studies")
      .select("id", { count: "exact", head: true })
      .eq("hero_media_id", mediaId),

    supabase
      .from("case_study_media")
      .select("id", { count: "exact", head: true })
      .eq("media_id", mediaId),

    supabase
      .from("project_media")
      .select("id", { count: "exact", head: true })
      .eq("media_id", mediaId),

    supabase
      .from("seo_metadata")
      .select("id", { count: "exact", head: true })
      .eq("og_media_id", mediaId),

    supabase
      .from("technologies")
      .select("id", { count: "exact", head: true })
      .eq("logo_media_id", mediaId),
  ]);

  if (
    blogResult.error ||
    caseStudyResult.error ||
    caseStudyMediaResult.error ||
    projectResult.error ||
    seoResult.error ||
    technologyResult.error
  ) {
    console.error("Failed to load media usage:", {
      blog: blogResult.error,
      caseStudies: caseStudyResult.error,
      caseStudyMedia: caseStudyMediaResult.error,
      projects: projectResult.error,
      seo: seoResult.error,
      technologies: technologyResult.error,
    });

    throw new Error("Failed to load media usage");
  }

  return {
    blog: blogResult.count ?? 0,
    caseStudies: caseStudyResult.count ?? 0,
    caseStudyMedia: caseStudyMediaResult.count ?? 0,
    projects: projectResult.count ?? 0,
    seo: seoResult.count ?? 0,
    technologies: technologyResult.count ?? 0,
  };
}