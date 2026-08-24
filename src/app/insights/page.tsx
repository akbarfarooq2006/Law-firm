import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Tag } from "lucide-react";
import { getPublishedArticles } from "@/lib/supabase/queries";
import { formatDate } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";
import { CtaBanner } from "@/components/site/cta-banner";
import { Container } from "@/components/site/container";

// Articles must reflect live Supabase data at request time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Legal Insights",
  description:
    "Practical guides to Pakistani and Sindh law: property verification in Karachi, the Sindh Rented Premises Ordinance, succession certificates, Khula procedure and more.",
  alternates: { canonical: "/insights" },
};

export default async function InsightsPage() {
  const { articles, source } = await getPublishedArticles();
  const [featured, ...rest] = articles;

  return (
    <>
      <section className="hero-grid-bg py-16 md:py-20">
        <Container>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">
              Legal Insights
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Plain-Language Guides to Pakistani &amp; Sindh Law
            </h1>
            <p className="mt-5 max-w-2xl text-navy-200">
              Written by our advocates from real Karachi case files. General
              information only — not a substitute for advice on your specific matter.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          {!featured ? (
            <div className="rounded-2xl border border-dashed border-navy-200 bg-white p-14 text-center">
              <h2 className="font-display text-xl font-semibold text-navy-950">
                No articles published yet
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-navy-600">
                Once you connect Supabase and add rows to the{" "}
                <code className="rounded bg-navy-100 px-1.5 py-0.5 font-mono text-xs">
                  articles
                </code>{" "}
                table, they will appear here automatically.
              </p>
            </div>
          ) : (
            <>
              {/* Featured */}
              <Reveal>
                <Link
                  href={`/insights/${featured.slug}`}
                  className="group grid overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm transition-all hover:border-gold-300 hover:shadow-lg lg:grid-cols-[1fr_1.1fr]"
                >
                  <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-gold-800">
                      Featured Insight
                    </span>
                    <h2 className="font-display text-2xl font-bold leading-snug text-navy-950 group-hover:text-gold-800 sm:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-navy-600 sm:text-base">
                      {featured.excerpt}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-navy-500">
                      <span>{featured.author}</span>
                      {featured.published_at && (
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="size-3.5" />
                          {formatDate(featured.published_at)}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {featured.reading_time ?? 5} min read
                      </span>
                    </div>
                  </div>
                  <div className="relative hidden items-center justify-center bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-10 lg:flex">
                    <p className="font-display text-6xl font-bold leading-none text-gold-400/25 transition-transform duration-500 group-hover:scale-110">
                      &ldquo;
                    </p>
                    <ArrowRight className="absolute bottom-10 right-10 size-8 text-gold-300 transition-transform group-hover:translate-x-2" />
                  </div>
                </Link>
              </Reveal>

              {/* Grid */}
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((a, i) => (
                  <Reveal key={a.slug} delay={0.05 * (i % 3)}>
                    <Link
                      href={`/insights/${a.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg"
                    >
                      <div className="flex flex-wrap gap-1.5">
                        {(a.tags ?? []).slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-full bg-navy-50 px-2.5 py-1 text-[11px] font-medium text-navy-600"
                          >
                            <Tag className="size-3 text-gold-600" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="mt-4 font-display text-lg font-bold leading-snug text-navy-950 group-hover:text-gold-800">
                        {a.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">
                        {a.excerpt}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-navy-100 pt-4 text-xs text-navy-500">
                        <span>{a.author}</span>
                        {a.published_at && (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="size-3" />
                            {a.reading_time ?? 5} min
                          </span>
                        )}
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>

              {source === "seed" && (
                <p className="mt-10 text-center text-xs text-navy-400">
                  Showing bundled sample articles — connect Supabase to manage insights
                  dynamically.
                </p>
              )}
            </>
          )}
        </Container>
      </section>

      <CtaBanner
        title="Have a Question These Guides Didn't Answer?"
        description="Ask our AI legal assistant, or book a confidential consultation with an advocate."
      />
    </>
  );
}
