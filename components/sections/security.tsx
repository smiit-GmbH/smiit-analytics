import { ArrowRight } from "lucide-react"
import { Card, CardText, CardTitle, IconTile, Section } from "@/components/ds"
import { Icon } from "@/components/icons"
import { LINKS } from "@/config/links"
import { getContent } from "@/content"
import { rich } from "@/lib/rich"

export function Security() {
  const t = getContent().security
  return (
    <Section id="sicherheit" tone="sand" eyebrow={t.eyebrow} title={rich(t.title)}>
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
        href={LINKS.datenschutz}
        className="mt-8 inline-flex items-center gap-2 rounded-md text-sm font-medium text-brand underline-offset-4 hover:underline"
      >
        {t.privacyLink}
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </Section>
  )
}
