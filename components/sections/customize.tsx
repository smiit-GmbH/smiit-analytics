import { Building2 } from "lucide-react"
import { BrowserFrame, Card, IconTile, Media, Section } from "@/components/ds"
import { Icon } from "@/components/icons"
import { getContent } from "@/content"
import { rich } from "@/lib/rich"

export function Customize() {
  const c = getContent()
  const t = c.customize
  return (
    <Section id="selbst-gestalten" tone="white" eyebrow={t.eyebrow} title={rich(t.title)} intro={t.intro}>
      <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        <BrowserFrame>
          <Media id="VIDEO_DRAGDROP" alt={c.media.VIDEO_DRAGDROP} />
        </BrowserFrame>
        <ul className="space-y-7">
          {t.points.map((p) => (
            <li key={p.title} className="flex gap-4">
              <IconTile className="mb-0 shrink-0">
                <Icon name={p.icon} />
              </IconTile>
              <div>
                <h3 className="font-serif text-[1.3rem] leading-tight tracking-tight">{p.title}</h3>
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
          <h3 className="font-serif text-[1.75rem] leading-tight tracking-tight text-balance md:text-[2.1rem]">
            {rich(t.trustee.title)}
          </h3>
          <p className="mt-4 leading-relaxed text-ink-muted">{t.trustee.text}</p>
        </div>
        <div className="overflow-hidden rounded-tile shadow-card">
          <Media id="IMG_MULTI_COMPANY" alt={c.media.IMG_MULTI_COMPANY} sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
      </Card>
    </Section>
  )
}
