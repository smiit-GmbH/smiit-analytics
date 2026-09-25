import type { Metadata } from "next"
import { ArrowRight, BarChart3, PlayCircle, Sparkles, Star } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  BrowserFrame,
  Button,
  Card,
  CardText,
  CardTitle,
  Container,
  DemoVideo,
  Highlight,
  IconTile,
  Media,
  Modal,
  ModalContent,
  ModalTrigger,
  Section,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ds"
import { MEDIA } from "@/config/media"

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
}

const colors = [
  ["navy", "#0B162D", "Theme, dunkle Flächen"],
  ["brand", "#21569C", "Primär-Aktion, Links"],
  ["brand-hover", "#1A457D", "Hover"],
  ["brand-soft", "#E6EDF6", "Icon-Kacheln"],
  ["magenta", "#F703EB", "Akzent (nur dekorativ)"],
  ["star", "#F5A623", "Bewertungssterne"],
  ["cream", "#F3F3EE", "Seitenhintergrund"],
  ["sand", "#F2F0E9", "Inset-Flächen"],
  ["ink", "#0B0B0B", "Text"],
  ["ink-muted", "#5B5B5B", "Sekundärtext"],
] as const

export default function StyleguidePage() {
  return (
    <>
      <Container className="pt-8">
        <Badge variant="brand">Styleguide · intern · nicht indexiert</Badge>
      </Container>

      <Section
        id="farben"
        eyebrow="Design-Tokens"
        title={<>Farben aus der <Highlight>smiit-Markenfamilie</Highlight></>}
        intro="Abgeleitet aus www.smiit.de. Utilities: bg-navy, text-brand, bg-cream, …"
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {colors.map(([name, hex, use]) => (
            <div key={name} className="overflow-hidden rounded-tile bg-white shadow-card">
              <div className="h-20" style={{ background: hex }} />
              <div className="p-3">
                <p className="font-mono text-xs font-semibold">{name}</p>
                <p className="font-mono text-xs text-ink-muted">{hex}</p>
                <p className="mt-1 text-xs text-ink-muted">{use}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="typo" tone="white" eyebrow="Typografie" title="Playfair Display + Geist">
        <div className="space-y-6">
          <p className="font-serif text-[2.75rem] leading-[1.04] tracking-tight md:text-[4rem]">
            Ihre bexio-Daten. <Highlight>In 5 Minuten</Highlight> verständlich.
          </p>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-muted">
            Geist für Fliesstext: kurze Sätze, gut lesbar, auch auf dem Handy. Schweizer Rechtschreibung, «Sie»-Ansprache.
          </p>
          <p className="font-mono text-sm text-ink-muted">Geist Mono · Labels, Zahlen, Platzhalter-IDs</p>
        </div>
      </Section>

      <Section id="buttons" eyebrow="Komponenten" title="Buttons & Badges">
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg" track="sg_primary">30 Tage kostenlos testen <ArrowRight /></Button>
          <Button size="lg" variant="secondary" track="sg_secondary"><PlayCircle /> 2-Min-Demo ansehen</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Textlink</Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Badge>
            <span className="flex text-star" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}
            </span>
            5,0 auf dem bexio Marketplace
          </Badge>
          <Badge variant="brand">Neu</Badge>
          <Badge variant="accent">KI</Badge>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 rounded-card bg-navy p-6">
          <Button variant="light" size="lg">Kostenlos testen</Button>
          <Button variant="outline-light" size="lg">Demo buchen</Button>
          <Badge variant="onDark">auf Navy</Badge>
        </div>
      </Section>

      <Section id="cards" tone="white" eyebrow="Komponenten" title="Cards">
        <div className="grid gap-6 md:grid-cols-3">
          <Card interactive>
            <IconTile><BarChart3 /></IconTile>
            <CardTitle>Verbinden & sofort sehen</CardTitle>
            <CardText>Standardberichte sind nach der Anbindung sofort da.</CardText>
          </Card>
          <Card tone="sand">
            <IconTile><Sparkles /></IconTile>
            <CardTitle>Sand-Variante</CardTitle>
            <CardText>Für ruhigere Hintergrundflächen.</CardText>
          </Card>
          <Card tone="navy">
            <CardTitle>Navy-Variante</CardTitle>
            <p className="mt-3 text-[0.95rem] text-white/75">Für Karten in dunklen Sektionen.</p>
          </Card>
        </div>
      </Section>

      <Section id="medien" eyebrow="Komponenten" title="BrowserFrame, Video & Bild-Platzhalter">
        <div className="grid gap-8 lg:grid-cols-2">
          <BrowserFrame
            markers={[
              { x: 22, y: 30, label: "KPI per Drag & Drop" },
              { x: 80, y: 70, label: "Export", side: "left" },
            ]}
          >
            <Media id="IMG_MULTI_COMPANY" alt="Firmenauswahl mit mehreren verbundenen bexio-Firmen" />
          </BrowserFrame>
          <BrowserFrame>
            <Media id="VIDEO_DRAGDROP" alt="Ein Diagramm wird per Drag & Drop angepasst" />
          </BrowserFrame>
        </div>
      </Section>

      <Section id="interaktiv" tone="white" eyebrow="Komponenten" title="Tabs, Accordion, Modal">
        <Tabs defaultValue="finanzen">
          <TabsList aria-label="Berichtskategorie">
            <TabsTrigger value="finanzen">Finanzen</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="kontakte">Kontakte</TabsTrigger>
          </TabsList>
          {["finanzen", "personal", "kontakte"].map((t) => (
            <TabsContent key={t} value={t}>
              <p className="text-ink-muted">Inhalt für «{t}».</p>
            </TabsContent>
          ))}
        </Tabs>

        <Accordion type="single" collapsible className="mt-10 max-w-3xl rounded-card bg-white px-6 shadow-card">
          <AccordionItem value="a">
            <AccordionTrigger>Wie lange dauert die Einrichtung?</AccordionTrigger>
            <AccordionContent>Antworttext.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Brauche ich IT-Wissen?</AccordionTrigger>
            <AccordionContent>Antworttext.</AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-10">
          <Modal>
            <ModalTrigger asChild>
              <Button variant="secondary"><PlayCircle /> Video-Modal öffnen</Button>
            </ModalTrigger>
            <ModalContent title="2-Min-Demo" hideTitle size="video">
              <DemoVideo id="VIDEO_DEMO_FULL" src={MEDIA.VIDEO_DEMO_FULL.file} ratio={MEDIA.VIDEO_DEMO_FULL.ratio} spec={MEDIA.VIDEO_DEMO_FULL.spec} title="Produktdemo" />
            </ModalContent>
          </Modal>
        </div>
      </Section>
    </>
  )
}
