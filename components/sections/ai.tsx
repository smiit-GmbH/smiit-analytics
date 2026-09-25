import type { ReactNode } from "react"
import { ArrowRight, Bot, Database, Plug, Sparkles } from "lucide-react"
import { Badge, BrowserFrame, Card, Media, Section } from "@/components/ds"
import { getContent } from "@/content"
import { rich } from "@/lib/rich"

export function Ai() {
  const c = getContent()
  const t = c.ai
  return (
    <Section id="ki" tone="navy" eyebrow={t.eyebrow} title={rich(t.title)} intro={t.intro}>
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
        <ul className="space-y-6">
          {t.capabilities.map((cap) => (
            <li key={cap.title} className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-control bg-white/10 text-brand-light"
              >
                <Sparkles className="size-5" />
              </span>
              <div>
                <h3 className="font-serif text-[1.3rem] leading-tight tracking-tight">{cap.title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-white/75">{cap.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <BrowserFrame>
          <Media id="VIDEO_AI_CHAT" alt={c.media.VIDEO_AI_CHAT} />
        </BrowserFrame>
      </div>

      <Card tone="navy" className="mt-12 grid gap-8 md:mt-16 md:grid-cols-[1.3fr_1fr] md:items-center md:p-10">
        <div>
          <Badge variant="onDark">{t.mcp.badge}</Badge>
          <h3 className="mt-4 font-serif text-[1.75rem] leading-tight tracking-tight text-balance md:text-[2rem]">
            {t.mcp.title}
          </h3>
          <p className="mt-4 leading-relaxed text-white/75">{t.mcp.text}</p>
          <a
            href={t.mcp.href}
            data-track="ai_mcp_faq"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-light underline-offset-4 hover:underline"
          >
            {t.mcp.link}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
        {/* Illustrative connection: assistant ↔ smiit Analytics ↔ bexio */}
        <div aria-hidden="true" className="flex flex-col items-center gap-2 md:gap-3">
          <ConnectorNode icon={<Bot className="size-5" />} label="ChatGPT · Claude" />
          <span className="flow-line-y h-8 w-0.5 text-white/40" />
          <ConnectorNode icon={<Plug className="size-5" />} label="smiit Analytics" strong />
          <span className="flow-line-y h-8 w-0.5 text-white/40" />
          <ConnectorNode icon={<Database className="size-5" />} label="bexio" />
        </div>
      </Card>
    </Section>
  )
}

function ConnectorNode({ icon, label, strong }: { icon: ReactNode; label: string; strong?: boolean }) {
  return (
    <div
      className={
        strong
          ? "flex items-center gap-3 rounded-control bg-brand px-5 py-3 font-medium text-white shadow-cta"
          : "flex items-center gap-3 rounded-control bg-white/10 px-5 py-3 text-white/90 ring-1 ring-white/15"
      }
    >
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  )
}
