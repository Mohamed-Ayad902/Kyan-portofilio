/**
 * English — the source language. Every other dictionary must match this shape exactly
 * (TypeScript enforces it, and `npm run check:i18n` checks for empty strings).
 *
 * Content rule: company claims come from Kayan's portfolio only. General explanations of how
 * equipment is used are written as guidance, never as proof of past work.
 */
const en = {
  meta: {
    siteName: "Kayan Equipment Rental",
    defaultTitle: "Kayan — Heavy Equipment Rental in Egypt",
    titleTemplate: "%s · Kayan Equipment Rental",
    defaultDescription:
      "Kayan rents excavators, bulldozers, dump trucks, rollers, cranes, forklifts and access platforms for construction, industrial and infrastructure projects across Egypt. Short-term or long-term, with operators on request.",
    home: {
      title: "Kayan — Heavy Equipment Rental in Egypt",
      description:
        "Construction equipment rental from Cairo: excavators, bulldozers, cranes, forklifts, manlifts and more, by the day or on long-term contract. Request a quote from Kayan.",
    },
    about: {
      title: "About Kayan",
      description:
        "Kayan provides heavy equipment rental and general supplies for construction, industrial and infrastructure projects in Egypt. How we work and what we prioritise.",
    },
    equipment: {
      title: "Equipment for Rent",
      description:
        "Nine equipment categories for rent in Egypt: excavators, bulldozers, dump trucks, rollers, cranes, forklifts, clarks, manlifts and scissor lifts.",
    },
    industries: {
      title: "Industries and Applications",
      description:
        "How equipment rental supports construction, infrastructure, solar, industrial, earthworks, roadwork, lifting and elevated-access work in Egypt.",
    },
    projects: {
      title: "Projects and Experience",
      description:
        "Projects named in Kayan's portfolio: CBD, Alamein Downtown Towers, Sunrev Solar, Elite Solar and Sailun Egypt Tyre.",
    },
    process: {
      title: "How Equipment Rental Works",
      description:
        "How to rent heavy equipment from Kayan: what to tell us, how availability and pricing are confirmed, and the difference between short-term rental and long-term contracts.",
    },
    faq: {
      title: "Equipment Rental FAQ",
      description:
        "Answers about Kayan's equipment categories, short-term and long-term rentals, operators, availability, project locations and technical support.",
    },
    contact: {
      title: "Contact Kayan and Request a Quote",
      description:
        "Request an equipment rental quote or contact Kayan in Nasr City, Cairo. Phone +20 111 969 9667, +20 111 197 8921 or email kayanequipment@gmail.com.",
    },
    notFound: { title: "Page not found", description: "The page you were looking for does not exist." },
  },

  common: {
    skip: "Skip to content",
    menu: "Menu",
    close: "Close",
    quote: "Request a quote",
    requestQuote: "Request a rental quote",
    explore: "Explore the equipment",
    call: "Call",
    email: "Email",
    whatsapp: "WhatsApp",
    openMap: "Open in Google Maps",
    readMore: "Read more",
    allEquipment: "All equipment",
    home: "Home",
    breadcrumb: "Breadcrumb",
    themeToggle: "Switch colour theme",
    themeLight: "Light",
    themeDark: "Dark",
    language: "Language",
    primaryNav: "Main navigation",
    footerNav: "Footer navigation",
    illustrative: "Illustrative image",
    illustrativeFootage: "Illustrative footage",
    pauseVideo: "Pause video",
    playVideo: "Play video",
    pauseSlides: "Pause slideshow",
    playSlides: "Play slideshow",
    previous: "Previous",
    next: "Next",
    submenu: "{label}: more pages",
    announcement: "Short-term and long-term equipment rental in Egypt. Request a quote",
  },

  nav: {
    equipment: "Equipment",
    industries: "Industries",
    projects: "Projects",
    about: "About",
    process: "Rental process",
    faq: "FAQ",
    contact: "Contact",
  },

  home: {
    hero: {
      titleLines: ["Heavy equipment", "rental in Egypt"],
      standfirst:
        "Excavators, cranes, forklifts and access platforms for construction, industrial and infrastructure projects. By the day, or on contract for the length of the job.",
      mosaicLabel: "Illustrative footage and equipment photographs",
      videoLabel: "Aerial view of an excavator loading an articulated dump truck. Illustrative stock footage, not Kayan's fleet.",
      carouselLabel: "Kayan at a glance",
      slideOf: "{n} of {total}",
    },
    stats: {
      label: "Kayan in figures",
      equipment: "Equipment categories for rent",
      industries: "Types of work supported",
      projects: "Projects named in our portfolio",
      models: "Rental models: short and long term",
    },
    intro: {
      headingLines: ["Behind every", "major project"],
      body:
        "Kayan rents modern heavy equipment and supplies to construction, industrial and infrastructure projects in Egypt. We aim to be a partner in progress: the machines you need, when you need them, so the project keeps to its schedule and its budget.",
      secondary:
        "From foundation work and earthmoving to lifting, material handling and work at height, one supplier can cover the whole site.",
      link: "About Kayan",
    },
    showcase: {
      heading: "Nine machines, three jobs",
      lead: "Our fleet covers the work from the first cut of earth to the last panel fixed at height.",
    },
    industries: {
      heading: "Where the equipment works",
      note: "Eight types of work our equipment categories are used for.",
      link: "Industries and applications",
    },
    why: {
      headingLines: ["Why choose", "Kayan"],
      body:
        "More than machines on a lorry. Kayan offers contract flexibility and technical support so you can concentrate on building.",
      rows: [
        {
          title: "Reliability",
          body: "We keep the fleet in working order and maintain units to international standards, so equipment arrives ready for the shift.",
          terms: ["Maintained fleet", "Continuously updated", "Ready to operate"],
        },
        {
          title: "Flexibility",
          body: "Contracts follow the project's duration, from daily hire to annual agreements, and scale from small jobs to megaprojects.",
          terms: ["Daily to annual", "Various capacities", "Project-based"],
        },
        {
          title: "Support",
          body: "Kayan's technical team is on call around the clock for maintenance and repairs, so a breakdown does not become a stoppage.",
          terms: ["Maintenance", "Repairs", "On call 24/7"],
        },
        {
          title: "Operators",
          body: "Rent the machine on its own or with an experienced operator, depending on the crew you already have on site.",
          terms: ["Optional", "Experienced", "Agreed per rental"],
        },
        {
          title: "Cost control",
          body: "Renting avoids a large capital outlay and passes the maintenance risk to us, which helps keep project costs predictable.",
          terms: ["No capital outlay", "Lower maintenance risk", "Predictable costs"],
        },
      ],
    },
    models: {
      heading: "Short or long term",
      body:
        "Choose the arrangement that fits the work. Every rental is agreed directly with Kayan for your site, your timing and your crew.",
      short: {
        title: "Short-term rental",
        body: "For urgent needs, a single phase of work or a machine to cover a gap. Hire by the day, week or month.",
      },
      long: {
        title: "Long-term contract",
        body: "An efficient arrangement for projects that run for many months or years, with terms built around the programme.",
      },
      operators: "Both can include an experienced operator.",
    },
    slip: {
      heading: "Build your request",
      intro: "Choose what you need and we will carry it into the quote form.",
      equipmentLabel: "Equipment",
      durationLabel: "Rental period",
      locationLabel: "Project location",
      locationPlaceholder: "e.g. New Cairo, 6th of October, Sokhna",
      operatorLabel: "I need an operator",
      continue: "Continue to quote form",
      whatsapp: "Send on WhatsApp",
      summaryTitle: "Rental request",
      summaryEmpty: "Nothing chosen yet",
      summaryOperatorYes: "With operator",
      summaryOperatorNo: "Machine only",
    },
    projects: {
      headingLines: ["Previous", "projects"],
      lead: "Kayan's portfolio names these projects among its previous work.",
      link: "View all projects",
    },
    process: {
      heading: "From request to site",
      body: "Renting from Kayan is a direct conversation, not a checkout. Here is how a request becomes a machine on site.",
      zones: [
        { name: "Tell", body: "Your project, the equipment category, the site location and how long you need it." },
        { name: "Match", body: "We discuss availability, specifications, price and whether you need an operator." },
        { name: "Deliver", body: "You confirm the arrangement and delivery; we coordinate the rental and any agreed support." },
      ],
      link: "The full rental process",
      figureLabel: "Diagram: many requirements gathered into one rental plan, then delivered as an ordered set of machines.",
    },
    faq: {
      heading: "Questions",
      link: "All questions",
    },
    contact: {
      sentence: "Planning a project or covering an urgent gap? Tell us what the site needs.",
      question: "Talk to Kayan",
      cityLine: "Nasr City, Cairo · Egypt",
    },
  },

  equipment: {
    families: {
      earthmoving: {
        title: "Earthmoving and paving",
        sentence: "Excavators, bulldozers, dump trucks and rollers: digging, pushing, hauling and compacting.",
      },
      lifting: {
        title: "Lifting and handling",
        sentence: "Cranes, forklifts and clarks for lifting loads, unloading deliveries and moving stock.",
      },
      access: {
        title: "Elevated access",
        sentence: "Manlifts and scissor lifts that put a crew safely at height for installation and maintenance.",
      },
    },
    page: {
      title: "Equipment for rent",
      lead:
        "Kayan rents nine categories of heavy equipment, available in various capacities so a machine can be matched to the job, from a small site to an international megaproject.",
      verifyNote:
        "Models, capacities and stock change. Specifications and availability are confirmed for each request.",
      familyLink: "View",
    },
    detail: {
      applications: "Typical applications",
      requirements: "What it helps with",
      considerations: "Before you rent",
      specs: "Specifications and availability",
      specsBody:
        "Kayan holds this category in various capacities. Exact models, capacities, attachments and dates are confirmed for each request, so tell us the job and the site and we will propose the right unit.",
      ctaHeading: "Need this on site?",
      ctaBody: "Send the job, location and rental period and Kayan will come back with availability and a price.",
      related: "In the same family",
      photoNote: "Illustrative photograph of the category, not a Kayan unit.",
    },
    items: {
      excavators: {
        name: "Excavators",
        singular: "Excavator",
        short: "Digging, trenching, loading and demolition on almost every kind of site.",
        intro:
          "The excavator is usually the first machine on a construction site and one of the last to leave. Kayan rents excavators for bulk digging, foundations, trenches and loading trucks.",
        applications: [
          "Bulk excavation and basements",
          "Foundation and footing pits",
          "Trenching for utilities and drainage",
          "Loading dump trucks",
          "Demolition and site clearance with suitable attachments",
        ],
        requirements: [
          "Moving large volumes of soil and rock on a fixed programme",
          "Working in tight or deep excavations",
          "Keeping haul trucks loaded without waiting",
        ],
        considerations: [
          "The material you are digging and the depth you need to reach",
          "Ground conditions and access to the site",
          "Any attachments, such as a breaker or a different bucket",
          "Whether you need an operator",
        ],
        seoTitle: "Excavator Rental in Egypt",
        seoDescription:
          "Rent excavators from Kayan for excavation, trenching, foundations and loading. Various capacities, short-term or long-term, with operators on request.",
      },
      bulldozers: {
        name: "Bulldozers",
        singular: "Bulldozer",
        short: "Pushing, levelling and clearing ground for platforms and roads.",
        intro:
          "Bulldozers cut, push and spread material over large areas. They prepare building platforms, open haul roads and shape ground before compaction.",
        applications: [
          "Site clearance and stripping",
          "Cut-and-fill and bulk levelling",
          "Spreading fill in layers",
          "Opening and maintaining haul roads",
          "Backfilling",
        ],
        requirements: [
          "Preparing large, level areas quickly",
          "Moving material over short distances",
          "Working on rough or loose ground",
        ],
        considerations: [
          "The size of the area and the volume to move",
          "Soil type and whether there is rock",
          "Blade type needed for the work",
          "Whether you need an operator",
        ],
        seoTitle: "Bulldozer Rental in Egypt",
        seoDescription:
          "Rent bulldozers from Kayan for site clearance, levelling and earthworks across Egypt. Daily to long-term rental, with operators on request.",
      },
      "dump-trucks": {
        name: "Dump trucks",
        singular: "Dump truck",
        short: "Hauling excavated material, aggregates and fill around and off site.",
        intro:
          "Dump trucks keep earthworks moving by carrying material away from the excavator and bringing fill and aggregates in. Kayan's portfolio lists them as truck dumpers.",
        applications: [
          "Removing excavated soil and rock",
          "Delivering fill, sand and aggregates",
          "Moving material between areas of a large site",
          "Supporting road and platform construction",
        ],
        requirements: [
          "Matching haul capacity to the excavator's output",
          "Carrying material over site roads or public roads",
          "Keeping a cycle of trucks moving",
        ],
        considerations: [
          "Volume to move each day and the haul distance",
          "Site roads and access",
          "How many trucks the cycle needs",
          "Whether you need drivers",
        ],
        seoTitle: "Dump Truck Rental in Egypt",
        seoDescription:
          "Rent dump trucks (truck dumpers) from Kayan for hauling soil, aggregates and fill on construction and infrastructure projects in Egypt.",
      },
      rollers: {
        name: "Rollers",
        singular: "Roller",
        short: "Compacting soil, base layers and asphalt for roads and platforms.",
        intro:
          "Rollers compact soil, aggregate base and asphalt so that the ground can carry the load placed on it. They are essential in roadwork and in preparing building platforms.",
        applications: [
          "Compacting fill in layers",
          "Sub-base and base course for roads",
          "Asphalt paving",
          "Platforms, yards and car parks",
        ],
        requirements: [
          "Reaching the compaction a specification calls for",
          "Working directly behind a spreading or paving crew",
          "Finishing surfaces evenly",
        ],
        considerations: [
          "The material being compacted: soil, aggregate or asphalt",
          "Area and layer thickness",
          "Smooth drum, padfoot or pneumatic roller",
          "Whether you need an operator",
        ],
        seoTitle: "Roller Rental in Egypt",
        seoDescription:
          "Rent compaction rollers from Kayan for roadwork, paving and earthworks in Egypt. Short-term and long-term rental available.",
      },
      cranes: {
        name: "Cranes",
        singular: "Crane",
        short: "Lifting heavy loads, steel and plant into position.",
        intro:
          "Cranes place what people and smaller machines cannot: steel, precast elements, plant and heavy materials. Kayan rents cranes for construction and industrial lifts.",
        applications: [
          "Structural steel and precast erection",
          "Lifting materials to upper floors",
          "Installing plant and equipment in industrial facilities",
          "Loading and unloading heavy deliveries",
        ],
        requirements: [
          "Lifting heavy or awkward loads with control",
          "Reaching over obstacles and into confined areas",
          "Short lifting campaigns or long-term presence on site",
        ],
        considerations: [
          "Heaviest load, lifting radius and height",
          "Ground conditions and space for setting up",
          "Lift planning and rigging on your side",
          "Whether you need an operator",
        ],
        seoTitle: "Crane Rental in Egypt",
        seoDescription:
          "Rent cranes from Kayan for construction and industrial lifting in Egypt. Tell us the load, radius and height and we will propose a suitable crane.",
      },
      forklifts: {
        name: "Forklifts",
        singular: "Forklift",
        short: "Moving palletised materials on sites, in yards and in warehouses.",
        intro:
          "Forklifts move pallets and packed materials quickly and safely. On construction sites, in factories and in storage yards they keep deliveries flowing to where the work is.",
        applications: [
          "Unloading deliveries",
          "Moving blocks, bricks and palletised materials",
          "Supplying production lines and stores",
          "Handling panels and components on solar sites",
        ],
        requirements: [
          "Moving many loads a day over short distances",
          "Working on paved floors or rough site ground",
          "Feeding crews without manual handling",
        ],
        considerations: [
          "Heaviest load and lift height",
          "Indoor or outdoor use and the ground surface",
          "Fuel type",
          "Whether you need an operator",
        ],
        seoTitle: "Forklift Rental in Egypt",
        seoDescription:
          "Rent forklifts from Kayan for construction sites, factories, warehouses and solar projects in Egypt. Daily, monthly or long-term rental.",
      },
      clarks: {
        name: "Clarks",
        singular: "Clark",
        short: "Compact lift trucks for yards, workshops and warehouses.",
        intro:
          "On Egyptian sites, “clark” is the everyday name for a compact lift truck. Kayan lists clarks alongside its forklifts for lighter, tighter material-handling work.",
        applications: [
          "Moving stock in warehouses and stores",
          "Loading and unloading in workshops",
          "Yard work in confined spaces",
        ],
        requirements: [
          "Handling lighter loads in narrow aisles",
          "Frequent short moves",
          "A smaller machine where a full forklift is not needed",
        ],
        considerations: [
          "Load weight and lift height",
          "Aisle width and floor surface",
          "Indoor or outdoor use",
          "Whether you need an operator",
        ],
        seoTitle: "Clark Rental in Egypt",
        seoDescription:
          "Rent clarks (compact lift trucks) from Kayan for warehouses, workshops and yards in Egypt. Tell us the load and space and we will match the machine.",
      },
      manlifts: {
        name: "Manlifts",
        singular: "Manlift",
        short: "Boom lifts that reach up and over to put people at height.",
        intro:
          "A manlift, or boom lift, carries a crew in a platform on a telescopic or articulated boom. It reaches up and outwards, over obstacles that a scissor lift cannot clear.",
        applications: [
          "Facade and cladding installation",
          "Steelwork connections and inspection",
          "Maintenance on industrial plant",
          "Lighting, signage and services at height",
        ],
        requirements: [
          "Reaching high or over obstacles",
          "Working safely at height instead of from scaffolding",
          "Moving between many work points",
        ],
        considerations: [
          "Working height and outreach",
          "Ground conditions",
          "Indoor or outdoor use",
          "Platform load and number of people",
        ],
        seoTitle: "Manlift (Boom Lift) Rental in Egypt",
        seoDescription:
          "Rent manlifts (boom lifts) from Kayan for facade work, steel erection and maintenance at height in Egypt. Short-term and long-term rental.",
      },
      "scissor-lifts": {
        name: "Scissor lifts",
        singular: "Scissor lift",
        short: "Stable, roomy platforms that rise straight up for work overhead.",
        intro:
          "A scissor lift raises a wide platform vertically, giving a crew room for tools and materials. It is the usual choice for ceilings, services and fit-out work.",
        applications: [
          "Ceilings and overhead services",
          "Fit-out in buildings and factories",
          "Warehouse and facility maintenance",
          "Event and temporary installations",
        ],
        requirements: [
          "Several people working overhead with materials",
          "Repeated work across a level floor",
          "A stable platform for longer tasks",
        ],
        considerations: [
          "Working height and platform size",
          "Floor or ground surface",
          "Indoor or outdoor use",
          "Access through doors and lifts",
        ],
        seoTitle: "Scissor Lift Rental in Egypt",
        seoDescription:
          "Rent scissor lifts from Kayan for fit-out, maintenance and installation work at height in Egypt. Daily to long-term rental.",
      },
    },
  },

  industries: {
    page: {
      title: "Industries and applications",
      lead:
        "Kayan's equipment categories serve many kinds of project. These are the types of work they are typically used for, and the machines each one tends to need.",
      guidanceNote: "General guidance on how equipment is used, not a list of past contracts.",
      equipmentLabel: "Equipment often used",
    },
    items: {
      construction: {
        title: "Construction and real estate",
        body:
          "Residential, commercial and mixed-use developments need equipment through every phase: excavation and foundations, lifting materials as the structure rises, and access at height for facades and services.",
      },
      infrastructure: {
        title: "Infrastructure and civil works",
        body:
          "Utilities, drainage, platforms and public works depend on earthmoving and haulage, with compaction wherever ground must carry a load.",
      },
      solar: {
        title: "Renewable energy and solar",
        body:
          "Solar plants and manufacturing facilities call for ground preparation, unloading and moving panels and components, and lifting during installation.",
      },
      industrial: {
        title: "Industrial facilities",
        body:
          "Factories and plants need lifting for installation, forklifts and clarks for production and stores, and platforms for maintenance at height.",
      },
      earthworks: {
        title: "Earthmoving and site preparation",
        body:
          "Clearing, cutting, filling and hauling to turn a raw plot into a site that is ready to build on.",
      },
      "material-handling": {
        title: "Material handling and lifting",
        body:
          "Unloading deliveries, moving pallets across a site and lifting heavy items into place without manual handling.",
      },
      roadwork: {
        title: "Roadwork and paving",
        body:
          "Shaping and compacting layers from sub-base to asphalt, with trucks bringing material to the paving crew.",
      },
      "elevated-access": {
        title: "Elevated access and maintenance",
        body:
          "Putting people safely at height for installation, inspection and maintenance, including temporary and event installations.",
      },
    },
  },

  projects: {
    page: {
      title: "Projects and experience",
      lead:
        "Kayan's work reflects its ability to meet the needs of large and small projects with modern, ready-to-operate equipment and a technical team focused on performance and safety. These projects are named in our portfolio.",
      detailsOnRequest: "Further project details are available on request.",
      imageNote: "Image as shown in Kayan's portfolio.",
      sectorLabel: "Sector",
    },
    sectors: {
      commercial: "Commercial district",
      highrise: "High-rise towers",
      solar: "Solar energy",
      industrial: "Industrial manufacturing",
    },
    items: {
      cbd: { name: "CBD Project", details: [] as { label: string; value: string }[] },
      "alamein-downtown-towers": { name: "Alamein Downtown Towers Project", details: [] as { label: string; value: string }[] },
      "sunrev-solar": { name: "Sunrev Solar Project", details: [] as { label: string; value: string }[] },
      "elite-solar": { name: "Elite Solar Project", details: [] as { label: string; value: string }[] },
      "sailun-egypt-tyre": { name: "Sailun Egypt Tyre Project", details: [] as { label: string; value: string }[] },
    },
  },

  about: {
    titleLines: ["About", "Kayan"],
    lead:
      "Kayan provides heavy equipment rental and general supplies for construction, industrial and infrastructure projects in Egypt.",
    overviewHeading: "What we do",
    overview: [
      "Kayan supplies modern heavy equipment to large-scale construction and infrastructure work. The fleet covers earthmoving and paving, lifting and material handling, and elevated access, in a range of capacities.",
      "We work with projects of every size. A contractor may need one machine for a week to cover a gap; a developer may need a group of machines for the full length of a multi-year programme. Both are served by the same team.",
    ],
    marketHeading: "Where we work",
    market:
      "Egypt is building at a large scale: new cities, towers, industrial zones, energy projects and the roads that connect them. Kayan is based in Nasr City, Cairo, and supports projects across the country.",
    approachHeading: "Our approach to rental",
    approach: [
      {
        title: "A partner in progress",
        body: "We see rental as a working relationship. The aim is that every project runs to schedule with costs under control.",
      },
      {
        title: "Arrangements that fit the job",
        body: "Contracts follow the project's duration, from daily hire to annual agreements, with experienced operators as an option.",
      },
      {
        title: "Support that keeps machines working",
        body: "Our technical team handles maintenance and repairs so that equipment problems do not become project delays.",
      },
    ],
    prioritiesHeading: "What we prioritise",
    priorities: [
      { title: "Quality", body: "A fleet kept in good condition and continuously updated." },
      { title: "Efficiency", body: "The right machine for the work, so time and fuel are not wasted." },
      { title: "Timeliness", body: "Equipment on site when the programme needs it." },
      { title: "Safety", body: "Ready-to-operate equipment and a technical team focused on performance and safety." },
    ],
    deliveryHeading: "How we support project delivery",
    delivery:
      "Renting from Kayan lets a project avoid significant investment in equipment, reduce maintenance risk and keep operations running smoothly. You get the capacity you need for each phase and return it when the phase is done.",
  },

  process: {
    titleLines: ["How rental", "works"],
    lead:
      "Renting heavy equipment from Kayan is a direct conversation with our team. This is the usual path from first message to machine on site.",
    guidance:
      "This describes the general process. Commercial terms, delivery arrangements and any technical support are confirmed with Kayan for each rental.",
    steps: [
      {
        title: "Tell us about your project",
        body: "Describe the work, the site and what you need to achieve. A short message or call is enough to start.",
      },
      {
        title: "Specify equipment, location and period",
        body: "Name the equipment category, where the site is and how long you expect to need it. If you are not sure which machine fits, describe the job and we will advise.",
      },
      {
        title: "Discuss availability, specifications and price",
        body: "Kayan confirms which units are available, their specifications, the price and whether an operator is needed.",
      },
      {
        title: "Confirm the arrangement and delivery",
        body: "You agree the commercial arrangement and the delivery details directly with Kayan.",
      },
      {
        title: "Coordinate the rental and support",
        body: "The equipment goes to work. Kayan coordinates the rental and any technical support that has been agreed.",
      },
    ],
    modelsHeading: "Short-term or long-term",
    compare: {
      caption: "Comparison of Kayan's two rental arrangements",
      aspect: "",
      short: "Short-term rental",
      long: "Long-term contract",
      rows: [
        { label: "Best for", short: "Urgent needs, a single phase, covering a gap", long: "Projects that run for many months or years" },
        { label: "Period", short: "Days, weeks or months", long: "Up to annual and multi-year agreements" },
        { label: "Operators", short: "Available on request", long: "Available on request" },
        { label: "Terms", short: "Agreed per request", long: "Built around the project programme" },
      ],
    },
    prepareHeading: "What to have ready",
    prepare: [
      "The equipment category, or a description of the job",
      "Site location and access",
      "Expected start date and rental period",
      "Loads, heights or volumes involved, if known",
      "Whether you need an operator",
      "Your name, company and how to reach you",
    ],
  },

  faq: {
    title: "Frequently asked questions",
    lead: "Short answers to the questions customers ask most. For anything specific to your project, contact Kayan directly.",
    items: [
      {
        q: "Which equipment can I rent from Kayan?",
        a: "Nine categories: excavators, bulldozers, dump trucks, rollers, cranes, forklifts, clarks, manlifts and scissor lifts, in various capacities.",
      },
      {
        q: "How do short-term and long-term rentals differ?",
        a: "Short-term rental covers urgent needs or a single phase of work, by the day, week or month. Long-term contracts suit projects that run for many months or years, with terms built around the programme.",
      },
      {
        q: "What should I include in a quote request?",
        a: "The equipment category or the job, the site location, the expected start date and rental period, any loads or heights involved, whether you need an operator, and how to contact you.",
      },
      {
        q: "Can I rent equipment with an operator?",
        a: "Yes. Experienced operators are available as an option. Mention it in your request and Kayan will include it in the quotation.",
      },
      {
        q: "How do I confirm that a machine is available?",
        a: "Availability changes daily, so it is confirmed for each request. Send your dates and location and Kayan will tell you which units can be supplied.",
      },
      {
        q: "Which project locations do you cover?",
        a: "Kayan is based in Cairo and works on projects in Egypt, from Greater Cairo to the north coast. Tell us where your site is and we will confirm what is possible.",
      },
      {
        q: "How do I reach Kayan for technical support?",
        a: "Call either Kayan number or email us, and give the rental details and the problem. Our technical team handles maintenance and repairs on rented equipment.",
      },
    ],
  },

  contact: {
    titleLines: ["Request", "a quote"],
    lead: "Tell us what the site needs. Kayan will reply with availability and a price, or call you to talk it through.",
    directHeading: "Contact Kayan directly",
    phones: "Phone",
    emailLabel: "Email",
    address: "Office",
    addressLines: ["27 Shabab El-Mohandseen St.", "Nasr City, Cairo, Egypt"],
    instructions: [
      "For urgent requests, call. For detailed requirements, use the form or email.",
      "Mention the equipment, site location and rental period so we can check availability straight away.",
    ],
    form: {
      heading: "Quotation request",
      required: "Required",
      optional: "optional",
      name: "Your name",
      company: "Company",
      email: "Work email",
      phone: "Phone",
      contactHint: "Give an email or a phone number, or both.",
      equipment: "Equipment category",
      equipmentPlaceholder: "Choose a category",
      equipmentUnsure: "Not sure yet / several",
      location: "Project location",
      duration: "Estimated rental period",
      durationPlaceholder: "Choose a period",
      durations: {
        days: "A few days",
        weeks: "A few weeks",
        months: "Several months",
        year: "A year or more",
      },
      startDate: "Expected start date",
      operator: "I need an operator",
      message: "Project description and requirements",
      messageHint: "The job, loads or heights involved, site access, anything we should know.",
      preferred: "Preferred contact method",
      preferredOptions: { phone: "Phone call", email: "Email", whatsapp: "WhatsApp" },
      consent: "Kayan may use these details to respond to this request.",
      submit: "Send request",
      sending: "Sending…",
      errors: {
        summary: "Please correct the highlighted fields.",
        name: "Enter your name.",
        contact: "Enter an email address or a phone number.",
        email: "Enter a valid email address.",
        phone: "Enter a valid phone number.",
        equipment: "Choose an equipment category.",
        location: "Enter the project location.",
        duration: "Choose a rental period.",
        message: "Describe the project in at least 20 characters.",
        tooLong: "This is too long.",
        startDate: "Enter a valid date.",
      },
      success: {
        title: "Request sent",
        body: "Thank you. Kayan has received your request and will contact you using the details you gave.",
        another: "Send another request",
      },
      unavailable: {
        title: "Online sending is not available right now",
        body: "Your request has not been sent. Use one of these instead. Your details are already filled in:",
      },
      failure: {
        title: "Something went wrong",
        body: "Your request could not be sent. Please try again, or contact Kayan directly:",
      },
      rateLimited: "Too many requests in a short time. Please wait a minute and try again.",
      emailInstead: "Send by email",
      whatsappInstead: "Send on WhatsApp",
      callInstead: "Call Kayan",
      summarySubject: "Equipment rental quote request",
      yes: "Yes",
    },
  },

  footer: {
    statement: "Heavy equipment rental and general supplies for projects across Egypt.",
    contactTitle: "Contact",
    navTitle: "Pages",
    equipmentTitle: "Equipment",
    officeTitle: "Office",
    legal: "© {year} Kayan Equipment Rental. All rights reserved.",
    imageCredit: "Project and site photography from Kayan's company portfolio. Equipment and industry photographs and the home page video are licensed stock (Pexels), shown for illustration only: they do not show Kayan's own fleet or projects.",
  },

  notFound: {
    title: "Page not found",
    body: "The page you were looking for has moved or does not exist.",
    back: "Back to the home page",
  },
};

export default en;
export type Dictionary = typeof en;
