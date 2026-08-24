import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { Container } from "./container";

interface CtaBannerProps {
  title?: string;
  description?: string;
}

export function CtaBanner({
  title = "Ready to Discuss Your Case?",
  description = "Book a confidential 30-minute consultation at our Clifton chamber or over video call — Mon–Sat, 9:00 AM to 7:00 PM PKT.",
}: CtaBannerProps) {
  return (
    <section className="pb-20 md:pb-24">
      <Container>
        <Reveal>
          <div className="hero-grid-bg relative overflow-hidden rounded-3xl px-8 py-14 text-center sm:px-14">
            <h2 className="mx-auto max-w-xl font-display text-3xl font-bold text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-navy-200 sm:text-base">
              {description}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">
                  <CalendarCheck className="size-4" />
                  Book Consultation
                </Link>
              </Button>
              <Button variant="outlineLight" size="lg" asChild>
                <a href={SITE.phoneHref}>
                  <Phone className="size-4" />
                  Call {SITE.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
