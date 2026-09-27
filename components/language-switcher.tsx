"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Check, ChevronDown, Globe } from "lucide-react"
import type { Dictionary } from "@/lib/dictionary"
import { HTML_LANG, locales, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type Props = {
  lang: Locale
  t: Dictionary["language"]
  /** "menu": dropdown (desktop header), "inline": row of links (mobile menu). */
  variant?: "menu" | "inline"
  /** Link every language to its home page instead of the current page (e.g. on the 404 page). */
  homeOnly?: boolean
  className?: string
}

/** Same page in another language: swaps the locale segment ("/de/privacy/" → "/fr/privacy/"). */
function pathFor(pathname: string, target: Locale, homeOnly?: boolean) {
  if (homeOnly) return `/${target}/`
  const rest = pathname.split("/").slice(2).join("/")
  return `/${target}/${rest}`
}

/** Keeps the section anchor when switching language on a long page. */
const keepHash = (e: React.MouseEvent<HTMLAnchorElement>) => {
  if (window.location.hash) e.currentTarget.hash = window.location.hash
}

/**
 * Language switcher with real links (crawlable, work without JavaScript,
 * `hreflang` set). The dropdown is a disclosure: button + list of links,
 * closes on Escape, outside click and focus leaving it.
 */
export function LanguageSwitcher({ lang, t, variant = "menu", homeOnly, className }: Props) {
  const pathname = usePathname() || `/${lang}/`
  const [open, setOpen] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const listId = React.useId()

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      setOpen(false)
      buttonRef.current?.focus()
    }
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointer)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointer)
    }
  }, [open])

  const links = locales.map((l) => ({
    code: l,
    href: pathFor(pathname, l, homeOnly),
    name: t.names[l],
    current: l === lang,
  }))

  if (variant === "inline") {
    return (
      <nav aria-label={t.label} className={className}>
        <ul className="flex flex-wrap gap-1">
          {links.map((l) => (
            <li key={l.code}>
              <a
                href={l.href}
                hrefLang={l.code}
                lang={HTML_LANG[l.code]}
                aria-current={l.current ? "true" : undefined}
                onClick={keepHash}
                data-track={`language_${l.code}`}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-control px-3 text-sm font-medium",
                  l.current ? "bg-navy text-white" : "text-ink/80 hover:bg-black/5 hover:text-ink",
                )}
              >
                {l.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  return (
    <div
      ref={rootRef}
      className={cn("relative", className)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false)
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-control px-2.5 text-sm font-medium text-ink/80 hover:bg-black/5 hover:text-ink"
      >
        <Globe className="size-4" aria-hidden="true" />
        <span aria-hidden="true">{lang.toUpperCase()}</span>
        <span className="sr-only">
          {t.label}. {t.current.replace("{language}", t.names[lang])}
        </span>
        <ChevronDown className={cn("size-3.5 opacity-60 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      <ul
        id={listId}
        hidden={!open}
        className="absolute right-0 top-full z-50 mt-2 w-44 rounded-card bg-white p-1.5 shadow-frame ring-1 ring-black/5"
      >
        {links.map((l) => (
          <li key={l.code}>
            <a
              href={l.href}
              hrefLang={l.code}
              lang={HTML_LANG[l.code]}
              aria-current={l.current ? "true" : undefined}
              onClick={keepHash}
              data-track={`language_${l.code}`}
              className={cn(
                "flex items-center justify-between gap-3 rounded-[0.6rem] px-3 py-2 text-sm",
                l.current ? "font-medium text-ink" : "text-ink/80 hover:bg-cream hover:text-ink",
              )}
            >
              {l.name}
              {l.current && <Check className="size-4 text-brand" aria-hidden="true" />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
