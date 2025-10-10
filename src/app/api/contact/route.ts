import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  message: z.string().min(10).max(2000),
  // honeypot field; real users won't fill this
  company: z.string().optional().default("")
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
    }

    // basic honeypot: if company has any content, treat as bot
    if (parsed.data.company && parsed.data.company.trim().length > 0) {
      // pretend success to not tip off bots
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Send email via Resend REST API if configured; otherwise, log.
    const key = process.env.RESEND_API_KEY;
    if (key) {
      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "portfolio@resend.dev",
          to: [process.env.CONTACT_INBOX || "krutippatel@yahoo.com"],
          reply_to: parsed.data.email,
          subject: `New message from ${parsed.data.name}`,
          text: parsed.data.message,
        }),
      });
      if (!resp.ok) {
        console.error("Resend API error", await resp.text());
        return NextResponse.json({ ok: false, error: "Email service error" }, { status: 502 });
      }
    } else {
      console.log("Contact form submission", {
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
