import { ANALYTICS } from "@/config/analytics"

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

const CONSENT_KEY = "smiit-analytics-consent"
export type Consent = "granted" | "denied"

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY)
    return v === "granted" || v === "denied" ? v : null
  } catch {
    return null
  }
}

export function writeConsent(value: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value)
  } catch {
    /* storage blocked — banner will ask again next visit */
  }
}

/**
 * Sends a tracking event. A no-op while analytics is disabled or consent is
 * missing. Currently pushes to `window.dataLayer`; adapt to your provider.
 */
export function track(event: string, props: Record<string, string> = {}) {
  if (!ANALYTICS.enabled) return
  if (ANALYTICS.requiresConsent && readConsent() !== "granted") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...props })
}
