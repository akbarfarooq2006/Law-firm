import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Scale } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { PRACTICE_AREAS } from "@/lib/practice-areas";
import { Container } from "./container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-navy-200">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.1fr]">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-white/5 text-gold-400">
              <Scale className="size-6" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-bold text-white">
                Rizvi Law Associates
              </span>
              <span className="block text-[11px] uppercase tracking-wider text-gold-400">
                Advocates &amp; Legal Consultants
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-300">
            {SITE.credential}. Serving individuals and businesses across Karachi with
            ethical advocacy, transparent retainers and a verified court track record
            since 2010.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-medium text-navy-300">
            {["Sindh Bar Council", "Karachi Bar Association", "High Court Bar Association"].map(
              (b) => (
                <span key={b} className="rounded-full border border-white/10 px-3 py-1">
                  {b}
                </span>
              )
            )}
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gold-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Practice areas */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            Practice Areas
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {PRACTICE_AREAS.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/services/${p.slug}`}
                  className="transition-colors hover:text-gold-300"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            Contact — Clifton Chamber
          </h4>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <span>
                {SITE.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <a href={SITE.phoneHref} className="hover:text-gold-300">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <a href={SITE.emailHref} className="break-all hover:text-gold-300">
                {SITE.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <span>{SITE.hours}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 pb-24 text-xs text-navy-400 md:flex-row md:items-center md:justify-between lg:pb-6">
          <p>
            © {year} Rizvi Law Associates. All rights reserved. Enrolled with the Sindh
            Bar Council.
          </p>
          <p className="max-w-xl md:text-right">
            Information on this website is general in nature and does not constitute
            legal advice or create an attorney-client relationship.
          </p>
        </Container>
      </div>
    </footer>
  );
}
