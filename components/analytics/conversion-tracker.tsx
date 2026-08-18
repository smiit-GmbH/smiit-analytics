"use client"

import { useEffect } from "react"
import { fireConversion } from "@/lib/gtag"

// Fires Google Ads click-conversions on the actual interaction (not on page
// load). Uses a single capture-phase document listener – mirroring the
// CalendlyHandler – so no individual link component needs to be touched.
export function ConversionTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      // Calendly: same trigger selector the CalendlyHandler listens for.
      if (target.closest('a[href*="#book"], [data-open-calendly="true"]')) {
        fireConversion("calendly")
        return
      }

      const link = target.closest("a")
      if (!link) return

      const href = link.getAttribute("href") ?? ""
      if (href.startsWith("mailto:")) {
        fireConversion("mail")
        return
      }
      if (href.includes("linkedin.com")) {
        fireConversion("linkedin")
      }
    }

    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])

  return null
}
