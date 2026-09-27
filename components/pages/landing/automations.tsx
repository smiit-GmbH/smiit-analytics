import { Sparkles } from "lucide-react"
import { Card, CardText, CardTitle, IconTile, Section } from "@/components/ui"
import { Icon } from "@/components/icons"
import { SECTIONS } from "@/lib/routes"
import { rich } from "@/lib/rich"
import { AutomationFlow } from "./automation-flow"
import type { SectionProps } from "./types"

export function Automations({ dict }: SectionProps) {
  const t = dict.home.automations
  return (
    <Section id={SECTIONS.automations} tone="cream" eyebrow={t.eyebrow} title={rich(t.title)} intro={t.intro}>
      <AutomationFlow flow={t.flow} />

      {/* Examples: two columns, then the note that anything can be automated with AI */}
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14">
        {t.examples.map((ex) => (
          <li key={ex.title}>
            <Card className="flex h-full gap-5 p-5 sm:p-6">
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

      <div className="mt-4 flex gap-5 rounded-card border border-brand/20 bg-brand-soft p-5 sm:p-6">
        <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-control bg-brand text-white">
          <Sparkles className="size-5" />
        </span>
        <div>
          <h3 className="font-serif text-[1.2rem] leading-tight tracking-tight">{t.custom.title}</h3>
          <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-muted">{t.custom.text}</p>
        </div>
      </div>
    </Section>
  )
}
