"use client"

import * as React from "react"
import Lenis from "lenis"
import { usePathname } from "next/navigation"
import { useReducedMotion } from "@/lib/use-reduced-motion"

/**
 * Damped wheel / trackpad scrolling (Lenis), same settings as the smiit
 * website. Touch keeps native scrolling (`syncTouch` off). Not started when
 * the visitor prefers reduced motion – then `useLenis()` is null and every
 * caller falls back to the browser's own scrolling.
 *
 * Lenis drives the real window scroll position, so native scroll events,
 * IntersectionObserver and CSS `scroll-margin` keep working.
 */
const LenisContext = React.createContext<Lenis | null>(null)

export function useLenis() {
  return React.useContext(LenisContext)
}

/**
 * Runs `onScroll` once right away and then on every scroll frame – via Lenis
 * when it runs, otherwise on native scroll events. Pass a stable callback.
 */
export function useScrollListener(onScroll: () => void) {
  const lenis = useLenis()
  React.useEffect(() => {
    onScroll()
    if (lenis) {
      lenis.on("scroll", onScroll)
      return () => lenis.off("scroll", onScroll)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [lenis, onScroll])
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = React.useState<Lenis | null>(null)
  const reducedMotion = useReducedMotion()

  React.useEffect(() => {
    if (reducedMotion) return
    const instance = new Lenis({
      duration: 0.8, // short follow-through, no long animation tails
      easing: (t: number) => 1 - Math.pow(1 - t, 4), // ease-out quart
      smoothWheel: true,
      autoRaf: true, // Lenis' own RAF loop – do not build a second one
      wheelMultiplier: 0.9, // slightly slower wheel → calmer feel
      touchMultiplier: 0.8,
      infinite: false,
    })
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hands the external instance to the context once
    setLenis(instance)
    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [reducedMotion])

  useAnchorLinks(lenis)

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

/**
 * Same-page anchor links (header nav, chapter rail, "#faq-…", skip link) glide
 * to their target with Lenis instead of jumping. The header offset comes from
 * the target's `scroll-margin-top` (e.g. `scroll-mt-20` on sections), which
 * Lenis honours just like the browser does.
 *
 * Once arrived, the hash is set the native way: the browser is already at the
 * target, so nothing moves, but history, `:target`, `hashchange` (opens FAQ
 * items) and the keyboard focus starting point behave as with a plain link.
 */
function useAnchorLinks(lenis: Lenis | null) {
  React.useEffect(() => {
    if (!lenis) return
    const onClick = (e: MouseEvent) => {
      // A stopped Lenis (open modal) ignores scrollTo – leave the link to the browser.
      if (lenis.isStopped || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element | null)?.closest?.("a[href]")
      if (!(link instanceof HTMLAnchorElement) || (link.target && link.target !== "_self") || link.hasAttribute("download")) return
      const url = new URL(link.href)
      if (!url.hash || url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search) return
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { onComplete: () => (location.hash = url.hash) })
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [lenis])
}

/**
 * Client-side page changes start at the top, or at the section in the hash.
 * The first render is skipped: on a full page load the browser has already
 * restored the scroll position or jumped to the hash.
 */
export function ScrollToTop() {
  const pathname = usePathname()
  const lenis = useLenis()
  const lenisRef = React.useRef(lenis)
  const first = React.useRef(true)

  React.useEffect(() => {
    lenisRef.current = lenis
  }, [lenis])

  React.useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const instance = lenisRef.current
    const hash = window.location.hash.slice(1)
    if (!hash) {
      if (instance) instance.scrollTo(0, { immediate: true })
      else window.scrollTo({ top: 0, behavior: "instant" })
      return
    }
    const timer = window.setTimeout(() => {
      const el = document.getElementById(decodeURIComponent(hash))
      if (!el) return
      if (instance) instance.scrollTo(el, { immediate: true })
      else el.scrollIntoView({ behavior: "instant" })
    }, 100)
    return () => window.clearTimeout(timer)
  }, [pathname])

  return null
}
