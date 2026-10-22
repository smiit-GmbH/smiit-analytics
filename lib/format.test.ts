import { describe, expect, it } from "vitest"
import { getDictionary } from "@/lib/dictionary"
import { createFormatter } from "@/lib/format"

const de = createFormatter(getDictionary("de").format)
const en = createFormatter(getDictionary("en").format)

describe("createFormatter", () => {
  it("groups thousands with the locale separator", () => {
    expect(de.num(1234567)).toBe("1’234’567")
    expect(de.num(999)).toBe("999")
  })

  it("drops trailing zeros of the fraction", () => {
    expect(de.num(12.5, 2)).toBe("12.5")
    expect(de.num(12, 2)).toBe("12")
    expect(de.num(0.05, 2)).toBe("0.05")
  })

  it("uses an en dash for negative numbers", () => {
    expect(de.num(-1500)).toBe("–1’500")
  })

  it("formats percentages from the locale pattern", () => {
    expect(de.pct(12.34)).toBe("12.3 %")
  })

  it("switches compact CHF amounts to millions from 1’000’000 on", () => {
    expect(de.chfCompact(675_500)).toBe("CHF 675.5 Tsd.")
    expect(de.chfCompact(1_020_000)).toBe("CHF 1.02 Mio.")
    expect(de.compact(0)).toBe("0 Tsd.")
  })

  it("always prints two decimals for chf2", () => {
    expect(de.chf2(1234.5)).toBe("CHF 1’234.50")
    expect(de.chf2(7)).toBe("CHF 7.00")
  })

  it("prefixes an explicit sign", () => {
    expect(de.signed(1200, de.chf)).toBe("+CHF 1’200")
    expect(de.signed(-800, de.chf)).toBe("–CHF 800")
  })

  it("formats dates the Swiss way in every language", () => {
    const d = new Date(2026, 8, 5, 7, 3)
    expect(de.date(d)).toBe("05.09.2026")
    expect(en.date(d)).toBe("05.09.2026")
    expect(de.dateTime(d)).toBe("05.09.2026 07:03")
  })

  it("returns localized short month names", () => {
    expect(de.month(2)).toBe("Mär")
    expect(en.month(2)).not.toBe("Mär")
  })
})
