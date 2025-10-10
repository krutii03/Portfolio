import React from "react";
import CodeBlock from "./CodeBlock";
import Mermaid from "./Mermaid";
import type { MDXComponents as MDXMap } from "mdx/types";

// Map MDX elements to custom components
// - <pre> gets wrapped with a copy button via CodeBlock
// - code blocks with `language-mermaid` render Mermaid
// - blockquotes get palette-based borders

function Code(props: React.ComponentPropsWithoutRef<"code">) {
  const className: string | undefined = props.className as string | undefined;
  const isMermaid = typeof className === "string" && className.includes("language-mermaid");
  if (isMermaid) {
    const content = typeof props.children === "string" ? props.children : String(props.children ?? "");
    return <Mermaid code={content.trim()} />;
  }
  return <code {...props} />;
}

function Pre(props: React.HTMLAttributes<HTMLPreElement>) {
  return <CodeBlock>{props.children}</CodeBlock>;
}

function Blockquote(props: React.HTMLAttributes<HTMLQuoteElement>) {
  // Styling per spec: Note/Tip variants are commonly authored as "**Note:** text"
  return (
    <blockquote
      {...props}
      className="my-4 rounded-lg border-l-4 pl-4 py-2"
      style={{ borderColor: "rgba(210,193,182,0.4)", color: "var(--kp-accent)" }}
    />
  );
}

// Accept multiple ways of providing Mermaid content from MDX
function MermaidAdapter(
  props: { code?: string; chart?: string; children?: React.ReactNode; className?: string }
) {
  const content =
    props.code ??
    props.chart ??
    (typeof props.children === "string" ? props.children : String(props.children ?? ""));
  return <Mermaid code={content} />;
}

const MDXComponents: MDXMap = {
  code: Code,
  pre: Pre,
  blockquote: Blockquote,
  Mermaid: MermaidAdapter,
};

export default MDXComponents;
