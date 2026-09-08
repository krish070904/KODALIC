"use client";

import { useMemo, useState } from "react";
import MediaDetails from "./MediaDetails";
import MediaFilters from "./MediaFilters";
import MediaSort from "./MediaSort";

type MediaItem = {
    id: string;
    storage_key: string;
    filename: string;
    mime: string;
    size: number;
    dimensions: Record<string, unknown> | null;
    alt_text: string | null;
    caption: string | null;
    created_by: string | null;
    created_at: string;
    updated_at: string;
};

type MediaSearchProps = {
    media: MediaItem[];
};

export default function MediaSearch({ media }: MediaSearchProps) {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState<"all" | "images" | "pdfs">("all");
    const [sort, setSort] = useState<"newest" | "oldest" | "name-asc" | "name-desc">(
        "newest"
    );

    const filteredMedia = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        const filtered = media.filter((item) => {
            const matchesQuery =
                !normalizedQuery ||
                item.filename.toLowerCase().includes(normalizedQuery);

            const matchesFilter =
                filter === "all" ||
                (filter === "images" && item.mime.startsWith("image/")) ||
                (filter === "pdfs" && item.mime === "application/pdf");

            return matchesQuery && matchesFilter;
        });

        return [...filtered].sort((a, b) => {
            switch (sort) {
                case "oldest":
                    return (
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                    );

                case "name-asc":
                    return a.filename.localeCompare(b.filename);

                case "name-desc":
                    return b.filename.localeCompare(a.filename);

                case "newest":
                default:
                    return (
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    );
            }
        });
    }, [media, query, filter, sort]);

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <MediaFilters value={filter} onChange={setFilter} />
                <MediaSort value={sort} onChange={setSort} />
            </div>

            <div>
                <div className="flex items-center justify-between gap-4">
                    <label
                        htmlFor="media-search"
                        className="text-sm font-medium text-slate-900 dark:text-white"
                    >
                        Search Media
                    </label>

                    <span className="text-xs text-slate-500 dark:text-white/50">
                        {filteredMedia.length}{" "}
                        {filteredMedia.length === 1 ? "asset" : "assets"}
                    </span>
                </div>

                <input
                    id="media-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by filename..."
                    className="mt-2 w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#080c1e] px-3 py-2 text-sm text-slate-900 dark:text-white outline-none placeholder:text-slate-400 dark:placeholder:text-white/25 focus:border-[#7357ff]/50 transition-colors"
                />
            </div>

            {filteredMedia.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 dark:border-white/10 p-10 text-center">
                    <p className="text-sm text-slate-500 dark:text-white/50">
                        No media matches your search.
                    </p>
                </div>
            ) : (
                <MediaGrid media={filteredMedia} />
            )}
        </div>
    );
}

function MediaGrid({ media }: MediaSearchProps) {
    const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);

    const selectedMedia =
        media.find((item) => item.id === selectedMediaId) ?? null;

    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {media.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedMediaId(item.id)}
                        className="overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] text-left transition hover:border-[#7357ff]/40 shadow-sm dark:shadow-none"
                    >
                        <div className="aspect-video bg-slate-100 dark:bg-white/[0.03]">
                            {item.mime.startsWith("image/") ? (
                                <img
                                    src={`/api/media/${item.id}`}
                                    alt={item.alt_text || item.filename}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-sm text-slate-500 dark:text-white/50">
                                    {item.mime}
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                                {item.filename}
                            </p>

                            <div className="mt-1 flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-white/50">
                                <span>{item.mime}</span>

                                <span>
                                    {item.size < 1024 * 1024
                                        ? `${Math.round(item.size / 1024)} KB`
                                        : `${(item.size / (1024 * 1024)).toFixed(2)} MB`}
                                </span>
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-2 text-xs text-slate-400 dark:text-white/40">
                                <span>
                                    {item.alt_text ? "Alt text set" : "Alt text missing"}
                                </span>

                                {item.dimensions &&
                                    typeof item.dimensions.width === "number" &&
                                    typeof item.dimensions.height === "number" && (
                                        <span>
                                            {item.dimensions.width} × {item.dimensions.height}
                                        </span>
                                    )}
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {selectedMedia && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white dark:bg-[#111528] border border-slate-200 dark:border-white/10 shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setSelectedMediaId(null)}
                            className="absolute right-4 top-4 z-10 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b1120] px-3 py-1 text-sm text-slate-700 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition"
                        >
                            Close
                        </button>

                        <div className="p-6">
                            <MediaDetails
                                id={selectedMedia.id}
                                filename={selectedMedia.filename}
                                mime={selectedMedia.mime}
                                size={selectedMedia.size}
                                storageKey={selectedMedia.storage_key}
                                dimensions={selectedMedia.dimensions}
                                altText={selectedMedia.alt_text}
                                caption={selectedMedia.caption}
                                createdAt={selectedMedia.created_at}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}