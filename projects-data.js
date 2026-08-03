/* ============================================================
   Project case-study content.
   NOTE for editing: links (demo/github), some stats and the
   tech lists are sensible defaults — update them with your real
   repo links / numbers anytime. Order controls prev/next nav.
   ============================================================ */
window.PROJECTS = {
  "event-management": {
    title: "Event Management App",
    subtitle: "Mobile App Design",
    type: "mobile",
    badge: "Featured Project",
    hero: "projects/event_management.jpg",
    description: "A mobile app to discover, plan and vote on events — browse a shared calendar, filter by city and category, save favourites and add events straight to your personal calendar.",
    tags: ["Flutter", "Firebase", "Calendar"],
    links: { demo: "#", github: "", pdf: "" },
    meta: { role: "Solo Developer", duration: "6 Weeks", platform: "Android", status: "Completed", release: "2025" },
    problem: [
      "People rely on scattered group chats and messages to plan events, so it's hard to keep track of what's happening and when.",
      "Most calendar apps are personal — they don't support shared discovery or letting a community vote on upcoming events."
    ],
    solution: {
      intro: "I built an event app that brings discovery, planning and voting into one place, with a clean shared calendar at its core.",
      points: ["Shared event calendar with month & list views", "Vote on event ideas and save favourites", "Filter by city, category and group", "One-tap add to your personal calendar"]
    },
    features: [
      { t: "Event Calendar", d: "Browse events in month or list view with quick details." },
      { t: "Vote & Favourite", d: "Vote on upcoming ideas and save the ones you like." },
      { t: "Smart Filters", d: "Filter events by city, state, category and group." },
      { t: "Community Groups", d: "Follow groups and see what they're planning next." },
      { t: "Add to Calendar", d: "Add any event to your personal calendar in one tap." },
      { t: "Real-time Sync", d: "Events and votes stay in sync across devices." }
    ],
    shots: [
      { img: "projects/shots/event-1.jpg", label: "Onboarding" },
      { img: "projects/shots/event-2.jpg", label: "Calendar" },
      { img: "projects/shots/event-3.jpg", label: "Features" },
      { img: "projects/shots/event-4.jpg", label: "Dark Mode" }
    ],
    stack: ["Flutter", "Dart", "Firebase", "Firestore", "Provider"],
    highlights: ["Month & list calendar views", "City / category filtering", "Favourites & voting", "Light & dark themes"],
    challenges: [
      { c: "Keeping shared events and votes in sync in real time.", s: "Used Firestore real-time listeners with optimistic UI updates so changes appear instantly." },
      { c: "Making a dense calendar feel light on a small screen.", s: "Designed month and list views with progressive disclosure so details only appear on demand." }
    ],
    process: ["Research", "Wireframing", "UI Design", "Development", "Testing", "Release"],
    results: [{ n: "10+", l: "Screens" }, { n: "8+", l: "Features" }, { n: "Android", l: "Platform" }, { n: "6", l: "Weeks" }]
  },

  "newzler": {
    title: "Newzler",
    subtitle: "News Application",
    type: "mobile",
    badge: "Featured Project",
    hero: "projects/newzler.jpg",
    description: "A personalised news reader — trending headlines, a tailored “My News” feed, topic categories, in-app video and search, with language preferences you control.",
    tags: ["React Native", "News API", "Personalization"],
    links: { demo: "#", github: "", pdf: "" },
    meta: { role: "Solo Developer", duration: "4 Weeks", platform: "Android & iOS", status: "Completed", release: "2025" },
    problem: [
      "News apps overwhelm users with everything at once instead of what they actually care about.",
      "Readers want control over their topics and language without digging through cluttered settings."
    ],
    solution: {
      intro: "Newzler puts a personalised feed first — you choose your topics and language, and the app curates the rest.",
      points: ["Personalised “My News” feed", "Trending headlines and categories", "In-app article video and search", "Topic & language preferences"]
    },
    features: [
      { t: "My News Feed", d: "A tailored feed based on your chosen topics." },
      { t: "Trending", d: "See what's trending right now across categories." },
      { t: "Categories", d: "Browse by topic — world, sports, business and more." },
      { t: "In-app Video", d: "Watch news clips without leaving the app." },
      { t: "Search", d: "Find any story fast with full-text search." },
      { t: "Languages", d: "Read the news in your preferred language." }
    ],
    shots: [
      { img: "projects/shots/newzler-1.jpg", label: "Onboarding" },
      { img: "projects/shots/newzler-2.jpg", label: "Preferences" },
      { img: "projects/shots/newzler-3.jpg", label: "News Feed" },
      { img: "projects/shots/newzler-4.jpg", label: "Account" }
    ],
    stack: ["React Native", "JavaScript", "News API", "Async Storage"],
    highlights: ["Personalised feed", "Trending & categories", "In-app video & search", "Language preferences"],
    challenges: [
      { c: "Delivering a relevant feed from a generic news API.", s: "Built a topic-weighting layer that filters and ranks articles by the user's selected interests." },
      { c: "Smooth scrolling with image-heavy article lists.", s: "Added list virtualisation and lazy image loading to keep the feed at 60fps." }
    ],
    process: ["Research", "Wireframing", "UI Design", "Development", "Testing", "Release"],
    results: [{ n: "12+", l: "Screens" }, { n: "8+", l: "Features" }, { n: "Cross", l: "Platform" }, { n: "4", l: "Weeks" }]
  },

  "karyana-store": {
    title: "Karyana Store",
    subtitle: "E-Commerce Platform",
    type: "mobile",
    badge: "Featured Project",
    hero: "projects/karyana_store.jpg",
    description: "An online grocery (karyana) store — browse spices, grains and pulses by category, place bulk orders, manage favourites and check out, all priced in PKR.",
    tags: ["Flutter", "Payments", "E-Commerce"],
    links: { demo: "#", github: "", pdf: "" },
    meta: { role: "Solo Developer", duration: "5 Weeks", platform: "Android", status: "Completed", release: "2025" },
    problem: [
      "Local grocery shopping is time-consuming, and small kiryana stores rarely have a simple online presence.",
      "Buyers need bulk ordering and clear pricing that most generic store apps don't handle well."
    ],
    solution: {
      intro: "Karyana Store brings a neighbourhood grocery online with category browsing, bulk orders and a smooth checkout.",
      points: ["Category browsing — spices, grains, pulses & more", "Bulk order option on every product", "Favourites and cart management", "Clear PKR pricing with stock info"]
    },
    features: [
      { t: "Catalog", d: "Browse products by category with search." },
      { t: "Bulk Orders", d: "Order in bulk directly from any product card." },
      { t: "Cart & Checkout", d: "Add to cart and check out in a few taps." },
      { t: "Favourites", d: "Save products you buy often for quick reorder." },
      { t: "Profile", d: "Manage your account, address and order details." },
      { t: "Stock Info", d: "See live stock and pricing before you buy." }
    ],
    shots: [
      { img: "projects/shots/karyana-1.jpg", label: "Home" },
      { img: "projects/shots/karyana-2.jpg", label: "Catalog" },
      { img: "projects/shots/karyana-3.jpg", label: "Products" },
      { img: "projects/shots/karyana-4.jpg", label: "Favourites" }
    ],
    stack: ["Flutter", "Dart", "Firebase", "Payments", "Provider"],
    highlights: ["Category catalog", "Bulk ordering", "Cart & favourites", "PKR pricing & stock"],
    challenges: [
      { c: "Supporting both single and bulk purchases cleanly.", s: "Designed a flexible cart model where each line item carries its own quantity and pricing tier." },
      { c: "Keeping the catalog fast with many product images.", s: "Cached images and paginated the catalog so browsing stays snappy." }
    ],
    process: ["Research", "Wireframing", "UI Design", "Development", "Testing", "Release"],
    results: [{ n: "12+", l: "Screens" }, { n: "10+", l: "Features" }, { n: "Android", l: "Platform" }, { n: "5", l: "Weeks" }]
  },

  "nova-cinema": {
    title: "Nova Cinema",
    subtitle: "Movie Streaming Platform",
    type: "web",
    badge: "Featured Project",
    hero: "projects/nova_cinema.jpg",
    description: "A movie-streaming web platform with a Netflix-style browse experience — trending rows, rich detail pages, search, watch-time stats and a full account dashboard.",
    tags: ["React", "Node", "MongoDB"],
    links: { demo: "#", github: "", pdf: "" },
    meta: { role: "Solo Developer", duration: "8 Weeks", platform: "Web", status: "Completed", release: "2025" },
    problem: [
      "Building a streaming experience means handling discovery, search and user accounts together — not just a list of videos.",
      "Users expect a polished, fast browse experience with personalised stats and watchlists."
    ],
    solution: {
      intro: "Nova Cinema delivers a complete streaming front-end backed by a full Node/Mongo API, with browse, search and account management.",
      points: ["Trending rows & rich detail pages", "Search across the full catalog", "Watch-time stats & personal lists", "Account dashboard and admin tools"]
    },
    features: [
      { t: "Browse", d: "Trending, must-watch and genre rows on the home page." },
      { t: "Search", d: "Find any title by name, people or genre." },
      { t: "Detail Pages", d: "Rich pages with play, trailer and info." },
      { t: "Dashboard", d: "Track movies watched, watch time and lists." },
      { t: "Plans", d: "Tiered subscription plans for members." },
      { t: "Admin Tools", d: "Manage the catalog and content from an admin area." }
    ],
    shots: [
      { img: "projects/shots/nova-1.jpg", label: "Landing" },
      { img: "projects/shots/nova-2.jpg", label: "Plans" },
      { img: "projects/shots/nova-3.jpg", label: "Browse" },
      { img: "projects/shots/nova-4.jpg", label: "Detail" }
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "REST API"],
    highlights: ["Netflix-style browse", "Full-text search", "Account dashboard", "Admin content tools"],
    challenges: [
      { c: "Serving a fast, poster-heavy browse experience.", s: "Lazy-loaded rows and optimised images so the home page stays quick even with many titles." },
      { c: "Managing catalog data and user accounts together.", s: "Built a structured MongoDB schema with a clean REST API separating content and account concerns." }
    ],
    process: ["Research", "Wireframing", "UI Design", "Development", "Testing", "Deployment"],
    results: [{ n: "15+", l: "Screens" }, { n: "12+", l: "Features" }, { n: "100%", l: "Responsive" }, { n: "8", l: "Weeks" }]
  },

  "finance-tracker": {
    title: "Finance Tracker",
    subtitle: "Personal Finance Dashboard",
    type: "web",
    badge: "Featured Project",
    hero: "projects/finance_tracker.jpg",
    description: "A personal finance dashboard to track income, expenses, budgets and savings goals — with categories, beautiful charts and clear monthly reports.",
    tags: ["Web App", "Charts", "Dashboard"],
    links: { demo: "#", github: "", pdf: "" },
    meta: { role: "Solo Developer", duration: "2 Months", platform: "Web", status: "Completed", release: "2025" },
    problem: [
      "Many people find it hard to track daily expenses and manage budgets effectively.",
      "Existing apps are often too complicated, full of ads, or lock basic features behind a subscription."
    ],
    solution: {
      intro: "Finance Tracker is a simple yet powerful dashboard that helps users track money, set budgets and visualise spending with clean analytics.",
      points: ["Easy tracking of income & expenses", "Budget management with alerts", "Insightful charts and reports", "Savings goals & emergency fund"]
    },
    features: [
      { t: "Transactions", d: "Add, edit and delete income and expenses easily." },
      { t: "Budgets", d: "Set monthly budgets and get alerts near your limit." },
      { t: "Categories", d: "Organise transactions into categories for insight." },
      { t: "Reports", d: "Visualise spending patterns with charts and reports." },
      { t: "Savings Goals", d: "Set goals and track progress toward them." },
      { t: "Dashboard", d: "See balance, income, expenses and net savings at a glance." }
    ],
    shots: [
      { img: "projects/shots/finance-1.jpg", label: "Dashboard" },
      { img: "projects/shots/finance-2.jpg", label: "Goals" },
      { img: "projects/shots/finance-3.jpg", label: "Categories" },
      { img: "projects/shots/finance-4.jpg", label: "Reports" }
    ],
    stack: ["JavaScript", "Charts", "REST API", "Local Storage"],
    highlights: ["Income & expense tracking", "Budgets with alerts", "Charts & reports", "Savings goals"],
    challenges: [
      { c: "Keeping transactions and monthly summaries consistent.", s: "Centralised the transaction logic so totals, budgets and charts always recompute from one source of truth." },
      { c: "Presenting dense financial data clearly.", s: "Used a card-based dashboard with focused charts so the most important numbers stand out first." }
    ],
    process: ["Research", "Wireframing", "UI Design", "Development", "Testing", "Deployment"],
    results: [{ n: "12+", l: "Screens" }, { n: "10+", l: "Features" }, { n: "100%", l: "Responsive" }, { n: "2", l: "Months" }]
  }
};
window.PROJECT_ORDER = ["event-management", "newzler", "karyana-store", "nova-cinema", "finance-tracker"];
