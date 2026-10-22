// Serves the static export (out/) like GitHub Pages: directories answer with
// their index.html, unknown paths with 404.html and status 404.
// Usage: node e2e/serve.mjs [port]   (default 4173)
import { createReadStream } from "node:fs"
import { stat } from "node:fs/promises"
import { createServer } from "node:http"
import { extname, join, normalize } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("../out/", import.meta.url))
const port = Number(process.argv[2] ?? 4173)

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
}

async function resolve(pathname) {
  // normalize() + the prefix check keep requests inside out/.
  const path = normalize(join(root, decodeURIComponent(pathname)))
  if (!path.startsWith(root)) return null
  try {
    const info = await stat(path)
    if (info.isFile()) return path
    if (info.isDirectory()) {
      const index = join(path, "index.html")
      if ((await stat(index)).isFile()) return index
    }
  } catch {
    /* not found */
  }
  return null
}

createServer(async (req, res) => {
  const file = await resolve(new URL(req.url ?? "/", "http://localhost").pathname)
  const status = file ? 200 : 404
  const body = file ?? join(root, "404.html")
  res.writeHead(status, { "content-type": TYPES[extname(body)] ?? "application/octet-stream" })
  createReadStream(body).pipe(res)
}).listen(port, () => console.log(`Serving out/ on http://localhost:${port}`))
