"use client"

import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"
import { DEMO_REPORT_URL, FREE_VERSION_URL } from "@/lib/links"

interface PricingSectionProps {
  dict: any
}

export function PricingSection({ dict }: PricingSectionProps) {
  const { pricing } = dict.landing
  const section = useRevealOnScroll()

  return (
    <section
      ref={section.ref}
      data-header-tone="dark"
      id="pricing"
      className="relative py-20 md:py-28"
      style={{ backgroundColor: "rgb(15 23 42)" }}
    >
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.12]"
        style={{
          backgroundImage: "url(/assets/grain.webp)",
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
          mixBlendMode: "soft-light",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 max-w-3xl mx-auto reveal-fade-up ${section.isRevealed ? "revealed" : ""}`}
        >
          <h2 className="font-serif text-[2rem] sm:text-[2.8rem] md:text-[3.4rem] leading-[1.1] tracking-tight text-white whitespace-pre-line mb-6">
            {pricing.title}
          </h2>
          {pricing.subtitle && (
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              {pricing.subtitle}
            </p>
          )}
        </div>

        {/* Product card */}
        <div
          className={`max-w-[1200px] mx-auto rounded-[1.75rem] bg-white overflow-hidden shadow-[0_0_40px_rgba(33,86,156,0.15)] border border-[#21569c]/10 reveal-fade-up reveal-delay-2 ${section.isRevealed ? "revealed" : ""}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left: Product info */}
            <div className="p-6 md:p-8 lg:p-9 md:col-span-5 flex flex-col">
              <h3 className="font-serif text-[1.5rem] md:text-[1.8rem] leading-[1.2] tracking-tight text-black">
                {pricing.productTitle}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-black/55">
                {pricing.productDescription}
              </p>

              {/* Features */}
              <div className="mt-6 space-y-3">
                {pricing.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-5 w-5 text-[#21569c] flex-shrink-0" />
                    <span className="text-sm font-medium text-black/75">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action links */}
              <div className="mt-8 md:mt-10 space-y-3 md:mt-auto">
                <a
                  href={DEMO_REPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full gap-2 rounded-xl bg-[#21569c] px-4 py-3 text-sm font-medium text-white hover:bg-[#1a457d] transition-colors duration-200 shadow-sm"
                >
                  {pricing.demoLink}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="#book"
                    className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-black hover:bg-black/5 transition-colors duration-200"
                  >
                    {pricing.consultationLink}
                  </a>
                  <a
                    href={FREE_VERSION_URL}
                    download
                    className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-black hover:bg-black/5 transition-colors duration-200"
                  >
                    {pricing.freeVersionLink}
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Pricing + Screenshot */}
            <div className="p-6 md:p-8 lg:p-9 bg-slate-50/50 border-t md:border-t-0 md:border-l border-black/5 md:col-span-7 flex flex-col">
              {/* Dashboard preview */}
              <div className="relative rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] mb-8 border border-black/5">
                <div className="relative aspect-[16/10] md:aspect-[16/9]">
                  <Image
                    src="/assets/landing/sites.webp"
                    alt="smiit Analytics Dashboard"
                    fill
                    sizes="(min-width: 768px) 400px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Prices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-black/10 pt-4 mt-auto">
                <div>
                  <p className="text-[0.72rem] tracking-wide uppercase text-black/45">{pricing.priceOneTimeLabel}</p>
                  <p className="mt-1 text-[1.05rem] font-semibold text-black">{pricing.priceOneTime}</p>
                </div>
                <div>
                  <p className="text-[0.72rem] tracking-wide uppercase text-black/45">{pricing.priceCustomLabel}</p>
                  <p className="mt-1 text-[1.05rem] font-semibold text-black">{pricing.priceCustom}</p>
                  <p className="text-[0.72rem] text-black/45 mt-1">{pricing.priceCustomNote}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
