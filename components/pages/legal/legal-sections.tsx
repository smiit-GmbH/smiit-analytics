import type { ReactNode } from "react"

export type LegalSection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
  subsections?: { label: string; paragraphs: string[] }[]
}

/**
 * Renders a numbered legal document as the white card that overlaps `LegalHero`.
 * Paragraphs starting with an "E-Mail:" / "Telefon:" label (or their English
 * equivalents) are turned into `mailto:` / `tel:` links automatically.
 */
export function LegalSections({
  sections,
  email,
  phone,
  children,
}: {
  sections: LegalSection[]
  email: string
  phone: string
  /** Optional trailing content inside the card, e.g. a "last updated" line. */
  children?: ReactNode
}) {
  return (
    <section className="relative z-30 py-0 md:py-0">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-30 -mt-6 sm:-mt-8 md:-mt-10 lg:-mt-12 rounded-[1.75rem] border border-black/10 bg-white shadow-xl ring-1 ring-black/5 p-6 sm:p-8 md:p-10">
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-serif text-xl md:text-3xl text-black tracking-tight">
                  {section.title}
                </h2>

                <div className="text-sm mt-4 space-y-3 text-black/80 leading-relaxed">
                  {section.paragraphs?.map((text) => {
                    const isEmailLine = text.startsWith("E-Mail:") || text.startsWith("Email:")
                    const isPhoneLine = text.startsWith("Telefon:") || text.startsWith("Phone:")

                    if (isEmailLine) {
                      return (
                        <p key={text}>
                          {text.split(":")[0]}:{" "}
                          <a className="underline" href={`mailto:${email}`}>
                            {email}
                          </a>
                        </p>
                      )
                    }

                    if (isPhoneLine) {
                      return (
                        <p key={text}>
                          {text.split(":")[0]}:{" "}
                          <a className="underline" href={`tel:${phone.replace(/\s+/g, "")}`}>
                            {phone}
                          </a>
                        </p>
                      )
                    }

                    return <p key={text}>{text}</p>
                  })}

                  {section.subsections?.map((sub) => (
                    <div key={sub.label} className="pt-1">
                      <p className="font-medium text-black">{sub.label}</p>
                      <div className="mt-2 space-y-3">
                        {sub.paragraphs.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                      </div>
                    </div>
                  ))}

                  {section.bullets && section.bullets.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {section.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>

          {children}
        </div>
      </div>
    </section>
  )
}

export default LegalSections
