import { Card, CardText, CardTitle, IconTile, Media, Section } from "@/components/ds"
import { Icon } from "@/components/icons"
import { getContent } from "@/content"
import { rich } from "@/lib/rich"
import { AutomationFlow } from "./automation-flow"

export function Automations() {
  const c = getContent()
  const t = c.automations
  return (
    <Section id="automatisierungen" tone="cream" eyebrow={t.eyebrow} title={rich(t.title)} intro={t.intro}>
      <AutomationFlow flow={t.flow} />

      <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-[1fr_1.3fr] lg:items-start lg:gap-14">
        <figure>
          <div className="mx-auto max-w-sm overflow-hidden rounded-tile bg-white shadow-frame">
            <Media id="IMG_REMINDER_EMAIL" alt={c.media.IMG_REMINDER_EMAIL} sizes="(min-width: 1024px) 24rem, 90vw" />
          </div>
          <figcaption className="mt-4 text-center text-sm text-ink-muted">{t.emailCaption}</figcaption>
        </figure>

        <div>
          <h3 className="mb-6 font-serif text-[1.75rem] leading-tight tracking-tight">{t.examplesTitle}</h3>
          <ul className="space-y-4">
            {t.examples.map((ex) => (
              <li key={ex.title}>
                <Card className="flex gap-5 p-5 sm:p-6">
                  <IconTile className="mb-0 shrink-0">
                    <Icon name={ex.icon} />
                  </IconTile>
                  <div>
                    <CardTitle className="text-[1.2rem]">{ex.title}</CardTitle>
                    <CardText className="mt-1.5">{ex.text}</CardText>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
