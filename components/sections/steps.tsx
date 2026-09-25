import { Media, Section } from "@/components/ds"
import type { MediaId } from "@/config/media"
import { getContent } from "@/content"
import { rich } from "@/lib/rich"

export function Steps() {
  const c = getContent()
  const t = c.steps
  return (
    <Section id="so-gehts" tone="white" eyebrow={t.eyebrow} title={rich(t.title)}>
      <ol className="grid gap-10 md:grid-cols-3 md:gap-6">
        {t.items.map((step, i) => {
          const media = step.media as MediaId
          return (
            <li key={step.title} className="flex flex-col">
              <div className="overflow-hidden rounded-tile bg-sand ring-1 ring-black/5">
                <Media id={media} alt={c.media[media]} sizes="(min-width: 768px) 33vw, 100vw" />
              </div>
              <div className="mt-6 flex items-baseline gap-4">
                <span aria-hidden="true" className="font-serif text-5xl leading-none text-magenta">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-serif text-[1.4rem] leading-tight tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{step.text}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
