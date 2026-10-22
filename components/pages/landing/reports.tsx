import { ArrowRight } from "lucide-react"
import { BrowserFrame, Section, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui"
import { CtaLink } from "@/components/cta-link"
import { DemoProvider } from "@/components/pages/landing/dashboards/demo-context"
import { LazyDashboard, type DashboardName } from "@/components/pages/landing/dashboards/lazy-dashboard"
import { LINKS } from "@/lib/links"
import { rich } from "@/lib/rich"
import { SECTIONS } from "@/lib/routes"
import type { SectionProps } from "./types"

/**
 * Every report tab is a live demo dashboard (fictional data in lib/demo, texts
 * in `demo`), loaded when the section comes near the viewport (LazyDashboard).
 */
const TABS = ["sales", "balance", "worktime", "projects", "cashflow"] as const satisfies readonly DashboardName[]

export function Reports({ dict }: SectionProps) {
  const t = dict.home.reports
  const tabs = TABS
  return (
    <Section id={SECTIONS.features} tone="cream" eyebrow={t.eyebrow} title={rich(t.title)} intro={t.intro}>
      <DemoProvider t={dict.demo} format={dict.format}>
        <Tabs defaultValue={tabs[0]}>
          {/* Tabs left, CTA right; wraps below the tabs on narrow screens */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <TabsList aria-label={t.tabsLabel} className="w-full sm:w-auto">
              {tabs.map((tab) => (
                <TabsTrigger key={tab} value={tab} data-track={`reports_tab_${tab}`} className="px-3.5 sm:px-4">
                  {t.tabs[tab]}
                </TabsTrigger>
              ))}
            </TabsList>
            <CtaLink externalHint={dict.common.externalHint} href={LINKS.signup} track="reports_signup" className="w-full sm:w-auto">
              {dict.home.hero.ctaPrimary}
              <ArrowRight aria-hidden="true" />
            </CtaLink>
          </div>
          {tabs.map((tab) => (
            <TabsContent key={tab} value={tab}>
              <BrowserFrame>
                <LazyDashboard name={tab} />
              </BrowserFrame>
            </TabsContent>
          ))}
        </Tabs>
      </DemoProvider>
    </Section>
  )
}
