// Google tag (gtag.js) configuration + consent helpers.
//
// Two products share a single gtag.js load: Google Ads (AW-, conversion
// tracking) and Google Analytics 4 (G-, website analytics).
//
// Consent is handled via Google Consent Mode v2: gtag.js loads on every page,
// but ad/analytics storage defaults to "denied" until the visitor opts in via
// the consent banner. Conversions may still be fired – when consent is denied,
// gtag sends cookieless pings for conversion modeling instead of setting cookies.

export const GA_ADS_ID = "AW-12345678901"

/** Google Analytics 4 measurement ID. */
export const GA4_ID = "G-AAAAAAAAAA"

/** Click-based conversion actions configured in the Google Ads account. */
export const CONVERSIONS = {
  mail: `${GA_ADS_ID}/fVCHCLWfys4ZELu1-8cq`,
  calendly: `${GA_ADS_ID}/W36pCLifys4ZELu1-8cq`,
  linkedin: `${GA_ADS_ID}/Au9ACLufys4ZELu1-8cq`,
} as const

export type ConversionName = keyof typeof CONVERSIONS

/** Versioned so we can re-prompt if the consent scope ever changes. */
export const CONSENT_STORAGE_KEY = "smiit-consent-v1"

/** Dispatched (e.g. from the footer link) to re-open the consent banner. */
export const COOKIE_SETTINGS_EVENT = "smiit:open-cookie-settings"

export type ConsentChoice = "granted" | "denied"

/** Re-open the consent banner so a visitor can change/withdraw their choice. */
export function openCookieSettings(): void {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))
}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    return value === "granted" || value === "denied" ? value : null
  } catch {
    return null
  }
}

export function setStoredConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice)
  } catch {
    /* storage unavailable (private mode, blocked) – ignore */
  }
}

/** Push a Consent Mode v2 update for all ad/analytics signals. */
export function updateConsent(granted: boolean): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  const value: ConsentChoice = granted ? "granted" : "denied"
  window.gtag("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  })
}

/** Fire a Google Ads conversion. Respects the current Consent Mode state. */
export function fireConversion(name: ConversionName): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  window.gtag("event", "conversion", { send_to: CONVERSIONS[name] })
}
