import type { Metadata } from "next"
import type { Locale } from "@/lib/dictionary"
import { buildPageMetadata } from "@/lib/seo"
import { LegalHero } from "@/components/pages/legal/legal-hero"

export async function generateStaticParams() {
  return [{ lang: "de" }, { lang: "en" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  return buildPageMetadata({
    lang,
    path: "legal-notice",
    title: {
      de: "smiit Analytics – Impressum",
      en: "smiit Analytics – Legal notice",
    },
    description: {
      de: "Impressum der smiit GmbH: Anschrift, Geschäftsführer, Handelsregister und Verantwortliche gemäß §5 TMG.",
      en: "Legal notice of smiit GmbH: company address, managing director, commercial register and responsible parties under §5 TMG.",
    },
  })
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isDe = lang === "de"

  const L = isDe
    ? {
        title: "Impressum",
        subtitle: "Angaben gemäß § 5 TMG",
        contact: "Kontakt",
        representedBy: "Vertreten durch",
        register: "Handelsregister",
        vatId: "Umsatzsteuer-ID",
        responsible: "Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)",
        dispute: "Streitschlichtung",
        consumerDispute:
          "Wir sind nicht verpflichtet, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen und nehmen daran nicht teil.",
      }
    : {
        title: "Legal notice",
        subtitle: "Information pursuant to Section 5 German Telemedia Act (TMG)",
        contact: "Contact",
        representedBy: "Represented by",
        register: "Commercial register",
        vatId: "VAT ID",
        responsible: "Responsible for content (Sec. 18(2) MStV)",
        dispute: "Dispute resolution",
        consumerDispute:
          "We are not obliged to participate in dispute resolution proceedings before a consumer arbitration board and do not participate.",
      }

  return (
    <main className="min-h-screen">
      <LegalHero title={L.title} subtitle={L.subtitle} />

      <section className="relative z-30 py-0 md:py-0">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-30 -mt-6 sm:-mt-8 md:-mt-10 lg:-mt-12 rounded-[1.75rem] border border-black/10 bg-white shadow-xl ring-1 ring-black/5 p-6 sm:p-8 md:p-10">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="font-serif text-xl md:text-3xl text-black tracking-tight">smiit GmbH</h2>
                <address className="not-italic text-sm mt-4 text-black/80 leading-relaxed">
                  Reiherweg 96
                  <br />
                  89584 Ehingen
                  <br />
                  Deutschland
                </address>
              </div>

              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-black/70">{L.contact}</h3>
                <address className="not-italic text-sm mt-4 space-y-2 text-black/80 block">
                  <p>
                    Telefon: <a className="underline" href="tel:+491604073198">+49 160 4073198</a>
                  </p>
                  <p>
                    Mail: <a className="underline" href="mailto:kontakt@smiit.de">kontakt@smiit.de</a>
                  </p>
                </address>
              </div>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-black/70">{L.representedBy}</h3>
                <p className="text-sm mt-4 text-black/80 leading-relaxed">
                  {isDe ? "Geschäftsführer" : "Managing directors"}: Sebastian Grab, Noah Neßlauer
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-black/70">{L.register}</h3>
                <p className="text-sm mt-4 text-black/80 leading-relaxed">
                  {isDe ? "Amtsgericht Ulm, HRB 741965" : "Local Court (Amtsgericht) Ulm, HRB 741965"}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-black/70">{L.vatId}</h3>
                  <p className="text-sm mt-4 text-black/80 leading-relaxed">DE357299821</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-black/70">{L.responsible}</h3>
                  <address className="not-italic text-sm mt-4 text-black/80 leading-relaxed">
                    Noah Neßlauer
                    <br />
                    Reiherweg 96
                    <br />
                    89584 Ehingen
                    <br />
                    Deutschland
                  </address>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-black/70">{L.dispute}</h3>
                <div className="text-sm mt-4 space-y-3 text-black/80 leading-relaxed">
                  <p>{L.consumerDispute}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

