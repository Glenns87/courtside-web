import { SiteNav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { LiveScorecard } from "@/components/live-scorecard";
import { Benefits } from "@/components/benefits";
import { ClubsAndTrainer } from "@/components/clubs-trainer";
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
      <FinalCta />
      <SiteFooter />
    </>
  );
}
