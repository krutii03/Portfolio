import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "sonner";
import { Schema } from "@/components/seo/Schema";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Kruti Patel – FinTech-minded Full-Stack & Analytics",
    template: "%s | KP Portfolio",
  },
  description:
    "Building reliable fintech experiences and data-driven products.",
  openGraph: {
    type: "website",
    url: "https://example.com",
    title: "Kruti Patel – FinTech-minded Full-Stack & Analytics",
    description:
      "Building reliable fintech experiences and data-driven products.",
    siteName: "KP Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kruti Patel – FinTech-minded Full-Stack & Analytics",
    description:
      "Building reliable fintech experiences and data-driven products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Schema />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster richColors position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
