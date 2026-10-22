import { describe, expect, it } from "vitest"
import { fill } from "@/lib/text"

describe("fill", () => {
  it("replaces every occurrence of a placeholder", () => {
    expect(fill("{price} now, {price} later", { price: 49 })).toBe("49 now, 49 later")
  })

  it("fills several placeholders", () => {
    expect(fill("Top {n}: {share}", { n: 5, share: "62 %" })).toBe("Top 5: 62 %")
  })

  it("leaves placeholders without a value visible", () => {
    expect(fill("{known} and {unknown}", { known: "a" })).toBe("a and {unknown}")
  })
})
