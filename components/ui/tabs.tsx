"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { prefersReducedMotion } from "@/lib/use-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Segmented tab switcher. Radix provides the ARIA tab pattern:
 * arrow keys move between tabs, Home/End jump, Tab moves into the panel.
 */
export const Tabs = TabsPrimitive.Root

/**
 * Tab bar in one row. When the tabs do not fit (phones), the bar scrolls
 * horizontally without a visible scrollbar; a soft fade at the cut-off edge
 * shows that there is more.
 */
export function TabsList({ className, ref: forwardedRef, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  const ref = React.useRef<HTMLDivElement>(null)
  // The bar measures itself through `ref`; a ref passed by the consumer gets the same element.
  const setRef = React.useCallback(
    (el: HTMLDivElement | null) => {
      ref.current = el
      if (typeof forwardedRef === "function") return forwardedRef(el)
      if (forwardedRef) forwardedRef.current = el
    },
    [forwardedRef],
  )
  const [fade, setFade] = React.useState({ start: false, end: false })

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      setFade({ start: el.scrollLeft > 8, end: el.scrollLeft < max - 8 })
    }
    update()
    el.addEventListener("scroll", update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener("scroll", update)
      ro.disconnect()
    }
  }, [])

  const mask =
    fade.start && fade.end
      ? "[mask-image:linear-gradient(to_right,transparent,black_2rem,black_calc(100%-2rem),transparent)]"
      : fade.end
        ? "[mask-image:linear-gradient(to_right,black_calc(100%-2.5rem),transparent)]"
        : fade.start
          ? "[mask-image:linear-gradient(to_right,transparent,black_2.5rem)]"
          : ""

  return (
    <TabsPrimitive.List
      ref={setRef}
      className={cn(
        "inline-flex max-w-full snap-x scroll-px-1 gap-1 overflow-x-auto overscroll-x-contain rounded-control bg-white p-1 shadow-card ring-1 ring-black/5",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        mask,
        className,
      )}
      {...props}
    />
  )
}

/**
 * Keeps the focused tab fully visible in a scrolling tab bar. Scrolls only the
 * bar itself – scrollIntoView() would also move the page vertically.
 */
const reveal = (e: React.SyntheticEvent<HTMLButtonElement>) => {
  const tab = e.currentTarget.getBoundingClientRect()
  const list = e.currentTarget.parentElement
  if (!list) return
  const rect = list.getBoundingClientRect()
  const pad = 4 // the bar's p-1, so the tab does not touch the edge
  const left = rect.left + pad
  const right = rect.right - pad
  const delta = tab.left < left ? tab.left - left : tab.right > right ? tab.right - right : 0
  if (delta) list.scrollBy({ left: delta, behavior: prefersReducedMotion() ? "auto" : "smooth" })
}

export function TabsTrigger({ className, onClick, onFocus, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex h-10 shrink-0 cursor-pointer snap-start items-center gap-2 rounded-[0.6rem] px-4 text-sm font-medium text-ink-muted transition-colors",
        "hover:text-ink data-[state=active]:bg-navy data-[state=active]:text-white",
        "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset",
        className,
      )}
      {...props}
      onClick={(e) => {
        reveal(e)
        onClick?.(e)
      }}
      onFocus={(e) => {
        reveal(e)
        onFocus?.(e)
      }}
    />
  )
}

export function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "mt-8 rounded-tile outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4",
        "data-[state=active]:animate-in data-[state=active]:fade-in-0 motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  )
}
