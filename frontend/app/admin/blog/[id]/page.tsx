import Link from "next/link";
import { notFound } from "next/navigation";

import { requirePermission } from "../../../../lib/auth/require-permission";
import { getAdminBlogPosts } from "../../../../lib/auth/get-admin-blog-posts";
import { getAdminBlogOptions } from "../../../../lib/auth/get-admin-blog-options";
import { createClient } from "../../../../lib/supabase/server";
import BlogEditForm from "../../../../components/admin/blog-edit-form";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBlogPostPage({ params }: PageProps) {
  await requirePermission("blog.update");

  const { id } = await params;

  const [{ categories, tags }, posts, supabase] = await Promise.all([
    getAdminBlogOptions(),
    getAdminBlogPosts(),
    createClient(),
  ]);

  const post = posts.find((item) => item.id === id);

  if (!post) {
    notFound();
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: tagRows, error: tagError } = await supabase
    .from("blog_post_tags")
    .select("tag_id")
    .eq("post_id", id);

  if (tagError) {
    throw new Error(`Failed to load blog post tags: ${tagError.message}`);
  }

  const tagIds = (tagRows ?? []).map((row) => row.tag_id as string);

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
            Edit Blog Post
          </h1>

          <p className="mt-2 text-sm text-white/45">
            Update the article and publishing settings.
          </p>
        </div>

        <div className="mt-8">
          <BlogEditForm
            post={post}
            categories={categories}
            tags={tags}
            tagIds={tagIds}
            authorId={post.author_id ?? user?.id ?? null}
          />
        </div>
      </div>
    </div>
  );
}