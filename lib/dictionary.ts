/**
 * All texts of the website, in every language.
 *
 * - `de` is the source language. Its shape defines the `Dictionary` type, so
 *   every other language must provide exactly the same keys (checked by tsc).
 * - Swiss conventions: «Sie» / formal address, "ss" instead of "ß", prices in CHF.
 * - Unknown facts are kept as [PLACEHOLDERS] – never replace them with guesses.
 * - `*word*` in headlines renders as a brand-coloured highlight (lib/rich.tsx).
 * - `{name}` marks a value that is filled in by the code.
 *
 * Self-contained on purpose (no imports): scripts/build-illustrations.mjs
 * reads this file with Node to render the localized illustrations.
 */

export const locales = ["de", "en", "fr", "it"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "de"

/* ── German (Switzerland) – source language ─────────────────────── */

const de = {
  meta: {
    title: "smiit Analytics – Ihre bexio-Daten in 5 Minuten verständlich",
    description:
      "bexio in 5 Minuten verbinden und sofort Berichte zu Verkauf, Bilanz und Cashflow sehen. Per Drag & Drop anpassen, KI fragen. 30 Tage gratis testen.",
    ogImageAlt: "smiit Analytics – Auswertungen für bexio",
    appCategory: "Business-Analytics für bexio",
    home: "Startseite",
  },

  /** Number and date format of the demo dashboards and illustrations. */
  format: {
    /** Thousands separator (Swiss: right single quotation mark). */
    group: "’",
    decimal: ".",
    /** `{n}` = value. */
    percent: "{n} %",
    thousands: "{n} Tsd.",
    millions: "{n} Mio.",
    months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
  },

  common: {
    skipLink: "Zum Inhalt springen",
    close: "Schliessen",
    externalHint: "(öffnet in neuem Tab)",
    homeLabel: "smiit Analytics – zur Startseite",
    productName: "smiit Analytics",
  },

  language: {
    label: "Sprache wählen",
    current: "Aktuelle Sprache: {language}",
    names: { de: "Deutsch", en: "English", fr: "Français", it: "Italiano" },
  },

  nav: {
    label: "Hauptnavigation",
    /** Chapter progress rail on the home page (desktop). */
    chapters: {
      /** Very short names, shown next to the rail (keys: SECTIONS in lib/routes.ts). */
      label: "Kapitel",
      items: {
        problem: "Problem",
        howItWorks: "So geht's",
        features: "Berichte",
        customize: "Gestalten",
        ai: "KI",
        automations: "Automatik",
        audiences: "Für wen",
        testimonials: "Kunden",
        pricing: "Preise",
        security: "Sicherheit",
        faq: "FAQ",
      },
    },
    /** Keyed by section id on the home page; order and anchors: lib/routes.ts. */
    items: {
      features: "Funktionen",
      ai: "KI",
      automations: "Automatisierungen",
      pricing: "Preise",
      faq: "FAQ",
    },
    cta: "Kostenlos testen",
    login: "Login",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schliessen",
  },

  home: {
    hero: {
      title: "Ihre bexio-Daten. *In 5 Minuten* verständlich.",
      subtitle:
        "Verbinden Sie bexio und sehen Sie sofort, wie Ihr Unternehmen dasteht. Gestalten Sie Berichte selbst und überlassen Sie Fragen und Routinearbeit der KI.",
      ctaPrimary: "30 Tage kostenlos testen",
      ctaSecondary: "2-Min-Demo ansehen",
      demoTitle: "smiit Analytics in 2 Minuten",
    },

    trust: {
      title: "Diese Unternehmen arbeiten mit smiit Analytics",
      rating: {
        value: "5,0",
        label: "auf dem bexio Marketplace",
        srLabel: "von 5 Sternen – Bewertungen ansehen (öffnet in neuem Tab)",
      },
    },

    problem: {
      eyebrow: "Das Problem",
      title: "Die Zahlen sind da. *Der Überblick fehlt.*",
      pains: [
        {
          icon: "code",
          title: "Fehlende Automatisierungen",
          text: "Erinnerungen, Berichte und Auswertungen laufen von Hand – oder müssen mit teurem Programmieraufwand eigens entwickelt werden.",
        },
        {
          icon: "clock",
          title: "Monatsberichte kosten Stunden",
          text: "Bis der Bericht fertig ist, sind die Zahlen schon wieder alt.",
        },
        {
          icon: "eyeOff",
          title: "Kein Überblick im Alltag",
          text: "Wie läuft der Umsatz? Wer hat noch nicht bezahlt? Die Antwort steckt irgendwo in bexio.",
        },
      ],
      solution:
        "smiit Analytics holt Ihre Daten direkt aus bexio und macht daraus verständliche Berichte. Automatisch und ohne Excel.",
    },

    steps: {
      eyebrow: "So einfach geht's",
      title: "In drei Schritten *zum Überblick*",
      items: [
        {
          title: "bexio verbinden",
          text: "Konto erstellen und bexio verbinden. Das dauert rund 5 Minuten – ohne Installation.",
          media: "IMG_STEP_1",
        },
        {
          title: "Berichte ansehen",
          text: "Standardberichte zu Verkauf, Bilanz, Cashflow und mehr sind sofort da.",
          media: "IMG_STEP_2",
        },
        {
          title: "Anpassen",
          text: "Kennzahlen per Drag & Drop ändern oder einfach die KI fragen.",
          media: "IMG_STEP_3",
        },
      ],
    },

    reports: {
      eyebrow: "Verbinden & sofort sehen",
      title: "Fertige Berichte. *Ab dem ersten Tag.*",
      intro: "Nach der Verbindung stehen Ihre wichtigsten Auswertungen bereit. Sie müssen nichts einrichten.",
      tabsLabel: "Berichtsbereich wählen",
      /** Every tab shows the interactive demo dashboard of the same key (texts: `demo`). */
      tabs: {
        sales: "Verkauf",
        balance: "Bilanz",
        worktime: "Arbeitszeiten",
        projects: "Projekte",
        cashflow: "Cashflow",
      },
    },

    customize: {
      eyebrow: "Selbst gestalten",
      title: "Ihre Berichte. *Ganz nach Ihren Wünschen.*",
      intro: "Ziehen Sie Kennzahlen und Diagramme einfach an die richtige Stelle. Ohne Programmieren, ohne Excel.",
      points: [
        {
          icon: "layout",
          title: "Eigene Berichte erstellen",
          text: "Stellen Sie Kennzahlen und Analysen so zusammen, wie Sie sie brauchen – per Drag & Drop.",
        },
        {
          icon: "download",
          title: "Exportieren und teilen",
          text: "Exportieren Sie Ihre Berichte ([EXPORT_FORMATE]) – für die Sitzung, die Bank oder den Verwaltungsrat.",
        },
        {
          icon: "users",
          title: "Mehrere Nutzer & Firmen",
          text: "Laden Sie Ihr Team ein und verbinden Sie mehrere bexio-Firmen in einer Organisation.",
        },
      ],
      trustee: {
        title: "Für Treuhandbüros: *Alle Mandanten in einem Login.*",
        text: "Verbinden Sie die bexio-Firmen Ihrer Mandanten in einer Organisation und behalten Sie alle im Blick.",
      },
    },

    ai: {
      eyebrow: "Automatisch & intelligent",
      title: "Fragen Sie Ihre Zahlen. *Die KI antwortet.*",
      intro:
        "Stellen Sie Fragen in ganz normaler Sprache, etwa «Welche Kunden haben dieses Jahr am meisten Umsatz gebracht?». Die KI antwortet direkt aus Ihren bexio-Daten.",
      capabilities: [
        { title: "Fragen beantworten", text: "Antworten auf Ihre Fragen – ohne Suchen und ohne Formeln." },
        { title: "Analysen anpassen", text: "«Zeig mir das pro Quartal» – und die Analyse ändert sich." },
        { title: "Ganze Berichte erstellen", text: "Beschreiben Sie, was Sie sehen möchten. Die KI baut den Bericht." },
      ],
      mcp: {
        badge: "Für ChatGPT, Claude & Co.",
        title: "Auch in Ihrem gewohnten KI-Assistenten nutzbar",
        text: "Sie arbeiten bereits mit ChatGPT oder Claude? Dann verbinden Sie smiit Analytics direkt damit. Fragen Sie Ihren Assistenten nach Umsatz oder offenen Rechnungen – er holt die Antwort aus Ihren bexio-Daten.",
        link: "Wie funktioniert das?",
      },
    },

    automations: {
      eyebrow: "Automatisierungen",
      title: "Routinearbeit? *Erledigt sich selbst.*",
      intro:
        "Legen Sie einmal fest, was passieren soll. smiit Analytics prüft Ihre bexio-Daten und handelt für Sie.",
      /** Animated example flow (trigger → data → condition → two branches → info). */
      flow: {
        label: "Beispiel-Ablauf",
        live: "Läuft automatisch",
        srSummary:
          "Beispiel-Ablauf: Eine Rechnung ist 14 Tage überfällig. smiit Analytics ruft Kunde und offenen Betrag aus bexio ab und prüft, ob der Kunde bereits erinnert wurde. Falls nein, geht eine freundliche Erinnerungsmail an den Kunden, falls ja, eine zweite Erinnerung mit Frist. Danach erhalten Sie eine Info.",
        trigger: { kind: "Auslöser", title: "Rechnung 14 Tage überfällig", icon: "fileClock" },
        fetch: { kind: "bexio-Daten", title: "Kunde & offenen Betrag abrufen", icon: "database" },
        condition: { kind: "Bedingung", title: "Schon erinnert?", icon: "branch" },
        branchA: { label: "Nein", kind: "Aktion", title: "Erinnerungsmail an Kunde", icon: "mail" },
        branchB: { label: "Ja", kind: "Aktion", title: "2. Erinnerung mit Frist", icon: "mailWarning" },
        notify: { kind: "Info", title: "Info an Sie", icon: "bell" },
      },
      examples: [
        {
          icon: "mail",
          title: "Zahlungserinnerungen",
          text: "Kunden automatisch und freundlich an offene Rechnungen erinnern.",
        },
        {
          icon: "calendar",
          title: "Wochenüberblick per E-Mail",
          text: "Jeden Montag die wichtigsten Zahlen in Ihrem Posteingang.",
        },
        {
          icon: "alert",
          title: "Hinweis bei Auffälligkeiten",
          text: "Eine Nachricht, sobald eine Kennzahl einen Wert über- oder unterschreitet, den Sie festlegen.",
        },
        {
          icon: "clock",
          title: "Stundenrapport-Zusammenfassung",
          text: "Ihre Mitarbeitenden erhalten regelmässig eine Übersicht ihrer erfassten Stunden.",
        },
      ],
      custom: {
        title: "Nicht an Vorlagen gebunden",
        text: "Richten Sie beliebige Automatisierungen ein. Beschreiben Sie der KI in eigenen Worten, was passieren soll – sie erstellt die Automatisierung für Sie.",
      },
    },

    audiences: {
      eyebrow: "Für wen?",
      title: "Gemacht für Menschen, *nicht für IT-Abteilungen.*",
      items: [
        {
          title: "Geschäftsführung KMU",
          text: "Sie wissen jederzeit, wo Ihr Betrieb steht. Ohne Zahlen selbst zusammenzusuchen. Ohne Zeitaufwand.",
          media: "IMG_PERSONA_MANAGEMENT",
        },
        {
          title: "Treuhand & Buchhaltung",
          text: "Alle Mandanten in einem Login – mit Auswertungen, die Sie Ihren Kunden direkt zeigen können.",
          media: "IMG_PERSONA_TRUSTEE",
        },
        {
          title: "Teamleitung",
          text: "Die Kennzahlen Ihres Bereichs auf einen Blick – ohne auf den Monatsbericht zu warten.",
          media: "IMG_PERSONA_TEAM_LEAD",
        },
      ],
    },

    testimonials: {
      eyebrow: "Kundenstimmen",
      title: "Was unsere Kunden sagen",
      reviewsLink: "Alle Bewertungen auf dem bexio Marketplace",
      /** Replace with real, approved quotes. `image` is optional: path in /public/media. */
      items: [
        {
          quote: "[TESTIMONIAL_1_ZITAT]",
          name: "[TESTIMONIAL_1_NAME]",
          role: "[TESTIMONIAL_1_FUNKTION]",
          company: "[TESTIMONIAL_1_FIRMA]",
          image: undefined as string | undefined,
        },
        {
          quote: "[TESTIMONIAL_2_ZITAT]",
          name: "[TESTIMONIAL_2_NAME]",
          role: "[TESTIMONIAL_2_FUNKTION]",
          company: "[TESTIMONIAL_2_FIRMA]",
          image: undefined as string | undefined,
        },
        {
          quote: "[TESTIMONIAL_3_ZITAT]",
          name: "[TESTIMONIAL_3_NAME]",
          role: "[TESTIMONIAL_3_FUNKTION]",
          company: "[TESTIMONIAL_3_FIRMA]",
          image: undefined as string | undefined,
        },
      ],
    },

    pricing: {
      eyebrow: "Preise",
      title: "Ein Preis. *Pro bexio-Firma.*",
      intro: "Alle Funktionen inklusive. Sie zahlen pro verbundener bexio-Firma – der erste Monat ist kostenlos.",
      billingLabel: "Abrechnung wählen",
      /** Prices themselves live in lib/pricing.ts. */
      billing: {
        monthly: { label: "Monatlich", note: "Monatlich abgerechnet" },
        yearly: { label: "Jährlich", note: "Jährlich abgerechnet" },
      },
      savingsBadge: "–{percent} %",
      unit: "pro Monat je bexio-Firma",
      plan: {
        name: "smiit Analytics",
        badge: "Alle Funktionen",
        description: "Berichte, KI-Assistent und Automatisierungen – alles inklusive.",
      },
      breakdown: {
        title: "So setzt sich der Preis zusammen",
        company: "Pro bexio-Firma",
        firstUser: "Erster Nutzer je Firma",
        moreUsers: "Jeder weitere Nutzer",
        perMonth: "/ Monat",
        free: "kostenlos",
        note: "Alle Preise in CHF. Exkl. Mehrwertsteuer.",
      },
      cta: "30 Tage kostenlos testen",
      trial: {
        badge: "Kostenlos",
        title: "Erster Monat gratis",
        text: "Testen Sie smiit Analytics einen Monat lang – ohne Einschränkungen.",
        features: ["Unlimitierte Firmen", "Treuhandzugang", "Unlimitierte Nutzer"],
        /** {price} = price of the selected billing (per month and company). */
        after: "Danach ab CHF {price} pro Monat je bexio-Firma.",
        cta: "Jetzt kostenlos testen",
      },
    },

    security: {
      eyebrow: "Sicherheit & Datenschutz",
      title: "Transparent, *wo Ihre Daten liegen.*",
      items: [
        { icon: "server", title: "Hosting", text: "[HOSTING_STANDORT]" },
        { icon: "shield", title: "Datenschutz", text: "[DATENSCHUTZ_DSG_DSGVO]" },
        { icon: "key", title: "Zugriff auf bexio", text: "[BEXIO_ZUGRIFFSART]" },
      ],
      privacyLink: "Zur Datenschutzerklärung",
    },

    faq: {
      eyebrow: "FAQ",
      title: "Häufige *Fragen*",
      /**
       * Keyed by id; the anchor is `faq-<id>` (e.g. /de/#faq-mcp). Rendered in this order.
       * `[[privacy|label]]` / `[[terms|label]]` in an answer becomes a link to that page.
       */
      items: {
        setup: {
          question: "Wie lange dauert die Einrichtung?",
          answer:
            "Das hängt von der Datenmenge in Ihrem bexio ab. Meist sind es rund 5 Minuten: Sie erstellen ein Konto, verbinden bexio und sehen danach Ihre Standardberichte. Bei grösseren Firmen mit vielen Buchungen kann der erste Datenabgleich auch länger dauern.",
        },
        skills: {
          question: "Brauche ich IT-Kenntnisse?",
          answer:
            "Nein. smiit Analytics läuft im Browser, Sie installieren nichts. Die Verbindung zu bexio richten Sie mit wenigen Klicks ein. Berichte passen Sie per Drag & Drop an – oder Sie fragen einfach die KI.",
        },
        trial: {
          question: "Was passiert nach den 30 Tagen Test?",
          answer:
            "Nach 30 Tagen endet der Test einfach – ein Abo entsteht dabei nicht, und es wird nichts automatisch abgerechnet. Möchten Sie smiit Analytics weiter nutzen, wählen Sie aktiv ein Paket. Ohne Paket endet der Zugriff. Keine automatische Verlängerung, keine versteckten Haken.",
        },
        mcp: {
          question: "Was ist MCP?",
          answer:
            "MCP steht für «Model Context Protocol». Das ist ein offener Standard, über den KI-Assistenten wie ChatGPT oder Claude mit anderen Programmen zusammenarbeiten. Man kann es sich wie eine Steckdose für KI vorstellen. Verbinden Sie smiit Analytics per MCP, beantwortet Ihr gewohnter Assistent Fragen zu Ihren bexio-Daten – ohne dass Sie Zahlen kopieren müssen.",
        },
        data: {
          question: "Wer sieht meine Daten?",
          answer:
            "Nur Sie und die Personen, die Sie aktiv berechtigen. Auch wir bei smiit Analytics sehen Ihre Daten nicht. Einzige Ausnahme: Bei einer Support-Anfrage können wir einen zeitlich begrenzten Zugriff anfragen – und auch diesen müssen Sie aktiv bestätigen. Mehr dazu in der [[privacy|Datenschutzerklärung]].",
        },
        cancellation: {
          question: "Wie kann ich kündigen?",
          answer:
            "Sie können jederzeit zum Ende der bereits bezahlten Laufzeit kündigen. Beim Monatsabo gilt das für jeden Monatszeitraum: Haben Sie das Abo am 10. abgeschlossen, können Sie jeweils bis zum 9. kündigen. Beim Jahresabo gilt dasselbe, nur jährlich. Details finden Sie in den [[terms|Nutzungsbedingungen]].",
        },
        companies: {
          question: "Kann ich mehrere bexio-Firmen verbinden?",
          answer:
            "Ja. Pro Organisation verbinden Sie beliebig viele bexio-Firmen und sehen alle in einem Login – ideal für Treuhandbüros mit mehreren Mandanten. Sie zahlen pro Firma: CHF {yearly} pro Monat im Jahresabo oder CHF {monthly} im Monatsabo.",
        },
      },
    },

    finalCta: {
      title: "Bereit für *den Überblick?*",
      text: "Verbinden Sie bexio und sehen Sie in rund 5 Minuten Ihre ersten Berichte.",
      primary: "30 Tage kostenlos testen",
      secondary: "Demo buchen",
    },
  },

  /** Interactive demo dashboards in the "reports" section. All data is fictional. */
  demo: {
    note: "Beispieldaten",
    keyboardHint: "Mit Pfeiltasten durch die Werte navigieren",
    /** Shared labels of the demo data (keys: lib/demo/*). */
    banks: {
      business: "Geschäftskonto CHF",
      savings: "Sparkonto",
      postal: "Postkonto",
      eur: "Konto EUR",
    },
    projectNames: {
      seeblick: "Neubau Seeblick",
      oldTown: "Sanierung Altstadthaus",
      maintenance: "Wartung Kunden",
      officeRhein: "Innenausbau Büro Rhein",
      lindenhof: "Umbau Praxis Lindenhof",
      facadeNord: "Fassade Gewerbehaus Nord",
      internal: "Intern",
      smallJobs: "Kleinaufträge",
    },
    sales: {
      title: "Verkauf",
      kpis: {
        revenue: "Umsatz",
        invoices: "Rechnungen",
        avgInvoice: "Ø Rechnungswert",
        newCustomers: "Umsatz mit Neukunden",
      },
      revenueChart: {
        title: "Umsatz je Monat mit Vorjahr",
        current: "Umsatz",
        previous: "Umsatz, Vorjahr",
        vsPrev: "vs. Vorjahr",
      },
      concentration: {
        title: "Umsatzkonzentration je Kunde",
        legend: "Umsatz",
        /** {n} customers, {share} = cumulative share in percent */
        summary: "Top {n} = {share} des Umsatzes",
        share: "des Umsatzes",
        cumulative: "kumuliert",
      },
      receivables: {
        title: "Debitoren nach Fälligkeit",
        share: "der offenen Posten",
        buckets: {
          notDue: "Nicht fällig",
          d1to30: "1–30 Tage",
          d31to60: "31–60 Tage",
          d61to90: "61–90 Tage",
          over90: "über 90 Tage",
        },
      },
      products: {
        title: "Top-Produkte nach Umsatz",
        share: "des Umsatzes",
        names: {
          maintenance: "Wartungsverträge",
          installation: "Installation",
          consulting: "Beratung",
          materials: "Material & Ersatzteile",
          training: "Schulungen",
          support: "Support-Pakete",
        },
      },
    },
    balance: {
      title: "Bilanz",
      kpis: {
        total: "Bilanzsumme",
        equityRatio: "Eigenkapitalquote",
        liquid: "Liquide Mittel",
        debtRatio: "Fremdkapitalquote",
      },
      assets: { title: "Bilanz – Aktiven", column: "Aktiven" },
      liabilities: { title: "Bilanz – Passiven", column: "Passiven" },
      group: "Kontengruppe",
      total: "Gesamt",
      expand: "aufklappen",
      collapse: "zuklappen",
      groups: {
        current: "Umlaufvermögen",
        fixed: "Anlagevermögen",
        shortTerm: "Kurzfristiges Fremdkapital",
        longTerm: "Langfristiges Fremdkapital",
        equity: "Eigenkapital",
      },
      accounts: {
        cash: "Flüssige Mittel",
        receivables: "Forderungen aus Lieferungen und Leistungen",
        inventory: "Vorräte",
        prepaid: "Aktive Rechnungsabgrenzungen",
        movables: "Mobile Sachanlagen",
        realEstate: "Immobile Sachanlagen",
        financial: "Finanzanlagen",
        payables: "Verbindlichkeiten aus Lieferungen und Leistungen",
        interestBearing: "Kurzfristige verzinsliche Verbindlichkeiten",
        otherShortTerm: "Übrige kurzfristige Verbindlichkeiten",
        bankLoan: "Bankdarlehen",
        provisions: "Rückstellungen",
        shareCapital: "Stammkapital",
        legalReserve: "Gesetzliche Gewinnreserve",
        retained: "Gewinnvortrag",
        profit: "Jahresgewinn",
      },
      banks: {
        chartTitle: "Bankguthaben je Konto",
        tableTitle: "Bankkonten",
        date: "Letzte Bewegung",
        account: "Bankkonto",
        balance: "Kontostand",
        movements: "Bewegungen",
        share: "der Bankguthaben",
      },
    },
    worktime: {
      title: "Arbeitszeiten",
      unit: "Std.",
      kpis: {
        hours: "Stunden",
        billable: "Verrechenbare Stunden",
        utilization: "Auslastung",
        overtime: "Über-/Unterstunden",
      },
      monthly: { title: "Stunden je Monat", hours: "Stunden", billable: "Verrechenbare Stunden" },
      services: {
        title: "Stunden je Leistung",
        share: "der Stunden",
        names: {
          execution: "Ausführung",
          administration: "Administration",
          planning: "Planung",
          consulting: "Beratung",
        },
      },
      employees: { title: "Stunden je Mitarbeitende", share: "der Stunden" },
      projects: { title: "Stunden je Projekt", share: "der Stunden" },
    },
    projects: {
      title: "Projekte",
      kpis: {
        projects: "Projekte",
        active: "Aktive Projekte",
        budget: "Projektbudget",
        open: "Offenes Budget",
      },
      gantt: {
        title: "Projekte im Zeitverlauf",
        today: "Heute",
        status: { done: "Abgeschlossen", active: "Aktiv", planned: "Geplant" },
        progress: "Fortschritt",
        lead: "Projektleitung",
      },
      scatter: {
        title: "Budget vs. Fakturiert je Projekt",
        x: "Projektbudget",
        y: "Fakturiert",
        reference: "100 % Budget",
      },
      utilization: {
        title: "Budgetausschöpfung je Projekt",
        ratio: "Ausschöpfung",
        over: "über Budget",
        budget: "Budget",
        invoiced: "Fakturiert",
      },
    },
    cashflow: {
      title: "Cashflow",
      kpis: {
        inflows: "Zahlungseingänge",
        outflows: "Zahlungsausgänge",
        net: "Netto-Cashveränderung",
        days: "Ø Tage bis Zahlungseingang",
        daysUnit: "Tage",
      },
      flows: { title: "Zu- und Abflüsse je Monat", inflows: "Zuflüsse", outflows: "Abflüsse", net: "Netto-Veränderung" },
      waterfall: { title: "Cashverlauf je Monat", up: "Zunahme", down: "Abnahme", total: "Gesamt", cumulative: "kumuliert" },
      banks: { title: "Netto-Veränderung je Bankkonto" },
      overdue: { title: "Überfällige Forderungen je Kunde", share: "der überfälligen Forderungen" },
    },
  },

  footer: {
    tagline: "Verständliche Auswertungen für bexio – für Schweizer KMU und Treuhandbüros.",
    productOf: "Ein Produkt der",
    company: "smiit GmbH",
    contactTitle: "Kontakt",
    legalTitle: "Rechtliches",
    productTitle: "Produkt",
    linkedin: "LinkedIn",
    copyright: "smiit GmbH. Alle Rechte vorbehalten.",
  },

  legal: {
    /** `nav` = short label in the footer. `title` may contain soft hyphens (­) for long words. */
    legalNotice: {
      /** Company facts (address, register, VAT ID …) are in lib/site.ts (COMPANY). */
      nav: "Impressum",
      title: "Impressum",
      description: "Impressum von smiit Analytics, einem Produkt der smiit GmbH: Anschrift, Geschäftsführung, Handelsregister und Kontakt.",
      subtitle: "Angaben gemäss § 5 DDG",
      contact: "Kontakt",
      phone: "Telefon",
      email: "E-Mail",
      representedBy: "Vertreten durch",
      managingDirectors: "Geschäftsführer",
      register: "Handelsregister",
      registerCourt: "Amtsgericht Ulm",
      vatId: "Umsatzsteuer-ID",
      responsible: "Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)",
      dispute: "Streitschlichtung",
      disputeText: "Wir sind nicht verpflichtet, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen und nehmen daran nicht teil.",
      country: "Deutschland",
    },
    privacy: {
      nav: "Datenschutz",
      title: "Datenschutzerklärung",
      description: "Datenschutzerklärung von smiit Analytics.",
      body: "[DATENSCHUTZ_TEXT]",
    },
    terms: {
      nav: "Nutzungsbedingungen",
      title: "Nutzungsbedingungen",
      description: "Nutzungsbedingungen von smiit Analytics.",
      body: "[NUTZUNGSBEDINGUNGEN_TEXT]",
    },
    dpa: {
      nav: "AVV",
      // Breaks on phones as «Auftrags-/verarbeitungs-/vertrag».
      title: "Auftrags­verarbeitungs­vertrag (AVV)",
      description: "Auftragsverarbeitungsvertrag (AVV) für smiit Analytics.",
      body: "[AVV_TEXT]",
    },
  },

  notFound: {
    title: "Seite nicht gefunden",
    text: "Die von Ihnen gesuchte Seite existiert leider nicht.",
    cta: "Zur Startseite",
    imageAlt: "Zwei Personen sitzen auf Würfeln und arbeiten am Laptop",
  },

  error: {
    /** Shown when a page fails to render (app/[lang]/error.tsx). */
    title: "Etwas ist schiefgelaufen",
    text: "Beim Laden dieser Seite ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
    retry: "Erneut versuchen",
    home: "Zur Startseite",
  },

  consent: {
    label: "Cookie-Hinweis",
    text: "[CONSENT_TEXT]",
    accept: "Akzeptieren",
    decline: "Ablehnen",
    more: "Mehr erfahren",
  },

  /**
   * Text inside the generated illustrations (scripts/build-illustrations.mjs,
   * one image set per language). Keep them about as short as the German ones –
   * the layouts have fixed widths. Numbers are formatted by the script.
   */
  illustrations: {
    connect: {
      title: "Datenquelle verbinden",
      text: ["Verbinden Sie eine Datenquelle mit diesem Workspace,", "um Ihren ersten Bericht zu erstellen."],
      bexio: "Binden Sie Ihre bexio Firma an.",
    },
    packages: {
      names: ["Standard", "Sales", "Finanzen", "Management"],
      ready: "Bereit",
    },
    editor: {
      elements: "Elemente",
      items: ["Kennzahl", "Linie", "Balken", "Tabelle"],
      revenue: "Umsatz",
      invoices: "Rechnungen",
      drop: "Hier ablegen",
      prompt: "Zeig mir den Umsatz pro Quartal",
    },
    workspaces: {
      account: "Ihr Account",
      clients: "Mandanten",
      create: "Workspace erstellen",
      report: "Verkauf",
      revenue: "Umsatz",
      invoices: "Rechnungen",
    },
    owner: {
      overview: "Übersicht",
      revenueMonth: "Umsatz Monat",
      /** {change} = e.g. "+11.8 %" */
      vsPrev: "{change} vs. Vorjahr",
      openInvoices: "Offene Rechnungen",
      revenueYear: "Umsatz 12 Monate",
      weekly: "Wochenüberblick",
      weeklyText: "Umsatz {change} vs. Vorjahr",
      paid: "Zahlung eingegangen",
      monthly: "Monatsbericht bereit",
      monthlyText: "Automatisch erstellt",
    },
    trustee: {
      revenue: "Umsatz",
      open: "Offen",
      export: "Exportieren",
    },
    teamLead: {
      title: "Mein Bereich",
      subtitle: "Montage · letzte 12 Monate",
      utilization: "Auslastung",
      billable: "Verrechenbar",
      /** {total} = total hours incl. unit */
      of: "von {total}",
      perPerson: "Stunden je Person",
    },
  },

  /** Alt texts of all media slots (ids: lib/media.ts). */
  media: {
    VIDEO_HERO: "Rundgang durch smiit Analytics: Dashboard mit Umsatz, offenen Rechnungen und Kennzahlen",
    VIDEO_DEMO_FULL: "Produktdemo von smiit Analytics",
    LOGO_1: "[LOGO_1_FIRMENNAME]",
    LOGO_2: "[LOGO_2_FIRMENNAME]",
    LOGO_3: "[LOGO_3_FIRMENNAME]",
    LOGO_4: "[LOGO_4_FIRMENNAME]",
    LOGO_5: "[LOGO_5_FIRMENNAME]",
    IMG_STEP_1: "bexio-Verbindung in smiit Analytics herstellen",
    IMG_STEP_2: "Berichtsübersicht mit den Paketen Standard, Sales, Finanzen und Management, alle bereit",
    IMG_STEP_3: "Bericht wird per Drag & Drop angepasst",
    VIDEO_DRAGDROP: "Eine Kennzahl wird per Drag & Drop in einen Bericht gezogen",
    IMG_MULTI_COMPANY:
      "Ein Login für das Treuhandbüro: Workspace-Liste mit allen Mandanten, ein Klick öffnet den Bericht des gewählten Mandanten",
    VIDEO_AI_CHAT: "Frage an die KI und die Antwort als Diagramm",
    IMG_PERSONA_MANAGEMENT:
      "Smartphone mit Umsatz und offenen Rechnungen, daneben automatische Hinweise wie Wochenüberblick und Zahlungseingang",
    IMG_PERSONA_TRUSTEE: "Berichte mehrerer Mandanten übereinander, der vorderste mit Exportieren-Button",
    IMG_PERSONA_TEAM_LEAD: "Bereichsansicht mit Team-Auslastung und Stunden je Person",
  },
}

export type Dictionary = typeof de

/* ── English ───────────────────────────────────────────────────── */

const en: Dictionary = {
  meta: {
    title: "smiit Analytics – Make sense of your bexio data in 5 minutes",
    description:
      "Connect bexio in 5 minutes and instantly see reports on sales, balance sheet and cash flow. Customise by drag and drop, ask the AI. Free 30-day trial.",
    ogImageAlt: "smiit Analytics – Reporting for bexio",
    appCategory: "Business analytics for bexio",
    home: "Home",
  },

  /** Number and date format of the demo dashboards and illustrations. */
  format: {
    group: "’",
    decimal: ".",
    percent: "{n}%",
    thousands: "{n}k",
    millions: "{n}m",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },

  common: {
    skipLink: "Skip to content",
    close: "Close",
    externalHint: "(opens in a new tab)",
    homeLabel: "smiit Analytics – go to home page",
    productName: "smiit Analytics",
  },

  language: {
    label: "Choose language",
    current: "Current language: {language}",
    names: { de: "Deutsch", en: "English", fr: "Français", it: "Italiano" },
  },

  nav: {
    label: "Main navigation",
    chapters: {
      label: "Chapters",
      items: {
        problem: "Problem",
        howItWorks: "Steps",
        features: "Reports",
        customize: "Customise",
        ai: "AI",
        automations: "Automation",
        audiences: "Audience",
        testimonials: "Customers",
        pricing: "Pricing",
        security: "Security",
        faq: "FAQ",
      },
    },
    /** Keyed by section id on the home page; order and anchors: lib/routes.ts. */
    items: {
      features: "Features",
      ai: "AI",
      automations: "Automations",
      pricing: "Pricing",
      faq: "FAQ",
    },
    cta: "Try for free",
    login: "Login",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },

  home: {
    hero: {
      title: "Make sense of your bexio data *in 5 minutes.*",
      subtitle:
        "Connect bexio and see at once where your business stands. Design your own reports and leave questions and routine work to the AI.",
      ctaPrimary: "Try free for 30 days",
      ctaSecondary: "Watch the 2-min demo",
      demoTitle: "smiit Analytics in 2 minutes",
    },

    trust: {
      title: "These companies work with smiit Analytics",
      rating: {
        value: "5.0",
        label: "on the bexio Marketplace",
        srLabel: "out of 5 stars – view reviews (opens in a new tab)",
      },
    },

    problem: {
      eyebrow: "The problem",
      title: "The numbers are there. *The overview is not.*",
      pains: [
        {
          icon: "code",
          title: "Missing automations",
          text: "Reminders, reports and analyses are done by hand – or have to be custom-built with costly development work.",
        },
        {
          icon: "clock",
          title: "Monthly reports take hours",
          text: "By the time the report is finished, the numbers are already out of date.",
        },
        {
          icon: "eyeOff",
          title: "No overview day to day",
          text: "How are sales going? Who hasn't paid yet? The answer is buried somewhere in bexio.",
        },
      ],
      solution:
        "smiit Analytics pulls your data directly from bexio and turns it into clear reports. Automatically and without Excel.",
    },

    steps: {
      eyebrow: "How it works",
      title: "Three steps *to a clear overview*",
      items: [
        {
          title: "Connect bexio",
          text: "Create an account and connect bexio. It takes around 5 minutes – no installation needed.",
          media: "IMG_STEP_1",
        },
        {
          title: "View reports",
          text: "Standard reports on sales, balance sheet, cash flow and more are ready straight away.",
          media: "IMG_STEP_2",
        },
        {
          title: "Customise",
          text: "Change KPIs with drag and drop or simply ask the AI.",
          media: "IMG_STEP_3",
        },
      ],
    },

    reports: {
      eyebrow: "Connect & see instantly",
      title: "Ready-made reports. *From day one.*",
      intro: "Once connected, your key reports are ready. There is nothing to set up.",
      tabsLabel: "Choose report area",
      /** Every tab shows the interactive demo dashboard of the same key (texts: `demo`). */
      tabs: {
        sales: "Sales",
        balance: "Balance sheet",
        worktime: "Working hours",
        projects: "Projects",
        cashflow: "Cash flow",
      },
    },

    customize: {
      eyebrow: "Design your own",
      title: "Your reports. *Exactly the way you want them.*",
      intro: "Simply drag KPIs and charts to where you want them. No coding, no Excel.",
      points: [
        {
          icon: "layout",
          title: "Create your own reports",
          text: "Combine KPIs and analyses exactly as you need them – with drag and drop.",
        },
        {
          icon: "download",
          title: "Export and share",
          text: "Export your reports ([EXPORT_FORMATE]) – for the meeting, the bank or the board of directors.",
        },
        {
          icon: "users",
          title: "Multiple users & companies",
          text: "Invite your team and connect several bexio companies in one organisation.",
        },
      ],
      trustee: {
        title: "For fiduciary firms: *All clients in one login.*",
        text: "Connect your clients' bexio companies in one organisation and keep track of all of them.",
      },
    },

    ai: {
      eyebrow: "Automatic & intelligent",
      title: "Ask your numbers. *The AI answers.*",
      intro:
        "Ask questions in plain language, such as “Which customers generated the most revenue this year?”. The AI answers directly from your bexio data.",
      capabilities: [
        { title: "Answer questions", text: "Answers to your questions – no searching and no formulas." },
        { title: "Adjust analyses", text: "“Show me this by quarter” – and the analysis changes." },
        { title: "Create entire reports", text: "Describe what you want to see. The AI builds the report." },
      ],
      mcp: {
        badge: "For ChatGPT, Claude & co.",
        title: "Also available in the AI assistant you already use",
        text: "Already working with ChatGPT or Claude? Then connect smiit Analytics to it directly. Ask your assistant about revenue or open invoices – it gets the answer from your bexio data.",
        link: "How does it work?",
      },
    },

    automations: {
      eyebrow: "Automations",
      title: "Routine work? *Takes care of itself.*",
      intro:
        "Define once what should happen. smiit Analytics checks your bexio data and acts for you.",
      /** Animated example flow (trigger → data → condition → two branches → info). */
      flow: {
        label: "Example flow",
        live: "Runs automatically",
        srSummary:
          "Example flow: An invoice is 14 days overdue. smiit Analytics retrieves the customer and the open amount from bexio and checks whether the customer has already been reminded. If not, a friendly reminder email is sent to the customer; if so, a second reminder with a deadline. You then receive a notification.",
        trigger: { kind: "Trigger", title: "Invoice 14 days overdue", icon: "fileClock" },
        fetch: { kind: "bexio data", title: "Get customer & open amount", icon: "database" },
        condition: { kind: "Condition", title: "Already reminded?", icon: "branch" },
        branchA: { label: "No", kind: "Action", title: "Reminder email to customer", icon: "mail" },
        branchB: { label: "Yes", kind: "Action", title: "2nd reminder with deadline", icon: "mailWarning" },
        notify: { kind: "Info", title: "Notification to you", icon: "bell" },
      },
      examples: [
        {
          icon: "mail",
          title: "Payment reminders",
          text: "Remind customers of open invoices automatically and politely.",
        },
        {
          icon: "calendar",
          title: "Weekly summary by email",
          text: "The key figures in your inbox every Monday.",
        },
        {
          icon: "alert",
          title: "Alerts on anomalies",
          text: "A message as soon as a KPI rises above or falls below a value you define.",
        },
        {
          icon: "clock",
          title: "Timesheet summary",
          text: "Your employees regularly receive an overview of their recorded hours.",
        },
      ],
      custom: {
        title: "Not limited to templates",
        text: "Set up any automation you like. Describe to the AI in your own words what should happen – it creates the automation for you.",
      },
    },

    audiences: {
      eyebrow: "Who is it for?",
      title: "Made for people, *not for IT departments.*",
      items: [
        {
          title: "SME management",
          text: "You always know where your business stands. Without gathering numbers yourself. Without the effort.",
          media: "IMG_PERSONA_MANAGEMENT",
        },
        {
          title: "Fiduciaries & accounting",
          text: "All clients in one login – with reports you can show your clients directly.",
          media: "IMG_PERSONA_TRUSTEE",
        },
        {
          title: "Team leads",
          text: "Your area's KPIs at a glance – without waiting for the monthly report.",
          media: "IMG_PERSONA_TEAM_LEAD",
        },
      ],
    },

    testimonials: {
      eyebrow: "Testimonials",
      title: "What our customers say",
      reviewsLink: "All reviews on the bexio Marketplace",
      /** Replace with real, approved quotes. `image` is optional: path in /public/media. */
      items: [
        {
          quote: "[TESTIMONIAL_1_ZITAT]",
          name: "[TESTIMONIAL_1_NAME]",
          role: "[TESTIMONIAL_1_FUNKTION]",
          company: "[TESTIMONIAL_1_FIRMA]",
          image: undefined as string | undefined,
        },
        {
          quote: "[TESTIMONIAL_2_ZITAT]",
          name: "[TESTIMONIAL_2_NAME]",
          role: "[TESTIMONIAL_2_FUNKTION]",
          company: "[TESTIMONIAL_2_FIRMA]",
          image: undefined as string | undefined,
        },
        {
          quote: "[TESTIMONIAL_3_ZITAT]",
          name: "[TESTIMONIAL_3_NAME]",
          role: "[TESTIMONIAL_3_FUNKTION]",
          company: "[TESTIMONIAL_3_FIRMA]",
          image: undefined as string | undefined,
        },
      ],
    },

    pricing: {
      eyebrow: "Pricing",
      title: "One price. *Per bexio company.*",
      intro: "All features included. You pay per connected bexio company – the first month is free.",
      billingLabel: "Choose billing",
      /** Prices themselves live in lib/pricing.ts. */
      billing: {
        monthly: { label: "Monthly", note: "Billed monthly" },
        yearly: { label: "Yearly", note: "Billed yearly" },
      },
      savingsBadge: "–{percent}%",
      unit: "per month per bexio company",
      plan: {
        name: "smiit Analytics",
        badge: "All features",
        description: "Reports, AI assistant and automations – all included.",
      },
      breakdown: {
        title: "How the price is made up",
        company: "Per bexio company",
        firstUser: "First user per company",
        moreUsers: "Each additional user",
        perMonth: "/ month",
        free: "free",
        note: "All prices in CHF. Excl. VAT.",
      },
      cta: "Try free for 30 days",
      trial: {
        badge: "Free",
        title: "First month free",
        text: "Try smiit Analytics for a month – without restrictions.",
        features: ["Unlimited companies", "Fiduciary access", "Unlimited users"],
        /** {price} = price of the selected billing (per month and company). */
        after: "Then from CHF {price} per month per bexio company.",
        cta: "Try it free now",
      },
    },

    security: {
      eyebrow: "Security & privacy",
      title: "Transparent about *where your data is stored.*",
      items: [
        { icon: "server", title: "Hosting", text: "[HOSTING_STANDORT]" },
        { icon: "shield", title: "Data protection", text: "[DATENSCHUTZ_DSG_DSGVO]" },
        { icon: "key", title: "Access to bexio", text: "[BEXIO_ZUGRIFFSART]" },
      ],
      privacyLink: "Read the privacy policy",
    },

    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked *questions*",
      /** Keyed by id; the anchor is `faq-<id>` (e.g. /de/#faq-mcp). Rendered in this order. */
      items: {
        setup: {
          question: "How long does setup take?",
          answer:
            "It depends on the amount of data in your bexio account. It usually takes around 5 minutes: you create an account, connect bexio and then see your standard reports. For larger companies with many records, the first data sync can take longer.",
        },
        skills: {
          question: "Do I need IT skills?",
          answer:
            "No. smiit Analytics runs in your browser, there is nothing to install. You set up the connection to bexio in a few clicks. You customise reports with drag and drop – or simply ask the AI.",
        },
        trial: {
          question: "What happens after the 30-day trial?",
          answer:
            "After 30 days the trial simply ends – it does not turn into a subscription and nothing is charged automatically. If you want to keep using smiit Analytics, you actively choose a plan. Without a plan, your access ends. No automatic renewal, no hidden catches.",
        },
        mcp: {
          question: "What is MCP?",
          answer:
            "MCP stands for “Model Context Protocol”. It is an open standard that lets AI assistants such as ChatGPT or Claude work with other programs. Think of it as a power socket for AI. If you connect smiit Analytics via MCP, the assistant you already use answers questions about your bexio data – without you having to copy any numbers.",
        },
        data: {
          question: "Who can see my data?",
          answer:
            "Only you and the people you actively authorise. Not even we at smiit Analytics can see your data. The only exception: for a support request we may ask for time-limited access – which you also have to actively approve. More in our [[privacy|privacy policy]].",
        },
        cancellation: {
          question: "How can I cancel?",
          answer:
            "You can cancel at any time, effective at the end of the period you have already paid for. With the monthly plan this applies to each monthly period: if you subscribed on the 10th, you can cancel up to the 9th. The yearly plan works the same way, just per year. Details in the [[terms|terms of use]].",
        },
        companies: {
          question: "Can I connect several bexio companies?",
          answer:
            "Yes. You can connect as many bexio companies as you like per organisation and see them all in one login – ideal for fiduciary firms with several clients. You pay per company: CHF {yearly} per month on the annual plan or CHF {monthly} on the monthly plan.",
        },
      },
    },

    finalCta: {
      title: "Ready for *a clear overview?*",
      text: "Connect bexio and see your first reports in around 5 minutes.",
      primary: "Try free for 30 days",
      secondary: "Book a demo",
    },
  },

  /** Interactive demo dashboards in the "reports" section. All data is fictional. */
  demo: {
    note: "Sample data",
    keyboardHint: "Use the arrow keys to navigate through the values",
    /** Shared labels of the demo data (keys: lib/demo/*). */
    banks: {
      business: "Business account CHF",
      savings: "Savings account",
      postal: "PostFinance account",
      eur: "EUR account",
    },
    projectNames: {
      seeblick: "New build Seeblick",
      oldTown: "Old town house renovation",
      maintenance: "Customer maintenance",
      officeRhein: "Office fit-out Rhein",
      lindenhof: "Practice conversion Lindenhof",
      facadeNord: "Facade commercial building Nord",
      internal: "Internal",
      smallJobs: "Small jobs",
    },
    sales: {
      title: "Sales",
      kpis: {
        revenue: "Revenue",
        invoices: "Invoices",
        avgInvoice: "Avg. invoice value",
        newCustomers: "Revenue from new customers",
      },
      revenueChart: {
        title: "Monthly revenue vs. previous year",
        current: "Revenue",
        previous: "Revenue, previous year",
        vsPrev: "vs. previous year",
      },
      concentration: {
        title: "Revenue concentration by customer",
        legend: "Revenue",
        /** {n} customers, {share} = cumulative share in percent */
        summary: "Top {n} = {share} of revenue",
        share: "of revenue",
        cumulative: "cumulative",
      },
      receivables: {
        title: "Receivables by due date",
        share: "of open items",
        buckets: {
          notDue: "Not due",
          d1to30: "1–30 days",
          d31to60: "31–60 days",
          d61to90: "61–90 days",
          over90: "over 90 days",
        },
      },
      products: {
        title: "Top products by revenue",
        share: "of revenue",
        names: {
          maintenance: "Maintenance contracts",
          installation: "Installation",
          consulting: "Consulting",
          materials: "Materials & spare parts",
          training: "Training",
          support: "Support packages",
        },
      },
    },
    balance: {
      title: "Balance sheet",
      kpis: {
        total: "Total assets",
        equityRatio: "Equity ratio",
        liquid: "Cash and cash equivalents",
        debtRatio: "Debt ratio",
      },
      assets: { title: "Balance sheet – Assets", column: "Assets" },
      liabilities: { title: "Balance sheet – Liabilities and equity", column: "Liabilities and equity" },
      group: "Account group",
      total: "Total",
      expand: "expand",
      collapse: "collapse",
      groups: {
        current: "Current assets",
        fixed: "Fixed assets",
        shortTerm: "Short-term liabilities",
        longTerm: "Long-term liabilities",
        equity: "Equity",
      },
      accounts: {
        cash: "Cash and cash equivalents",
        receivables: "Trade receivables",
        inventory: "Inventories",
        prepaid: "Prepaid expenses and accrued income",
        movables: "Movable fixed assets",
        realEstate: "Immovable fixed assets",
        financial: "Financial assets",
        payables: "Trade payables",
        interestBearing: "Short-term interest-bearing liabilities",
        otherShortTerm: "Other short-term liabilities",
        bankLoan: "Bank loan",
        provisions: "Provisions",
        shareCapital: "Share capital",
        legalReserve: "Statutory retained earnings",
        retained: "Retained earnings",
        profit: "Profit for the year",
      },
      banks: {
        chartTitle: "Bank balances by account",
        tableTitle: "Bank accounts",
        date: "Last movement",
        account: "Bank account",
        balance: "Balance",
        movements: "Movements",
        share: "of bank balances",
      },
    },
    worktime: {
      title: "Working hours",
      unit: "h",
      kpis: {
        hours: "Hours",
        billable: "Billable hours",
        utilization: "Utilisation",
        overtime: "Overtime/undertime",
      },
      monthly: { title: "Hours per month", hours: "Hours", billable: "Billable hours" },
      services: {
        title: "Hours by service",
        share: "of hours",
        names: {
          execution: "Execution",
          administration: "Administration",
          planning: "Planning",
          consulting: "Consulting",
        },
      },
      employees: { title: "Hours by employee", share: "of hours" },
      projects: { title: "Hours by project", share: "of hours" },
    },
    projects: {
      title: "Projects",
      kpis: {
        projects: "Projects",
        active: "Active projects",
        budget: "Project budget",
        open: "Remaining budget",
      },
      gantt: {
        title: "Projects over time",
        today: "Today",
        status: { done: "Completed", active: "Active", planned: "Planned" },
        progress: "Progress",
        lead: "Project lead",
      },
      scatter: {
        title: "Budget vs. invoiced by project",
        x: "Project budget",
        y: "Invoiced",
        reference: "100% budget",
      },
      utilization: {
        title: "Budget usage by project",
        ratio: "Usage",
        over: "over budget",
        budget: "Budget",
        invoiced: "Invoiced",
      },
    },
    cashflow: {
      title: "Cash flow",
      kpis: {
        inflows: "Incoming payments",
        outflows: "Outgoing payments",
        net: "Net change in cash",
        days: "Avg. days to payment",
        daysUnit: "days",
      },
      flows: { title: "Inflows and outflows per month", inflows: "Inflows", outflows: "Outflows", net: "Net change" },
      waterfall: { title: "Cash development per month", up: "Increase", down: "Decrease", total: "Total", cumulative: "cumulative" },
      banks: { title: "Net change by bank account" },
      overdue: { title: "Overdue receivables by customer", share: "of overdue receivables" },
    },
  },

  footer: {
    tagline: "Clear reporting for bexio – for Swiss SMEs and fiduciary firms.",
    productOf: "A product of",
    company: "smiit GmbH",
    contactTitle: "Contact",
    legalTitle: "Legal",
    productTitle: "Product",
    linkedin: "LinkedIn",
    copyright: "smiit GmbH. All rights reserved.",
  },

  legal: {
    /** `nav` = short label in the footer. `title` may contain soft hyphens (­) for long words. */
    legalNotice: {
      nav: "Legal notice",
      title: "Legal notice",
      description: "Legal notice of smiit Analytics, a product of smiit GmbH: address, management, commercial register and contact.",
      subtitle: "Information pursuant to Section 5 of the German Digital Services Act (DDG)",
      contact: "Contact",
      phone: "Phone",
      email: "Email",
      representedBy: "Represented by",
      managingDirectors: "Managing directors",
      register: "Commercial register",
      registerCourt: "Local Court (Amtsgericht) Ulm",
      vatId: "VAT ID",
      responsible: "Responsible for content (Section 18(2) MStV)",
      dispute: "Dispute resolution",
      disputeText: "We are not obliged to participate in dispute resolution proceedings before a consumer arbitration board and do not participate in them.",
      country: "Germany",
    },
    privacy: {
      nav: "Privacy",
      title: "Privacy policy",
      description: "Privacy policy of smiit Analytics.",
      body: "[DATENSCHUTZ_TEXT]",
    },
    terms: {
      nav: "Terms of use",
      title: "Terms of use",
      description: "Terms of use of smiit Analytics.",
      body: "[NUTZUNGSBEDINGUNGEN_TEXT]",
    },
    dpa: {
      nav: "DPA",
      title: "Data Processing Agreement (DPA)",
      description: "Data Processing Agreement (DPA) for smiit Analytics.",
      body: "[AVV_TEXT]",
    },
  },

  notFound: {
    title: "Page not found",
    text: "Sorry, the page you are looking for does not exist.",
    cta: "Go to home page",
    imageAlt: "Two people sitting on cubes and working on a laptop",
  },

  error: {
    title: "Something went wrong",
    text: "An error occurred while loading this page. Please try again.",
    retry: "Try again",
    home: "Go to homepage",
  },

  consent: {
    label: "Cookie notice",
    text: "[CONSENT_TEXT]",
    accept: "Accept",
    decline: "Decline",
    more: "Learn more",
  },

  /**
   * Text inside the generated illustrations (scripts/build-illustrations.mjs,
   * one image set per language). Keep them about as short as the German ones –
   * the layouts have fixed widths. Numbers are formatted by the script.
   */
  illustrations: {
    connect: {
      title: "Connect a data source",
      text: ["Connect a data source to this workspace", "to create your first report."],
      bexio: "Connect your bexio company.",
    },
    packages: {
      names: ["Standard", "Sales", "Finance", "Management"],
      ready: "Ready",
    },
    editor: {
      elements: "Elements",
      items: ["KPI", "Line", "Bar", "Table"],
      revenue: "Revenue",
      invoices: "Invoices",
      drop: "Drop here",
      prompt: "Show me revenue by quarter",
    },
    workspaces: {
      account: "Your account",
      clients: "Clients",
      create: "Create workspace",
      report: "Sales",
      revenue: "Revenue",
      invoices: "Invoices",
    },
    owner: {
      overview: "Overview",
      revenueMonth: "Revenue this month",
      /** {change} = e.g. "+11.8%" */
      vsPrev: "{change} vs. last year",
      openInvoices: "Open invoices",
      revenueYear: "Revenue, 12 months",
      weekly: "Weekly summary",
      weeklyText: "Revenue {change} YoY",
      paid: "Payment received",
      monthly: "Monthly report ready",
      monthlyText: "Auto-generated",
    },
    trustee: {
      revenue: "Revenue",
      open: "Open",
      export: "Export",
    },
    teamLead: {
      title: "My area",
      subtitle: "Assembly · last 12 months",
      utilization: "Utilisation",
      billable: "Billable",
      /** {total} = total hours incl. unit */
      of: "of {total}",
      perPerson: "Hours per person",
    },
  },

  /** Alt texts of all media slots (ids: lib/media.ts). */
  media: {
    VIDEO_HERO: "Tour of smiit Analytics: dashboard with revenue, open invoices and KPIs",
    VIDEO_DEMO_FULL: "Product demo of smiit Analytics",
    LOGO_1: "[LOGO_1_FIRMENNAME]",
    LOGO_2: "[LOGO_2_FIRMENNAME]",
    LOGO_3: "[LOGO_3_FIRMENNAME]",
    LOGO_4: "[LOGO_4_FIRMENNAME]",
    LOGO_5: "[LOGO_5_FIRMENNAME]",
    IMG_STEP_1: "Connecting bexio in smiit Analytics",
    IMG_STEP_2: "Report overview with the Standard, Sales, Finance and Management packages, all ready",
    IMG_STEP_3: "A report being customised with drag and drop",
    VIDEO_DRAGDROP: "A KPI is dragged into a report",
    IMG_MULTI_COMPANY:
      "One login for the fiduciary firm: workspace list with all clients, one click opens the selected client's report",
    VIDEO_AI_CHAT: "A question to the AI and the answer as a chart",
    IMG_PERSONA_MANAGEMENT:
      "Smartphone showing revenue and open invoices, alongside automatic notifications such as the weekly summary and payment received",
    IMG_PERSONA_TRUSTEE: "Reports of several clients stacked, the front one with an Export button",
    IMG_PERSONA_TEAM_LEAD: "Area view with team workload and hours per person",
  },
}

/* ── French (Switzerland) ──────────────────────────────────────── */

const fr: Dictionary = {
  meta: {
    title: "smiit Analytics – Vos données bexio, claires en 5 minutes",
    description:
      "Connectez bexio en 5 minutes et voyez aussitôt vos rapports de ventes, bilan et cash-flow. Personnalisez-les, interrogez l'IA. Essai gratuit de 30 jours.",
    ogImageAlt: "smiit Analytics – analyses pour bexio",
    appCategory: "Business analytics pour bexio",
    home: "Accueil",
  },

  format: {
    group: " ",
    decimal: ",",
    percent: "{n} %",
    thousands: "{n} k",
    millions: "{n} mio",
    months: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
  },

  common: {
    skipLink: "Aller au contenu",
    close: "Fermer",
    externalHint: "(s'ouvre dans un nouvel onglet)",
    homeLabel: "smiit Analytics – vers l'accueil",
    productName: "smiit Analytics",
  },

  language: {
    label: "Choisir la langue",
    current: "Langue actuelle : {language}",
    names: { de: "Deutsch", en: "English", fr: "Français", it: "Italiano" },
  },

  nav: {
    label: "Navigation principale",
    chapters: {
      label: "Chapitres",
      items: {
        problem: "Problème",
        howItWorks: "Démarrage",
        features: "Rapports",
        customize: "Sur mesure",
        ai: "IA",
        automations: "Routines",
        audiences: "Pour qui",
        testimonials: "Clients",
        pricing: "Prix",
        security: "Sécurité",
        faq: "FAQ",
      },
    },
    items: {
      features: "Fonctions",
      ai: "IA",
      automations: "Automatisations",
      pricing: "Prix",
      faq: "FAQ",
    },
    cta: "Essai gratuit",
    login: "Connexion",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
  },

  home: {
    hero: {
      title: "Vos données bexio. *En 5 minutes*, tout est clair.",
      subtitle:
        "Connectez bexio et voyez immédiatement où en est votre entreprise. Créez vos propres rapports et confiez les questions et les tâches répétitives à l'IA.",
      ctaPrimary: "Essai gratuit de 30 jours",
      ctaSecondary: "Voir la démo de 2 min",
      demoTitle: "smiit Analytics en 2 minutes",
    },

    trust: {
      title: "Ces entreprises travaillent avec smiit Analytics",
      rating: {
        value: "5,0",
        label: "sur le bexio Marketplace",
        srLabel: "sur 5 étoiles – voir les avis (s'ouvre dans un nouvel onglet)",
      },
    },

    problem: {
      eyebrow: "Le problème",
      title: "Les chiffres sont là. *La vue d'ensemble manque.*",
      pains: [
        {
          icon: "code",
          title: "Automatisations manquantes",
          text: "Relances, rapports et analyses se font à la main – ou doivent être développés sur mesure, avec des coûts de programmation élevés.",
        },
        {
          icon: "clock",
          title: "Des heures pour chaque rapport mensuel",
          text: "Quand le rapport est prêt, les chiffres sont déjà dépassés.",
        },
        {
          icon: "eyeOff",
          title: "Aucune vue d'ensemble au quotidien",
          text: "Comment évolue le chiffre d'affaires ? Qui n'a pas encore payé ? La réponse se cache quelque part dans bexio.",
        },
      ],
      solution:
        "smiit Analytics récupère vos données directement dans bexio et en fait des rapports clairs. Automatiquement et sans Excel.",
    },

    steps: {
      eyebrow: "C'est aussi simple que ça",
      title: "Trois étapes *vers la vue d'ensemble*",
      items: [
        {
          title: "Connecter bexio",
          text: "Créez un compte et connectez bexio. Cela prend environ 5 minutes – sans installation.",
          media: "IMG_STEP_1",
        },
        {
          title: "Consulter les rapports",
          text: "Des rapports standard sur les ventes, le bilan, le cash-flow et plus encore sont disponibles aussitôt.",
          media: "IMG_STEP_2",
        },
        {
          title: "Personnaliser",
          text: "Modifiez les indicateurs par glisser-déposer ou demandez simplement à l'IA.",
          media: "IMG_STEP_3",
        },
      ],
    },

    reports: {
      eyebrow: "Connecter et voir aussitôt",
      title: "Des rapports prêts à l'emploi. *Dès le premier jour.*",
      intro: "Une fois la connexion établie, vos principales analyses sont prêtes. Vous n'avez rien à configurer.",
      tabsLabel: "Choisir le domaine du rapport",
      tabs: {
        sales: "Ventes",
        balance: "Bilan",
        worktime: "Temps de travail",
        projects: "Projets",
        cashflow: "Cash-flow",
      },
    },

    customize: {
      eyebrow: "À votre façon",
      title: "Vos rapports. *Exactement comme vous le souhaitez.*",
      intro: "Placez simplement indicateurs et graphiques au bon endroit. Sans programmation, sans Excel.",
      points: [
        {
          icon: "layout",
          title: "Créer vos propres rapports",
          text: "Assemblez les indicateurs et analyses dont vous avez besoin – par glisser-déposer.",
        },
        {
          icon: "download",
          title: "Exporter et partager",
          text: "Exportez vos rapports ([EXPORT_FORMATE]) – pour la séance, la banque ou le conseil d'administration.",
        },
        {
          icon: "users",
          title: "Plusieurs utilisateurs et entreprises",
          text: "Invitez votre équipe et connectez plusieurs entreprises bexio dans une même organisation.",
        },
      ],
      trustee: {
        title: "Pour les fiduciaires : *tous vos mandants en un seul login.*",
        text: "Connectez les entreprises bexio de vos mandants dans une même organisation et gardez-les toutes à l'œil.",
      },
    },

    ai: {
      eyebrow: "Automatique et intelligent",
      title: "Interrogez vos chiffres. *L'IA répond.*",
      intro:
        "Posez vos questions en langage courant, par exemple «Quels clients ont généré le plus de chiffre d'affaires cette année ?». L'IA répond directement à partir de vos données bexio.",
      capabilities: [
        { title: "Répondre aux questions", text: "Des réponses à vos questions – sans chercher ni écrire de formules." },
        { title: "Adapter les analyses", text: "«Montre-moi cela par trimestre» – et l'analyse s'adapte." },
        { title: "Créer des rapports entiers", text: "Décrivez ce que vous voulez voir. L'IA construit le rapport." },
      ],
      mcp: {
        badge: "Pour ChatGPT, Claude & co.",
        title: "Aussi utilisable dans votre assistant IA habituel",
        text: "Vous travaillez déjà avec ChatGPT ou Claude ? Connectez-y directement smiit Analytics. Interrogez votre assistant sur le chiffre d'affaires ou les factures ouvertes – il trouve la réponse dans vos données bexio.",
        link: "Comment ça marche ?",
      },
    },

    automations: {
      eyebrow: "Automatisations",
      title: "Les tâches répétitives ? *Elles se font toutes seules.*",
      intro:
        "Définissez une fois ce qui doit se passer. smiit Analytics vérifie vos données bexio et agit pour vous.",
      flow: {
        label: "Exemple de déroulement",
        live: "Fonctionne automatiquement",
        srSummary:
          "Exemple de déroulement : une facture est en retard de 14 jours. smiit Analytics récupère le client et le montant ouvert dans bexio et vérifie si le client a déjà reçu un rappel. Si non, un e-mail de rappel aimable est envoyé au client ; si oui, un deuxième rappel avec délai. Vous recevez ensuite une information.",
        trigger: { kind: "Déclencheur", title: "Facture en retard de 14 jours", icon: "fileClock" },
        fetch: { kind: "Données bexio", title: "Récupérer client et montant ouvert", icon: "database" },
        condition: { kind: "Condition", title: "Déjà relancé ?", icon: "branch" },
        branchA: { label: "Non", kind: "Action", title: "E-mail de rappel au client", icon: "mail" },
        branchB: { label: "Oui", kind: "Action", title: "2e rappel avec délai", icon: "mailWarning" },
        notify: { kind: "Info", title: "Information pour vous", icon: "bell" },
      },
      examples: [
        {
          icon: "mail",
          title: "Rappels de paiement",
          text: "Rappeler automatiquement et aimablement les factures ouvertes à vos clients.",
        },
        {
          icon: "calendar",
          title: "Aperçu hebdomadaire par e-mail",
          text: "Chaque lundi, les chiffres clés dans votre boîte de réception.",
        },
        {
          icon: "alert",
          title: "Alerte en cas d'anomalie",
          text: "Un message dès qu'un indicateur dépasse une valeur que vous avez définie ou passe en dessous.",
        },
        {
          icon: "clock",
          title: "Résumé des heures saisies",
          text: "Vos collaborateurs reçoivent régulièrement un aperçu de leurs heures saisies.",
        },
      ],
      custom: {
        title: "Pas limité aux modèles",
        text: "Configurez toutes les automatisations que vous voulez. Décrivez à l'IA avec vos propres mots ce qui doit se passer – elle crée l'automatisation pour vous.",
      },
    },

    audiences: {
      eyebrow: "Pour qui ?",
      title: "Conçu pour les personnes, *pas pour les services informatiques.*",
      items: [
        {
          title: "Direction de PME",
          text: "Vous savez à tout moment où en est votre entreprise. Sans rassembler vous-même les chiffres. Sans y passer du temps.",
          media: "IMG_PERSONA_MANAGEMENT",
        },
        {
          title: "Fiduciaire et comptabilité",
          text: "Tous vos mandants en un seul login – avec des analyses que vous pouvez montrer directement à vos clients.",
          media: "IMG_PERSONA_TRUSTEE",
        },
        {
          title: "Responsable d'équipe",
          text: "Les indicateurs de votre secteur en un coup d'œil – sans attendre le rapport mensuel.",
          media: "IMG_PERSONA_TEAM_LEAD",
        },
      ],
    },

    testimonials: {
      eyebrow: "Témoignages",
      title: "Ce que disent nos clients",
      reviewsLink: "Tous les avis sur le bexio Marketplace",
      items: [
        {
          quote: "[TESTIMONIAL_1_ZITAT]",
          name: "[TESTIMONIAL_1_NAME]",
          role: "[TESTIMONIAL_1_FUNKTION]",
          company: "[TESTIMONIAL_1_FIRMA]",
          image: undefined as string | undefined,
        },
        {
          quote: "[TESTIMONIAL_2_ZITAT]",
          name: "[TESTIMONIAL_2_NAME]",
          role: "[TESTIMONIAL_2_FUNKTION]",
          company: "[TESTIMONIAL_2_FIRMA]",
          image: undefined as string | undefined,
        },
        {
          quote: "[TESTIMONIAL_3_ZITAT]",
          name: "[TESTIMONIAL_3_NAME]",
          role: "[TESTIMONIAL_3_FUNKTION]",
          company: "[TESTIMONIAL_3_FIRMA]",
          image: undefined as string | undefined,
        },
      ],
    },

    pricing: {
      eyebrow: "Prix",
      title: "Un seul prix. *Par entreprise bexio.*",
      intro: "Toutes les fonctions incluses. Vous payez par entreprise bexio connectée – le premier mois est gratuit.",
      billingLabel: "Choisir la facturation",
      billing: {
        monthly: { label: "Mensuel", note: "Facturation mensuelle" },
        yearly: { label: "Annuel", note: "Facturation annuelle" },
      },
      savingsBadge: "–{percent} %",
      unit: "par mois et par entreprise bexio",
      plan: {
        name: "smiit Analytics",
        badge: "Toutes les fonctions",
        description: "Rapports, assistant IA et automatisations – tout est inclus.",
      },
      breakdown: {
        title: "Composition du prix",
        company: "Par entreprise bexio",
        firstUser: "Premier utilisateur par entreprise",
        moreUsers: "Chaque utilisateur supplémentaire",
        perMonth: "/ mois",
        free: "gratuit",
        note: "Tous les prix en CHF. TVA non comprise.",
      },
      cta: "Essai gratuit de 30 jours",
      trial: {
        badge: "Gratuit",
        title: "Premier mois offert",
        text: "Testez smiit Analytics pendant un mois – sans restriction.",
        features: ["Entreprises illimitées", "Accès fiduciaire", "Utilisateurs illimités"],
        after: "Ensuite dès CHF {price} par mois et par entreprise bexio.",
        cta: "Essayer gratuitement",
      },
    },

    security: {
      eyebrow: "Sécurité et protection des données",
      title: "Transparence *sur l'emplacement de vos données.*",
      items: [
        { icon: "server", title: "Hébergement", text: "[HOSTING_STANDORT]" },
        { icon: "shield", title: "Protection des données", text: "[DATENSCHUTZ_DSG_DSGVO]" },
        { icon: "key", title: "Accès à bexio", text: "[BEXIO_ZUGRIFFSART]" },
      ],
      privacyLink: "Vers la déclaration de protection des données",
    },

    faq: {
      eyebrow: "FAQ",
      title: "Questions *fréquentes*",
      items: {
        setup: {
          question: "Combien de temps prend la mise en place ?",
          answer:
            "Cela dépend du volume de données dans votre bexio. En général, comptez environ 5\u00A0minutes\u00A0: vous créez un compte, connectez bexio et voyez ensuite vos rapports standard. Pour les grandes entreprises avec de nombreuses écritures, la première synchronisation peut prendre plus de temps.",
        },
        skills: {
          question: "Ai-je besoin de connaissances informatiques ?",
          answer:
            "Non. smiit Analytics fonctionne dans le navigateur, vous n'installez rien. La connexion à bexio se configure en quelques clics. Vous adaptez les rapports par glisser-déposer – ou vous demandez simplement à l'IA.",
        },
        trial: {
          question: "Que se passe-t-il après les 30 jours d'essai ?",
          answer:
            "Après 30\u00A0jours, l'essai prend simplement fin – il ne se transforme pas en abonnement et rien n'est facturé automatiquement. Pour continuer à utiliser smiit Analytics, vous choisissez activement une formule. Sans formule, l'accès prend fin. Pas de renouvellement automatique, pas de piège caché.",
        },
        mcp: {
          question: "Qu'est-ce que MCP ?",
          answer:
            "MCP signifie «Model Context Protocol». C'est un standard ouvert qui permet à des assistants IA comme ChatGPT ou Claude de collaborer avec d'autres programmes. On peut se le représenter comme une prise électrique pour l'IA. Si vous connectez smiit Analytics via MCP, votre assistant habituel répond aux questions sur vos données bexio – sans que vous ayez à copier des chiffres.",
        },
        data: {
          question: "Qui voit mes données ?",
          answer:
            "Uniquement vous et les personnes que vous autorisez activement. Même nous, chez smiit Analytics, ne voyons pas vos données. Seule exception\u00A0: lors d'une demande d'assistance, nous pouvons solliciter un accès limité dans le temps – que vous devez également accepter activement. Plus d'informations dans la [[privacy|déclaration de protection des données]].",
        },
        cancellation: {
          question: "Comment puis-je résilier ?",
          answer:
            "Vous pouvez résilier à tout moment pour la fin de la période déjà payée. Avec l'abonnement mensuel, cela vaut pour chaque période mensuelle\u00A0: si vous vous êtes abonné le 10, vous pouvez résilier jusqu'au 9. L'abonnement annuel fonctionne de la même manière, par année. Détails dans les [[terms|conditions d'utilisation]].",
        },
        companies: {
          question: "Puis-je connecter plusieurs entreprises bexio ?",
          answer:
            "Oui. Par organisation, vous connectez autant d'entreprises bexio que vous le souhaitez et les voyez toutes en un seul login – idéal pour les fiduciaires avec plusieurs mandants. Vous payez par entreprise : CHF {yearly} par mois en abonnement annuel ou CHF {monthly} en abonnement mensuel.",
        },
      },
    },

    finalCta: {
      title: "Prêt pour *la vue d'ensemble ?*",
      text: "Connectez bexio et découvrez vos premiers rapports en 5 minutes environ.",
      primary: "Essai gratuit de 30 jours",
      secondary: "Réserver une démo",
    },
  },

  demo: {
    note: "Données fictives",
    keyboardHint: "Naviguer entre les valeurs avec les touches fléchées",
    banks: {
      business: "Compte courant CHF",
      savings: "Compte d'épargne",
      postal: "Compte postal",
      eur: "Compte EUR",
    },
    projectNames: {
      seeblick: "Construction Seeblick",
      oldTown: "Rénovation maison vieille ville",
      maintenance: "Maintenance clients",
      officeRhein: "Aménagement bureau Rhein",
      lindenhof: "Transformation cabinet Lindenhof",
      facadeNord: "Façade bâtiment commercial Nord",
      internal: "Interne",
      smallJobs: "Petits mandats",
    },
    sales: {
      title: "Ventes",
      kpis: {
        revenue: "Chiffre d'affaires",
        invoices: "Factures",
        avgInvoice: "Valeur moy. des factures",
        newCustomers: "CA nouveaux clients",
      },
      revenueChart: {
        title: "Chiffre d'affaires mensuel vs année précédente",
        current: "Chiffre d'affaires",
        previous: "Chiffre d'affaires, année préc.",
        vsPrev: "vs année précédente",
      },
      concentration: {
        title: "Concentration du chiffre d'affaires par client",
        legend: "Chiffre d'affaires",
        summary: "Top {n} = {share} du chiffre d'affaires",
        share: "du chiffre d'affaires",
        cumulative: "cumulé",
      },
      receivables: {
        title: "Débiteurs par échéance",
        share: "des postes ouverts",
        buckets: {
          notDue: "Non échu",
          d1to30: "1–30 jours",
          d31to60: "31–60 jours",
          d61to90: "61–90 jours",
          over90: "plus de 90 jours",
        },
      },
      products: {
        title: "Top produits par chiffre d'affaires",
        share: "du chiffre d'affaires",
        names: {
          maintenance: "Contrats de maintenance",
          installation: "Installation",
          consulting: "Conseil",
          materials: "Matériel et pièces de rechange",
          training: "Formations",
          support: "Forfaits de support",
        },
      },
    },
    balance: {
      title: "Bilan",
      kpis: {
        total: "Total du bilan",
        equityRatio: "Taux de fonds propres",
        liquid: "Liquidités",
        debtRatio: "Taux d'endettement",
      },
      assets: { title: "Bilan – Actifs", column: "Actifs" },
      liabilities: { title: "Bilan – Passifs", column: "Passifs" },
      group: "Groupe de comptes",
      total: "Total",
      expand: "déplier",
      collapse: "replier",
      groups: {
        current: "Actifs circulants",
        fixed: "Actifs immobilisés",
        shortTerm: "Capitaux étrangers à court terme",
        longTerm: "Capitaux étrangers à long terme",
        equity: "Capitaux propres",
      },
      accounts: {
        cash: "Liquidités",
        receivables: "Créances résultant de ventes et de prestations de services",
        inventory: "Stocks",
        prepaid: "Actifs de régularisation",
        movables: "Immobilisations corporelles meubles",
        realEstate: "Immobilisations corporelles immeubles",
        financial: "Immobilisations financières",
        payables: "Dettes résultant d'achats et de prestations de services",
        interestBearing: "Dettes à court terme portant intérêt",
        otherShortTerm: "Autres dettes à court terme",
        bankLoan: "Prêt bancaire",
        provisions: "Provisions",
        shareCapital: "Capital social",
        legalReserve: "Réserve légale issue du bénéfice",
        retained: "Bénéfice reporté",
        profit: "Bénéfice de l'exercice",
      },
      banks: {
        chartTitle: "Avoirs bancaires par compte",
        tableTitle: "Comptes bancaires",
        date: "Dernier mouvement",
        account: "Compte bancaire",
        balance: "Solde",
        movements: "Mouvements",
        share: "des avoirs bancaires",
      },
    },
    worktime: {
      title: "Temps de travail",
      unit: "h",
      kpis: {
        hours: "Heures",
        billable: "Heures facturables",
        utilization: "Taux d'occupation",
        overtime: "Heures sup./manquantes",
      },
      monthly: { title: "Heures par mois", hours: "Heures", billable: "Heures facturables" },
      services: {
        title: "Heures par prestation",
        share: "des heures",
        names: {
          execution: "Exécution",
          administration: "Administration",
          planning: "Planification",
          consulting: "Conseil",
        },
      },
      employees: { title: "Heures par collaborateur", share: "des heures" },
      projects: { title: "Heures par projet", share: "des heures" },
    },
    projects: {
      title: "Projets",
      kpis: {
        projects: "Projets",
        active: "Projets actifs",
        budget: "Budget des projets",
        open: "Budget restant",
      },
      gantt: {
        title: "Projets dans le temps",
        today: "Aujourd'hui",
        status: { done: "Terminé", active: "Actif", planned: "Planifié" },
        progress: "Avancement",
        lead: "Direction de projet",
      },
      scatter: {
        title: "Budget vs facturé par projet",
        x: "Budget du projet",
        y: "Facturé",
        reference: "100 % du budget",
      },
      utilization: {
        title: "Utilisation du budget par projet",
        ratio: "Utilisation",
        over: "hors budget",
        budget: "Budget",
        invoiced: "Facturé",
      },
    },
    cashflow: {
      title: "Cash-flow",
      kpis: {
        inflows: "Encaissements",
        outflows: "Décaissements",
        net: "Variation nette de trésorerie",
        days: "Délai moy. d'encaissement",
        daysUnit: "jours",
      },
      flows: { title: "Entrées et sorties par mois", inflows: "Entrées", outflows: "Sorties", net: "Variation nette" },
      waterfall: { title: "Évolution de la trésorerie par mois", up: "Hausse", down: "Baisse", total: "Total", cumulative: "cumulé" },
      banks: { title: "Variation nette par compte bancaire" },
      overdue: { title: "Créances échues par client", share: "des créances échues" },
    },
  },

  footer: {
    tagline: "Des analyses claires pour bexio – pour les PME et fiduciaires suisses.",
    productOf: "Un produit de",
    company: "smiit GmbH",
    contactTitle: "Contact",
    legalTitle: "Informations légales",
    productTitle: "Produit",
    linkedin: "LinkedIn",
    copyright: "smiit GmbH. Tous droits réservés.",
  },

  legal: {
    legalNotice: {
      nav: "Mentions légales",
      title: "Mentions légales",
      description: "Mentions légales de smiit Analytics, un produit de smiit GmbH\u00A0: adresse, direction, registre du commerce et contact.",
      subtitle: "Informations selon le § 5 de la loi allemande sur les services numériques (DDG)",
      contact: "Contact",
      phone: "Téléphone",
      email: "E-mail",
      representedBy: "Représentée par",
      managingDirectors: "Gérants",
      register: "Registre du commerce",
      registerCourt: "Tribunal d'instance (Amtsgericht) d'Ulm",
      vatId: "Numéro de TVA",
      responsible: "Responsable du contenu (§ 18, al. 2 MStV)",
      dispute: "Règlement des litiges",
      disputeText: "Nous ne sommes pas tenus de participer à une procédure de règlement des litiges devant un organe de conciliation pour les consommateurs et n'y participons pas.",
      country: "Allemagne",
    },
    privacy: {
      nav: "Protection des données",
      title: "Déclaration de protection des données",
      description: "Déclaration de protection des données de smiit Analytics.",
      body: "[DATENSCHUTZ_TEXT]",
    },
    terms: {
      nav: "Conditions d'utilisation",
      title: "Conditions d'utilisation",
      description: "Conditions d'utilisation de smiit Analytics.",
      body: "[NUTZUNGSBEDINGUNGEN_TEXT]",
    },
    dpa: {
      nav: "Sous-traitance",
      title: "Contrat de sous-traitance des données",
      description: "Contrat de sous-traitance des données pour smiit Analytics.",
      body: "[AVV_TEXT]",
    },
  },

  notFound: {
    title: "Page introuvable",
    text: "La page que vous recherchez n'existe malheureusement pas.",
    cta: "Vers l'accueil",
    imageAlt: "Deux personnes assises sur des cubes travaillent sur un ordinateur portable",
  },

  error: {
    title: "Une erreur s'est produite",
    text: "Une erreur est survenue lors du chargement de cette page. Veuillez réessayer.",
    retry: "Réessayer",
    home: "Retour à l'accueil",
  },

  consent: {
    label: "Avis sur les cookies",
    text: "[CONSENT_TEXT]",
    accept: "Accepter",
    decline: "Refuser",
    more: "En savoir plus",
  },

  illustrations: {
    connect: {
      title: "Connecter une source",
      text: ["Connectez une source de données à ce workspace", "pour créer votre premier rapport."],
      bexio: "Connectez votre entreprise bexio.",
    },
    packages: {
      names: ["Standard", "Ventes", "Finances", "Direction"],
      ready: "Prêt",
    },
    editor: {
      elements: "Éléments",
      items: ["KPI", "Ligne", "Barres", "Tableau"],
      revenue: "Chiffre d'affaires",
      invoices: "Factures",
      drop: "Déposer ici",
      prompt: "Montre-moi le chiffre d'affaires par trimestre",
    },
    workspaces: {
      account: "Votre compte",
      clients: "Mandants",
      create: "Créer un workspace",
      report: "Ventes",
      revenue: "Chiffre d'affaires",
      invoices: "Factures",
    },
    owner: {
      overview: "Aperçu",
      revenueMonth: "CA du mois",
      vsPrev: "{change} sur un an",
      openInvoices: "Factures ouvertes",
      revenueYear: "CA 12 mois",
      weekly: "Aperçu hebdo",
      weeklyText: "CA {change} sur un an",
      paid: "Paiement reçu",
      monthly: "Rapport mensuel prêt",
      monthlyText: "Créé automatiquement",
    },
    trustee: {
      revenue: "CA",
      open: "Ouvert",
      export: "Exporter",
    },
    teamLead: {
      title: "Mon secteur",
      subtitle: "Montage · 12 derniers mois",
      utilization: "Occupation",
      billable: "Facturable",
      of: "sur {total}",
      perPerson: "Heures/personne",
    },
  },

  media: {
    VIDEO_HERO: "Visite de smiit Analytics : tableau de bord avec chiffre d'affaires, factures ouvertes et indicateurs",
    VIDEO_DEMO_FULL: "Démo produit de smiit Analytics",
    LOGO_1: "[LOGO_1_FIRMENNAME]",
    LOGO_2: "[LOGO_2_FIRMENNAME]",
    LOGO_3: "[LOGO_3_FIRMENNAME]",
    LOGO_4: "[LOGO_4_FIRMENNAME]",
    LOGO_5: "[LOGO_5_FIRMENNAME]",
    IMG_STEP_1: "Établir la connexion bexio dans smiit Analytics",
    IMG_STEP_2: "Aperçu des rapports avec les forfaits Standard, Ventes, Finances et Direction, tous prêts",
    IMG_STEP_3: "Rapport personnalisé par glisser-déposer",
    VIDEO_DRAGDROP: "Un indicateur est glissé-déposé dans un rapport",
    IMG_MULTI_COMPANY:
      "Un seul login pour la fiduciaire : liste des workspaces avec tous les mandants, un clic ouvre le rapport du mandant choisi",
    VIDEO_AI_CHAT: "Question à l'IA et réponse sous forme de graphique",
    IMG_PERSONA_MANAGEMENT:
      "Smartphone avec chiffre d'affaires et factures ouvertes, à côté des notifications automatiques comme l'aperçu hebdomadaire et le paiement reçu",
    IMG_PERSONA_TRUSTEE: "Rapports de plusieurs mandants superposés, celui du premier plan avec un bouton Exporter",
    IMG_PERSONA_TEAM_LEAD: "Vue du secteur avec taux d'occupation de l'équipe et heures par personne",
  },
}

/* ── Italian (Switzerland) ─────────────────────────────────────── */

const it: Dictionary = {
  meta: {
    title: "smiit Analytics – Capire i Suoi dati bexio in 5 minuti",
    description:
      "Colleghi bexio in 5 minuti e veda subito report su vendite, bilancio e flusso di cassa. Li personalizzi e chieda all'IA. Prova gratuita di 30 giorni.",
    ogImageAlt: "smiit Analytics – Analisi per bexio",
    appCategory: "Business analytics per bexio",
    home: "Pagina iniziale",
  },

  format: {
    group: "’",
    decimal: ".",
    percent: "{n}%",
    thousands: "{n}k",
    millions: "{n} mio",
    months: ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"],
  },

  common: {
    skipLink: "Vai al contenuto",
    close: "Chiudi",
    externalHint: "(si apre in una nuova scheda)",
    homeLabel: "smiit Analytics – alla pagina iniziale",
    productName: "smiit Analytics",
  },

  language: {
    label: "Scegliere la lingua",
    current: "Lingua attuale: {language}",
    names: { de: "Deutsch", en: "English", fr: "Français", it: "Italiano" },
  },

  nav: {
    label: "Navigazione principale",
    chapters: {
      label: "Capitoli",
      items: {
        problem: "Problema",
        howItWorks: "Avvio",
        features: "Report",
        customize: "Su misura",
        ai: "IA",
        automations: "Routine",
        audiences: "Per chi",
        testimonials: "Clienti",
        pricing: "Prezzi",
        security: "Sicurezza",
        faq: "FAQ",
      },
    },
    items: {
      features: "Funzioni",
      ai: "IA",
      automations: "Automazioni",
      pricing: "Prezzi",
      faq: "FAQ",
    },
    cta: "Prova gratuita",
    login: "Login",
    menuOpen: "Apri menu",
    menuClose: "Chiudi menu",
  },

  home: {
    hero: {
      title: "Capire i Suoi dati bexio? *Bastano 5 minuti.*",
      subtitle:
        "Colleghi bexio e veda subito come sta andando la Sua azienda. Crei i report in autonomia e lasci all'IA domande e lavoro di routine.",
      ctaPrimary: "Prova gratuita di 30 giorni",
      ctaSecondary: "Guarda la demo di 2 min",
      demoTitle: "smiit Analytics in 2 minuti",
    },

    trust: {
      title: "Queste aziende lavorano con smiit Analytics",
      rating: {
        value: "5,0",
        label: "sul bexio Marketplace",
        srLabel: "su 5 stelle – vedere le recensioni (si apre in una nuova scheda)",
      },
    },

    problem: {
      eyebrow: "Il problema",
      title: "I numeri ci sono. *Manca la visione d'insieme.*",
      pains: [
        {
          icon: "code",
          title: "Automazioni mancanti",
          text: "Solleciti, report e analisi si fanno a mano – oppure vanno sviluppati su misura, con costi di programmazione elevati.",
        },
        {
          icon: "clock",
          title: "I report mensili richiedono ore",
          text: "Quando il report è pronto, i numeri sono già superati.",
        },
        {
          icon: "eyeOff",
          title: "Nessuna visione d'insieme nel quotidiano",
          text: "Come va il fatturato? Chi non ha ancora pagato? La risposta si trova da qualche parte in bexio.",
        },
      ],
      solution:
        "smiit Analytics preleva i Suoi dati direttamente da bexio e li trasforma in report comprensibili. In modo automatico e senza Excel.",
    },

    steps: {
      eyebrow: "Semplicissimo",
      title: "In tre passi *alla visione d'insieme*",
      items: [
        {
          title: "Collegare bexio",
          text: "Crei un account e colleghi bexio. Ci vogliono circa 5 minuti – senza installazione.",
          media: "IMG_STEP_1",
        },
        {
          title: "Consultare i report",
          text: "I report standard su vendite, bilancio, flusso di cassa e altro sono subito disponibili.",
          media: "IMG_STEP_2",
        },
        {
          title: "Personalizzare",
          text: "Modifichi gli indicatori con il drag & drop o chieda semplicemente all'IA.",
          media: "IMG_STEP_3",
        },
      ],
    },

    reports: {
      eyebrow: "Colleghi e veda subito",
      title: "Report pronti. *Dal primo giorno.*",
      intro: "Dopo il collegamento, le Sue analisi più importanti sono pronte. Non deve configurare nulla.",
      tabsLabel: "Scegliere l'ambito del report",
      tabs: {
        sales: "Vendite",
        balance: "Bilancio",
        worktime: "Ore di lavoro",
        projects: "Progetti",
        cashflow: "Flusso di cassa",
      },
    },

    customize: {
      eyebrow: "Personalizzare",
      title: "I Suoi report. *Esattamente come li desidera.*",
      intro: "Trascini indicatori e grafici semplicemente al posto giusto. Senza programmare, senza Excel.",
      points: [
        {
          icon: "layout",
          title: "Creare report propri",
          text: "Componga indicatori e analisi come Le servono – con il drag & drop.",
        },
        {
          icon: "download",
          title: "Esportare e condividere",
          text: "Esporti i Suoi report ([EXPORT_FORMATE]) – per la riunione, la banca o il consiglio di amministrazione.",
        },
        {
          icon: "users",
          title: "Più utenti e aziende",
          text: "Inviti il Suo team e colleghi più aziende bexio in un'unica organizzazione.",
        },
      ],
      trustee: {
        title: "Per le fiduciarie: *tutti i mandanti con un solo login.*",
        text: "Colleghi le aziende bexio dei Suoi mandanti in un'unica organizzazione e li tenga tutti sotto controllo.",
      },
    },

    ai: {
      eyebrow: "Automatico e intelligente",
      title: "Interroghi i Suoi numeri. *L'IA risponde.*",
      intro:
        "Ponga domande in linguaggio del tutto normale, ad esempio «Quali clienti hanno generato più fatturato quest'anno?». L'IA risponde direttamente dai Suoi dati bexio.",
      capabilities: [
        { title: "Rispondere alle domande", text: "Risposte alle Sue domande – senza cercare e senza formule." },
        { title: "Adattare le analisi", text: "«Mostramelo per trimestre» – e l'analisi cambia." },
        { title: "Creare report completi", text: "Descriva ciò che desidera vedere. L'IA crea il report." },
      ],
      mcp: {
        badge: "Per ChatGPT, Claude & co.",
        title: "Utilizzabile anche nel Suo assistente IA abituale",
        text: "Lavora già con ChatGPT o Claude? Allora colleghi smiit Analytics direttamente. Chieda al Suo assistente il fatturato o le fatture aperte – la risposta arriva dai Suoi dati bexio.",
        link: "Come funziona?",
      },
    },

    automations: {
      eyebrow: "Automazioni",
      title: "Lavoro di routine? *Si sbriga da solo.*",
      intro:
        "Stabilisca una volta cosa deve succedere. smiit Analytics controlla i Suoi dati bexio e agisce per Lei.",
      flow: {
        label: "Flusso d'esempio",
        live: "Funziona in automatico",
        srSummary:
          "Flusso d'esempio: una fattura è scaduta da 14 giorni. smiit Analytics recupera da bexio il cliente e l'importo aperto e verifica se il cliente è già stato sollecitato. In caso negativo, il cliente riceve un cortese promemoria via e-mail; in caso affermativo, un secondo sollecito con termine. In seguito Lei riceve un avviso.",
        trigger: { kind: "Attivatore", title: "Fattura scaduta da 14 giorni", icon: "fileClock" },
        fetch: { kind: "Dati bexio", title: "Recuperare cliente e importo aperto", icon: "database" },
        condition: { kind: "Condizione", title: "Già sollecitato?", icon: "branch" },
        branchA: { label: "No", kind: "Azione", title: "Promemoria e-mail al cliente", icon: "mail" },
        branchB: { label: "Sì", kind: "Azione", title: "2° sollecito con termine", icon: "mailWarning" },
        notify: { kind: "Avviso", title: "Avviso per Lei", icon: "bell" },
      },
      examples: [
        {
          icon: "mail",
          title: "Promemoria di pagamento",
          text: "Ricordare ai clienti le fatture aperte in modo automatico e cortese.",
        },
        {
          icon: "calendar",
          title: "Sintesi settimanale via e-mail",
          text: "Ogni lunedì i numeri più importanti nella Sua casella di posta.",
        },
        {
          icon: "alert",
          title: "Avviso in caso di anomalie",
          text: "Un messaggio non appena un indicatore supera o scende sotto un valore da Lei stabilito.",
        },
        {
          icon: "clock",
          title: "Riepilogo del rapporto ore",
          text: "I Suoi collaboratori ricevono regolarmente una panoramica delle ore registrate.",
        },
      ],
      custom: {
        title: "Non vincolato a modelli",
        text: "Configuri qualsiasi automazione. Descriva all'IA con parole Sue cosa deve succedere – l'IA crea l'automazione per Lei.",
      },
    },

    audiences: {
      eyebrow: "Per chi?",
      title: "Pensato per le persone, *non per i reparti IT.*",
      items: [
        {
          title: "Direzione di PMI",
          text: "Sa in ogni momento a che punto è la Sua azienda. Senza dover raccogliere i numeri da solo. Senza perdite di tempo.",
          media: "IMG_PERSONA_MANAGEMENT",
        },
        {
          title: "Fiduciarie e contabilità",
          text: "Tutti i mandanti con un solo login – con analisi che può mostrare direttamente ai Suoi clienti.",
          media: "IMG_PERSONA_TRUSTEE",
        },
        {
          title: "Responsabili di team",
          text: "Gli indicatori del Suo settore a colpo d'occhio – senza attendere il report mensile.",
          media: "IMG_PERSONA_TEAM_LEAD",
        },
      ],
    },

    testimonials: {
      eyebrow: "Testimonianze",
      title: "Cosa dicono i nostri clienti",
      reviewsLink: "Tutte le recensioni sul bexio Marketplace",
      items: [
        {
          quote: "[TESTIMONIAL_1_ZITAT]",
          name: "[TESTIMONIAL_1_NAME]",
          role: "[TESTIMONIAL_1_FUNKTION]",
          company: "[TESTIMONIAL_1_FIRMA]",
          image: undefined as string | undefined,
        },
        {
          quote: "[TESTIMONIAL_2_ZITAT]",
          name: "[TESTIMONIAL_2_NAME]",
          role: "[TESTIMONIAL_2_FUNKTION]",
          company: "[TESTIMONIAL_2_FIRMA]",
          image: undefined as string | undefined,
        },
        {
          quote: "[TESTIMONIAL_3_ZITAT]",
          name: "[TESTIMONIAL_3_NAME]",
          role: "[TESTIMONIAL_3_FUNKTION]",
          company: "[TESTIMONIAL_3_FIRMA]",
          image: undefined as string | undefined,
        },
      ],
    },

    pricing: {
      eyebrow: "Prezzi",
      title: "Un solo prezzo. *Per azienda bexio.*",
      intro: "Tutte le funzioni incluse. Paga per ogni azienda bexio collegata – il primo mese è gratuito.",
      billingLabel: "Scegliere la fatturazione",
      billing: {
        monthly: { label: "Mensile", note: "Fatturazione mensile" },
        yearly: { label: "Annuale", note: "Fatturazione annuale" },
      },
      savingsBadge: "–{percent}%",
      unit: "al mese per azienda bexio",
      plan: {
        name: "smiit Analytics",
        badge: "Tutte le funzioni",
        description: "Report, assistente IA e automazioni – tutto incluso.",
      },
      breakdown: {
        title: "Come si compone il prezzo",
        company: "Per azienda bexio",
        firstUser: "Primo utente per azienda",
        moreUsers: "Ogni utente supplementare",
        perMonth: "/ mese",
        free: "gratuito",
        note: "Tutti i prezzi in CHF. IVA esclusa.",
      },
      cta: "Prova gratuita di 30 giorni",
      trial: {
        badge: "Gratuito",
        title: "Primo mese gratuito",
        text: "Provi smiit Analytics per un mese – senza limitazioni.",
        features: ["Aziende illimitate", "Accesso fiduciaria", "Utenti illimitati"],
        after: "In seguito da CHF {price} al mese per azienda bexio.",
        cta: "Provi ora gratuitamente",
      },
    },

    security: {
      eyebrow: "Sicurezza e protezione dei dati",
      title: "Trasparenza *su dove si trovano i Suoi dati.*",
      items: [
        { icon: "server", title: "Hosting", text: "[HOSTING_STANDORT]" },
        { icon: "shield", title: "Protezione dei dati", text: "[DATENSCHUTZ_DSG_DSGVO]" },
        { icon: "key", title: "Accesso a bexio", text: "[BEXIO_ZUGRIFFSART]" },
      ],
      privacyLink: "All'informativa sulla protezione dei dati",
    },

    faq: {
      eyebrow: "FAQ",
      title: "Domande *frequenti*",
      items: {
        setup: {
          question: "Quanto dura la configurazione?",
          answer:
            "Dipende dalla quantità di dati nel Suo bexio. Di solito bastano circa 5 minuti: crea un account, collega bexio e vede subito i Suoi report standard. Per aziende più grandi con molte registrazioni, la prima sincronizzazione può richiedere più tempo.",
        },
        skills: {
          question: "Servono conoscenze informatiche?",
          answer:
            "No. smiit Analytics funziona nel browser, non deve installare nulla. Il collegamento a bexio si configura con pochi clic. I report si adattano con il drag & drop – oppure chieda semplicemente all'IA.",
        },
        trial: {
          question: "Cosa succede dopo i 30 giorni di prova?",
          answer:
            "Dopo 30 giorni la prova termina semplicemente – non si trasforma in un abbonamento e non viene addebitato nulla automaticamente. Se desidera continuare a usare smiit Analytics, sceglie attivamente un pacchetto. Senza pacchetto l'accesso termina. Nessun rinnovo automatico, nessuna sorpresa nascosta.",
        },
        mcp: {
          question: "Che cos'è MCP?",
          answer:
            "MCP sta per «Model Context Protocol». È uno standard aperto che permette ad assistenti IA come ChatGPT o Claude di collaborare con altri programmi. Lo si può immaginare come una presa di corrente per l'IA. Se collega smiit Analytics tramite MCP, il Suo assistente abituale risponde a domande sui Suoi dati bexio – senza che debba copiare numeri.",
        },
        data: {
          question: "Chi vede i miei dati?",
          answer:
            "Solo Lei e le persone che autorizza attivamente. Nemmeno noi di smiit Analytics vediamo i Suoi dati. Unica eccezione: in caso di richiesta di supporto possiamo chiedere un accesso limitato nel tempo – che anche Lei deve accettare attivamente. Maggiori informazioni nell'[[privacy|informativa sulla protezione dei dati]].",
        },
        cancellation: {
          question: "Come posso disdire?",
          answer:
            "Può disdire in qualsiasi momento per la fine del periodo già pagato. Con l'abbonamento mensile ciò vale per ogni periodo mensile: se si è abbonato il 10, può disdire fino al 9. L'abbonamento annuale funziona allo stesso modo, su base annua. Dettagli nelle [[terms|condizioni d'uso]].",
        },
        companies: {
          question: "Posso collegare più aziende bexio?",
          answer:
            "Sì. Per ogni organizzazione collega tutte le aziende bexio che desidera e le vede tutte con un solo login – ideale per fiduciarie con più mandanti. Paga per azienda: CHF {yearly} al mese con l'abbonamento annuale o CHF {monthly} con l'abbonamento mensile.",
        },
      },
    },

    finalCta: {
      title: "Pronto per *la visione d'insieme?*",
      text: "Colleghi bexio e veda i Suoi primi report in circa 5 minuti.",
      primary: "Prova gratuita di 30 giorni",
      secondary: "Prenota una demo",
    },
  },

  demo: {
    note: "Dati di esempio",
    keyboardHint: "Navighi tra i valori con i tasti freccia",
    banks: {
      business: "Conto aziendale CHF",
      savings: "Conto di risparmio",
      postal: "Conto postale",
      eur: "Conto EUR",
    },
    projectNames: {
      seeblick: "Nuova costruzione Seeblick",
      oldTown: "Risanamento casa centro storico",
      maintenance: "Manutenzione clienti",
      officeRhein: "Finiture interne ufficio Rhein",
      lindenhof: "Ristrutturazione studio Lindenhof",
      facadeNord: "Facciata edificio commerciale Nord",
      internal: "Interno",
      smallJobs: "Piccoli incarichi",
    },
    sales: {
      title: "Vendite",
      kpis: {
        revenue: "Fatturato",
        invoices: "Fatture",
        avgInvoice: "Valore medio fattura",
        newCustomers: "Fatturato con nuovi clienti",
      },
      revenueChart: {
        title: "Fatturato mensile con anno precedente",
        current: "Fatturato",
        previous: "Fatturato, anno precedente",
        vsPrev: "vs. anno precedente",
      },
      concentration: {
        title: "Concentrazione del fatturato per cliente",
        legend: "Fatturato",
        summary: "Top {n} = {share} del fatturato",
        share: "del fatturato",
        cumulative: "cumulato",
      },
      receivables: {
        title: "Debitori per scadenza",
        share: "delle partite aperte",
        buckets: {
          notDue: "Non scaduto",
          d1to30: "1–30 giorni",
          d31to60: "31–60 giorni",
          d61to90: "61–90 giorni",
          over90: "oltre 90 giorni",
        },
      },
      products: {
        title: "Prodotti principali per fatturato",
        share: "del fatturato",
        names: {
          maintenance: "Contratti di manutenzione",
          installation: "Installazione",
          consulting: "Consulenza",
          materials: "Materiale e ricambi",
          training: "Formazioni",
          support: "Pacchetti di supporto",
        },
      },
    },
    balance: {
      title: "Bilancio",
      kpis: {
        total: "Totale di bilancio",
        equityRatio: "Quota di capitale proprio",
        liquid: "Liquidità",
        debtRatio: "Quota di capitale di terzi",
      },
      assets: { title: "Bilancio – Attivi", column: "Attivi" },
      liabilities: { title: "Bilancio – Passivi", column: "Passivi" },
      group: "Gruppo di conti",
      total: "Totale",
      expand: "espandi",
      collapse: "comprimi",
      groups: {
        current: "Attivo circolante",
        fixed: "Attivo fisso",
        shortTerm: "Capitale di terzi a breve termine",
        longTerm: "Capitale di terzi a lungo termine",
        equity: "Capitale proprio",
      },
      accounts: {
        cash: "Liquidità",
        receivables: "Crediti da forniture e prestazioni",
        inventory: "Scorte",
        prepaid: "Ratei e risconti attivi",
        movables: "Immobilizzazioni materiali mobiliari",
        realEstate: "Immobilizzazioni materiali immobiliari",
        financial: "Immobilizzazioni finanziarie",
        payables: "Debiti per forniture e prestazioni",
        interestBearing: "Debiti onerosi a breve termine",
        otherShortTerm: "Altri debiti a breve termine",
        bankLoan: "Prestito bancario",
        provisions: "Accantonamenti",
        shareCapital: "Capitale sociale",
        legalReserve: "Riserva legale da utili",
        retained: "Utile riportato",
        profit: "Utile d'esercizio",
      },
      banks: {
        chartTitle: "Saldo bancario per conto",
        tableTitle: "Conti bancari",
        date: "Ultimo movimento",
        account: "Conto bancario",
        balance: "Saldo",
        movements: "Movimenti",
        share: "del saldo bancario",
      },
    },
    worktime: {
      title: "Ore di lavoro",
      unit: "h",
      kpis: {
        hours: "Ore",
        billable: "Ore fatturabili",
        utilization: "Tasso di occupazione",
        overtime: "Ore in più/in meno",
      },
      monthly: { title: "Ore per mese", hours: "Ore", billable: "Ore fatturabili" },
      services: {
        title: "Ore per prestazione",
        share: "delle ore",
        names: {
          execution: "Esecuzione",
          administration: "Amministrazione",
          planning: "Pianificazione",
          consulting: "Consulenza",
        },
      },
      employees: { title: "Ore per collaboratore", share: "delle ore" },
      projects: { title: "Ore per progetto", share: "delle ore" },
    },
    projects: {
      title: "Progetti",
      kpis: {
        projects: "Progetti",
        active: "Progetti attivi",
        budget: "Budget di progetto",
        open: "Budget residuo",
      },
      gantt: {
        title: "Progetti nel tempo",
        today: "Oggi",
        status: { done: "Concluso", active: "Attivo", planned: "Pianificato" },
        progress: "Avanzamento",
        lead: "Capoprogetto",
      },
      scatter: {
        title: "Budget vs. fatturato per progetto",
        x: "Budget di progetto",
        y: "Fatturato",
        reference: "100% del budget",
      },
      utilization: {
        title: "Utilizzo del budget per progetto",
        ratio: "Utilizzo",
        over: "oltre il budget",
        budget: "Budget",
        invoiced: "Fatturato",
      },
    },
    cashflow: {
      title: "Flusso di cassa",
      kpis: {
        inflows: "Incassi",
        outflows: "Pagamenti",
        net: "Variazione netta di liquidità",
        days: "Ø giorni fino all'incasso",
        daysUnit: "giorni",
      },
      flows: { title: "Entrate e uscite per mese", inflows: "Entrate", outflows: "Uscite", net: "Variazione netta" },
      waterfall: { title: "Andamento della liquidità per mese", up: "Aumento", down: "Diminuzione", total: "Totale", cumulative: "cumulato" },
      banks: { title: "Variazione netta per conto bancario" },
      overdue: { title: "Crediti scaduti per cliente", share: "dei crediti scaduti" },
    },
  },

  footer: {
    tagline: "Analisi comprensibili per bexio – per PMI svizzere e fiduciarie.",
    productOf: "Un prodotto di",
    company: "smiit GmbH",
    contactTitle: "Contatto",
    legalTitle: "Note legali",
    productTitle: "Prodotto",
    linkedin: "LinkedIn",
    copyright: "smiit GmbH. Tutti i diritti riservati.",
  },

  legal: {
    legalNotice: {
      nav: "Note legali",
      title: "Note legali",
      description: "Note legali di smiit Analytics, un prodotto di smiit GmbH: indirizzo, direzione, registro di commercio e contatti.",
      subtitle: "Informazioni ai sensi del § 5 della legge tedesca sui servizi digitali (DDG)",
      contact: "Contatto",
      phone: "Telefono",
      email: "E-mail",
      representedBy: "Rappresentata da",
      managingDirectors: "Amministratori",
      register: "Registro di commercio",
      registerCourt: "Tribunale locale (Amtsgericht) di Ulma",
      vatId: "Partita IVA",
      responsible: "Responsabile dei contenuti (§ 18 cpv. 2 MStV)",
      dispute: "Risoluzione delle controversie",
      disputeText: "Non siamo tenuti a partecipare a procedure di risoluzione delle controversie dinanzi a un organo di conciliazione per i consumatori e non vi partecipiamo.",
      country: "Germania",
    },
    privacy: {
      nav: "Protezione dei dati",
      title: "Informativa sulla protezione dei dati",
      description: "Informativa sulla protezione dei dati di smiit Analytics.",
      body: "[DATENSCHUTZ_TEXT]",
    },
    terms: {
      nav: "Condizioni d'uso",
      title: "Condizioni d'uso",
      description: "Condizioni d'uso di smiit Analytics.",
      body: "[NUTZUNGSBEDINGUNGEN_TEXT]",
    },
    dpa: {
      nav: "Trattamento su mandato",
      title: "Contratto di trattamento dei dati su mandato",
      description: "Contratto di trattamento dei dati su mandato per smiit Analytics.",
      body: "[AVV_TEXT]",
    },
  },

  notFound: {
    title: "Pagina non trovata",
    text: "Purtroppo la pagina che cerca non esiste.",
    cta: "Alla pagina iniziale",
    imageAlt: "Due persone sedute su dei cubi lavorano al laptop",
  },

  error: {
    title: "Qualcosa è andato storto",
    text: "Si è verificato un errore durante il caricamento di questa pagina. La preghiamo di riprovare.",
    retry: "Riprova",
    home: "Torna alla pagina iniziale",
  },

  consent: {
    label: "Avviso sui cookie",
    text: "[CONSENT_TEXT]",
    accept: "Accetta",
    decline: "Rifiuta",
    more: "Maggiori informazioni",
  },

  illustrations: {
    connect: {
      title: "Collegare fonte dati",
      text: ["Colleghi una fonte dati a questo workspace", "per creare il Suo primo report."],
      bexio: "Colleghi la Sua azienda bexio.",
    },
    packages: {
      names: ["Standard", "Vendite", "Finanze", "Direzione"],
      ready: "Pronto",
    },
    editor: {
      elements: "Elementi",
      items: ["KPI", "Linea", "Barre", "Tabella"],
      revenue: "Ricavi",
      invoices: "Fatture",
      drop: "Rilascia qui",
      prompt: "Mostrami i ricavi per trimestre",
    },
    workspaces: {
      account: "Il Suo account",
      clients: "Mandanti",
      create: "Crea workspace",
      report: "Vendite",
      revenue: "Ricavi",
      invoices: "Fatture",
    },
    owner: {
      overview: "Panoramica",
      revenueMonth: "Ricavi mese",
      vsPrev: "{change} vs. anno prec.",
      openInvoices: "Fatture aperte",
      revenueYear: "Ricavi 12 mesi",
      weekly: "Sintesi settimana",
      weeklyText: "Ricavi {change} vs. anno prec.",
      paid: "Pagamento ricevuto",
      monthly: "Report mensile pronto",
      monthlyText: "Creato automaticamente",
    },
    trustee: {
      revenue: "Ricavi",
      open: "Aperto",
      export: "Esporta",
    },
    teamLead: {
      title: "Il mio team",
      subtitle: "Montaggio · ultimi 12 mesi",
      utilization: "Occupazione",
      billable: "Fatturabile",
      of: "di {total}",
      perPerson: "Ore per persona",
    },
  },

  media: {
    VIDEO_HERO: "Visita guidata di smiit Analytics: dashboard con fatturato, fatture aperte e indicatori",
    VIDEO_DEMO_FULL: "Demo del prodotto smiit Analytics",
    LOGO_1: "[LOGO_1_FIRMENNAME]",
    LOGO_2: "[LOGO_2_FIRMENNAME]",
    LOGO_3: "[LOGO_3_FIRMENNAME]",
    LOGO_4: "[LOGO_4_FIRMENNAME]",
    LOGO_5: "[LOGO_5_FIRMENNAME]",
    IMG_STEP_1: "Creare il collegamento a bexio in smiit Analytics",
    IMG_STEP_2: "Panoramica dei report con i pacchetti Standard, Vendite, Finanze e Direzione, tutti pronti",
    IMG_STEP_3: "Un report viene adattato con il drag & drop",
    VIDEO_DRAGDROP: "Un indicatore viene trascinato in un report",
    IMG_MULTI_COMPANY:
      "Un solo login per la fiduciaria: elenco dei workspace con tutti i mandanti, un clic apre il report del mandante scelto",
    VIDEO_AI_CHAT: "Domanda all'IA e risposta sotto forma di grafico",
    IMG_PERSONA_MANAGEMENT:
      "Smartphone con fatturato e fatture aperte, accanto avvisi automatici come sintesi settimanale e pagamento ricevuto",
    IMG_PERSONA_TRUSTEE: "Report di più mandanti sovrapposti, quello in primo piano con il pulsante Esporta",
    IMG_PERSONA_TEAM_LEAD: "Vista del reparto con occupazione del team e ore per persona",
  },
}

const dictionaries: Record<Locale, Dictionary> = { de, en, fr, it }

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale]
