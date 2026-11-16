import type { MetadataRoute } from "next"
import { PUBLIC_ROUTES, routeLocales, routePath } from "@/lib/routes"
import { alternates } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

export const dynamic = "force-static"

/**
 * Every public route in every language it exists in, each with its hreflang
 * alternates (the same ones the page's metadata names).
 * No `lastModified`: the build date would change on every deploy without the
 * content changing, and search engines learn to ignore an unreliable lastmod.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.flatMap(({ route, priority, changeFrequency }) => {
    const langs = routeLocales(route)
    const relative = alternates(langs[0], route)?.languages ?? {}
    const languages = Object.fromEntries(Object.entries(relative).map(([l, path]) => [l, `${SITE_URL}${path}`]))
    return langs.map((lang) => ({
      url: `${SITE_URL}${routePath(lang, route)}`,
      changeFrequency,
      priority,
      alternates: { languages },
    }))
  })
}
