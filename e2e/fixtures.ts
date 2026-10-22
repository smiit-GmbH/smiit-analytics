import { test as base, expect, type Page } from "@playwright/test"

/*
 * Shared test setup: every test fails on JavaScript errors and console errors
 * (e.g. hydration mismatches). Missing media files are expected until the real
 * videos and logos are delivered (see MEDIA.md), so 404s below /media/ are ignored.
 */

const IGNORED = [/^Failed to load resource: the server responded with a status of 404/]

export const test = base.extend<{ errors: string[] }>({
  errors: [
    async ({ page }, use) => {
      const errors: string[] = []
      page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`))
      page.on("console", (m) => {
        if (m.type() === "error" && !IGNORED.some((re) => re.test(m.text()))) errors.push(`console: ${m.text()}`)
      })
      page.on("response", (r) => {
        const path = new URL(r.url()).pathname
        if (r.status() >= 400 && !path.startsWith("/media/") && r.request().resourceType() !== "document") {
          errors.push(`${r.status()}: ${path}`)
        }
      })
      await use(errors)
      expect(errors, "no JavaScript errors, console errors or broken requests").toEqual([])
    },
    { auto: true },
  ],
})

export { expect }

export const LOCALES = ["de", "en", "fr", "it"] as const
export const HTML_LANG = { de: "de-CH", en: "en", fr: "fr-CH", it: "it-CH" } as const
export const ROUTES = ["", "legal-notice/", "privacy/", "terms/", "dpa/"] as const

/** The demo dashboards' reference date (lib/demo/clock.ts): screenshots show the same months every day. */
export async function freezeDemoClock(page: Page) {
  await page.clock.setFixedTime(new Date("2026-09-25T10:00:00"))
}
