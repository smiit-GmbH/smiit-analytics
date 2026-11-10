import { readFileSync } from "node:fs"
import path from "node:path"
import type { Metadata } from "next"
import { Fragment } from "react"
import type React from "react"
import { ChevronDown } from "lucide-react"
import { Container } from "@/components/ui"
import { JsonLd } from "@/components/seo/json-ld"
import type { Dictionary } from "@/lib/dictionary"
import { getDictionary } from "@/lib/dictionary"
import { HTML_LANG, type Locale } from "@/lib/i18n"
import { type LegalHeading, type LegalLine, legalIndents, linkParts, parseLegalText } from "@/lib/legal-text"
import { cn } from "@/lib/utils"
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
 * Shared frame of the legal pages: a calm text header on the page background
 * (eyebrow, title, subtitle, version), below it the content in a white card.
 * Long texts pass a table of contents as `aside`: a collapsible box above the
 * card, so the text keeps the full page width. Plus breadcrumb JSON-LD.
 */
function LegalShell({
  lang,
  dict,
  route,
  subtitle,
  meta,
  aside,
  children,
}: {
  lang: Locale
  dict: Dictionary
  route: LegalRoute
  subtitle?: string
  /** "Fassung 1.0 — Stand: 01.11.2026" */
  meta?: string
  aside?: React.ReactNode
  children: React.ReactNode
}) {
  const title = dict.legal[route].title
  const card = (
    <div className="min-w-0 rounded-card bg-white p-6 leading-relaxed shadow-card ring-1 ring-black/5 sm:p-8 md:p-10 lg:p-12">
      {children}
    </div>
  )
  return (
    <article className="pb-section-sm md:pb-section">
      <Container className="pt-12 pb-10 md:pt-20 md:pb-14">
        <header className="max-w-3xl">
          <p className="mb-4 text-[0.7rem] font-semibold tracking-[0.22em] text-brand uppercase">{dict.footer.legalTitle}</p>
          {/* Long compounds (e.g. Auftragsverarbeitungsvertrag) must break on phones. */}
          <h1 lang={HTML_LANG[lang]} className="font-serif text-heading-lg tracking-tight [overflow-wrap:anywhere] hyphens-auto text-ink">
            {title}
          </h1>
          {subtitle && <p className="mt-4 max-w-[60ch] text-lead text-ink-muted">{subtitle}</p>}
          {meta && (
            <p lang="de" className="mt-6 inline-flex rounded-full bg-white px-3.5 py-1.5 text-sm text-ink-muted ring-1 ring-black/5">
              {meta}
            </p>
          )}
        </header>
      </Container>

      <Container className="space-y-6">
        {aside}
        {card}
      </Container>
      <JsonLd data={buildBreadcrumbJsonLd(lang, [{ name: title, route }])} />
    </article>
  )
}

/** "§ 7 ORT DER …" → ["§ 7", "ORT DER …"]; "ANLAGE 1 — GEGENSTAND …" → ["Anl. 1", "GEGENSTAND …"]. */
function splitNumber(text: string): [string | null, string] {
  const m = /^(§ \d+|ANLAGE \d+|\d+(?:\.\d+)*\.?)\s+(?:—\s+)?(.*)$/.exec(text)
  if (!m) return [null, text]
  return [m[1].startsWith("ANLAGE") ? m[1].replace("ANLAGE", "Anl.") : m[1].replace(/\.$/, ""), m[2]]
}

/** Table of contents: a collapsible box above the text; opened, the entries run down two or three columns. */
function Toc({ label, headings }: { label: string; headings: LegalHeading[] }) {
  return (
    <details lang="de" className="group rounded-tile bg-white ring-1 ring-black/5">
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-[0.7rem] font-semibold tracking-[0.22em] text-ink-muted uppercase sm:px-8">
        {label}
        <ChevronDown aria-hidden="true" className="size-4 transition-transform group-open:rotate-180" />
      </summary>
      <nav aria-label={label} className="border-t border-black/5 px-3 py-4 sm:px-6">
        <ol className="gap-x-6 md:columns-2 xl:columns-3">
          {headings.map((h) => {
            const [num, rest] = splitNumber(h.text)
            return (
              <li key={h.id} className="break-inside-avoid py-0.5">
                <a
                  href={`#${h.id}`}
                  className="grid grid-cols-[2.75rem_1fr] rounded-md px-2 py-1 text-[0.78rem] leading-snug tracking-[0.01em] [overflow-wrap:anywhere] hyphens-auto text-ink-muted transition-colors hover:bg-sand hover:text-ink"
                >
                  <span className="tabular-nums">{num}</span>
                  <span className={cn(!num && "col-span-2")}>{rest}</span>
                </a>
              </li>
            )
          })}
        </ol>
      </nav>
    </details>
  )
}

/** Read at build time (static export); the texts are German only, for every locale. */
function loadLegalDoc(route: TextRoute) {
  return parseLegalText(readFileSync(path.join(process.cwd(), "content", "legal", `${route}.txt`), "utf8"))
}

const linkClass = "text-brand underline-offset-4 [overflow-wrap:anywhere] hyphens-none hover:underline"

/** Text with clickable URLs and e-mail addresses. */
function Linked({ text }: { text: string }) {
  return linkParts(text).map((p, i) =>
    p.href ? (
      <a key={i} className={linkClass} href={p.href}>
        {p.text}
      </a>
    ) : (
      p.text
    ),
  )
}

/** Widths (rem) of the marker column – `legalIndents` lines up deeper lines with the text after it. */
const MARKER_REM = { marker: 2.25, bullet: 1.25, step: 1 }

const indent = (offset: number) => (offset ? { marginLeft: `${offset}rem` } : undefined)

/**
 * Consecutive label rows ("Zweck: …", "Speicherdauer: …") as one table, so their values line up. The label
 * column is 11rem and grows for long labels ("Monatstarif (§ 13 …)") up to 20rem; on phones the rows stack.
 */
function Labels({ lines, offset }: { lines: LegalLine[]; offset: number }) {
  return (
    <dl style={indent(offset)} className="grid sm:grid-cols-[fit-content(20rem)_1fr] sm:gap-x-4 sm:gap-y-2">
      {lines.map((l, i) => (
        <Fragment key={i}>
          <dt className="mt-2 font-semibold text-ink first:mt-0 sm:mt-0 sm:min-w-[11rem]">{l.label}</dt>
          <dd className="whitespace-pre-line">
            <Linked text={l.text} />
          </dd>
        </Fragment>
      ))}
    </dl>
  )
}

/** One logical line: clause / list item or plain paragraph, at its offset (rem). */
function Line({ line, offset }: { line: LegalLine; offset: number }) {
  const style = indent(offset)
  if (line.marker) {
    const bullet = line.marker === "-"
    return (
      <div style={style} className="flex">
        <span style={{ width: `${bullet ? MARKER_REM.bullet : MARKER_REM.marker}rem` }} className="shrink-0 text-ink-muted tabular-nums">
          {bullet ? "•" : line.marker}
        </span>
        <span className="min-w-0 flex-1 whitespace-pre-line">
          <Linked text={line.text} />
        </span>
      </div>
    )
  }
  return (
    <p style={style} className="whitespace-pre-line">
      <Linked text={line.text} />
    </p>
  )
}

const headingClass = {
  2: "mt-12 text-[0.95rem] font-semibold tracking-wide text-ink hyphens-manual",
  3: "mt-9 text-sm font-semibold tracking-wide text-ink hyphens-manual",
  4: "mt-7 text-sm font-semibold text-ink hyphens-manual",
} as const

/**
 * Privacy policy, terms, DPA: the text from content/legal/<route>.txt, parsed into
 * headings, clauses, lists and label rows (lib/legal-text.ts), with a table of
 * contents. The texts exist in German only; other locales show a note above.
 */
export function LegalPage({ lang, dict, route }: { lang: Locale; dict: Dictionary; route: TextRoute }) {
  const doc = loadLegalDoc(route)
  const toc = doc.blocks.filter((b) => b.type === "heading" && b.level === 2) as LegalHeading[]
  const offsets = legalIndents(doc.blocks, MARKER_REM)
  // The version line ("Fassung 1.0 — Stand: …") opens every text; it goes into the page header.
  const first = doc.blocks[0]
  const meta =
    first?.type === "lines" && first.lines.length === 1 && /^Fassung /.test(first.lines[0].text) ? first.lines[0].text : undefined
  const blocks = meta ? doc.blocks.slice(1) : doc.blocks
  return (
    <LegalShell
      lang={lang}
      dict={dict}
      route={route}
      subtitle={doc.subtitle}
      meta={meta}
      aside={toc.length > 2 ? <Toc label={dict.legal.contents} headings={toc} /> : undefined}
    >
      {lang !== "de" && <p className="mb-8 rounded-tile bg-sand px-4 py-3 text-[0.95rem] text-ink">{dict.legal.germanOnly}</p>}
      <div lang="de" className="text-[0.95rem] leading-relaxed hyphens-auto text-ink">
        {blocks.map((b, i) => {
          if (b.type === "heading") {
            const H = `h${b.level}` as const
            return (
              <H key={b.id} id={b.id} className={cn(headingClass[b.level], "scroll-mt-28 first:mt-0")}>
                {b.text}
              </H>
            )
          }
          // Runs of label rows at the same offset become one table; everything else renders line by line.
          const runs: LegalLine[][] = []
          for (const l of b.lines) {
            const last = runs.at(-1)
            if (l.label && last?.[0].label && offsets.get(last[0]) === offsets.get(l)) last.push(l)
            else runs.push([l])
          }
          return (
            <div key={i} className="mt-4 space-y-2">
              {runs.map((run, j) =>
                run[0].label ? (
                  <Labels key={j} lines={run} offset={offsets.get(run[0]) ?? 0} />
                ) : (
                  <Line key={j} line={run[0]} offset={offsets.get(run[0]) ?? 0} />
                ),
              )}
            </div>
          )
        })}
      </div>
    </LegalShell>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-semibold tracking-[0.18em] text-ink-muted uppercase">{title}</h2>
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
          <address className="mt-3 text-[0.95rem] leading-relaxed text-ink not-italic">{postal}</address>
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
