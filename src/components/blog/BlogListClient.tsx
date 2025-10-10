"use client";

import type { BlogPostMeta } from "@/lib/blog";
import Link from "next/link";

type Props = { posts: BlogPostMeta[] };

// Minimal, clean list of blog posts: title, optional summary, and date.
export default function BlogListClient({ posts }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Blog</h1>
      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.slug} className="border-b pb-4 last:border-b-0">
            <h2 className="text-lg font-medium">
              <Link href={`/blog/${p.slug}`} className="underline-offset-2 hover:underline">
                {p.title}
              </Link>
            </h2>
            {p.summary && (
              <p className="text-sm text-muted-foreground mt-1" style={{ textAlign: "justify" }}>{p.summary}</p>
            )}
            <div className="text-xs text-muted-foreground mt-2">
              {new Date(p.date).toLocaleDateString()}
              {p.readTime && <span> • {p.readTime}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
