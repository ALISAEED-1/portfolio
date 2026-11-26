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
    github: "https://github.com/ALISAEED-1/Event-Management-Mobile-Application",
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
    github: "https://github.com/ALISAEED-1/NewzlerApp",
    description: "A personalised news reader — trending headlines, a tailored “My News” feed, topic categories, in-app video and search, with language preferences you control.",
    tags: ["Flutter", "News API", "Personalization"],
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
    stack: ["Flutter", "Dart", "News API"],
    highlights: ["Personalised feed", "Trending & categories", "In-app video & search", "Language preferences"],
    challenges: [
      { c: "Delivering a relevant feed from a generic news API.", s: "Built a topic-weighting layer that filters and ranks articles by the user's selected interests." },
      { c: "Smooth scrolling with image-heavy article lists.", s: "Built the feed with lazily-built lists and lazy image loading to keep scrolling smooth at 60fps." }
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
    github: "https://github.com/ALISAEED-1/Karyana-Store",
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
  }
  ,
  "finora": {
    title: "Finora",
    subtitle: "Personal Finance App",
    type: "mobile",
    hero: "projects/shots/finora-1.webp",
    github: "https://github.com/ALISAEED-1/finora",
    description: "A production-grade personal finance app built solo in Flutter and Firebase — accounts, budgets, bills, loans, goals and receipt scanning, written as though it were shipping.",
    tags: ["Flutter", "Firebase", "Riverpod"],
    metaList: [["Role", "Solo developer"], ["Codebase", "25k lines · 137 files"], ["Tests", "326 automated"], ["Build", "Signed Android release"]],
    problem: [
      "Most finance apps get money maths quietly wrong — floating-point amounts, currencies treated as if they all have cents, and half-finished writes.",
      "If a failure lands between two writes, a payment can be recorded while the bill still looks unpaid — so the user pays twice."
    ],
    solution: {
      intro: "Finora treats money like money: integer amounts, one atomic write per money movement, and features that keep working offline.",
      points: ["Integer money that respects each currency's decimals", "Bills, loans and budgets updated in one atomic batch", "On-device receipt scanning with ML Kit — no keys, works offline", "Bill reminders scheduled on the phone — no server needed"]
    },
    features: [
      { t: "Accounts & transactions", d: "Every expense and income, with balances that always add up." },
      { t: "Budgets", d: "Count what you assign to a budget, not just what you tag." },
      { t: "Bills & reminders", d: "Due dates and local reminders that survive reboots." },
      { t: "Loans", d: "Lent or borrowed, split across principal and interest." },
      { t: "Goals", d: "Savings goals with contributions and progress." },
      { t: "Receipts & reports", d: "Scan receipts on-device and read clear insights." }
    ],
    artShots: true,
    shots: [
      { img: "projects/shots/finora-1.webp", label: "Balance overview" },
      { img: "projects/shots/finora-2.webp", label: "Budgets & goals" },
      { img: "projects/shots/finora-3.webp", label: "Insights" }
    ],
    stack: ["Flutter", "Dart", "Firebase", "Firestore", "Riverpod", "go_router", "ML Kit", "App Check"],
    challenges: [
      { c: "A Rs. 810 bill showed up as Rs. 8.10.", s: "PKR has no subunit. Every conversion now goes through a Money type that asks the currency how many decimals it really has." },
      { c: "Release builds silently deleted the notification icon.", s: "The shrinker saw no reference to an icon named only from Dart. Confirmed by dumping the built APK, kept explicitly, and covered by a test." },
      { c: "R8 broke reminder persistence — every alarm would vanish after a reboot.", s: "Traced a Gson TypeToken failure to R8 dropping generics, and added keep rules so scheduled reminders survive a restart." },
      { c: "A whole screen was unreachable, and nothing logged an error.", s: "Found by tapping it on a real device: the auth guard was missing /intro. Fixed, with a test that reads the guard to keep it fixed." }
    ],
    results: [{ n: "25k", l: "Lines of Dart" }, { n: "326", l: "Tests" }, { n: "137", l: "Files" }, { n: "Signed", l: "Release build" }]
  },

  "you2art": {
    title: "You2Art",
    subtitle: "Creator & Casting Platform",
    type: "mobile",
    hero: "projects/shots/you2art-1.jpg",
    github: "https://github.com/ALISAEED-1/you2art_redesign",
    description: "A Flutter social network for the entertainment industry — artists show their work, productions post casting calls, and people connect and chat in real time. Backed by Supabase.",
    tags: ["Flutter", "Supabase", "Social"],
    metaList: [["Role", "Flutter developer"], ["Backend", "Supabase"], ["Sign-in", "Phone OTP"], ["Platform", "Mobile"]],
    problem: [
      "Actors, crews and productions find each other through scattered posts and personal contacts.",
      "Artists need a profile that shows their work properly — photos and video, not just a CV."
    ],
    solution: {
      intro: "You2Art puts the whole loop in one app: a feed, profiles, casting calls, talent search and chat.",
      points: ["Phone-OTP sign-in with a custom keypad", "Casting calls you can browse and apply to", "Talent search and connections", "Real-time chat and notifications", "Swipeable photo and video galleries"]
    },
    features: [
      { t: "Feed", d: "Share photo and text posts with your network." },
      { t: "Casting calls", d: "Browse roles by location, type and budget — and apply." },
      { t: "Profiles", d: "Connections, posts, activity and your work in one place." },
      { t: "Talent search", d: "Find the right people for a production." },
      { t: "Chat", d: "Real-time messaging between connections." },
      { t: "Notifications", d: "Know when someone applies, connects or replies." }
    ],
    shots: [
      { img: "projects/shots/you2art-1.jpg", label: "Home feed" },
      { img: "projects/shots/you2art-2.jpg", label: "Casting calls" },
      { img: "projects/shots/you2art-3.jpg", label: "Profile" }
    ],
    stack: ["Flutter", "Dart", "Supabase", "Realtime", "Phone OTP"]
  },

  "agri-expert": {
    title: "Agri Expert",
    subtitle: "Farmer–Expert Platform",
    type: "mobile",
    hero: "projects/shots/agri-2.jpg",
    github: "https://github.com/ALISAEED-1/agri-expert",
    description: "A Flutter app connecting farmers with agricultural experts — ask questions with photos, get expert answers, learn from training videos and chat, in English or Urdu. Backed by Supabase.",
    tags: ["Flutter", "Supabase", "AgriTech"],
    metaList: [["Role", "Flutter developer"], ["Backend", "Supabase"], ["Languages", "English · Urdu"], ["Platform", "Android"]],
    problem: [
      "Farmers lose money to middlemen and wait too long for expert advice.",
      "Practical know-how — like how to start a tractor — is hard to find in their own language."
    ],
    solution: {
      intro: "Agri Expert gives farmers a direct line to experts and a library to learn from.",
      points: ["Questions with photos, answered by experts", "Pending vs. answered tracking", "A training video library", "Real-time chat", "Urdu support"]
    },
    features: [
      { t: "Expert Q&A", d: "Farmers ask with photos; experts answer in the app." },
      { t: "Training videos", d: "Short how-to videos, with views and comments." },
      { t: "Expert dashboard", d: "Questions, answers, views and videos at a glance." },
      { t: "Chat", d: "Direct, real-time conversations." },
      { t: "Ratings & reviews", d: "Farmers rate the experts who helped them." },
      { t: "Onboarding", d: "A clear intro, available in Urdu too." }
    ],
    shots: [
      { img: "projects/shots/agri-2.jpg", label: "Questions" },
      { img: "projects/shots/agri-3.jpg", label: "Training videos" },
      { img: "projects/shots/agri-4.jpg", label: "Dashboard" },
      { img: "projects/shots/agri-1.jpg", label: "Onboarding" }
    ],
    stack: ["Flutter", "Dart", "Supabase", "Realtime chat"]
  },

  "nova-cinema": {
    title: "Nova Cinema",
    subtitle: "Streaming App + Payments Backend",
    type: "mobile",
    hero: "projects/shots/nova-art-1.jpg",
    github: "https://github.com/ALISAEED-1/Nova-Cinema-App",
    github2: { label: "nova-pay backend", url: "https://github.com/ALISAEED-1/nova-pay" },
    description: "A mobile-first Flutter streaming app — catalogue, search, video player and watchlist — backed by nova-pay, its own Node and TypeScript payments service.",
    tags: ["Flutter", "Node.js", "TypeScript", "Postgres"],
    metaList: [["App", "Flutter · provider"], ["Backend", "Node · TypeScript · Postgres"], ["Payments", "Stripe (test) + mock provider"], ["Currencies", "USD · EUR · PKR · INR · BDT"]],
    problem: [
      "Payment flows break in quiet ways: a double-tap charges twice, or a late webhook locks out someone who already paid.",
      "Pricing has to work in five currencies — and with wallets like JazzCash that can't be charged automatically."
    ],
    solution: {
      intro: "The app never touches card details or decides who has paid. nova-pay does — and only after the provider confirms.",
      points: ["Idempotency keys, so retries never double-charge", "Signed webhooks that ignore duplicates and out-of-order events", "Plans, 48-hour rentals and regional pricing", "Renewals, retries and a 7-day grace period"]
    },
    features: [
      { t: "Catalogue & search", d: "Browse and search the full title catalogue." },
      { t: "Video player", d: "Native playback with saved progress." },
      { t: "Watchlist", d: "Save titles and pick up where you left off." },
      { t: "Plans", d: "Subscriptions priced in the viewer's currency." },
      { t: "48-hour rentals", d: "Rent a single title without a plan." },
      { t: "Manage plan", d: "Pay now, cancel, resume and billing history." }
    ],
    artShots: true,
    shots: [
      { img: "projects/shots/nova-art-1.jpg", label: "Onboarding" },
      { img: "projects/shots/nova-art-2.jpg", label: "Onboarding" },
      { img: "projects/shots/nova-art-3.jpg", label: "Onboarding" }
    ],
    stack: ["Flutter", "provider", "video_player", "webview_flutter", "Node.js", "TypeScript", "Postgres", "Stripe"],
    challenges: [
      { c: "A late or missing webhook could leave a paying customer locked out.", s: "While a checkout is open, status checks also ask the provider directly — the outcome is applied once, whichever arrives first." },
      { c: "A crash right after charging could charge again on retry.", s: "Every attempt's idempotency key carries its attempt number, so a retried renewal can never double-charge." }
    ],
    results: [{ n: "5", l: "Currencies" }, { n: "48h", l: "Rentals" }, { n: "7-day", l: "Grace period" }, { n: "0", l: "Card details in the app" }]
  }
};
window.PROJECT_ORDER = ["finora", "event-management", "you2art", "newzler", "karyana-store", "agri-expert", "nova-cinema"];
