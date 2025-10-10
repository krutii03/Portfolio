import Link from "next/link";
import { getSiteData } from "@/lib/content";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const data = getSiteData();
  const profile = data?.profile ?? {};

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary">FinTech</Badge>
            <Badge variant="secondary">Full-Stack</Badge>
            <Badge variant="secondary">Analytics</Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            {profile?.headline || "Building reliable fintech experiences and data-driven products."}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Full-stack developer pursuing a Master’s in FinTech/Business Analytics. I turn complex financial workflows into clean, usable software.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href={profile?.links?.resume || "/Kruti_Patel_Resume.pdf"}
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium shadow hover:opacity-90"
            >
              Download Resume
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-sm font-medium hover:bg-muted"
            >
              Contact Me
            </Link>
          </div>
          <div className="text-sm text-muted-foreground pt-4">
            {profile?.location}
          </div>
        </div>
      </div>
    </section>
  );
}
