"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

interface AdvantagesSectionProps {
  dict: any
}

export function AdvantagesSection({ dict }: AdvantagesSectionProps) {
  const { advantages } = dict.landing
  const [expandedCards, setExpandedCards] = useState<number[]>([])
  const heading = useRevealOnScroll()
  const cards = useRevealOnScroll()

  const toggleCard = (idx: number) => {
    setExpandedCards((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    )
  }

  return (
    <section
      className="relative py-20 md:py-28"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={heading.ref}
          className={`mb-12 md:mb-16 reveal-fade-up ${heading.isRevealed ? "revealed" : ""}`}
        >
          <h2 className="font-serif text-[2rem] sm:text-[2.8rem] md:text-[3.4rem] leading-[1.1] tracking-tight text-black whitespace-pre-line">
            {advantages.title}
          </h2>
        </div>

        <div
          ref={cards.ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {advantages.items.map(
            (item: { label: string; title: string; text: string; details?: string }, idx: number) => {
              const isExpanded = expandedCards.includes(idx)

              return (
                <div
                  key={idx}
                  className={`group relative overflow-hidden rounded-[1.75rem] p-6 md:p-8 transition-all duration-300 ease-out will-change-transform hover:scale-[1.02] hover:-translate-y-0.5 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] reveal-fade-up reveal-delay-${idx + 1} ${cards.isRevealed ? "revealed" : ""}`}
                >
                  <p className="text-xs font-medium tracking-wide mb-4 text-black/40">
                    {item.label}
                  </p>

                  <h3 className="font-serif text-[1.4rem] md:text-[1.6rem] leading-[1.2] tracking-tight mb-4 text-[#21569c]">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-black/60">{item.text}</p>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                      marginTop: isExpanded ? 10 : 0,
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm leading-relaxed text-black/65">{item.details ?? ""}</p>
                  </motion.div>

                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => toggleCard(idx)}
                      className="inline-flex items-center text-sm font-medium transition-colors duration-200 text-black/60 hover:text-black"
                    >
                      {isExpanded ? advantages.learnLess : advantages.learnMore}
                      <ArrowRight
                        className={`ml-1.5 h-4 w-4 transition-transform duration-200 ${
                          isExpanded ? "rotate-270" : "rotate-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )
            }
          )}
        </div>
      </div>
    </section>
  )
}
