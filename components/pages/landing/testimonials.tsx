import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Card, Section } from "@/components/ui"
import { Stars } from "@/components/stars"
import { marketplaceReviews } from "@/lib/links"
import { SECTIONS } from "@/lib/routes"
import type { Dictionary } from "@/lib/dictionary"
import { rich } from "@/lib/rich"
import type { SectionProps } from "./types"

type Testimonial = Dictionary["home"]["testimonials"]["items"][number]

function initials(name: string) {
  return name
    .replace(/[[\]]/g, "")
    .split(/[\s_]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
}

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <Card className="flex h-full flex-col">
      <figure className="flex h-full flex-col">
        <span aria-hidden="true" className="font-serif text-[3rem] leading-none text-magenta/40">
          “
        </span>
        <blockquote className="mt-1 flex-1 font-serif text-[1.125rem] leading-snug tracking-tight">{item.quote}</blockquote>
        <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
          {item.image ? (
            <Image src={item.image} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
          ) : (
            <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-full bg-sand font-mono text-xs font-semibold text-navy">
              {initials(item.name)}
            </span>
          )}
          <span className="min-w-0 text-sm [overflow-wrap:anywhere]">
            <span className="block font-medium text-ink">{item.name}</span>
            <span className="block text-ink-muted">
              {item.role}, {item.company}
            </span>
          </span>
        </figcaption>
      </figure>
    </Card>
  )
}

export function Testimonials({ lang, dict }: SectionProps) {
  const t = dict.home.testimonials
  return (
    <Section id={SECTIONS.testimonials} tone="cream" eyebrow={t.eyebrow} title={rich(t.title)}>
      <ul className="grid gap-6 md:grid-cols-3">
        {t.items.map((item, i) => (
          <li key={i}>
            <TestimonialCard item={item} />
          </li>
        ))}
      </ul>
      <p className="mt-10 text-center">
        <a
          href={marketplaceReviews(lang)}
          target="_blank"
          rel="noopener"
          data-track="testimonials_marketplace"
          className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-brand underline-offset-4 hover:underline"
        >
          <Stars />
          {t.reviewsLink}
          <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only"> {dict.common.externalHint}</span>
        </a>
      </p>
    </Section>
  )
}
