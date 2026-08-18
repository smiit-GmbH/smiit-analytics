"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Mail, MapPin, Phone } from "lucide-react"
import { openCookieSettings } from "@/lib/gtag"

export default function Footer({ forceLang }: { forceLang?: string }) {
  const pathname = usePathname() || "/"
  const detectedLang = pathname.startsWith("/en") ? "en" : "de"
  const lang = forceLang || detectedLang
  const base = `/${lang}`

  const L =
    lang === "de"
      ? {
          product: "Produkt",
          features: "Funktionen",
          pricing: "Preise",
          contact: "Kontakt",
          legalSection: "Rechtliches",
          contactSection: "Kontakt",
          rights: "Alle Rechte vorbehalten.",
          privacy: "Datenschutzerklärung",
          terms: "AGB",
          dpa: "Auftragsverarbeitung",
          imprint: "Impressum",
          cookieSettings: "Cookie-Einstellungen",
          companyName: "smiit GmbH",
          street: "Reiherweg 96",
          city: "89584 Ehingen",
          country: "Deutschland",
          companyBlurb:
            "smiit Analytics — Ihre Datenanalyse-Plattform mit KI. Ein Produkt der smiit GmbH.",
          mainSite: "smiit.de",
          emailValue: "kontakt@smiit.de",
          phoneValue: "+49 160 4073198",
          phoneHref: "tel:+491604073198",
        }
      : {
          product: "Product",
          features: "Features",
          pricing: "Pricing",
          contact: "Contact",
          legalSection: "Legal",
          contactSection: "Contact",
          rights: "All rights reserved.",
          privacy: "Privacy Policy",
          terms: "Terms of Service",
          dpa: "Data Processing Agreement",
          imprint: "Legal Notice",
          cookieSettings: "Cookie settings",
          companyName: "smiit GmbH",
          street: "Reiherweg 96",
          city: "89584 Ehingen",
          country: "Germany",
          companyBlurb:
            "smiit Analytics — your AI-powered data analytics platform. A product of smiit GmbH.",
          mainSite: "smiit.de",
          emailValue: "kontakt@smiit.de",
          phoneValue: "+49 160 4073198",
          phoneHref: "tel:+491604073198",
        }

  const homeHref = `${base}/`
  const contactHref = `${base}/contact`
  const imprintHref = `${base}/legal-notice`
  const privacyHref = `${base}/privacy`
  const dpaHref = `${base}/dpa`
  const termsHref = `${base}/terms`

  return (
    <footer className="bg-background py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <Link href={homeHref} aria-label="smiit Analytics" className="flex items-center">
                <Image src="/logo_black.webp" alt="smiit Analytics" width={70} height={28} priority />
              </Link>

              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/company/smiit-gmbh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/80 rounded-lg flex items-center justify-center hover:bg-white hover:shadow-xs transition-colors"
                  aria-label="smiit on LinkedIn"
                >
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            <p className="text-sm sm:text-md text-black leading-relaxed max-w-sm">
              {L.companyBlurb}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-black">{L.product}</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href={`${homeHref}#features`} className="text-sm text-gray-700 hover:text-black transition-colors">
                  {L.features}
                </a>
              </li>
              <li>
                <a href={`${homeHref}#pricing`} className="text-sm text-gray-700 hover:text-black transition-colors">
                  {L.pricing}
                </a>
              </li>
              <li>
                <Link href={contactHref} className="text-sm text-gray-700 hover:text-black transition-colors">
                  {L.contact}
                </Link>
              </li>
              <li>
                <a
                  href={`https://www.smiit.de/${lang}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 hover:text-black transition-colors"
                >
                  {L.mainSite}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-black">{L.legalSection}</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link href={termsHref} className="text-sm text-gray-700 hover:text-black transition-colors">
                  {L.terms}
                </Link>
              </li>
              <li>
                <Link href={dpaHref} className="text-sm text-gray-700 hover:text-black transition-colors">
                  {L.dpa}
                </Link>
              </li>
              <li>
                <Link href={privacyHref} className="text-sm text-gray-700 hover:text-black transition-colors">
                  {L.privacy}
                </Link>
              </li>
              <li>
                <Link href={imprintHref} className="text-sm text-gray-700 hover:text-black transition-colors">
                  {L.imprint}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-black">{L.contactSection}</h3>
            <ul className="space-y-3 md:space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a
                  href={`mailto:${L.emailValue}`}
                  className="hover:text-black transition-colors"
                >
                  {L.emailValue}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href={L.phoneHref} className="hover:text-black transition-colors">
                  {L.phoneValue}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>
                  {L.companyName}
                  <br />
                  {L.street}
                  <br />
                  {L.city}
                  <br />
                  {L.country}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-700">© {new Date().getFullYear()} {L.companyName}. {L.rights}</p>
          <div className="flex flex-wrap gap-6 md:flex-nowrap justify-center md:justify-start w-full md:w-auto">
            <Link href={imprintHref} className="text-sm text-gray-700 hover:text-black transition-colors">
              {L.imprint}
            </Link>
            <Link href={privacyHref} className="text-sm text-gray-700 hover:text-black transition-colors">
              {L.privacy}
            </Link>
            <button
              type="button"
              onClick={openCookieSettings}
              className="text-sm text-gray-700 hover:text-black transition-colors"
            >
              {L.cookieSettings}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
