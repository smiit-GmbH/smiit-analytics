import { Media, Section } from "@/components/ui"
import type { MediaId } from "@/lib/media"
import { SECTIONS } from "@/lib/routes"
import { rich } from "@/lib/rich"
import type { SectionProps } from "./types"

export function Audiences({ lang, dict }: SectionProps) {
  const t = dict.home.audiences
  return (
    <Section id={SECTIONS.audiences} tone="white" eyebrow={t.eyebrow} title={rich(t.title)}>
      <ul className="grid gap-6 lg:grid-cols-3">
        {t.items.map((item) => {
          const media = item.media as MediaId
          return (
            <li key={item.title} className="overflow-hidden rounded-card bg-cream md:max-lg:grid md:max-lg:grid-cols-2 md:max-lg:items-center">
              <Media lang={lang} id={media} alt={dict.media[media]} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 45vw, 100vw" />
              <div className="p-6 sm:p-7 md:max-lg:px-8">
                <h3 className="font-serif text-title tracking-tight">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">{item.text}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
