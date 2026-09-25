import { ArrowRight, Check, PlayCircle } from "lucide-react"
import { BrowserFrame, Button, Container, DemoVideo, Media, Modal, ModalContent, ModalTrigger } from "@/components/ds"
import { CtaLink } from "@/components/cta-link"
import { Stars } from "@/components/stars"
import { LINKS } from "@/config/links"
import { MEDIA } from "@/config/media"
import { getContent } from "@/content"
import { rich } from "@/lib/rich"

export function Hero() {
  const c = getContent()
  const t = c.hero
  const demo = MEDIA.VIDEO_DEMO_FULL

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
      {/* soft brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(33,86,156,0.14),transparent)]"
      />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <div>
          <a
            href={LINKS.marketplaceReviews}
            target="_blank"
            rel="noopener"
            data-track="hero_rating"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-ink shadow-card transition-colors hover:bg-white"
          >
            <Stars />
            <span>
              <strong className="font-semibold">{t.rating.value}</strong> {t.rating.label}
              <span className="sr-only"> {t.rating.srLabel}</span>
            </span>
          </a>

          <h1
            id="hero-title"
            className="mt-6 font-serif text-[2.6rem] leading-[1.03] tracking-tight text-balance sm:text-[3.25rem] lg:text-[3.8rem]"
          >
            {rich(t.title)}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{t.subtitle}</p>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {t.promises.map((p) => (
              <li key={p} className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                <span className="flex size-5 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaLink href={LINKS.signup} track="hero_signup" size="lg">
              {t.ctaPrimary}
              <ArrowRight aria-hidden="true" />
            </CtaLink>
            <Modal>
              <ModalTrigger asChild>
                <Button variant="secondary" size="lg" track="hero_demo">
                  <PlayCircle aria-hidden="true" />
                  {t.ctaSecondary}
                </Button>
              </ModalTrigger>
              <ModalContent title={t.demoTitle} hideTitle size="video" closeLabel={c.common.close}>
                <DemoVideo id="VIDEO_DEMO_FULL" src={demo.file} ratio={demo.ratio} spec={demo.spec} title={t.demoTitle} />
              </ModalContent>
            </Modal>
          </div>
        </div>

        <BrowserFrame>
          <Media id="VIDEO_HERO" alt={c.media.VIDEO_HERO} />
        </BrowserFrame>
      </Container>
    </section>
  )
}
