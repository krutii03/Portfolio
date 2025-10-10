"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Schema = z.object({
  email: z.string().email("Enter a valid email"),
  name: z.string().max(120).optional().default(""),
  consent: z
    .boolean()
    .refine((v) => v === true, { message: "Please agree to receive weekly emails." }),
  // honeypot
  company: z.string().optional().default(""),
  sourcePage: z.string().optional().default("/newsletter"),
});

type FormValues = z.input<typeof Schema>;

export function SubscribeForm({ variant = "full" }: { variant?: "full" | "compact" }) {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { email: "", name: "", consent: false, company: "", sourcePage: "/newsletter" },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json?.error || "Failed to subscribe");
      toast.success("Check your inbox to confirm.");
      reset({ email: "", name: "", consent: false, company: "", sourcePage: values.sourcePage });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Subscription failed. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col sm:flex-row gap-2">
        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("company")} />
        {/* implicit consent for compact footer opt-in */}
        <input type="checkbox" className="hidden" defaultChecked {...register("consent")} />
        <Input placeholder="Your email" type="email" className="bg-white border-[1px] border-[rgba(27,60,83,0.15)]" {...register("email")} />
        <Button type="submit" disabled={submitting} className="rounded-2xl bg-primary hover:bg-secondary">
          {submitting ? "Subscribing..." : "Subscribe"}
        </Button>
        {formState.errors.email && (
          <span className="sr-only">{formState.errors.email.message}</span>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-xl">
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("company")} />
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-foreground mb-1">Email</label>
          <Input type="email" placeholder="you@example.com" className="bg-white border-[1px] border-[rgba(27,60,83,0.15)] focus:ring-2 focus:ring-secondary" {...register("email")} />
          {formState.errors.email && (
            <p className="text-sm text-red-600 mt-1">{formState.errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-foreground mb-1">Name (optional)</label>
          <Input placeholder="Your name" className="bg-white border-[1px] border-[rgba(27,60,83,0.15)]" {...register("name")} />
        </div>
      </div>
      <div className="flex items-start gap-2">
        <input id="consent" type="checkbox" className="mt-1" {...register("consent")} />
        <label htmlFor="consent" className="text-sm text-muted-foreground">
          I agree to receive weekly emails from Kruti Patel.
        </label>
      </div>
      {formState.errors.consent && (
        <p className="text-sm text-red-600">{formState.errors.consent.message}</p>
      )}
      <Button type="submit" disabled={submitting} className="rounded-2xl bg-primary hover:bg-secondary">
        {submitting ? "Subscribing..." : "Subscribe"}
      </Button>
      <p className="text-xs text-muted-foreground">
        By subscribing, you agree to receive weekly emails from me. Unsubscribe anytime in one click.
      </p>
    </form>
  );
}
