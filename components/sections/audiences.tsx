import { Media, Section } from "@/components/ds"
import type { MediaId } from "@/config/media"
import { getContent } from "@/content"
import { rich } from "@/lib/rich"

export function Audiences() {
  const c = getContent()
  const t = c.audiences
  return (
    <Section id="fuer-wen" tone="white" eyebrow={t.eyebrow} title={rich(t.title)}>
      <ul className="grid gap-6 md:grid-cols-3">
        {t.items.map((item) => {
          const media = item.media as MediaId
          return (
            <li key={item.title} className="overflow-hidden rounded-card bg-cream">
              <Media id={media} alt={c.media[media]} sizes="(min-width: 768px) 33vw, 100vw" />
              <div className="p-6 sm:p-7">
                <h3 className="font-serif text-[1.4rem] leading-tight tracking-tight">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">{item.text}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
