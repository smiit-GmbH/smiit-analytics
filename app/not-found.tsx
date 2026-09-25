import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/ds"
import { CtaLink } from "@/components/cta-link"
import { getContent } from "@/content"
import { plain, rich } from "@/lib/rich"

const t = getContent().notFound

export const metadata: Metadata = {
  title: plain(t.title),
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(33,86,156,0.12),transparent)]"
      />
      <Container className="relative max-w-2xl text-center">
        <p className="font-serif text-[6rem] leading-none text-magenta/40 md:text-[8rem]" aria-hidden="true">
          404
        </p>
        <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand">{t.eyebrow}</p>
        <h1 id="nf-title" className="mt-4 font-serif text-[2.4rem] leading-tight tracking-tight md:text-[3rem]">
          {rich(t.title)}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t.text}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <CtaLink href="/" track="404_home" size="lg">
            {t.cta}
            <ArrowRight aria-hidden="true" />
          </CtaLink>
          <CtaLink href="/#faq" track="404_faq" variant="secondary" size="lg">
            {t.secondary}
          </CtaLink>
        </div>
      </Container>
    </section>
  )
}
