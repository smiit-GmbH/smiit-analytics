// Derives trimmed logos and favicons from the originals in /public/brand.
// Run once after replacing a brand file: `node scripts/build-brand-assets.mjs`
import sharp from "sharp"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"

const NAVY = "#0b162d"

for (const tone of ["black", "white"]) {
  await sharp(`public/brand/logo_${tone}.webp`).trim().webp({ quality: 95 }).toFile(`public/brand/logo_${tone}_trim.webp`)
}

// Icon on a navy rounded tile — the transparent icon has a white bar that vanishes on light tabs.
async function tile(size) {
  const r = Math.round(size * 0.22)
  const pad = Math.round(size * 0.2)
  const mask = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="${NAVY}"/></svg>`)
  const icon = await sharp("public/brand/icon_transparent.png")
    .resize(size - pad * 2, size - pad * 2, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()
  return sharp(mask).composite([{ input: icon, gravity: "center" }]).png().toBuffer()
}

writeFileSync("app/icon.png", await tile(512))
writeFileSync("app/apple-icon.png", await tile(180))
// App icon for the site logo (rendered at 32px, 3× for sharp retina display).
await sharp(await tile(96)).webp({ quality: 95 }).toFile("public/brand/app-icon.webp")

// favicon.ico with embedded PNGs (16, 32, 48)
const sizes = [16, 32, 48]
const pngs = await Promise.all(sizes.map(tile))
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4)
let offset = 6 + 16 * sizes.length
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16)
  e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6)
  e.writeUInt32LE(pngs[i].length, 8); e.writeUInt32LE(offset, 12)
  offset += pngs[i].length
  return e
})
writeFileSync("app/favicon.ico", Buffer.concat([header, ...entries, ...pngs]))
console.log("brand assets written")

// Placeholder Open Graph image (1200×630). Replace public/og/og-image.png with the final design;
// it is only generated when the file does not exist yet.
if (!existsSync("public/og/og-image.png")) {
  const W = 1200, H = 630
  const bg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="${NAVY}"/>
    <text x="80" y="330" font-family="Georgia, serif" font-size="68" fill="#ffffff">Ihre bexio-Daten.</text>
    <text x="80" y="415" font-family="Georgia, serif" font-size="68" fill="#8fb4e6">In 5 Minuten verständlich.</text>
    <text x="80" y="560" font-family="Consolas, monospace" font-size="22" fill="#ffffff" fill-opacity="0.45">OG_IMAGE – Platzhalter 1200×630</text>
  </svg>`)
  const logo = await sharp("public/brand/logo_white_trim.webp").resize({ height: 72 }).toBuffer()
  mkdirSync("public/og", { recursive: true })
  await sharp(bg).composite([{ input: logo, left: 80, top: 110 }]).png().toFile("public/og/og-image.png")
}
