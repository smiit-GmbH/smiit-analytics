import type { MetadataRoute } from "next"
import { getDictionary } from "@/lib/dictionary"
import { HTML_LANG, defaultLocale } from "@/lib/i18n"
import { SITE } from "@/lib/site"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: getDictionary(defaultLocale).meta.description,
    start_url: "/",
    display: "browser",
    background_color: "#f3f3ee",
    theme_color: SITE.themeColor,
    lang: HTML_LANG[defaultLocale],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  }
}
