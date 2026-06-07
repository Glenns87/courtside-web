import Link from "next/link";
import { SiteNav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { LiveScorecard } from "@/components/live-scorecard";
import { Benefits } from "@/components/benefits";
import { ClubsAndTrainer } from "@/components/clubs-trainer";
import { Founder } from "@/components/founder";
import { FinalCta } from "@/components/final-cta";
import { SiteFooter } from "@/components/footer";
import { localBusinessSchema, serviceSchema } from "@/lib/schema-org";

export default function HomePage() {
  return (
    <>
      {/* JSON-LD voor SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <SiteNav />
      <Hero />
      <LiveScorecard />
      <Benefits />
      <ClubsAndTrainer />
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
