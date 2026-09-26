import type { Metadata } from "next"
import { Home } from "lucide-react"
import { CtaLink } from "@/components/cta-link"
import { getContent } from "@/content"

const t = getContent().notFound

export const metadata: Metadata = {
  title: t.title,
  robots: { index: false, follow: true },
}

/**
 * 404 page in the style of www.smiit.de/notfound: full-bleed illustration
 * (desktop + portrait variant) with rounded bottom, soft light-to-dark wash,
 * large faint "404", short message and one way back.
 * Static export writes this as 404.html, which the host serves for every unknown URL.
 */
export default function NotFound() {
  return (
    <section
      aria-labelledby="nf-title"
      // Fills the screen below the header; anchored at the bottom so the figures stay below the text.
      className="relative flex h-[calc(100svh-4.5rem)] min-h-[620px] max-h-[980px] flex-col overflow-hidden rounded-b-card bg-[url('/brand/not_found_mobile.webp')] bg-cover bg-bottom bg-no-repeat md:bg-[url('/brand/not_found.webp')]"
    >
      <span role="img" aria-label={t.imageAlt} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/45 via-white/25 to-black/35" />
      <div className="relative z-10 flex flex-1 items-start justify-center px-4 pt-10 md:pt-14">
        <div className="mx-auto max-w-md text-center font-serif">
          <p aria-hidden="true" className="text-[100px] font-bold leading-none text-brand/20 md:text-[150px]">
            404
          </p>
          <h1 id="nf-title" className="mt-6 text-3xl text-ink drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)] md:mt-8 md:text-4xl">
            {t.title}
          </h1>
          <p className="mt-4 text-lg text-ink/85 drop-shadow-[0_1px_2px_rgba(255,255,255,0.45)] md:mx-auto md:max-w-[30ch] md:text-xl">
            {t.text}
          </p>
          <div className="mt-8 flex justify-center font-sans">
            <CtaLink href="/" track="404_home" size="lg" className="w-full sm:w-auto">
              <Home aria-hidden="true" />
              {t.cta}
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  )
}
