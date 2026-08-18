<div align="center">

# smiit Analytics — Landing Page

### Marketing site for **smiit Analytics**, the AI-powered data analytics platform by smiit GmbH.

[![Website](https://img.shields.io/badge/Live%20Website-smiit--analytics.com-21569c?style=for-the-badge)](https://www.smiit-analytics.com)
[![Next.js](https://img.shields.io/badge/Framework-Next.js%2016-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## About

smiit Analytics consolidates a company's business data into one complete data model and delivers ready-made dashboards, 250+ pre-built analyses and AI-assisted analytics — for a one-time price, with full ownership and no vendor lock-in. The first supported source system is bexio.

This repository contains the **public landing page** for the product. It is a statically exported Next.js site, bilingual (German / English), deployed to GitHub Pages.

The product itself lives outside this repository.

---

## Site structure

Every page exists under both `/de/` and `/en/`. The root `/` redirects to `/de/`.

| Route | Purpose |
|---|---|
| `/[lang]/` | Landing page — hero, features, advantages, pricing, reviews, process, FAQ |
| `/[lang]/contact/` | Contact form, contact details and Calendly appointment booking |
| `/[lang]/terms/` | Terms of service (AGB) |
| `/[lang]/dpa/` | Data processing agreement (AVV, Art. 28 GDPR) |
| `/[lang]/privacy/` | Privacy policy |
| `/[lang]/legal-notice/` | Legal notice (Impressum) |

`app/sitemap.ts` is the single place where this list is maintained — add a route there when you add a page.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, `output: "export"`) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`app/globals.css`) |
| UI primitives | shadcn/ui on Radix (`components/ui`) |
| Animation | Framer Motion, Lenis (smooth scroll) |
| Forms | EmailJS (contact form, no backend) |
| Analytics | Google Analytics 4 + Google Ads, consent-gated (Consent Mode v2) |
| Hosting | GitHub Pages via GitHub Actions |

---

## Project structure

```txt
.
├── app/
│   ├── (redirect)/            # "/" → "/de/" redirect shell
│   ├── [lang]/                # All localized routes
│   ├── globals.css            # Tailwind v4 entry + design tokens
│   ├── not-found.tsx          # 404 page
│   ├── robots.ts              # robots.txt (static export)
│   └── sitemap.ts             # sitemap.xml — route list lives here
├── components/
│   ├── analytics/             # Consent banner, GA/Ads scripts, conversion tracking
│   ├── pages/
│   │   ├── landing/           # Landing page sections
│   │   ├── contact/           # Contact page sections
│   │   ├── legal/             # Shared hero + section renderer for legal pages
│   │   └── shared/            # FAQ section
│   ├── ui/                    # shadcn/ui primitives (only the ones in use)
│   ├── header.tsx
│   └── footer.tsx
├── hooks/                     # useRevealOnScroll
├── lib/
│   ├── dictionary.ts          # DE/EN copy for landing + contact
│   ├── seo.ts                 # SITE_URL, page metadata + JSON-LD builders
│   ├── gtag.ts                # Consent + GA/Ads helpers
│   └── utils.ts               # cn()
├── public/                    # Static assets, llms.txt, web manifest
├── .archiv/                   # Snapshot of the previous smiit.de website — reference only, not built
└── .github/workflows/         # Build & deploy to GitHub Pages
```

> `.archiv/` is git-ignored and excluded from the TypeScript build. It is kept as a reference for content and components taken from the previous site.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the EmailJS and Calendly values
npm run dev                  # http://localhost:3000
```

| Script | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Static export to `out/` |
| `npm run start` | Serve a production build |
| `npm run typecheck` | `tsc --noEmit` |

---

## Configuration

### Environment variables

All variables are `NEXT_PUBLIC_*` — this is a static site with no server runtime, so they are inlined at build time. See `.env.example`. In CI they are provided as GitHub repository secrets (see `.github/workflows/deploy.yml`).

| Variable | Used for |
|---|---|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Contact form delivery |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_DE` / `_EN` | Contact form template per language |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS auth |
| `NEXT_PUBLIC_CALENDLY_URL_DE` / `_EN` / `NEXT_PUBLIC_CALENDLY_URL` | Appointment booking (`#book` anchor) |

### Site URL

The canonical origin is defined **once** in [lib/seo.ts](lib/seo.ts) as `SITE_URL`. `app/sitemap.ts` and `app/robots.ts` import it from there. Change it in that one place when the domain changes.

---

## Deployment

Pushing to `main` triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which runs `npm ci`, builds the static export to `out/` and publishes it to GitHub Pages.

Because the site is exported statically (`output: "export"`, `trailingSlash: true`), there is no server runtime: no API routes, no middleware, no image optimization.

---

## License

© smiit GmbH. All rights reserved.
