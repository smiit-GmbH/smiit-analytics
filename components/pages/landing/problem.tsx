import { ArrowDown } from "lucide-react"
import { Card, CardText, CardTitle, Section } from "@/components/ui"
import { Icon } from "@/components/icons"
import { SECTIONS } from "@/lib/routes"
import { rich } from "@/lib/rich"
import type { SectionProps } from "./types"

export function Problem({ dict }: SectionProps) {
  const t = dict.home.problem
  return (
    <Section id={SECTIONS.problem} tone="cream" eyebrow={t.eyebrow} title={rich(t.title)}>
      <ul className="grid gap-5 md:grid-cols-3">
        {t.pains.map((p) => (
          <li key={p.title}>
            <Card className="h-full">
              <div aria-hidden="true" className="mb-5 flex size-11 items-center justify-center rounded-control bg-sand text-ink-muted [&_svg]:size-5">
                <Icon name={p.icon} />
              </div>
              <CardTitle>{p.title}</CardTitle>
              <CardText>{p.text}</CardText>
            </Card>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-col items-center gap-5 text-center md:mt-14">
        <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-brand text-white">
          <ArrowDown className="size-5" />
        </span>
        <p className="max-w-3xl font-serif text-title-lg leading-snug tracking-tight text-balance">{t.solution}</p>
      </div>
    </Section>
  )
}
