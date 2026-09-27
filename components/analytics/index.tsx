import { ANALYTICS } from "@/lib/analytics"
import type { Dictionary } from "@/lib/dictionary"
import { ConsentBanner } from "./consent-banner"
import { TrackClicks } from "./track-clicks"

/**
 * Analytics entry point, mounted once in app/[lang]/layout.tsx.
 * Renders nothing while `ANALYTICS.enabled` is false.
 *
 * To activate: enable it in lib/analytics.ts and add the provider's
 * script here (e.g. via next/script, loaded only after consent).
 */
export function Analytics({ t, privacyHref }: { t: Dictionary["consent"]; privacyHref: string }) {
  if (!ANALYTICS.enabled) return null
  return (
    <>
      {ANALYTICS.requiresConsent && <ConsentBanner t={t} privacyHref={privacyHref} />}
      <TrackClicks />
      {/* [ANALYTICS_SCRIPT] – provider script goes here */}
    </>
  )
}
