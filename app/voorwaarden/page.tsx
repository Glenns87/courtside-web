import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/nav";
import { SiteFooter } from "@/components/footer";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description:
    "De voorwaarden waaronder Courtside je matcht met een trainer en lessen aanbiedt.",
};

const LAST_UPDATED = "2 juni 2026";

export default function VoorwaardenPage() {
  return (
    <>
      <SiteNav />
      <section className="pt-10 pb-20">
        <div className="container-site max-w-[760px]">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[1.2px] text-ink-dim hover:text-ink"
          >
            <span aria-hidden="true">←</span>
            <span>Terug naar homepage</span>
          </Link>

          <div className="mb-[22px] flex items-center gap-[10px]">
            <div className="h-px w-6 bg-ink" />
            <span className="font-mono text-[10px] uppercase tracking-[1.6px] text-ink-dim">
              — Voorwaarden
            </span>
          </div>

          <h1 className="font-serif text-[34px] font-light leading-[0.98] tracking-[-1px] text-ink">
            Algemene <em>voorwaarden</em>.
          </h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.6px] text-ink-mute">
            Laatst bijgewerkt: {LAST_UPDATED}
          </p>

          {/* REVIEW JURIST: volledige concept-tekst, nog niet juridisch getoetst. Laat een jurist dit doorlopen vóór publicatie. */}
          <div className="prose-courtside mt-8 space-y-6 text-[15px] leading-[1.6] text-ink">
            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              1. Wie zijn wij?
            </h2>
            {/* REVIEW JURIST: identieke entiteitsgegevens als in privacyverklaring opvoeren. */}
            <p>
              Courtside [REVIEW JURIST: juridische naam] (&ldquo;Courtside&rdquo;,
              &ldquo;wij&rdquo;) verbindt sporters met padel- en tennistrainers
              via deze website.
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              2. Toepasselijkheid
            </h2>
            <p>
              Deze voorwaarden gelden voor iedere aanvraag die je via courtside.nl
              indient en voor elke overeenkomst die daaruit voortkomt. Door je
              aanvraag te versturen ga je met deze voorwaarden akkoord.
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              3. Aanvraag en bevestiging
            </h2>
            <p>
              Een ingevuld formulier is een <em>aanvraag</em>, geen reservering.
              We nemen binnen 48 uur contact op met een voorstel. Een overeenkomst
              komt pas tot stand zodra je dat voorstel bevestigt.
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              4. Tarieven en betaling
            </h2>
            {/* REVIEW JURIST: tarieven, BTW-status en betalingstermijnen invullen. */}
            <p>
              [REVIEW JURIST: tarieven, BTW-status en betalingsvoorwaarden — nog
              in te vullen.]
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              5. Annulering en wijziging
            </h2>
            {/* REVIEW JURIST: annuleringsbeleid afstemmen (24u? 48u? kosteloos?). */}
            <p>
              [REVIEW JURIST: annuleringsbeleid — voorstel: kosteloos annuleren
              tot 48 uur voor de afgesproken les; daarna 50% kosten.]
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              6. Aansprakelijkheid
            </h2>
            {/* REVIEW JURIST: aansprakelijkheidsbeperking en blessure-disclaimer juridisch beoordelen. */}
            <p>
              Sportbeoefening brengt risico op blessures met zich mee. Deelname
              is volledig op eigen risico. Courtside is niet aansprakelijk voor
              schade ontstaan tijdens of door deelname aan lessen, tenzij sprake
              is van opzet of grove schuld aan de zijde van Courtside.
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              7. Privacy
            </h2>
            <p>
              Hoe we met je persoonsgegevens omgaan staat beschreven in onze{" "}
              <Link href="/privacy" className="underline">
                privacyverklaring
              </Link>
              .
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              8. Toepasselijk recht
            </h2>
            <p>
              Op deze voorwaarden is uitsluitend Nederlands recht van toepassing.
              Geschillen worden voorgelegd aan de bevoegde rechter te [REVIEW
              JURIST: rechtbankplaats — Utrecht of Amsterdam].
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              9. Wijzigingen
            </h2>
            <p>
              Courtside kan deze voorwaarden wijzigen. De meest recente versie
              staat op deze pagina; de datum bovenaan geeft aan wanneer de tekst
              voor het laatst is bijgewerkt.
            </p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
