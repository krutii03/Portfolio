"use client";

import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function CodeBlock({ children }: Props) {
  const [copied, setCopied] = useState(false);

  let code = "";
  if (React.isValidElement(children)) {
    const pre = children as React.ReactElement<{ children?: React.ReactNode }>; 
    const preChildren = pre.props?.children;
    if (React.isValidElement(preChildren)) {
      const codeEl = preChildren as React.ReactElement<{ children?: React.ReactNode }>;
      const codeChildren = codeEl.props?.children;
      code = typeof codeChildren === "string" ? codeChildren.trim() : String(codeChildren ?? "");
    }
  }

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="relative group">
      <button
        onClick={onCopy}
        className="absolute right-2 top-2 z-10 rounded-md px-2 py-1 text-xs border bg-white/90 shadow transition"
        style={{ borderColor: "rgba(210,193,182,0.28)", color: "var(--kp-accent)" }}
        aria-label="Copy code"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <div className="overflow-auto rounded-xl border bg-white"
           style={{ borderColor: "rgba(210,193,182,0.28)" }}>
        {children}
      </div>
    </div>
  );
}
