import { Building2 } from "lucide-react"
import { BrowserFrame, Card, IconTile, Media, Section } from "@/components/ui"
import { Icon } from "@/components/icons"
import { SECTIONS } from "@/lib/routes"
import { rich } from "@/lib/rich"
import type { SectionProps } from "./types"

export function Customize({ lang, dict }: SectionProps) {
  const t = dict.home.customize
  return (
    <Section id={SECTIONS.customize} tone="white" eyebrow={t.eyebrow} title={rich(t.title)} intro={t.intro}>
      <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        <BrowserFrame>
          <Media lang={lang} id="VIDEO_DRAGDROP" alt={dict.media.VIDEO_DRAGDROP} />
        </BrowserFrame>
        <ul className="space-y-7">
          {t.points.map((p) => (
            <li key={p.title} className="flex gap-4">
              <IconTile className="mb-0 shrink-0">
                <Icon name={p.icon} />
              </IconTile>
              <div>
                <h3 className="font-serif text-title tracking-tight">{p.title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-muted">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Card tone="sand" className="mt-12 grid items-center gap-8 p-6 sm:p-8 md:mt-16 md:grid-cols-2 md:p-10">
        <div>
          <IconTile className="bg-white">
            <Building2 />
          </IconTile>
          <h3 className="font-serif text-title-lg tracking-tight text-balance">
            {rich(t.trustee.title)}
          </h3>
          <p className="mt-4 leading-relaxed text-ink-muted">{t.trustee.text}</p>
        </div>
        <div className="overflow-hidden rounded-tile shadow-card">
          <Media lang={lang} id="IMG_MULTI_COMPANY" alt={dict.media.IMG_MULTI_COMPANY} sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
      </Card>
    </Section>
  )
}
