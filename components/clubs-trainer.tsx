const CLUBS: { tag: string; name: string }[] = [
  { tag: "PU", name: "Padel Utrecht" },
  { tag: "CC", name: "Court Club" },
  { tag: "RH", name: "RacketHouse" },
  { tag: "AP", name: "Amsterdam Padel" },
  { tag: "BO", name: "Boulevard" },
  { tag: "VR", name: "VRK Sports" },
];

const CERTS: { t: string; s: string }[] = [
  { t: "PPR", s: "Certified" },
  { t: "NGPB", s: "Level 3" },
  { t: "ESP", s: "Nationaal" },
];

export function ClubsAndTrainer() {
  return (
    <section aria-labelledby="partners-heading" className="pt-14">
      <div className="container-site">
        <div className="mb-4 flex items-center gap-[10px]">
          <div className="h-px w-6 bg-ink" />
          <span className="font-mono text-[10px] uppercase tracking-[1.6px] text-ink-dim">
            — Partners & trainers
          </span>
        </div>
        <h3
          id="partners-heading"
          className="mb-6 font-serif text-[26px] font-light leading-[1.05] tracking-[-0.6px]"
        >
          Op <em>18 clubs</em>, met gecertificeerde trainers.
        </h3>

        {/* Clubs grid */}
        <div className="grid grid-cols-3 border border-line bg-surface">
          {CLUBS.map((c, i) => (
            <div
              key={c.tag}
              className={`px-3 py-[22px] text-center ${
                i % 3 !== 2 ? "border-r border-line" : ""
              } ${i < 3 ? "border-b border-line" : ""}`}
            >
              <div className="mb-1 font-serif text-[22px] italic tracking-[-0.3px] text-green">
                {c.tag}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.6px] text-ink-mute">
                {c.name}
              </div>
            </div>
          ))}
        </div>

        {/* Trainer card */}
        <div className="relative mt-5 overflow-hidden bg-ink p-[18px] text-bg lg:-mx-10 lg:px-10 lg:py-6">
          <div className="mb-[14px] font-mono text-[10px] uppercase tracking-[1.2px] opacity-60">
            Hoofdtrainer
          </div>
          <div className="mb-4 flex items-end gap-[14px]">
            <div
              aria-hidden="true"
              className="flex h-[58px] w-[58px] shrink-0 items-center justify-center bg-terra font-serif text-[24px] italic text-bg"
            >
              RM
            </div>
            <div>
              <div className="font-serif text-[22px] leading-none tracking-[-0.4px]">
                Rafa Méndez
              </div>
              <div className="mt-1 text-[12px] opacity-60">
                Ex-Tour #142 · 12 jaar ervaring
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 border-t border-white/15 pt-[14px]">
            {CERTS.map((c, i) => (
              <div
                key={c.t}
                className={i !== 0 ? "border-l border-white/15 pl-3" : ""}
              >
                <div className="font-serif text-[14px] font-medium tracking-[-0.2px] text-bg">
                  {c.t}
                </div>
                <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.6px] opacity-50">
                  {c.s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
