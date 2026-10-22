import { defineConfig, devices } from "@playwright/test"

/*
 * End-to-end tests against the static export: run `npm run build` first.
 * Screenshot baselines are rendered on Linux (CI, or locally via
 * `npm run test:e2e:docker`), so font rendering always matches.
 */
const PORT = 4173

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  // More parallel browsers overload typical machines and make timing-sensitive tests flaky.
  workers: process.env.CI ? 2 : 3,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"], ["html", { open: "never" }]],
  snapshotPathTemplate: "e2e/__screenshots__/{testFilePath}/{arg}-{projectName}{ext}",
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.002, animations: "disabled" },
  },
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `node e2e/serve.mjs ${PORT}`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
})
