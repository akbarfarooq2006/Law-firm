"use client";

import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";

const linkClasses =
  "font-medium text-gold-700 underline decoration-gold-500/50 underline-offset-2 hover:text-gold-600";

/**
 * Compact Markdown renderer tuned for 13px chat bubbles.
 * Raw HTML is escaped by react-markdown by default.
 */
const components: Components = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-2 ml-4 list-disc space-y-1 last:mb-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-2 ml-4 list-decimal space-y-1 last:mb-0">{children}</ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  h1: ({ children }) => (
    <p className="mb-1.5 mt-2 text-sm font-bold text-navy-950 first:mt-0">{children}</p>
  ),
  h2: ({ children }) => (
    <p className="mb-1.5 mt-2 text-sm font-bold text-navy-950 first:mt-0">{children}</p>
  ),
  h3: ({ children }) => (
    <p className="mb-1 mt-1.5 text-[13px] font-bold text-navy-950 first:mt-0">{children}</p>
  ),
  h4: ({ children }) => (
    <p className="mb-1 mt-1.5 text-[13px] font-bold text-navy-950 first:mt-0">{children}</p>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-2 border-l-2 border-gold-500/60 pl-2.5 text-navy-600 last:mb-0">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-navy-100 px-1 py-0.5 text-[12px]">{children}</code>
  ),
  a: ({ href, children }) =>
    href && href.startsWith("/") ? (
      <Link href={href} className={linkClasses}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
        {children}
      </a>
    ),
};

export function ChatMarkdown({ content }: { content: string }) {
  return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
}
