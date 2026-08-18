"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

type FaqItem = { question: string; answer: string }

type FaqDict = {
  eyebrow: string
  heading: { lead: string; highlight: string }
  items: FaqItem[]
}

export default function FaqSection({
  dict,
  compact = false,
}: {
  dict: FaqDict
  /** Use when the previous section already provides spacing/visual reset (e.g. flowing on a light bg). Hides the eyebrow and reduces top padding. */
  compact?: boolean
}) {
  const heading = useRevealOnScroll()
  const items = useRevealOnScroll({ margin: "-60px" })

  const sectionPadding = compact
    ? "pt-2 pb-10 sm:pt-4 sm:pb-32"
    : "pt-10 pb-10 sm:pt-20 sm:pb-32"

  return (
    <section className={`relative bg-transparent ${sectionPadding}`}>
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-16 xl:gap-24">
          <div
            ref={heading.ref}
            className={`lg:sticky lg:top-28 lg:self-start reveal-fade-up ${heading.isRevealed ? "revealed" : ""}`}
          >
            {!compact && <span className="section-eyebrow">{dict.eyebrow}</span>}
            <h2 className="font-serif text-[2.2rem] sm:text-[2.6rem] md:text-[3rem] leading-[1.05] tracking-tight text-black">
              {dict.heading.lead}{" "}
              <span className="section-highlight">{dict.heading.highlight}</span>
            </h2>
          </div>

          <motion.div
            ref={items.ref}
            className={`reveal-fade-up ${items.isRevealed ? "revealed" : ""}`}
          >
            <Accordion type="single" collapsible className="w-full">
              {dict.items.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="border-b border-slate-200/70"
                >
                  <AccordionTrigger className="text-left font-serif text-[1.2rem] sm:text-[1.4rem] md:text-[1.5rem] leading-[1.3] tracking-tight text-[#0B162D] py-6 sm:py-7 hover:no-underline cursor-pointer [&>svg]:size-5 [&>svg]:translate-y-1.5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base sm:text-[1.05rem] leading-[1.65] text-black/70 pb-7 pr-2 max-w-[78ch]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
