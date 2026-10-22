import { describe, expect, it } from "vitest"
import { cn } from "@/lib/utils"

describe("cn", () => {
  it("keeps a custom font size next to a text colour", () => {
    expect(cn("text-title text-white")).toBe("text-title text-white")
  })

  it("lets the later class win for custom tokens", () => {
    expect(cn("text-title", "text-lead")).toBe("text-lead")
    expect(cn("rounded-card", "rounded-xl")).toBe("rounded-xl")
    expect(cn("shadow-card", "shadow-cta")).toBe("shadow-cta")
    expect(cn("py-section-sm", "py-4")).toBe("py-4")
    expect(cn("max-w-page", "max-w-xl")).toBe("max-w-xl")
  })
})
