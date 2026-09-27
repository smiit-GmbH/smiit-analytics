import * as React from "react"
import { Highlight } from "@/components/ui/layout"

const MARK = /\*([^*]+)\*/g

/** Renders `*word*` in content strings as a brand-coloured highlight. */
export function rich(text: string): React.ReactNode {
  const parts = text.split(MARK)
  if (parts.length === 1) return text
  return parts.map((part, i) => (i % 2 === 1 ? <Highlight key={i}>{part}</Highlight> : part))
}

/** Same string without highlight markers — for meta tags, aria labels, JSON-LD. */
export function plain(text: string): string {
  return text.replace(MARK, "$1")
}
