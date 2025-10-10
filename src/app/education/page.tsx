import { getSiteData } from "@/lib/content";
import type { EducationItem } from "@/types/content";

export default function EducationPage() {
  const data = getSiteData();
  const items = data?.education ?? [];
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold mb-2">Education</h1>
      <p className="text-muted-foreground mb-8">Integrated B.Sc./M.Sc. IT with focus on FinTech and Analytics.</p>
      <div className="space-y-6">
        {items.map((e: EducationItem) => (
          <article key={`${e.school}-${e.degree}`} className="rounded-xl border p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-medium">{e.degree}</h2>
              <span className="text-sm text-muted-foreground">{e.period}</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">{e.school}</div>
            {e.cgpa && <div className="text-sm mt-2">CGPA: {e.cgpa}</div>}
            {Array.isArray(e.coursework) && (
              <div className="text-sm text-muted-foreground mt-2">Coursework: {e.coursework.join(", ")}</div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
