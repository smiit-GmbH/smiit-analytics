import AxeBuilder from "@axe-core/playwright"
import { HTML_LANG, LOCALES, ROUTES, expect, test } from "./fixtures"

/* Every page in every language: renders without errors, is labelled for its language and passes axe. */

for (const lang of LOCALES) {
  for (const route of ROUTES) {
    const path = `/${lang}/${route}`

    test(`${path} renders and passes axe`, async ({ page }) => {
      test.slow() // axe on the long home page takes a while, especially on the phone profile
      // No transitions: axe must see the final state, not an element halfway through a fade-in.
      await page.emulateMedia({ reducedMotion: "reduce" })
      await page.goto(path)
      await expect(page.locator("html")).toHaveAttribute("lang", HTML_LANG[lang])
      await expect(page.locator("h1")).toHaveCount(1)
      await expect(page).toHaveTitle(/smiit Analytics/)
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${path}$`))

      const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze()
      expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([])
    })
  }
}

test("/de/demo/ is the bare video for embedding and passes axe; other languages have no demo page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/de/demo/")
  await expect(page.locator("h1")).toHaveText("smiit Analytics in 2 Minuten")
  await expect(page.locator("video source").first()).toHaveAttribute("src", "/media/video_demo_full.webm")
  // Nothing above the video in an iframe: no site header, the video starts at the top and nothing scrolls.
  await expect(page.locator("header")).toHaveCount(0)
  expect((await page.locator("video").boundingBox())?.y).toBe(0)
  expect(await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight)).toBeLessThanOrEqual(0)
  // The legal notice and privacy policy stay one click away, in a new tab (out of the iframe).
  await expect(page.getByRole("link", { name: "Impressum" })).toHaveAttribute("href", "/de/legal-notice/")
  await expect(page.getByRole("link", { name: "Datenschutz" })).toHaveAttribute("target", "_blank")
  const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze()
  expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([])

  const response = await page.goto("/en/demo/")
  expect(response?.status()).toBe(404)
})

test("/ forwards to the visitor's language", async ({ browser }) => {
  const context = await browser.newContext({ locale: "fr-CH" })
  const page = await context.newPage()
  await page.goto("/")
  await expect(page).toHaveURL(/\/fr\/$/)
  await context.close()
})

test("/ forwards to German for unsupported languages", async ({ browser }) => {
  const context = await browser.newContext({ locale: "es-ES" })
  const page = await context.newPage()
  await page.goto("/")
  await expect(page).toHaveURL(/\/de\/$/)
  await context.close()
})

test("unknown URLs get the 404 page in the language of the path", async ({ page }) => {
  const response = await page.goto("/fr/does-not-exist/")
  expect(response?.status()).toBe(404)
  await expect(page.locator("html")).toHaveAttribute("lang", "fr-CH")
  await expect(page.locator("h1")).toHaveText("Page introuvable")
  await expect(page.getByRole("link", { name: /accueil/i }).last()).toHaveAttribute("href", "/fr/")
})

test("no horizontal scrolling", async ({ page }) => {
  await page.goto("/de/")
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow).toBeLessThanOrEqual(0)
})
