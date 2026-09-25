import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

/** Five filled stars, decorative — pair with a text label. */
export function Stars({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-flex gap-0.5 text-star", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-current" />
      ))}
    </span>
  )
}
