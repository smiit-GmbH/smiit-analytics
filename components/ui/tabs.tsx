"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
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
export function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  const ref = React.useRef<HTMLDivElement>(null)
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
      ref={ref}
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

/** Keeps the selected tab fully visible in a scrolling tab bar. */
const reveal = (e: React.SyntheticEvent<HTMLButtonElement>) =>
  e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" })

export function TabsTrigger({ className, onClick, onFocus, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex h-10 shrink-0 cursor-pointer snap-start items-center gap-2 rounded-[0.6rem] px-4 text-sm font-medium text-ink-muted transition-colors",
        "hover:text-ink data-[state=active]:bg-navy data-[state=active]:text-white",
        "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset",
        className,
      )}
      onClick={(e) => {
        reveal(e)
        onClick?.(e)
      }}
      onFocus={(e) => {
        reveal(e)
        onFocus?.(e)
      }}
      {...props}
    />
  )
}

export function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "mt-8 outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 rounded-tile",
        "data-[state=active]:animate-in data-[state=active]:fade-in-0 motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  )
}
