"use client";

import { useState } from "react";
import { usePostHog } from "posthog-js/react";
import { cn } from "@/lib/cn";

export function FinalCta() {
  const [hover, setHover] = useState(false);
  const posthog = usePostHog();

  return (
    <section aria-labelledby="final-cta-heading" className="px-0 pb-8 pt-14">
      <div className="container-site">
        <div className="relative overflow-hidden bg-green px-6 pb-7 pt-10 text-bg">
          <div
            aria-hidden="true"
            className="absolute right-5 top-[18px] font-serif text-[64px] font-light italic leading-none text-bg opacity-10"
          >
            03
          </div>
          <div className="mb-4 font-mono text-[10px] uppercase tracking-[1.4px] opacity-60">
            — Aanmelden
          </div>
          <h2
            id="final-cta-heading"
            className="mb-4 font-serif text-[34px] font-light leading-[0.95] tracking-[-1px]"
          >
            Elke week
            <br />
            <em>doorgroeien.</em>
            <br />
            Start vandaag.
          </h2>
          <p className="mb-6 max-w-[280px] text-[14px] leading-[1.5] opacity-[0.72]">
            Geen abonnement, geen verplichting. Wij koppelen persoonlijk.
          </p>

          <button
            type="button"
            onClick={() => posthog?.capture("final_cta_clicked")}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
            className={cn(
              "flex w-full items-center justify-between px-5 py-[18px] font-serif text-[17px] tracking-[-0.3px] transition-colors duration-200",
              hover ? "bg-terra text-bg" : "bg-bg text-green",
            )}
          >
            <span>Vind jouw trainer</span>
            <span
              aria-hidden="true"
              className={cn(
                "font-mono text-[11px] tracking-[1px] transition-transform duration-200",
                hover ? "translate-x-1" : "translate-x-0",
              )}
            >
              →
            </span>
          </button>

          <div className="mt-5 border-t border-white/15 pt-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.6px] opacity-70">
              Persoonlijk contact binnen 48 uur na je aanmelding.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
