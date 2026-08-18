import ContactHero from "@/components/pages/contact/contact-hero"
import ContactForm from "@/components/pages/contact/contact-form"
import ContactInfo from "@/components/pages/contact/contact-info"
import type { Locale } from "@/lib/dictionary"

export default function ContactPage({
  lang,
  dict,
}: {
  lang: Locale
  dict: any
}) {
  return (
    <main className="min-h-screen pt-20 lg:pt-24 pb-12 lg:pb-16 flex items-center">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid gap-10 lg:gap-14 xl:gap-20 lg:grid-cols-[1.15fr_0.85fr] items-start">
          <div className="flex flex-col space-y-10 lg:space-y-12">
            <ContactHero dict={dict} lang={lang} />
            <ContactInfo dict={dict} />
          </div>

          <div id="book" className="relative z-30 lg:self-center rounded-2xl md:rounded-[1.75rem] border border-black/10 bg-[#F4F4F5] shadow-xl ring-1 ring-black/5 p-5 sm:p-7 lg:p-7 xl:p-8">
            <ContactForm dict={dict} lang={lang} />
          </div>
        </div>
      </div>
    </main>
  )
}
