import { getSiteData } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import type { ProjectItem } from "@/types/content";

export default function ProjectsPage() {
  const data = getSiteData();
  const projects = data?.projects ?? [];
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold mb-2">Projects</h1>
      <p className="text-muted-foreground mb-8">Featured projects across FinTech, Web, and Hackathons.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p: ProjectItem) => (
          <article key={p.name} className="rounded-xl border p-6 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              {p.tags?.map((t: string) => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
            </div>
            <h2 className="text-xl font-semibold">{p.name}</h2>
            {p.summary && <p className="text-sm text-muted-foreground mt-2">{p.summary}</p>}

            {p.overview && (
              <div className="mt-4">
                <h3 className="text-sm font-medium">Overview</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.overview}</p>
              </div>
            )}

            {p.contribution && (
              <div className="mt-4">
                <h3 className="text-sm font-medium">My Contribution</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.contribution}</p>
              </div>
            )}

            {p.role && (
              <div className="mt-4">
                <h3 className="text-sm font-medium">My Role</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.role}</p>
              </div>
            )}

            {Array.isArray(p.highlights) && p.highlights.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium">Key Highlights</h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground mt-1 space-y-1">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {p.status && <p className="text-xs text-muted-foreground mt-4">Status: {p.status}</p>}
            {p.outcome && <p className="text-xs text-muted-foreground mt-1">Outcome: {p.outcome}</p>}

            <div className="text-xs text-muted-foreground mt-3">Tech: {Array.isArray(p.tech) ? p.tech.join(", ") : ""}</div>
            <div className="flex gap-3 text-sm mt-4">
              {p.links?.demo && <a className="underline" href={p.links.demo}>Demo</a>}
              {p.links?.code && <a className="underline" href={p.links.code}>Code</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
