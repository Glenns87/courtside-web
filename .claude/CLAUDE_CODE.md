# Briefing voor Claude Code

Hoi Claude. Dit is de **Courtside** codebase: een Next.js 15 App Router project voor een padel-lesplatform. De UI staat al (alle 11 secties, mobile-first + responsive, design tokens, Tailwind). Jouw taak is om de productie-integraties toe te voegen. Werk stap voor stap en commit na elke logische eenheid. Gebruik `bun` als package manager als dat beschikbaar is, anders `npm`.

## Stap 1 — Audit & opruiming

Start met:

```bash
npm install
npm run type-check
npm run build
```

Fix typescript-errors, missende dependencies en warnings. Het project stond al in strict mode — houd dat zo. Als `npm run build` faalt op Google Fonts: negeer, dat vereist alleen een werkende internetverbinding.

Commit: `chore: verify clean build`

## Stap 2 — Sanity CMS in een `/studio` workspace

Zet Sanity op als headless CMS. Installeer in een aparte workspace (niet embedded) om bundle-grootte beperkt te houden:

```bash
mkdir studio && cd studio
npm create sanity@latest -- --template clean --create-project "Courtside" --dataset production
cd ..
```

Definieer deze schema-documenten in `studio/schemas/`:

### `homepage` (singleton)

Alle CMS-content voor de homepage. Velden:

- `hero`: object — `kicker` (string), `headlineLines` (array of 3 strings), `subcopy` (text), `ctaLabel` (string)
- `levelSelector`: object — `label` (string), `options` (array `{ key, subLabel }`, 3 items)
- `booking`: object — `label` (string), `openMatchesCount` (number), `days` (array of 7 strings), `times` (array of 4 strings)
- `socialProofAvatars`: object — `avatars` (array `{ initials, colorToken }`), `rating` (number), `reviewCount` (number), `subLabel` (string)
- `liveScorecard`: object — `cityLabel` (string), `stats` (array of 3 `{ value, label, accent: boolean }`)
- `benefits`: object — `sectionLabel` (string), `headlineLine1` (string), `headlineLine2Italic` (string), `items` (array of 3 `{ numeral, title, body, stat, statLabel }`)
- `clubs`: object — `sectionLabel` (string), `headline` (portable text met italic spans), `items` (array `{ monogram, name, logo: image }`)
- `trainer`: object — `label` (string), `avatarInitials` (string), `photo` (image), `name` (string), `subcopy` (string), `certifications` (array `{ acronym, level }`)
- `finalCta`: object — `decorative` (string, default "03"), `label` (string), `headlineLines` (array of 3), `subcopy` (text), `ctaLabel` (string), `subLabel` (string)
- `footer`: object — `text` (string)

### `leads` document type

- `level` (string, enum: Start/Midden/Gevorderd)
- `day` (string, enum: Ma-Zo)
- `time` (string, enum: 18:00-21:00)
- `email` (string, email validation)
- `phone` (string, optional)
- `createdAt` (datetime, default now)
- `utm` (object: source/medium/campaign/term/content)
- `status` (string, enum: new/contacted/converted/closed, default: new)

### `trainers` document type

Losstaand voor toekomstige pagina's: `name`, `photo`, `bio` (portable text), `certifications`, `clubs` (references), `tourRanking` (number, optional).

Installeer clients in de main app:

```bash
npm install next-sanity @sanity/image-url
```

Maak `lib/sanity.ts`:

```ts
import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET ?? "production",
  apiVersion: "2024-10-01",
  useCdn: true,
});
```

Herschrijf `components/hero.tsx`, `benefits.tsx`, `clubs-trainer.tsx` en `final-cta.tsx` zodat ze content via Sanity halen (RSC server fetch). Houd de huidige hardcoded strings als **fallback** voor wanneer Sanity nog leeg is.

Schrijf `scripts/seed-homepage.ts` dat de initiële content (uit `../design_handoff_padel_lessen/README.md`) naar Sanity pusht. Run hem één keer na setup.

**Revalidation**: maak `app/api/revalidate/route.ts` met webhook-secret check (env `SANITY_REVALIDATE_SECRET`), die `revalidateTag("homepage")` aanroept. Configureer in Sanity Studio → API → Webhooks de URL + secret.

Commit: `feat: sanity cms integration`

## Stap 3 — Lead-form server action

Vervang de stub in `app/actions.ts`. Installeer:

```bash
npm install zod @sanity/client @upstash/ratelimit @upstash/redis resend
```

Implementeer:

1. **Zod-schema** voor `{ level, day, time, email, phone? }` met strikte enums
2. **Rate limit** via `@upstash/ratelimit`: 5 per minuut per IP (`request.headers.get("x-forwarded-for")`)
3. **Sanity write** als `leads` document met sessie-metadata (UTM uit URL search params)
4. **Resend email** naar `process.env.LEAD_NOTIFICATION_EMAIL` met alle lead-details in Nederlands
5. **PostHog server capture** `lead_submitted` event met `{ level, day, time, leadId }`
6. Return `{ success: true, leadId }` of typed error

In `app/aanvragen/page.tsx` vervang het `<form action="/aanvragen/bedankt">` door een client-component die de server action aanroept met `useActionState`. Op success: redirect naar `/aanvragen/bedankt?lead=...`. Op error: toon inline error message in dezelfde editorial stijl.

Commit: `feat: lead submission end-to-end`

## Stap 4 — PostHog

```bash
npm install posthog-js posthog-node
```

### Client-side setup

Maak `app/providers.tsx` (client component) dat PostHog initialiseert met autocapture + session replay:

```tsx
"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: true,
    session_recording: { recordCrossOriginIframes: false },
  });
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
```

Wrap `children` in `app/layout.tsx` met `<Providers>`.

### Events (exact deze namen & payloads)

In `components/hero-form.tsx` — importeer `usePostHog` en fire bij elke state change:

- `niveau_selected` — `{ level: Level }`
- `day_selected` — `{ day: Day }`
- `time_selected` — `{ time: Time }`
- `hero_cta_clicked` — `{ level, day, time }`

In `components/final-cta.tsx`:

- `final_cta_clicked`

In `app/actions.ts` server-side:

- `lead_intent_submitted` — `{ level, day, time }` (gebruik `posthog-node`)
- `lead_submitted` — `{ level, day, time, leadId, email, utm }` (na succesvolle Sanity-write)

### Funnel & feature flag

In PostHog UI (documenteer in `docs/posthog-funnel.md`):

- Funnel: `$pageview` → `niveau_selected` → `time_selected` → `hero_cta_clicked` → `lead_submitted`
- Feature flag: `hero-headline-variant` met boolean rollouts

Commit: `feat: posthog analytics + session replay`

## Stap 5 — SEO polish

- Voeg `app/opengraph-image.tsx` toe (Next.js dynamic OG image) met Courtside-groene achtergrond + cream typografie
- Expand `lib/schema-org.ts` met `FAQPage` (als er een FAQ sectie komt) en `Organization`
- Audit elke route op `metadata` — `/aanvragen` en `/aanvragen/bedankt` hebben al eigen metadata, controleer
- Voeg `app/apple-icon.tsx` en `app/icon.tsx` toe (Next.js file-based favicons)
- Run Lighthouse lokaal en log scores in `docs/performance.md`

Commit: `feat: seo polish & og image`

## Stap 6 — Vercel deploy

1. Push naar GitHub (`courtside-web`)
2. Import in Vercel, framework auto-detect = Next.js
3. Environment variables in Vercel dashboard (alle uit `.env.example`)
4. Preview branch = `staging`, production = `main`
5. Domein (later): add `courtside.nl` → DNS records (A/CNAME) → SSL auto via Vercel

Maak `.github/workflows/ci.yml` met:

- `npm run type-check`
- `npm run lint`
- `npm run build`
- Playwright E2E (zie stap 7)

Commit: `ci: github actions + vercel ready`

## Stap 7 — Tests

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react
npm install -D @playwright/test @axe-core/playwright
npx playwright install chromium
```

Tests:

- **Unit** (Vitest): Zod-schema's, `cn()` helper, `lib/sanity.ts` mock
- **E2E** (Playwright):
  1. Open `/` → assert alle 11 secties zichtbaar (gebruik `getByRole`/`getByText` met exacte NL-copy)
  2. Klik niveau "Gevorderd" → assert sub-label "3+ jr" zichtbaar
  3. Klik dag "Vr" + tijd "20:00" → klik CTA → assert op `/aanvragen` met juiste params
  4. Vul email in → submit → assert `/aanvragen/bedankt`
- **Visual regression**: screenshots op 402×800 (mobile) en 1280×1024 (desktop)
- **A11y**: `axe.analyze()` op elke route — faal bij WCAG AA violations

Commit: `test: full coverage — unit + e2e + a11y`

## Stap 8 — Legal placeholders

Maak stub-pagina's voor AVG-compliance (verplicht zodra leads binnenkomen):

- `app/privacy/page.tsx` — `TODO: klant laten invullen met jurist`
- `app/voorwaarden/page.tsx` — idem
- `app/cookies/page.tsx` — idem + cookie-banner logica later

Update `components/footer.tsx` met links naar deze 3 pagina's, rechtsonder in plaats van enkel-center-tekst.

Commit: `feat: legal pages & footer links`

## Stap 9 — Security & AVG (privacy) — VERPLICHT zodra er leads binnenkomen

Dit platform verwerkt straks persoonsgegevens (naam, e-mail, telefoon, en bij trainers mogelijk gevoeliger). Behandel security en privacy als harde eis, niet als nice-to-have.

### Transport & hosting
- HTTPS overal (Vercel regelt dit automatisch — geen actie, wel verifiëren dat er geen mixed content is).
- Security headers in `next.config.js` / middleware: `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, een strikte `Content-Security-Policy`, en `Referrer-Policy: strict-origin-when-cross-origin`.

### Geheimen
- Alle API-keys (Resend, Sanity token, Upstash, PostHog) uitsluitend via Vercel environment variables. Nooit in de code of in de repo. `.env*` staat al in `.gitignore` — verifieer dit.
- Gebruik een **write-only/least-privilege** Sanity token voor server-side writes; nooit de client-token met read-all in de browser.

### Dataminimalisatie (leidend principe)
- Bewaar zo min mogelijk. Voor de start volstaat: e-mailnotificatie naar `LEAD_NOTIFICATION_EMAIL` + optioneel een lead-document in Sanity. Sla geen IP's of ruwe headers langer op dan nodig voor rate-limiting.
- Definieer een bewaartermijn: leads met status `closed`/`converted` na X maanden anonimiseren of verwijderen (documenteer dit in `docs/privacy.md`).

### Misbruik / input-veiligheid
- Server-side Zod-validatie op álle velden (al voorzien in stap 3) — vertrouw nooit client-input.
- Rate-limiting per IP (al voorzien in stap 3) + een simpele anti-bot-maatregel (honeypot-veld of lichte challenge). Geen zware captcha tenzij er echt spam binnenkomt.
- Escape/saniteer alle user-input vóór die in e-mails of de Studio verschijnt.

### AVG / privacy (compliance)
- Privacyverklaring is verplicht zodra leads binnenkomen. Doel expliciet benoemen ("we gebruiken deze gegevens uitsluitend om contact met je op te nemen over padellessen") en bewaartermijn vermelden.
- Voeg bij elk formulier een korte consent-regel toe met link naar de privacyverklaring (geen vooraangevinkte checkbox).
- Privacyverklaring-tekst moet door de opdrachtgever / een jurist worden ingevuld — de developer levert alleen de stub-pagina (zie stap 8). **Niet zelf juridische tekst verzinnen.**

### Trainer-flow — gevoelige gegevens NIET via webformulier
- Er komt mogelijk een aparte trainer-aanmelding (overweeg route `/trainer-worden`, eigen schema, gescheiden van de speler-leads zodat opvolging niet door elkaar loopt).
- Houd het trainer-webformulier **bewust beperkt**: naam, contactgegevens, ervaring/niveau, regio, beschikbaarheid. Meer niet.
- **Vraag GEEN VOG, KvK-documenten, ID of andere bijzondere/gevoelige persoonsgegevens via het webformulier.** Dat soort documenten pas opvragen in persoonlijk contact, buiten dit platform om. Dit is een expliciete wens van de opdrachtgever.

Commit: `feat: security headers + avg privacy hardening`

## Acceptatiecriteria

- [ ] `npm run build` slaagt zonder warnings
- [ ] Lighthouse mobile ≥95 op alle 4 assen
- [ ] Alle 11 secties visueel ongewijzigd t.o.v. het originele design op 402px
- [ ] Alle copy bewerkbaar via Sanity Studio (`studio/` of gedeployed op `studio.courtside.nl`)
- [ ] Lead submit → verschijnt binnen 5s in Sanity + email in `LEAD_NOTIFICATION_EMAIL`
- [ ] Alle PostHog events vuren op de juiste triggers
- [ ] Playwright E2E-suite is groen
- [ ] Vercel preview-URL publiek bereikbaar
- [ ] Security headers actief (CSP, HSTS, nosniff) en geen secrets in de repo
- [ ] Privacyverklaring-stub + consent-regel bij elk formulier aanwezig
- [ ] Trainer-formulier vraagt geen VOG/KvK/ID — alleen basis contact- & ervaringsvelden

## Bronnen & context

- Origineel design: `../design_handoff_padel_lessen/Padel Lessen.html` (variant C is leidend)
- Design tokens: `tailwind.config.ts` — niet veranderen
- Copy (NL, letterlijk): `../courtside-v0-briefing/04_copy-content.md`
- Volledige sectie-spec: `../courtside-v0-briefing/reference/ORIGINAL_HANDOFF_README.md`

## Stijl-voorkeuren van de opdrachtgever

- Geen emojis in code of commit messages
- Strict TypeScript, geen `any` ontsnapping
- Commit-messages in het Engels, conventional commits
- Zo min mogelijk dependencies — pull alleen wat echt nodig is
- Editorial esthetiek blijft leidend: geen rounded corners, geen shadcn-patterns
