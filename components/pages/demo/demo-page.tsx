import type { Metadata } from "next"
import { DemoVideo } from "@/components/ui"
import { JsonLd } from "@/components/seo/json-ld"
import { getDictionary, type Dictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n"
import { MEDIA, mediaPath } from "@/lib/media"
import { routePath } from "@/lib/routes"
import { buildDemoVideoJsonLd, buildPageMetadata } from "@/lib/seo"

/** First published 2026-11-10, 2:26 min — the VideoObject's facts; update both with a new cut. */
const VIDEO_FACTS = { uploadDate: "2026-11-10", duration: "PT2M26S" }

export function demoPageMetadata(lang: Locale): Metadata {
  const t = getDictionary(lang).demoPage
  return buildPageMetadata({ lang, route: "demo", title: t.title, description: t.description })
}

/**
 * The full demo video for embedding (/de/demo/, e.g. in an iframe on the bexio Marketplace): nothing but the video,
 * filling the frame on the brand navy — no header, no heading, nothing to scroll past. A thin line below keeps the
 * legal notice and the privacy policy one click away (DDG § 5 / UWG Art. 3 s: easily reachable) and names the
 * site; its links open in a new tab, out of the iframe. The hero's modal plays the same file.
 */
export function DemoPage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.demoPage
  const video = MEDIA.VIDEO_DEMO_FULL
  const src = mediaPath("VIDEO_DEMO_FULL", lang)
  const link = "underline-offset-4 hover:text-white hover:underline"
  return (
    <main className="flex h-dvh flex-col bg-navy">
      <h1 className="sr-only">{t.title}</h1>
      <div className="relative min-h-0 flex-1">
        <DemoVideo id="VIDEO_DEMO_FULL" src={src} ratio={video.ratio} spec={video.spec} title={t.title} autoPlay={false} fill />
      </div>
      <footer className="flex h-7 shrink-0 items-center justify-between gap-4 px-3 text-[0.7rem] text-white/75">
        <a href={routePath(lang)} target="_blank" rel="noopener" className={link}>
          smiit Analytics
        </a>
        <nav aria-label={dict.footer.legalTitle} className="flex gap-3">
          <a href={routePath(lang, "legalNotice")} target="_blank" rel="noopener" className={link}>
            {dict.legal.legalNotice.nav}
          </a>
          <a href={routePath(lang, "privacy")} target="_blank" rel="noopener" className={link}>
            {dict.legal.privacy.nav}
          </a>
        </nav>
      </footer>
      <JsonLd data={buildDemoVideoJsonLd(lang, { src, ...VIDEO_FACTS })} />
    </main>
  )
}
