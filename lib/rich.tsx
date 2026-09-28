import * as React from "react"
import { Highlight } from "@/components/ui/layout"

const MARK = /\*([^*]+)\*/g
/** `[[privacy|Datenschutzerklärung]]` – a link to a page, by key (see `withLinks`). */
const LINK = /\[\[(\w+)\|([^\]]+)\]\]/g

/** Renders `*word*` in content strings as a brand-coloured highlight. */
export function rich(text: string): React.ReactNode {
  const parts = text.split(MARK)
  if (parts.length === 1) return text
  return parts.map((part, i) => (i % 2 === 1 ? <Highlight key={i}>{part}</Highlight> : part))
}

/**
 * Renders `[[key|label]]` in content strings as links; `hrefs` maps each key to
 * a URL (e.g. { privacy: "/de/privacy/" }). Unknown keys stay plain text.
 */
export function withLinks(text: string, hrefs: Record<string, string> = {}, className?: string): React.ReactNode {
  const parts = text.split(LINK)
  if (parts.length === 1) return text
  // split() with two capture groups: [text, key, label, text, key, label, …, text]
  const out: React.ReactNode[] = []
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) out.push(parts[i])
    const key = parts[i + 1]
    const label = parts[i + 2]
    if (key === undefined) continue
    out.push(
      hrefs?.[key] ? (
        <a key={i} href={hrefs[key]} className={className}>
          {label}
        </a>
      ) : (
        label
      ),
    )
  }
  return out
}

/** Same string without highlight or link markers — for meta tags, aria labels, JSON-LD. */
export function plain(text: string): string {
  return text.replace(MARK, "$1").replace(LINK, "$2")
}
