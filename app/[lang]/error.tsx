"use client"

import * as React from "react"
import { Home, RotateCw } from "lucide-react"
import { Button, Container } from "@/components/ui"
import { CtaLink } from "@/components/cta-link"
import { useLocale } from "@/components/locale-provider"
import { routePath } from "@/lib/routes"

/**
 * Error boundary of all pages: shown (inside header and footer) when a page
 * throws while rendering in the browser. "Try again" re-renders the page.
 */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { lang, error: t } = useLocale()

  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section aria-labelledby="error-title" className="py-section-sm md:py-section">
      <Container className="max-w-xl text-center">
        <meta name="robots" content="noindex" />
        <h1 id="error-title" className="font-serif text-[2rem] leading-tight tracking-tight md:text-[2.6rem]">
          {t.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">{t.text}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" onClick={reset} track="error_retry">
            <RotateCw aria-hidden="true" />
            {t.retry}
          </Button>
          <CtaLink href={routePath(lang)} track="error_home" variant="secondary" size="lg" externalHint="">
            <Home aria-hidden="true" />
            {t.home}
          </CtaLink>
        </div>
      </Container>
    </section>
  )
}
