import * as React from "react"
import { cn } from "@/lib/utils"

/** Centered page-width wrapper with the standard 20px / 32px gutters. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-page px-5 md:px-8", className)} {...props} />
}

type Tone = "cream" | "white" | "sand" | "navy"

const toneClass: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  white: "bg-white text-ink",
  sand: "bg-sand text-ink",
  navy: "bg-navy text-white [&_.hl]:text-brand-light",
}

type SectionProps = Omit<React.ComponentProps<"section">, "title"> & {
  tone?: Tone
  eyebrow?: React.ReactNode
  title?: React.ReactNode
  intro?: React.ReactNode
  align?: "left" | "center"
  /** Pass false to render children edge-to-edge without a Container. */
  contained?: boolean
}

/**
 * Page section with the smiit editorial header: uppercase eyebrow with a
 * leading hairline, Playfair headline, short intro paragraph.
 * The section is labelled by its heading for screen readers.
 */
export function Section({
  tone = "cream",
  eyebrow,
  title,
  intro,
  align = "left",
  contained = true,
  className,
  children,
  id,
  ...props
}: SectionProps) {
  const headingId = id ? `${id}-title` : undefined
  const dark = tone === "navy"
  const header = (eyebrow || title || intro) && (
    <header className={cn("mb-10 md:mb-14 max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em]",
            dark ? "text-white/80" : "text-brand",
          )}
        >
          {eyebrow}
        </p>
      )}
      {title && (
        <h2
          id={headingId}
          className="font-serif text-[2.1rem] leading-[1.08] tracking-tight text-balance sm:text-[2.6rem] md:text-[3.1rem]"
        >
          {title}
        </h2>
      )}
      {intro && (
        <p className={cn("mt-5 text-base leading-relaxed md:text-lg", dark ? "text-white/75" : "text-ink-muted")}>
          {intro}
        </p>
      )}
    </header>
  )
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn("scroll-mt-20 py-section-sm md:py-section", toneClass[tone], className)}
      {...props}
    >
      {contained ? (
        <Container>
          {header}
          {children}
        </Container>
      ) : (
        <>
          {header && <Container>{header}</Container>}
          {children}
        </>
      )}
    </section>
  )
}

/**
 * Accent word inside a headline, in brand blue (smiit.de "section-highlight").
 * Dark surfaces switch it to brand-light via the `.hl` hook for contrast.
 */
export function Highlight({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("hl text-brand", className)} {...props} />
}
