"use client"

import * as React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ds"
import type { SiteContent } from "@/content"

/**
 * FAQ accordion. Opens the matching question when the URL hash points at it
 * (e.g. the "Wie funktioniert das?" link to #faq-mcp).
 */
export function FaqList({ items }: { items: SiteContent["faq"]["items"] }) {
  const [open, setOpen] = React.useState<string>("")

  React.useEffect(() => {
    const sync = () => {
      const id = window.location.hash.slice(1)
      if (items.some((item) => item.id === id)) setOpen(id)
    }
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [items])

  return (
    <Accordion
      type="single"
      collapsible
      value={open}
      onValueChange={setOpen}
      className="mx-auto max-w-3xl rounded-card bg-white px-6 shadow-card sm:px-8"
    >
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id} id={item.id} className="scroll-mt-24">
          <AccordionTrigger data-track={`faq_${item.id}`}>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
