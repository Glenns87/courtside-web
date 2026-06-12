import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/nav";
import { SiteFooter } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Hoe Courtside Padel met je persoonsgegevens omgaat — doel, rechtsgrond, bewaartermijn en je rechten onder de AVG.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

const LAST_UPDATED = "13 juni 2026";

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

          <div className="prose-courtside mt-8 space-y-6 text-[15px] leading-[1.6] text-ink">
            <p>
              Dit is de privacyverklaring van Courtside Padel, een initiatief van
              Glenn Snel, te bereiken via{" "}
              <a href="mailto:privacy@courtsidepadel.nl" className="underline">
                privacy@courtsidepadel.nl
              </a>
              . In dit document leggen we uit hoe we omgaan met de verwerking van
              je persoonsgegevens. Bij elke verwerking betrachten we de grootst
              mogelijke zorgvuldigheid.
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              1. Verkrijging persoonsgegevens
            </h2>
            <p>
              Wanneer je gebruikmaakt van de website van Courtside Padel of een
              aanvraag indient via het formulier, verstrek je zelf
              persoonsgegevens aan ons. Onder persoonsgegevens verstaan we alle
              gegevens die betrekking hebben op een geïdentificeerde of
              identificeerbare natuurlijke persoon.
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              2. Categorieën persoonsgegevens
            </h2>
            <p>
              Courtside Padel verwerkt de volgende categorieën van
              persoonsgegevens:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                Contactgegevens (e-mailadres, telefoonnummer indien opgegeven,
                naam indien opgegeven);
              </li>
              <li>
                Voorkeursgegevens (gewenst niveau, dagen, tijden, locatie, type
                lessen, groepsgrootte);
              </li>
              <li>
                Technische gegevens (IP-adres, browsertype, apparaatinformatie —
                voor misbruikpreventie en functionele werking van de website);
              </li>
              <li>
                Overige door jou zelf verstrekte persoonsgegevens (bijvoorbeeld in
                een open tekstveld of in correspondentie).
              </li>
            </ul>
            <p>
              We vragen of verwerken geen bijzondere persoonsgegevens (zoals VOG,
              KvK-uittreksel, ID-bewijs of medische gegevens) via deze website.
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              3. Doel van de verwerking
            </h2>
            <p>
              De persoonsgegevens die we verwerken hebben tot doel:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Contact met je op te nemen om je aanvraag te behandelen;</li>
              <li>Je te matchen met een passende trainer en groep;</li>
              <li>Onze dienstverlening uit te kunnen voeren;</li>
              <li>
                Onze dienstverlening en website te verbeteren op basis van
                geanonimiseerde gebruiksanalyse;
              </li>
              <li>Te voldoen aan eventuele wettelijke verplichtingen;</li>
              <li>
                Met derden gegevens uit te wisselen voor zover noodzakelijk voor
                de uitvoering van de dienstverlening (zie ook artikel 7).
              </li>
            </ul>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              4. Grondslag verwerking
            </h2>
            <p>
              Het verwerken van persoonsgegevens is mogelijk op grond van de
              volgende grondslagen: (i) wettelijke verplichting, (ii) uitvoering
              van de overeenkomst, (iii) verkregen toestemming van de betrokkene,
              en (iv) gerechtvaardigd belang.
            </p>
            <p>
              Voor de gegevens die je via het aanvraagformulier indient, geldt als
              grondslag: jouw toestemming bij het versturen van het formulier
              (art. 6 lid 1 sub a AVG) en de uitvoering van de overeenkomst (art.
              6 lid 1 sub b AVG) wanneer er een vervolgafspraak ontstaat.
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              5. Noodzaak verwerking
            </h2>
            <p>
              De verwerking van je persoonsgegevens is noodzakelijk om onze
              dienstverlening uit te kunnen voeren. Zonder verwerking kunnen we
              geen contact opnemen, geen passende trainer voorstellen en geen les
              inplannen. Indien voor specifieke doeleinden expliciete toestemming
              vereist is, vragen we dat apart.
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              6. Bewaartermijn
            </h2>
            <p>
              Courtside Padel hanteert de volgende bewaartermijnen:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                Leadgegevens zonder vervolg (waar geen vervolgcontact ontstaat):
                maximaal 6 maanden na indiening, daarna anonimiseren of
                verwijderen.
              </li>
              <li>
                Klantgegevens na les of vervolgcontact: maximaal 24 maanden na het
                laatste contact, daarna anonimiseren of verwijderen.
              </li>
              <li>
                Financiële administratie: 7 jaar conform de fiscale bewaarplicht{" "}
                {/* REVIEW JURIST: alleen relevant zodra Courtside Padel facturen of betalingen verwerkt — momenteel niet van toepassing */}
                .
              </li>
            </ul>
            <p>
              Indien een langere bewaartermijn noodzakelijk is op grond van wet- of
              regelgeving, worden de gegevens langer bewaard conform die eisen.
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              7. Verwerking door derden
            </h2>
            <p>
              Courtside Padel deelt persoonsgegevens slechts met derden indien dit
              strikt noodzakelijk is voor de uitvoering van de overeenkomst en om
              te voldoen aan relevante wet- en regelgeving. We verkopen of verhuren
              je gegevens nooit aan derden.
            </p>
            <p>
              De sub-verwerkers waarmee we persoonsgegevens delen zijn:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>Vercel Inc.</strong> — hosting van de website en uitvoering
                van het server-side aanvraagproces. Vercel kan technische metadata
                verwerken (zoals IP-adres tijdens een bezoek). Gegevens worden waar
                mogelijk verwerkt binnen de EU.
              </li>
              <li>
                <strong>Resend Inc.</strong> — verzending van bevestigings- en
                notificatiemails namens Courtside Padel. Verwerkte gegevens:
                contactgegevens en de inhoud van je aanvraag. Resend opereert
                vanuit de EU-regio.
              </li>
              <li>
                <strong>PostHog Inc.</strong> — geanonimiseerde gebruiksanalyse van
                de website (welke knoppen worden geklikt, welke pagina&apos;s worden
                bezocht). PostHog wordt gehost op de EU-server (Frankfurt). We
                verwerken geen persoonlijk identificeerbare gegevens via PostHog:
                e-mailadres, telefoonnummer en namen worden uitgesloten van
                event-properties.
              </li>
            </ul>
            <p>
              Met al deze sub-verwerkers worden waar nodig verwerkersovereenkomsten
              gesloten conform AVG.
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              8. Beveiliging van persoonsgegevens
            </h2>
            <p>
              Courtside Padel neemt het beschermen van je persoonsgegevens serieus
              en hanteert passende technische en organisatorische maatregelen om
              een beveiligingsniveau te waarborgen dat afgestemd is op de aard,
              omvang en context van de verwerking. Concreet onder andere:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Versleuteld dataverkeer (HTTPS overal);</li>
              <li>
                Beveiligingsheaders die misbruik voorkomen (HSTS, X-Frame-Options,
                X-Content-Type-Options);
              </li>
              <li>
                Bot-bescherming en rate-limiting op formulieren tegen
                geautomatiseerd misbruik;
              </li>
              <li>
                Strikte toegang tot opgeslagen gegevens — alleen voor wie het nodig
                heeft voor het uitvoeren van de dienst.
              </li>
            </ul>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              9. Cookies en analytics
            </h2>
            <p>
              Courtside Padel maakt geen gebruik van marketing-, tracking- of
              profileringcookies. Onze website werkt grotendeels zonder cookies in
              de klassieke zin.
            </p>
            <p>
              We gebruiken PostHog voor geanonimiseerde gebruiksanalyse in een
              cookieless modus: er worden geen identifier-cookies geplaatst om je
              over meerdere bezoeken te volgen. Analyseschattingen worden alleen
              verzameld binnen één sessie en bevatten geen persoonlijk
              identificeerbare gegevens. Hierdoor is geen cookie-toestemmingsbanner
              vereist conform de huidige Nederlandse en Europese richtlijnen.
            </p>
            <p>
              Functioneel noodzakelijke technische opslag (zoals
              sessie-identificatie binnen één bezoek of het onthouden van je
              formulier-invoer tijdens het bezoek) wordt zonder toestemming
              geplaatst conform art. 11.7a lid 3 Telecommunicatiewet.
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              10. Jonger dan 16 jaar
            </h2>
            <p>
              Als je minderjarig bent (jonger dan 16 jaar), mag je alleen
              toestemming geven voor het verwerken van je persoonsgegevens met
              toestemming van een van je ouders of wettelijke voogd. Het is dan
              belangrijk dat zij deze privacyverklaring lezen. Zij kunnen ook
              namens jou de hieronder genoemde rechten uitoefenen.
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              11. Rechten van betrokkenen
            </h2>
            <p>
              Als betrokkene heb je onder de AVG de volgende rechten:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>Recht op inzage</strong>: je kunt opvragen welke
                persoonsgegevens we van je verwerken;
              </li>
              <li>
                <strong>Recht op rectificatie</strong>: je kunt onjuiste of
                onvolledige gegevens laten corrigeren;
              </li>
              <li>
                <strong>Recht op gegevenswissing</strong>: je kunt verzoeken om
                verwijdering van je gegevens;
              </li>
              <li>
                <strong>Recht op beperking van de verwerking</strong>: je kunt
                verzoeken om de verwerking te beperken;
              </li>
              <li>
                <strong>Recht op overdraagbaarheid van gegevens</strong>: je kunt
                je gegevens in machineleesbare vorm opvragen om over te dragen aan
                een derde;
              </li>
              <li>
                <strong>Recht van bezwaar</strong>: je kunt bezwaar maken tegen de
                verwerking;
              </li>
              <li>
                <strong>Recht om je toestemming in te trekken</strong>: je kunt
                verleende toestemming op elk moment intrekken.
              </li>
            </ul>
            <p>
              Stuur je verzoek naar{" "}
              <a href="mailto:privacy@courtsidepadel.nl" className="underline">
                privacy@courtsidepadel.nl
              </a>
              . Om er zeker van te zijn dat we het verzoek met de juiste persoon
              afhandelen, kunnen we je vragen om aanvullende identificatie. We
              reageren uiterlijk binnen vier weken op je verzoek.
            </p>

            <h2 className="font-serif text-[22px] tracking-[-0.4px] text-ink">
              12. Klacht
            </h2>
            <p>
              Heb je een klacht over hoe Courtside Padel met je persoonsgegevens
              omgaat? Neem dan eerst contact met ons op via{" "}
              <a href="mailto:privacy@courtsidepadel.nl" className="underline">
                privacy@courtsidepadel.nl
              </a>{" "}
              — we proberen het altijd eerst samen op te lossen. Kom je er niet
              uit, dan kun je een klacht indienen bij de Autoriteit
              Persoonsgegevens, de toezichthoudende instantie in Nederland, via{" "}
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
              13. Wijzigingen privacyverklaring
            </h2>
            <p>
              Courtside Padel kan deze privacyverklaring aanpassen. De meest
              recente versie staat altijd op deze pagina; de datum bovenaan geeft
              aan wanneer we de tekst voor het laatst hebben bijgewerkt. Bij
              ingrijpende wijzigingen die gevolgen hebben voor de wijze waarop we
              reeds verzamelde gegevens verwerken, brengen we je per e-mail op de
              hoogte.
            </p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
