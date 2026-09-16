import type { StackId } from "./stack";

export const card = {
  person: {
    name: "Hiskel Kelemework",
    shortName: "Hiskel",
    firstName: "Hiskel",
    lastName: "Kelemework",
    role: "Developer / Streamer",
    company: "Byteland Software Solutions PLC",
    location: "Addis Ababa, Ethiopia",
    bio: "Back End Developer | BSc in Software Engineering",
    photo: "/hiskel-face.png",
  },
  email: "hiskelatnafu@gmail.com",
  phone: "",
  phoneDisplay: "",
  website: "",
  websiteDisplay: "",
  whatsapp: "",
  linkedin: "",
  steam: "",
  telegram: "",
  telegramGroup: {
    url: "https://t.me/hiskel_programming_streams",
    label: "Join the Telegram group",
  },
  youtube: {
    url: "https://youtube.com/@hiskel_kelemework",
    label: "Watch on YouTube",
  },
  yefam: {
    url: "https://yefam.app/hiskel",
    label: "Support on Yefam",
  },
  yenetts: {
    url: "https://yenetts.com/streamer/hiskel_kelemework",
    label: "Support on Yenetts",
  },
  tiply: {
    url: "https://www.tiply.et/hiskel",
    label: "Support on Tiply",
  },
  tiktok: {
    url: "https://www.tiktok.com/@hiskel_kelemework",
    label: "Watch on TikTok",
  },
  stack: [
    "nodejs",
    "typescript",
    "postgresql",
    "docker",
    "odin",
    "rust",
  ] as StackId[],
  // URL for the star count to load automatically.
  projects: [
    {
      name: "Http Server (Odin)",
      description: "An Http server for odin written from scratch",
      href: "https://github.com/HiskelKelemework/http-server-odin",
    },
    {
      name: "Lox Interpreter (Odin)",
      description: "A Lox language interpreter implemented in Odin.",
      href: "https://github.com/HiskelKelemework/lox-interpreter-odin",
    },
  ],
  booking: {
    calLink: "https://cal.com/hiskel/15min",
    url: "https://cal.com/hiskel",
    label: "Book a call",
  },
  smsIntro:
    "Hi Hiskel — we met on {when}. Great to connect; I'd like to stay in touch.",
  fileStem: "hiskel",
  siteUrl: "",
  contactPath: "/contact.vcf",
} as const;
