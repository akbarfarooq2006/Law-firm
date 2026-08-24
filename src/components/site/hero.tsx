"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CHAT_OPEN_EVENT } from "@/lib/constants";
import { Container } from "./container";

const JURISDICTIONS = [
  "High Court of Sindh — Karachi",
  "City Courts Karachi & Malir Courts",
  "Banking Courts Karachi",
  "Supreme Court of Pakistan (Appellate)",
];

export function Hero() {
  return (
    <section className="hero-grid-bg relative overflow-hidden text-white">
      <Container className="relative grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-300">
              <ShieldCheck className="size-4" />
              ADVOCATE HIGH COURT · 15+ YEARS EXPERIENCE IN KARACHI
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 font-display text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl xl:text-[3.6rem]"
          >
            Protecting Your Rights Across{" "}
            <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200 bg-clip-text text-transparent">
              Karachi&rsquo;s Courts
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-navy-200 sm:text-lg"
          >
            From property title verification in Clifton and Bahria Town to Khula decrees,
            bail matters and FBR disputes — Rizvi Law Associates delivers ethical,
            results-driven representation before every major forum in Sindh.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg">
              <Link href="/contact">
                Book Confidential Consultation
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="outlineLight"
              size="lg"
              onClick={() =>
                window.dispatchEvent(new CustomEvent(CHAT_OPEN_EVENT))
              }
            >
              <MessageCircle className="size-4" />
              Chat with AI Legal Assistant
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-navy-200"
          >
            <span className="flex items-center gap-1.5 font-semibold text-gold-300">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
              4.9 client rating
            </span>
            <span>500+ cases resolved</span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <span>Same-day response, Mon–Sat</span>
          </motion.div>
        </div>

        {/* Authority card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="rounded-3xl border border-white/10 bg-navy-900/70 p-7 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-9">
            <div className="flex items-center gap-3">
              <BadgeCheck className="size-6 text-gold-400" />
              <h2 className="font-display text-xl font-semibold">
                Jurisdictions We Practice In
              </h2>
            </div>
            <ul className="mt-6 space-y-4">
              {JURISDICTIONS.map((j) => (
                <li key={j} className="flex items-start gap-3 text-sm sm:text-base">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-400" />
                  <span className="text-navy-100">{j}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/5 py-4 text-center">
              {[
                ["15+", "Years"],
                ["500+", "Cases Won"],
                ["98%", "Success"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display text-2xl font-bold text-gold-300">{v}</p>
                  <p className="text-[11px] uppercase tracking-wider text-navy-300">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating accents */}
          <div className="animate-float absolute -left-4 -top-5 hidden rounded-2xl border border-white/10 bg-navy-800 px-4 py-3 shadow-xl sm:block">
            <p className="text-xs text-navy-300">Consultation Fee</p>
            <p className="font-display text-lg font-bold text-gold-300">Rs. 5,000</p>
          </div>
          <div className="animate-float-delayed absolute -bottom-6 -right-3 hidden rounded-2xl border border-white/10 bg-navy-800 px-4 py-3 shadow-xl sm:block">
            <p className="text-xs text-navy-300">Office</p>
            <p className="font-display text-sm font-semibold text-white">
              Executive Towers, Clifton
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
