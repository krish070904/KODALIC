import { redirect } from "next/navigation";
import { hasPermission } from "../../../lib/auth/permissions";
import { getAdminMedia } from "../../../lib/media/get-admin-media";
import MediaUploader from "./MediaUploader";
import MediaSearch from "./MediaSearch";

export default async function AdminMediaPage() {
  const allowed = await hasPermission("media.view");

  if (!allowed) {
    redirect("/admin/unauthorized");
  }

  const media = await getAdminMedia();

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-white/35">
            Media
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Media Library
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-white/45">
            Manage images and other media used across the Kodalic website.
          </p>
        </div>

        <div className="mb-6">
          <MediaUploader />
        </div>

        <div className="mb-6 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] p-6 shadow-sm dark:shadow-none transition-colors duration-200">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Library
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-white/45">
            {media.length} {media.length === 1 ? "asset" : "assets"}
          </p>
        </div>

        {media.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-white/10 p-12 text-center">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              No media yet
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-white/45">
              Upload your first media asset to start building the library.
            </p>
          </div>
        ) : (
          <MediaSearch media={media} />
        )}
      </div>
    </div>
  );
}