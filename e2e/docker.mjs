// Runs the e2e tests in the official Playwright Linux image – the same
// rendering as CI – and updates the screenshot baselines.
// Usage: npm run test:e2e:docker [-- extra playwright args]   (needs `npm run build` first)
import { spawnSync } from "node:child_process"
import { readFileSync } from "node:fs"

const { version } = JSON.parse(readFileSync(new URL("../node_modules/@playwright/test/package.json", import.meta.url), "utf8"))
const image = `mcr.microsoft.com/playwright:v${version}-noble`

const args = [
  "run",
  "--rm",
  "--ipc=host",
  "-e",
  "CI=1",
  "-v",
  `${process.cwd()}:/work`,
  "-w",
  "/work",
  image,
  "node",
  "node_modules/@playwright/test/cli.js",
  "test",
  "--update-snapshots=changed",
  ...process.argv.slice(2),
]

const { status } = spawnSync("docker", args, { stdio: "inherit" })
process.exit(status ?? 1)
