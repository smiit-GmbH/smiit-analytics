import { Linkedin, Mail } from "lucide-react"
import { Container } from "@/components/ds"
import { Logo } from "@/components/site/logo"
import { COMPANY } from "@/config/site"
import { LINKS } from "@/config/links"
import { getContent } from "@/content"

export function Footer() {
  const c = getContent()
  const t = c.footer
  const linkClass = "rounded-sm text-sm text-white/75 transition-colors hover:text-white"

  return (
    <footer className="bg-navy text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-16">
        <div>
          <Logo tone="light" label={c.common.homeLabel} productName={c.common.productName} />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">{t.tagline}</p>
          <p className="mt-5 text-sm text-white/75">
            {t.productOf}{" "}
            <a href={LINKS.company} target="_blank" rel="noopener" data-track="footer_company" className="font-medium text-white underline-offset-4 hover:underline">
              {t.company}
              <span className="sr-only"> {c.common.externalHint}</span>
            </a>
          </p>
        </div>

        <nav aria-label={t.productTitle}>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">{t.productTitle}</h2>
          <ul className="space-y-2.5">
            {c.nav.items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href={LINKS.login} data-track="footer_login" className={linkClass}>
                {c.nav.login}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">{t.contactTitle}</h2>
          <ul className="space-y-2.5">
            <li>
              <a href={LINKS.email} data-track="footer_email" className={`${linkClass} inline-flex items-center gap-2`}>
                <Mail className="size-4" aria-hidden="true" />
                {COMPANY.email}
              </a>
            </li>
            <li>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener"
                data-track="footer_linkedin"
                className={`${linkClass} inline-flex items-center gap-2`}
              >
                <Linkedin className="size-4" aria-hidden="true" />
                {t.linkedin}
                <span className="sr-only"> {c.common.externalHint}</span>
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label={t.legalTitle}>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">{t.legalTitle}</h2>
          <ul className="space-y-2.5">
            <li>
              <a href={LINKS.impressum} className={linkClass}>
                {t.impressum}
              </a>
            </li>
            <li>
              <a href={LINKS.datenschutz} className={linkClass}>
                {t.datenschutz}
              </a>
            </li>
            <li>
              <a href={LINKS.nutzungsbedingungen} className={linkClass}>
                {t.nutzungsbedingungen}
              </a>
            </li>
            <li>
              <a href={LINKS.avv} className={linkClass}>
                {t.avv}
              </a>
            </li>
          </ul>
        </nav>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-6 text-xs text-white/60">
          © {new Date().getFullYear()} {t.copyright}
        </Container>
      </div>
    </footer>
  )
}
