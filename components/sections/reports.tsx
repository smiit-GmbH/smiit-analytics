import { ArrowRight } from "lucide-react"
import { BrowserFrame, Section, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ds"
import { CtaLink } from "@/components/cta-link"
import { LINKS } from "@/config/links"
import { getContent } from "@/content"
import { rich } from "@/lib/rich"
import { BalanceDashboard } from "@/components/demo/balance-dashboard"
import { CashflowDashboard } from "@/components/demo/cashflow-dashboard"
import { ProjectsDashboard } from "@/components/demo/projects-dashboard"
import { SalesDashboard } from "@/components/demo/sales-dashboard"
import { WorktimeDashboard } from "@/components/demo/worktime-dashboard"

/** Every report tab is a live demo dashboard (fictional data in content/demo). */
const DEMOS = {
  sales: SalesDashboard,
  balance: BalanceDashboard,
  worktime: WorktimeDashboard,
  projects: ProjectsDashboard,
  cashflow: CashflowDashboard,
} as const

export function Reports() {
  const c = getContent()
  const t = c.reports
  return (
    <Section id="funktionen" tone="cream" eyebrow={t.eyebrow} title={rich(t.title)} intro={t.intro}>
      <Tabs defaultValue={t.tabs[0].value}>
        {/* Tabs left, CTA right; wraps below the tabs on narrow screens */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <TabsList aria-label={t.tabsLabel} className="flex w-full flex-wrap sm:inline-flex sm:w-auto sm:flex-nowrap">
            {t.tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                data-track={`reports_tab_${tab.value}`}
                className="flex-1 basis-[30%] justify-center px-2 sm:flex-none sm:basis-auto sm:px-4"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <CtaLink href={LINKS.signup} track="reports_signup" className="w-full sm:w-auto">
            {c.hero.ctaPrimary}
            <ArrowRight aria-hidden="true" />
          </CtaLink>
        </div>
        {t.tabs.map((tab) => {
          const Demo = DEMOS[tab.demo as keyof typeof DEMOS]
          return (
            <TabsContent key={tab.value} value={tab.value}>
              <BrowserFrame>
                <Demo />
              </BrowserFrame>
            </TabsContent>
          )
        })}
      </Tabs>
    </Section>
  )
}
