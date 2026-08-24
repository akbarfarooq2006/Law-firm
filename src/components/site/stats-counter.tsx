"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { STATS } from "@/lib/constants";
import { Container } from "./container";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();

    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-gold-300 sm:text-5xl">
      {value.toLocaleString("en-PK")}
      {suffix}
    </span>
  );
}

export function StatsCounter() {
  return (
    <section className="hero-grid-bg py-16">
      <Container className="grid grid-cols-2 gap-10 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <CountUp target={s.value} suffix={s.suffix} />
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-navy-300 sm:text-sm">
              {s.label}
            </p>
          </div>
        ))}
      </Container>
    </section>
  );
}
