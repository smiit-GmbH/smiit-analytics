import { ArrowRight } from "lucide-react"
import { Card, CardText, CardTitle, IconTile, Section } from "@/components/ui"
import { Icon } from "@/components/icons"
import { SECTIONS, routePath } from "@/lib/routes"
import { rich } from "@/lib/rich"
import type { SectionProps } from "./types"

export function Security({ lang, dict }: SectionProps) {
  const t = dict.home.security
  return (
    <Section id={SECTIONS.security} tone="sand" eyebrow={t.eyebrow} title={rich(t.title)}>
      <ul className="grid gap-5 md:grid-cols-3">
        {t.items.map((item) => (
          <li key={item.title}>
            <Card className="h-full">
              <IconTile>
                <Icon name={item.icon} />
              </IconTile>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.text}</CardText>
            </Card>
          </li>
        ))}
      </ul>
      <a
        href={routePath(lang, "privacy")}
        className="mt-8 inline-flex items-center gap-2 rounded-md text-sm font-medium text-brand underline-offset-4 hover:underline"
      >
        {t.privacyLink}
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </Section>
  )
}
