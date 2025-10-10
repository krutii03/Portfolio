import { NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";

const Schema = z.object({
  email: z.string().email().max(200),
  name: z.string().optional().default(""),
  consent: z.literal(true),
  company: z.string().optional().default(""), // honeypot
  sourcePage: z.string().optional().default("/newsletter"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
    }

    // Honeypot: silently succeed
    if (parsed.data.company && parsed.data.company.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const key = process.env.BUTTONDOWN_API_KEY;
    if (!key) {
      return NextResponse.json({ ok: false, error: "Missing BUTTONDOWN_API_KEY" }, { status: 500 });
    }

    // Call Buttondown Subscribers API (double opt-in recommended via dashboard settings)
    const resp = await fetch("https://api.buttondown.email/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: parsed.data.email,
        metadata: {
          name: parsed.data.name,
          sourcePage: parsed.data.sourcePage,
          subscribedAt: new Date().toISOString(),
        },
      }),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      console.error("Buttondown error", txt);
      return NextResponse.json({ ok: false, error: "Subscription service error" }, { status: 502 });
    }

    // Lightweight local log for analytics
    try {
      const dir = path.join(process.cwd(), "content", "newsletter");
      const file = path.join(dir, "subscribers.json");
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      const entry = {
        email: parsed.data.email,
        name: parsed.data.name,
        sourcePage: parsed.data.sourcePage,
        subscribedAt: new Date().toISOString(),
      };
      if (fs.existsSync(file)) {
        const arr = JSON.parse(fs.readFileSync(file, "utf-8"));
        if (Array.isArray(arr)) {
          arr.push(entry);
          fs.writeFileSync(file, JSON.stringify(arr, null, 2));
        }
      } else {
        fs.writeFileSync(file, JSON.stringify([entry], null, 2));
      }
    } catch {
      // non-fatal
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
