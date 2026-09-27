import type { MetadataRoute } from "next"
import { defaultLocale, locales } from "@/lib/i18n"
import { PUBLIC_ROUTES, routePath } from "@/lib/routes"
import { SITE_URL } from "@/lib/site"

export const dynamic = "force-static"

/** Every public route in every language, each with its hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return PUBLIC_ROUTES.flatMap(({ route, priority, changeFrequency }) => {
    const languages = {
      ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${routePath(l, route)}`])),
      "x-default": `${SITE_URL}${routePath(defaultLocale, route)}`,
    }
    return locales.map((lang) => ({
      url: `${SITE_URL}${routePath(lang, route)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }))
  })
}
