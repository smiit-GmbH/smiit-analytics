import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Card, Section } from "@/components/ds"
import { Stars } from "@/components/stars"
import { LINKS } from "@/config/links"
import { getContent } from "@/content"
import { rich } from "@/lib/rich"

type Testimonial = ReturnType<typeof getContent>["testimonials"]["items"][number]

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
        <blockquote className="mt-1 flex-1 font-serif text-[1.2rem] leading-snug tracking-tight">{item.quote}</blockquote>
        <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
          {item.image ? (
            <Image src={item.image} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
          ) : (
            <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-full bg-sand font-mono text-xs font-semibold text-navy">
              {initials(item.name)}
            </span>
          )}
          <span className="text-sm">
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

export function Testimonials() {
  const c = getContent()
  const t = c.testimonials
  return (
    <Section id="kundenstimmen" tone="cream" eyebrow={t.eyebrow} title={rich(t.title)}>
      <ul className="grid gap-6 md:grid-cols-3">
        {t.items.map((item, i) => (
          <li key={i}>
            <TestimonialCard item={item} />
          </li>
        ))}
      </ul>
      <p className="mt-10 text-center">
        <a
          href={LINKS.marketplaceReviews}
          target="_blank"
          rel="noopener"
          data-track="testimonials_marketplace"
          className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-brand underline-offset-4 hover:underline"
        >
          <Stars />
          {t.reviewsLink}
          <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only"> {c.common.externalHint}</span>
        </a>
      </p>
    </Section>
  )
}
