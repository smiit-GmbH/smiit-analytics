import * as React from "react"
import { cn } from "@/lib/utils"

type CardProps = React.ComponentProps<"div"> & {
  /** Lift slightly on hover — for cards that are links or invite interaction. */
  interactive?: boolean
  tone?: "white" | "sand" | "navy"
}

/** White rounded card with the soft smiit.de drop shadow. */
export function Card({ interactive, tone = "white", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-card p-6 sm:p-7",
        tone === "white" && "bg-white shadow-card",
        tone === "sand" && "bg-sand",
        tone === "navy" && "bg-navy-800 text-white ring-1 ring-white/10",
        interactive && "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover",
        className,
      )}
      {...props}
    />
  )
}

/** Square icon well used at the top of feature cards. */
export function IconTile({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "mb-5 flex size-11 items-center justify-center rounded-control bg-brand-soft text-brand [&_svg]:size-5",
        className,
      )}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("font-serif text-title tracking-tight", className)} {...props} />
}

export function CardText({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("mt-3 text-[0.95rem] leading-relaxed text-ink-muted", className)} {...props} />
}
