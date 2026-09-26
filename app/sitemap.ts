import type { MetadataRoute } from "next"
import { SITE_URL } from "@/config/site"

export const dynamic = "force-static"

/** Add new public pages here. The internal /styleguide is deliberately left out. */
const routes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/impressum/", priority: 0.2, changeFrequency: "yearly" },
  { path: "/datenschutz/", priority: 0.2, changeFrequency: "yearly" },
  { path: "/nutzungsbedingungen/", priority: 0.2, changeFrequency: "yearly" },
  { path: "/avv/", priority: 0.2, changeFrequency: "yearly" },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
