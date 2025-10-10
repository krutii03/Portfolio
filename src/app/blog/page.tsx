// /app/blog/page.tsx  (LIST PAGE)
import BlogListClient from "@/components/blog/BlogListClient";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default function BlogPage() {
  const posts = getAllPosts(); // ok on server
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      {/* BlogListClient itself should have "use client" at its top */}
      <BlogListClient posts={posts} />
    </section>
  );
}