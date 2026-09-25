"use client"

import * as React from "react"
import { track } from "@/lib/track"

/** Forwards clicks on any element with `data-track` to lib/track.ts. */
export function TrackClicks() {
  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]")
      if (el?.dataset.track) track("cta_click", { id: el.dataset.track })
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])
  return null
}
