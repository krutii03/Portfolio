import { getSiteData } from "@/lib/content";
import Hero from "./Hero";

export default function AboutPage() {
  const data = getSiteData();
  const profile = data?.profile ?? {};
  const skills = data?.skills ?? {};
  const workshops = data?.workshops ?? [];
  const personal = data?.personal ?? {};

  const resumeHref = profile?.links?.resume || "/Kruti_Patel_Resume.pdf";

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 space-y-12">
      {/* Hero */}
      <Hero resumeHref={resumeHref} />

      {/* Story */}
      <div className="mx-auto max-w-3xl space-y-4">
        <h2 className="text-2xl font-medium">💡 A Little About Me</h2>
        <p className="text-muted-foreground text-justify" style={{ textAlign: "justify" }}>
          My journey into tech started with curiosity — the kind that makes you click every button just to see what happens. What began as playful experimentation has grown into a disciplined passion for problem‑solving, data‑driven design, and scalable systems.
        </p>
        <p className="text-muted-foreground text-justify" style={{ textAlign: "justify" }}>
          I’ve developed projects like SplitEx, a secure group expense manager with verification and UPI integration, and WealthNest, a FinTech platform for portfolio analytics. These projects taught me that real development is more than syntax — it’s about building systems that people trust and enjoy using.
        </p>
        <p className="text-muted-foreground text-justify" style={{ textAlign: "justify" }}>
          I’m equally passionate about exploring AI tools, cloud infrastructure, and analytics, constantly experimenting with new frameworks and learning from every bug along the way.
        </p>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h2 className="text-2xl font-medium">🧠 Technical Stack</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="rounded-xl border p-4 bg-white">
              <h3 className="font-medium mb-2">{group}</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                {(items as string[]).map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Workshops */}
      <div className="space-y-4">
        <h2 className="text-2xl font-medium">🧩 Workshops & Seminars</h2>
        <ul className="space-y-2 list-disc pl-5 text-left">
          {workshops.map((w: string) => (
            <li key={w} className="text-sm text-muted-foreground">{w}</li>
          ))}
        </ul>
      </div>

      {/* Creative Side */}
      <div className="space-y-4 mx-auto max-w-3xl">
        <h2 className="text-2xl font-medium">🎨 Beyond the Screen</h2>
        <p className="text-muted-foreground text-justify" style={{ textAlign: "justify" }}>
          Outside of code, I’m a storyteller at heart. I write poetry, play the guitar, and capture the world through my lens. That creative balance helps me design with empathy, debug with patience, and communicate with clarity.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          {(personal?.interests || ["Poetry", "Guitar", "Photography"]).map((it: string) => (
            <span key={it} className="px-3 py-1 rounded-full border text-muted-foreground">{it}</span>
          ))}
        </div>
        <blockquote className="border-l-4 pl-4 italic text-muted-foreground">
          “Creativity is my debugging tool — it’s how I make both art and code more human.”
        </blockquote>
      </div>
    </section>
  );
}
