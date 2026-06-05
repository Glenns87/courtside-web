import type { Metadata } from "next";
import { SiteNav } from "@/components/nav";
import { SiteFooter } from "@/components/footer";
import { TrainerForm } from "@/components/trainer-form";

export const metadata: Metadata = {
  title: "Word trainer",
  description:
    "Word trainer bij Courtside. We koppelen padel-spelers aan trainers in jouw regio — werk in je eigen tempo, op clubs die jij kiest.",
  robots: { index: true, follow: true },
};

export default function TrainerWordenPage() {
  return (
    <>
      <SiteNav />
      <section className="pt-14">
        <div className="container-site">
          <div className="mb-[22px] flex items-center gap-[10px]">
            <div className="h-px w-6 bg-ink" />
            <span className="font-mono text-[10px] uppercase tracking-[1.6px] text-ink-dim">
              — Voor trainers
            </span>
          </div>
          <h1 className="font-serif text-[34px] font-light leading-[0.98] tracking-[-1px] text-ink">
            Word trainer bij <em>Courtside</em>.
          </h1>
          <p className="mt-5 max-w-hero-sub text-[15px] leading-[1.55] text-ink-dim">
            We koppelen padel-spelers aan trainers in jouw regio. Werk in je
            eigen tempo, op clubs die jij kiest. Stuur dit formulier en we
            plannen een kennismaking.
          </p>

          <TrainerForm />
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
