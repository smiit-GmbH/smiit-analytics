import * as React from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

/** Current setting, for event handlers (e.g. the `behavior` of a scroll call). */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(QUERY).matches
}

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener("change", onChange)
  return () => mq.removeEventListener("change", onChange)
}

/**
 * True when the visitor asked for reduced motion; follows changes live.
 * The static HTML assumes motion is fine (false); components mounted after
 * hydration get the real value on their first render.
 */
export function useReducedMotion() {
  return React.useSyncExternalStore(subscribe, prefersReducedMotion, () => false)
}
