/**
 * German (Switzerland) – source language. Its shape is the `Dictionary` type:
 * every other language must provide exactly the same keys (checked by tsc).
 *
 * Conventions: see lib/dictionary/index.ts.
 */

export const de = {
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
      solution: "smiit Analytics holt Ihre Daten direkt aus bexio und macht daraus verständliche Berichte. Automatisch und ohne Excel.",
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
      intro: "Legen Sie einmal fest, was passieren soll. smiit Analytics prüft Ihre bexio-Daten und handelt für Sie.",
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
      disputeText:
        "Wir sind nicht verpflichtet, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen und nehmen daran nicht teil.",
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
   * Text inside the generated illustrations (scripts/build-media.mjs,
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
