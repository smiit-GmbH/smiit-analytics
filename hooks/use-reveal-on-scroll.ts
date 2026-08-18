"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Custom hook that uses a native IntersectionObserver to detect when an element
 * enters the viewport. Unlike framer-motion's whileInView, this is compatible
 * with Lenis smooth scroll because it doesn't rely on framer-motion's internal
 * scroll tracking.
 *
 * Returns a ref to attach to the element and a boolean indicating visibility.
 * Once visible, the element stays visible (once: true behavior).
 */
export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>(
  options?: { margin?: string; threshold?: number }
) {
  const ref = useRef<T>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          observer.disconnect() // once: true
        }
      },
      {
        rootMargin: options?.margin ?? "-80px",
        threshold: options?.threshold ?? 0,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options?.margin, options?.threshold])

  return { ref, isRevealed }
}
