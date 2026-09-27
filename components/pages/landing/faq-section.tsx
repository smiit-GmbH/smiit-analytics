import { Section } from "@/components/ui"
import { SECTIONS } from "@/lib/routes"
import { rich } from "@/lib/rich"
import { faqItems } from "@/lib/seo"
import { FaqList } from "./faq"
import type { SectionProps } from "./types"

export function Faq({ lang, dict }: SectionProps) {
  const t = dict.home.faq
  return (
    <Section id={SECTIONS.faq} tone="white" eyebrow={t.eyebrow} title={rich(t.title)} align="center">
      <FaqList items={faqItems(lang)} />
    </Section>
  )
}
