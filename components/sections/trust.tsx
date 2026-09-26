import { Container, Media } from "@/components/ds"
import { Stars } from "@/components/stars"
import { LINKS } from "@/config/links"
import { getContent } from "@/content"

const LOGOS = ["LOGO_1", "LOGO_2", "LOGO_3", "LOGO_4", "LOGO_5"] as const

export function Trust() {
  const c = getContent()
  const t = c.trust
  return (
    <section aria-labelledby="trust-title" className="border-y border-line bg-white py-10 md:py-12">
      <Container>
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
          <h2 id="trust-title" className="text-sm font-medium text-ink-muted">
            {t.title}
          </h2>
          <a
            href={LINKS.marketplaceReviews}
            target="_blank"
            rel="noopener"
            data-track="trust_rating"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-cream"
          >
            <Stars />
            <span>
              <strong className="font-semibold">{t.rating.value}</strong> {t.rating.label}
              <span className="sr-only"> {t.rating.srLabel}</span>
            </span>
          </a>
        </div>
        <ul className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-6">
          {LOGOS.map((id) => (
            <li key={id} className="overflow-hidden rounded-tile grayscale transition hover:grayscale-0">
              <Media id={id} alt={c.media[id]} fit="contain" sizes="200px" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
