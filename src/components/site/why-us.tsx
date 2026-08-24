import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Lock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { Container } from "./container";

const FEATURES = [
  {
    icon: Zap,
    title: "Fast Response",
    text: "Every consultation request is acknowledged the same working day — urgent bail and arrest matters get round-the-clock counsel availability.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Court Track Record",
    text: "Reported judgments and cause-list appearances before the High Court of Sindh, City Courts and Banking Courts — verifiable, not just claimed.",
  },
  {
    icon: FileText,
    title: "Transparent Legal Retainers",
    text: "Written engagement letters with fixed PKR fee schedules and milestone billing. You always know what you are paying for.",
  },
  {
    icon: Lock,
    title: "Strict Confidentiality",
    text: "Attorney-client confidentiality enforced at every level of the chamber, including secure handling of documents and case data.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-navy-50/60 py-20 md:py-24">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Why Choose Us"
            title="A Karachi Chamber Built on Trust & Results"
            description="Choosing an advocate in Karachi is a decision about your family, money or freedom. We make that decision easy with measurable standards of service."
          />
          <div className="mt-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 font-semibold text-gold-700 hover:text-gold-800"
            >
              Meet the chamber
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={0.07 * i}>
              <div className="h-full rounded-2xl border border-navy-100 bg-white p-6 shadow-sm shadow-navy-950/5">
                <span className="grid size-11 place-items-center rounded-xl bg-gold-100 text-gold-700">
                  <f.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy-950">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
