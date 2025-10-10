import { getSiteData } from "@/lib/content";
import type { ExperienceItem } from "@/types/content";

export default function ExperiencePage() {
  const data = getSiteData();
  const items = data?.experience ?? [];
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold mb-2">Experience</h1>
      <p className="text-muted-foreground mb-8">Analytics dashboards, full‑stack delivery, and teamwork.</p>
      <div className="space-y-6">
        {items.map((x: ExperienceItem) => (
          <article key={`${x.company}-${x.role}`} className="rounded-xl border p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-medium">{x.role} • {x.company}</h2>
              <span className="text-sm text-muted-foreground">{x.period}</span>
            </div>
            {Array.isArray(x.highlights) && (
              <ul className="list-disc pl-5 mt-3 text-sm text-muted-foreground space-y-1">
                {x.highlights.map((h: string) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
            {Array.isArray(x.stack) && (
              <div className="text-xs text-muted-foreground mt-3">Stack: {x.stack.join(", ")}</div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
