import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/testimonials";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { Container } from "./container";

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Client Testimonials"
            title="Trusted by Families & Businesses Across Karachi"
            description="Names shortened for privacy. Client identities and case records available on request during consultation."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={0.05 * (i % 3)}>
              <figure className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-sm shadow-navy-950/5">
                <Quote className="size-7 text-gold-300" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-navy-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-navy-100 pt-4">
                  <div className="mb-1 flex items-center gap-0.5 text-gold-500">
                    {[...Array(t.rating)].map((_, s) => (
                      <Star key={s} className="size-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-navy-950">{t.name}</p>
                  <p className="text-xs text-navy-500">{t.location}</p>
                  <p className="mt-1 inline-block rounded-full bg-gold-100/70 px-2.5 py-0.5 text-[11px] font-semibold text-gold-800">
                    {t.caseType}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
