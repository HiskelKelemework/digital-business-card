export const card = {
  person: {
    // TODO(Hiskel): confirm the exact spelling/order of your name.
    name: "Hiskel Kelemework",
    shortName: "Hiskel",
    firstName: "Hiskel",
    lastName: "Kelemework",
    // TODO(Hiskel): set your role and (optional) company/brand name.
    role: "Developer / Streamer",
    company: "",
    location: "Addis Ababa, Ethiopia",
    bio: "Back End Developer | BSc in Software Engineering",
    photo: "/hiskel-face.jpg",
  },
  // TODO(Hiskel): fill in your contact details below.
  email: "",
  phone: "",
  phoneDisplay: "",
  website: "",
  websiteDisplay: "",
  whatsapp: "",
  linkedin: "",
  steam: "",
  telegramGroup: {
    url: "https://t.me/hiskel_programming_streams",
    label: "Join the Telegram group",
  },
  youtube: {
    url: "https://youtube.com/@hiskel_kelemework",
    label: "Watch on YouTube",
  },
  tiply: {
    url: "https://www.tiply.et/hiskel",
    label: "Support on Tiply",
  },
  tiktok: {
    url: "https://www.tiktok.com/@hiskel_kelemework",
    label: "Watch on TikTok",
  },
  // TODO(Hiskel): edit/add to this list freely — it's just plain strings.
  stack: ["Node.js", "TypeScript", "PostgreSQL", "Docker"],
  // TODO(Hiskel): add more projects the same way — href must be a GitHub repo
  // URL for the star count to load automatically.
  projects: [
    {
      name: "Lox Interpreter (Odin)",
      description: "A Lox language interpreter implemented in Odin.",
      href: "https://github.com/HiskelKelemework/lox-interpreter-odin",
    },
  ],
  booking: {
    // TODO(Hiskel): add your own cal.com link here, e.g. "your-username/30min",
    // plus the full https://cal.com/... URL below. Get one free at https://cal.com.
    calLink: "",
    url: "",
    label: "Book a call",
  },
  smsIntro: "Hi Hiskel — we met on {when}. Great to connect; I'd like to stay in touch.",
  fileStem: "hiskel",
  // TODO(Hiskel): set this once the card is deployed (e.g. on Vercel).
  siteUrl: "",
  contactPath: "/contact.vcf",
} as const;
