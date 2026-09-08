import Link from "next/link";

import { requirePermission } from "../../../../lib/auth/require-permission";
import { getAdminBlogOptions } from "../../../../lib/auth/get-admin-blog-options";
import { createClient } from "../../../../lib/supabase/server";
import BlogCreateForm from "../../../../components/admin/blog-create-form";

export default async function NewBlogPostPage() {
  await requirePermission("blog.create");

  const [{ categories, tags }, supabase] = await Promise.all([
    getAdminBlogOptions(),
    createClient(),
  ]);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin/blog"
          className="text-sm text-white/50 transition hover:text-white"
        >
          ← Back to Blog
        </Link>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-wider text-white/35">
            Blog
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            New Blog Post
          </h1>

          <p className="mt-2 text-sm text-white/45">
            Create a new article for the Kodalic website.
          </p>
        </div>

        <div className="mt-8">
          <BlogCreateForm
            categories={categories}
            tags={tags}
            authorId={user?.id ?? null}
          />
        </div>
      </div>
    </div>
  );
}