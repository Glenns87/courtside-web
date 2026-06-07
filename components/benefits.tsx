"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Benefit = {
  n: string;
  title: string;
  body: string;
};

const BENEFITS: Benefit[] = [
  {
    n: "I",
    title: "Slim gematcht op niveau",
    body: "Wij luisteren naar je niveau, voorkeur en doel, en koppelen je aan spelers waar je tegen groeit.",
  },
  {
    n: "II",
    title: "Progressie na elke les",
    body: "Korte terugkoppeling na elke les, zodat je weet wat de volgende stap is.",
  },
  {
    n: "III",
    title: "Plan wanneer jij wil",
    body: "Zeven dagen per week, vroeg tot laat. Persoonlijk contact binnen 48 uur na je aanmelding.",
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
                    <div className="text-[14px] leading-[1.5] text-ink-dim">
                      {b.body}
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
