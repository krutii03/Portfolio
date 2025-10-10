"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Schema = z.object({
  name: z.string().min(2, "Name is too short").max(100),
  email: z.string().email("Enter a valid email").max(200),
  message: z.string().min(10, "Tell me a bit more").max(2000),
  // honeypot, allow undefined but default to "" so server receives a string
  company: z.string().optional().default(""),
});
type FormValues = z.input<typeof Schema>;

export default function ContactPage() {
  const { register, handleSubmit, reset, formState } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error("Failed to send");
      toast.success("Message sent!");
      reset();
    } catch {
      toast.error("Could not send message. Please try again.");
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-semibold mb-2">Contact</h1>
      <p className="text-muted-foreground mb-8">Tell me about your idea, team, or research—happy to collaborate.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* honeypot */}
        <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register("company")} />
        <div>
          <label className="block text-sm mb-1">Name</label>
          <Input placeholder="Your name" {...register("name")} />
          {formState.errors.name && (
            <p className="text-sm text-red-500 mt-1">{formState.errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <Input type="email" placeholder="you@example.com" {...register("email")} />
          {formState.errors.email && (
            <p className="text-sm text-red-500 mt-1">{formState.errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm mb-1">Message</label>
          <Textarea rows={6} placeholder="How can I help?" {...register("message")} />
          {formState.errors.message && (
            <p className="text-sm text-red-500 mt-1">{formState.errors.message.message}</p>
          )}
        </div>
        <Button type="submit" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? "Sending..." : "Send"}
        </Button>
      </form>
    </section>
  );
}
