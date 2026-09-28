import { Container, Media } from "@/components/ui"
import { Stars } from "@/components/stars"
import { cn } from "@/lib/utils"
import { marketplaceReviews } from "@/lib/links"
import type { SectionProps } from "./types"

const LOGOS = ["LOGO_1", "LOGO_2", "LOGO_3", "LOGO_4", "LOGO_5"] as const

export function Trust({ lang, dict }: SectionProps) {
  const t = dict.home.trust
  return (
    <section aria-labelledby="trust-title" className="border-y border-line bg-white py-10 md:py-12">
      <Container>
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
          <h2 id="trust-title" className="text-sm font-medium text-ink-muted">
            {t.title}
          </h2>
          <a
            href={marketplaceReviews(lang)}
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
        {/* Phones and small tablets: 4 logos (2×2 / 4 in a row), all 5 from 768px – always symmetric. */}
        <ul className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5 md:gap-6">
          {LOGOS.map((id, i) => (
            <li key={id} className={cn("overflow-hidden rounded-tile grayscale transition hover:grayscale-0", i === 4 && "max-md:hidden")}>
              <Media lang={lang} id={id} alt={dict.media[id]} fit="contain" sizes="200px" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
