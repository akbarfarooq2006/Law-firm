import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, CalendarDays, Clock, Tag } from "lucide-react";
import { getArticleBySlug } from "@/lib/supabase/queries";
import { formatDate } from "@/lib/utils";
import { CtaBanner } from "@/components/site/cta-banner";
import { Container } from "@/components/site/container";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { article } = await getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    alternates: { canonical: `/insights/${slug}` },
  };
}

/** Styled markdown mapping (avoids needing the typography plugin). */
const mdx = {
  h2: (p: React.ComponentProps<"h2">) => (
    <h2 className="mt-10 border-b border-navy-100 pb-2 font-display text-2xl font-bold text-navy-950" {...p} />
  ),
  h3: (p: React.ComponentProps<"h3">) => (
    <h3 className="mt-8 font-display text-xl font-semibold text-navy-950" {...p} />
  ),
  p: (p: React.ComponentProps<"p">) => <p className="mt-4 leading-relaxed text-navy-700" {...p} />,
  a: (p: React.ComponentProps<"a">) => (
    <a className="font-semibold text-gold-700 underline underline-offset-2 hover:text-gold-800" {...p} />
  ),
  ul: (p: React.ComponentProps<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-navy-700 marker:text-gold-600" {...p} />
  ),
  ol: (p: React.ComponentProps<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-navy-700 marker:font-semibold marker:text-gold-700" {...p} />
  ),
  strong: (p: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-navy-950" {...p} />
  ),
  em: (p: React.ComponentProps<"em">) => <em className="text-navy-900" {...p} />,
  blockquote: (p: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-6 rounded-r-xl border-l-4 border-gold-500 bg-gold-50 px-5 py-4 text-sm italic text-navy-800"
      {...p}
    />
  ),
  hr: () => <hr className="mt-10 border-navy-100" />,
  code: (p: React.ComponentProps<"code">) => (
    <code className="rounded bg-navy-100 px-1.5 py-0.5 font-mono text-[0.85em]" {...p} />
  ),
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const { article } = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <section className="hero-grid-bg py-16">
        <Container>
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-sm text-navy-300 transition-colors hover:text-gold-300"
          >
            <ArrowLeft className="size-4" />
            All Legal Insights
          </Link>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {(article.tags ?? []).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-gold-200"
              >
                <Tag className="size-3" />
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-navy-300">
            <span>{article.author}</span>
            {article.published_at && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                {formatDate(article.published_at)}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" />
              {article.reading_time ?? 5} min read
            </span>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-16">
        <Container>
          <article className="mx-auto max-w-3xl">
            {article.excerpt && (
              <p className="border-l-4 border-gold-500 pl-5 text-lg leading-relaxed text-navy-800">
                {article.excerpt}
              </p>
            )}
            <ReactMarkdown components={mdx}>{article.content_md}</ReactMarkdown>

            <div className="mt-12 rounded-2xl border border-navy-100 bg-white p-6 text-sm text-navy-600 shadow-sm">
              This article is general information under Pakistani federal and Sindh
              provincial law as of its publication date and does not constitute legal
              advice for any specific matter.
            </div>
          </article>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
