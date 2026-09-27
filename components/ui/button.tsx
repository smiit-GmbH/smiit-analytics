import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * smiit button. Mirrors smiit.de: blue filled primary with a soft blue glow,
 * black outline secondary that inverts on hover, rounded-xl corners.
 *
 * Every CTA should carry a `track` id — it is rendered as `data-track` so a
 * later analytics integration can bind to it without touching markup.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control font-medium transition-all duration-300 cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
  {
    variants: {
      variant: {
        primary: "bg-brand text-white shadow-cta hover:bg-brand-hover",
        secondary: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-white",
        ghost: "text-ink hover:bg-black/5",
        /** For use on navy backgrounds. */
        light: "bg-white text-navy hover:bg-cream",
        "outline-light": "border border-white/40 text-white hover:bg-white hover:text-navy",
        link: "text-brand underline-offset-4 hover:text-brand-hover hover:underline px-0",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
      },
    },
    // Text links sit flush with surrounding text: no size padding or fixed height.
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    /** Tracking id, rendered as data-track. */
    track?: string
  }

function Button({ className, variant, size, asChild = false, track, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-track={track}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
