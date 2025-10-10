import { SubscribeForm } from "@/components/newsletter/SubscribeForm";

export default function NewsletterPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-foreground">Newsletter</h1>
      <p className="text-muted-foreground mt-2">Weekly posts on full‑stack, fintech, and learning. Subscribe to get updates in your inbox.</p>
      <div className="mt-6">
        <SubscribeForm />
      </div>
    </section>
  );
}
