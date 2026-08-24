import Link from "next/link";
import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";

export default function NotFound() {
  return (
    <section className="hero-grid-bg flex min-h-[70vh] items-center py-20 text-white">
      <Container className="text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-white/10 text-gold-400">
          <Scale className="size-8" />
        </span>
        <p className="mt-6 font-display text-7xl font-bold text-gold-300">404</p>
        <h1 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
          This Page Is Out of Jurisdiction
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-navy-300">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved. Let&rsquo;s
          get you back on solid ground.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">Return Home</Link>
          </Button>
          <Button variant="outlineLight" size="lg" asChild>
            <Link href="/contact">Contact Our Office</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
