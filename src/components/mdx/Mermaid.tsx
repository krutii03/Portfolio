"use client";

import { useEffect, useId, useRef, useState } from "react";

// Mermaid is dynamically imported to avoid SSR issues
export default function Mermaid({ code }: { code: string }) {
  const id = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({ startOnLoad: false, theme: "default" });
        if (!mounted) return;
        setReady(true);
        // defer rendering slightly for smooth fade-in
        requestAnimationFrame(async () => {
          if (ref.current) {
            try {
              const { svg } = await mermaid.render(`m-${id}`, code);
              ref.current.innerHTML = svg;
            } catch (err) {
              console.error("Mermaid render error", err);
              ref.current.innerText = String(err);
            }
          }
        });
      } catch (err) {
        console.error("Mermaid import/init error", err);
        if (ref.current) ref.current.innerText = String(err);
      }
    };
    init();
    return () => { mounted = false; };
  }, [code, id]);

  return (
    <div
      ref={ref}
      className="rounded-xl border p-3 bg-white transition-opacity duration-500"
      style={{ borderColor: "rgba(210,193,182,0.28)", opacity: ready ? 1 : 0 }}
    />
  );
}
