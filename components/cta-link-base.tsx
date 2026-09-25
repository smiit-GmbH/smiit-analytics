import * as React from "react"
import type { VariantProps } from "class-variance-authority"
import { Button, buttonVariants } from "@/components/ds"
import { isExternal } from "@/config/links"

export type CtaLinkProps = VariantProps<typeof buttonVariants> & {
  href: string
  /** Tracking id, rendered as data-track (e.g. "hero_signup"). */
  track: string
  className?: string
  children: React.ReactNode
}

/**
 * Link styled as a button. External links open in a new tab and get a
 * screen-reader hint. Content-free so client components can use it
 * without pulling the text dictionary into the browser bundle.
 */
export function CtaLinkBase({ href, track, variant, size, className, children, externalHint }: CtaLinkProps & { externalHint: string }) {
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
