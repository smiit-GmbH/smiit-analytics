"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { House } from "lucide-react"
import { CtaLink } from "@/components/cta-link"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import type { Dictionary } from "@/lib/dictionary"
import type { FooterDict, HeaderDict } from "@/lib/dictionary-slices"
import { HTML_LANG, defaultLocale, localeFromPath, type Locale } from "@/lib/i18n"
import { routePath } from "@/lib/routes"
import { useClientValue } from "@/lib/use-client-value"

export type NotFoundTexts = Record<Locale, { header: HeaderDict; footer: FooterDict; notFound: Dictionary["notFound"] }>

/**
 * 404 page in the style of www.smiit.de/notfound: full-bleed illustration
 * (desktop + portrait variant) with rounded bottom, soft light-to-dark wash,
 * large faint "404", short message and one way back.
 *
 * The static export writes a single 404.html for every unknown URL, so the
 * language is read from the path in the browser (/fr/… → French). The first
 * render uses the default language, which keeps hydration consistent.
 */
export function NotFoundView({ texts }: { texts: NotFoundTexts }) {
  const pathname = usePathname()
  const lang = useClientValue<Locale>(() => localeFromPath(pathname), defaultLocale)

  React.useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang]
  }, [lang])

  const { header, footer, notFound: t } = texts[lang]

  return (
    <>
      <title>{t.title}</title>
      <Header lang={lang} dict={header} languageHomeOnly />
      <main id="main" tabIndex={-1} className="outline-none">
        <section
          aria-labelledby="nf-title"
          // Fills the screen below the header; anchored at the bottom so the figures stay below the text.
          className="relative flex h-[calc(100svh-4.5rem)] max-h-[980px] min-h-[620px] flex-col overflow-hidden rounded-b-card bg-[url('/brand/not_found_mobile.webp')] bg-cover bg-bottom bg-no-repeat md:bg-[url('/brand/not_found.webp')]"
        >
          <span role="img" aria-label={t.imageAlt} />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/45 via-white/25 to-black/35"
          />
          <div className="relative z-10 flex flex-1 items-start justify-center px-4 pt-10 md:pt-14">
            <div className="mx-auto max-w-md text-center font-serif">
              <p aria-hidden="true" className="text-[100px] leading-none font-bold text-brand/20 md:text-[150px]">
                404
              </p>
              <h1 id="nf-title" className="mt-6 text-3xl text-ink drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)] md:mt-8 md:text-4xl">
                {t.title}
              </h1>
              <p className="mt-4 text-lg text-ink/85 drop-shadow-[0_1px_2px_rgba(255,255,255,0.45)] md:mx-auto md:max-w-[30ch] md:text-xl">
                {t.text}
              </p>
              <div className="mt-8 flex justify-center font-sans">
                <CtaLink
                  href={routePath(lang)}
                  track="404_home"
                  size="lg"
                  externalHint={header.common.externalHint}
                  className="w-full sm:w-auto"
                >
                  <House aria-hidden="true" />
                  {t.cta}
                </CtaLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} dict={footer} />
    </>
  )
}
