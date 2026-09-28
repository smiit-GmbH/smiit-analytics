import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Centered page-width wrapper. Gutters grow with the device (16 → 40px);
 * the content width grows from 1280px to 1472px on wide screens (≥ 1800px).
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8 xl:px-10 3xl:max-w-page-wide", className)} {...props} />
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
    <header className={cn("mb-9 md:mb-12 max-w-3xl", align === "center" && "mx-auto text-center")}>
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
          className="font-serif text-heading tracking-tight text-balance"
        >
          {title}
        </h2>
      )}
      {intro && (
        <p className={cn("mt-4 text-lead", dark ? "text-white/75" : "text-ink-muted")}>
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
