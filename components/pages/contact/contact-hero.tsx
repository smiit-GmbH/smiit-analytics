interface ContactHeroProps {
  dict: any
  lang: string
}

export default function ContactHero({ dict, lang }: ContactHeroProps) {
  const c = dict.contact

  return (
    <div className="flex flex-col items-start w-full">
      <h1 className="font-serif text-[2.2rem] sm:text-[3.15rem] lg:text-[3rem] xl:text-[3.4rem] leading-tight text-black">
        {c.titlePrefix}
        <span className="text-[#F703EB] inline-block relative isolate z-0 mx-1.5 sm:mx-2">
          {c.titleHighlight}
          <svg
            className="pointer-events-none absolute w-full h-2 sm:h-3 -bottom-0.5 sm:-bottom-1 left-0 text-[#F703EB]/45 z-[-1]"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
          >
            <path
              d="M0 5 Q 50 10 100 5"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </span>
        {c.titleSuffix}
      </h1>

      <p className="mt-4 lg:mt-6 text-sm sm:text-base lg:text-lg text-black/75 max-w-[50ch] leading-relaxed">
        {c.subtitle}
      </p>
    </div>
  )
}
