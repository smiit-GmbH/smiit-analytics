import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import { Container } from "@/components/ui"
import { JsonLd } from "@/components/seo/json-ld"
import type { Dictionary } from "@/lib/dictionary"
import { getDictionary } from "@/lib/dictionary"
import { HTML_LANG, type Locale } from "@/lib/i18n"
import { routePath, type LEGAL_ROUTES } from "@/lib/routes"
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo"

type LegalRoute = (typeof LEGAL_ROUTES)[number]

/** `<title>` without soft hyphens (they only help line breaks in the h1). */
const stripShy = (s: string) => s.replace(/­/g, "")

export function legalPageMetadata(lang: Locale, route: LegalRoute): Metadata {
  const t = getDictionary(lang).legal[route]
  return buildPageMetadata({ lang, route, title: stripShy(t.title), description: t.description })
}

/** Shared shell of the legal pages. `body` is plain text; paragraphs split on blank lines. */
export function LegalPage({ lang, dict, route }: { lang: Locale; dict: Dictionary; route: LegalRoute }) {
  const t = dict.legal[route]
  return (
    <article className="py-section-sm md:py-section">
      <Container className="max-w-3xl">
        <a href={routePath(lang)} className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-brand hover:underline">
          <ArrowLeft className="size-4" aria-hidden="true" />
          {dict.legal.back}
        </a>
        {/* Long compounds (e.g. Auftragsverarbeitungsvertrag) must break on phones. */}
        <h1
          lang={HTML_LANG[lang]}
          className="mt-6 hyphens-auto font-serif text-[2rem] leading-tight tracking-tight [overflow-wrap:anywhere] sm:text-[2.4rem] md:text-[3rem]"
        >
          {t.title}
        </h1>
        <div className="mt-10 space-y-5 rounded-card bg-white p-7 leading-relaxed shadow-card sm:p-10">
          {t.body.split(/\n{2,}/).map((para, i) => (
            <p key={i} className="whitespace-pre-line">
              {para}
            </p>
          ))}
        </div>
      </Container>
      <JsonLd data={buildBreadcrumbJsonLd(lang, [{ name: t.title, route }])} />
    </article>
  )
}
