"use client";

import { useState, useTransition } from "react";
import { Check, Save } from "lucide-react";
import { saveSeoMetadata } from "./actions";

type Props = {
  entityId: string;
  name: string;
  path: string;
  title: string;
  description: string;
  canonical: string;
  indexable: boolean;
  ogMediaId: string | null;
  isConfigured: boolean;
};

export default function SeoMetadataEditor({
  entityId,
  name,
  path,
  title: initialTitle,
  description: initialDescription,
  canonical: initialCanonical,
  indexable: initialIndexable,
  ogMediaId: initialOgMediaId,
  isConfigured,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [canonical, setCanonical] = useState(initialCanonical);
  const [indexable, setIndexable] = useState(initialIndexable);
  const [ogMediaId, setOgMediaId] = useState(initialOgMediaId ?? "");
const [message, setMessage] = useState("");
const [configured, setConfigured] = useState(isConfigured);
const [isPending, startTransition] = useTransition();

  function handleSave() {
    setMessage("");

    startTransition(async () => {
      try {
        await saveSeoMetadata({
          entityId,
          title,
          description,
          canonical,
          ogMediaId: ogMediaId.trim() || null,
          indexable,
        });

        setConfigured(true);
setMessage("Saved");
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : "Failed to save"
        );
      }
    });
  }

  return (
    <div className="border-t border-white/10 px-6 py-6">
      <div className="mb-5 flex items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-white">{name}</h3>

            <span
              className={`rounded-full border px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em] ${
                isConfigured
                  ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                  : "border-amber-400/20 bg-amber-400/10 text-amber-300"
              }`}
            >
              {configured ? "Configured" : "Default"}
            </span>
          </div>

          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
            {path}
          </p>
        </div>

        <div
          className={`rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] ${
            indexable
              ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
              : "border-amber-400/20 bg-amber-400/10 text-amber-300"
          }`}
        >
          {indexable ? "Indexable" : "Noindex"}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <label className="block">
          <span className="text-xs text-white/50">SEO Title</span>

          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={70}
            className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none transition focus:border-white/30"
            placeholder="SEO title"
          />

          <span className="mt-1 block text-[10px] text-white/25">
            {title.length}/70
          </span>
        </label>

        <label className="block">
          <span className="text-xs text-white/50">Canonical URL</span>

          <input
            value={canonical}
            onChange={(event) => setCanonical(event.target.value)}
            className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none transition focus:border-white/30"
            placeholder="/example"
          />
        </label>

        <label className="block lg:col-span-2">
          <span className="text-xs text-white/50">Meta Description</span>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={160}
            rows={3}
            className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm leading-6 text-white outline-none transition focus:border-white/30"
            placeholder="Meta description"
          />

          <span className="mt-1 block text-[10px] text-white/25">
            {description.length}/160
          </span>
        </label>

        <label className="block">
          <span className="text-xs text-white/50">
            Open Graph Media ID
          </span>

          <input
            value={ogMediaId}
            onChange={(event) => setOgMediaId(event.target.value)}
            className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none transition focus:border-white/30"
            placeholder="Optional media UUID"
          />
        </label>

        <label className="flex items-center gap-3 self-end pb-1">
          <input
            type="checkbox"
            checked={indexable}
            onChange={(event) => setIndexable(event.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-white/5"
          />

          <span className="text-sm text-white/60">
            Allow search engines to index this page
          </span>
        </label>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="text-xs">
          {message === "Saved" ? (
            <span className="inline-flex items-center gap-1.5 text-emerald-300">
              <Check className="h-3.5 w-3.5" />
              Saved
            </span>
          ) : message ? (
            <span className="text-red-300">{message}</span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-zinc-950 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save className="h-3.5 w-3.5" />
          {isPending ? "Saving..." : "Save SEO"}
        </button>
      </div>
    </div>
  );
}