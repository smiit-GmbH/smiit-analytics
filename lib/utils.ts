import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge that knows the custom `@theme` tokens from app/globals.css.
 * Without them it would treat e.g. `text-title` as a colour (and drop it next
 * to `text-white`) and keep both of `rounded-card rounded-xl`.
 * Keep these lists in sync with the tokens in globals.css.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "heading-lg", "heading", "title-lg", "title", "lead"],
      radius: ["card", "control", "tile"],
      shadow: ["card", "card-hover", "cta", "frame"],
      spacing: ["section", "section-sm"],
      container: ["page", "page-wide"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
