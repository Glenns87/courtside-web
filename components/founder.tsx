import Link from "next/link";

export function Founder() {
  return (
    <section aria-labelledby="founder-heading" className="pt-14">
      <div className="container-site">
        {/* Kicker */}
        <div className="mb-4 flex items-center gap-[10px]">
          <div className="h-px w-6 bg-ink" />
          <span className="font-mono text-[10px] uppercase tracking-[1.6px] text-ink-dim">
            — Waarom Courtside Padel
          </span>
        </div>

        {/* Headline */}
        <h2
          id="founder-heading"
          className="mb-6 font-serif text-[34px] font-light leading-[0.98] tracking-[-1px] text-ink"
        >
          Padel verdient <em>betere koppelingen.</em>
        </h2>

        {/* Founder-foto placeholder */}
        <div className="mb-6">
          <div
            aria-hidden="true"
            className="flex h-[58px] w-[58px] items-center justify-center bg-paper font-mono text-[18px] uppercase tracking-[1px] text-ink"
          >
            GS
          </div>
          <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.6px] text-ink-dim">
            Foto volgt
          </div>
        </div>

        {/* Intro */}
        <p className="text-[15px] leading-[1.6] text-ink-dim">
          Ik ben Glenn — initiatiefnemer van Courtside Padel. Ik speel zelf
          padel, en in mijn dagelijkse werk help ik bedrijven beter aansluiten
          op hun klanten. Op het snijvlak van die twee viel mijn oog op één
          probleem: het samenbrengen van spelers en trainers in Nederland gaat
          te vaak op de verkeerde manier. Te veel loting, te veel onbekend
          vooraf, te veel zelf zoeken.
        </p>

        {/* Signature */}
        <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[1px] text-ink-dim">
          — Glenn.
        </p>

        {/* Speler / trainer */}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[1.2px] text-ink-dim">
              Als speler weet je vooraf
            </div>
            <p className="text-[15px] leading-[1.6] text-ink-dim">
              Bij welke trainer je terechtkomt. Met welke medespelers. Op welk
              niveau. Geen loting, geen wachten op de volgende periode bij een
              specifieke club.
            </p>
          </div>
          <div>
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[1.2px] text-ink-dim">
              Als trainer krijg je
            </div>
            <p className="text-[15px] leading-[1.6] text-ink-dim">
              Spelers die passen — qua niveau, doelen en planning. Wij doen de
              werving en de eerste screening, jij doet waar je goed in bent.
            </p>
          </div>
        </div>

        {/* Sluitregel */}
        <p className="mt-8 text-[15px] leading-[1.6] text-ink">
          Courtside Padel is net begonnen. Wij koppelen persoonlijk, binnen 48
          uur na je aanmelding.
        </p>

        {/* CTA's */}
        <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2">
          <Link
            href="/aanvragen"
            className="font-serif text-[18px] tracking-[-0.3px] text-ink underline-offset-4 hover:underline"
          >
            → Vind jouw trainer
          </Link>
          <Link
            href="/trainer-worden"
            className="font-serif text-[18px] tracking-[-0.3px] text-ink underline-offset-4 hover:underline"
          >
            → Word ook trainer
          </Link>
        </div>
      </div>
    </section>
  );
}
