import type { Metadata } from "next"
import type React from "react"
import { ArrowLeft } from "lucide-react"
import { Container } from "@/components/ui"
import { JsonLd } from "@/components/seo/json-ld"
import type { Dictionary } from "@/lib/dictionary"
import { getDictionary } from "@/lib/dictionary"
import { HTML_LANG, type Locale } from "@/lib/i18n"
import { routePath, type LEGAL_ROUTES } from "@/lib/routes"
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo"
import { COMPANY } from "@/lib/site"

type LegalRoute = (typeof LEGAL_ROUTES)[number]
/** Legal pages whose content is one text block (`body`). */
type TextRoute = Exclude<LegalRoute, "legalNotice">

/** `<title>` without soft hyphens (they only help line breaks in the h1). */
const stripShy = (s: string) => s.replace(/­/g, "")

export function legalPageMetadata(lang: Locale, route: LegalRoute): Metadata {
  const t = getDictionary(lang).legal[route]
  return buildPageMetadata({ lang, route, title: stripShy(t.title), description: t.description })
}

/** Shared frame of the legal pages: back link, title, white card, breadcrumb JSON-LD. */
function LegalShell({
  lang,
  dict,
  route,
  subtitle,
  children,
}: {
  lang: Locale
  dict: Dictionary
  route: LegalRoute
  subtitle?: string
  children: React.ReactNode
}) {
  const title = dict.legal[route].title
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
          {title}
        </h1>
        {subtitle && <p className="mt-3 text-ink-muted md:text-lg">{subtitle}</p>}
        <div className="mt-10 rounded-card bg-white p-7 leading-relaxed shadow-card sm:p-10">{children}</div>
      </Container>
      <JsonLd data={buildBreadcrumbJsonLd(lang, [{ name: title, route }])} />
    </article>
  )
}

/** Privacy policy, terms, DPA: plain text, paragraphs split on blank lines. */
export function LegalPage({ lang, dict, route }: { lang: Locale; dict: Dictionary; route: TextRoute }) {
  return (
    <LegalShell lang={lang} dict={dict} route={route}>
      <div className="space-y-5">
        {dict.legal[route].body.split(/\n{2,}/).map((para, i) => (
          <p key={i} className="whitespace-pre-line">
            {para}
          </p>
        ))}
      </div>
    </LegalShell>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">{title}</h2>
      <div className="mt-3 text-[0.95rem] leading-relaxed text-ink">{children}</div>
    </div>
  )
}

/** Legal notice (Impressum), same content as on www.smiit.de. Company facts: lib/site.ts. */
export function LegalNotice({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.legal.legalNotice
  const { address } = COMPANY
  const postal = (
    <>
      {address.street}
      <br />
      {address.postalCode} {address.city}
      <br />
      {t.country}
    </>
  )
  const link = "text-brand underline-offset-4 hover:underline"

  return (
    <LegalShell lang={lang} dict={dict} route="legalNotice" subtitle={t.subtitle}>
      <div className="grid gap-x-10 gap-y-9 md:grid-cols-2">
        <div>
          <p className="font-serif text-2xl tracking-tight">{COMPANY.name}</p>
          <address className="mt-3 text-[0.95rem] not-italic leading-relaxed text-ink">{postal}</address>
        </div>
        <Block title={t.contact}>
          <address className="space-y-1 not-italic">
            <p>
              {t.phone}:{" "}
              <a className={link} href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>
                {COMPANY.phone}
              </a>
            </p>
            <p>
              {t.email}:{" "}
              <a className={link} href={`mailto:${COMPANY.email}`}>
                {COMPANY.email}
              </a>
            </p>
          </address>
        </Block>
        <Block title={t.representedBy}>
          <p>
            {t.managingDirectors}: {COMPANY.managingDirectors.join(", ")}
          </p>
        </Block>
        <Block title={t.register}>
          <p>
            {t.registerCourt}, {COMPANY.registerNumber}
          </p>
        </Block>
        <Block title={t.vatId}>
          <p>{COMPANY.vatId}</p>
        </Block>
        <Block title={t.responsible}>
          <address className="not-italic">
            {COMPANY.contentResponsible}
            <br />
            {postal}
          </address>
        </Block>
        <div className="md:col-span-2">
          <Block title={t.dispute}>
            <p>{t.disputeText}</p>
          </Block>
        </div>
      </div>
    </LegalShell>
  )
}
