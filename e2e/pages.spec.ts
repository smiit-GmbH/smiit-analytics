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
