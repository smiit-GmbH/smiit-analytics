import type React from "react"
import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import "../globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Analytics } from "@/components/analytics"
import { JsonLd } from "@/components/seo/json-ld"
import { fontVariables } from "@/lib/fonts"
import { getDictionary } from "@/lib/dictionary"
import { pickFooterDict, pickHeaderDict } from "@/lib/dictionary-slices"
import { HTML_LANG, isLocale, locales } from "@/lib/i18n"
import { routePath } from "@/lib/routes"
import { buildOrganizationJsonLd, buildPageMetadata } from "@/lib/seo"
import { SITE, SITE_URL } from "@/lib/site"

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
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
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <html lang={HTML_LANG[lang]} className={fontVariables}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-navy focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          {dict.common.skipLink}
        </a>
        <Header lang={lang} dict={pickHeaderDict(dict)} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer lang={lang} dict={pickFooterDict(dict)} />
        <Analytics t={dict.consent} privacyHref={routePath(lang, "privacy")} />
        <JsonLd data={buildOrganizationJsonLd()} />
      </body>
    </html>
  )
}
