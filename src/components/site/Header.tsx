"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/certifications", label: "Certifications" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full bg-primary text-primary-foreground border-b border-border/20">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/software-application.png" alt="Site logo" width={28} height={28} />
          <span className="font-semibold">Kruti Patel</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-1.5 rounded-md transition-colors text-primary-foreground/90",
                pathname === item.href
                  ? "bg-secondary text-secondary-foreground font-medium"
                  : "hover:bg-secondary/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden text-sm opacity-90">Menu</div>
      </div>
    </header>
  );
}
