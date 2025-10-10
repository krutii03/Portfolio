import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary?: string;
  readTime?: string;
  tags?: string[];
  cover?: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  const posts: BlogPostMeta[] = files.map((file) => {
    const full = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(full, "utf-8");
    const { data } = matter(raw);
    const slug = file.replace(/\.(md|mdx)$/i, "");
    return {
      slug,
      title: String(data.title || slug),
      date: String(data.date || "1970-01-01"),
      summary: data.summary ? String(data.summary) : undefined,
      readTime: data.readTime ? String(data.readTime) : undefined,
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
      cover: data.cover ? String(data.cover) : undefined,
    } satisfies BlogPostMeta;
  });
  // newest first
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const md = path.join(BLOG_DIR, `${slug}.md`);
  const mdx = path.join(BLOG_DIR, `${slug}.mdx`);
  const file = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null;
  if (!file) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title || slug),
    date: String(data.date || "1970-01-01"),
    summary: data.summary ? String(data.summary) : undefined,
    readTime: data.readTime ? String(data.readTime) : undefined,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
    cover: data.cover ? String(data.cover) : undefined,
    content,
  };
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const p of getAllPosts()) {
    (p.tags || []).forEach((t) => set.add(t));
  }
  return Array.from(set).sort();
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const p = Math.min(Math.max(1, page), pages);
  const start = (p - 1) * perPage;
  const end = start + perPage;
  return {
    page: p,
    pages,
    total,
    items: items.slice(start, end),
  };
}
