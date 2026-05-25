"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Benefit = {
  n: string;
  title: string;
  body: string;
  stat: string;
  statLabel: string;
};

const BENEFITS: Benefit[] = [
  {
    n: "I",
    title: "Slim gematcht op niveau",
    body: "Onze match-engine leest je spel — ritme, placering, kracht — en koppelt je aan spelers waar je tegen groeit.",
    stat: "92%",
    statLabel: "match-accuracy",
  },
  {
    n: "II",
    title: "Progressie na elke les",
    body: "Meetbare voortgang. Na iedere sessie een persoonlijk rapport, video-moment en focus voor de volgende keer.",
    stat: "+18%",
    statLabel: "skill / 3 mnd",
  },
  {
    n: "III",
    title: "Plan wanneer jij wil",
    body: "Zeven dagen per week, vroeg tot laat. Kies je tijdslot en wij hebben binnen 48 uur je groep compleet.",
    stat: "48u",
    statLabel: "match-garantie",
  },
];

export function Benefits() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section aria-labelledby="benefits-heading" className="pt-14">
      <div className="container-site">
        <div className="mb-4 flex items-center gap-[10px]">
          <div className="h-px w-6 bg-ink" />
          <span className="font-mono text-[10px] uppercase tracking-[1.6px] text-ink-dim">
            — Het programma
          </span>
        </div>
        <h2
          id="benefits-heading"
          className="mb-7 font-serif text-[34px] font-light leading-[0.98] tracking-[-1px]"
        >
          Gebouwd voor
          <br />
          <em>echte progressie.</em>
        </h2>

        <div className="border-t border-line">
          {BENEFITS.map((b, i) => {
            const isHover = hovered === i;
            return (
              <div
                key={b.n}
                role="button"
                tabIndex={0}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className="relative cursor-pointer border-b border-line py-[22px] transition-colors duration-200"
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-[-20px] inset-y-0 bg-terra transition-opacity duration-200",
                    isHover ? "opacity-[0.06]" : "opacity-0",
                  )}
                />
                <div className="relative flex items-start gap-[14px]">
                  <div className="w-6 pt-1.5 font-serif text-[13px] italic text-terra">
                    {b.n}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1.5 flex items-baseline justify-between gap-3">
                      <div className="font-serif text-[20px] tracking-[-0.4px] text-ink">
                        {b.title}
                      </div>
                      <div
                        className={cn(
                          "whitespace-nowrap font-mono text-[11px] tracking-[0.4px] text-ink-mute transition-transform duration-200",
                          isHover ? "translate-x-1" : "translate-x-0",
                        )}
                        aria-hidden="true"
                      >
                        →
                      </div>
                    </div>
                    <div className="mb-2.5 text-[14px] leading-[1.5] text-ink-dim">
                      {b.body}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-[22px] font-medium tracking-[-0.4px] text-green">
                        {b.stat}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.6px] text-ink-mute">
                        {b.statLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
