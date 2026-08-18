export type Locale = 'de' | 'en'

const dictionaries = {
  de: {
    contact: {
      titlePrefix: "",
      titleHighlight: "Kontaktieren",
      titleSuffix: " Sie uns",
      subtitle: "Wir freuen uns auf Ihr Projekt und Ihre Fragen.",
      cta: "Kostenloses Erstgespräch buchen",
      formTitle: "Schreiben Sie uns",
      infoTitle: "Kontaktinformationen",
      form: {
        firstName: "Vorname",
        lastName: "Nachname",
        email: "E-Mail",
        phone: "Telefon",
        optional: "(optional)",
        interest: "Interesse auswählen",
        message: "Wie können wir Ihnen helfen?",
        submit: "Anfrage absenden",
        sending: "Wird gesendet...",
        successTitle: "Nachricht gesendet!",
        successText: "Vielen Dank für Ihre Nachricht. Wir melden uns in Kürze bei Ihnen.",
        errorTitle: "Fehler beim Senden",
        errorText: "Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail.",
        disclaimer: "Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zur Bearbeitung Ihrer Anfrage zu.",
        interests: [
          "Produktdemo",
          "Preise & Pakete",
          "Kostenlose Testversion",
          "Anbindung & Integration",
          "Individuelle Auswertungen",
          "Support",
          "Sonstiges",
        ],
      },
      info: {
        emailLabel: "E-Mail:",
        phoneLabel: "Telefon:",
        bookText: "Möchten Sie direkt mit uns sprechen?",
        bookLink: "Termin buchen",
        email: "kontakt@smiit.de",
        phone: "+49 160 4073198",
        phoneHref: "tel:+491604073198",
        address: "Reiherweg 96, 89584 Ehingen",
        addressFull: "Reiherweg 96\n89584 Ehingen\nDeutschland",
      },
      team: [
        {
          name: "Sebastian Grab",
          role: "Software Entwickler",
          image: "/assets/people/sebastian.webp",
          email: "sebastian.grab@smiit.de",
        },
        {
          name: "Noah Neßlauer",
          role: "Business Analyst",
          image: "/assets/people/noah.webp",
          email: "noah.nesslauer@smiit.de",
        },
      ],
    },
    landing: {
      hero: {
        title: "Business Intelligence\nfür bexio-Nutzer",
        subtitle: "Ist Ihr Business intelligent genug?",
        description: "Wir haben erfolgreich eine Daten-Infrastruktur entwickelt, um Nutzern der bexio-Software bessere Entscheidungsfindung und strategische sowie operative Planung zu ermöglichen.",
        primaryCta: "Los gehts!",
        secondaryCta: "Erfahren Sie mehr",
      },
      features: {
        badge: "IM ÜBERBLICK",
        title: "Was ist smiit Analytics",
        titleHighlight: "für bexio?",
        subtitle: "smiit Analytics für bexio ist Ihr Weg in eine klare Zukunft. Ein System, volle Kontrolle, Information & KI-Integration!",
        items: [
          {
            title: "Vollständiges Datenmodell",
            text: "Integration aller bexio-Daten in einem System",
          },
          {
            title: "Dashboarding",
            text: "Tiefgehende Analysen für Ihre Organisation",
          },
          {
            title: "Ihr System für die Zukunft",
            text: "Ihre Infrastruktur für Add-ons und KI",
          },
        ],
        previewButton: "Vorschau",
      },
      advantages: {
        badge: "IHRE VORTEILE",
        title: "Einmal investieren,\ndauerhaft profitieren.",
        items: [
          {
            label: "Volle Kontrolle",
            title: "Volle Eigentümerschaft",
            text: "Sie erhalten die volle Kontrolle über Ihre Daten und Analysen. Kein Vendor-Lock-in, keine Abhängigkeiten – Ihr System gehört Ihnen.",
            details:
              "Sie entscheiden selbst, welche Kennzahlen Sie priorisieren, wie Datenmodelle erweitert werden und wann neue Auswertungen live gehen. Dadurch bleiben Sie bei jeder strategischen Entscheidung unabhängig und flexibel.",
          },
          {
            label: "Individualisierung & Weiterentwicklung",
            title: "Individualisierung",
            text: "Passen Sie das System individuell an Ihre Bedürfnisse an. Wir entwickeln maßgeschneiderte Analysen und Erweiterungen für Ihr Unternehmen.",
            details:
              "Gemeinsam definieren wir Ihre fachlichen Anforderungen und setzen diese strukturiert um: von spezifischen KPI-Dashboards bis zu unternehmensspezifischen Datenflüssen. So wächst die Lösung mit Ihrem Unternehmen mit.",
          },
          {
            label: "Grundgerüst für technologische Innovation",
            title: "Innovation",
            text: "Mit der smiit Analytics-Infrastruktur erhalten Sie das perfekte Gerüst für eine ganzheitliche digitale Transformation.",
            details:
              "Die vorhandene Struktur schafft die Basis für weitere Automatisierungen, KI-Use-Cases und neue digitale Services. Damit investieren Sie nicht nur in ein Reporting-Tool, sondern in eine zukunftsfähige Datenplattform.",
          },
        ],
        learnMore: "Mehr erfahren",
        learnLess: "Weniger anzeigen",
      },
      pricing: {
        badge: "UNSER PRODUKT",
        title: "Ein fertiges System statt\nteurer Individualberatung",
        subtitle: "Die Vorteile von smiit Analytics auf einen Blick – bexio-Datenanalyse zum geringen Preis. Wir informieren Sie gerne in einem kostenlosen Call zu unserem Produkt und unseren verschiedenen Preismodellen.",
        productTitle: "smiit Analytics für bexio",
        productDescription: "Mit über 250 Analysen können Sie praktisch alles tracken, was in Ihrem Unternehmen passiert! Darüber hinaus können Sie die Analysesoftware von uns individuell anpassen lassen, um unternehmensspezifische Analysen zu erhalten. Überzeugen Sie sich über den Link von unserem Angebot.",
        priceOneTime: "CHF 1,000.00",
        priceOneTimeLabel: "Einmaliger Erwerb",
        priceCustom: "CHF 450.00 einmalig",
        priceCustomLabel: "Erwerb mit Individualisierungen",
        priceCustomNote: "+ CHF 120.00 je Stunde bei 8-100 Stunden",
        or: "oder",
        features: [
          "250+ Analysen",
          "Vollständiges Datenmodell",
          "30 Tage gratis testen",
        ],
        demoLink: "Zur Demoversion",
        consultationLink: "Beratungstermin",
        freeVersionLink: "Kostenlose Version",
      },
      process: {
        badge: "UNSER VORGEHEN",
        title: "Der Rollout-Prozess",
        steps: [
          {
            number: "01",
            title: "Verstehen",
            text: "Wir wollen Ihre Anforderungen und Bedürfnisse verstehen.",
          },
          {
            number: "02",
            title: "Zeigen & Beraten",
            text: "Wir zeigen Ihnen das Dashboard mit Ihren Daten und beraten Sie zu potentiellen Individualisierungen.",
          },
          {
            number: "03",
            title: "Integration & Dokumentation",
            text: "Wir integrieren das Dashboard in Ihre IT-Infrastruktur und dokumentieren alle Prozesse.",
          },
          {
            number: "04",
            title: "Launch und Schulungen",
            text: "Nach dem Launch schulen wir Ihre Mitarbeiter im Umgang mit dem System.",
          },
        ],
      },
      reviews: {
        heading: { lead: "Was Kunden über", highlight: "smiit Analytics sagen" },
        verifiedBadge: "Geprüfter Bewerter",
        sourceLabel: "Verifiziert auf bexio Marketplace",
        sourceUrl: "https://marketplace.bexio.com/de-CH/apps/128971/smiit-analytics/reviews",
        items: [
          {
            author: "Sarah Zanuco",
            company: "Zanuco Treuhand AG",
            rating: 5,
            date: "2025-08-11",
            title: "Maximale Effizienz und aussagekräftige Analysen",
            quote:
              "Dank der Schnittstelle können wir als moderne Treuhandfirma die Finanzdaten unserer Kunden schneller und klarer aufbereiten. Die benutzerfreundliche Visualisierung ermöglicht es uns, Daten in Echtzeit auszuwerten und fundierte Entscheidungen schnell zu treffen. Die Implementierung verlief reibungslos und hat unsere Prozesse deutlich optimiert. Diese Lösung empfehlen wir jedem Unternehmen, das Wert auf effiziente, präzise und zeitnahe Finanzberichterstattung legt.",
          },
          {
            author: "Florian Schär",
            company: "Masterhomepage GmbH",
            rating: 5,
            date: "2025-06-30",
            title: "flexibel, schnell und nett",
            quote:
              "Wir haben ein individuelles Dashboard von smiit erstellen lassen für die Auswertung der Zeiteinträge unserer Mitarbeiter mit Email Erinnerungsflows. Die Jungs sind sehr kompetent und äusserst freundlich. Super Service mit einem TOP Preis-/Leistungsverhältnis. Wir können smiit absolut weiterempfehlen!",
          },
          {
            author: "Andreas Andermatt",
            company: "ASW Engineering AG",
            rating: 5,
            date: "2025-03-14",
            title: "Sehr kundenfreundlich - top Zusammenarbeit - finden immer eine Lösung",
            quote:
              "Wir haben ein individuelles Dashboard von smiit erstellen lassen und sind total happy! Wenn etwas kleines geändert werden muss, benötigt es nicht gleich einen Nachtrag, sie sind da super flexibel und sehr an einem guten Endresultat interessiert. In der heutigen Zeit leider nicht mehr selbstverständlich. Wir haben unsere Dashboards besprochen, sie haben super Input eingebracht und bei der Umsetzung noch ein paar coole Features eingebaut, welche die Dashboards noch besser machten, dies ohne Zusatzaufwand. Wir können smiit vollumfänglich weiterempfehlen!",
          },
        ],
      },
      faq: {
        eyebrow: "HÄUFIGE FRAGEN",
        heading: { lead: "Antworten auf das, was", highlight: "oft gefragt wird" },
        items: [
          {
            question: "Für wen ist smiit Analytics gedacht?",
            answer:
              "Für Unternehmen, die bexio im Einsatz haben und mehr aus ihren bexio-Daten herausholen möchten — über das hinaus, was bexio selbst an integrierter Auswertung bietet.",
          },
          {
            question: "Was kostet smiit Analytics?",
            answer:
              "Die Standardlösung kostet einmalig CHF 1.000. Eine individuell angepasste Variante startet bei CHF 450 einmalig plus CHF 120 pro Stunde für Custom-Anpassungen (typischerweise 8-100 Stunden).",
          },
          {
            question: "Welche Analysen sind enthalten?",
            answer:
              "Über 250 vorgefertigte Analysen für alle Bereiche Ihrer bexio-Daten — Vertrieb, Buchhaltung, Aufträge, Kunden. Sie können sofort starten und bei Bedarf eigene Analysen ergänzen lassen.",
          },
          {
            question: "Können wir die Lösung vorher testen?",
            answer:
              "Ja. Sie können smiit Analytics 30 Tage kostenlos testen. So sehen Sie konkret, was die Lösung für Ihre Daten leistet, bevor Sie sich entscheiden.",
          },
          {
            question: "Wem gehört das System nach dem Kauf?",
            answer:
              "Sie haben volle Eigentümerschaft — keine wiederkehrenden Lizenzkosten, kein Vendor-Lock-in. Das Datenmodell und alle Anpassungen gehören Ihnen.",
          },
        ],
      },
      cta: {
        title: "Begleiten Sie uns in eine\nKI-gesteuerte Zukunft!",
        button: "Vereinbaren Sie einen Termin",
      },
    },
  },
  en: {
    contact: {
      titlePrefix: "Get in ",
      titleHighlight: "touch",
      titleSuffix: " with us",
      subtitle: "We look forward to your project and your questions.",
      cta: "Book a free consultation",
      formTitle: "Write to us",
      infoTitle: "Contact information",
      form: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        phone: "Phone",
        optional: "(optional)",
        interest: "Select your interest",
        message: "How can we help you?",
        submit: "Send request",
        sending: "Sending...",
        successTitle: "Message sent!",
        successText: "Thank you for your message. We will get back to you shortly.",
        errorTitle: "Error sending message",
        errorText: "Please try again or contact us directly via email.",
        disclaimer: "By submitting, you agree to the processing of your data for handling your request.",
        interests: [
          "Product demo",
          "Pricing & packages",
          "Free trial",
          "Connection & integration",
          "Custom analytics",
          "Support",
          "Other",
        ],
      },
      info: {
        emailLabel: "Email:",
        phoneLabel: "Phone:",
        bookText: "Want to talk right away?",
        bookLink: "Book an appointment",
        email: "kontakt@smiit.de",
        phone: "+49 160 4073198",
        phoneHref: "tel:+491604073198",
        address: "Reiherweg 96, 89584 Ehingen",
        addressFull: "Reiherweg 96\n89584 Ehingen\nGermany",
      },
      team: [
        {
          name: "Sebastian Grab",
          role: "Software Engineer",
          image: "/assets/people/sebastian.webp",
          email: "sebastian.grab@smiit.de",
        },
        {
          name: "Noah Neßlauer",
          role: "Business Analyst",
          image: "/assets/people/noah.webp",
          email: "noah.nesslauer@smiit.de",
        },
      ],
    },
    landing: {
      hero: {
        title: "Business Intelligence\nfor bexio Users",
        subtitle: "Is your business intelligent enough?",
        description: "We have successfully developed a data infrastructure to enable bexio software users to make better decisions and improve strategic as well as operational planning.",
        primaryCta: "Get started!",
        secondaryCta: "Learn more",
      },
      features: {
        badge: "INTRODUCING",
        title: "What is smiit Analytics",
        titleHighlight: "for bexio?",
        subtitle: "smiit Analytics for bexio is your path to a clear future. One system, full control, information & AI integration!",
        items: [
          {
            title: "Complete Data Model",
            text: "Integration of all bexio data in one system",
          },
          {
            title: "Dashboarding",
            text: "In-depth analyses for your organization",
          },
          {
            title: "Your System for the Future",
            text: "Your infrastructure for add-ons and AI",
          },
        ],
        previewButton: "Preview",
      },
      advantages: {
        badge: "ADVANTAGE",
        title: "Your one-time solution,\nbuilt for the future.",
        items: [
          {
            label: "Full Control",
            title: "Complete Ownership",
            text: "You get full control over your data and analyses. No vendor lock-in, no dependencies – your system belongs to you.",
            details:
              "You decide which KPIs matter most, how data models evolve, and when new reports go live. This keeps your strategic decisions independent and your operations highly adaptable.",
          },
          {
            label: "Customization & Development",
            title: "Individualization",
            text: "Customize the system to your specific needs. We develop tailored analyses and extensions for your business.",
            details:
              "Together, we translate your business requirements into concrete implementation steps—from specific KPI dashboards to custom data flows. This ensures the solution scales with your company.",
          },
          {
            label: "Foundation for Technological Innovation",
            title: "Innovation",
            text: "With the backend / smiit Analytics infrastructure, you get the perfect foundation for a comprehensive digital transformation.",
            details:
              "The existing architecture enables future automation, AI use cases, and additional digital services. You are not only adopting reporting—you are building a future-ready data platform.",
          },
        ],
        learnMore: "Learn more",
        learnLess: "Show less",
      },
      pricing: {
        badge: "OUR PRODUCT",
        title: "A pre-built system instead of\nexpensive individual consulting",
        subtitle: "The advantages of smiit Analytics at a glance – bexio data analysis at a low price. We are happy to inform you in a free call about our product and our various pricing models.",
        productTitle: "smiit Analytics for bexio",
        productDescription: "With over 250 analyses, you can track practically everything happening in your company! Additionally, you can have the analysis software customized by us to receive company-specific analyses. See for yourself via the link to our offering.",
        priceOneTime: "CHF 1,000.00",
        priceOneTimeLabel: "One-time purchase",
        priceCustom: "CHF 450.00 one-time",
        priceCustomLabel: "Purchase with customizations",
        priceCustomNote: "+ CHF 120.00 per hour for 8-100 hours",
        or: "or",
        features: [
          "250+ Analyses",
          "Complete Data Model",
          "30 Days Free Trial",
        ],
        demoLink: "View Demo",
        consultationLink: "Book Consultation",
        freeVersionLink: "Free Version",
      },
      process: {
        badge: "PROCESS",
        title: "The Rollout Process",
        steps: [
          {
            number: "01",
            title: "Understand",
            text: "We want to understand your requirements and needs.",
          },
          {
            number: "02",
            title: "Show & Advise",
            text: "We show you the dashboard with your data and advise you on potential customizations.",
          },
          {
            number: "03",
            title: "Integration & Documentation",
            text: "We integrate the dashboard into your IT infrastructure and document all processes.",
          },
          {
            number: "04",
            title: "Launch & Training",
            text: "After launch, we train your employees on how to use the system.",
          },
        ],
      },
      reviews: {
        heading: { lead: "What customers say about", highlight: "smiit Analytics" },
        verifiedBadge: "Verified reviewer",
        sourceLabel: "Verified on bexio Marketplace",
        sourceUrl: "https://marketplace.bexio.com/en-GB/apps/128971/smiit-analytics/reviews",
        translatedNote: "Translated from German",
        items: [
          {
            author: "Sarah Zanuco",
            company: "Zanuco Treuhand AG",
            rating: 5,
            date: "2025-08-11",
            title: "Maximum efficiency and meaningful analyses",
            quote:
              "Thanks to the interface, we as a modern fiduciary firm can prepare our clients' financial data faster and more clearly. The user-friendly visualization lets us evaluate data in real time and make well-founded decisions quickly. The implementation went smoothly and significantly streamlined our processes. We recommend this solution to any company that values efficient, precise, and timely financial reporting.",
          },
          {
            author: "Florian Schär",
            company: "Masterhomepage GmbH",
            rating: 5,
            date: "2025-06-30",
            title: "Flexible, fast, and friendly",
            quote:
              "We had smiit build a custom dashboard for evaluating our employees' time entries, including email reminder flows. The team is highly competent and extremely friendly. Great service with an excellent price-performance ratio. We can absolutely recommend smiit!",
          },
          {
            author: "Andreas Andermatt",
            company: "ASW Engineering AG",
            rating: 5,
            date: "2025-03-14",
            title: "Very customer-friendly – great collaboration – they always find a solution",
            quote:
              "We had smiit build a custom dashboard and we're absolutely happy! When something small needs changing, it doesn't require a formal change request right away — they're super flexible and genuinely invested in a good end result. Sadly not a given these days. We discussed our dashboards, they contributed great input and even added a few cool features during implementation that made the dashboards even better, all at no extra cost. We can fully recommend smiit!",
          },
        ],
      },
      faq: {
        eyebrow: "FREQUENTLY ASKED",
        heading: { lead: "Answers to the things", highlight: "people ask most" },
        items: [
          {
            question: "Who is smiit Analytics for?",
            answer:
              "Companies using bexio who want to get more out of their bexio data — beyond what bexio itself offers in built-in reporting.",
          },
          {
            question: "What does smiit Analytics cost?",
            answer:
              "The standard solution is a one-time CHF 1,000. A customized variant starts at CHF 450 one-time plus CHF 120 per hour for custom adjustments (typically 8-100 hours).",
          },
          {
            question: "Which analyses are included?",
            answer:
              "Over 250 pre-built analyses covering all areas of your bexio data — sales, accounting, orders, customers. You can start immediately and add custom analyses as needed.",
          },
          {
            question: "Can we try the solution first?",
            answer:
              "Yes. You can test smiit Analytics free for 30 days. That way you see concretely what the solution delivers for your data before committing.",
          },
          {
            question: "Who owns the system after purchase?",
            answer:
              "You have full ownership — no recurring license fees, no vendor lock-in. The data model and all customizations belong to you.",
          },
        ],
      },
      cta: {
        title: "Join us on the journey to an\nAI-powered future!",
        button: "Schedule a meeting",
      },
    },
  },
}

export const getDictionary = (locale: Locale) => dictionaries[locale]
