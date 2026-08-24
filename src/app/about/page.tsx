import type { Metadata } from "next";
import {
  Award,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Lock,
  Scale,
} from "lucide-react";
import { SITE } from "@/lib/constants";
import { SectionHeading } from "@/components/site/section-heading";
import { StatsCounter } from "@/components/site/stats-counter";
import { CtaBanner } from "@/components/site/cta-banner";
import { Reveal } from "@/components/site/reveal";
import { Container } from "@/components/site/container";

export const metadata: Metadata = {
  title: "About the Chamber",
  description:
    "Meet Muhammad Ahmed Rizvi, Advocate High Court, and the associates of Rizvi Law Associates — enrolled with the Sindh Bar Council and practicing across Karachi's courts since 2010.",
  alternates: { canonical: "/about" },
};

const TIMELINE = [
  {
    year: "2006",
    title: "Legal Education",
    text: "LL.B (Hons) — Sindh Muslim Law College, Karachi, with distinction in Constitutional Law.",
  },
  {
    year: "2008",
    title: "Enrolment — Sindh Bar Council",
    text: "Called to the bar and began practice at the City Courts Karachi under a senior chamber.",
  },
  {
    year: "2012",
    title: "High Court of Sindh",
    text: "Enrolled as an Advocate of the High Court of Sindh; built the property & commercial litigation desk.",
  },
  {
    year: "2016",
    title: "Chamber Founded in Clifton",
    text: "Established Rizvi Law Associates at Executive Towers, expanding into tax, banking and PECA practice.",
  },
  {
    year: "2021",
    title: "Supreme Court Appellate Practice",
    text: "Admitted to appear before the Supreme Court of Pakistan for selected appellate matters.",
  },
];

const VALUES = [
  {
    icon: Scale,
    title: "Ethics First",
    text: "No false promises, no inflated claims. If a matter is weak, you will hear that plainly — along with your realistic options.",
  },
  {
    icon: Lock,
    title: "Absolute Confidentiality",
    text: "Family matters, business disputes and criminal defenses are guarded by chamber-wide confidentiality protocols.",
  },
  {
    icon: HeartHandshake,
    title: "Pro Bono Commitment",
    text: "The chamber reserves monthly capacity for pro-bono representation through Sindh legal-aid initiatives and Karachi Bar welfare programs.",
  },
];

const TEAM = [
  {
    name: "Muhammad Ahmed Rizvi",
    role: "Founder & Principal — Advocate High Court",
    initials: "AR",
    bio: "15+ years before the High Court of Sindh. Property, corporate and constitutional litigation lead.",
  },
  {
    name: "Fatima Rizvi",
    role: "Associate — Family Law",
    initials: "FR",
    bio: "Khula, custody and succession specialist; LL.M (Family Law), University of Karachi.",
  },
  {
    name: "Hassan Mehmood",
    role: "Associate — Tax & Customs",
    initials: "HM",
    bio: "Ex-revenue officer; handles FBR/SRB audits, ATIR appeals and customs adjudication.",
  },
  {
    name: "Areeba Siddiqui",
    role: "Associate — Cyber Crime (PECA)",
    initials: "AS",
    bio: "Certified digital-forensics paralegal; FIA complaints, PECA trials and content takedowns.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="hero-grid-bg py-16 md:py-20">
        <Container>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">
              About Us
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              A Chamber Built on Principle, Proven in Court
            </h1>
            <p className="mt-5 max-w-2xl text-navy-200">
              {SITE.name} — {SITE.credential}. Led by {SITE.leadAdvocate},
              Advocate High Court, serving clients across Sindh since 2010.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Lead advocate biography */}
      <section className="py-20 md:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="rounded-3xl border border-navy-100 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto grid size-32 place-items-center rounded-full bg-navy-950 font-display text-4xl font-bold text-gold-400">
                {SITE.leadAdvocate
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold text-navy-950">
                {SITE.leadAdvocate}
              </h2>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-gold-700">
                {SITE.leadAdvocateTitle}
              </p>

              <ul className="mt-6 space-y-3 text-left text-sm text-navy-700">
                <li className="flex gap-2.5">
                  <GraduationCap className="mt-0.5 size-4 shrink-0 text-gold-600" />
                  LL.B (Hons), Sindh Muslim Law College, Karachi
                </li>
                <li className="flex gap-2.5">
                  <Award className="mt-0.5 size-4 shrink-0 text-gold-600" />
          Enrolled, Sindh Bar Council — 2008
                </li>
                <li className="flex gap-2.5">
                  <Landmark className="mt-0.5 size-4 shrink-0 text-gold-600" />
                  Advocate High Court — 2012 · Supreme Court enrolment — 2021
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading
              align="left"
              eyebrow="The Principal"
              title="Fifteen Years of Advocacy Across Sindh"
            />
            <div className="mt-6 space-y-5 leading-relaxed text-navy-700">
              <p>
                Mr. Rizvi began his career at the crowded rostrums of the Karachi City
                Courts, where he learned that credibility is an advocate&rsquo;s only
                currency. Over fifteen years, his chamber has grown from a two-desk
                criminal practice into a full-service firm advising families, traders and
                companies across Karachi — without losing the courtroom-first discipline
                it was founded on.
              </p>
              <p>
                His property-law work is particularly known for forensic due diligence:
                every file passes through Sub-Registrar certified-copy searches, revenue
                record checks and court-encumbrance screening before any transaction is
                blessed. That discipline has kept the chamber&rsquo;s clients out of
                most land litigation entirely.
              </p>
              <p>
                He appears personally in matters before the High Court of Sindh and the
                Supreme Court of Pakistan, while supervising associates handling Family,
                Tax and PECA dockets — ensuring senior oversight on every engagement,
                large or small.
              </p>
            </div>

            {/* Timeline */}
            <ol className="mt-10 space-y-0 border-l-2 border-navy-100 pl-6">
              {TIMELINE.map((t) => (
                <li key={t.year} className="relative pb-7 last:pb-0">
                  <span className="absolute -left-[31px] top-1 grid size-4 place-items-center rounded-full border-2 border-gold-500 bg-white" />
                  <p className="text-xs font-bold uppercase tracking-wider text-gold-700">
                    {t.year}
                  </p>
                  <h3 className="mt-0.5 font-display text-lg font-semibold text-navy-950">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-sm text-navy-600">{t.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-navy-50/60 py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Core Philosophy"
              title="What We Stand For"
              description="Three non-negotiables govern how this chamber practices law in Karachi."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-navy-100 bg-white p-7 shadow-sm">
                  <span className="grid size-12 place-items-center rounded-xl bg-gold-100 text-gold-700">
                    <v.icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-navy-950">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Our Team"
              title="Associates You Can Reach Directly"
              description="Every associate is enrolled with the Sindh Bar Council and works under the principal's direct supervision."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-navy-100 bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto grid size-16 place-items-center rounded-full bg-navy-950 font-display text-xl font-bold text-gold-400">
                    {m.initials}
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-navy-950">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold-700">
                    {m.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <StatsCounter />
      <CtaBanner
        title="Meet the Chamber in Person"
        description="Visit us at Executive Towers, Clifton — or start with a virtual consultation from anywhere in Pakistan or abroad."
      />
    </>
  );
}
