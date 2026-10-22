import { describe, expect, it } from "vitest"
import { getDictionary } from "@/lib/dictionary"
import { locales } from "@/lib/i18n"
import { PRICING } from "@/lib/pricing"
import { alternates, buildBreadcrumbJsonLd, buildFaqJsonLd, buildPageMetadata, buildSoftwareApplicationJsonLd, faqItems } from "@/lib/seo"
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

describe("buildSoftwareApplicationJsonLd", () => {
  it("prices both plans per month and bills them monthly or yearly", () => {
    const offers = buildSoftwareApplicationJsonLd("de").offers
    expect(offers.map((o) => [o.price, o.priceSpecification.billingDuration])).toEqual([
      [PRICING.company.monthly, "P1M"],
      [PRICING.company.yearly, "P1Y"],
    ])
    for (const o of offers) {
      expect(o.priceSpecification.referenceQuantity).toEqual({ "@type": "QuantitativeValue", value: 1, unitCode: "MON" })
      expect(o.url).toBe(`${SITE_URL}/de/#pricing`)
    }
  })
})

describe.each(locales)("search snippet (%s)", (lang) => {
  const { meta } = getDictionary(lang)

  it("keeps the title within what Google shows (≤ 60 characters)", () => {
    expect(meta.title.length).toBeLessThanOrEqual(60)
  })

  it("keeps the description within what Google shows (≤ 160 characters)", () => {
    expect(meta.description.length).toBeLessThanOrEqual(160)
  })

  it("names bexio in title and description – the term people search for", () => {
    expect(meta.title).toMatch(/bexio/)
    expect(meta.description).toMatch(/bexio/)
  })
})
