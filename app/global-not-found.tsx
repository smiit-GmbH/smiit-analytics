import type { Metadata, Viewport } from "next"
import "./globals.css"
import { NotFoundView, type NotFoundTexts } from "@/components/pages/not-found/not-found-view"
import { getDictionary } from "@/lib/dictionary"
import { pickFooterDict, pickHeaderDict } from "@/lib/dictionary-slices"
import { fontVariables } from "@/lib/fonts"
import { HTML_LANG, defaultLocale, locales } from "@/lib/i18n"
import { SITE } from "@/lib/site"

// The <title> comes from NotFoundView, in the visitor's language.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

export const viewport: Viewport = { themeColor: SITE.themeColor }

/** Only the texts the 404 page needs, for every language (picked in the browser). */
const texts = Object.fromEntries(
  locales.map((l) => {
    const dict = getDictionary(l)
    return [l, { header: pickHeaderDict(dict), footer: pickFooterDict(dict), notFound: dict.notFound }]
  }),
) as NotFoundTexts

/**
 * Global 404 (Next `global-not-found`). There is no shared root layout ([lang]
 * and "/" each have their own), so this page renders the whole document. The
 * static export serves it as 404.html for every unknown URL.
 */
export default function NotFound() {
  return (
    <html lang={HTML_LANG[defaultLocale]} className={fontVariables}>
      <body>
        <NotFoundView texts={texts} />
      </body>
    </html>
  )
}
