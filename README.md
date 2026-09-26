# smiit Analytics – Produkt-Website

Eigenständige Produkt-Website für **smiit Analytics**, das SaaS-Tool für Auswertungen mit bexio. Ein Produkt der [smiit GmbH](https://www.smiit.de).

- **Stack:** Next.js 16 (App Router, statischer Export), TypeScript, Tailwind CSS v4
- **Sprache:** Deutsch (Schweiz); Struktur für weitere Sprachen vorbereitet
- **Stand:** Alle Medien, Preise, Kundenstimmen und Rechtstexte sind Platzhalter in `[ECKIGEN_KLAMMERN]`

---

## Schnellstart

```bash
npm install
npm run dev          # http://localhost:3000
```

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Statischer Export nach `out/` |
| `npm run typecheck` | TypeScript prüfen |
| `npm run brand` | Favicons, zugeschnittene Logos und OG-Platzhalter aus `public/brand/` neu erzeugen |

Interne Vorschau des Designsystems: **`/styleguide`** (nicht verlinkt, `noindex`, in robots.txt gesperrt).

---

## Wo ändere ich was?

| Was | Datei |
|---|---|
| **Alle Texte** (inkl. FAQ, Preise, Kundenstimmen, Alt-Texte) | [`content/de.ts`](content/de.ts) |
| **Links** (`[LINK_SIGNUP]`, `[LINK_LOGIN]`, `[LINK_BOOKING]`, Marketplace, LinkedIn …) | [`config/links.ts`](config/links.ts) |
| **Domain** (`[DOMAIN]`, für Canonical, Sitemap, OG, strukturierte Daten) | [`config/site.ts`](config/site.ts) |
| **Medien-Register** (Dateinamen, Formate) | [`config/media.ts`](config/media.ts), Doku in [`MEDIA.md`](MEDIA.md) |
| **Analytics** (vorbereitet, deaktiviert) | [`config/analytics.ts`](config/analytics.ts) |
| **Design-Tokens** (Farben, Radien, Schatten, Abstände) | [`app/globals.css`](app/globals.css) (`@theme`) |

In Überschriften markiert `*Wort*` eine farbige Hervorhebung, z. B. `"Ihre bexio-Daten. *In 5 Minuten* verständlich."`.

### Medien austauschen

Datei mit dem in [`MEDIA.md`](MEDIA.md) genannten Namen nach `public/media/` legen, dann neu bauen. Die graue Platzhalter-Box verschwindet automatisch.

### Neue Sprache hinzufügen

1. `content/de.ts` kopieren (z. B. `content/fr.ts`) und übersetzen. Die Struktur muss identisch bleiben (Typ `SiteContent`).
2. In `content/index.ts` unter `locales` und `dictionaries` eintragen.
3. Routing ergänzen (z. B. `app/[locale]/…`) und `getContent(locale)` verwenden.

---

## Projektstruktur

```txt
app/
  layout.tsx            Root-Layout: Schriften, Header, Footer, Metadaten, Organization-JSON-LD
  page.tsx              Startseite (14 Abschnitte) + SoftwareApplication- und FAQPage-JSON-LD
  impressum/            [IMPRESSUM_TEXT]
  datenschutz/          [DATENSCHUTZ_TEXT]
  nutzungsbedingungen/  [NUTZUNGSBEDINGUNGEN_TEXT]
  avv/                  [AVV_TEXT]
  not-found.tsx         404-Seite
  styleguide/           Interne Designsystem-Vorschau
  sitemap.ts, robots.ts, manifest.ts
  icon.png, apple-icon.png, favicon.ico    aus dem smiit-Icon erzeugt
  globals.css           Tailwind v4 + smiit Design-Tokens
components/
  ds/                   Designsystem: Button, Container/Section, Card, Badge, BrowserFrame,
                        Media/VideoPlayer/DemoVideo, Tabs, Accordion, Modal
  sections/             Die Abschnitte der Startseite
  site/                 Header (sticky, Burger-Menü), Footer, Logo
  analytics/            Consent-Banner (Platzhalter), Klick-Tracking – nur aktiv, wenn eingeschaltet
config/                 site, links, media, analytics
content/                de.ts (alle Texte), index.ts (Sprach-Registry)
lib/                    seo.ts (Metadaten, JSON-LD), rich.tsx (*Hervorhebung*), track.ts, utils.ts
public/brand/           smiit-Logo und -Icon (lokal, keine Hotlinks)
public/media/           Produktmedien (siehe MEDIA.md)
public/og/              Open-Graph-Bild
scripts/                build-brand-assets.mjs
```

---

## Designsystem (abgeleitet von smiit.de)

- **Farben:** Navy `#0B162D` (Theme, dunkle Flächen), Blau `#21569C` (Aktionen), Magenta `#F703EB` (nur als Akzent), Creme `#F3F3EE` (Hintergrund), Sand `#F2F0E9`, Sterne `#F5A623`
- **Schriften:** Playfair Display (Überschriften), Geist (Text), Geist Mono (Labels)
- **Formen:** Buttons `rounded-xl`, grosse Karten 1,75 rem Radius mit weichem Schatten, Überzeile in Grossbuchstaben mit feiner Linie

Utilities entstehen direkt aus den Tokens: `bg-navy`, `text-brand`, `rounded-card`, `shadow-card`, `py-section`, `max-w-page` …

---

## Tracking

Alle CTAs tragen `data-track="<id>"` (z. B. `hero_signup`, `pricing_paket-2_signup`, `final_booking`). Analytics ist **vorbereitet, aber deaktiviert**:

1. `config/analytics.ts` → `enabled: true`, Anbieter und ID eintragen
2. Anbieter-Skript in `components/analytics/index.tsx` einbinden (erst nach Zustimmung laden)
3. Bei Cookies: `requiresConsent: true` lassen → Consent-Banner erscheint; Text `[CONSENT_TEXT]` in `content/de.ts`

`lib/track.ts` sendet Klicks an `window.dataLayer`. Das lässt sich an den gewählten Anbieter anpassen.

---

## Deployment

Die Seite wird statisch exportiert (`output: "export"` in `next.config.mjs`). `npm run build` erzeugt den Ordner `out/`, den jeder Static-Host ausliefern kann.

**Vor dem Livegang:** `[DOMAIN]` in `config/site.ts` setzen. Solange der Platzhalter drin ist, zeigen Canonical und Sitemap auf `domain-platzhalter.invalid`.

### GitHub Pages (eingerichtet)

Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). **Aktuell nur manuell startbar** (Actions → «Deploy to GitHub Pages» → *Run workflow*), damit keine Platzhalter-Version versehentlich live geht. Automatisches Deployment bei Push: Trigger `push` im Workflow wieder ergänzen.

### Vercel

Projekt importieren, Framework «Next.js», keine weiteren Einstellungen nötig. Optional `output: "export"` und `images.unoptimized` in `next.config.mjs` entfernen. Dann liefert Vercel die Bilder automatisch responsiv und in optimierten Formaten aus.

---

© smiit GmbH. Alle Rechte vorbehalten.
