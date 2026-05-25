import { CourtSVG } from "./court-svg";

export function LiveScorecard() {
  return (
    <section aria-label="Live wedstrijd in Utrecht" className="pt-7">
      <div className="container-site lg:-mx-10 lg:max-w-none lg:px-10">
        <div className="font-mono text-[10px] uppercase tracking-[1.4px] text-ink-mute">
          Nu op de baan — Utrecht
        </div>
        <div className="relative mt-2 overflow-hidden border border-ink bg-green p-[14px]">
          <div className="relative mb-3 aspect-[16/10] overflow-hidden">
            <CourtSVG />

            {/* LIVE chip */}
            <div className="absolute left-[10px] top-[10px] flex items-center gap-1.5 bg-bg px-[10px] py-1 font-mono text-[10px] tracking-[0.6px] text-ink">
              <span
                aria-hidden="true"
                className="block h-1.5 w-1.5 rounded-full bg-terra motion-safe:animate-pulse-live"
              />
              LIVE · SET 2
            </div>

            {/* Score */}
            <div className="absolute bottom-[10px] right-[10px] flex items-center gap-[10px] bg-bg px-[10px] py-1.5">
              <span className="font-mono text-[11px] text-ink-dim">
                JIJ <span className="font-bold text-terra">4</span>
              </span>
              <span aria-hidden="true" className="h-3 w-px bg-line" />
              <span className="font-mono text-[11px] text-ink-dim">
                HEN <span className="font-bold text-ink">3</span>
              </span>
            </div>
          </div>

          <div className="flex justify-between gap-2 pt-1">
            <Stat num="92%" label="match-score" />
            <Stat num="4/4" label="groep vol" accent />
            <Stat num="2.1u" label="tot start" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ num, label, accent }: { num: string; label: string; accent?: boolean }) {
  return (
    <div className="flex-1">
      <div
        className={`font-serif text-[22px] font-medium tracking-[-0.5px] ${
          accent ? "text-terra-lt" : "text-bg"
        }`}
      >
        {num}
      </div>
      <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.6px] text-bg/55">
        {label}
      </div>
    </div>
  );
}
