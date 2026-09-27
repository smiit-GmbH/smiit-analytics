"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

/**
 * Segmented tab switcher. Radix provides the ARIA tab pattern:
 * arrow keys move between tabs, Home/End jump, Tab moves into the panel.
 */
export const Tabs = TabsPrimitive.Root

export function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex max-w-full gap-1 overflow-x-auto rounded-control bg-white p-1 shadow-card ring-1 ring-black/5",
        className,
      )}
      {...props}
    />
  )
}

export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-[0.6rem] px-4 text-sm font-medium text-ink-muted transition-colors",
        "hover:text-ink data-[state=active]:bg-navy data-[state=active]:text-white",
        "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        className,
      )}
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
