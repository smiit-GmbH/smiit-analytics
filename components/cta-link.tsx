import * as React from "react"
import type { VariantProps } from "class-variance-authority"
import { Button, buttonVariants } from "@/components/ui"
import { isExternal } from "@/lib/links"

export type CtaLinkProps = VariantProps<typeof buttonVariants> & {
  href: string
  /** Tracking id, rendered as data-track (e.g. "hero_signup"). */
  track: string
  /** Screen-reader hint for links that open in a new tab (`common.externalHint`). */
  externalHint: string
  className?: string
  children: React.ReactNode
}

/**
 * Link styled as a button. External links open in a new tab and get a
 * screen-reader hint. Works in server and client components.
 */
export function CtaLink({ href, track, externalHint, variant, size, className, children }: CtaLinkProps) {
  const external = isExternal(href)
  return (
    <Button asChild variant={variant} size={size} track={track} className={className}>
      <a href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
        {children}
        {external && <span className="sr-only"> {externalHint}</span>}
      </a>
    </Button>
  )
}
