"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Scale, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "./container";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when a link inside it is clicked (see onClick below)
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled || open
          ? "border-navy-100 bg-white/90 shadow-sm shadow-navy-950/5 backdrop-blur-md"
          : "border-transparent bg-white"
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-navy-950 text-gold-400 transition-transform group-hover:scale-105">
            <Scale className="size-6" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold tracking-tight text-navy-950">
              Rizvi Law Associates
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-wider text-gold-700">
              Advocates &amp; Legal Consultants · Karachi
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-navy-50 text-navy-950"
                    : "text-navy-600 hover:bg-navy-50 hover:text-navy-950"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-gold-700"
          >
            <Phone className="size-4 text-gold-600" />
            {SITE.phoneDisplay}
          </a>
          <Button asChild size="sm" className="h-10">
            <Link href="/contact">Book Consultation</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid size-11 place-items-center rounded-xl border border-navy-200 text-navy-900 lg:hidden cursor-pointer"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-navy-100 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium",
                    active ? "bg-navy-50 text-navy-950" : "text-navy-600"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2 flex flex-col gap-2 border-t border-navy-100 pt-3">
              <Button asChild>
                <Link href="/contact">Book Confidential Consultation</Link>
              </Button>
              <a
                href={SITE.phoneHref}
                className="flex items-center justify-center gap-2 py-2 text-sm font-semibold text-navy-800"
              >
                <Phone className="size-4 text-gold-600" /> {SITE.phoneDisplay}
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
