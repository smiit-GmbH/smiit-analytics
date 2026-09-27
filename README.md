# smiit Analytics – Produkt-Website

Eigenständige Produkt-Website für **smiit Analytics**, das SaaS-Tool für Auswertungen mit bexio. Ein Produkt der [smiit GmbH](https://www.smiit.de).

- **Stack:** Next.js 16 (App Router, statischer Export), TypeScript, Tailwind CSS v4
- **Sprachen:** Deutsch, Englisch, Französisch, Italienisch – jede Seite unter `/<lang>/…`
- **Stand:** Kundenlogos, Kundenstimmen, Videos und Rechtstexte sind Platzhalter in `[ECKIGEN_KLAMMERN]`

---

## Schnellstart

```bash
npm install
npm run dev          # http://localhost:3000 → leitet nach /de/ (bzw. Browsersprache) weiter
```

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Statischer Export nach `out/` |
| `npm run typecheck` | TypeScript prüfen (prüft auch, dass alle Sprachen vollständig sind) |
| `npm run brand` | Favicons, zugeschnittene Logos und OG-Platzhalter aus `public/brand/` neu erzeugen |
| `npm run media:illustrations` | Illustrationen (Schritte, Treuhand, Personas) für alle Sprachen neu erzeugen |

Interne Vorschau des Designsystems: **`/de/styleguide/`** (nicht verlinkt, `noindex`, in robots.txt gesperrt).

---

## Sprachen & Routing

- Alle Routen sind englisch und liegen unter dem Sprachsegment: `/de/`, `/fr/privacy/`, `/it/legal-notice/`, `/en/terms/`, `/de/dpa/`.
- `/` hat keinen eigenen Inhalt: ein Skript leitet auf die erste unterstützte Browsersprache weiter, sonst (und ohne JavaScript) auf `/de/`.
- Jede Seite hat `hreflang`-Alternativen für alle Sprachen plus `x-default` (Deutsch); die Sitemap listet jede Route in jeder Sprache.
- Der Sprachumschalter (Header, mobiles Menü) besteht aus echten Links und behält Seite und Abschnitt (`#pricing`) bei.
- Die 404-Seite (`app/global-not-found.tsx`) gilt für alle unbekannten URLs und erkennt die Sprache aus dem Pfad (`/fr/…` → Französisch).

**Neue Sprache hinzufügen:** in `lib/dictionary.ts` unter `locales` eintragen und ein Objekt mit derselben Struktur wie `de` ergänzen (TypeScript meldet jeden fehlenden Text), in `lib/i18n.ts` `HTML_LANG`/`OG_LOCALE` und in `lib/links.ts` die Marketplace-Sprache ergänzen, dann `npm run media:illustrations`.

---

## Wo ändere ich was?

| Was | Datei |
|---|---|
| **Alle Texte in allen Sprachen** (inkl. FAQ, Demo-Dashboards, Bildtexte, Alt-Texte, Zahlenformat) | [`lib/dictionary.ts`](lib/dictionary.ts) |
| **Preise** (CHF pro Monat und bexio-Firma, weitere Nutzer) | [`lib/pricing.ts`](lib/pricing.ts) |
| **Links** (App, `[LINK_BOOKING]`, Marketplace, LinkedIn …) | [`lib/links.ts`](lib/links.ts) |
| **Seiten, Abschnitts-Anker, Navigation** | [`lib/routes.ts`](lib/routes.ts) |
| **Domain** (Canonical, Sitemap, OG, strukturierte Daten) | [`lib/site.ts`](lib/site.ts) |
| **Medien-Register** (Dateinamen, Formate, sprachabhängig ja/nein) | [`lib/media.ts`](lib/media.ts), Doku in [`MEDIA.md`](MEDIA.md) |
| **Beispieldaten der Demo-Dashboards** (nur Zahlen; Beschriftungen im Dictionary) | [`lib/demo/`](lib/demo) |
| **Analytics** (vorbereitet, deaktiviert) | [`lib/analytics.ts`](lib/analytics.ts) |
| **Design-Tokens** (Farben, Radien, Schatten, Abstände) | [`app/globals.css`](app/globals.css) (`@theme`) |

Konventionen im Dictionary:
- `*Wort*` in Überschriften = farbige Hervorhebung, z. B. `"Ihre bexio-Daten. *In 5 Minuten* verständlich."`
- `{name}` = Wert, den der Code einsetzt (Preis, Prozent, …)
- `[PLATZHALTER]` = noch unbekannter Fakt – nicht durch Schätzungen ersetzen

---

## Projektstruktur

```txt
app/
  [lang]/
    layout.tsx            Root-Layout je Sprache: <html lang>, Schriften, Header, Footer, Metadaten, JSON-LD
    page.tsx              Startseite
    legal-notice/         Impressum      privacy/  Datenschutz
    terms/                Nutzungsbedingungen   dpa/  Auftragsverarbeitungsvertrag (AVV)
    styleguide/           Interne Designsystem-Vorschau (noindex)
  (redirect)/             "/" → Weiterleitung zur Browsersprache
  global-not-found.tsx    404-Seite für alle Sprachen
  sitemap.ts, robots.ts, manifest.ts, globals.css, icon.png, apple-icon.png, favicon.ico
components/
  pages/
    landing-page.tsx      Setzt die Startseite aus den Abschnitten zusammen
    landing/              Abschnitte der Startseite (erhalten { lang, dict })
      dashboards/         Interaktive Demo-Dashboards (SVG) + dashboard-kit
    legal/                Rechtsseiten-Vorlage
    not-found/            404-Ansicht (Client, Sprache aus dem Pfad)
  ui/                     Designsystem: Button, Section, Card, Badge, BrowserFrame, Media, Tabs, Accordion, Modal
  seo/                    JSON-LD
  analytics/              Consent-Banner (Platzhalter), Klick-Tracking – nur aktiv, wenn eingeschaltet
  header.tsx, footer.tsx, language-switcher.tsx, logo.tsx, cta-link.tsx, icons.tsx
lib/
  dictionary.ts           Alle Texte, alle Sprachen (Typ `Dictionary` = Struktur von `de`)
  dictionary-slices.ts    Textausschnitte für Client-Komponenten (Header, Footer)
  i18n.ts                 Sprachen, <html lang>, OG-Locale
  routes.ts               Seiten, Pfade, Anker, Navigation
  seo.ts                  Metadaten (Canonical, hreflang, OG), JSON-LD
  format.ts               Zahlen-/Datumsformat je Sprache
  pricing.ts, links.ts, site.ts, media.ts, analytics.ts, fonts.ts, rich.tsx, track.ts, utils.ts
  demo/                   Beispieldaten der Dashboards
public/brand/             smiit-Logo und -Icon (lokal, keine Hotlinks)
public/media/<lang>/      Sprachabhängige Illustrationen (generiert); übrige Medien direkt in public/media/
public/og/                Open-Graph-Bild
scripts/                  build-brand-assets.mjs, build-illustrations.mjs
```

Client-Komponenten bekommen nur die Texte, die sie brauchen (z. B. `pickHeaderDict`), nie das ganze Dictionary.

---

## Designsystem (abgeleitet von smiit.de)

- **Farben:** Navy `#0B162D` (Theme, dunkle Flächen), Blau `#21569C` (Aktionen), Magenta `#F703EB` (nur als Akzent), Creme `#F3F3EE` (Hintergrund), Sand `#F2F0E9`, Sterne `#F5A623`
- **Schriften:** Playfair Display (Überschriften), Geist (Text), Geist Mono (Labels)
- **Formen:** Buttons `rounded-xl`, grosse Karten 1,75 rem Radius mit weichem Schatten, Überzeile in Grossbuchstaben mit feiner Linie

Utilities entstehen direkt aus den Tokens: `bg-navy`, `text-brand`, `rounded-card`, `shadow-card`, `py-section`, `max-w-page` …

---

## Tracking

Alle CTAs tragen `data-track="<id>"` (z. B. `hero_signup`, `pricing_yearly_signup`, `language_fr`, `final_booking`). Analytics ist **vorbereitet, aber deaktiviert**:

1. `lib/analytics.ts` → `enabled: true`, Anbieter und ID eintragen
2. Anbieter-Skript in `components/analytics/index.tsx` einbinden (erst nach Zustimmung laden)
3. Bei Cookies: `requiresConsent: true` lassen → Consent-Banner erscheint; Text `[CONSENT_TEXT]` in `lib/dictionary.ts`

`lib/track.ts` sendet Klicks an `window.dataLayer`. Das lässt sich an den gewählten Anbieter anpassen.

---

## Deployment

Die Seite wird statisch exportiert (`output: "export"` in `next.config.mjs`). `npm run build` erzeugt den Ordner `out/`, den jeder Static-Host ausliefern kann. Der Host muss für unbekannte Pfade `404.html` ausliefern (GitHub Pages, Netlify, Vercel und Cloudflare Pages tun das automatisch).

### GitHub Pages (eingerichtet)

Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### Vercel

Projekt importieren, Framework «Next.js», keine weiteren Einstellungen nötig. Optional `output: "export"` und `images.unoptimized` in `next.config.mjs` entfernen. Dann liefert Vercel die Bilder automatisch responsiv und in optimierten Formaten aus.

---

© smiit GmbH. Alle Rechte vorbehalten.
