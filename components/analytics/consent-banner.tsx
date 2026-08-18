"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import type { Locale } from "@/lib/dictionary"
import {
  COOKIE_SETTINGS_EVENT,
  getStoredConsent,
  setStoredConsent,
  updateConsent,
} from "@/lib/gtag"

const COPY = {
  de: {
    text: "Wir setzen Cookies für Statistik und Marketing (Google Analytics & Google Ads) ein, um die Nutzung unserer Website und die Wirksamkeit unserer Werbung zu messen. Technisch notwendige Daten verarbeiten wir unabhängig davon. Näheres in unserer",
    privacy: "Datenschutzerklärung",
    accept: "Akzeptieren",
    decline: "Ablehnen",
    aria: "Cookie-Einwilligung",
  },
  en: {
    text: "We use cookies for analytics and marketing (Google Analytics & Google Ads) to measure how our website is used and the effectiveness of our advertising. Technically necessary data is processed regardless. More in our",
    privacy: "privacy policy",
    accept: "Accept",
    decline: "Decline",
    aria: "Cookie consent",
  },
} as const

export function ConsentBanner({ lang }: { lang: Locale }) {
  const [visible, setVisible] = useState(false)
  const t = COPY[lang === "en" ? "en" : "de"]

  useEffect(() => {
    if (!getStoredConsent()) setVisible(true)

    const reopen = () => setVisible(true)
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen)
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen)
  }, [])

  const decide = (granted: boolean) => {
    setStoredConsent(granted ? "granted" : "denied")
    updateConsent(granted)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label={t.aria}
      className="fixed bottom-3 right-3 z-[100] max-w-[17rem] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500 sm:right-4 sm:bottom-4 sm:max-w-sm"
    >
      <div className="rounded-2xl border border-white/10 bg-[#0B162D]/80 p-3.5 text-white shadow-2xl ring-1 ring-white/5 backdrop-blur-xl sm:p-5">
        <p className="text-[13px] leading-relaxed text-white/70 sm:text-sm">
          {t.text}{" "}
          <Link
            href={`/${lang}/privacy/`}
            className="text-white/90 underline underline-offset-2 transition-colors hover:text-white"
          >
            {t.privacy}
          </Link>
          .
        </p>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => decide(false)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            {t.decline}
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#0B162D] transition-colors hover:bg-white/90"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
