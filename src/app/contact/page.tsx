import type { Metadata } from "next";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { SITE } from "@/lib/constants";
import { Reveal } from "@/components/site/reveal";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/site/container";

export const metadata: Metadata = {
  title: "Contact & Appointment Booking",
  description:
    "Book a confidential legal consultation at our Clifton chamber (Executive Towers, Karachi) or virtually. Mon–Sat, 9:00 AM – 7:00 PM PKT. Phone +92 21 3583 1234.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="hero-grid-bg py-16 md:py-20">
        <Container>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">
              Contact Us
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Book Your Confidential Consultation
            </h1>
            <p className="mt-5 max-w-2xl text-navy-200">
              Choose a date and time that suits you — in-office at our Clifton chamber
              or virtual. Every request is acknowledged within one working day.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Booking */}
      <section className="py-16 md:py-20">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Info column */}
          <Reveal>
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-navy-100 bg-white p-7 shadow-sm">
                <h2 className="font-display text-xl font-bold text-navy-950">
                  Chamber Details
                </h2>
                <ul className="mt-5 space-y-5 text-sm">
                  <li className="flex gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold-100 text-gold-700">
                      <MapPin className="size-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-navy-950">Office Address</p>
                      {SITE.addressLines.map((l) => (
                        <p key={l} className="text-navy-600">
                          {l}
                        </p>
                      ))}
                    </div>
                  </li>
                  <li className="flex gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold-100 text-gold-700">
                      <Phone className="size-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-navy-950">Phone</p>
                      <a href={SITE.phoneHref} className="text-navy-600 hover:text-gold-700">
                        {SITE.phoneDisplay}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                      <MessageCircle className="size-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-navy-950">WhatsApp</p>
                      <a
                        href={SITE.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-navy-600 hover:text-gold-700"
                      >
                        {SITE.whatsappDisplay}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold-100 text-gold-700">
                      <Mail className="size-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-navy-950">Email</p>
                      <a href={SITE.emailHref} className="break-all text-navy-600 hover:text-gold-700">
                        {SITE.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold-100 text-gold-700">
                      <Clock className="size-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-navy-950">Office Timings</p>
                      <p className="text-navy-600">{SITE.hours}</p>
                      <p className="text-xs text-navy-400">Sunday closed</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-6 rounded-xl bg-navy-50 p-4 text-sm text-navy-700">
                  <span className="font-bold text-navy-950">Consultation fee:</span>{" "}
                  {SITE.consultationFeeLabel}. Payable at the appointment — no advance
                  required for booking.
                </div>
              </div>

              {/* Google Map */}
              <div className="overflow-hidden rounded-2xl border border-navy-100 shadow-sm">
                <iframe
                  title="Rizvi Law Associates — Executive Towers, Clifton, Karachi"
                  src="https://www.google.com/maps?q=Executive+Towers,+Block+5,+Clifton,+Karachi&output=embed"
                  width="100%"
                  height="300"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="block w-full border-0"
                />
              </div>
            </div>
          </Reveal>

          {/* Booking form */}
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-navy-100 bg-white p-8 shadow-lg shadow-navy-950/5 sm:p-10">
              <h2 className="font-display text-2xl font-bold text-navy-950">
                Appointment Request
              </h2>
              <p className="mt-1.5 text-sm text-navy-600">
                All fields marked * are required. Your information stays strictly
                confidential.
              </p>
              <div className="mt-8">
                <ConsultationForm />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* General inquiry */}
      <section className="bg-navy-50/60 py-16 md:py-20" id="inquiry">
        <Container className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-bold text-navy-950">
              Prefer to Write Instead?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-navy-600">
              Send a general inquiry and we&rsquo;ll respond by email within one working
              day.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-10 rounded-3xl border border-navy-100 bg-white p-8 shadow-sm sm:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
