# Medienliste – smiit Analytics Website

Alle Bilder und Videos der Website sind Platzhalter. Solange eine Datei fehlt, zeigt die Seite eine graue, beschriftete Box (z. B. «VIDEO_HERO · 16:9 · 15–20 s · Loop»).

**Austauschen:** Datei mit dem **exakt gleichen Namen** nach `public/media/` legen, dann `npm run build` ausführen. Sie ersetzt den Platzhalter automatisch. Code muss nicht angepasst werden.

Die technische Liste steht in [`config/media.ts`](config/media.ts). Die Alt-Texte stehen in [`content/de.ts`](content/de.ts) unter `media`.

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
- **Screenshots** erscheinen in einem Browser-Rahmen (Adresszeile «app.smiit-analytics»). Liefern Sie deshalb **nur den App-Inhalt ohne Browser-Rahmen**.
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

> Die Standardberichte im Abschnitt «Verbinden & sofort sehen» (Verkauf, Bilanz, Arbeitszeiten, Projekte, Cashflow) brauchen **keine Screenshots**: Sie sind interaktive Dashboards im Code mit fiktiven Beispieldaten (`content/demo/*.ts`, `components/demo/*`).

| ID | Datei | Format | Abschnitt | Inhalt |
|---|---|---|---|---|
| `IMG_STEP_1` | `img_step_1.webp` | 4:3, 1200×900 | «So einfach geht's» – Schritt 1 | Verbindungsdialog zu bexio (Schritt «bexio verbinden»). |
| `IMG_STEP_2` | `img_step_2.webp` | 4:3, 1200×900 | Schritt 2 | Übersicht der Standardberichte direkt nach der Verbindung. |
| `IMG_STEP_3` | `img_step_3.webp` | 4:3, 1200×900 | Schritt 3 | Bericht im Bearbeitungsmodus (Drag & Drop oder KI-Eingabe sichtbar). |
| `IMG_MULTI_COMPANY` | `img_multi_company.webp` | 4:3, 1200×900 | Versprechen 2 – Box für Treuhandbüros | Firmenauswahl mit mehreren verbundenen bexio-Firmen (fiktive Firmennamen). |
| `IMG_REMINDER_EMAIL` | `img_reminder_email.webp` | 4:5, 960×1200 | Versprechen 3b – Automatisierungen | Beispiel einer automatischen Zahlungserinnerung, wie sie beim Kunden ankommt (E-Mail-Ansicht). |
| `IMG_PERSONA_GESCHAEFTSFUEHRUNG` | `img_persona_geschaeftsfuehrung.webp` | 3:2, 1200×800 | «Für wen?» | Geschäftsführung eines KMU (z. B. Handwerksbetrieb) mit Laptop oder Tablet. |
| `IMG_PERSONA_TREUHAND` | `img_persona_treuhand.webp` | 3:2, 1200×800 | «Für wen?» | Treuhandbüro, Arbeitsplatz mit mehreren Mandanten auf dem Bildschirm. |
| `IMG_PERSONA_TEAMLEITUNG` | `img_persona_teamleitung.webp` | 3:2, 1200×800 | «Für wen?» | Teamleitung bespricht Kennzahlen im Team. |

## Kundenlogos

Das Seitenverhältnis 3:1 wird im Format *contain* dargestellt (das Logo wird nicht beschnitten). Die Logos erscheinen in Graustufen und beim Überfahren mit der Maus in Farbe. **Nur mit schriftlicher Freigabe der Kunden verwenden.**

| ID | Datei | Format | Alt-Text in `content/de.ts` |
|---|---|---|---|
| `LOGO_1` … `LOGO_5` | `logo_1.webp` … `logo_5.webp` | 3:1, z. B. 600×200, transparenter Hintergrund | `[LOGO_1_FIRMENNAME]` … `[LOGO_5_FIRMENNAME]` durch den Firmennamen ersetzen |

## Kundenstimmen (optional)

Foto zum Testimonial: Datei (1:1, 200×200, WebP) nach `public/media/` legen und in `content/de.ts` unter `testimonials.items[n].image` den Pfad eintragen, z. B. `"/media/testimonial_1.webp"`. Ohne Foto werden Initialen angezeigt.

## Social-Media-Vorschau (Open Graph)

| ID | Datei | Format | Inhalt |
|---|---|---|---|
| `OG_IMAGE` | `public/og/og-image.png` | 1200×630, PNG oder JPG | Vorschaubild für LinkedIn, WhatsApp, Slack usw. Aktuell ein generierter Navy-Platzhalter mit Headline. Datei gleichen Namens ersetzen, fertig. |

## Marke (bereits vorhanden)

Die Dateien liegen in `public/brand/`: `logo_black.webp`, `logo_white.webp`, `icon_transparent.png` (Originale von smiit.de) sowie zugeschnittene Varianten `*_trim.webp`. Favicons (`app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`) werden aus dem Icon erzeugt: `npm run brand`.
