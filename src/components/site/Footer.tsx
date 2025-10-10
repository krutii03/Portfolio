import Link from "next/link";
import { getSiteData } from "@/lib/content";
export function Footer() {
  const year = new Date().getFullYear();
  const data = getSiteData();
  const links = data?.profile?.links ?? {};
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border/20">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2 opacity-90">
          <span>© {year} Kruti Patel</span>
          <span className="hidden sm:inline">•</span>
          <span>Built with Ai</span>
        </div>
        <div className="flex items-center gap-4">
          {links.linkedin && (
            <Link href={links.linkedin} className="hover:underline underline-offset-4">LinkedIn</Link>
          )}
          {links.github && (
            <Link href={links.github} className="hover:underline underline-offset-4">GitHub</Link>
          )}
          {links.resume && (
            <Link href={links.resume} className="hover:underline underline-offset-4">Resume</Link>
          )}
        </div>
      </div>
    </footer>
  );
}
