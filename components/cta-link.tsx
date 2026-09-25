import { CtaLinkBase, type CtaLinkProps } from "@/components/cta-link-base"
import { getContent } from "@/content"

/** Server-side CTA link; fills in the localized external-link hint. */
export function CtaLink(props: CtaLinkProps) {
  return <CtaLinkBase {...props} externalHint={getContent().common.externalHint} />
}
