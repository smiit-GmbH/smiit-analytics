import { ArrowRight, PlayCircle } from "lucide-react"
import { BrowserFrame, Button, Container, DemoVideo, Media, Modal, ModalContent, ModalTrigger } from "@/components/ds"
import { CtaLink } from "@/components/cta-link"
import { LINKS } from "@/config/links"
import { MEDIA } from "@/config/media"
import { getContent } from "@/content"
import { rich } from "@/lib/rich"

/** Deliberately calm: headline, one sentence, two actions – the video carries the rest. */
export function Hero() {
  const c = getContent()
  const t = c.hero
  const demo = MEDIA.VIDEO_DEMO_FULL

  return (
    <section aria-labelledby="hero-title" className="pb-16 pt-10 md:pb-24 md:pt-16">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <div>
          <h1
            id="hero-title"
            className="font-serif text-[2.6rem] leading-[1.03] tracking-tight text-balance sm:text-[3.25rem] lg:text-[3.8rem]"
          >
            {rich(t.title)}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">{t.subtitle}</p>

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
