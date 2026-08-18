"use client"

import { useState, useRef } from "react"
import emailjs from "@emailjs/browser"
import { ArrowRight, CheckCircle2, XCircle, Loader2 } from "lucide-react"

interface ContactFormProps {
  dict: any
  lang: string
}

export default function ContactForm({ dict, lang }: ContactFormProps) {
  const f = dict.contact.form
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [selectedInterest, setSelectedInterest] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setStatus("sending")

    const templateId = lang === "en" && process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_EN
      ? process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_EN
      : process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_DE!

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        templateId,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setStatus("success")
      formRef.current.reset()
      setFirstName("")
      setLastName("")
      setSelectedInterest("")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle2 className="w-14 h-14 text-green-500 mb-4" />
        <h3 className="font-serif text-xl md:text-2xl text-black mb-2">{f.successTitle}</h3>
        <p className="text-sm text-black/70 max-w-[40ch] leading-relaxed">{f.successText}</p>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <XCircle className="w-14 h-14 text-red-500 mb-4" />
        <h3 className="font-serif text-xl md:text-2xl text-black mb-2">{f.errorTitle}</h3>
        <p className="text-sm text-black/70 max-w-[40ch] leading-relaxed mb-4">{f.errorText}</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm text-[#F703EB] hover:text-[#F703EB]/80 underline underline-offset-2 cursor-pointer"
        >
          {f.submit}
        </button>
      </div>
    )
  }

  const inputClasses = "w-full px-3 sm:px-4 py-2.5 lg:py-2 xl:py-2.5 rounded-xl border border-black/10 bg-white text-[13px] sm:text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#F703EB]/40 focus:border-[#F703EB] transition-all"
  const labelClasses = "block text-[13px] sm:text-sm font-semibold text-black mb-1 lg:mb-1"

  return (
    <div className="space-y-5 lg:space-y-4 xl:space-y-5">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 lg:space-y-3 xl:space-y-4">
        <input type="hidden" name="from_name" value={`${firstName} ${lastName}`.trim()} />
        <input type="hidden" name="lang" value={lang} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-3 xl:gap-4">
          <div>
            <label className={labelClasses}>
              {f.firstName} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="first_name"
              placeholder={f.firstName}
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>
              {f.lastName} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="last_name"
              placeholder={f.lastName}
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>
            {f.email} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="from_email"
            placeholder="beispiel@email.com"
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>
            {f.phone} <span className="text-black/50 font-normal ml-1">{f.optional}</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+41 123 456 789"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="interest" className={labelClasses}>
            {f.interest} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="interest"
              name="interest"
              required
              value={selectedInterest}
              onChange={(e) => setSelectedInterest(e.target.value)}
              className={`${inputClasses} appearance-none cursor-pointer font-sans ${
                selectedInterest ? "text-black" : "text-black/40"
              }`}
            >
              <option value="" disabled hidden>
                {f.interest}
              </option>
              {f.interests.map((interest: string) => (
                <option key={interest} value={interest} className="text-black font-sans">
                  {interest}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
              <svg className="w-4 h-4 text-black/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className={labelClasses}>
            {f.message} <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            placeholder={f.message}
            required
            rows={5}
            className={`${inputClasses} resize-none`}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-1 sm:pt-2">
          <p className="text-[11px] sm:text-xs text-black/50 max-w-[250px] leading-relaxed">
            {f.disclaimer}
          </p>
          <button
            type="submit"
            disabled={status === "sending"}
            className="group flex items-center justify-center gap-2 sm:gap-3 bg-[#0A1128] hover:bg-[#0A1128]/90 disabled:bg-[#0A1128]/50 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-[13px] sm:text-sm transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-black/20 cursor-pointer disabled:cursor-not-allowed w-full sm:w-auto shrink-0"
          >
            {status === "sending" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {f.sending}
              </>
            ) : (
              <>
                {f.submit}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
