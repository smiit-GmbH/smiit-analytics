import { describe, expect, it } from "vitest"
import { sum, sumBy } from "@/lib/demo/math"
import { fitLabel, niceScale, shiftISO, truncate, REFERENCE_DATE } from "./dashboard-kit"

describe("niceScale", () => {
  it("rounds the top to a clean step", () => {
    expect(niceScale(87_000, 4)).toEqual({ top: 100_000, ticks: [0, 25_000, 50_000, 75_000, 100_000] })
    expect(niceScale(66_800, 4).top).toBe(80_000) // step 20’000
  })

  it("gives empty or all-zero data a usable axis instead of NaN", () => {
    expect(niceScale(0)).toEqual({ top: 1, ticks: [0, 1] })
    expect(niceScale(Math.max())).toEqual({ top: 1, ticks: [0, 1] }) // Math.max() of nothing = -Infinity
  })
})

describe("labels", () => {
  it("truncates with an ellipsis only when needed", () => {
    expect(truncate("Alpenblick Treuhand AG", 11)).toBe("Alpenblick…")
    expect(truncate("Weber", 11)).toBe("Weber")
  })

  it("fits a label to a pixel width at the axis font", () => {
    expect(fitLabel("Überbauung Seeblick", 54)).toBe("Überbauun…") // 54px = 10 characters
  })
})

describe("demo clock", () => {
  it("moves authored dates by the distance between reference and today", () => {
    const today = new Date(REFERENCE_DATE)
    today.setDate(today.getDate() + 10)
    expect(shiftISO("2026-09-01", today)).toEqual(new Date(2026, 8, 11))
  })
})

describe("sum", () => {
  it("adds numbers and fields", () => {
    expect(sum([])).toBe(0)
    expect(sum([1, 2, 3.5])).toBe(6.5)
    expect(sumBy([{ v: 2 }, { v: 3 }], (x) => x.v)).toBe(5)
  })
})
