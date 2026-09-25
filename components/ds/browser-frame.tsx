import * as React from "react"
import { cn } from "@/lib/utils"

export type FrameMarker = {
  /** Position in percent of the screenshot area (0–100). */
  x: number
  y: number
  /** Short callout text, e.g. "KPI per Drag & Drop". */
  label: string
  /** Which side of the dot the label sits on. */
  side?: "left" | "right"
}

type BrowserFrameProps = {
  children: React.ReactNode
  /** Shown in the fake address bar. */
  url?: string
  markers?: FrameMarker[]
  className?: string
}

/**
 * Uniform window chrome for all product screenshots and clips.
 * Optional numbered markers highlight UI elements; they are listed again
 * as an ordered list for screen readers.
 */
export function BrowserFrame({ children, url = "app.smiit-analytics", markers = [], className }: BrowserFrameProps) {
  return (
    <figure className={cn("overflow-hidden rounded-tile bg-white shadow-frame", className)}>
      <div className="flex items-center gap-3 border-b border-line bg-[#f7f7f4] px-4 py-2.5" aria-hidden="true">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#e5e5e0]" />
          <span className="size-2.5 rounded-full bg-[#e5e5e0]" />
          <span className="size-2.5 rounded-full bg-[#e5e5e0]" />
        </div>
        <div className="mx-auto w-full max-w-xs truncate rounded-md bg-white px-3 py-1 text-center font-mono text-[0.68rem] text-ink-muted ring-1 ring-line">
          {url}
        </div>
        <div className="w-10" />
      </div>
      <div className="relative">
        {children}
        {markers.map((m, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="pointer-events-none absolute flex -translate-y-1/2 items-center gap-2"
            style={{
              top: `${m.y}%`,
              ...(m.side === "left" ? { right: `${100 - m.x}%`, flexDirection: "row-reverse" } : { left: `${m.x}%` }),
            }}
          >
            <span className="relative flex size-6 -translate-x-1/2 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-magenta/40 motion-reduce:animate-none" />
              <span className="relative flex size-6 items-center justify-center rounded-full bg-magenta text-[0.7rem] font-semibold text-white ring-2 ring-white">
                {i + 1}
              </span>
            </span>
            <span className="hidden whitespace-nowrap rounded-lg bg-navy px-2.5 py-1 text-xs font-medium text-white shadow-card sm:inline">
              {m.label}
            </span>
          </div>
        ))}
      </div>
      {markers.length > 0 && (
        <figcaption className="sr-only">
          <ol>
            {markers.map((m, i) => (
              <li key={i}>{m.label}</li>
            ))}
          </ol>
        </figcaption>
      )}
    </figure>
  )
}
