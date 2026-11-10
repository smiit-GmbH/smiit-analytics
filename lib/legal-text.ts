/**
 * Turns the legal texts in content/legal/*.txt (plain text, hard-wrapped at
 * about 80 columns, as the lawyer edits them) into blocks the page can render
 * responsively: headings, paragraphs, numbered clauses, lists and
 * "Zweck:      …" label rows.
 *
 * The format it reads:
 * - `====` / `----` lines are frames; the first framed block is the title
 *   (its second and later lines become the subtitle), a framed "ENDE DER …"
 *   is dropped.
 * - Headings start at column 0: "§ 11 …", "ANLAGE 2 — …", "4.12 …", "1. …",
 *   or a line in capitals ("PRÄAMBEL"). In the annexes "1." is one level
 *   lower than outside.
 * - Blocks are separated by blank lines. Inside a block a line continues the
 *   previous one when it is indented to the same text column; a short line
 *   (address, name) keeps its line break.
 * - "(1)", "a)", "-" and "1." start clauses / list items; "Wort:   Text"
 *   starts a label row, also when the label is split over two lines
 *   ("Berechtigtes" / "Interesse:", "Übermittlungs-" / "mechanismus:").
 */

export type LegalHeading = { type: "heading"; level: 2 | 3 | 4; id: string; text: string }

/** One logical line. `text` may contain "\n" for line breaks the source keeps (addresses). */
export type LegalLine = {
  /** Indentation in the source, in columns. */
  indent: number
  /** "(1)", "a)", "-", "1." */
  marker?: string
  /** With a marker: source column where its text starts; deeper lines at this column belong to the item. */
  column?: number
  /** "Zweck", "Berechtigtes Interesse" … */
  label?: string
  text: string
}

export type LegalBlock = LegalHeading | { type: "lines"; lines: LegalLine[] }

export type LegalDoc = { subtitle?: string; blocks: LegalBlock[] }

/** A line whose next word would have fitted is a deliberate break, not a wrap. */
const SHORT_LINE = 50

const FRAME = /^(=+|-+)$/
const MARKER = /^(\(\d+[a-z]?\)|[a-z]\)|-|\d+\.)\s+(.*)$/
const LABEL = /^([A-ZÄÖÜ][^:]{0,50}?):(\s+)(\S.*)$/
/** First half of a split label: "Berechtigtes", "Übermittlungs-", "Herkunft der". */
const LABEL_HEAD = /^[A-ZÄÖÜ][a-zäöüß]+(-| [a-zäöü]+)?$/
/** Second half of a split label: may start lower case ("mechanismus:"), the value is column-aligned. */
const LABEL_TAIL = /^([A-Za-zÄÖÜäöü][^:]{0,30}?):(\s{2,})(\S.*)$/
const NUMBERED = /^(§ \d+|ANLAGE \d+|\d+(?:\.\d+)*\.?)\s+(.*)$/
const CAPITALS = /^[A-ZÄÖÜ][A-ZÄÖÜß0-9 ,.\-—()"]{3,}$/

type Raw = { indent: number; text: string }

const chars = (s: string) => [...s].length
const firstWord = (s: string) => s.split(/\s+/)[0] ?? ""
/** Mostly capitals: "ANMELDUNG ÜBER MICROSOFT ODER bexio" still counts. */
const isShouting = (s: string) => {
  const letters = s.replace(/[^A-Za-zÄÖÜäöüß]/g, "")
  return letters.length > 0 && letters.replace(/[^A-ZÄÖÜ]/g, "").length / letters.length > 0.7
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/§\s*/g, "p")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60)
    .replace(/-$/, "")
}

/** Heading level of a column-0 line, or null when it is not a heading. */
function headingLevel(text: string, inAnnex: boolean, numbered: boolean): 2 | 3 | 4 | null {
  if (/^ENDE DE/.test(text)) return null
  const m = NUMBERED.exec(text)
  if (m) {
    const [, num, rest] = m
    if (num.startsWith("§") || num.startsWith("ANLAGE")) return 2
    // "1. Microsoft Ireland Operations Limited" (annex 3) is a heading; a numbered sentence is not.
    if (!isShouting(rest) && (/[.,;:]$/.test(rest) || chars(rest) > 70)) return null
    const depth = num.replace(/\.$/, "").split(".").length
    const level = depth + (inAnnex ? 2 : 1)
    return Math.min(level, 4) as 2 | 3 | 4
  }
  // "PRÄAMBEL" before § 1 is a section; "WIDERSPRUCHSRECHT …" inside a numbered section is a sub-heading.
  if (!CAPITALS.test(text)) return null
  return numbered ? 3 : 2
}

function joinText(prev: string, next: string) {
  // A hyphen at the end of a line is a real one ("öffentlich-" / "rechtliche", "Datenschutz-" /
  // "Folgenabschätzung"): the texts are not hyphenated by syllable.
  return /[A-Za-zÄÖÜäöüß]-$/.test(prev) ? prev + next : `${prev} ${next}`
}

/** A line being built: `col` is where its text starts, `oneSpace` marks "Hinweis: …" style labels. */
type OpenLine = LegalLine & { col: number; oneSpace?: boolean }

/** Splits one blank-line-separated block (no heading) into logical lines. */
function toLines(raws: Raw[]): LegalLine[] {
  const out: LegalLine[] = []
  // Cast, not annotation: `start` assigns it in a closure, which TypeScript's narrowing does not see.
  let cur = null as OpenLine | null
  let prevRaw: Raw | null = null

  for (let i = 0; i < raws.length; i++) {
    const raw = raws[i]
    const next = raws[i + 1]

    const start = (line: OpenLine) => {
      if (cur) out.push(stripCol(cur))
      cur = line
    }

    // A label split over two lines: "Berechtigtes" / "Interesse:      …".
    const tail = next && next.indent === raw.indent && LABEL_HEAD.test(raw.text) && LABEL_TAIL.exec(next.text)
    if (tail) {
      const head = raw.text
      const label = head.endsWith("-") ? head.slice(0, -1) + tail[1] : `${head} ${tail[1]}`
      start({ indent: raw.indent, label, text: tail[3], col: raw.indent + chars(tail[1]) + 1 + tail[2].length })
      prevRaw = next
      i++
      continue
    }

    const marker = MARKER.exec(raw.text)
    if (marker) {
      const col = raw.indent + chars(raw.text) - chars(marker[2])
      start({ indent: raw.indent, marker: marker[1], text: marker[2], col })
      prevRaw = raw
      continue
    }

    const label = LABEL.exec(raw.text)
    const labelHere = label && (label[2].length >= 2 || (raw.indent > 0 && (!cur || raw.indent < cur.col)))
    if (label && labelHere) {
      const col = raw.indent + chars(label[1]) + 1 + label[2].length
      start({ indent: raw.indent, label: label[1], text: label[3], col, oneSpace: label[2].length === 1 })
      prevRaw = raw
      continue
    }

    // Clauses, list items and label rows continue on deeper-indented lines (not always exactly at
    // the text column); plain lines and "Hinweis: …" rows continue at their own indentation.
    const continues =
      cur !== null &&
      prevRaw !== null &&
      (raw.indent > cur.indent
        ? Boolean(cur.marker || cur.label)
        : raw.indent === cur.indent && (!(cur.marker || cur.label) || cur.oneSpace === true))
    // "Registergericht: …" below an address line, "Vertreten durch: …" below that: a new label row.
    if (continues && cur && label && raw.indent > 0 && raw.indent === cur.indent) {
      const col = raw.indent + chars(label[1]) + 1 + label[2].length
      start({ indent: raw.indent, label: label[1], text: label[3], col, oneSpace: label[2].length === 1 })
      prevRaw = raw
      continue
    }

    if (continues && cur && prevRaw) {
      const wrapped = prevRaw.indent + chars(prevRaw.text) + 1 + chars(firstWord(raw.text)) > SHORT_LINE
      cur.text = wrapped ? joinText(cur.text, raw.text) : `${cur.text}\n${raw.text}`
      prevRaw = raw
      continue
    }

    start({ indent: raw.indent, text: raw.text, col: raw.indent })
    prevRaw = raw
  }
  if (cur) out.push(stripCol(cur))
  return out
}

function stripCol({ indent, marker, label, text, col }: OpenLine): LegalLine {
  return { indent, ...(marker ? { marker, column: col } : {}), ...(label ? { label } : {}), text }
}

/**
 * Left offset of every line, in units of the root font size: a line lines up with the text of the
 * clause or list item it belongs to (the item whose text starts at the line's source column);
 * a line indented without such a parent is set in by one step. Resets at every heading.
 */
export function legalIndents(blocks: LegalBlock[], { marker = 2, bullet = 1.25, step = 1 } = {}) {
  const offsets = new Map<LegalLine, number>()
  let columns = new Map<number, number>([[0, 0]])
  for (const b of blocks) {
    if (b.type === "heading") {
      columns = new Map([[0, 0]])
      continue
    }
    for (const line of b.lines) {
      // Columns deeper than this line belonged to items that are now closed.
      for (const c of [...columns.keys()]) if (c > line.indent) columns.delete(c)
      let at = columns.get(line.indent)
      if (at === undefined) {
        const parent = Math.max(...[...columns.keys()].filter((c) => c < line.indent))
        at = (columns.get(parent) ?? 0) + step
        columns.set(line.indent, at)
      }
      offsets.set(line, at)
      if (line.marker && line.column !== undefined) columns.set(line.column, at + (line.marker === "-" ? bullet : marker))
    }
  }
  return offsets
}

export function parseLegalText(source: string): LegalDoc {
  const lines = source
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.replace(/\s+$/, ""))
  let i = 0
  let subtitle: string | undefined

  // Title block: ==== / TITLE / subtitle lines / ====
  if (FRAME.test(lines[0] ?? "")) {
    const end = lines.findIndex((l, j) => j > 0 && FRAME.test(l))
    const title = lines.slice(1, end).map((l) => l.trim())
    if (title.length > 1) subtitle = title.slice(1).join(" ")
    i = end + 1
  }

  // Blocks: frames count as blank lines.
  const blocks: Raw[][] = []
  let block: Raw[] = []
  for (; i < lines.length; i++) {
    const l = lines[i]
    if (l === "" || FRAME.test(l)) {
      if (block.length) blocks.push(block)
      block = []
      continue
    }
    block.push({ indent: chars(l) - chars(l.trimStart()), text: l.trim() })
  }
  if (block.length) blocks.push(block)

  const out: LegalBlock[] = []
  const ids = new Set<string>()
  let inAnnex = false
  let numbered = false

  for (const b of blocks) {
    const first = b[0]
    if (first.indent === 0 && /^ENDE DE/.test(first.text)) continue
    const level = first.indent === 0 ? headingLevel(first.text, inAnnex, numbered) : null
    if (level === null) {
      out.push({ type: "lines", lines: toLines(b) })
      continue
    }
    if (/^ANLAGE /.test(first.text)) inAnnex = true
    if (NUMBERED.test(first.text)) numbered = true
    // A heading may wrap onto indented lines in capitals ("§ 7 … UND IN" / "    DRITTLÄNDER").
    let n = 1
    let text = first.text
    while (n < b.length && b[n].indent > 0 && isShouting(first.text) && isShouting(b[n].text)) text += ` ${b[n++].text}`
    let id = slugify(text)
    for (let k = 2; ids.has(id); k++) id = `${slugify(text)}-${k}`
    ids.add(id)
    out.push({ type: "heading", level, id, text })
    // Lines right below a heading keep their indentation ("   Verarbeitungsort: …" in annex 3).
    if (n < b.length) out.push({ type: "lines", lines: toLines(b.slice(n)) })
  }
  return { subtitle, blocks: out }
}

/** Splits text into plain parts, links (https://…) and e-mail addresses, for rendering. */
export function linkParts(text: string): { text: string; href?: string }[] {
  const parts: { text: string; href?: string }[] = []
  const re = /(https?:\/\/[^\s"]+[^\s".,;:)]|[\w.+-]+@[\w-]+(?:\.[\w-]+)*\.[a-z]{2,})/g
  let last = 0
  for (const m of text.matchAll(re)) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index) })
    parts.push({ text: m[0], href: m[0].includes("@") && !m[0].startsWith("http") ? `mailto:${m[0]}` : m[0] })
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push({ text: text.slice(last) })
  return parts
}
