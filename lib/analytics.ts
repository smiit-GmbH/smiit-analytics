/**
 * Analytics is prepared but switched off. To activate:
 *  1. set `enabled: true` and fill in provider + id,
 *  2. load the provider script in components/analytics/index.tsx,
 *  3. if the provider sets cookies, keep `requiresConsent: true` so the
 *     consent banner (components/analytics/consent-banner.tsx) is shown first.
 *
 * All CTAs carry a `data-track="<id>"` attribute; the click listener in
 * components/analytics/track-clicks.tsx forwards them via lib/track.ts.
 */
export const ANALYTICS = {
  enabled: false,
  provider: "[ANALYTICS_PROVIDER]",
  id: "[ANALYTICS_ID]",
  requiresConsent: true,
} as const
