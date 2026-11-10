import { BuildingComplex } from "lucide-react"
import { List as TabsListPrimitive, Trigger as TabsTriggerPrimitive } from "@radix-ui/react-tabs"
import { Card, IconTile, Media, Section, Tabs, TabsContent } from "@/components/ui"
import { Icon } from "@/components/icons"
import type { MediaId } from "@/lib/media"
import { SECTIONS } from "@/lib/routes"
import { rich } from "@/lib/rich"
import type { SectionProps } from "./types"

/** One loop per point, in the order of `customize.points` in the dictionaries. */
const VIDEOS = ["VIDEO_DRAGDROP", "VIDEO_EXPORT", "VIDEO_TEAM"] as const satisfies readonly MediaId[]

export function Customize({ lang, dict }: SectionProps) {
  const t = dict.home.customize
  return (
    <Section id={SECTIONS.customize} tone="white" eyebrow={t.eyebrow} title={rich(t.title)} intro={t.intro}>
      {/* The points are tabs: choosing one swaps the clip. The list comes first in the DOM (tablist before its
          panels, and above the clip on phones); from lg on it sits to the right of the clip. */}
      <Tabs defaultValue={VIDEOS[0]} orientation="vertical" className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        <TabsListPrimitive aria-label={t.tabsLabel} className="space-y-2 lg:order-2">
          {t.points.map((p, i) => (
            <TabsTriggerPrimitive
              key={p.title}
              value={VIDEOS[i]}
              data-track={`customize_tab_${i + 1}`}
              className={
                "group relative flex w-full cursor-pointer gap-4 rounded-tile p-4 text-left transition-colors " +
                "before:absolute before:inset-y-4 before:left-0 before:w-1 before:rounded-full before:bg-transparent before:transition-colors " +
                "hover:bg-sand/60 data-[state=active]:bg-sand data-[state=active]:before:bg-brand " +
                "outline-none focus-visible:ring-2 focus-visible:ring-brand"
              }
            >
              <IconTile className="mb-0 shrink-0 transition-colors group-data-[state=active]:bg-brand group-data-[state=active]:text-white">
                <Icon name={p.icon} />
              </IconTile>
              <span className="block">
                <span className="block font-serif text-title tracking-tight">{p.title}</span>
                <span className="mt-1.5 block text-[0.95rem] leading-relaxed text-ink-muted">{p.text}</span>
              </span>
            </TabsTriggerPrimitive>
          ))}
        </TabsListPrimitive>
        {/* Like the hero: the clips are full app-window recordings, so no BrowserFrame chrome on top of the app's own header. */}
        <div className="lg:order-1">
          {VIDEOS.map((id) => (
            <TabsContent key={id} value={id} className="mt-0 overflow-hidden rounded-tile shadow-frame">
              <Media lang={lang} id={id} alt={dict.media[id]} />
            </TabsContent>
          ))}
        </div>
      </Tabs>

      <Card tone="sand" className="mt-12 grid items-center gap-8 p-6 sm:p-8 md:mt-16 md:grid-cols-2 md:p-10">
        <div>
          <IconTile className="bg-white">
            <BuildingComplex />
          </IconTile>
          <h3 className="font-serif text-title-lg tracking-tight text-balance">{rich(t.trustee.title)}</h3>
          <p className="mt-4 leading-relaxed text-ink-muted">{t.trustee.text}</p>
        </div>
        <div className="overflow-hidden rounded-tile shadow-card">
          <Media lang={lang} id="IMG_MULTI_COMPANY" alt={dict.media.IMG_MULTI_COMPANY} sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
      </Card>
    </Section>
  )
}
