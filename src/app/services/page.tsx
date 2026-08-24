import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { PRACTICE_AREAS } from "@/lib/practice-areas";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { CtaBanner } from "@/components/site/cta-banner";
import { Container } from "@/components/site/container";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Corporate & commercial litigation, property & real estate law, family law (Khula, custody, succession), criminal defense & bail, tax & customs, and cyber crime (PECA) — practiced across the High Court of Sindh and Karachi City Courts.",
  alternates: { canonical: "/services" },
};

const PROCESS = [
  {
    step: "01",
    title: "Confidential Consultation",
    text: "A 30-minute session (in Clifton or virtual) to understand facts, review documents and set expectations in writing.",
  },
  {
    step: "02",
    title: "Case Strategy & Written Retainer",
    text: "You receive a documented strategy, realistic timeline and a fixed PKR fee schedule before any court filing.",
  },
  {
    step: "03",
    title: "Representation & Updates",
    text: "We appear before the relevant forum and keep you updated after every hearing — by call, WhatsApp or email.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="hero-grid-bg py-16 md:py-20">
        <Container>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">
              Practice Areas
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Focused Desks for the Legal Issues Karachi Actually Faces
            </h1>
            <p className="mt-5 max-w-2xl text-navy-200">
              Six practice areas, each led by an advocate who works in that forum every
              week — from the Sub-Registrar&rsquo;s office to the Supreme Court.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRACTICE_AREAS.map((area, i) => (
            <Reveal key={area.slug} delay={0.05 * (i % 3)}>
              <Link
                href={`/services/${area.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-navy-950 text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-950">
                  <area.icon className="size-6" />
                </span>
                <h2 className="mt-5 font-display text-xl font-semibold text-navy-950">
                  {area.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">
                  {area.description}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {area.offerings.slice(0, 3).map((o) => (
                    <li
                      key={o.title}
                      className="flex items-center gap-2 text-xs font-medium text-navy-500"
                    >
                      <span className="size-1.5 rounded-full bg-gold-500" />
                      {o.title}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-start gap-1.5 border-t border-navy-100 pt-4 text-[11px] leading-snug text-navy-400">
                  <MapPin className="mt-px size-3.5 shrink-0 text-gold-600" />
                  {area.venues.join(" · ")}
                </div>

                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 group-hover:text-gold-700">
                  View details &amp; FAQs
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Process */}
      <section className="bg-navy-50/60 py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How We Work"
              title="From First Call to Final Order"
            />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.07}>
                <div className="relative h-full rounded-2xl border border-navy-100 bg-white p-7 shadow-sm">
                  <span className="font-display text-5xl font-bold text-gold-300">
                    {p.step}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-navy-950">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
