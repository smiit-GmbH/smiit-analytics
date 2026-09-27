import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import { LANGUAGE_STORAGE_KEY, defaultLocale, locales } from "@/lib/i18n"
import { routePath } from "@/lib/routes"
import { alternates } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

const { meta } = getDictionary(defaultLocale)

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: meta.title,
  description: meta.description,
  alternates: { languages: alternates(defaultLocale, "home")?.languages },
  robots: { index: false, follow: true },
}

/*
 * "/" has no content of its own (static export, no server-side redirect).
 * The script uses the language the visitor last picked in the language
 * switcher, else the first supported browser language, else the default (de).
 * Without JavaScript the meta refresh goes to the default.
 */
const redirect = `(function(){var s=${JSON.stringify(locales)};var p;try{p=localStorage.getItem(${JSON.stringify(LANGUAGE_STORAGE_KEY)})}catch(e){}var c=[p].concat(navigator.languages||[navigator.language||""]).map(function(x){return String(x||"").slice(0,2).toLowerCase()});var l=c.filter(function(x){return s.indexOf(x)>-1})[0]||${JSON.stringify(defaultLocale)};location.replace("/"+l+"/"+location.search+location.hash)})()`

export default function RootRedirect() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirect }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0;url=${routePath(defaultLocale)}`} />
      </noscript>
      <p style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
        <a href={routePath(defaultLocale)}>{meta.title}</a>
      </p>
    </>
  )
}
