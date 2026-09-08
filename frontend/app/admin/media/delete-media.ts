"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../../lib/supabase/server";

export async function deleteMedia(mediaId: string) {
    if (!mediaId) {
        throw new Error("Media ID is required");
    }

    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error("Unauthorized");
    }

    const { data: media, error: mediaError } = await supabase
        .from("media")
        .select("id, storage_key")
        .eq("id", mediaId)
        .maybeSingle();

    if (mediaError) {
        console.error("Failed to load media before deletion:", mediaError);
        throw new Error("Failed to load media");
    }

    if (!media) {
        throw new Error("Media not found");
    }

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
        console.error("Failed to check media usage before deletion:", {
            blog: blogResult.error,
            caseStudies: caseStudyResult.error,
            caseStudyMedia: caseStudyMediaResult.error,
            projects: projectResult.error,
            seo: seoResult.error,
            technologies: technologyResult.error,
        });

        throw new Error("Failed to check media usage");
    }

    const usageCount =
        (blogResult.count ?? 0) +
        (caseStudyResult.count ?? 0) +
        (caseStudyMediaResult.count ?? 0) +
        (projectResult.count ?? 0) +
        (seoResult.count ?? 0) +
        (technologyResult.count ?? 0);

    if (usageCount > 0) {
    const usageDetails: string[] = [];

    if ((blogResult.count ?? 0) > 0) {
        usageDetails.push(`Blog posts: ${blogResult.count}`);
    }

    if ((caseStudyResult.count ?? 0) > 0) {
        usageDetails.push(`Case studies: ${caseStudyResult.count}`);
    }

    if ((caseStudyMediaResult.count ?? 0) > 0) {
        usageDetails.push(
            `Case-study media: ${caseStudyMediaResult.count}`
        );
    }

    if ((projectResult.count ?? 0) > 0) {
        usageDetails.push(`Projects: ${projectResult.count}`);
    }

    if ((seoResult.count ?? 0) > 0) {
        usageDetails.push(`SEO: ${seoResult.count}`);
    }

    if ((technologyResult.count ?? 0) > 0) {
        usageDetails.push(
            `Technologies: ${technologyResult.count}`
        );
    }

    throw new Error(
        `This media is currently in use: ${usageDetails.join(
            ", "
        )}. Remove its references before deleting it.`
    );
}

    const bucket = media.storage_key.includes("/")
        ? "case-study-media"
        : "media";

    const { error: storageError } = await supabase.storage
        .from(bucket)
        .remove([media.storage_key]);

    if (storageError) {
        console.error("Failed to delete media file:", storageError);
        throw new Error("Failed to delete media file");
    }

    const { error: databaseError } = await supabase
        .from("media")
        .delete()
        .eq("id", mediaId);

    if (databaseError) {
        console.error("Failed to delete media record:", databaseError);
        throw new Error("Failed to delete media record");
    }

    revalidatePath("/admin/media");

    return {
        success: true,
    };
}