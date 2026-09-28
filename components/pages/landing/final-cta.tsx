import { ArrowRight, CalendarDays } from "lucide-react"
import { Container } from "@/components/ui"
import { CtaLink } from "@/components/cta-link"
import { LINKS } from "@/lib/links"
import { rich } from "@/lib/rich"
import type { SectionProps } from "./types"

export function FinalCta({ dict }: SectionProps) {
  const t = dict.home.finalCta
  return (
    <section aria-labelledby="final-cta-title" className="bg-white pb-section-sm md:pb-section">
      <Container>
        <div className="relative overflow-hidden rounded-card bg-navy px-6 py-14 text-center text-white sm:px-10 md:py-20 [&_.hl]:text-brand-light">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(143,180,230,0.25),transparent)]"
          />
          <h2 id="final-cta-title" className="relative font-serif text-heading-lg tracking-tight text-balance">
            {rich(t.title)}
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lead text-white/75">{t.text}</p>
          <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaLink externalHint={dict.common.externalHint} href={LINKS.signup} track="final_signup" variant="light" size="lg">
              {t.primary}
              <ArrowRight aria-hidden="true" />
            </CtaLink>
            <CtaLink externalHint={dict.common.externalHint} href={LINKS.booking} track="final_booking" variant="outline-light" size="lg">
              <CalendarDays aria-hidden="true" />
              {t.secondary}
            </CtaLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
