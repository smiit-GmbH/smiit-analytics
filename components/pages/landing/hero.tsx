import { ArrowRight, CirclePlay } from "lucide-react"
import { Button, Container, DemoVideo, Media, Modal, ModalContent, ModalTrigger } from "@/components/ui"
import { CtaLink } from "@/components/cta-link"
import { LINKS } from "@/lib/links"
import { DEMO_VIDEO_LANGS, MEDIA, mediaPath } from "@/lib/media"
import { rich } from "@/lib/rich"
import type { SectionProps } from "./types"

/** Deliberately calm: headline, one sentence, two actions – the video carries the rest. */
export function Hero({ lang, dict }: SectionProps) {
  const t = dict.home.hero
  const demo = MEDIA.VIDEO_DEMO_FULL

  return (
    <section aria-labelledby="hero-title" className="pt-10 pb-16 md:pt-16 md:pb-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <div>
          <h1 id="hero-title" className="font-serif text-display tracking-tight text-balance">
            {rich(t.title)}
          </h1>
          <p className="mt-5 max-w-lg text-lead text-ink-muted">{t.subtitle}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaLink externalHint={dict.common.externalHint} href={LINKS.signup} track="hero_signup" size="lg">
              {t.ctaPrimary}
              <ArrowRight aria-hidden="true" />
            </CtaLink>
            {DEMO_VIDEO_LANGS.includes(lang) && (
              <Modal>
                <ModalTrigger asChild>
                  <Button variant="secondary" size="lg" track="hero_demo">
                    <CirclePlay aria-hidden="true" />
                    {t.ctaSecondary}
                  </Button>
                </ModalTrigger>
                <ModalContent title={t.demoTitle} hideTitle size="video" closeLabel={dict.common.close}>
                  <DemoVideo
                    id="VIDEO_DEMO_FULL"
                    src={mediaPath("VIDEO_DEMO_FULL", lang)}
                    ratio={demo.ratio}
                    spec={demo.spec}
                    title={t.demoTitle}
                  />
                </ModalContent>
              </Modal>
            )}
          </div>
        </div>

        {/* The hero clip is shown edge to edge in a rounded tile — larger and calmer without the BrowserFrame chrome. */}
        <div className="overflow-hidden rounded-tile shadow-frame">
          <Media lang={lang} id="VIDEO_HERO" alt={dict.media.VIDEO_HERO} />
        </div>
      </Container>
    </section>
  )
}
