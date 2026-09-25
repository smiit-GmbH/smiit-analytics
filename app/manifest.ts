import type { MetadataRoute } from "next"
import { SITE } from "@/config/site"
import { getContent } from "@/content"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: getContent().meta.description,
    start_url: "/",
    display: "browser",
    background_color: "#f3f3ee",
    theme_color: SITE.themeColor,
    lang: SITE.locale,
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  }
}
