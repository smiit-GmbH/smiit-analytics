import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

export const dynamic = "force-static"

type ChangeFrequency = "monthly" | "yearly"

type Route = {
  /** Path segments after the lang segment, no leading/trailing slash. Empty for the landing page. */
  path: string
  priority: number
  changeFrequency: ChangeFrequency
}

const routes: Route[] = [
  { path: "", priority: 1.0, changeFrequency: "monthly" },
  { path: "contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "legal-notice", priority: 0.2, changeFrequency: "yearly" },
  { path: "privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "dpa", priority: 0.2, changeFrequency: "yearly" },
  { path: "terms", priority: 0.2, changeFrequency: "yearly" },
]

const languages = ["de", "en"] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routes.flatMap((route) => {
    const suffix = route.path ? `/${route.path}` : ""

    return languages.map((lang) => ({
      url: `${SITE_URL}/${lang}${suffix}/`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          de: `${SITE_URL}/de${suffix}/`,
          en: `${SITE_URL}/en${suffix}/`,
          "x-default": `${SITE_URL}/de${suffix}/`,
        },
      },
    }))
  })
}
