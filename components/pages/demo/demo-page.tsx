import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Container, DemoVideo } from "@/components/ui"
import { CtaLink } from "@/components/cta-link"
import { JsonLd } from "@/components/seo/json-ld"
import { getDictionary, type Dictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"
import { LINKS } from "@/lib/links"
import { MEDIA, mediaPath } from "@/lib/media"
import { buildBreadcrumbJsonLd, buildDemoVideoJsonLd, buildPageMetadata } from "@/lib/seo"

/** First published 2026-11-10, 2:26 min — the VideoObject's facts; update both with a new cut. */
const VIDEO_FACTS = { uploadDate: "2026-11-10", duration: "PT2M26S" }

export function demoPageMetadata(lang: Locale): Metadata {
  const t = getDictionary(lang).demoPage
  return buildPageMetadata({ lang, route: "demo", title: t.title, description: t.description })
}

/**
 * The full demo video on a page of its own (/de/demo/) — a link to hand out, e.g. on the bexio Marketplace. The
 * hero's modal plays the same file. Calm text header like the legal pages, the video edge to edge in a rounded
 * tile, then the one action that follows a demo: the free trial.
 */
export function DemoPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.demoPage
  const video = MEDIA.VIDEO_DEMO_FULL
  const src = mediaPath("VIDEO_DEMO_FULL", lang)
  return (
    <article className="pb-section-sm md:pb-section">
      <Container className="pt-12 pb-10 md:pt-20 md:pb-14">
        <header className="max-w-3xl">
          <p className="mb-4 text-[0.7rem] font-semibold tracking-[0.22em] text-brand uppercase">{t.eyebrow}</p>
          <h1 className="font-serif text-heading-lg tracking-tight text-balance text-ink">{t.title}</h1>
          <p className="mt-4 max-w-[60ch] text-lead text-ink-muted">{t.intro}</p>
        </header>
      </Container>

      <Container>
        <div className="overflow-hidden rounded-tile shadow-frame">
          <DemoVideo id="VIDEO_DEMO_FULL" src={src} ratio={video.ratio} spec={video.spec} title={t.title} autoPlay={false} />
        </div>
        <div className="mt-9">
          <CtaLink externalHint={dict.common.externalHint} href={LINKS.signup} track="demo_page_signup" size="lg">
            {dict.home.hero.ctaPrimary}
            <ArrowRight aria-hidden="true" />
          </CtaLink>
        </div>
      </Container>

      <JsonLd data={buildBreadcrumbJsonLd(lang, [{ name: t.title, route: "demo" }])} />
      <JsonLd data={buildDemoVideoJsonLd(lang, { src, ...VIDEO_FACTS })} />
    </article>
  )
}
