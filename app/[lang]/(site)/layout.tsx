import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Analytics } from "@/components/analytics"
import { ScrollToTop, SmoothScrollProvider } from "@/components/smooth-scroll"
import { getDictionary } from "@/lib/dictionary"
import { pickFooterDict, pickHeaderDict } from "@/lib/dictionary-slices"
import { resolveLocale, type LocaleParams } from "@/lib/locale-params"
import { routePath } from "@/lib/routes"

type LayoutProps = LocaleParams & { children: React.ReactNode }

/** The chrome of every regular page: skip link, header, footer and analytics. The demo video for iframes
 *  (/de/demo/, app/[lang]/(embed)) has none of it. */
export default async function SiteLayout({ children, params }: LayoutProps) {
  const lang = await resolveLocale(params)
  const dict = getDictionary(lang)

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-control focus:bg-navy focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
      >
        {dict.common.skipLink}
      </a>
      <SmoothScrollProvider>
        <ScrollToTop />
        <Header lang={lang} dict={pickHeaderDict(dict)} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer lang={lang} dict={pickFooterDict(dict)} />
      </SmoothScrollProvider>
      <Analytics t={dict.consent} privacyHref={routePath(lang, "privacy")} />
    </>
  )
}
