import type { Page } from "@playwright/test"
import { expect, freezeDemoClock, test } from "./fixtures"

/* The interactive demo dashboards in the "reports" section of the home page. */

test.beforeEach(async ({ page }) => {
  await freezeDemoClock(page)
  await page.goto("/de/")
})

const tabs = (page: Page) => page.locator('#features [role="tab"]')
const panel = (page: Page) => page.locator('#features [role="tabpanel"][data-state="active"]')

test("charts are keyboard-explorable and read out to screen readers", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard use is a desktop concern; phones hide some charts")
  for (let i = 0; i < (await tabs(page).count()); i++) {
    await tabs(page).nth(i).click()
    const chart = panel(page).locator('svg[role="img"][tabindex="0"]:visible').first()
    await expect(chart).toHaveAttribute("aria-label", /Pfeiltasten/)

    await chart.focus()
    await page.keyboard.press("ArrowRight")
    const live = panel(page).locator('[aria-live="polite"]')
    await expect(live).not.toBeEmpty()
    const first = await live.textContent()
    await page.keyboard.press("ArrowRight")
    await expect(live).not.toHaveText(first ?? "")

    // Escape closes the tooltip.
    const tooltip = panel(page).locator("div.pointer-events-none.absolute[aria-hidden='true']")
    await expect(tooltip).toHaveCount(1)
    await page.keyboard.press("Escape")
    await expect(tooltip).toHaveCount(0)
  }
})

test.describe("screenshots", () => {
  test.skip(process.platform !== "linux", "baselines are rendered on Linux – run `npm run test:e2e:docker`")

  test("every dashboard looks as before", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.reload()
    for (let i = 0; i < (await tabs(page).count()); i++) {
      const tab = tabs(page).nth(i)
      await tab.click()
      await page.mouse.move(0, 0)
      await expect(panel(page)).toHaveScreenshot(`dashboard-${i}.png`)
    }
  })
})
