"use client"

import { ArrowRight } from "lucide-react"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

interface ProcessSectionProps {
  dict: any
}

export function ProcessSection({ dict }: ProcessSectionProps) {
  const { process, cta } = dict.landing
  const heading = useRevealOnScroll()
  const steps = useRevealOnScroll()
  const ctaSection = useRevealOnScroll()

  return (
    <section
      className="relative py-20 md:py-28"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={heading.ref}
          className={`text-center mb-12 md:mb-16 reveal-fade-up ${heading.isRevealed ? "revealed" : ""}`}
        >
          <h2 className="font-serif text-[2rem] sm:text-[2.8rem] md:text-[3.4rem] leading-[1.1] tracking-tight text-black">
            {process.title}
          </h2>
        </div>

        {/* Steps grid */}
        <div
          ref={steps.ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {process.steps.map(
            (step: { number: string; title: string; text: string }, idx: number) => (
              <div
                key={idx}
                className={`p-8 md:p-10 bg-white rounded-[1.75rem] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 reveal-fade-up reveal-delay-${idx + 1} ${steps.isRevealed ? "revealed" : ""}`}
              >
                <span className="text-[2.5rem] md:text-[3rem] font-serif leading-none text-[#F703EB]/40">
                  {step.number}
                </span>
                <h3 className="mt-3 text-lg md:text-xl font-semibold text-black">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-black/55">
                  {step.text}
                </p>
              </div>
            )
          )}
        </div>

        <div
          ref={ctaSection.ref}
          className={`mt-18 md:mt-26 text-center reveal-fade-up ${ctaSection.isRevealed ? "revealed" : ""}`}
        >
          <h2 className="font-serif text-[2rem] sm:text-[2.8rem] md:text-[3.4rem] leading-[1.1] tracking-tight text-black whitespace-pre-line max-w-[22ch] mx-auto">
            {cta.title}
          </h2>

          <div className="mt-8 md:mt-10">
            <a href="#book">
              <button className="group flex items-center gap-3 mx-auto bg-[#21569c] hover:bg-[#1a457d] text-white px-7 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 shadow-[0_14px_28px_rgba(33,86,156,0.20)] cursor-pointer">
                {cta.button}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
