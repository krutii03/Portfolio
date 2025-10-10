import { getSiteData } from "@/lib/content";

export default function CertificationsPage() {
  const data = getSiteData();
  const items: string[] = data?.certifications ?? [];
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold mb-2">Certifications</h1>
      <p className="text-muted-foreground mb-8">Selected certifications and trainings.</p>
      <ul className="list-disc pl-5 space-y-2">
        {items.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </section>
  );
}
