import { ANALYTICS } from "@/config/analytics"
import { getContent } from "@/content"
import { ConsentBanner } from "./consent-banner"
import { TrackClicks } from "./track-clicks"

/**
 * Analytics entry point, mounted once in app/layout.tsx.
 * Renders nothing while `ANALYTICS.enabled` is false.
 *
 * To activate: enable it in config/analytics.ts and add the provider's
 * script here (e.g. via next/script, loaded only after consent).
 */
export function Analytics() {
  if (!ANALYTICS.enabled) return null
  return (
    <>
      {ANALYTICS.requiresConsent && <ConsentBanner t={getContent().consent} />}
      <TrackClicks />
      {/* [ANALYTICS_SCRIPT] – provider script goes here */}
    </>
  )
}
