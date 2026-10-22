import { describe, expect, it } from "vitest"
import { locales } from "@/lib/i18n"
import { PRICING } from "@/lib/pricing"
import { alternates, buildBreadcrumbJsonLd, buildFaqJsonLd, buildPageMetadata, faqItems } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

describe("alternates", () => {
  it("links every language plus x-default (German)", () => {
    const a = alternates("fr", "privacy")
    expect(a?.canonical).toBe("/fr/privacy/")
    expect(a?.languages).toEqual({
      de: "/de/privacy/",
      en: "/en/privacy/",
      fr: "/fr/privacy/",
      it: "/it/privacy/",
      "x-default": "/de/privacy/",
    })
  })
})

describe("buildPageMetadata", () => {
  it("only sets robots when the page is noindex", () => {
    expect(buildPageMetadata({ lang: "de", route: "home", title: "T", description: "D" }).robots).toBeUndefined()
    expect(buildPageMetadata({ lang: "de", route: "dpa", title: "T", description: "D", noindex: true }).robots).toEqual({
      index: false,
      follow: true,
    })
  })
})

describe.each(locales)("FAQ (%s)", (lang) => {
  it("fills in every price placeholder", () => {
    for (const item of faqItems(lang)) expect(item.answer).not.toMatch(/\{\w+\}/)
  })

  it("mentions the current prices where the text refers to them", () => {
    const answers = faqItems(lang)
      .map((i) => i.answer)
      .join(" ")
    expect(answers).toContain(String(PRICING.company.yearly))
  })

  it("emits JSON-LD without markup", () => {
    const json = JSON.stringify(buildFaqJsonLd(lang))
    expect(json).not.toMatch(/\[\[|\]\]|\*\w/)
  })
})

describe("buildBreadcrumbJsonLd", () => {
  it("starts at the home page and uses absolute URLs", () => {
    const ld = buildBreadcrumbJsonLd("de", [{ name: "Daten­schutz", route: "privacy" }])
    expect(ld.itemListElement.map((i) => i.position)).toEqual([1, 2])
    expect(ld.itemListElement[1]).toMatchObject({ name: "Datenschutz", item: `${SITE_URL}/de/privacy/` })
  })
})
