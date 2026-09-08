"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadMedia } from "./actions";

export default function MediaUploader() {
    const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setMessage(null);
    
    try {
      const formData = new FormData();
      formData.append("file", file);

      await uploadMedia(formData);
      router.refresh();

      setMessage("Media uploaded successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to upload media."
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  async function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    await handleFile(file);
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] p-6 shadow-sm dark:shadow-none transition-colors duration-200">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Upload Media</h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-white/50">
            JPG, PNG, WebP, AVIF, GIF, SVG or PDF up to 20 MB.
          </p>
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-700 dark:text-white/70 transition hover:bg-slate-100 dark:hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Choose File"}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.avif,.gif,.svg,.pdf"
        onChange={handleChange}
        className="hidden"
      />

      {message && (
        <p className="mt-4 text-sm text-slate-500 dark:text-white/50">{message}</p>
      )}
    </div>
  );
}