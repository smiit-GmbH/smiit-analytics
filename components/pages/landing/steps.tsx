import { Media, Section } from "@/components/ui"
import type { MediaId } from "@/lib/media"
import { SECTIONS } from "@/lib/routes"
import { rich } from "@/lib/rich"
import type { SectionProps } from "./types"

export function Steps({ lang, dict }: SectionProps) {
  const t = dict.home.steps
  return (
    <Section id={SECTIONS.howItWorks} tone="white" eyebrow={t.eyebrow} title={rich(t.title)}>
      <ol className="grid gap-10 md:gap-8 lg:grid-cols-3 lg:gap-6">
        {t.items.map((step, i) => {
          const media = step.media as MediaId
          return (
            <li key={step.title} className="flex flex-col md:max-lg:grid md:max-lg:grid-cols-[1.1fr_1fr] md:max-lg:items-center md:max-lg:gap-8">
              <div className="overflow-hidden rounded-tile bg-sand ring-1 ring-black/5">
                <Media lang={lang} id={media} alt={dict.media[media]} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 45vw, 100vw" />
              </div>
              {/* Phones: step text first, then its image; from 768px the image leads. */}
              <div className="flex items-baseline gap-4 max-md:order-first max-md:mb-5 md:mt-6 md:max-lg:mt-0">
                <span aria-hidden="true" className="font-serif text-5xl leading-none text-magenta">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-serif text-title tracking-tight">{step.title}</h3>
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
