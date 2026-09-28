"use client"

import * as React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui"
import { faqAnchor } from "@/lib/routes"
import { withLinks } from "@/lib/rich"

/**
 * FAQ accordion. Opens the matching question when the URL hash points at it
 * (e.g. the "How does it work?" link to #faq-mcp).
 */
type FaqItem = { id: string; question: string; answer: string }

/** `hrefs`: targets of `[[key|label]]` links in the answers (e.g. privacy, terms). */
export function FaqList({ items, hrefs }: { items: FaqItem[]; hrefs: Record<string, string> }) {
  const [open, setOpen] = React.useState<string>("")

  React.useEffect(() => {
    const sync = () => {
      const id = window.location.hash.slice(1)
      if (items.some((item) => faqAnchor(item.id) === id)) setOpen(id)
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
        <AccordionItem key={item.id} value={faqAnchor(item.id)} id={faqAnchor(item.id)} className="scroll-mt-24">
          <AccordionTrigger data-track={`faq_${item.id}`}>{item.question}</AccordionTrigger>
          <AccordionContent>{withLinks(item.answer, hrefs, "font-medium text-brand underline underline-offset-4 hover:no-underline")}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
