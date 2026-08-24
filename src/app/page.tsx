import type { Metadata } from "next";
import { Hero } from "@/components/site/hero";
import { TrustBadges } from "@/components/site/trust-badges";
import { PracticeHighlights } from "@/components/site/practice-highlights";
import { WhyChooseUs } from "@/components/site/why-us";
import { StatsCounter } from "@/components/site/stats-counter";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { CtaBanner } from "@/components/site/cta-banner";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <PracticeHighlights />
      <WhyChooseUs />
      <StatsCounter />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
