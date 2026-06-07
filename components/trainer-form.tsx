"use client";

import { useActionState, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { submitTrainerApplication } from "@/app/actions";
import type { LeadFormState } from "@/app/actions";
import { LOCATIONS } from "@/lib/validation";

type Region = (typeof LOCATIONS)[number];

const PLAY_LEVELS: { value: string; label: string }[] = [
  { value: "rec", label: "Recreatief" },
  { value: "wed", label: "Wedstrijd" },
  { value: "comp", label: "Hoog-competitief" },
];

const TEACH_EXPERIENCE: { value: string; label: string }[] = [
  { value: "geen", label: "Nog geen" },
  { value: "kort", label: "Minder dan 1 jaar" },
  { value: "midden", label: "1–3 jaar" },
  { value: "ervaren", label: "Meer dan 3 jaar" },
];

const INITIAL_STATE: LeadFormState = { ok: true };

const SEGMENT_CLASS =
  "border px-3 py-2 font-sans text-[13px] tracking-[-0.1px] transition-colors duration-150";

function segmentColors(active: boolean): string {
  return active
    ? "border-ink bg-ink text-bg"
    : "border-line bg-surface text-ink hover:border-ink";
}

export function TrainerForm() {
  const [playLevel, setPlayLevel] = useState("");
  const [teachExperience, setTeachExperience] = useState("");
  const [regions, setRegions] = useState<Region[]>([]);
  const [otherRegion, setOtherRegion] = useState("");
  const [ctaHover, setCtaHover] = useState(false);
  const otherInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction, isPending] = useActionState(
    submitTrainerApplication,
    INITIAL_STATE,
  );

  const toggleRegion = (region: Region) => {
    const isAdding = !regions.includes(region);

    setRegions((prev) => {
      const next = prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region];

      if (region === "Anders" && !next.includes("Anders")) {
        setOtherRegion("");
      }
      return next;
    });

    if (region === "Anders" && isAdding) {
      setTimeout(() => otherInputRef.current?.focus(), 0);
    }
  };

  const andersSelected = regions.includes("Anders");
  const fieldErrors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-5">
      <input type="hidden" name="playLevel" value={playLevel} />
      <input type="hidden" name="teachExperience" value={teachExperience} />
      <input type="hidden" name="regions" value={regions.join(",")} />
      <input type="hidden" name="otherRegion" value={otherRegion} />

      {/* Honeypot — buiten viewport gepositioneerd zodat bots invullen, mensen niet. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label>
          Website (laat leeg)
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      <div>
        <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-ink-dim">
          Speel-niveau
        </span>
        <div className="mt-2 flex flex-wrap gap-1">
          {PLAY_LEVELS.map((option) => {
            const active = playLevel === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => setPlayLevel(option.value)}
                className={cn(SEGMENT_CLASS, segmentColors(active))}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        {fieldErrors.playLevel && (
          <span className="mt-1 block font-mono text-[11px] text-terra">
            {fieldErrors.playLevel}
          </span>
        )}
      </div>

      <div>
        <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-ink-dim">
          Lesgeef-ervaring
        </span>
        <div className="mt-2 flex flex-wrap gap-1">
          {TEACH_EXPERIENCE.map((option) => {
            const active = teachExperience === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => setTeachExperience(option.value)}
                className={cn(SEGMENT_CLASS, segmentColors(active))}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        {fieldErrors.teachExperience && (
          <span className="mt-1 block font-mono text-[11px] text-terra">
            {fieldErrors.teachExperience}
          </span>
        )}
      </div>

      <div>
        <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-ink-dim">
          Regio&apos;s
        </span>
        <div className="mt-2 flex flex-wrap gap-1">
          {LOCATIONS.map((region) => {
            const active = regions.includes(region);
            return (
              <button
                key={region}
                type="button"
                aria-pressed={active}
                onClick={() => toggleRegion(region)}
                className={cn(SEGMENT_CLASS, segmentColors(active))}
              >
                {region}
              </button>
            );
          })}
        </div>

        {andersSelected && (
          <div className="mt-2">
            <input
              ref={otherInputRef}
              type="text"
              value={otherRegion}
              onChange={(e) => setOtherRegion(e.target.value)}
              placeholder="Bv. Bilthoven, Hilversum, Den Haag…"
              className="block w-full border border-line bg-surface px-4 py-2 font-sans text-[14px] text-ink placeholder:text-ink-mute focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
              aria-label="Andere regio"
            />
          </div>
        )}
      </div>

      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-ink-dim">
          Wanneer ben je beschikbaar?
        </span>
        <input
          type="text"
          name="availability"
          required
          maxLength={200}
          placeholder="Bv. wo/vr avonden + weekenden"
          aria-invalid={Boolean(fieldErrors.availability) || undefined}
          className="mt-1 block w-full border border-ink bg-surface px-4 py-3 font-sans text-[15px] text-ink placeholder:text-ink-mute focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
        />
        {fieldErrors.availability && (
          <span className="mt-1 block font-mono text-[11px] text-terra">
            {fieldErrors.availability}
          </span>
        )}
      </label>

      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-ink-dim">
          Over jezelf (optioneel)
        </span>
        <textarea
          name="about"
          rows={4}
          maxLength={500}
          placeholder="Waarom Courtside Padel, wat breng je mee?"
          aria-invalid={Boolean(fieldErrors.about) || undefined}
          className="mt-1 block w-full resize-y border border-line bg-surface px-4 py-3 font-sans text-[15px] text-ink placeholder:text-ink-mute focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
        />
        {fieldErrors.about && (
          <span className="mt-1 block font-mono text-[11px] text-terra">
            {fieldErrors.about}
          </span>
        )}
      </label>

      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-ink-dim">
          Naam
        </span>
        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          aria-invalid={Boolean(fieldErrors.name) || undefined}
          className="mt-1 block w-full border border-ink bg-surface px-4 py-3 font-sans text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
        />
        {fieldErrors.name && (
          <span className="mt-1 block font-mono text-[11px] text-terra">
            {fieldErrors.name}
          </span>
        )}
      </label>

      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-ink-dim">
          E-mailadres
        </span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          aria-invalid={Boolean(fieldErrors.email) || undefined}
          className="mt-1 block w-full border border-ink bg-surface px-4 py-3 font-sans text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
        />
        {fieldErrors.email && (
          <span className="mt-1 block font-mono text-[11px] text-terra">
            {fieldErrors.email}
          </span>
        )}
      </label>

      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-ink-dim">
          Telefoonnummer
        </span>
        <input
          type="tel"
          name="phone"
          required
          autoComplete="tel"
          aria-invalid={Boolean(fieldErrors.phone) || undefined}
          className="mt-1 block w-full border border-ink bg-surface px-4 py-3 font-sans text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
        />
        {fieldErrors.phone && (
          <span className="mt-1 block font-mono text-[11px] text-terra">
            {fieldErrors.phone}
          </span>
        )}
      </label>

      {!state.ok && state.error && (
        <p
          role="alert"
          className="border border-terra bg-surface px-4 py-3 font-mono text-[12px] text-terra"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        onMouseEnter={() => setCtaHover(true)}
        onMouseLeave={() => setCtaHover(false)}
        className="relative mt-2 flex w-full items-center justify-between overflow-hidden bg-ink px-5 py-[18px] font-serif text-[17px] tracking-[-0.3px] text-bg disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-terra transition-transform duration-[280ms] ease-cta-wipe",
            ctaHover && !isPending ? "translate-x-0" : "-translate-x-[101%]",
          )}
        />
        <span className="relative z-10">
          {isPending ? "Moment…" : "Versturen"}
        </span>
        <span
          className="relative z-10 font-mono text-[11px] tracking-[1px]"
          aria-hidden="true"
        >
          →
        </span>
      </button>

      <p className="text-[12px] leading-[1.5] text-ink-mute">
        Door te versturen ga je akkoord met onze{" "}
        <a href="/voorwaarden" className="underline">
          voorwaarden
        </a>
        {" en "}
        <a href="/privacy" className="underline">
          privacyverklaring
        </a>
        .
      </p>
    </form>
  );
}
