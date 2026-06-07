"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Level = "Beginner" | "Intermediate" | "Gevorderd";

type Question = {
  id: string;
  label: string;
  options: { text: string; score: 0 | 1 | 2 }[];
};

const QUESTIONS: Question[] = [
  {
    id: "baseline",
    label: "Forehand & backhand vanaf de baseline",
    options: [
      { text: "Ik raak hem soms", score: 0 },
      { text: "Ik krijg 'm meestal goed terug", score: 1 },
      { text: "Ik kan plaatsen waar ik wil", score: 2 },
    ],
  },
  {
    id: "volleys",
    label: "Volleys aan het net",
    options: [
      { text: "Ik vermijd het net", score: 0 },
      { text: "Lukt soms", score: 1 },
      { text: "Stop- en harde volleys beheers ik", score: 2 },
    ],
  },
  {
    id: "bandeja",
    label: "Bandeja",
    options: [
      { text: "Wat is dat?", score: 0 },
      { text: "Ik probeer 'm", score: 1 },
      { text: "Ik gebruik 'm bewust", score: 2 },
    ],
  },
  {
    id: "smash",
    label: "Smash",
    options: [
      { text: "Niet aan beginnen", score: 0 },
      { text: "Lukt soms een por", score: 1 },
      { text: "Plaats ik gericht", score: 2 },
    ],
  },
  {
    id: "glass",
    label: "Spelen met het glas (boarduit + ricochets)",
    options: [
      { text: "Ik vermijd glas-ballen", score: 0 },
      { text: "Soms een lucky shot", score: 1 },
      { text: "Actief onderdeel van mijn spel", score: 2 },
    ],
  },
];

function scoreToLevel(score: number): Level {
  if (score <= 3) return "Beginner";
  if (score <= 7) return "Intermediate";
  return "Gevorderd";
}

export function NiveauQuiz({ onSelectLevel }: { onSelectLevel: (level: Level) => void }) {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number | undefined>>({});

  const answeredCount = Object.values(answers).filter((v) => v !== undefined).length;
  const allAnswered = answeredCount === QUESTIONS.length;
  const totalScore = Object.values(answers).reduce<number>(
    (sum, v) => sum + (v ?? 0),
    0,
  );
  const suggestedLevel = allAnswered ? scoreToLevel(totalScore) : null;

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="font-mono text-[11px] uppercase tracking-[1px] text-ink-dim underline-offset-2 hover:text-ink hover:underline"
      >
        {open ? "− Sluit niveau-test" : "Niet zeker? Bepaal je niveau →"}
      </button>

      {open && (
        <div className="mt-3 border border-line bg-surface p-[14px]">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[1.2px] text-ink-mute">
            5 korte vragen — antwoord eerlijk
          </p>
          <div className="flex flex-col gap-4">
            {QUESTIONS.map((q) => (
              <div key={q.id}>
                <div className="mb-1.5 font-serif text-[14px] tracking-[-0.2px] text-ink">
                  {q.label}
                </div>
                <div className="flex flex-col gap-1 sm:flex-row">
                  {q.options.map((opt) => {
                    const active = answers[q.id] === opt.score;
                    return (
                      <button
                        key={opt.text}
                        type="button"
                        aria-pressed={active}
                        onClick={() =>
                          setAnswers((prev) => ({ ...prev, [q.id]: opt.score }))
                        }
                        className={cn(
                          "flex-1 border px-3 py-2 text-left font-sans text-[12px] leading-tight transition-colors duration-150 sm:text-center",
                          active
                            ? "border-ink bg-ink text-bg"
                            : "border-line bg-bg text-ink hover:border-ink",
                        )}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {!allAnswered && (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[1px] text-ink-mute">
              {answeredCount} van {QUESTIONS.length} beantwoord
            </p>
          )}

          {allAnswered && suggestedLevel && (
            <div className="mt-5 border border-ink bg-green p-[14px] text-bg">
              <div className="font-mono text-[10px] uppercase tracking-[1.2px] opacity-70">
                Onze aanbeveling
              </div>
              <div className="mt-1 font-serif text-[22px] tracking-[-0.4px]">
                Niveau <em>{suggestedLevel}</em>{" "}
                <span className="font-mono text-[12px] opacity-60">
                  ({totalScore}/10)
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectLevel(suggestedLevel);
                  setOpen(false);
                }}
                className="mt-3 flex items-center gap-2 border border-bg/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[1px] hover:bg-bg hover:text-ink"
              >
                <span>Stel niveau in op {suggestedLevel}</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
