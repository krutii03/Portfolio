import React from "react";
import { getSiteData } from "@/lib/content";

export function Schema() {
  const data = getSiteData();
  const profile = data?.profile ?? {};
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile?.name || "Kruti Patel",
    description:
      profile?.summary ||
      "Full-Stack Developer focused on FinTech and Analytics.",
    url: base,
    sameAs: [profile?.links?.linkedin, profile?.links?.github].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressLocality: profile?.location || "Surat, Gujarat, India",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KP Portfolio",
    url: base,
  };

  const personJson = JSON.stringify(person);
  const websiteJson = JSON.stringify(website);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteJson }} />
    </>
  );
}
