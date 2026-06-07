import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/nav";
import { SiteFooter } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Hoe Courtside Padel met je persoonsgegevens omgaat — doel, rechtsgrond, bewaartermijn en je rechten onder de AVG.",
};

const LAST_UPDATED = "2 juni 2026";

export default function PrivacyPage() {
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
              — Privacy
            </span>
          </div>

          <h1 className="font-serif text-[34px] font-light leading-[0.98] tracking-[-1px] text-ink">
            Privacy<em>verklaring</em>.
          </h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.6px] text-ink-mute">
            Laatst bijgewerkt: {LAST_UPDATED}
          </p>

          {/* REVIEW JURIST: concept-tekst, nog niet juridisch getoetst. Loop alles na vóór publicatie. */}
          <div className="prose-courtside mt-8 space-y-6 text-[15px] leading-[1.6] text-ink">
            <p>
              Courtside Padel hecht waarde aan jouw privacy. In deze verklaring leggen we
              uit welke persoonsgegevens we verzamelen, waarom, hoe lang we ze
              bewaren en welke rechten je hebt onder de Algemene Verordening
              Gegevensbescherming (AVG).
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              1. Verwerkingsverantwoordelijke
            </h2>
            {/* REVIEW JURIST: vul de definitieve juridische entiteit, KvK-nummer en vestigingsadres in. */}
            <p>
              Courtside Padel [REVIEW JURIST: juridische naam], gevestigd te [REVIEW
              JURIST: adres], ingeschreven bij de Kamer van Koophandel onder
              nummer [REVIEW JURIST: KvK].
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              2. Welke gegevens verwerken we?
            </h2>
            <p>
              Wanneer je een aanvraag doet via deze website, verwerken we:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>E-mailadres (verplicht — om contact op te nemen)</li>
              <li>Telefoonnummer (optioneel — voor persoonlijke planning)</li>
              <li>Je niveau, gewenste dagen, tijden en voorkeurslocaties</li>
              <li>
                Technische gegevens: IP-adres (kortstondig, voor misbruikpreventie)
              </li>
            </ul>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              3. Doel en rechtsgrond
            </h2>
            <p>
              We gebruiken je gegevens uitsluitend om je aanvraag te behandelen
              en je te matchen met een passende trainer. Rechtsgrond: de uitvoering
              van de overeenkomst die we met je aangaan (art. 6 lid 1 sub b AVG)
              en jouw toestemming bij het versturen van het formulier (art. 6 lid
              1 sub a AVG).
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              4. Met wie delen we je gegevens?
            </h2>
            <p>
              We delen je gegevens met de volgende sub-verwerkers, uitsluitend
              voor zover noodzakelijk:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>Resend</strong> — e-mailverzending van je aanvraag naar
                ons team. {/* REVIEW JURIST: verwerkersovereenkomst Resend toetsen. */}
              </li>
              <li>
                <strong>Vercel</strong> — hosting van deze website.
                {/* REVIEW JURIST: hostingplatform — bevestigen of dit klopt vóór publicatie. */}
              </li>
            </ul>
            <p>
              We verkopen of verhuren je gegevens niet aan derden.
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              5. Bewaartermijn
            </h2>
            {/* REVIEW JURIST: bewaartermijn afstemmen met team — 12 maanden is voorstel. */}
            <p>
              We bewaren je aanvraaggegevens maximaal 12 maanden na ons laatste
              contact, tenzij een wettelijke bewaarplicht een langere termijn
              vereist. Daarna verwijderen we je gegevens uit onze systemen.
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              6. Je rechten
            </h2>
            <p>Je hebt onder de AVG het recht op:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>inzage in je persoonsgegevens;</li>
              <li>rectificatie van onjuiste gegevens;</li>
              <li>verwijdering van je gegevens;</li>
              <li>beperking van de verwerking;</li>
              <li>gegevensoverdraagbaarheid;</li>
              <li>bezwaar tegen verwerking;</li>
              <li>intrekken van je toestemming.</li>
            </ul>
            <p>
              Stuur je verzoek naar{" "}
              {/* REVIEW JURIST: contact-mailadres voor AVG-verzoeken vaststellen. */}
              <a
                href="mailto:privacy@courtside.nl"
                className="underline"
              >
                privacy@courtside.nl
              </a>
              . We reageren binnen vier weken.
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              7. Klachten
            </h2>
            <p>
              Heb je een klacht over hoe we met je gegevens omgaan? Je kunt
              altijd een klacht indienen bij de Autoriteit Persoonsgegevens via{" "}
              <a
                href="https://autoriteitpersoonsgegevens.nl"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                autoriteitpersoonsgegevens.nl
              </a>
              .
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              8. Wijzigingen
            </h2>
            <p>
              We kunnen deze verklaring aanpassen. De meest recente versie staat
              altijd op deze pagina; de datum bovenaan geeft aan wanneer we de
              tekst voor het laatst hebben bijgewerkt.
            </p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
