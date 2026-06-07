import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/nav";
import { SiteFooter } from "@/components/footer";
import { AanvragenForm } from "@/components/aanvragen-form";

export const metadata: Metadata = {
  title: "Vraag jouw padel-les aan op maat",
  description: "Rond je aanvraag af — laat je contactgegevens achter en wij matchen binnen 48 uur.",
  alternates: { canonical: "/aanvragen" },
};

type Params = Promise<{
  level?: string;
  days?: string;
  times?: string;
  // backward-compat met oude single-value query params
  day?: string;
  time?: string;
}>;

function splitCsv(value: string | undefined, fallback: string[]): string[] {
  if (!value) return fallback;
  const items = value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return items.length ? items : fallback;
}

export default async function AanvragenPage({ searchParams }: { searchParams: Params }) {
  const params = await searchParams;
  const level = params.level ?? "Intermediate";

  // Multi-value via "days"/"times" of fallback naar single "day"/"time" (legacy)
  const days = splitCsv(params.days ?? params.day, ["Wo"]);
  const times = splitCsv(params.times ?? params.time, ["19:00"]);

  return (
    <>
      <SiteNav />
      <section className="pt-10">
        <div className="container-site">
          {/* Terug-knop */}
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[1.2px] text-ink-dim hover:text-ink"
          >
            <span aria-hidden="true">←</span>
            <span>Terug naar homepage</span>
          </Link>

          <div className="mb-[22px] flex items-center gap-[10px]">
            <div className="h-px w-6 bg-ink" />
            <span className="font-mono text-[10px] uppercase tracking-[1.6px] text-ink-dim">
              — Laatste stap
            </span>
          </div>
          <h1 className="font-serif text-[34px] font-light leading-[0.98] tracking-[-1px] text-ink">
            Nog één <em>korte stap</em>.
          </h1>
          <p className="mt-5 max-w-hero-sub text-[15px] leading-[1.55] text-ink-dim">
            We matchen je binnen 48 uur met een groep op jouw niveau. Laat je gegevens achter —
            onze trainer belt je persoonlijk voor de planning.
          </p>

          <dl className="mt-7 grid grid-cols-3 border border-line bg-surface">
            <div className="border-r border-line px-3 py-[14px]">
              <dt className="font-mono text-[10px] uppercase tracking-[0.6px] text-ink-mute">
                Niveau
              </dt>
              <dd className="mt-1 font-serif text-[18px] tracking-[-0.3px] text-ink">{level}</dd>
            </div>
            <div className="border-r border-line px-3 py-[14px]">
              <dt className="font-mono text-[10px] uppercase tracking-[0.6px] text-ink-mute">
                {days.length === 1 ? "Dag" : "Dagen"}
              </dt>
              <dd className="mt-1 font-serif text-[18px] tracking-[-0.3px] text-ink">
                {days.join(", ")}
              </dd>
            </div>
            <div className="px-3 py-[14px]">
              <dt className="font-mono text-[10px] uppercase tracking-[0.6px] text-ink-mute">
                {times.length === 1 ? "Tijd" : "Tijden"}
              </dt>
              <dd className="mt-1 font-mono text-[14px] leading-[1.3] text-ink">
                {times.join(", ")}
              </dd>
            </div>
          </dl>

          {/* Stub form — Claude Code vervangt door server action + Sanity write */}
          <AanvragenForm level={level} days={days} times={times} />
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
