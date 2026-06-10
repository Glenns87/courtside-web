type Step = { n: string; title: string; body: string };

const STEPS: Step[] = [
  {
    n: "I",
    title: "Jij stuurt je voorkeur",
    body: "Niveau, dagen en tijden die jou passen, en (als je dat al weet) of je een losse les of cursus zoekt.",
  },
  {
    n: "II",
    title: "Wij maken de koppeling",
    body: "Binnen 48 uur sturen we een voorstel: welke trainer, op welke locatie, met welke andere spelers.",
  },
  {
    n: "III",
    title: "Eerste les en kennismaking",
    body: "Klikt het? Door. Klikt het niet? Geen probleem, geen verplichting.",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-heading" className="pt-7">
      <div className="container-site">
        <div className="mb-4 flex items-center gap-[10px]">
          <div className="h-px w-6 bg-ink" />
          <span className="font-mono text-[10px] uppercase tracking-[1.6px] text-ink-dim">
            — Hoe het werkt
          </span>
        </div>
        <h2
          id="how-it-works-heading"
          className="mb-7 font-serif text-[34px] font-light leading-[0.98] tracking-[-1px]"
        >
          In drie stappen naar{" "}
          <br />
          <em>je eerste padeltraining</em>
        </h2>

        <div className="border-t border-line">
          {STEPS.map((s) => (
            <div key={s.n} className="border-b border-line py-[22px]">
              <div className="flex items-start gap-[14px]">
                <div className="w-6 pt-1.5 font-serif text-[13px] italic text-terra">
                  {s.n}
                </div>
                <div className="flex-1">
                  <div className="mb-1.5 font-serif text-[20px] tracking-[-0.4px] text-ink">
                    {s.title}
                  </div>
                  <div className="text-[14px] leading-[1.5] text-ink-dim">
                    {s.body}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
