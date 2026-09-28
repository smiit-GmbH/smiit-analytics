import { JsonLd } from "@/components/seo/json-ld"
import { Ai } from "@/components/pages/landing/ai"
import { ChapterRail } from "@/components/pages/landing/chapter-rail"
import { Audiences } from "@/components/pages/landing/audiences"
import { Automations } from "@/components/pages/landing/automations"
import { Customize } from "@/components/pages/landing/customize"
import { Faq } from "@/components/pages/landing/faq-section"
import { FinalCta } from "@/components/pages/landing/final-cta"
import { Hero } from "@/components/pages/landing/hero"
import { Pricing } from "@/components/pages/landing/pricing"
import { Problem } from "@/components/pages/landing/problem"
import { Reports } from "@/components/pages/landing/reports"
import { Security } from "@/components/pages/landing/security"
import { Steps } from "@/components/pages/landing/steps"
import { Testimonials } from "@/components/pages/landing/testimonials"
import { Trust } from "@/components/pages/landing/trust"
import type { SectionProps } from "@/components/pages/landing/types"
import { CHAPTER_SECTIONS, SECTIONS } from "@/lib/routes"
import { buildFaqJsonLd, buildSoftwareApplicationJsonLd } from "@/lib/seo"

/** The smiit Analytics landing page, section by section. */
export function LandingPage({ lang, dict }: SectionProps) {
  const props = { lang, dict }
  return (
    <>
      <Hero {...props} />
      <Trust {...props} />
      <Problem {...props} />
      <Steps {...props} />
      <Reports {...props} />
      <Customize {...props} />
      <Ai {...props} />
      <Automations {...props} />
      <Audiences {...props} />
      <Testimonials {...props} />
      <Pricing {...props} />
      <Security {...props} />
      <Faq {...props} />
      <FinalCta {...props} />

      <ChapterRail
        label={dict.nav.chapters.label}
        chapters={CHAPTER_SECTIONS.map((s) => ({ id: SECTIONS[s], label: dict.nav.chapters.items[s] }))}
      />

      <JsonLd data={buildSoftwareApplicationJsonLd(lang)} />
      <JsonLd data={buildFaqJsonLd(lang)} />
    </>
  )
}
