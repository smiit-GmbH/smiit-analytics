import { expect, test } from "./fixtures"

/* Behaviour of the shared UI: demo modal, navigation, language switcher, FAQ, chapter rail. */

test("demo video modal: opens, locks the page, closes on backdrop and Escape", async ({ page }) => {
  await page.goto("/de/")
  const trigger = page.locator('[aria-haspopup="dialog"]').first()
  const dialog = page.locator("dialog[open]")
  const overflow = () => page.evaluate(() => getComputedStyle(document.documentElement).overflow)

  await trigger.click()
  await expect(dialog).toBeVisible()
  expect(await overflow()).toBe("hidden")

  // A click inside the content keeps it open, a click on the backdrop closes it.
  const box = (await dialog.boundingBox())!
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
  await expect(dialog).toBeVisible()
  await page.mouse.click(5, page.viewportSize()!.height - 5)
  await expect(dialog).toHaveCount(0)
  expect(await overflow()).not.toBe("hidden")

  // Escape closes as well, and focus returns to the trigger.
  await trigger.click()
  await expect(dialog).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
})

test("language switcher keeps the page and the section", async ({ page, isMobile }) => {
  await page.goto("/de/privacy/#top")
  if (isMobile) await page.getByRole("button", { name: "Menü öffnen" }).click()
  else await page.getByRole("button", { name: /Sprache/ }).click()
  await page.locator('a[hreflang="fr"]:visible').click()
  await expect(page).toHaveURL(/\/fr\/privacy\/#top$/)
  await expect(page.locator("html")).toHaveAttribute("lang", "fr-CH")
})

test("a link to a FAQ question opens that answer", async ({ page }) => {
  await page.goto("/de/#faq-mcp")
  const item = page.locator("#faq-mcp")
  await expect(item.getByRole("button")).toHaveAttribute("aria-expanded", "true")
  await expect(item.getByRole("region")).toBeVisible()
})

test.describe("mobile menu", () => {
  test.skip(({ isMobile }) => !isMobile, "the menu button only exists below xl")

  test("opens, closes with Escape and returns focus", async ({ page }) => {
    await page.goto("/de/")
    const toggle = page.getByRole("button", { name: "Menü öffnen" })
    await toggle.click()
    await expect(page.locator("#mobile-menu")).toBeVisible()
    await page.keyboard.press("Escape")
    await expect(page.locator("#mobile-menu")).toBeHidden()
    await expect(toggle).toBeFocused()
  })
})

test.describe("chapter rail", () => {
  test.skip(({ isMobile }) => isMobile, "the rail is desktop-only")

  test("is inert while hidden and usable once the chapters begin", async ({ page }) => {
    await page.goto("/de/")
    const rail = page
      .locator("nav")
      .filter({ has: page.locator("ol") })
      .last()
    expect(await rail.evaluate((el) => (el as HTMLElement).inert)).toBe(true)

    await page.evaluate(() => document.getElementById("features")!.scrollIntoView({ behavior: "instant" }))
    await expect.poll(() => rail.evaluate((el) => (el as HTMLElement).inert)).toBe(false)
  })
})

test("switching report tabs does not move the page", async ({ page }) => {
  await page.goto("/de/")
  const tab = page.locator('#features [role="tab"]').nth(1)
  await tab.scrollIntoViewIfNeeded()
  const before = await page.evaluate(() => window.scrollY)
  await tab.click()
  await expect(tab).toHaveAttribute("data-state", "active")
  await page.waitForTimeout(500) // smooth scrolling would have moved by now
  expect(Math.abs((await page.evaluate(() => window.scrollY)) - before)).toBeLessThan(2)
})
