import Link from "next/link";

import { requirePermission } from "../../../lib/auth/require-permission";
import { getAdminBlogPosts } from "../../../lib/auth/get-admin-blog-posts";
import BlogDeleteButton from "../../../components/admin/blog-delete-button";
function formatDate(value: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function BlogPage() {
  await requirePermission("blog.view");

  const posts = await getAdminBlogPosts();

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-white/50">
              Blog
            </p>

            <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white">
              Blog
            </h1>

            <p className="mt-4 max-w-2xl text-slate-500 dark:text-white/60">
              Create and manage the articles published
              on the Kodalic website.
            </p>
          </div>

          <Link
            href="/admin/blog/new"
            className="inline-flex items-center justify-center rounded-xl bg-[#7357ff] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#8066ff]"
          >
            + New Blog Post
          </Link>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111528] shadow-sm dark:shadow-none transition-colors duration-200">
          {posts.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-sm text-slate-400 dark:text-white/40">
                No blog posts yet.
              </p>

              <Link
                href="/admin/blog/new"
                className="mt-4 inline-block text-sm text-[#5b3df5] dark:text-[#a99cff] hover:text-slate-900 dark:hover:text-white"
              >
                Create your first blog post →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-white/10">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col gap-5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-base font-semibold text-slate-900 dark:text-white">
                        {post.title}
                      </h2>

                      <span className="rounded-full bg-slate-100 dark:bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-white/45">
                        {post.status}
                      </span>

                      {post.featured && (
                        <span className="rounded-full bg-[#7357ff]/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-[#5b3df5] dark:text-[#a99cff]">
                          Featured
                        </span>
                      )}
                    </div>

                    {post.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-white/45">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400 dark:text-white/30">
                      <span>
                        {post.status === "published"
                          ? "Published"
                          : "Draft"}
                      </span>

                      <span>
                        {post.published_at
                          ? formatDate(post.published_at)
                          : "Not published"}
                      </span>

                      <span>
                        Created: {formatDate(post.created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
  <Link
    href={`/admin/blog/${post.id}`}
    className="inline-flex rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-slate-600 dark:text-white/65 transition hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-900 dark:hover:text-white"
  >
    Edit
  </Link>

  <BlogDeleteButton
    postId={post.id}
    postTitle={post.title}
  />
</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}