import type { Metadata } from "next"
import type React from "react"
import Image from "next/image"
import { Container } from "@/components/ui"
import { JsonLd } from "@/components/seo/json-ld"
import type { Dictionary } from "@/lib/dictionary"
import { getDictionary } from "@/lib/dictionary"
import { HTML_LANG, type Locale } from "@/lib/i18n"
import type { LEGAL_ROUTES } from "@/lib/routes"
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo"
import { COMPANY } from "@/lib/site"

type LegalRoute = (typeof LEGAL_ROUTES)[number]
/** Legal pages whose content is one text block (`body`). */
type TextRoute = Exclude<LegalRoute, "legalNotice">

/** `<title>` without soft hyphens (they only help line breaks in the h1). */
const stripShy = (s: string) => s.replace(/\u00AD/g, "")

export function legalPageMetadata(lang: Locale, route: LegalRoute): Metadata {
  const t = getDictionary(lang).legal[route]
  return buildPageMetadata({ lang, route, title: stripShy(t.title), description: t.description })
}

/**
 * Shared frame of the legal pages, as on www.smiit.de: full-width illustration
 * with a rounded bottom edge, a light wash from the left and a fine grain,
 * title (and optional subtitle) bottom left; below it a white card that
 * overlaps the image slightly. Plus breadcrumb JSON-LD.
 */
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
    <article>
      <header className="relative isolate h-[42vh] max-h-[560px] min-h-[300px] overflow-hidden rounded-b-card sm:h-[48vh] md:h-[46vh] lg:h-[50vh]">
        <Image
          src="/brand/legal.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[15%_35%] sm:object-[22%_35%] md:object-[40%_35%]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/70 via-white/15 to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.12] via-black/[0.04] to-transparent" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black/10 opacity-[0.18] mix-blend-soft-light"
          style={{ backgroundImage: "url(/brand/grain.webp)", backgroundRepeat: "repeat", backgroundSize: "150px 150px" }}
        />
        <Container className="relative flex h-full items-end pb-12 sm:pb-14 md:pb-16 lg:pb-20">
          <div>
            {/* Long compounds (e.g. Auftragsverarbeitungsvertrag) must break on phones. */}
            <h1 lang={HTML_LANG[lang]} className="hyphens-auto font-serif text-heading-lg tracking-tight text-ink [overflow-wrap:anywhere]">
              {title}
            </h1>
            {subtitle && <p className="mt-3 max-w-[60ch] text-lead text-ink/75">{subtitle}</p>}
          </div>
        </Container>
      </header>

      <Container className="relative pb-section-sm md:pb-section">
        <div className="relative -mt-6 rounded-card border border-black/10 bg-white p-6 leading-relaxed shadow-xl ring-1 ring-black/5 sm:-mt-8 sm:p-8 md:-mt-10 md:p-10 lg:-mt-12">
          {children}
        </div>
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
          <p className="font-serif text-title-lg tracking-tight">{COMPANY.name}</p>
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
