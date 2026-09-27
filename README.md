# smiit Analytics – Product Website

Standalone product website of **smiit Analytics**, the reporting SaaS for bexio. A product of [smiit GmbH](https://www.smiit.de).

- **Stack:** Next.js 16 (App Router, static export), TypeScript, Tailwind CSS v4
- **Languages:** German, English, French, Italian – every page lives under `/<lang>/…`
- **Status:** customer logos, testimonials, videos and the privacy policy, terms and DPA texts are still placeholders in `[SQUARE_BRACKETS]`

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000 → redirects to the browser language (fallback /de/)
```

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Static export to `out/` |
| `npm run typecheck` | TypeScript check – also fails if a language is missing a text |
| `npm run media` | Regenerates the localized illustrations and social preview images (see below) |

---

## Languages & routing

- Routes are English in every language and sit below the locale segment: `/de/`, `/fr/privacy/`, `/it/legal-notice/`, `/en/terms/`, `/de/dpa/`.
- `/` has no content of its own. A small script redirects to the language last picked in the language switcher, otherwise to the first supported browser language, otherwise to `/de/` (also without JavaScript).
- The language switcher (header and mobile menu) consists of real links and keeps the current page and section (`#pricing`).
- `app/global-not-found.tsx` is the 404 page for every unknown URL; it reads the language from the path (`/fr/…` → French).
- `app/[lang]/error.tsx` is shown, in the page's language, if a page fails while rendering.

**Adding a language:** add it to `locales` in `lib/dictionary.ts` and add an object with the same shape as `de` (TypeScript reports every missing text). Then extend `HTML_LANG` / `OG_LOCALE` in `lib/i18n.ts` and `MARKETPLACE_LOCALE` in `lib/links.ts`, and run `npm run media`.

---

## Where to change what

| What | File |
|---|---|
| **All texts in all languages** (incl. FAQ, demo dashboards, image texts, alt texts, number format) | [`lib/dictionary.ts`](lib/dictionary.ts) |
| **Company details** (legal notice, footer, structured data) | [`lib/site.ts`](lib/site.ts) (`COMPANY`) |
| **Prices** (CHF per month and bexio company, additional users) | [`lib/pricing.ts`](lib/pricing.ts) |
| **Links** (app, `[LINK_BOOKING]`, bexio Marketplace, LinkedIn …) | [`lib/links.ts`](lib/links.ts) |
| **Pages, section anchors, navigation** | [`lib/routes.ts`](lib/routes.ts) |
| **Domain** (canonical URLs, sitemap, Open Graph, structured data) | [`lib/site.ts`](lib/site.ts) |
| **Media slots** (file names, formats, per language or shared) | [`lib/media.ts`](lib/media.ts), documented in [`MEDIA.md`](MEDIA.md) |
| **Demo dashboard data** (numbers only; labels are in the dictionary) | [`lib/demo/`](lib/demo) |
| **Analytics** (prepared, disabled) | [`lib/analytics.ts`](lib/analytics.ts) |
| **Design tokens** (colours, radii, shadows, spacing) | [`app/globals.css`](app/globals.css) (`@theme`) |

Dictionary conventions:
- `*word*` in headlines renders as a brand-coloured highlight.
- `{name}` is a value filled in by the code (price, percentage, …).
- `[PLACEHOLDER]` marks a fact that is still unknown – never replace it with a guess.

---

## Project structure

```txt
app/
  [lang]/
    layout.tsx            Root layout per language: <html lang>, fonts, header, footer, metadata, JSON-LD
    page.tsx              Home page
    error.tsx             Error page (localized)
    legal-notice/  privacy/  terms/  dpa/
  (redirect)/             "/" → redirect to the visitor's language
  global-not-found.tsx    404 page for all languages
  sitemap.ts, robots.ts, manifest.ts, globals.css
  icon.png, apple-icon.png, favicon.ico     original smiit Analytics icons
components/
  pages/
    landing-page.tsx      Composes the home page from its sections
    landing/              Home page sections (receive { lang, dict })
      dashboards/         Interactive demo dashboards (SVG) + dashboard-kit
    legal/                Legal pages (legal notice, text pages)
    not-found/            404 view (client, language from the path)
  ui/                     Design system: Button, Section, Card, Badge, BrowserFrame, Media, Tabs, Accordion, Modal
  seo/                    JSON-LD
  analytics/              Consent banner (placeholder), click tracking – only active when enabled
  header.tsx, footer.tsx, language-switcher.tsx, locale-provider.tsx, logo.tsx, cta-link.tsx, icons.tsx
lib/
  dictionary.ts           All texts, all languages (type `Dictionary` = shape of `de`)
  dictionary-slices.ts    Text excerpts for client components (header, footer, 404)
  i18n.ts                 Locales, <html lang>, Open Graph locale
  routes.ts               Pages, paths, anchors, navigation
  seo.ts                  Metadata (canonical, hreflang, Open Graph) and JSON-LD
  format.ts               Number/date format per language
  site.ts, pricing.ts, links.ts, media.ts, analytics.ts, fonts.ts, rich.tsx, track.ts, utils.ts
  demo/                   Demo dashboard data
public/
  brand/                  smiit Analytics app icon (original), smiit logo, 404 illustration
  media/<lang>/           Localized illustrations (generated); shared media directly in public/media/
  og/<lang>.png           Social preview images (generated)
  icon-192.png            Manifest icon (original)
scripts/
  build-media.mjs         Generates public/media/<lang>/* and public/og/<lang>.png from the dictionary
```

Client components only receive the texts they need (e.g. `pickHeaderDict`), never the whole dictionary.

### Generated media

`npm run media` renders, for every language, the illustrations of the steps, trustee and persona sections and the 1200×630 social preview image. Their texts come from the dictionary (`illustrations`, `home.hero.title`, `meta.appCategory`), so run it again after changing those texts. Any generated file can be replaced by a real screenshot or design with the same name.

---

## SEO

- Per page and language: title, meta description (≤ 155 characters), canonical URL, `hreflang` alternates for all languages plus `x-default` (German), Open Graph and Twitter card with a localized preview image.
- `sitemap.xml` lists every page in every language with its alternates; `robots.txt` allows everything.
- Structured data: `Organization` (smiit GmbH with address, VAT ID), `WebSite`, `SoftwareApplication` with offers, `FAQPage`, `BreadcrumbList` on the legal pages.
- One `<h1>` per page, `<html lang>` per language, alt texts for all media.
- Lighthouse: SEO 100, accessibility 100 on the home and legal pages.

---

## Design system (derived from smiit.de)

- **Colours:** navy `#0B162D` (theme, dark surfaces), blue `#21569C` (actions), magenta `#F703EB` (accent only), cream `#F3F3EE` (background), sand `#F2F0E9`, stars `#F5A623`
- **Fonts:** Playfair Display (headings), Geist (text), Geist Mono (labels)
- **Shapes:** buttons `rounded-xl`, large cards with 1.75 rem radius and a soft shadow, uppercase eyebrow with a fine line

Utilities come straight from the tokens: `bg-navy`, `text-brand`, `rounded-card`, `shadow-card`, `py-section`, `max-w-page` …

---

## Tracking

Every CTA carries `data-track="<id>"` (e.g. `hero_signup`, `pricing_yearly_signup`, `language_fr`, `final_booking`). Analytics is **prepared but disabled**:

1. `lib/analytics.ts` → `enabled: true`, set provider and ID
2. Add the provider script in `components/analytics/index.tsx` (load it only after consent)
3. With cookies keep `requiresConsent: true` → the consent banner appears; its text is `[CONSENT_TEXT]` in `lib/dictionary.ts`

`lib/track.ts` pushes clicks to `window.dataLayer`; adapt it to the chosen provider.

---

## Deployment

The site is exported statically (`output: "export"` in `next.config.mjs`). `npm run build` creates `out/`, which any static host can serve. The host must answer unknown paths with `404.html` (GitHub Pages, Netlify, Vercel and Cloudflare Pages do this automatically).

- **GitHub Pages:** [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) deploys on every push to `main` (and manually via *Run workflow*).
- **Vercel:** import the project with the “Next.js” framework preset. Optionally remove `output: "export"` and `images.unoptimized` to get responsive, optimized images.

---

© smiit GmbH. All rights reserved.
