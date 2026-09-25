"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"
import { Container } from "@/components/ds"
import { CtaLinkBase } from "@/components/cta-link-base"
import { Logo } from "@/components/site/logo"
import { LINKS } from "@/config/links"
import type { SiteContent } from "@/content"
import { cn } from "@/lib/utils"

type HeaderProps = {
  nav: SiteContent["nav"]
  common: SiteContent["common"]
}

export function Header({ nav: t, common }: HeaderProps) {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const toggleRef = React.useRef<HTMLButtonElement>(null)

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
        <Logo label={common.homeLabel} productName={common.productName} priority />

        <nav aria-label={t.label} className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {t.items.map((item) => (
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
          <a
            href={LINKS.login}
            data-track="header_login"
            className="hidden rounded-control px-3 py-2 text-sm font-medium text-ink/80 hover:bg-black/5 hover:text-ink sm:inline-flex"
          >
            {t.login}
          </a>
          <CtaLinkBase externalHint={common.externalHint} href={LINKS.signup} track="header_signup" size="sm" className="hidden sm:inline-flex">
            {t.cta}
          </CtaLinkBase>
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
              {t.items.map((item) => (
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
          <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4">
            <CtaLinkBase externalHint={common.externalHint} href={LINKS.signup} track="mobile_menu_signup" size="md" className="w-full">
              {t.cta}
            </CtaLinkBase>
            <CtaLinkBase externalHint={common.externalHint} href={LINKS.login} track="mobile_menu_login" variant="secondary" size="md" className="w-full">
              {t.login}
            </CtaLinkBase>
          </div>
        </Container>
      </div>
    </header>
  )
}
