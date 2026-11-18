import { existsSync, readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"
import { type LegalBlock, type LegalLine, legalIndents, linkParts, parseLegalText } from "@/lib/legal-text"

const lines = (blocks: LegalBlock[]): LegalLine[] => blocks.flatMap((b) => (b.type === "lines" ? b.lines : []))
const headings = (blocks: LegalBlock[]) => blocks.flatMap((b) => (b.type === "heading" ? [b] : []))

describe("parseLegalText", () => {
  const sample = [
    "=====",
    "TITEL DES DOKUMENTS",
    "Untertitel in zwei",
    "Zeilen",
    "=====",
    "",
    "§ 1 ERSTER ABSCHNITT MIT EINER LANGEN ÜBERSCHRIFT, DIE AUF DIE ZWEITE ZEILE",
    "    UMBRICHT",
    "",
    "(1) Ein Absatz, der im Quelltext hart umbrochen ist, weil er länger als eine",
    "    Zeile ist, und einen Begriff wie Datenschutz-",
    "    Folgenabschätzung enthält.",
    "",
    "    a) erster Punkt",
    "    b) zweiter Punkt",
    "",
    "  smiit GmbH",
    "  Reiherweg 96",
    "  Telefon:  +49 160 4073198",
    "",
    "  Zweck:          Ein Zweck, der so lang ist, dass er auf die nächste Zeile",
    "                  umbricht",
    "  Berechtigtes",
    "  Interesse:      Betrieb",
    "  Übermittlungs-",
    "  mechanismus:    Klauseln",
    "",
    "WIDERSPRUCHSRECHT",
    "",
    "=====",
    "ENDE DES DOKUMENTS",
    "=====",
  ].join("\n")
  const doc = parseLegalText(sample)

  it("takes the subtitle from the title block and drops the end marker", () => {
    expect(doc.subtitle).toBe("Untertitel in zwei Zeilen")
    expect(JSON.stringify(doc)).not.toContain("ENDE DES")
  })

  it("joins a heading that wraps and nests a heading in capitals below a numbered one", () => {
    expect(headings(doc.blocks).map((h) => [h.level, h.text])).toEqual([
      [2, "§ 1 ERSTER ABSCHNITT MIT EINER LANGEN ÜBERSCHRIFT, DIE AUF DIE ZWEITE ZEILE UMBRICHT"],
      [3, "WIDERSPRUCHSRECHT"],
    ])
  })

  it("unwraps clauses, keeps real hyphens and keeps the line breaks of an address", () => {
    const [clause, a, b, address, phone] = lines(doc.blocks)
    expect(clause).toMatchObject({
      marker: "(1)",
      text: "Ein Absatz, der im Quelltext hart umbrochen ist, weil er länger als eine Zeile ist, und einen Begriff wie Datenschutz-Folgenabschätzung enthält.",
    })
    expect([a.marker, b.marker]).toEqual(["a)", "b)"])
    expect(address.text).toBe("smiit GmbH\nReiherweg 96")
    expect(phone).toMatchObject({ label: "Telefon", text: "+49 160 4073198" })
  })

  it("reads label rows, also with the label split over two lines", () => {
    const labelled = lines(doc.blocks).filter((l) => l.label)
    expect(labelled.map((l) => [l.label, l.text])).toEqual([
      ["Telefon", "+49 160 4073198"],
      ["Zweck", "Ein Zweck, der so lang ist, dass er auf die nächste Zeile umbricht"],
      ["Berechtigtes Interesse", "Betrieb"],
      ["Übermittlungsmechanismus", "Klauseln"],
    ])
  })
})

describe("parseLegalText in other languages", () => {
  const doc = parseLegalText(
    [
      "ANNEXE 1 — DONNÉES À CARACTÈRE PERSONNEL",
      "",
      "1. CATÉGORIES DE DONNÉES",
      "",
      "  Finalité :       Un texte qui est assez long pour passer à la ligne suivante,",
      "                   puis continue",
      "",
      "RESPONSABILITÀ DELL'INTERESSATO",
      "",
      "=====",
      "FIN DE L'ACCORD",
      "=====",
    ].join("\n"),
  )

  it("reads accented headings, annexes, French labels and the end line", () => {
    expect(headings(doc.blocks).map((h) => [h.level, h.id])).toEqual([
      [2, "annexe-1-donnees-a-caractere-personnel"],
      [3, "1-categories-de-donnees"],
      [3, "responsabilita-dell-interessato"],
    ])
    expect(lines(doc.blocks)).toEqual([
      { indent: 2, label: "Finalité", text: "Un texte qui est assez long pour passer à la ligne suivante, puis continue" },
    ])
    expect(JSON.stringify(doc)).not.toContain("FIN DE")
  })
})

describe("legalIndents", () => {
  const doc = parseLegalText(
    [
      "(1) Erster Absatz.",
      "",
      "    Folgeabsatz, der zu (1) gehört.",
      "",
      "    a) Unterpunkt",
      "       Fortsetzung auf Höhe des Textes",
      "",
      "       Absatz unter dem Unterpunkt",
      "",
      "  b) Punkt mit eigener Einrückung",
      "     Zweck:          steht unter dem Text von b)",
      "",
      "(2) Zweiter Absatz.",
      "",
      "  smiit GmbH",
      "  Reiherweg 96",
    ].join("\n"),
  )
  const all = lines(doc.blocks)
  const offsets = legalIndents(doc.blocks, { marker: 2, bullet: 1, step: 1 })

  it("lines up lines with the text of the item they belong to", () => {
    expect(all.map((l) => [l.marker ?? l.label ?? l.text.slice(0, 12), offsets.get(l)])).toEqual([
      ["(1)", 0],
      ["Folgeabsatz,", 2],
      ["a)", 2],
      ["Absatz unter", 4],
      ["b)", 1],
      ["Zweck", 3],
      ["(2)", 0],
      ["smiit GmbH\nR", 1],
    ])
  })
})

describe.each(["privacy", "terms", "dpa"])("content/legal/%s.txt", (route) => {
  const doc = parseLegalText(readFileSync(`content/legal/${route}.txt`, "utf8"))
  const text = JSON.stringify(doc)

  it("has no placeholders or internal notes left", () => {
    expect(text).not.toMatch(/PLATZHALTER|HINWEIS AN DEN ANBIETER|DOKUMENTSTATUS|Entwurf/)
  })

  it("has headings with unique anchors", () => {
    const ids = headings(doc.blocks).map((h) => h.id)
    expect(ids.length).toBeGreaterThan(10)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("leaves no frame lines or column padding in the text", () => {
    expect(text).not.toMatch(/={5}|-{5}/)
    expect(lines(doc.blocks).filter((l) => / {3}/.test(l.text))).toEqual([])
  })
})

/** Structure of a text without the wording: headings (level, number), blocks, lines (offset, marker, label, kept breaks). */
function shape(source: string) {
  const doc = parseLegalText(source)
  const offsets = legalIndents(doc.blocks)
  const number = (text: string) =>
    /^(§ \d+|\d+(?:\.\d+)*)/.exec(text)?.[1] ?? /^(?:ANLAGE|ANNEX|ANNEXE|ALLEGATO) (\d+)/.exec(text)?.[1] ?? "-"
  return doc.blocks.map((b) =>
    b.type === "heading"
      ? `h${b.level} ${number(b.text)}`
      : b.lines.map((l) => `${offsets.get(l)} ${l.marker ?? ""} ${l.label ? "label" : ""} ${l.text.split("\n").length}`),
  )
}
const links = (source: string) =>
  lines(parseLegalText(source).blocks)
    .flatMap((l) => linkParts(l.text).flatMap((p) => (p.href ? [p.href] : [])))
    .sort()

// Translations (AI, not reviewed; the German text alone is binding) must keep the German structure and links.
describe.each(["en", "fr", "it"].flatMap((lang) => ["privacy", "terms", "dpa"].map((route) => [lang, route])))(
  "content/legal/%s/%s.txt",
  (lang, route) => {
    const file = `content/legal/${lang}/${route}.txt`
    const german = readFileSync(`content/legal/${route}.txt`, "utf8")
    const source = existsSync(file) ? readFileSync(file, "utf8") : ""

    it("exists", () => expect(source).not.toBe(""))

    it("has the structure and the links of the German text", () => {
      expect(shape(source)).toEqual(shape(german))
      expect(links(source)).toEqual(links(german))
    })

    it("opens with the version line and has unique anchors", () => {
      const doc = parseLegalText(source)
      const first = doc.blocks[0]
      expect(first.type === "lines" && first.lines[0].text).toMatch(/^Versione? 1\.0 — /)
      expect(doc.subtitle).toBeTruthy()
      const ids = headings(doc.blocks).map((h) => h.id)
      expect(new Set(ids).size).toBe(ids.length)
      expect(JSON.stringify(doc)).not.toMatch(/={5}|-{5}/)
      // The framed end line ("END OF …", "FIN DE …", "FINE DEL …") is dropped, not shown as text.
      const texts = doc.blocks.flatMap((b) => (b.type === "heading" ? [b.text] : b.lines.map((l) => l.text)))
      expect(texts.filter((s) => /^(END OF|FIN DE|FIN DU|FINE DE)/.test(s))).toEqual([])
    })
  },
)

describe("linkParts", () => {
  it("finds URLs (without trailing punctuation) and e-mail addresses", () => {
    expect(linkParts("Siehe https://example.com/a/. Fragen an info@smiit.de")).toEqual([
      { text: "Siehe " },
      { text: "https://example.com/a/", href: "https://example.com/a/" },
      { text: ". Fragen an " },
      { text: "info@smiit.de", href: "mailto:info@smiit.de" },
    ])
  })
})
