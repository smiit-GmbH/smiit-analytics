import type { MetadataRoute } from "next"
import { locales } from "@/lib/i18n"
import { routePath } from "@/lib/routes"
import { SITE_URL } from "@/lib/site"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: locales.map((l) => routePath(l, "styleguide")) }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
