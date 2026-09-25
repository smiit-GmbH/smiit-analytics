import { Container, Media } from "@/components/ds"
import { getContent } from "@/content"

const LOGOS = ["LOGO_1", "LOGO_2", "LOGO_3", "LOGO_4", "LOGO_5"] as const

export function Trust() {
  const c = getContent()
  return (
    <section aria-labelledby="trust-title" className="border-y border-line bg-white py-10 md:py-12">
      <Container>
        <h2 id="trust-title" className="text-center text-sm font-medium text-ink-muted">
          {c.trust.title}
        </h2>
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
