# Medienliste – smiit Analytics Website

Alle Bilder und Videos der Website sind Platzhalter. Solange eine Datei fehlt, zeigt die Seite eine graue, beschriftete Box (z. B. «VIDEO_HERO · 16:9 · 15–20 s · Loop»).

**Austauschen:** Datei mit dem **exakt gleichen Namen** nach `public/media/` legen, dann `npm run build` ausführen. Sie ersetzt den Platzhalter automatisch. Code muss nicht angepasst werden.

**Sprachabhängige Medien** (in [`lib/media.ts`](lib/media.ts) mit `localized: true` markiert, aktuell alle Illustrationen) liegen einmal pro Sprache in `public/media/de/`, `public/media/en/`, `public/media/fr/` und `public/media/it/` – jeweils unter demselben Dateinamen. Soll ein Video pro Sprache geliefert werden (z. B. `VIDEO_DEMO_FULL` mit Ton), dort ebenfalls `localized: true` setzen und die Dateien in die vier Ordner legen.

Die technische Liste steht in [`lib/media.ts`](lib/media.ts). Die Alt-Texte stehen in [`lib/dictionary.ts`](lib/dictionary.ts) unter `media`, für jede Sprache.

---

## Allgemeine Vorgaben

| | Bilder | Videos (Loop) |
|---|---|---|
| Format | **WebP**, Qualität 80–85 | **WebM (VP9)** + **MP4 (H.264)**, jeweils ohne Tonspur |
| Posterbild | – | `<name>-poster.webp`: erstes Frame oder Schlüsselbild, gleiches Seitenverhältnis |
| Grösse | siehe Tabelle, maximal ca. 250 KB | Ziel unter 2 MB pro Datei, 30 fps, 1920 px breit |
| Inhalt | Screenshots mit Beispieldaten, keine echten Kundendaten | Kein Ton, ruhige Mausbewegungen, keine Schnitte unter 1 s |

- **Loop-Videos** laufen stumm und automatisch, sobald sie sichtbar werden. Das Ende soll nahtlos in den Anfang übergehen.
- Bei «Bewegung reduzieren» im Betriebssystem wird nur das Posterbild angezeigt. Das Poster muss also für sich allein verständlich sein.
- **Screenshots** erscheinen in einem Browser-Rahmen (Adresszeile «app.smiit-analytics.com»). Liefern Sie deshalb **nur den App-Inhalt ohne Browser-Rahmen**.
- Es werden ausschliesslich **Beispieldaten** gezeigt: keine echten Kundennamen, Beträge oder Personen.

---

## Videos

Pro Video werden drei Dateien benötigt: `<datei>.webm`, `<datei>.mp4` und `<datei>-poster.webp`.

| ID | Dateien | Format | Dauer | Abschnitt | Inhalt |
|---|---|---|---|---|---|
| `VIDEO_HERO` | `video_hero.webm` / `.mp4` / `-poster.webp` | 16:9, 1920×1080 | 15–20 s, Loop | Hero (Seitenanfang) | Kurzer Rundgang: Das Dashboard öffnet sich, Umsatz-KPI, offene Rechnungen, Wechsel zwischen zwei Standardberichten. Soll auf einen Blick zeigen: «sofort verständlich». |
| `VIDEO_DEMO_FULL` | `video_demo_full.webm` / `.mp4` / `-poster.webp` | 16:9, 1920×1080 | ca. 2 min, **mit Ton** und Steuerung | Modal «2-Min-Demo ansehen» | Vollständige Demo: bexio verbinden → Standardberichte → Anpassen per Drag & Drop → KI-Frage → Automatisierung. Wenn möglich mit Untertiteln im Video. |
| `VIDEO_DRAGDROP` | `video_dragdrop.webm` / `.mp4` / `-poster.webp` | 16:10, 1920×1200 | 15–20 s, Loop | Versprechen 2 – Selbst gestalten | Eine Kennzahl wird aus der Seitenleiste in einen Bericht gezogen, ein Diagrammtyp wird gewechselt, das Layout wird angepasst. |
| `VIDEO_AI_CHAT` | `video_ai_chat.webm` / `.mp4` / `-poster.webp` | 16:10, 1920×1200 | 20–25 s, Loop | Versprechen 3a – KI | Frage wird eingetippt (z. B. «Welche Kunden haben dieses Jahr am meisten Umsatz gebracht?»), die KI antwortet mit Text und Diagramm, danach «Zeig mir das pro Quartal» → Diagramm ändert sich. |

## Screenshots und Bilder

> Die Standardberichte im Abschnitt «Verbinden & sofort sehen» (Verkauf, Bilanz, Arbeitszeiten, Projekte, Cashflow) brauchen **keine Screenshots**: Sie sind interaktive Dashboards im Code mit fiktiven Beispieldaten (Zahlen in `lib/demo/*.ts`, Beschriftungen in `lib/dictionary.ts` unter `demo`, Komponenten in `components/pages/landing/dashboards/`).

Alle Einträge dieser Tabelle sind **sprachabhängig** (`public/media/<lang>/<datei>`). Die Bildtexte stehen in `lib/dictionary.ts` unter `illustrations`.

| ID | Datei | Format | Abschnitt | Inhalt |
|---|---|---|---|---|
| `IMG_STEP_1` | `img_step_1.webp` | 4:3, 1200×900 | «So einfach geht's» – Schritt 1 | Dialog «Datenquelle verbinden» mit bexio-Eintrag, nachgebaut nach einem Screenshot aus dem Tool (ohne Entwickler-Option «mit PAT verbinden»). **Vorhanden:** generierte Illustration (`npm run media`), kann je Sprache durch einen echten Screenshot gleichen Namens ersetzt werden. |
| `IMG_STEP_2` | `img_step_2.webp` | 4:3, 1200×900 | Schritt 2 | Vier Berichtspakete (Standard, Sales, Finanzen, Management) mit Mini-Diagramm und «Bereit»-Status. **Vorhanden:** generierte Illustration (`npm run media`), kann je Sprache durch einen echten Screenshot gleichen Namens ersetzt werden. |
| `IMG_STEP_3` | `img_step_3.webp` | 4:3, 1200×900 | Schritt 3 | Bericht im Bearbeitungsmodus (Drag & Drop oder KI-Eingabe sichtbar). **Vorhanden:** generierte Illustration (`npm run media`), kann je Sprache durch einen echten Screenshot gleichen Namens ersetzt werden. |
| `IMG_MULTI_COMPANY` | `img_multi_company.webp` | 4:3, 1200×900 | Versprechen 2 – Box für Treuhandbüros | Treuhandbüro mit einem Login: Workspace-Umschalter mit allen Mandanten (fiktive Namen), daneben der Bericht des gewählten Mandanten. **Vorhanden:** generierte Illustration (`npm run media`), angelehnt an den Workspace-Umschalter im Tool; kann je Sprache durch einen echten Screenshot gleichen Namens ersetzt werden. |
| `IMG_PERSONA_MANAGEMENT` | `img_persona_management.webp` | 3:2, 1200×800 | «Für wen?» | Geschäftsführung: Smartphone mit Kennzahlen + automatische Hinweise. **Vorhanden:** generierte Illustration (`npm run media`); kann je Sprache durch ein Foto oder einen Screenshot gleichen Namens ersetzt werden. |
| `IMG_PERSONA_TRUSTEE` | `img_persona_trustee.webp` | 3:2, 1200×800 | «Für wen?» | Treuhand: aufgefächerte Berichte mehrerer Mandanten mit «Exportieren». **Vorhanden:** generierte Illustration (`npm run media`); kann je Sprache durch ein Foto oder einen Screenshot gleichen Namens ersetzt werden. |
| `IMG_PERSONA_TEAM_LEAD` | `img_persona_team_lead.webp` | 3:2, 1200×800 | «Für wen?» | Teamleitung: Bereichsansicht mit Auslastung und Stunden je Person. **Vorhanden:** generierte Illustration (`npm run media`); kann je Sprache durch ein Foto oder einen Screenshot gleichen Namens ersetzt werden. |

## Kundenlogos

Das Seitenverhältnis 3:1 wird im Format *contain* dargestellt (das Logo wird nicht beschnitten). Die Logos erscheinen in Graustufen und beim Überfahren mit der Maus in Farbe. **Nur mit schriftlicher Freigabe der Kunden verwenden.**

| ID | Datei | Format | Alt-Text in `lib/dictionary.ts` (je Sprache) |
|---|---|---|---|
| `LOGO_1` … `LOGO_5` | `logo_1.webp` … `logo_5.webp` | 3:1, z. B. 600×200, transparenter Hintergrund | `[LOGO_1_FIRMENNAME]` … `[LOGO_5_FIRMENNAME]` durch den Firmennamen ersetzen |

## Kundenstimmen (optional)

Foto zum Testimonial: Datei (1:1, 200×200, WebP) nach `public/media/` legen und in `lib/dictionary.ts` unter `home.testimonials.items[n].image` den Pfad eintragen (in jeder Sprache), z. B. `"/media/testimonial_1.webp"`. Ohne Foto werden Initialen angezeigt.

## Social-Media-Vorschau (Open Graph)

| ID | Datei | Format | Inhalt |
|---|---|---|---|
| `OG_IMAGE` | `public/og/de.png`, `en.png`, `fr.png`, `it.png` | 1200×630, PNG | Vorschaubild für LinkedIn, WhatsApp, Slack usw. je Sprache, generiert mit `npm run media` (Icon, Slogan, Kategorie). Durch ein finales Design gleichen Namens ersetzen. |

## Marke (bereits vorhanden)

Das smiit-Logo `public/brand/logo_black.webp` (Original von smiit.de) wird in den strukturierten Daten (Organization) verwendet.

Das **smiit-Analytics-Icon** ist die Originaldatei, unverändert übernommen:

| Datei | Verwendung |
|---|---|
| `public/brand/app-icon.webp` | Logo in Header und Footer (512×512 WebP) |
| `app/favicon.ico` | Favicon |
| `app/icon.png` | Icon 512×512 (Browser, Manifest) |
| `app/apple-icon.png` | Apple Touch Icon 180×180 |
| `public/icon-192.png` | Manifest-Icon 192×192 |

Zum Austauschen die Dateien gleichen Namens ersetzen.
