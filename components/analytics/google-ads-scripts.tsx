"use client"

import Script from "next/script"
import { GA_ADS_ID, GA4_ID, CONSENT_STORAGE_KEY } from "@/lib/gtag"

// Inline bootstrap: sets up the dataLayer, declares the default consent state
// (everything denied) BEFORE the config command, then restores a previously
// granted choice from localStorage. The external gtag.js library processes the
// queued commands once it loads, so ordering between the two scripts is safe.
const initScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
try {
  if (window.localStorage.getItem('${CONSENT_STORAGE_KEY}') === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', '${GA_ADS_ID}');
gtag('config', '${GA4_ID}');
`

export function GoogleAdsScripts() {
  return (
    <>
      <Script id="gtag-init" strategy="afterInteractive">
        {initScript}
      </Script>
      <Script
        id="gtag-js"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ADS_ID}`}
        strategy="afterInteractive"
      />
    </>
  )
}
