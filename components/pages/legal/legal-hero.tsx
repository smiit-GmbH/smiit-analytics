import type { ReactNode } from "react"
import Image from "next/image"

/**
 * Shared hero band for all legal pages (privacy, legal notice, DPA, terms).
 * The page body is expected to overlap it via a negative top margin — see
 * `LegalSections` and the legal-notice page for the matching card wrapper.
 */
export function LegalHero({
  title,
  subtitle,
}: {
  title: ReactNode
  subtitle?: ReactNode
}) {
  return (
    <section className="relative isolate z-0 min-h-[300px] h-[42vh] sm:h-[48vh] md:h-[46vh] lg:h-[50vh] max-h-[560px] overflow-hidden rounded-b-[1.75rem] bg-black/[0.02] mb-2 sm:mb-4 md:mb-0">
      <div className="absolute inset-0">
        <Image
          src="/assets/legal.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden="true"
          className="object-cover object-[15%_35%] sm:object-[22%_35%] md:object-[40%_35%]"
        />
      </div>

      <div
        className={[
          "pointer-events-none absolute inset-0 z-[5]",
          "bg-gradient-to-r from-white/70 via-white/15 to-transparent",
        ].join(" ")}
      />

      <div className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-t from-black/12 via-black/4 to-transparent" />

      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.18] bg-black/10"
        style={{
          backgroundImage: "url(/assets/grain.webp)",
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
          mixBlendMode: "soft-light",
        }}
      />

      <div className="relative z-20 h-full flex items-end">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 sm:pb-14 md:pb-16 lg:pb-20">
          <h1 className="font-serif text-[2.35rem] sm:text-[2.8rem] md:text-[3.25rem] leading-[1.06] text-black tracking-tight">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 text-sm sm:text-base md:text-lg text-black/75 max-w-[60ch] leading-relaxed">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default LegalHero
