const CLUBS: { tag: string; name: string }[] = [
  { tag: "PU", name: "Padel Utrecht" },
  { tag: "CC", name: "Court Club" },
  { tag: "RH", name: "RacketHouse" },
  { tag: "AP", name: "Amsterdam Padel" },
  { tag: "BO", name: "Boulevard" },
  { tag: "VR", name: "VRK Sports" },
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
      </div>
    </section>
  );
}
