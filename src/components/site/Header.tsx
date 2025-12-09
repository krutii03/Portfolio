"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-primary text-primary-foreground border-b border-border/20">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
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
        <button
          ref={buttonRef}
          type="button"
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md hover:bg-secondary/60 active:bg-secondary/80 transition-colors cursor-pointer -mr-2 z-50 relative"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5 pointer-events-none" />
          ) : (
            <Menu className="h-5 w-5 pointer-events-none" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <nav 
          ref={menuRef}
          className="md:hidden border-t border-border/20 bg-primary z-50 relative"
        >
          <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={cn(
                  "px-3 py-2.5 rounded-md transition-colors text-primary-foreground/90 text-sm touch-manipulation",
                  pathname === item.href
                    ? "bg-secondary text-secondary-foreground font-medium"
                    : "hover:bg-secondary/60 active:bg-secondary/80"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
