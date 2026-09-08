"use client";

import { useState } from "react";
import { updateMediaMetadata } from "./update-media";
import { getMediaUrl } from "./get-media-url";
import { deleteMedia } from "./delete-media";
import { getMediaUsageAction } from "./get-usage";

type MediaUsage = {
    blog: number;
    caseStudies: number;
    caseStudyMedia: number;
    projects: number;
    seo: number;
    technologies: number;
};

type MediaDetailsProps = {
    id: string;
    filename: string;
    mime: string;
    size: number;
    storageKey: string;
    dimensions: Record<string, unknown> | null;
    altText: string | null;
    caption: string | null;
    createdAt: string;
};

export default function MediaDetails({
    id,
    filename,
    mime,
    size,
    storageKey,
    dimensions,
    altText,
    caption,
    createdAt,
}: MediaDetailsProps) {
    const [alt, setAlt] = useState(altText ?? "");
    const [captionValue, setCaptionValue] = useState(caption ?? "");
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [copyingUrl, setCopyingUrl] = useState(false);
    const [usage, setUsage] = useState<MediaUsage | null>(null);
    const [loadingUsage, setLoadingUsage] = useState(false);
    async function handleCopyUrl() {
    setCopyingUrl(true);
    setMessage(null);

    try {
        const result = await getMediaUrl(id);

        const absoluteUrl = new URL(
            result.url,
            window.location.origin
        ).toString();

        await navigator.clipboard.writeText(absoluteUrl);

        setMessage("Media URL copied.");
    } catch (error) {
        setMessage(
            error instanceof Error
                ? error.message
                : "Failed to copy media URL."
        );
    } finally {
        setCopyingUrl(false);
    }
}
    async function loadUsage() {
        setLoadingUsage(true);
        setMessage(null);

        try {
            const result = await getMediaUsageAction(id);
            setUsage(result);
        } catch (error) {
            console.error("Failed to load media usage:", error);

            setMessage(
                error instanceof Error
                    ? error.message
                    : "Failed to load media usage."
            );
        } finally {
            setLoadingUsage(false);
        }
    }

    async function handleDelete() {
        const confirmed = window.confirm(
            `Delete "${filename}"? This action cannot be undone.`
        );

        if (!confirmed) return;

        setDeleting(true);
        setMessage(null);

        try {
            await deleteMedia(id);
            setMessage("Deleted.");
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Failed to delete media."
            );
        } finally {
            setDeleting(false);
        }
    }

    async function handleSave() {
        setSaving(true);
        setMessage(null);

        try {
            await updateMediaMetadata({
                id,
                altText: alt,
                caption: captionValue,
            });

            setMessage("Saved.");
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Failed to save media metadata."
            );
        } finally {
            setSaving(false);
        }
    }

    const formattedSize =
        size < 1024 * 1024
            ? `${Math.round(size / 1024)} KB`
            : `${(size / (1024 * 1024)).toFixed(2)} MB`;

    const usageCount = usage
        ? usage.blog +
        usage.caseStudies +
        usage.caseStudyMedia +
        usage.projects +
        usage.seo +
        usage.technologies
        : 0;

    return (
        <div className="space-y-5 rounded-xl border border-slate-200 dark:border-white/10 p-5 transition-colors duration-200">
            <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Media Details</h3>

                <p className="mt-1 truncate text-sm text-slate-500 dark:text-white/50">
                    {filename}
                </p>
            </div>

            <div className="grid gap-3 text-sm text-slate-800 dark:text-white/80">
                <div>
                    <span className="text-slate-500 dark:text-white/50">Type:</span>{" "}
                    {mime}
                </div>

                <div>
                    <span className="text-slate-500 dark:text-white/50">Size:</span>{" "}
                    {formattedSize}
                </div>

                {dimensions &&
                    typeof dimensions.width === "number" &&
                    typeof dimensions.height === "number" && (
                        <div>
                            <span className="text-slate-500 dark:text-white/50">
                                Dimensions:
                            </span>{" "}
                            {dimensions.width} × {dimensions.height}
                        </div>
                    )}

                <div>
                    <span className="text-slate-500 dark:text-white/50">
                        Storage Key:
                    </span>{" "}
                    <span className="break-all">{storageKey}</span>
                </div>

                <div>
                    <span className="text-slate-500 dark:text-white/50">
                        Uploaded:
                    </span>{" "}
                    {new Date(createdAt).toLocaleString()}
                </div>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-4 transition-colors duration-200">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                            Usage
                        </p>

                        <p className="mt-1 text-xs text-slate-500 dark:text-white/50">
                            Check where this asset is currently being used.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={loadUsage}
                        disabled={loadingUsage}
                        className="rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-3 py-2 text-sm font-medium text-slate-700 dark:text-white/70 transition hover:bg-slate-100 dark:hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loadingUsage
                            ? "Checking..."
                            : usage
                                ? "Refresh Usage"
                                : "Check Usage"}
                    </button>
                </div>

                {usage && (
                    <div className="mt-4">
                        <p className="text-sm text-slate-800 dark:text-white/80">
                            Used in{" "}
                            <span className="font-medium">
                                {usageCount}
                            </span>{" "}
                            {usageCount === 1 ? "place" : "places"}.
                        </p>

                        <div className="mt-3 grid gap-2 text-sm text-slate-500 dark:text-white/50 sm:grid-cols-2">
                            <span>
                                Blog posts: {usage.blog}
                            </span>

                            <span>
                                Case studies: {usage.caseStudies}
                            </span>

                            <span>
                                Case-study media:{" "}
                                {usage.caseStudyMedia}
                            </span>

                            <span>
                                Projects: {usage.projects}
                            </span>

                            <span>
                                SEO: {usage.seo}
                            </span>

                            <span>
                                Technologies:{" "}
                                {usage.technologies}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <div>
                <label
                    htmlFor={`alt-${id}`}
                    className="text-sm font-medium text-slate-900 dark:text-white"
                >
                    Alt Text
                </label>

                <input
                    id={`alt-${id}`}
                    value={alt}
                    onChange={(event) => setAlt(event.target.value)}
                    placeholder="Describe this image"
                    className="mt-2 w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#080c1e] px-3 py-2 text-sm text-slate-900 dark:text-white outline-none placeholder:text-slate-400 dark:placeholder:text-white/25 focus:border-[#7357ff]/50 transition-colors"
                />
            </div>

            <div>
                <label
                    htmlFor={`caption-${id}`}
                    className="text-sm font-medium text-slate-900 dark:text-white"
                >
                    Caption
                </label>

                <textarea
                    id={`caption-${id}`}
                    value={captionValue}
                    onChange={(event) =>
                        setCaptionValue(event.target.value)
                    }
                    placeholder="Optional caption"
                    rows={3}
                    className="mt-2 w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#080c1e] px-3 py-2 text-sm text-slate-900 dark:text-white outline-none placeholder:text-slate-400 dark:placeholder:text-white/25 focus:border-[#7357ff]/50 transition-colors"
                />
            </div>

            <div className="flex flex-wrap gap-3">
    <button
        type="button"
        onClick={handleCopyUrl}
        disabled={saving || deleting || copyingUrl}
        className="rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-700 dark:text-white/70 transition hover:bg-slate-100 dark:hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
    >
        {copyingUrl ? "Copying..." : "Copy Media URL"}
    </button>
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving || deleting}
                    className="rounded-lg bg-[#7357ff] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#8066ff] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={saving || deleting}
                    className="rounded-lg border border-red-300 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 px-4 py-2 text-sm font-medium text-red-700 dark:text-red-300 transition hover:bg-red-100 dark:hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {deleting ? "Deleting..." : "Delete Media"}
                </button>
            </div>

            {message && (
                <p className="text-sm text-slate-500 dark:text-white/50">
                    {message}
                </p>
            )}
        </div>
    );
}