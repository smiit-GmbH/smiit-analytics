import { Section } from "@/components/ds"
import { LINKS } from "@/config/links"
import { getContent } from "@/content"
import { rich } from "@/lib/rich"
import { PricingPlans } from "./pricing-plans"

export function Pricing() {
  const c = getContent()
  const t = c.pricing
  return (
    <Section id="preise" tone="white" eyebrow={t.eyebrow} title={rich(t.title)} intro={t.intro} align="center">
      <PricingPlans
        t={t}
        signupHref={LINKS.signup}
        externalHint={c.common.externalHint}
      />
    </Section>
  )
}
