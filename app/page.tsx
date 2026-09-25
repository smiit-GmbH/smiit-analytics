import { Section } from "@/components/ds"
import { JsonLd } from "@/components/json-ld"
import { Ai } from "@/components/sections/ai"
import { Audiences } from "@/components/sections/audiences"
import { Automations } from "@/components/sections/automations"
import { Customize } from "@/components/sections/customize"
import { FaqList } from "@/components/sections/faq"
import { FinalCta } from "@/components/sections/final-cta"
import { Hero } from "@/components/sections/hero"
import { Pricing } from "@/components/sections/pricing"
import { Problem } from "@/components/sections/problem"
import { Reports } from "@/components/sections/reports"
import { Security } from "@/components/sections/security"
import { Steps } from "@/components/sections/steps"
import { Testimonials } from "@/components/sections/testimonials"
import { Trust } from "@/components/sections/trust"
import { getContent } from "@/content"
import { rich } from "@/lib/rich"
import { faqJsonLd, softwareApplicationJsonLd } from "@/lib/seo"

export default function HomePage() {
  const faq = getContent().faq
  return (
    <>
      <Hero />
      <Trust />
      <Problem />
      <Steps />
      <Reports />
      <Customize />
      <Ai />
      <Automations />
      <Audiences />
      <Testimonials />
      <Pricing />
      <Security />
      <Section id="faq" tone="white" eyebrow={faq.eyebrow} title={rich(faq.title)} align="center">
        <FaqList items={faq.items} />
      </Section>
      <FinalCta />

      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd data={faqJsonLd()} />
    </>
  )
}
