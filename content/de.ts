/**
 * Alle Texte der Website – Deutsch (Schweiz).
 *
 * Regeln: «Sie»-Ansprache, ss statt ß, Preise in CHF, kurze Sätze.
 * Unbekannte Fakten stehen als [PLATZHALTER] – bitte nicht durch Schätzungen ersetzen.
 * `*Wort*` in Überschriften wird als farbige Hervorhebung dargestellt.
 *
 * Eine weitere Sprache: Datei kopieren (z. B. fr.ts), übersetzen und in
 * content/index.ts registrieren. Die Struktur muss gleich bleiben.
 */
export const de = {
  meta: {
    title: "smiit Analytics – Ihre bexio-Daten in 5 Minuten verständlich",
    description:
      "bexio in rund 5 Minuten verbinden und sofort Berichte zu Verkauf, Bilanz und Cashflow sehen. Per Drag & Drop anpassen, mit KI fragen. 30 Tage kostenlos testen.",
    ogImageAlt: "smiit Analytics – Auswertungen für bexio",
    ogImageTitle: "Ihre bexio-Daten. In 5 Minuten verständlich.",
    appCategory: "Business-Analytics für bexio",
  },

  common: {
    skipLink: "Zum Inhalt springen",
    close: "Schliessen",
    externalHint: "(öffnet in neuem Tab)",
    homeLabel: "smiit Analytics – zur Startseite",
    productName: "smiit Analytics",
  },

  nav: {
    label: "Hauptnavigation",
    items: [
      { label: "Funktionen", href: "/#funktionen" },
      { label: "KI", href: "/#ki" },
      { label: "Automatisierungen", href: "/#automatisierungen" },
      { label: "Preise", href: "/#preise" },
      { label: "FAQ", href: "/#faq" },
    ],
    cta: "Kostenlos testen",
    login: "Login",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schliessen",
  },

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
        icon: "sheet",
        title: "Manuelle Excel-Exporte",
        text: "Daten aus bexio exportieren, in Excel kopieren, Formeln prüfen. Jeden Monat von vorn.",
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
    tabs: [
      // Verkauf zeigt das interaktive Beispiel-Dashboard (Daten: content/demo/verkauf.ts)
      { value: "verkauf", label: "Verkauf", demo: "sales" },
      // Bilanz zeigt das interaktive Beispiel-Dashboard (Daten: content/demo/bilanz.ts)
      { value: "bilanz", label: "Bilanz", demo: "balance" },
      // Arbeitszeiten zeigt das interaktive Beispiel-Dashboard (Daten: content/demo/arbeitszeiten.ts)
      { value: "arbeitszeiten", label: "Arbeitszeiten", demo: "worktime" },
      // Projekte zeigt das interaktive Beispiel-Dashboard (Daten: content/demo/projekte.ts)
      { value: "projekte", label: "Projekte", demo: "projects" },
      // Cashflow zeigt das interaktive Beispiel-Dashboard (Daten: content/demo/cashflow.ts)
      { value: "cashflow", label: "Cashflow", demo: "cashflow" },
    ],
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
      href: "#faq-mcp",
    },
  },

  automations: {
    eyebrow: "Automatisierungen",
    title: "Routinearbeit? *Erledigt sich selbst.*",
    intro:
      "Legen Sie einmal fest, was passieren soll. smiit Analytics prüft Ihre bexio-Daten und handelt für Sie.",
    /** Animierter Beispiel-Ablauf (Auslöser → Daten → Bedingung → zwei Zweige → Info). */
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
        media: "IMG_PERSONA_GESCHAEFTSFUEHRUNG",
      },
      {
        title: "Treuhand & Buchhaltung",
        text: "Alle Mandanten in einem Login – mit Auswertungen, die Sie Ihren Kunden direkt zeigen können.",
        media: "IMG_PERSONA_TREUHAND",
      },
      {
        title: "Teamleitung",
        text: "Die Kennzahlen Ihres Bereichs auf einen Blick – ohne auf den Monatsbericht zu warten.",
        media: "IMG_PERSONA_TEAMLEITUNG",
      },
    ],
  },

  testimonials: {
    eyebrow: "Kundenstimmen",
    title: "Was unsere Kunden sagen",
    reviewsLink: "Alle Bewertungen auf dem bexio Marketplace",
    /** Bitte durch echte, freigegebene Stimmen ersetzen. `image` optional: Pfad in /public/media. */
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
    currency: "CHF",
    billingLabel: "Abrechnung wählen",
    /** Preise in CHF pro Monat und bexio-Firma. Die Ersparnis wird daraus berechnet. */
    billing: {
      monthly: { label: "Monatlich", price: 59, note: "Monatlich abgerechnet" },
      yearly: { label: "Jährlich", price: 49, note: "Jährlich abgerechnet" },
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
    users: { price: 8 },
    cta: "30 Tage kostenlos testen",
    trial: {
      badge: "Kostenlos",
      title: "Erster Monat gratis",
      text: "Testen Sie smiit Analytics einen Monat lang – ohne Einschränkungen.",
      features: ["Unlimitierte Firmen", "Treuhandzugang", "Unlimitierte Nutzer"],
      /** {price} = Preis der gewählten Abrechnung (jährlich/monatlich) pro Monat und Firma. */
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
    items: [
      {
        id: "faq-einrichtung",
        question: "Wie lange dauert die Einrichtung?",
        answer:
          "Rund 5 Minuten. Sie erstellen ein Konto, verbinden bexio und sehen danach sofort Ihre Standardberichte.",
      },
      {
        id: "faq-it",
        question: "Brauche ich IT-Kenntnisse?",
        answer:
          "Nein. smiit Analytics läuft im Browser, Sie installieren nichts. Die Verbindung zu bexio richten Sie mit wenigen Klicks ein. Berichte passen Sie per Drag & Drop an – oder Sie fragen einfach die KI.",
      },
      {
        id: "faq-nach-test",
        question: "Was passiert nach den 30 Tagen Test?",
        answer: "Sie entscheiden, ob Sie ein Paket wählen. [TESTENDE_ABLAUF]",
      },
      {
        id: "faq-mcp",
        question: "Was ist MCP?",
        answer:
          "MCP steht für «Model Context Protocol». Das ist ein offener Standard, über den KI-Assistenten wie ChatGPT oder Claude mit anderen Programmen zusammenarbeiten. Man kann es sich wie eine Steckdose für KI vorstellen. Verbinden Sie smiit Analytics per MCP, beantwortet Ihr gewohnter Assistent Fragen zu Ihren bexio-Daten – ohne dass Sie Zahlen kopieren müssen.",
      },
      {
        id: "faq-daten",
        question: "Wer sieht meine Daten?",
        answer:
          "Sie bestimmen, wer in Ihrer Organisation Zugriff erhält. [DATENZUGRIFF_DETAILS] Mehr dazu in der Datenschutzerklärung.",
      },
      {
        id: "faq-kuendigung",
        question: "Wie kann ich kündigen?",
        answer: "[KUENDIGUNG_BEDINGUNGEN]",
      },
      {
        id: "faq-firmen",
        question: "Kann ich mehrere bexio-Firmen verbinden?",
        answer:
          "Ja. Pro Organisation verbinden Sie beliebig viele bexio-Firmen und sehen alle in einem Login – ideal für Treuhandbüros mit mehreren Mandanten. Sie zahlen pro Firma: CHF 49 pro Monat im Jahresabo oder CHF 59 im Monatsabo.",
      },
    ],
  },

  finalCta: {
    title: "Bereit für *den Überblick?*",
    text: "Verbinden Sie bexio und sehen Sie in rund 5 Minuten Ihre ersten Berichte.",
    primary: "30 Tage kostenlos testen",
    secondary: "Demo buchen",
  },

  footer: {
    tagline: "Verständliche Auswertungen für bexio – für Schweizer KMU und Treuhandbüros.",
    productOf: "Ein Produkt der",
    company: "smiit GmbH",
    contactTitle: "Kontakt",
    legalTitle: "Rechtliches",
    productTitle: "Produkt",
    linkedin: "LinkedIn",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    nutzungsbedingungen: "Nutzungsbedingungen",
    avv: "AVV",
    copyright: "smiit GmbH. Alle Rechte vorbehalten.",
  },

  legal: {
    impressum: {
      title: "Impressum",
      description: "Impressum von smiit Analytics, einem Produkt der smiit GmbH.",
      body: "[IMPRESSUM_TEXT]",
    },
    datenschutz: {
      title: "Datenschutzerklärung",
      description: "Datenschutzerklärung von smiit Analytics.",
      body: "[DATENSCHUTZ_TEXT]",
    },
    nutzungsbedingungen: {
      title: "Nutzungsbedingungen",
      description: "Nutzungsbedingungen von smiit Analytics.",
      body: "[NUTZUNGSBEDINGUNGEN_TEXT]",
    },
    avv: {
      // \u00AD = weiche Trennstelle: bricht auf dem Handy als «Auftrags-/verarbeitungs-/vertrag» um
      title: "Auftrags\u00ADverarbeitungs\u00ADvertrag (AVV)",
      description: "Auftragsverarbeitungsvertrag (AVV) für smiit Analytics.",
      body: "[AVV_TEXT]",
    },
    back: "Zurück zur Startseite",
  },

  notFound: {
    title: "Seite nicht gefunden",
    text: "Die von Ihnen gesuchte Seite existiert leider nicht.",
    cta: "Zur Startseite",
    /** Beschreibung der Illustration (Bild aus smiit.de). */
    imageAlt: "Zwei Personen sitzen auf Würfeln und arbeiten am Laptop",
  },

  consent: {
    label: "Cookie-Hinweis",
    text: "[CONSENT_TEXT]",
    accept: "Akzeptieren",
    decline: "Ablehnen",
    more: "Mehr erfahren",
  },

  /** Alt-Texte und Beschreibungen aller Medien (IDs siehe config/media.ts). */
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
    IMG_MULTI_COMPANY: "Ein Login für das Treuhandbüro: Workspace-Liste mit allen Mandanten, ein Klick öffnet den Bericht des gewählten Mandanten",
    VIDEO_AI_CHAT: "Frage an die KI und die Antwort als Diagramm",
    IMG_PERSONA_GESCHAEFTSFUEHRUNG: "Smartphone mit Umsatz und offenen Rechnungen, daneben automatische Hinweise wie Wochenüberblick und Zahlungseingang",
    IMG_PERSONA_TREUHAND: "Berichte mehrerer Mandanten übereinander, der vorderste mit Exportieren-Button",
    IMG_PERSONA_TEAMLEITUNG: "Bereichsansicht mit Team-Auslastung und Stunden je Person",
  },
}
