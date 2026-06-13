"use client";

import { useState, useTransition } from "react";
import { usePostHog } from "posthog-js/react";
import { cn } from "@/lib/cn";
import { submitLeadIntent } from "@/app/actions";
import { NiveauQuiz } from "@/components/niveau-quiz";

type Level = "Beginner" | "Intermediate" | "Gevorderd";
type Day = "Ma" | "Di" | "Wo" | "Do" | "Vr" | "Za" | "Zo";

const LEVEL_META: Record<Level, string> = {
  Beginner: "0–1 jr",
  Intermediate: "1–3 jr",
  Gevorderd: "3+ jr",
};

const LEVELS: Level[] = ["Beginner", "Intermediate", "Gevorderd"];
const DAYS: Day[] = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

// 15 tijdslots: 08:00 t/m 22:00, één per uur
const TIMES: string[] = Array.from({ length: 15 }, (_, i) => {
  const hour = 8 + i;
  return `${String(hour).padStart(2, "0")}:00`;
});

export function HeroForm() {
  const [level, setLevel] = useState<Level>("Intermediate");
  const [days, setDays] = useState<Day[]>(["Wo"]);
  const [times, setTimes] = useState<string[]>(["19:00"]);
  const [isPending, startTransition] = useTransition();
  const [ctaHover, setCtaHover] = useState(false);
  const posthog = usePostHog();

  const toggleDay = (d: Day) => {
    setDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d],
    );
    posthog?.capture("day_selected", { day: d });
  };

  const toggleTime = (t: string) => {
    setTimes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
    posthog?.capture("time_selected", { time: t });
  };

  const hasSelection = days.length > 0 && times.length > 0;

  const handleSubmit = () => {
    if (!hasSelection) return;
    posthog?.capture("hero_cta_clicked", { level, days, times });
    startTransition(async () => {
      await submitLeadIntent({ level, days, times });
    });
  };

  return (
    <>
      {/* 01 — Niveau */}
      <div className="mt-8">
        <div className="mb-[10px] flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-ink-dim">
            01 — Niveau
          </span>
          <span className="font-serif text-[13px] italic text-terra">{LEVEL_META[level]}</span>
        </div>
        <div
          role="radiogroup"
          aria-label="Kies je niveau"
          className="flex border border-ink"
        >
          {LEVELS.map((l, i) => {
            const active = level === l;
            return (
              <button
                key={l}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => {
                  setLevel(l);
                  posthog?.capture("niveau_selected", { level: l });
                }}
                className={cn(
                  "flex-1 px-2 py-[14px] font-serif text-[14px] tracking-[-0.3px] transition-colors duration-200 md:text-[16px]",
                  active ? "bg-ink text-bg" : "bg-transparent text-ink",
                  i > 0 && !active && level !== LEVELS[i - 1] && "border-l border-ink",
                )}
              >
                {l}
              </button>
            );
          })}
        </div>

        {/* Niveau-quiz uitklap */}
        <NiveauQuiz onSelectLevel={setLevel} />
      </div>

      {/* 02 — Planning */}
      <div className="mt-[22px]">
        <div className="mb-[10px] flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-ink-dim">
            02 — Planning
          </span>
          <span className="font-mono text-[11px] tracking-[0.6px] text-terra">
            Kies één of meer
          </span>
        </div>
        <div className="border border-line bg-surface p-[14px]">
          {/* Dagen — multiselect */}
          <div
            className="mb-[10px] flex gap-1"
            role="group"
            aria-label="Kies één of meer dagen"
          >
            {DAYS.map((d) => {
              const active = days.includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleDay(d)}
                  className={cn(
                    "h-10 flex-1 text-[12px] font-medium tracking-[0.2px] transition-colors duration-150",
                    active ? "bg-green text-bg" : "bg-paper text-ink",
                  )}
                >
                  {d}
                </button>
              );
            })}
          </div>

          {/* Tijden — multiselect, 5 kolommen × 3 rijen = 15 slots */}
          <div
            className="grid grid-cols-5 gap-1"
            role="group"
            aria-label="Kies één of meer tijden"
          >
            {TIMES.map((t) => {
              const active = times.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleTime(t)}
                  className={cn(
                    "h-[34px] font-mono text-[11px] font-medium tracking-[0.2px] transition-colors duration-150",
                    active ? "bg-terra text-bg" : "bg-paper text-ink",
                  )}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* Selectie-samenvatting */}
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[1px] text-ink-mute">
            {days.length === 0 && times.length === 0
              ? "Nog geen selectie"
              : `${days.length} ${days.length === 1 ? "dag" : "dagen"} · ${times.length} ${
                  times.length === 1 ? "tijd" : "tijden"
                } geselecteerd`}
          </p>
        </div>
      </div>

      {/* Primaire CTA */}
      <button
        type="button"
        onClick={handleSubmit}
        onMouseEnter={() => setCtaHover(true)}
        onMouseLeave={() => setCtaHover(false)}
        disabled={isPending || !hasSelection}
        className="relative mt-[18px] flex w-full items-center justify-between overflow-hidden bg-ink px-5 py-[18px] font-serif text-[17px] tracking-[-0.3px] text-bg disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-terra transition-transform duration-[280ms] ease-cta-wipe",
            ctaHover && hasSelection ? "translate-x-0" : "-translate-x-[101%]",
          )}
        />
        <span className="relative z-10">
          {isPending ? "Moment…" : "Vind jouw trainer"}
        </span>
        <span className="relative z-10 font-mono text-[11px] tracking-[1px]">→</span>
      </button>
    </>
  );
}
