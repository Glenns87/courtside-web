# Courtside — web

Marketing-homepage voor een boutique padel-lesplatform. Mobile-first, editorial stijl, lead-capture als primair doel.

Gebouwd vanuit het design-handoff (variant C — Courtside+). Deze codebase is het startpunt; de volgende stappen (CMS, analytics, deploy) doe je in **Claude Code** — zie [`.claude/CLAUDE_CODE.md`](./.claude/CLAUDE_CODE.md).

## Stack

- **Next.js 15** (App Router, RSC) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 3.4** met custom design tokens
- **Fraunces / Inter / JetBrains Mono** via `next/font`
- Geen shadcn, geen component-library — alles custom (bewuste editorial keuze: border-radius 0)

## Snelstart

```bash
npm install         # of: bun install / pnpm install
npm run dev         # http://localhost:3000
```

Andere scripts:

```bash
npm run build       # productie-build
npm run start       # productie-server lokaal testen
npm run type-check  # tsc --noEmit
npm run lint        # next lint
```

## Projectstructuur

```
courtside-web/
├── app/
│   ├── layout.tsx           Root layout + next/font + metadata
│   ├── page.tsx             Homepage — composeert alle secties + JSON-LD
│   ├── globals.css          Tailwind + reset + utilities
│   ├── actions.ts           Server action: submitLeadIntent (STUB)
│   ├── sitemap.ts           /sitemap.xml
│   ├── robots.ts            /robots.txt
│   └── aanvragen/
│       ├── page.tsx         Stap 2: contactform (STUB)
│       └── bedankt/page.tsx Bedankpagina na submit
├── components/
│   ├── nav.tsx              Sticky nav met Courtside-logo
│   ├── hero.tsx             Server — hero-tekst
│   ├── hero-form.tsx        Client — niveau/dag/tijd selectors + CTA
│   ├── court-svg.tsx        Padel-court illustratie
│   ├── live-scorecard.tsx   "Nu op de baan"
│   ├── benefits.tsx         Client — 3 voordeel-rijen met hover glow
│   ├── clubs-trainer.tsx    Clubs-grid 3×2 + trainer-card
│   ├── final-cta.tsx        Client — groene final CTA met hover swap
│   └── footer.tsx           "Courtside — est. 2024 · Utrecht"
├── lib/
│   ├── cn.ts                clsx + tailwind-merge helper
│   └── schema-org.ts        LocalBusiness + Service JSON-LD
├── .claude/
│   └── CLAUDE_CODE.md       👈 briefing voor Claude Code — lees dit
├── tailwind.config.ts       Design tokens (kleuren, type-schaal, animaties)
├── tsconfig.json            Strict mode, @/* path alias
├── .env.example             Env vars die Claude Code later invult
└── next.config.mjs
```

## Design tokens (snapshot)

| Token        | Hex                      | Gebruik                       |
| ------------ | ------------------------ | ----------------------------- |
| `bg`         | `#F4EFE3`                | page background (cream)       |
| `surface`    | `#FBF8EF`                | widget surfaces               |
| `paper`      | `#EDE6D3`                | inactive day/time buttons     |
| `ink`        | `#0F201A`                | primary text + dark CTA       |
| `ink-dim`    | `rgba(15,32,26,0.68)`    | body copy                     |
| `ink-mute`   | `rgba(15,32,26,0.44)`    | meta / labels                 |
| `line`       | `rgba(15,32,26,0.12)`    | dividers                      |
| `green`      | `#1E3A2F`                | brand green                   |
| `terra`      | `#D66A3C`                | primary accent (terracotta)   |
| `terra-lt`   | `#EAA07C`                | light accent (stats)          |
| `clay`       | `#E8C9A8`                | avatar fill                   |

Fonts via `next/font/google` met `display: swap`.

## Wat werkt al

- Alle 11 secties van variant C zijn pixel-accuraat geïmplementeerd
- Selectors werken (niveau / dag / tijd) met onafhankelijke state
- Terracotta CTA-wipe animatie met `prefers-reduced-motion` support
- Hover-states op benefits (terracotta glow) en final CTA (color swap)
- LIVE-dot pulsanimatie (motion-safe)
- `/aanvragen?level=...&day=...&time=...` met voor-ingevulde keuzes
- Bedankpagina (`noindex`)
- Sitemap + robots.txt
- Schema.org JSON-LD (LocalBusiness, Service)
- WCAG AA focus-states zichtbaar
- Strict TypeScript, geen type-errors
- `npm run build` slaagt (met internetverbinding voor Google Fonts)

## Wat nog moet — door Claude Code

Zie [`.claude/CLAUDE_CODE.md`](./.claude/CLAUDE_CODE.md) voor de stap-voor-stap briefing. Kort:

1. **Sanity CMS** — alle content via Sanity bewerkbaar maken
2. **Lead-form** — server action echt afmaken: Zod validatie, Sanity write, Resend email, rate-limiting
3. **PostHog** — events, session replay, feature flags
4. **Deploy** — Vercel + domein-koppeling
5. **Tests** — Vitest + Playwright + a11y scan
6. **Legal** — privacy / voorwaarden / cookies pagina's

## Licenties / attributie

Fonts via Google Fonts (SIL Open Font License). Tailwind + Next.js onder MIT. Design: origineel handoff variant C, zie `../design_handoff_padel_lessen/` (niet in deze repo).
