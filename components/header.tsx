"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { AlignJustify, Globe, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/language-switcher"

/** The landing page opens on a dark hero, so the header starts in its light variant there. */
const LANDING_ROOT = /^\/(de|en)\/?$/

export default function Header({ forceLang, darkHero: darkHeroProp }: { forceLang?: string; darkHero?: boolean }) {
  const [onDarkBg, setOnDarkBg] = useState(false)
  const navRef = useRef<HTMLElement | null>(null)
  const pathname = usePathname() || "/"
  const detectedLang = pathname.startsWith("/en") ? "en" : "de"
  const lang = forceLang || detectedLang
  const base = `/${lang}`

  const darkHero = darkHeroProp ?? LANDING_ROOT.test(pathname)

  useEffect(() => {
    if (!darkHero) {
      setOnDarkBg(false)
      return
    }

    const detectTone = () => {
      const x = Math.round(window.innerWidth / 2)
      const y = 24
      const elements = document.elementsFromPoint(x, y)

      const toneEl = elements.find((el) => {
        const node = el as HTMLElement
        if (navRef.current?.contains(node)) return false
        return Boolean(node.dataset?.headerTone)
      }) as HTMLElement | undefined

      setOnDarkBg(toneEl?.dataset?.headerTone === "dark")
    }

    detectTone()
    window.addEventListener("scroll", detectTone, { passive: true })
    window.addEventListener("resize", detectTone)

    return () => {
      window.removeEventListener("scroll", detectTone)
      window.removeEventListener("resize", detectTone)
    }
  }, [darkHero])

  function buildPathForLang(currentPathname: string, target: "de" | "en"): string {
    if (currentPathname === "/" || currentPathname === "") {
      return `/${target}/`
    }

    if (currentPathname.startsWith("/de/") || currentPathname === "/de") {
      return currentPathname.replace(/^\/de(\/|$)/, `/${target}/`)
    }
    if (currentPathname.startsWith("/en/") || currentPathname === "/en") {
      return currentPathname.replace(/^\/en(\/|$)/, `/${target}/`)
    }

    return `/${target}${currentPathname.endsWith("/") ? "" : "/"}`
  }

  const L =
    lang === "de"
      ? {
          home: "Start",
          features: "Funktionen",
          pricing: "Preise",
          talkToExpert: "Kontaktieren Sie uns",
        }
      : {
          home: "Home",
          features: "Features",
          pricing: "Pricing",
          talkToExpert: "Talk to a data expert",
        }

  const homeHref = `${base}/`
  const contactHref = `${base}/contact`

  // Anchors resolve on the landing page; from a sub-page they need the home path in front.
  const onLanding = LANDING_ROOT.test(pathname)
  const anchor = (hash: string) => (onLanding ? `#${hash}` : `${homeHref}#${hash}`)

  const sectionLinks = [
    { href: anchor("features"), label: L.features },
    { href: anchor("pricing"), label: L.pricing },
  ]

  const isLightHeader = darkHero && onDarkBg
  const textColor = isLightHeader ? "text-white" : "text-black"
  const textColorMuted = isLightHeader ? "text-white/80" : "text-black/80"
  const navBg = "bg-transparent backdrop-blur-md"

  return (
    <nav
      ref={navRef}
      aria-label={lang === "de" ? "Hauptnavigation" : "Main navigation"}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Logo */}
          <Link href={homeHref} className="flex items-center relative group" scroll={false}>
            <Image
              src={isLightHeader ? "/logo_white.webp" : "/logo_black.webp"}
              alt="smiit Analytics"
              width={140}
              height={48}
              className="h-11 lg:h-12 w-auto object-contain"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={homeHref}
              className={`px-5 text-sm font-medium ${textColor} ${isLightHeader ? "hover:text-white/70" : "hover:text-black/70"} transition-colors cursor-pointer`}
              scroll={false}
            >
              {L.home}
            </Link>

            {sectionLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-5 text-sm font-medium ${textColor} ${isLightHeader ? "hover:text-white/70" : "hover:text-black/70"} transition-colors cursor-pointer`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <Link href={contactHref} scroll={false} className="hidden lg:block">
              <Button className="bg-[#F703EB] hover:bg-[#DE02D2] text-white rounded-md px-3 py-2 font-medium text-sm tracking-tight cursor-pointer shadow-none border-none">
                {L.talkToExpert}
              </Button>
            </Link>
            <div className="px-2 hidden lg:block">
              <LanguageSwitcher light={isLightHeader} />
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <a
                href="#book"
                aria-label={L.talkToExpert}
                className={`h-8.5 w-8.5 rounded-lg border border-[#F703EB] bg-[#F703EB]/85 backdrop-blur-md flex items-center justify-center shadow-sm`}
              >
                <CalendarDays className={`h-4 w-4 text-white`} />
              </a>

              <Sheet>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    aria-label="Open menu"
                    className={`h-8.5 w-8.5 rounded-lg border ${isLightHeader ? "border-white/20 bg-white/8" : "border-black/15 bg-white/55"} backdrop-blur-md flex items-center justify-center shadow-sm`}
                  >
                    <AlignJustify className={`h-4 w-4 ${textColorMuted}`} />
                  </button>
                </SheetTrigger>

                <SheetContent side="right" className="bg-white/95 backdrop-blur-md border-black/10 gap-[clamp(0.5rem,1.6vh,1rem)]">
                  <SheetHeader className="px-4 pt-[clamp(0.625rem,2vh,1rem)] pb-[clamp(0.5rem,1.6vh,1rem)]">
                    <SheetTitle>{lang === "de" ? "Menü" : "Menu"}</SheetTitle>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-black/50">
                        <Globe className="h-4 w-4" />
                        <span>{lang === "de" ? "Sprache" : "Language"}</span>
                      </div>

                      <div className="inline-flex items-center rounded-full border border-black/10 bg-black/[0.04] p-1">
                        {([
                          { code: "de" as const, label: "DE" },
                          { code: "en" as const, label: "EN" },
                        ] as const).map((l) => {
                          const active = l.code === lang

                          return (
                            <SheetClose asChild key={l.code}>
                              <Link
                                href={buildPathForLang(pathname, l.code)}
                                scroll={false}
                                aria-current={active ? "page" : undefined}
                                className={[
                                  "inline-flex h-8 min-w-12 items-center justify-center rounded-full px-3 text-xs font-semibold transition-all duration-200",
                                  active
                                    ? "bg-white text-black shadow-sm ring-1 ring-black/5"
                                    : "text-black/60 hover:text-black hover:bg-white/50",
                                ].join(" ")}
                              >
                                {l.label}
                              </Link>
                            </SheetClose>
                          )
                        })}
                      </div>
                    </div>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto px-4 pb-[clamp(0.625rem,1.8vh,1rem)]">
                    <div className="space-y-[clamp(0.5rem,3.5vh,1.75rem)]">
                      <div>
                        <p className="text-sm font-semibold text-black">{lang === "de" ? "Startseite" : "Homepage"}</p>
                        <div className="mt-[clamp(0.25rem,1.6vh,0.75rem)] space-y-1">
                          <SheetClose asChild>
                            <Link
                              href={homeHref}
                              scroll={false}
                              className="block rounded-xl px-3 py-[clamp(0.4rem,1.2vh,0.5rem)] text-sm text-black/80 hover:bg-black/[0.04]"
                            >
                              {L.home}
                            </Link>
                          </SheetClose>

                          {sectionLinks.map((item) => (
                            <SheetClose asChild key={item.label}>
                              <a
                                href={item.href}
                                className="block rounded-xl px-3 py-[clamp(0.4rem,1.2vh,0.5rem)] text-sm text-black/80 hover:bg-black/[0.04]"
                              >
                                {item.label}
                              </a>
                            </SheetClose>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <SheetFooter className="px-4 pb-[clamp(0.625rem,1.8vh,1rem)] pt-[clamp(0.5rem,1.4vh,0.75rem)]">
                    <SheetClose asChild>
                      <Link href={contactHref} scroll={false}>
                        <Button className="w-full bg-[#F703EB] hover:bg-[#DE02D2] text-white rounded-md px-3 py-[clamp(0.4rem,1.2vh,0.5rem)] font-medium text-sm tracking-tight cursor-pointer shadow-none border-none">
                          {L.talkToExpert}
                        </Button>
                      </Link>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
