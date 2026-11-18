import type React from "react"
import type { Metadata, Viewport } from "next"
import "../globals.css"
import { LocaleProvider } from "@/components/locale-provider"
import { JsonLd } from "@/components/seo/json-ld"
import { fontVariables } from "@/lib/fonts"
import { getDictionary } from "@/lib/dictionary"
import { HTML_LANG, locales } from "@/lib/i18n"
import { resolveLocale, type LocaleParams } from "@/lib/locale-params"
import { buildOrganizationJsonLd, buildPageMetadata, buildWebSiteJsonLd } from "@/lib/seo"
import { SITE, SITE_URL } from "@/lib/site"

type LayoutProps = LocaleParams & { children: React.ReactNode }

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const lang = await resolveLocale(params)
  const { meta } = getDictionary(lang)
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE.name,
    ...buildPageMetadata({ lang, route: "home", title: meta.title, description: meta.description }),
    title: { default: meta.title, template: `%s – ${SITE.name}` },
  }
}

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  width: "device-width",
  initialScale: 1,
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const lang = await resolveLocale(params)
  const dict = getDictionary(lang)

  return (
    <html lang={HTML_LANG[lang]} className={fontVariables}>
      <body>
        {/* The page chrome (header, footer, analytics) is the (site) group's layout; the (embed) group —
            the demo video for iframes — renders without it. */}
        <LocaleProvider value={{ lang, error: dict.error }}>{children}</LocaleProvider>
        <JsonLd data={buildOrganizationJsonLd()} />
        <JsonLd data={buildWebSiteJsonLd(lang)} />
      </body>
    </html>
  )
}
