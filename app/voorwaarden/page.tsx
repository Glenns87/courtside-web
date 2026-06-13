import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/nav";
import { SiteFooter } from "@/components/footer";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description:
    "De voorwaarden waaronder Courtside Padel je matcht met een trainer en lessen aanbiedt.",
  alternates: { canonical: "/voorwaarden" },
  robots: { index: false, follow: true },
};

const LAST_UPDATED = "13 juni 2026";

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

          <div className="prose-courtside mt-8 space-y-6 text-[15px] leading-[1.6] text-ink">
            <p>
              Deze algemene voorwaarden zijn van toepassing op het gebruik van de
              website courtsidepadel.nl en de matching-dienst van Courtside Padel,
              een initiatief van Glenn Snel, te bereiken via{" "}
              <a href="mailto:privacy@courtsidepadel.nl" className="underline">
                privacy@courtsidepadel.nl
              </a>
              .
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              Artikel 1 — Definities
            </h2>
            <p>In deze voorwaarden worden de volgende termen gebruikt:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                <strong>Courtside Padel</strong>: het matching-platform dat
                padel-spelers en zelfstandige padel-trainers met elkaar in contact
                brengt, beheerd door Glenn Snel.
              </li>
              <li>
                <strong>Speler</strong>: een natuurlijke persoon die via de website
                van Courtside Padel een aanvraag doet om gekoppeld te worden aan een
                padel-trainer.
              </li>
              <li>
                <strong>Trainer</strong>: een zelfstandige padel-coach of -trainer
                die zich aanmeldt om via Courtside Padel gekoppeld te worden aan
                spelers.
              </li>
              <li>
                <strong>Aanvraag</strong>: een verzoek tot bemiddeling, ingediend
                via een van de formulieren op de website van Courtside Padel.
              </li>
              <li>
                <strong>Les-overeenkomst</strong>: de overeenkomst die rechtstreeks
                tot stand komt tussen Speler en Trainer voor het verzorgen van
                padel-lessen — Courtside Padel is hierbij geen partij.
              </li>
            </ol>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              Artikel 2 — Toepasselijkheid
            </h2>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                Deze voorwaarden zijn van toepassing op iedere Aanvraag, ieder
                gebruik van de website van Courtside Padel en iedere
                bemiddelingsdienst die Courtside Padel verricht.
              </li>
              <li>
                Door het versturen van een Aanvraag geeft Speler of Trainer aan
                kennis te hebben genomen van deze voorwaarden en hiermee akkoord te
                gaan.
              </li>
              <li>
                Afwijkingen van deze voorwaarden zijn alleen geldig als ze
                schriftelijk door Courtside Padel zijn bevestigd.
              </li>
              <li>
                Indien een bepaling van deze voorwaarden nietig blijkt, blijven de
                overige bepalingen onverminderd van kracht.
              </li>
            </ol>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              Artikel 3 — De dienst van Courtside Padel
            </h2>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                Courtside Padel is een matching-platform: wij brengen Spelers en
                Trainers met elkaar in contact op basis van voorkeuren, niveau,
                planning en locatie.
              </li>
              <li>
                Courtside Padel biedt zelf geen padel-lessen aan en is geen
                werkgever of opdrachtgever van Trainers. Trainers zijn zelfstandige
                professionals die in eigen verantwoordelijkheid lessen verzorgen.
              </li>
              <li>
                Courtside Padel spant zich naar redelijkheid in om voor elke
                Aanvraag een passende Trainer voor te stellen, maar garandeert geen
                matching. Het kan voorkomen dat geen geschikte Trainer beschikbaar
                is binnen jouw voorkeuren of regio.
              </li>
              <li>
                De bemiddeling van Courtside Padel is voor Spelers kosteloos.
                Eventuele kosten van padel-lessen, baan-huur of andere diensten
                komen voort uit de directe afspraak tussen Speler en Trainer.
              </li>
            </ol>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              Artikel 4 — Wat een aanvraag inhoudt
            </h2>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                Een Aanvraag is een uiting van interesse — geen boeking, geen
                reservering en geen verplichte afname. Door het versturen van een
                Aanvraag ben je nog tot niets verbonden.
              </li>
              <li>
                Courtside Padel neemt na ontvangst van een Aanvraag binnen 48 uur
                persoonlijk contact op met een voorstel of vervolgvraag.
              </li>
              <li>
                Speler kan een Aanvraag op elk moment intrekken zonder opgaaf van
                reden, door een e-mail te sturen naar{" "}
                <a href="mailto:privacy@courtsidepadel.nl" className="underline">
                  privacy@courtsidepadel.nl
                </a>
                .
              </li>
              <li>
                Pas wanneer Speler en Trainer rechtstreeks een afspraak maken voor
                een specifieke les, ontstaat er een Les-overeenkomst tussen die twee
                partijen onderling.
              </li>
            </ol>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              Artikel 5 — Trainer-aanmeldingen
            </h2>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                Trainers kunnen zich via het trainer-formulier aanmelden om in de
                matching-pool van Courtside Padel te worden opgenomen.
              </li>
              <li>
                Een aanmelding van een Trainer leidt niet automatisch tot opname.
                Courtside Padel behoudt zich het recht voor om aanmeldingen te
                beoordelen en eventueel te weigeren.
              </li>
              <li>
                Trainers die opgenomen worden in de matching-pool verklaren dat zij
                beschikken over de benodigde vaardigheden, eventuele certificeringen
                en verzekeringen die nodig zijn om padel-lessen te verzorgen.
              </li>
              <li>
                Courtside Padel kan de samenwerking met een Trainer op elk moment
                beëindigen indien er signalen zijn dat de Trainer niet langer
                voldoet aan deze vereisten.
              </li>
            </ol>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              Artikel 6 — Aansprakelijkheid
            </h2>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                Courtside Padel is uitsluitend aansprakelijk voor schade die het
                directe gevolg is van een toerekenbare tekortkoming in de
                bemiddelingsdienst die Courtside Padel zelf verricht.
              </li>
              <li>
                Courtside Padel is niet aansprakelijk voor:
                <ul className="list-disc space-y-1 pl-6">
                  <li>
                    De kwaliteit of inhoud van de Les-overeenkomst tussen Speler en
                    Trainer;
                  </li>
                  <li>Het handelen of nalaten van Trainers tijdens of buiten de les;</li>
                  <li>
                    Blessures of schade die ontstaan tijdens het padel-spelen of in
                    een padel-faciliteit;
                  </li>
                  <li>
                    Onbeschikbaarheid van banen, faciliteiten of andere externe
                    omstandigheden;
                  </li>
                  <li>
                    Indirecte of gevolgschade van welke aard dan ook, waaronder
                    gederfde inkomsten en gemiste kansen.
                  </li>
                </ul>
              </li>
              <li>
                Voor zover Courtside Padel aansprakelijk is, is de aansprakelijkheid
                in totaal beperkt tot een bedrag van €500 per gebeurtenis.
              </li>
              <li>
                De beperkingen in dit artikel gelden niet voor opzet of bewuste
                roekeloosheid aan de zijde van Courtside Padel.
              </li>
            </ol>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              Artikel 7 — Intellectueel eigendom
            </h2>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                Alle inhoud van de website van Courtside Padel — waaronder teksten,
                vormgeving, logo&rsquo;s, afbeeldingen en software — is eigendom van
                Courtside Padel of haar licentiegevers.
              </li>
              <li>
                Het is niet toegestaan deze inhoud te kopiëren, te verveelvoudigen,
                te bewerken of openbaar te maken zonder voorafgaande schriftelijke
                toestemming, anders dan voor persoonlijk en niet-commercieel
                gebruik.
              </li>
            </ol>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              Artikel 8 — Klachten
            </h2>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                Heb je een klacht over de dienst van Courtside Padel? Stuur dan een
                e-mail naar{" "}
                <a href="mailto:privacy@courtsidepadel.nl" className="underline">
                  privacy@courtsidepadel.nl
                </a>
                . We streven ernaar binnen vier weken een passende reactie te geven
                en samen tot een oplossing te komen.
              </li>
              <li>
                Klachten over de inhoud van een specifieke padel-les of het gedrag
                van een Trainer richt je rechtstreeks aan de betreffende Trainer,
                aangezien de Les-overeenkomst tussen jou en de Trainer onderling tot
                stand komt.
              </li>
            </ol>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              Artikel 9 — Wijzigingen voorwaarden
            </h2>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                Courtside Padel kan deze voorwaarden van tijd tot tijd wijzigen. De
                meest recente versie staat altijd op deze pagina; de datum bovenaan
                geeft aan wanneer we de tekst voor het laatst hebben bijgewerkt.
              </li>
              <li>
                Bij ingrijpende wijzigingen die gevolgen hebben voor lopende
                afspraken brengt Courtside Padel betrokkenen daarvan op de hoogte.
              </li>
            </ol>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              Artikel 10 — Toepasselijk recht en geschillen
            </h2>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                Op deze voorwaarden en op alle bemiddeling door Courtside Padel is
                Nederlands recht van toepassing.
              </li>
              <li>
                Geschillen die voortvloeien uit het gebruik van de website of de
                bemiddelingsdienst worden, voor zover wettelijk toegestaan,
                voorgelegd aan de bevoegde Nederlandse rechter.
              </li>
            </ol>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
