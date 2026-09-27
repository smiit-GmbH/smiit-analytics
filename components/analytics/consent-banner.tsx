"use client"

import * as React from "react"
import { Button } from "@/components/ui"
import type { Dictionary } from "@/lib/dictionary"
import { readConsent, writeConsent, type Consent } from "@/lib/track"

/**
 * Placeholder consent banner. Only rendered when analytics is enabled and
 * requires consent (see lib/analytics.ts). Text: [CONSENT_TEXT] in lib/dictionary.ts.
 */
export function ConsentBanner({
  t,
  privacyHref,
  onDecision,
}: {
  t: Dictionary["consent"]
  privacyHref: string
  onDecision?: (c: Consent) => void
}) {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    setVisible(readConsent() === null)
  }, [])

  if (!visible) return null

  const decide = (c: Consent) => {
    writeConsent(c)
    setVisible(false)
    onDecision?.(c)
  }

  return (
    <div
      role="region"
      aria-label={t.label}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-card bg-white p-5 shadow-frame sm:inset-x-6 sm:bottom-6"
    >
      <p className="text-sm leading-relaxed text-ink">
        {t.text}{" "}
        <a href={privacyHref} className="text-brand underline underline-offset-4">
          {t.more}
        </a>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" onClick={() => decide("granted")} track="consent_accept">
          {t.accept}
        </Button>
        <Button size="sm" variant="secondary" onClick={() => decide("denied")} track="consent_decline">
          {t.decline}
        </Button>
      </div>
    </div>
  )
}
