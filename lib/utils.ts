import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge that knows the custom tokens from app/globals.css – otherwise
 * it would treat e.g. `text-title` as a colour and drop it next to `text-white`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['display', 'heading-lg', 'heading', 'title-lg', 'title', 'lead'] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
