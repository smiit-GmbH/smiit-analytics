/**
 * English
 *
 * Conventions: see lib/dictionary/index.ts.
 */
import type { Dictionary } from "./de.ts"

export const en: Dictionary = {
  meta: {
    title: "bexio Reporting & Dashboards in 5 Minutes | smiit Analytics",
    description:
      "Reporting for bexio: connected in 5 minutes, then sales, balance sheet, cash flow and liquidity in one dashboard. AI analysis included. Free 30-day trial.",
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
      title: "The numbers are in bexio. *The overview is not.*",
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
      solution: "smiit Analytics pulls your data directly from bexio and turns it into clear reports. Automatically and without Excel.",
    },

    steps: {
      eyebrow: "Connect bexio in 5 minutes",
      title: "Three steps *to bexio reporting*",
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
      eyebrow: "Standard reports for bexio",
      title: "Ready-made bexio reports. *From day one.*",
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
      eyebrow: "Dashboard editor",
      title: "Your dashboard. *Exactly the way you want it.*",
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
      eyebrow: "AI analysis for bexio",
      title: "Ask your bexio numbers. *The AI answers.*",
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
      eyebrow: "Automations for bexio",
      title: "Routine work? *Takes care of itself.*",
      intro: "Define once what should happen. smiit Analytics checks your bexio data and acts for you.",
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
      eyebrow: "For SMEs and fiduciaries",
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
      title: "Frequently asked questions *about smiit Analytics*",
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
      disputeText:
        "We are not obliged to participate in dispute resolution proceedings before a consumer arbitration board and do not participate in them.",
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
   * Text inside the generated illustrations (scripts/build-media.mjs,
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
    IMG_MULTI_COMPANY: "One login for the fiduciary firm: workspace list with all clients, one click opens the selected client's report",
    VIDEO_AI_CHAT: "A question to the AI and the answer as a chart",
    IMG_PERSONA_MANAGEMENT:
      "Smartphone showing revenue and open invoices, alongside automatic notifications such as the weekly summary and payment received",
    IMG_PERSONA_TRUSTEE: "Reports of several clients stacked, the front one with an Export button",
    IMG_PERSONA_TEAM_LEAD: "Area view with team workload and hours per person",
  },
}
