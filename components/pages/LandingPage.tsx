"use client"

import type { Locale } from "@/lib/dictionary"
import { HeroSection } from "@/components/pages/landing/hero-section"
import { FeaturesSection } from "@/components/pages/landing/features-section"
import { AdvantagesSection } from "@/components/pages/landing/advantages-section"
import { PricingSection } from "@/components/pages/landing/pricing-section"
import { ReviewsSection } from "@/components/pages/landing/reviews-section"
import { ProcessSection } from "@/components/pages/landing/process-section"
import FaqSection from "@/components/pages/shared/faq-section"

export default function LandingPage({
  lang,
  dict,
}: {
  lang: Locale
  dict: any
}) {
  return (
    <main>
      <HeroSection dict={dict} />
      <FeaturesSection dict={dict} />
      <AdvantagesSection dict={dict} />
      <PricingSection dict={dict} />
      <ReviewsSection dict={dict} lang={lang} />
      <ProcessSection dict={dict} />
      <FaqSection dict={dict.landing.faq} compact />
    </main>
  )
}
