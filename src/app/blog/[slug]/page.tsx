import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import MDXComponents from "@/components/mdx/MDXComponents";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const title = post.title || slug;
  const description = post.summary || "";
  const url = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com") + `/blog/${post.slug}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? posts[idx - 1] : null;
  const next = idx < posts.length - 1 ? posts[idx + 1] : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <div className="text-sm text-muted-foreground mt-2">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          {post.readTime && <span> • {post.readTime}</span>}
        </div>
      </header>

      <div className={`prose prose-sm sm:prose-base max-w-none ${styles.wrapper}`} style={{ textAlign: "justify" }}>
        <MDXRemote source={post.content} components={MDXComponents} />
      </div>

      <div className="mt-8 flex items-center justify-between text-sm">
        <Link href="/blog" className="underline underline-offset-2">← Back to Blog</Link>
        <div className="flex items-center gap-4">
          {prev && (
            <Link href={`/blog/${prev.slug}`} className="underline underline-offset-2">← {prev.title}</Link>
          )}
          {next && (
            <Link href={`/blog/${next.slug}`} className="underline underline-offset-2">{next.title} →</Link>
          )}
        </div>
      </div>
    </article>
  );
}
