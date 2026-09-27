"use client"

import * as React from "react"
import { ArrowRight, Check, Gift } from "lucide-react"
import { Badge } from "@/components/ui"
import { CtaLink } from "@/components/cta-link"
import type { Dictionary } from "@/lib/dictionary"
import { PRICING, type Billing } from "@/lib/pricing"
import { cn } from "@/lib/utils"

type Pricing = Dictionary["home"]["pricing"]

type Props = {
  t: Pricing
  signupHref: string
  externalHint: string
}

/**
 * Pricing: a billing switch (native radio group, so arrow keys and screen
 * readers work), the single plan with a price breakdown, and beside it the
 * trial card. Both cards stretch to the same height. The discount badge is
 * derived from lib/pricing.ts, so it stays correct when they change.
 */
export function PricingPlans({ t, signupHref, externalHint }: Props) {
  const [billing, setBilling] = React.useState<Billing>("yearly")
  const name = React.useId()

  const { monthly, yearly } = PRICING.company
  const percent = Math.round((1 - yearly / monthly) * 100)
  const price = PRICING.company[billing]
  const chf = (n: number) => `CHF ${n}`

  const rows: { label: string; value: string; highlight?: boolean }[] = [
    { label: t.breakdown.company, value: `${chf(price)} ${t.breakdown.perMonth}` },
    { label: t.breakdown.firstUser, value: t.breakdown.free, highlight: true },
    { label: t.breakdown.moreUsers, value: `${chf(PRICING.extraUser)} ${t.breakdown.perMonth}` },
  ]

  return (
    <>
      {/* Billing switch */}
      <fieldset className="mx-auto mb-10 flex w-fit rounded-control bg-cream p-1 ring-1 ring-black/5">
        <legend className="sr-only">{t.billingLabel}</legend>
        {(Object.keys(PRICING.company) as Billing[]).map((key) => {
          const active = billing === key
          return (
            <label
              key={key}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-[0.6rem] px-4 py-2 text-sm font-medium transition-colors",
                "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-2",
                active ? "bg-navy text-white shadow-card" : "text-ink-muted hover:text-ink",
              )}
            >
              <input
                type="radio"
                name={name}
                value={key}
                checked={active}
                onChange={() => setBilling(key)}
                data-track={`pricing_billing_${key}`}
                className="sr-only"
              />
              {t.billing[key].label}
              {key === "yearly" && (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[0.68rem] font-semibold tabular-nums",
                    active ? "bg-white/15 text-white" : "bg-success/10 text-success",
                  )}
                >
                  {t.savingsBadge.replace("{percent}", String(percent))}
                </span>
              )}
            </label>
          )
        })}
      </fieldset>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Main plan */}
        <div className="flex flex-col gap-8 rounded-card bg-cream p-6 ring-2 ring-brand sm:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-serif text-[1.75rem] leading-tight tracking-tight">{t.plan.name}</h3>
              <Badge variant="brand">{t.plan.badge}</Badge>
            </div>
            <p className="mt-1.5 text-[0.95rem] text-ink-muted">{t.plan.description}</p>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div aria-live="polite">
              <div className="flex items-end gap-2">
                <span className="pb-1.5 text-base font-medium text-ink-muted">CHF</span>
                <span className="font-serif text-[3.75rem] leading-none tracking-tight tabular-nums">{price}</span>
                {/* Unit and billing note stacked, sharing one left edge */}
                <span className="flex flex-col pb-1.5 text-sm leading-snug text-ink-muted">
                  <span>{t.unit}</span>
                  <span>{t.billing[billing].note}</span>
                </span>
              </div>
            </div>
            <CtaLink
              href={signupHref}
              track={`pricing_${billing}_signup`}
              externalHint={externalHint}
              size="lg"
              className="w-full md:w-auto"
            >
              {t.cta}
              <ArrowRight aria-hidden="true" />
            </CtaLink>
          </div>

          {/* Price breakdown – pinned to the bottom so both cards end flush */}
          <div className="mt-auto rounded-tile bg-white p-5 shadow-card sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">{t.breakdown.title}</p>
            <dl className="mt-3 divide-y divide-line">
              {rows.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 py-3 text-[0.95rem]">
                  <dt className="text-ink">{row.label}</dt>
                  <dd className={cn("shrink-0 font-medium tabular-nums", row.highlight ? "text-success" : "text-ink")}>
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-ink-muted">{t.breakdown.note}</p>
          </div>
        </div>

        {/* Trial */}
        <div className="relative flex flex-col overflow-hidden rounded-card bg-navy p-6 text-white sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(143,180,230,0.28),transparent)]"
          />
          <Badge variant="onDark" className="relative self-start">
            <Gift className="size-3.5" aria-hidden="true" />
            {t.trial.badge}
          </Badge>
          <h3 className="relative mt-5 font-serif text-[2rem] leading-tight tracking-tight">{t.trial.title}</h3>
          <p className="relative mt-3 leading-relaxed text-white/75">{t.trial.text}</p>
          <ul className="relative mb-6 mt-6 space-y-3">
            {t.trial.features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-[0.95rem]">
                <span aria-hidden="true" className="flex size-6 items-center justify-center rounded-full bg-white/10 text-brand-light">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <p className="relative mt-auto border-t border-white/10 pt-5 text-sm text-white/70">
            {t.trial.after.replace("{price}", String(price))}
          </p>
          <CtaLink href={signupHref} track="pricing_trial_signup" externalHint={externalHint} variant="light" className="relative mt-5 w-full">
            {t.trial.cta}
            <ArrowRight aria-hidden="true" />
          </CtaLink>
        </div>
      </div>
    </>
  )
}
