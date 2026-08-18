"use client"

import { motion } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"

interface HeroSectionProps {
  dict: any
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function HeroSection({ dict }: HeroSectionProps) {
  const { hero } = dict.landing

  return (
    <section
      data-header-tone="dark"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden rounded-b-[1.75rem]"
      style={{ backgroundColor: "rgb(15 23 42)" }}
    >
      {/* Gradient overlays */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-[#1a2744]/80 via-transparent to-transparent" />
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#21569c]/15 rounded-full blur-[120px]" />

      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.12]"
        style={{
          backgroundImage: "url(/assets/grain.webp)",
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
          mixBlendMode: "soft-light",
        }}
      />

      <div className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.h1
            className="font-serif text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[1.05] tracking-tight text-white whitespace-pre-line"
            variants={fadeUpVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {hero.title}
          </motion.h1>

          <motion.p
            className="mt-6 md:mt-8 font-serif text-[1.5rem] sm:text-[2rem] md:text-[2.8rem] leading-[1.15] tracking-tight text-white/90"
            variants={fadeUpVariants}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {hero.subtitle}
          </motion.p>

          <motion.p
            className="mt-6 md:mt-8 text-base md:text-lg leading-relaxed text-white/60 max-w-[60ch] mx-auto"
            variants={fadeUpVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {hero.description}
          </motion.p>

          <motion.div
            className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            variants={fadeUpVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <a href="#pricing">
              <button className="group flex items-center gap-3 bg-[#21569c] hover:bg-[#21569c]/85 text-white px-7 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer">
                {hero.primaryCta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </a>
            <a href="#features">
              <button className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white px-7 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 backdrop-blur-sm cursor-pointer">
                {hero.secondaryCta}
              </button>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6 text-white/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
