import { describe, expect, it } from "vitest"
import { isLocale, localeFromPath } from "@/lib/i18n"
import { isExternal } from "@/lib/links"
import { mediaPath, mediaSrcSet, variantPath } from "@/lib/media"
import { routePath } from "@/lib/routes"

describe("routePath", () => {
  it("builds trailing-slash paths below the locale", () => {
    expect(routePath("de")).toBe("/de/")
    expect(routePath("fr", "privacy")).toBe("/fr/privacy/")
    expect(routePath("it", "legalNotice")).toBe("/it/legal-notice/")
  })

  it("appends a section anchor", () => {
    expect(routePath("en", "home", "pricing")).toBe("/en/#pricing")
  })
})

describe("locales", () => {
  it("recognises supported locales only", () => {
    expect(isLocale("de")).toBe(true)
    expect(isLocale("es")).toBe(false)
    expect(isLocale(undefined)).toBe(false)
  })

  it("reads the locale from a path, falling back to the default", () => {
    expect(localeFromPath("/fr/privacy/")).toBe("fr")
    expect(localeFromPath("/es/foo/")).toBe("de")
    expect(localeFromPath(null)).toBe("de")
  })
})

describe("isExternal", () => {
  it("treats our own product hosts and relative links as internal", () => {
    expect(isExternal("/de/privacy/")).toBe(false)
    expect(isExternal("mailto:kontakt@smiit.de")).toBe(false)
    expect(isExternal("https://app.smiit-analytics.com")).toBe(false)
    expect(isExternal("https://www.smiit-analytics.com/de/")).toBe(false)
  })

  it("treats other hosts as external, including look-alikes", () => {
    expect(isExternal("https://www.smiit.de")).toBe(true)
    expect(isExternal("https://smiit-analytics.com.evil.example")).toBe(true)
    expect(isExternal("https://notsmiit-analytics.com")).toBe(true)
  })
})

describe("media", () => {
  it("puts localized slots below the language folder", () => {
    expect(mediaPath("IMG_STEP_1", "fr")).toBe("/media/fr/img_step_1.webp")
    expect(mediaPath("LOGO_1", "fr")).toBe("/media/logo_1.webp")
  })

  it("derives the paths of the smaller copies", () => {
    expect(variantPath("/media/de/img_step_1.webp", 480)).toBe("/media/de/img_step_1-480w.webp")
  })

  it("lists every width in the srcset, the main file last", () => {
    expect(mediaSrcSet("IMG_STEP_1", "de")).toBe(
      "/media/de/img_step_1-480w.webp 480w, /media/de/img_step_1-800w.webp 800w, /media/de/img_step_1.webp 1200w",
    )
    expect(mediaSrcSet("VIDEO_HERO", "de")).toBeUndefined()
  })
})
