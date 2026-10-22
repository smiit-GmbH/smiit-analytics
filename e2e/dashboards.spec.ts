import type { Page } from "@playwright/test"
import { expect, freezeDemoClock, test } from "./fixtures"

/* The interactive demo dashboards in the "reports" section of the home page. */

test.beforeEach(async ({ page }) => {
  await freezeDemoClock(page)
  await page.goto("/de/")
})

const tabs = (page: Page) => page.locator('#features [role="tab"]')
const panel = (page: Page) => page.locator('#features [role="tabpanel"][data-state="active"]')

const placeholder = (page: Page) => panel(page).locator("[data-dashboard-placeholder]")

/** Opens tab `i` and waits until its dashboard is rendered – it is loaded lazily (lazy-dashboard.tsx). */
async function openTab(page: Page, i: number) {
  await tabs(page).nth(i).click()
  await expect(placeholder(page)).toHaveCount(0, { timeout: 15_000 })
  await expect(panel(page).locator("h3")).toBeVisible()
}

test("dashboards load only near the viewport, without moving the page", async ({ page }) => {
  // Initially only the placeholder: no chart code has run.
  await expect(placeholder(page)).toHaveCount(1)
  await expect(panel(page).locator("h3")).toHaveCount(0)
  const placeholderHeight = (await panel(page).boundingBox())!.height

  await page.evaluate(() => document.getElementById("features")!.scrollIntoView({ behavior: "instant" }))
  await expect(placeholder(page)).toHaveCount(0, { timeout: 15_000 })
  await expect(panel(page).locator("h3")).toBeVisible()
  // The placeholder reserves the dashboard's exact height (lazy-dashboard.tsx), so nothing below jumps.
  expect(Math.abs((await panel(page).boundingBox())!.height - placeholderHeight)).toBeLessThanOrEqual(2)
})

test("charts are keyboard-explorable and read out to screen readers", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard use is a desktop concern; phones hide some charts")
  for (let i = 0; i < (await tabs(page).count()); i++) {
    await openTab(page, i)
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
  // One device pixel per CSS pixel: at the phone profile's 2.625, element bounds land on
  // sub-pixels and the cropped height flips between two values from shot to shot.
  test.use({ deviceScaleFactor: 1 })

  test("every dashboard looks as before", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.reload()
    for (let i = 0; i < (await tabs(page).count()); i++) {
      await openTab(page, i)
      await page.mouse.move(0, 0)
      await expect(panel(page)).toHaveScreenshot(`dashboard-${i}.png`)
    }
  })
})
