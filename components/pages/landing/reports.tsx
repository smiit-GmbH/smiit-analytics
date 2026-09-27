import { ArrowRight } from "lucide-react"
import { BrowserFrame, Section, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui"
import { CtaLink } from "@/components/cta-link"
import { BalanceDashboard } from "@/components/pages/landing/dashboards/balance-dashboard"
import { CashflowDashboard } from "@/components/pages/landing/dashboards/cashflow-dashboard"
import { DemoProvider } from "@/components/pages/landing/dashboards/dashboard-kit"
import { ProjectsDashboard } from "@/components/pages/landing/dashboards/projects-dashboard"
import { SalesDashboard } from "@/components/pages/landing/dashboards/sales-dashboard"
import { WorktimeDashboard } from "@/components/pages/landing/dashboards/worktime-dashboard"
import { LINKS } from "@/lib/links"
import { rich } from "@/lib/rich"
import { SECTIONS } from "@/lib/routes"
import type { SectionProps } from "./types"

/** Every report tab is a live demo dashboard (fictional data in lib/demo, texts in `demo`). */
const DEMOS = {
  sales: SalesDashboard,
  balance: BalanceDashboard,
  worktime: WorktimeDashboard,
  projects: ProjectsDashboard,
  cashflow: CashflowDashboard,
} as const

type Tab = keyof typeof DEMOS

export function Reports({ dict }: SectionProps) {
  const t = dict.home.reports
  const tabs = Object.keys(DEMOS) as Tab[]
  return (
    <Section id={SECTIONS.features} tone="cream" eyebrow={t.eyebrow} title={rich(t.title)} intro={t.intro}>
      <DemoProvider t={dict.demo} format={dict.format}>
        <Tabs defaultValue={tabs[0]}>
          {/* Tabs left, CTA right; wraps below the tabs on narrow screens */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <TabsList aria-label={t.tabsLabel} className="flex w-full flex-wrap sm:inline-flex sm:w-auto sm:flex-nowrap">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  data-track={`reports_tab_${tab}`}
                  className="flex-1 basis-[30%] justify-center px-2 sm:flex-none sm:basis-auto sm:px-4"
                >
                  {t.tabs[tab]}
                </TabsTrigger>
              ))}
            </TabsList>
            <CtaLink externalHint={dict.common.externalHint} href={LINKS.signup} track="reports_signup" className="w-full sm:w-auto">
              {dict.home.hero.ctaPrimary}
              <ArrowRight aria-hidden="true" />
            </CtaLink>
          </div>
          {tabs.map((tab) => {
            const Demo = DEMOS[tab]
            return (
              <TabsContent key={tab} value={tab}>
                <BrowserFrame>
                  <Demo />
                </BrowserFrame>
              </TabsContent>
            )
          })}
        </Tabs>
      </DemoProvider>
    </Section>
  )
}
