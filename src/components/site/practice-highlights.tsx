import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRACTICE_AREAS } from "@/lib/practice-areas";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { Container } from "./container";

export function PracticeHighlights() {
  return (
    <section className="py-20 md:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Core Practice Areas"
            title="Legal Expertise Where Karachi Needs It Most"
            description="Six focused practice desks covering the disputes and transactions that matter most to families and businesses in Sindh."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRACTICE_AREAS.map((area, i) => (
            <Reveal key={area.slug} delay={0.06 * (i % 3)}>
              <Link
                href={`/services/${area.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-sm shadow-navy-950/5 transition-all hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg hover:shadow-gold-600/10"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-navy-950 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                  <area.icon className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-navy-950">
                  {area.title}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold-700">
                  {area.tagline}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-600">
                  {area.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition-colors group-hover:text-gold-700">
                  Explore this practice
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
