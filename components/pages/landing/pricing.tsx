import { Section } from "@/components/ui"
import { LINKS } from "@/lib/links"
import { SECTIONS } from "@/lib/routes"
import { rich } from "@/lib/rich"
import { PricingPlans } from "./pricing-plans"
import type { SectionProps } from "./types"

export function Pricing({ dict }: SectionProps) {
  const t = dict.home.pricing
  return (
    <Section id={SECTIONS.pricing} tone="white" eyebrow={t.eyebrow} title={rich(t.title)} intro={t.intro} align="center">
      <PricingPlans
        t={t}
        signupHref={LINKS.signup}
        externalHint={dict.common.externalHint}
      />
    </Section>
  )
}
