// Renders the site illustrations (4:3, 1200×900) from SVG mockups in the style
// of the demo dashboards: "So einfach geht's" (IMG_STEP_1..3) and the Treuhand
// workspace switcher (IMG_MULTI_COMPANY), and the "Für wen?" personas
// (IMG_PERSONA_*, 3:2, 1200×800).
// Run: `npm run media:illustrations` – replace the WebP files with real screenshots any time.
import sharp from "sharp"
import { readFileSync } from "node:fs"

const W = 1200
const H = 900
const FONT = "Segoe UI, Helvetica Neue, Arial, sans-serif"

// Palette shared with components/demo/dashboard-kit.tsx
const C = {
  canvas: "#eef1f6",
  card: "#ffffff",
  border: "#e3e7ee",
  title: "#1f2937",
  muted: "#6b7280",
  series: "#4a5a80",
  navy: "#2b3752",
  light: "#7d8cb3",
  pale: "#a5b0cf",
  track: "#dfe4ef",
  brand: "#21569c",
  ok: "#1f7a4d",
  okSoft: "#e3f2ea",
}

const icon = `data:image/png;base64,${readFileSync("app/icon.png").toString("base64")}`

const shadow = `
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="14" />
    <feOffset dy="12" result="b" />
    <feComponentTransfer><feFuncA type="linear" slope="0.14" /></feComponentTransfer>
    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
  </filter>`

const check = (x, y, s = 1, color = "#fff") =>
  `<path d="M${x - 9 * s},${y} l${6 * s},${6 * s} l${12 * s},-${13 * s}" fill="none" stroke="${color}" stroke-width="${4.5 * s}" stroke-linecap="round" stroke-linejoin="round"/>`

const cursor = (x, y) =>
  `<path d="M${x},${y} l0,46 l12,-11 l9,21 l9,-4 l-9,-20 l16,0 z" fill="#111827" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>`

/** Escape XML special characters (e.g. "Weber & Partner"). */
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

const text = (x, y, content, { size = 32, weight = 400, color = C.title, anchor = "start" } = {}) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}">${esc(content)}</text>`

const svg = (body, w = W, h = H) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>${shadow}</defs>
  <rect width="${w}" height="${h}" fill="${C.canvas}"/>
  ${body}
</svg>`

/* ── Step 1: connect bexio (after the tool's "Datenquelle verbinden" dialog) ── */
function step1() {
  const cx = W / 2
  // Faint app skeleton behind the dialog, as in the product screenshot.
  const skeleton = [
    [60, 40, 1080, 56],
    [60, 130, 250, 150], [330, 130, 250, 150], [600, 130, 250, 150], [870, 130, 270, 150],
    [60, 310, 520, 280], [600, 310, 540, 280],
    [60, 620, 520, 240], [600, 620, 540, 240],
  ]
    .map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#e7eaf0"/>`)
    .join("")

  return svg(`
    <rect width="${W}" height="${H}" fill="#f3f4f7"/>
    ${skeleton}
    <rect width="${W}" height="${H}" fill="#f8f9fb" opacity="0.55"/>

    <rect x="150" y="120" width="900" height="660" rx="28" fill="${C.card}" stroke="${C.border}" stroke-width="2" filter="url(#shadow)"/>

    <rect x="${cx - 66}" y="168" width="132" height="132" rx="30" fill="#eceef3"/>
    <image href="${icon}" x="${cx - 44}" y="190" width="88" height="88"/>

    ${text(cx, 386, "Datenquelle verbinden", { size: 50, weight: 700, anchor: "middle" })}
    ${text(cx, 448, "Verbinden Sie eine Datenquelle mit diesem Workspace,", { size: 30, color: C.muted, anchor: "middle" })}
    ${text(cx, 490, "um Ihren ersten Bericht zu erstellen.", { size: 30, color: C.muted, anchor: "middle" })}

    <rect x="210" y="560" width="780" height="140" rx="22" fill="#f5f7fb" stroke="#d6dce8" stroke-width="2"/>
    <circle cx="292" cy="630" r="46" fill="#1d2b29"/>
    ${text(292, 643, "bx", { size: 36, weight: 800, color: "#8fd14f", anchor: "middle" })}
    ${text(366, 620, "bexio", { size: 38, weight: 700 })}
    ${text(366, 666, "Binden Sie Ihre bexio Firma an.", { size: 29, color: C.muted })}
    <path d="M936,608 l22,22 l-22,22" fill="none" stroke="${C.title}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    ${cursor(860, 640)}
  `)
}

/* ── Step 2: standard reports ready ──────────────────────────────────── */
function miniChart(kind, x, y) {
  // drawing area: 270 × 120 at (x, y)
  switch (kind) {
    case "line": {
      const pts = [70, 58, 80, 40, 52, 66, 50, 84, 60].map((v, i) => `${x + i * 33},${y + 120 - v}`).join(" ")
      const prev = [52, 48, 60, 34, 44, 50, 44, 66, 50].map((v, i) => `${x + i * 33},${y + 120 - v}`).join(" ")
      return `<polyline points="${prev}" fill="none" stroke="${C.navy}" stroke-width="5" stroke-dasharray="10 8" stroke-linecap="round"/>
        <polyline points="${pts}" fill="none" stroke="${C.light}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>`
    }
    case "waterfall": {
      const steps = [22, 8, 18, -10, 16, 12]
      let level = 0
      return (
        steps
          .map((v, i) => {
            const from = level
            level += v
            const top = y + 110 - Math.max(from, level) * 1.1
            const h = Math.abs(v) * 1.1
            return `<rect x="${x + i * 38}" y="${top}" width="26" height="${h}" rx="4" fill="${v >= 0 ? C.series : "#c53030"}"/>`
          })
          .join("") + `<rect x="${x + 236}" y="${y + 110 - level * 1.1}" width="26" height="${level * 1.1}" rx="4" fill="${C.light}"/>`
      )
    }
    case "bars":
      return [46, 70, 58, 92, 78, 104, 86]
        .map((v, i) => `<path d="M${x + i * 38},${y + 120} V${y + 124 - v} q0,-6 6,-6 h14 q6,0 6,6 V${y + 120} z" fill="${C.series}"/>`)
        .join("")
    case "kpis": {
      const tiles = [0, 1, 2]
        .map((i) => `<rect x="${x + i * 92}" y="${y}" width="82" height="52" rx="8" fill="#f1f3f8"/>
          <rect x="${x + i * 92 + 10}" y="${y + 11}" width="38" height="7" rx="3.5" fill="${C.pale}"/>
          <rect x="${x + i * 92 + 10}" y="${y + 28}" width="${[54, 44, 60][i]}" height="12" rx="4" fill="${C.navy}"/>`)
        .join("")
      const spark = [34, 28, 38, 30, 42, 36, 48, 44, 54].map((v, i) => `${x + i * 33},${y + 122 - v}`).join(" ")
      return tiles + `<polyline points="${spark}" fill="none" stroke="${C.light}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`
    }
    default:
      return ""
  }
}

function step2() {
  // Four report packages in a 2×2 grid; mini charts drawn at 270×120 and scaled up.
  const cards = [
    { title: "Standard", kind: "line" },
    { title: "Sales", kind: "bars" },
    { title: "Finanzen", kind: "waterfall" },
    { title: "Management", kind: "kpis" },
  ]
  const cw = 515
  const ch = 370
  const gap = 30
  const x0 = (W - 2 * cw - gap) / 2
  const y0 = (H - 2 * ch - gap) / 2
  const body = cards
    .map((card, i) => {
      const x = x0 + (i % 2) * (cw + gap)
      const y = y0 + Math.floor(i / 2) * (ch + gap)
      return `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="26" fill="${C.card}" stroke="${C.border}" stroke-width="2"/>
        ${text(x + 38, y + 70, card.title, { size: 40, weight: 700 })}
        <g transform="translate(${x + 38} ${y + 100}) scale(1.5)">${miniChart(card.kind, 0, 0)}</g>
        <rect x="${x + 38}" y="${y + 302}" width="140" height="44" rx="22" fill="${C.okSoft}"/>
        <circle cx="${x + 63}" cy="${y + 324}" r="13" fill="${C.ok}"/>${check(x + 63, y + 324, 0.6)}
        ${text(x + 86, y + 335, "Bereit", { size: 27, weight: 700, color: C.ok })}`
    })
    .join("")

  return svg(body)
}

/* ── Step 3: customise by drag & drop / AI ───────────────────────────── */
function step3() {
  const items = [
    { label: "Kennzahl", icon: `<text x="0" y="0" font-family="${FONT}" font-size="26" font-weight="800" fill="${C.series}" text-anchor="middle" dy="9">123</text>` },
    { label: "Linie", icon: `<polyline points="-18,10 -6,-2 4,4 18,-12" fill="none" stroke="${C.series}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>` },
    { label: "Balken", icon: `<rect x="-17" y="-2" width="9" height="16" rx="2" fill="${C.series}"/><rect x="-4" y="-14" width="9" height="28" rx="2" fill="${C.series}"/><rect x="9" y="-7" width="9" height="21" rx="2" fill="${C.series}"/>`, dragging: true },
    { label: "Tabelle", icon: `<rect x="-17" y="-14" width="34" height="28" rx="4" fill="none" stroke="${C.series}" stroke-width="4"/><path d="M-17,-3 h34 M-17,6 h34 M-4,-14 v28" stroke="${C.series}" stroke-width="3"/>` },
  ]
  const list = items
    .map((it, i) => {
      const y = 250 + i * 96
      return `<g opacity="${it.dragging ? 0.4 : 1}">
        <rect x="60" y="${y}" width="250" height="78" rx="16" fill="#f7f8fb" stroke="${C.border}" stroke-width="2"/>
        <rect x="76" y="${y + 13}" width="52" height="52" rx="12" fill="#e8ecf5"/>
        <g transform="translate(102 ${y + 39})">${it.icon}</g>
        ${text(146, y + 50, it.label, { size: 29, weight: 600 })}
      </g>`
    })
    .join("")

  const kpi = (x, label, value) => `<rect x="${x}" y="190" width="350" height="116" rx="18" fill="#fff" stroke="${C.border}" stroke-width="2"/>
    ${text(x + 26, 234, label, { size: 24, weight: 600, color: C.muted })}
    ${text(x + 26, 282, value, { size: 38, weight: 700 })}`

  const line = [70, 58, 80, 46, 60, 74, 66, 90, 76, 96].map((v, i) => `${410 + i * 78},${470 - v * 1.2}`).join(" ")

  // No page title: panels + AI bar (696px) centred vertically → shift up by 58.
  return svg(`<g transform="translate(0 -58)">
    <rect x="40" y="160" width="290" height="560" rx="24" fill="#fff" stroke="${C.border}" stroke-width="2"/>
    ${text(64, 214, "Elemente", { size: 30, weight: 700 })}
    ${list}

    <rect x="360" y="160" width="800" height="560" rx="24" fill="#fff" stroke="${C.border}" stroke-width="2"/>
    ${kpi(384, "Umsatz", "CHF 675.5 Tsd.")}
    ${kpi(754, "Rechnungen", "942")}
    <polyline points="${line}" fill="none" stroke="${C.light}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
    <rect x="384" y="500" width="752" height="196" rx="18" fill="#f1f5fd" stroke="${C.brand}" stroke-width="4" stroke-dasharray="16 10"/>
    ${text(760, 612, "Hier ablegen", { size: 30, weight: 600, color: C.brand, anchor: "middle" })}

    <g transform="rotate(-4 610 470)" filter="url(#shadow)">
      <rect x="470" y="400" width="300" height="170" rx="18" fill="#fff" stroke="${C.border}" stroke-width="2"/>
      ${[60, 96, 74, 120, 88].map((v, i) => `<rect x="${500 + i * 52}" y="${540 - v}" width="30" height="${v}" rx="5" fill="${C.series}"/>`).join("")}
    </g>
    ${cursor(700, 520)}

    <rect x="40" y="752" width="1120" height="104" rx="26" fill="#fff" stroke="${C.border}" stroke-width="2" filter="url(#shadow)"/>
    <path d="M96,780 l6,16 l16,6 l-16,6 l-6,16 l-6,-16 l-16,-6 l16,-6 z" fill="${C.brand}"/>
    ${text(144, 816, "Zeig mir den Umsatz pro Quartal", { size: 32, color: C.title })}
    <circle cx="1100" cy="804" r="32" fill="${C.navy}"/>
    <path d="M1088,804 h24 m-10,-11 l11,11 l-11,11" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`)
}

/* ── Treuhand: one login, one workspace per client ───────────────────── */
function multiCompany() {
  const clients = [
    { short: "MH", name: "Müller Holzbau GmbH" },
    { short: "SE", name: "Seeland Elektro AG", active: true },
    { short: "WP", name: "Weber & Partner" },
    { short: "BC", name: "Bergmann Consulting" },
    { short: "RL", name: "Rhein Logistik AG" },
  ]
  const rowY = (i) => 318 + i * 80
  const activeY = rowY(clients.findIndex((c) => c.active)) + 34
  const rows = clients
    .map((c, i) => {
      const y = rowY(i)
      return `${c.active ? `<rect x="58" y="${y - 4}" width="524" height="76" rx="16" fill="#eef1f7"/>` : ""}
        <rect x="78" y="${y + 6}" width="56" height="56" rx="12" fill="${c.active ? C.navy : "#e8ecf4"}"/>
        ${text(106, y + 44, c.short, { size: 23, weight: 700, color: c.active ? "#fff" : C.navy, anchor: "middle" })}
        ${text(154, y + 45, c.name, { size: 29, weight: c.active ? 700 : 500 })}
        ${c.active ? check(546, y + 34, 0.8, C.brand) : ""}`
    })
    .join("")

  const bars = [52, 74, 60, 96, 82, 108, 90]
    .map((v, i) => `<path d="M${684 + i * 62},${838} V${842 - v} q0,-7 7,-7 h22 q7,0 7,7 V${838} z" fill="${C.series}"/>`)
    .join("")
  const line = [58, 50, 72, 44, 60, 76, 70, 92, 84].map((v, i) => `${684 + i * 55},${590 - v * 1.3}`).join(" ")
  const kpi = (x, label, value) => `<rect x="${x}" y="276" width="220" height="112" rx="16" fill="#fff" stroke="${C.border}" stroke-width="2"/>
    ${text(x + 22, 316, label, { size: 23, weight: 600, color: C.muted })}
    ${text(x + 22, 362, value, { size: 30, weight: 700 })}`

  return svg(`
    <!-- app bar -->
    <rect x="40" y="34" width="1120" height="76" rx="18" fill="#fff" stroke="${C.border}" stroke-width="2"/>
    <rect x="62" y="50" width="44" height="44" rx="10" fill="#fff" stroke="${C.navy}" stroke-width="3"/>
    ${[0, 1, 2, 3].map((k) => `<rect x="${72 + (k % 2) * 14}" y="${60 + Math.floor(k / 2) * 14}" width="10" height="10" rx="2" fill="none" stroke="${C.navy}" stroke-width="2.5"/>`).join("")}
    <image href="${icon}" x="124" y="50" width="44" height="44"/>
    ${text(182, 83, "smiit Analytics", { size: 30, weight: 700 })}

    <!-- workspace switcher -->
    <rect x="40" y="134" width="560" height="730" rx="24" fill="#fff" stroke="${C.border}" stroke-width="2" filter="url(#shadow)"/>
    <rect x="66" y="160" width="64" height="64" rx="14" fill="${C.brand}"/>
    ${text(98, 202, "TK", { size: 26, weight: 800, color: "#fff", anchor: "middle" })}
    ${text(150, 193, "Treuhand Keller AG", { size: 30, weight: 700 })}
    ${text(150, 222, "Ihr Account", { size: 22, color: C.muted })}
    <rect x="514" y="166" width="54" height="54" rx="12" fill="#fff" stroke="${C.border}" stroke-width="2"/>
    <path d="M530,198 l11,-11 l11,11" fill="none" stroke="${C.title}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="60" y1="252" x2="580" y2="252" stroke="${C.border}" stroke-width="2"/>
    ${text(66, 296, "Mandanten", { size: 24, weight: 600, color: C.muted })}
    ${rows}
    <path d="M88,${rowY(5) + 34} h24 M100,${rowY(5) + 22} v24" stroke="${C.muted}" stroke-width="3.5" stroke-linecap="round"/>
    ${text(154, rowY(5) + 45, "Workspace erstellen", { size: 28, color: C.muted })}
    ${cursor(420, activeY + 4)}

    <!-- the selected client's report, right next to it -->
    <rect x="630" y="134" width="530" height="730" rx="24" fill="#fff" stroke="${C.border}" stroke-width="2"/>
    ${text(662, 196, "Seeland Elektro AG", { size: 32, weight: 700 })}
    ${text(662, 234, "Verkauf", { size: 24, color: C.muted })}
    ${kpi(662, "Umsatz", "CHF 412 Tsd.")}
    ${kpi(904, "Rechnungen", "518")}
    <polyline points="${line}" fill="none" stroke="${C.light}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
    <line x1="662" y1="634" x2="1128" y2="634" stroke="${C.border}" stroke-width="2"/>
    ${bars}

    <!-- one-click switch badge between list and report -->
    <circle cx="615" cy="${activeY}" r="30" fill="${C.brand}" stroke="#fff" stroke-width="5"/>
    <path d="M603,${activeY} h22 m-9,-10 l10,10 l-10,10" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  `)
}

/* ── "Für wen?" personas (3:2, 1200×800) ─────────────────────────────── */
const PW = 1200
const PH = 800

function iconTile(x, y, glyph, bg = "#e8ecf5") {
  return `<rect x="${x}" y="${y}" width="72" height="72" rx="18" fill="${bg}"/><g transform="translate(${x + 36} ${y + 36})">${glyph}</g>`
}
const glyph = {
  bell: `<path d="M-14,8 h28 l-4,-6 v-10 a10,10 0 0 0 -20,0 v10 z M-5,12 a5,5 0 0 0 10,0" fill="none" stroke="${C.series}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>`,
  paid: `<circle r="16" fill="${C.ok}"/><path d="M-8,0 l5,5 l10,-11" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
  chart: `<rect x="-15" y="0" width="8" height="13" rx="2" fill="${C.series}"/><rect x="-4" y="-10" width="8" height="23" rx="2" fill="${C.series}"/><rect x="7" y="-5" width="8" height="18" rx="2" fill="${C.series}"/>`,
  download: `<path d="M0,-14 v18 m-9,-8 l9,9 l9,-9 M-14,14 h28" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
}

/** Owner: phone with the key numbers + automatic notifications. */
function personaOwner() {
  const spark = [48, 52, 61, 45, 50, 59, 64, 59, 67, 57, 50, 62].map((v, i) => `${200 + i * 28},${680 - (v - 40) * 3}`).join(" ")
  const note = (y, g, bg, title, sub) => `<rect x="620" y="${y}" width="520" height="150" rx="26" fill="#fff" stroke="${C.border}" stroke-width="2" filter="url(#shadow)"/>
    ${iconTile(650, y + 39, g, bg)}
    ${text(746, y + 66, title, { size: 32, weight: 700 })}
    ${text(746, y + 108, sub, { size: 27, color: C.muted })}`
  return svg(
    `
    <rect x="150" y="40" width="400" height="720" rx="60" fill="${C.title}"/>
    <rect x="166" y="56" width="368" height="688" rx="46" fill="#fff"/>
    <rect x="300" y="72" width="100" height="22" rx="11" fill="${C.title}"/>
    ${text(196, 150, "Übersicht", { size: 36, weight: 700 })}
    <rect x="190" y="180" width="320" height="140" rx="22" fill="#f3f5fa"/>
    ${text(214, 222, "Umsatz Monat", { size: 25, weight: 600, color: C.muted })}
    ${text(214, 272, "CHF 62.3 Tsd.", { size: 40, weight: 700 })}
    ${text(214, 306, "+11.8 % vs. Vorjahr", { size: 23, weight: 700, color: C.ok })}
    <rect x="190" y="340" width="320" height="130" rx="22" fill="#f3f5fa"/>
    ${text(214, 382, "Offene Rechnungen", { size: 25, weight: 600, color: C.muted })}
    ${text(214, 432, "CHF 76.8 Tsd.", { size: 40, weight: 700 })}
    ${text(196, 524, "Umsatz 12 Monate", { size: 25, weight: 600, color: C.muted })}
    <polyline points="${spark}" fill="none" stroke="${C.light}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${200 + 11 * 28}" cy="${680 - 22 * 3}" r="9" fill="${C.series}" stroke="#fff" stroke-width="3"/>

    ${note(130, glyph.bell, "#e8ecf5", "Wochenüberblick", "Umsatz +11.8 % vs. Vorjahr")}
    ${note(325, glyph.paid, C.okSoft, "Zahlung eingegangen", "Müller Holzbau · CHF 7’200")}
    ${note(520, glyph.chart, "#e8ecf5", "Monatsbericht bereit", "Automatisch erstellt")}
  `,
    PW,
    PH,
  )
}

/** Trustee: fanned reports of several clients, front one ready to export. */
function personaTrustee() {
  const card = (x, y, rot, short, name, front) => `<g transform="rotate(${rot} ${x + 300} ${y + 260})" ${front ? 'filter="url(#shadow)"' : ""}>
      <rect x="${x}" y="${y}" width="600" height="520" rx="28" fill="#fff" stroke="${C.border}" stroke-width="2"/>
      <rect x="${x + 32}" y="${y + 32}" width="64" height="64" rx="14" fill="${front ? C.navy : "#e8ecf4"}"/>
      ${text(x + 64, y + 74, short, { size: 26, weight: 800, color: front ? "#fff" : C.navy, anchor: "middle" })}
      ${text(x + 116, y + 76, name, { size: 34, weight: 700 })}
      ${
        front
          ? `<rect x="${x + 32}" y="${y + 128}" width="256" height="120" rx="18" fill="#f3f5fa"/>
             ${text(x + 54, y + 170, "Umsatz", { size: 24, weight: 600, color: C.muted })}
             ${text(x + 54, y + 220, "CHF 412 Tsd.", { size: 36, weight: 700 })}
             <rect x="${x + 312}" y="${y + 128}" width="256" height="120" rx="18" fill="#f3f5fa"/>
             ${text(x + 334, y + 170, "Offen", { size: 24, weight: 600, color: C.muted })}
             ${text(x + 334, y + 220, "CHF 38 Tsd.", { size: 36, weight: 700 })}
             ${[70, 102, 84, 126, 110, 142, 118]
               .map((v, i) => `<path d="M${x + 44 + i * 60},${y + 470} V${y + 476 - v} q0,-7 7,-7 h24 q7,0 7,7 V${y + 470} z" fill="${C.series}"/>`)
               .join("")}`
          : [0, 1, 2].map((k) => `<rect x="${x + 32}" y="${y + 140 + k * 46}" width="${[420, 340, 380][k]}" height="20" rx="10" fill="${C.track}"/>`).join("")
      }
    </g>`
  return svg(
    `
    ${card(150, 150, -7, "WP", "Weber & Partner", false)}
    ${card(230, 120, -3, "MH", "Müller Holzbau GmbH", false)}
    ${card(330, 110, 2, "SE", "Seeland Elektro AG", true)}
    <g transform="rotate(2 630 370)">
      <rect x="720" y="610" width="260" height="76" rx="18" fill="${C.brand}" filter="url(#shadow)"/>
      <g transform="translate(762 648)">${glyph.download}</g>
      ${text(792, 659, "Exportieren", { size: 30, weight: 700, color: "#fff" })}
    </g>
  `,
    PW,
    PH,
  )
}

/** Team lead: own area at a glance – utilisation and hours per person. */
function personaTeamLead() {
  const team = [
    ["Anna", 1962],
    ["Marco", 1874],
    ["Sandra", 1808],
    ["Luca", 1746],
    ["Nina", 1444],
  ]
  const max = 2000
  const bars = team
    .map(([n, v], i) => {
      const y = 250 + i * 92
      return `${text(560, y + 34, n, { size: 30, weight: 600 })}
        <rect x="690" y="${y + 8}" width="400" height="34" rx="8" fill="${C.track}"/>
        <rect x="690" y="${y + 8}" width="${(v / max) * 400}" height="34" rx="8" fill="${C.series}"/>`
    })
    .join("")
  return svg(
    `
    <rect x="60" y="60" width="1080" height="680" rx="30" fill="#fff" stroke="${C.border}" stroke-width="2" filter="url(#shadow)"/>
    ${text(110, 140, "Mein Bereich", { size: 44, weight: 700 })}
    ${text(110, 186, "Montage · letzte 12 Monate", { size: 27, color: C.muted })}

    <rect x="110" y="240" width="380" height="440" rx="24" fill="#f3f5fa"/>
    ${text(146, 300, "Auslastung", { size: 30, weight: 600, color: C.muted })}
    ${text(146, 400, "77 %", { size: 96, weight: 800, color: C.navy })}
    <rect x="146" y="450" width="308" height="24" rx="12" fill="${C.track}"/>
    <rect x="146" y="450" width="${308 * 0.77}" height="24" rx="12" fill="${C.series}"/>
    ${text(146, 540, "Verrechenbar", { size: 26, color: C.muted })}
    ${text(146, 584, "6’813 Std.", { size: 38, weight: 700 })}
    ${text(146, 640, "von 8’834 Std.", { size: 26, color: C.muted })}

    ${text(560, 222, "Stunden je Person", { size: 30, weight: 600, color: C.muted })}
    ${bars}
  `,
    PW,
    PH,
  )
}

const out = [
  ["public/media/img_step_1.webp", step1()],
  ["public/media/img_step_2.webp", step2()],
  ["public/media/img_step_3.webp", step3()],
  ["public/media/img_multi_company.webp", multiCompany()],
  ["public/media/img_persona_geschaeftsfuehrung.webp", personaOwner()],
  ["public/media/img_persona_treuhand.webp", personaTrustee()],
  ["public/media/img_persona_teamleitung.webp", personaTeamLead()],
]
for (const [file, markup] of out) {
  await sharp(Buffer.from(markup)).webp({ quality: 90 }).toFile(file)
  console.log("written", file)
}
