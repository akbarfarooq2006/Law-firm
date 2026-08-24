import { BadgeCheck, Landmark } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";
import { Container } from "./container";

export function TrustBadges() {
  return (
    <section className="border-b border-navy-100 bg-white">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4">
        {TRUST_BADGES.map((badge) => (
          <div
            key={badge.title}
            className="flex items-center justify-center gap-3 text-center"
          >
            <span className="hidden size-11 shrink-0 place-items-center rounded-full bg-gold-100 text-gold-700 sm:grid">
              <BadgeCheck className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-navy-950">
                {badge.title}
              </span>
              <span className="mt-0.5 flex items-center justify-center gap-1.5 text-xs text-navy-500 sm:justify-start">
                <Landmark className="size-3" />
                {badge.caption}
              </span>
            </span>
          </div>
        ))}
      </Container>
    </section>
  );
}
