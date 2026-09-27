import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        /** Neutral pill, as on smiit.de tags. */
        neutral: "border-black/15 bg-white/70 text-ink",
        brand: "border-brand/20 bg-brand-soft text-brand",
        accent: "border-magenta/30 bg-magenta-soft text-navy",
        onDark: "border-white/20 bg-white/10 text-white",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
)

export function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
