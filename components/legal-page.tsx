import { ArrowLeft } from "lucide-react"
import { Container } from "@/components/ds"
import { getContent } from "@/content"

/** Shared shell for Impressum and Datenschutz. `body` is plain text; paragraphs split on blank lines. */
export function LegalPage({ title, body }: { title: string; body: string }) {
  const c = getContent()
  return (
    <article className="py-section-sm md:py-section">
      <Container className="max-w-3xl">
        <a href="/" className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-brand hover:underline">
          <ArrowLeft className="size-4" aria-hidden="true" />
          {c.legal.back}
        </a>
        <h1 className="mt-6 font-serif text-[2.4rem] leading-tight tracking-tight md:text-[3rem]">{title}</h1>
        <div className="mt-10 space-y-5 rounded-card bg-white p-7 leading-relaxed shadow-card sm:p-10">
          {body.split(/\n{2,}/).map((para, i) => (
            <p key={i} className="whitespace-pre-line">
              {para}
            </p>
          ))}
        </div>
      </Container>
    </article>
  )
}
