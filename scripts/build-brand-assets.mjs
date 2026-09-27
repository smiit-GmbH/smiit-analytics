// Derives the trimmed smiit logos (and a placeholder OG image) from the originals in /public/brand.
// Run once after replacing a brand file: `node scripts/build-brand-assets.mjs`
import sharp from "sharp"
import { existsSync, mkdirSync } from "node:fs"

const NAVY = "#0b162d"

for (const tone of ["black", "white"]) {
  await sharp(`public/brand/logo_${tone}.webp`).trim().webp({ quality: 95 }).toFile(`public/brand/logo_${tone}_trim.webp`)
}

// App icon and favicons are the original smiit Analytics files (not generated):
//   public/brand/app-icon.webp, public/icon-192.png, app/icon.png, app/apple-icon.png, app/favicon.ico

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
