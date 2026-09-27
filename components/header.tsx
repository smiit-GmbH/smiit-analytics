"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"
import { Container } from "@/components/ui"
import { CtaLink } from "@/components/cta-link"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Logo } from "@/components/logo"
import type { HeaderDict } from "@/lib/dictionary-slices"
import type { Locale } from "@/lib/i18n"
import { LINKS } from "@/lib/links"
import { NAV_SECTIONS, SECTIONS, routePath } from "@/lib/routes"
import { cn } from "@/lib/utils"

type HeaderProps = {
  lang: Locale
  /** Only the texts the header needs – it is a client component. */
  dict: HeaderDict
  /** Language links point to the home pages (404 page). */
  languageHomeOnly?: boolean
}

export function Header({ lang, dict, languageHomeOnly }: HeaderProps) {
  const { nav: t, common } = dict
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const toggleRef = React.useRef<HTMLButtonElement>(null)
  const items = NAV_SECTIONS.map((s) => ({ href: routePath(lang, "home", SECTIONS[s]), label: t.items[s] }))

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Esc closes the mobile menu and returns focus to the toggle.
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled || open ? "border-line bg-cream/90 backdrop-blur-md" : "border-transparent bg-cream",
      )}
    >
      <Container className="flex h-16 items-center gap-6 md:h-18">
        <Logo href={routePath(lang)} label={common.homeLabel} productName={common.productName} priority />

        <nav aria-label={t.label} className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-control px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-black/5 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <LanguageSwitcher lang={lang} t={dict.language} homeOnly={languageHomeOnly} className="hidden sm:block" />
          <a
            href={LINKS.login}
            data-track="header_login"
            className="hidden rounded-control px-3 py-2 text-sm font-medium text-ink/80 hover:bg-black/5 hover:text-ink sm:inline-flex"
          >
            {t.login}
          </a>
          <CtaLink externalHint={common.externalHint} href={LINKS.signup} track="header_signup" size="sm" className="hidden sm:inline-flex">
            {t.cta}
          </CtaLink>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 flex size-11 cursor-pointer items-center justify-center rounded-control text-ink hover:bg-black/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            <span className="sr-only">{open ? t.menuClose : t.menuOpen}</span>
          </button>
        </div>
      </Container>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-cream lg:hidden">
        <Container className="py-4">
          <nav aria-label={t.label}>
            <ul className="flex flex-col">
              {items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-control px-3 py-3 text-base font-medium text-ink hover:bg-black/5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <LanguageSwitcher
            lang={lang}
            t={dict.language}
            variant="inline"
            homeOnly={languageHomeOnly}
            className="mt-4 border-t border-line pt-4"
          />
          <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4">
            <CtaLink externalHint={common.externalHint} href={LINKS.signup} track="mobile_menu_signup" size="md" className="w-full">
              {t.cta}
            </CtaLink>
            <CtaLink externalHint={common.externalHint} href={LINKS.login} track="mobile_menu_login" variant="secondary" size="md" className="w-full">
              {t.login}
            </CtaLink>
          </div>
        </Container>
      </div>
    </header>
  )
}
