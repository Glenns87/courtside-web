import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/nav";
import { SiteFooter } from "@/components/footer";

export const metadata: Metadata = {
  title: "Bedankt",
  description: "We sturen je binnen 48 uur een voorstel voor je eerste les.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/aanvragen/bedankt" },
};

export default function BedanktPage() {
  return (
    <>
      <SiteNav />
      <section className="pt-14">
        <div className="container-site">
          <div className="mb-[22px] flex items-center gap-[10px]">
            <div className="h-px w-6 bg-ink" />
            <span className="font-mono text-[10px] uppercase tracking-[1.6px] text-ink-dim">
              — Verzonden
            </span>
          </div>
          <h1 className="font-serif text-[34px] font-light leading-[0.98] tracking-[-1px]">
            Mooi. <em>De service is aan ons.</em>
          </h1>
          <p className="mt-5 max-w-hero-sub text-[15px] leading-[1.55] text-ink-dim">
            We sturen je binnen 48 uur een voorstel voor je eerste les.
            Vrijblijvend en op jouw moment.
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 border border-ink px-5 py-3 font-mono text-[12px] uppercase tracking-[1.2px] text-ink transition-colors hover:bg-ink hover:text-bg"
          >
            ← Terug naar home
          </Link>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
