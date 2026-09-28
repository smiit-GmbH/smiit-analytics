"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type Chapter = { id: string; label: string }

/** Vertical distance between two chapter dots – shrinks on low windows so the rail always fits. */
const STEP = "min(34px, 5.6vh)"
const at = (k: number) => `calc(${STEP} * ${k})`

/*
 * Clip paths of the two colour layers, in rail coordinates (px). The labels
 * overflow the (zero-width) rail to the right, so the horizontal bounds are
 * generous. `limit` = top of the footer: nothing below it is ever drawn.
 */
const X0 = -48
const X1 = 480
const HIDDEN = "inset(50% 50%)"
const rect = (top: number, bottom: number) => `${X0}px ${top}px, ${X1}px ${top}px, ${X1}px ${bottom}px, ${X0}px ${bottom}px`

/** Light layer: everything above `limit`, minus the dark band. */
function lightClip(limit: number, band: { top: number; bottom: number } | null) {
  if (limit <= -48) return HIDDEN
  const outer = rect(-48, limit)
  if (!band || band.top >= limit) return `polygon(${outer})`
  return `polygon(evenodd, ${outer}, ${X0}px -48px, ${rect(band.top, Math.min(band.bottom, limit))}, ${X0}px ${band.top}px)`
}

/** Dark layer: only the band over a navy section, above `limit`. */
function darkClip(limit: number, band: { top: number; bottom: number } | null) {
  if (!band) return HIDDEN
  const bottom = Math.min(band.bottom, limit)
  return bottom > band.top ? `polygon(${rect(band.top, bottom)})` : HIDDEN
}

/**
 * Reading progress of the home page, split into chapters.
 *
 * - From 1280px: a thin rail at the left edge. The line fills continuously
 *   while scrolling; each chapter owns one segment. Passed dots turn blue,
 *   the current one grows slightly. From 1440px (where the margin is wide
 *   enough) every chapter is named next to the rail (very short names), the
 *   current one highlighted; below that the names appear on hover / keyboard focus.
 *   Every dot links to its chapter.
 * - Below 1280px: a 2px progress line at the top edge of the screen.
 *
 * Over dark (navy) sections the rail is drawn in light colours. It is rendered
 * twice – a light layer and a dark-surface layer – and each layer is clipped to
 * its own surface, so the colour change follows the section edge pixel by pixel,
 * even when the edge runs through the middle of the rail.
 *
 * The rail is shown from the start of the first chapter through the closing
 * call to action, until its own bottom would reach the footer; it is also
 * clipped at the footer in every frame – so even when scrolling fast it never
 * shows over the footer. It fades in calmly and out quickly.
 */
export function ChapterRail({ chapters, label }: { chapters: Chapter[]; label: string }) {
  // progress: 0 … n-1 (chapter index + fraction)
  const [state, setState] = React.useState({ progress: 0, visible: false, page: 0 })
  const listRef = React.useRef<HTMLOListElement>(null)
  const darkRef = React.useRef<HTMLOListElement>(null)
  const n = chapters.length

  React.useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      const els = chapters.map((c) => document.getElementById(c.id))
      if (els.some((el) => !el)) return
      const vh = window.innerHeight
      // Reading line: a third down the viewport.
      const line = vh * 0.35
      const tops = els.map((el) => el!.getBoundingClientRect().top)
      const end = els[n - 1]!.getBoundingClientRect().bottom
      const bounds = [...tops, end]
      let progress = 0
      if (line >= end) progress = n - 1
      else if (line > tops[0]) {
        const i = bounds.findIndex((b, k) => line >= b && line < bounds[k + 1])
        const fraction = (line - bounds[i]) / (bounds[i + 1] - bounds[i])
        // Last chapter: fill up to its own dot, then hold.
        progress = Math.min(n - 1, i + (i < n - 1 ? fraction : 0))
      }
      const rail = listRef.current?.getBoundingClientRect()
      // Starts once the first chapter has scrolled up to just below the header and
      // stays through the closing call to action; it ends before the rail itself
      // would reach the footer.
      const footerTop = document.querySelector("footer")?.getBoundingClientRect().top ?? end
      const railBottom = rail && rail.height ? rail.bottom : vh * 0.75
      const visible = tops[0] <= vh * 0.18 && footerTop > railBottom + 24
      const doc = document.documentElement
      const page = Math.min(1, Math.max(0, window.scrollY / Math.max(1, doc.scrollHeight - vh)))
      setState((s) =>
        Math.abs(s.progress - progress) < 0.001 && s.visible === visible && Math.abs(s.page - page) < 0.001 ? s : { progress, visible, page },
      )

      // Clips are written straight to the DOM in this frame (no React round trip),
      // so even very fast scrolling never shows the rail over the footer.
      const light = listRef.current
      const dark = darkRef.current
      if (!rail || !rail.height || !light || !dark) return
      let band: { top: number; bottom: number } | null = null
      for (const section of document.querySelectorAll<HTMLElement>("section.bg-navy")) {
        const r = section.getBoundingClientRect()
        const top = Math.max(r.top, rail.top - 48) - rail.top
        const bottom = Math.min(r.bottom, rail.bottom + 48) - rail.top
        if (bottom > top) {
          band = { top: Math.round(top), bottom: Math.round(bottom) }
          break
        }
      }
      const limit = Math.round(Math.min(footerTop, window.innerHeight) - rail.top)
      light.style.clipPath = lightClip(limit, band)
      dark.style.clipPath = darkClip(limit, band)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      cancelAnimationFrame(frame)
    }
  }, [chapters, n])

  const current = Math.min(n - 1, Math.floor(state.progress + 0.001))
  const fill = n > 1 ? state.progress / (n - 1) : 0
  const layer = { chapters, progress: state.progress, current, fill }

  return (
    <>
      {/* Phones & tablets: thin reading-progress line at the top edge */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 xl:hidden">
        <div className="h-full origin-left bg-brand/80" style={{ transform: `scaleX(${state.page})` }} />
      </div>

      {/* Desktop: chapter rail at the left edge */}
      <nav
        aria-label={label}
        className={cn(
          "group/rail fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity motion-reduce:transition-none xl:block min-[1440px]:left-5 3xl:left-8",
          state.visible ? "opacity-100 duration-500" : "pointer-events-none opacity-0 duration-150",
        )}
      >
        {/* Light surfaces: the interactive layer */}
        <ol ref={listRef} className="relative" style={{ height: `calc(${at(n - 1)} + 12px)` }}>
          <RailLayer {...layer} dark={false} />
        </ol>
        {/* Dark surfaces: same rail in light colours, only where it lies over a navy section */}
        <ol
          ref={darkRef}
          aria-hidden="true"
          inert
          className="pointer-events-none absolute left-0 top-0 [clip-path:inset(50%_50%)]"
          style={{ height: `calc(${at(n - 1)} + 12px)` }}
        >
          <RailLayer {...layer} dark />
        </ol>
      </nav>
    </>
  )
}

type LayerProps = {
  chapters: Chapter[]
  progress: number
  current: number
  fill: number
  /** Colours for a dark surface; the dark layer is decorative only (no links). */
  dark: boolean
}

/** Track, fill, dots and names of the rail in one colour scheme. */
function RailLayer({ chapters, progress, current, fill, dark }: LayerProps) {
  const n = chapters.length
  return (
    <>
      {/* Track and fill, centred on the dots */}
      <span aria-hidden="true" className={cn("absolute left-[5px] top-1.5 w-px", dark ? "bg-white/20" : "bg-ink/10")} style={{ height: at(n - 1) }} />
      <span
        aria-hidden="true"
        className={cn("absolute left-[5px] top-1.5 w-px origin-top", dark ? "bg-brand-light" : "bg-brand")}
        style={{ height: at(n - 1), transform: `scaleY(${fill})` }}
      />
      {chapters.map((c, i) => {
        const reached = i <= progress + 0.001
        const isCurrent = i === current
        const Item = dark ? "span" : "a"
        return (
          <li key={c.id} className="absolute left-0" style={{ top: at(i) }}>
            <Item
              {...(dark
                ? {}
                : { href: `#${c.id}`, "aria-current": isCurrent ? ("location" as const) : undefined, "data-track": `rail_${c.id}` })}
              className="group/item flex items-center gap-2 rounded-full outline-none"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "block size-[11px] shrink-0 rounded-full border transition-all duration-500 motion-reduce:transition-none",
                  reached
                    ? dark
                      ? "border-brand-light bg-brand-light"
                      : "border-brand bg-brand"
                    : dark
                      ? "border-white/30 bg-navy"
                      : "border-ink/20 bg-cream",
                  isCurrent ? "scale-100" : "scale-[0.73]",
                  isCurrent && (dark ? "shadow-[0_0_0_4px_rgba(143,180,230,0.18)]" : "shadow-[0_0_0_4px_rgba(33,86,156,0.12)]"),
                  "group-hover/item:scale-100 group-focus-visible/item:ring-2 group-focus-visible/item:ring-brand group-focus-visible/item:ring-offset-2",
                )}
              />
              <span
                className={cn(
                  "-my-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[0.72rem] leading-tight transition-opacity duration-500 motion-reduce:transition-none",
                  // Below 1440px: names only on hover / focus, on a pill above the content.
                  "opacity-0 shadow-sm ring-1 group-hover/rail:opacity-100 group-focus-within/rail:opacity-100",
                  dark ? "bg-navy-800/95 ring-white/10" : "bg-cream/95 ring-black/5",
                  // From 1440px: every chapter named; the current one stands out, the others stay quiet.
                  "min-[1440px]:bg-transparent min-[1440px]:opacity-100 min-[1440px]:shadow-none min-[1440px]:ring-0",
                  isCurrent ? cn("font-medium", dark ? "text-white" : "text-ink") : dark ? "text-white/50" : "text-ink/45",
                )}
              >
                {c.label}
              </span>
            </Item>
          </li>
        )
      })}
    </>
  )
}
