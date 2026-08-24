import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpenText, MapPin } from "lucide-react";
import { PRACTICE_AREAS, getPracticeArea } from "@/lib/practice-areas";
import { FaqList } from "@/components/site/faq-list";
import { Reveal } from "@/components/site/reveal";
import { CtaBanner } from "@/components/site/cta-banner";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { Container } from "@/components/site/container";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRACTICE_AREAS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) return { title: "Practice Area Not Found" };
  return {
    title: area.title,
    description: area.description,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function PracticeAreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) notFound();

  const related = PRACTICE_AREAS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Header */}
      <section className="hero-grid-bg py-16 md:py-20">
        <Container>
          <Reveal>
            <nav className="text-xs text-navy-300" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-gold-300">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/services" className="hover:text-gold-300">Practice Areas</Link>
              <span className="mx-2">/</span>
              <span className="text-gold-300">{area.title}</span>
            </nav>
            <div className="mt-6 flex items-start gap-5">
              <span className="hidden size-16 shrink-0 place-items-center rounded-2xl bg-white/10 text-gold-400 sm:grid">
                <area.icon className="size-8" />
              </span>
              <div>
                <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                  {area.title}
                </h1>
                <p className="mt-2 max-w-2xl text-navy-200">{area.tagline}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Main content */}
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-navy-950">
                Overview
              </h2>
              {area.overview.map((para, i) => (
                <p key={i} className="mt-4 leading-relaxed text-navy-700">
                  {para}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-12 font-display text-2xl font-bold text-navy-950">
                What We Handle
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {area.offerings.map((o) => (
                  <div
                    key={o.title}
                    className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm"
                  >
                    <h3 className="flex items-center gap-2 text-sm font-bold text-navy-950">
                      <span className="size-1.5 rounded-full bg-gold-500" />
                      {o.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy-600">
                      {o.description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {area.urduTerms && area.urduTerms.length > 0 && (
              <Reveal delay={0.05}>
                <div className="mt-10 rounded-2xl border border-gold-300/50 bg-gold-50 p-6">
                  <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-navy-950">
                    <BookOpenText className="size-5 text-gold-700" />
                    Urdu Legal Terms You May Hear
                  </h3>
                  <dl className="mt-4 space-y-2.5 text-sm">
                    {area.urduTerms.map((t) => (
                      <div key={t.term} className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                        <dt className="shrink-0 font-bold text-gold-800 sm:w-40">
                          {t.term}
                        </dt>
                        <dd className="text-navy-700">{t.meaning}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.05}>
              <div className="mt-10 flex flex-wrap gap-2">
                {area.venues.map((v) => (
                  <span
                    key={v}
                    className="inline-flex items-center gap-1.5 rounded-full bg-navy-100 px-3 py-1.5 text-xs font-semibold text-navy-800"
                  >
                    <MapPin className="size-3 text-gold-700" />
                    {v}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* FAQs */}
            <Reveal delay={0.05}>
              <h2 className="mt-14 font-display text-2xl font-bold text-navy-950">
                Frequently Asked Questions
              </h2>
              <div className="mt-6">
                <FaqList items={area.faqs} />
              </div>
            </Reveal>

            {/* Related */}
            <Reveal delay={0.05}>
              <h2 className="mt-14 font-display text-2xl font-bold text-navy-950">
                Related Practice Areas
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/services/${r.slug}`}
                    className="group rounded-xl border border-navy-100 bg-white p-4 shadow-sm transition-all hover:border-gold-300 hover:shadow-md"
                  >
                    <r.icon className="size-5 text-gold-700" />
                    <p className="mt-2.5 text-sm font-bold leading-snug text-navy-950 group-hover:text-gold-800">
                      {r.title}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gold-700">
                      Explore
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Sticky booking sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <div className="rounded-3xl border border-navy-100 bg-white p-7 shadow-lg shadow-navy-950/5">
                <h2 className="font-display text-xl font-bold text-navy-950">
                  Book a Consultation
                </h2>
                <p className="mt-1.5 text-sm text-navy-600">
                  Discuss your {area.title.toLowerCase()} matter confidentially with an
                  advocate.
                </p>
                <div className="mt-6">
                  <ConsultationForm />
                </div>
              </div>
            </Reveal>
          </aside>
        </Container>
      </section>

      <CtaBanner
        title={`Need Urgent Help With a ${area.title.split(" ")[0]} Matter?`}
        description="Call our chamber directly — urgent bail and arrest matters are handled on priority, Mon–Sat."
      />
    </>
  );
}
