import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Benefits } from "@/components/benefits";
import { Founder } from "@/components/founder";
import { FinalCta } from "@/components/final-cta";
import { SiteFooter } from "@/components/footer";

export const metadata: Metadata = {
  title: { absolute: "Padelles op jouw niveau | Courtside Padel" },
  description:
    "Padelles die bij jou past — vooraf duidelijkheid over trainer, niveau en planning. Aanmelden duurt 60 seconden, koppeling binnen 48 uur.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Padelles op jouw niveau | Courtside Padel",
    description:
      "Padelles die bij jou past — vooraf duidelijkheid over trainer, niveau en planning. Aanmelden duurt 60 seconden, koppeling binnen 48 uur.",
    locale: "nl_NL",
    type: "website",
    siteName: "Courtside Padel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Padelles op jouw niveau | Courtside Padel",
    description:
      "Padelles die bij jou past — vooraf duidelijkheid over trainer, niveau en planning. Aanmelden duurt 60 seconden, koppeling binnen 48 uur.",
  },
};

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <Hero />
      <HowItWorks />
      <Benefits />
      <Founder />
      <FinalCta />

      <section className="border-y border-line py-12">
        <div className="container-site">
          <div className="mb-[14px] flex items-center gap-[10px]">
            <div className="h-px w-6 bg-ink" />
            <span className="font-mono text-[10px] uppercase tracking-[1.6px] text-ink-dim">
              — Voor trainers
            </span>
          </div>
          <p className="font-serif text-[20px] leading-[1.3] tracking-[-0.3px] text-ink">
            Ben jij padel-trainer?{" "}
            <Link
              href="/trainer-worden"
              className="underline-offset-4 hover:underline"
            >
              Word ook onderdeel van Courtside Padel →
            </Link>
          </p>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
