import type { Locale } from "@/lib/dictionary"
import { GoogleAdsScripts } from "./google-ads-scripts"
import { ConversionTracker } from "./conversion-tracker"
import { ConsentBanner } from "./consent-banner"

// Bundles Google Ads tracking: gtag.js + Consent Mode v2, click-conversion
// tracking, and the opt-in consent banner.
export function Analytics({ lang }: { lang: Locale }) {
  return (
    <>
      <GoogleAdsScripts />
      <ConversionTracker />
      <ConsentBanner lang={lang} />
    </>
  )
}
