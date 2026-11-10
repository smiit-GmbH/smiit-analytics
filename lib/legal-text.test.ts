import { readFileSync } from "node:fs"
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
