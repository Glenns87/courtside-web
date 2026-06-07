"use client";

import { useActionState, useRef, useState } from "react";
import { usePostHog } from "posthog-js/react";
import { cn } from "@/lib/cn";
import { submitLead } from "@/app/actions";
import type { LeadFormState } from "@/app/actions";
import { LOCATIONS } from "@/lib/validation";

type Location = (typeof LOCATIONS)[number];

const GROUP_SIZES: { value: string; label: string }[] = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "unknown", label: "Weet ik nog niet" },
];

const LESSON_TYPES: { value: string; label: string }[] = [
  { value: "losse", label: "Losse les" },
  { value: "cursus", label: "Cursus" },
  { value: "unknown", label: "Weet ik nog niet" },
];

const INITIAL_STATE: LeadFormState = { ok: true };

type Props = {
  level: string;
  days: string[];
  times: string[];
};

export function AanvragenForm({ level, days, times }: Props) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [otherLocation, setOtherLocation] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [lessonType, setLessonType] = useState("");
  const [ctaHover, setCtaHover] = useState(false);
  const otherInputRef = useRef<HTMLInputElement>(null);
  const posthog = usePostHog();
  const [state, formAction, isPending] = useActionState(
    submitLead,
    INITIAL_STATE,
  );

  const toggleLocation = (loc: Location) => {
    const isAdding = !locations.includes(loc);

    setLocations((prev) => {
      const next = prev.includes(loc)
        ? prev.filter((l) => l !== loc)
        : [...prev, loc];

      if (loc === "Anders" && !next.includes("Anders")) {
        setOtherLocation("");
      }
      return next;
    });

    posthog?.capture("location_toggled", {
      location: loc,
      action: isAdding ? "add" : "remove",
    });

    if (loc === "Anders" && isAdding) {
      setTimeout(() => otherInputRef.current?.focus(), 0);
    }
  };

  const andersSelected = locations.includes("Anders");
  const fieldErrors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-5">
      <input type="hidden" name="level" value={level} />
      <input type="hidden" name="days" value={days.join(",")} />
      <input type="hidden" name="times" value={times.join(",")} />
      <input type="hidden" name="locations" value={locations.join(",")} />
      <input type="hidden" name="otherLocation" value={otherLocation} />
      <input type="hidden" name="groupSize" value={groupSize} />
      <input type="hidden" name="lessonType" value={lessonType} />

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
          Voorkeur locatie (optioneel)
        </span>
        <div className="mt-2 flex flex-wrap gap-1">
          {LOCATIONS.map((loc) => {
            const active = locations.includes(loc);
            return (
              <button
                key={loc}
                type="button"
                aria-pressed={active}
                onClick={() => toggleLocation(loc)}
                className={cn(
                  "border px-3 py-2 font-sans text-[13px] tracking-[-0.1px] transition-colors duration-150",
                  active
                    ? "border-ink bg-ink text-bg"
                    : "border-line bg-surface text-ink hover:border-ink",
                )}
              >
                {loc}
              </button>
            );
          })}
        </div>

        {andersSelected && (
          <div className="mt-2">
            <input
              ref={otherInputRef}
              type="text"
              value={otherLocation}
              onChange={(e) => setOtherLocation(e.target.value)}
              placeholder="Bv. Bilthoven, Hilversum, Den Haag…"
              className="block w-full border border-line bg-surface px-4 py-2 font-sans text-[14px] text-ink placeholder:text-ink-mute focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
              aria-label="Andere voorkeurslocatie"
            />
          </div>
        )}
      </div>

      <div>
        <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-ink-dim">
          Wat heb je in gedachten?
        </span>
        <div className="mt-2 flex flex-wrap gap-1">
          {LESSON_TYPES.map((option) => {
            const active = lessonType === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setLessonType(option.value);
                  posthog?.capture("lesson_type_selected", {
                    lessonType: option.value,
                  });
                }}
                className={cn(
                  "border px-3 py-2 font-sans text-[13px] tracking-[-0.1px] transition-colors duration-150",
                  active
                    ? "border-ink bg-ink text-bg"
                    : "border-line bg-surface text-ink hover:border-ink",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <span className="font-mono text-[11px] uppercase tracking-[1.2px] text-ink-dim">
          Met hoeveel personen?
        </span>
        <p className="mt-1 text-[12px] leading-[1.5] text-ink-mute">
          1 = privéles, 4 = volledige groep
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {GROUP_SIZES.map((option) => {
            const active = groupSize === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setGroupSize(option.value);
                  posthog?.capture("group_size_selected", {
                    groupSize: option.value,
                  });
                }}
                className={cn(
                  "border px-3 py-2 font-sans text-[13px] tracking-[-0.1px] transition-colors duration-150",
                  active
                    ? "border-ink bg-ink text-bg"
                    : "border-line bg-surface text-ink hover:border-ink",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        {fieldErrors.groupSize && (
          <span className="mt-1 block font-mono text-[11px] text-terra">
            {fieldErrors.groupSize}
          </span>
        )}
      </div>

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
          Telefoonnummer (optioneel)
        </span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          aria-invalid={Boolean(fieldErrors.phone) || undefined}
          className="mt-1 block w-full border border-line bg-surface px-4 py-3 font-sans text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
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
