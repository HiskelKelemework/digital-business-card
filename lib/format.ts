const E164 = /^\+[1-9]\d{6,14}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isE164(phone: string) {
  return E164.test(phone);
}

export function isEmail(value: string) {
  return EMAIL.test(value) && !/[\r\n]/.test(value);
}

export function safeHttpsUrl(raw: string) {
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return "";
    return url.href;
  } catch {
    return "";
  }
}

const CAL_SLUG = /^[A-Za-z0-9][A-Za-z0-9._/-]{0,120}$/;

/** Slug for the Cal.com embed (`username/event`). Accepts that slug or a full https://cal.com URL. */
export function calEmbedLink(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:") return "";
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    if (host !== "cal.com" && host !== "app.cal.com") return "";
    const slug = url.pathname.replace(/^\/+|\/+$/g, "");
    return CAL_SLUG.test(slug) ? slug : "";
  } catch {
    return CAL_SLUG.test(trimmed) ? trimmed : "";
  }
}

export function isCalLink(value: string) {
  return calEmbedLink(value) !== "";
}

export function isWhatsAppUrl(raw: string) {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && url.hostname === "wa.me";
  } catch {
    return false;
  }
}

export function isSteamUrl(raw: string) {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && /(^|\.)steamcommunity\.com$/.test(url.hostname);
  } catch {
    return false;
  }
}

export function isTelegramUrl(raw: string) {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && /(^|\.)t\.me$/.test(url.hostname);
  } catch {
    return false;
  }
}

export function isYouTubeUrl(raw: string) {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && /(^|\.)youtube\.com$/.test(url.hostname);
  } catch {
    return false;
  }
}

export function isTiplyUrl(raw: string) {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && /(^|\.)tiply\.et$/.test(url.hostname);
  } catch {
    return false;
  }
}

export function githubRepoFromUrl(raw: string) {
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" || !/(^|\.)github\.com$/.test(url.hostname)) return "";
    const [owner, repo] = url.pathname.replace(/^\/+/, "").split("/");
    return owner && repo ? `${owner}/${repo.replace(/\.git$/, "")}` : "";
  } catch {
    return "";
  }
}

export function isTikTokUrl(raw: string) {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && /(^|\.)tiktok\.com$/.test(url.hostname);
  } catch {
    return false;
  }
}

export function safeFilename(stem: string) {
  return stem.replace(/[^A-Za-z0-9._-]/g, "").slice(0, 64) || "download";
}

export function vcardFilename(stem: string) {
  return `${safeFilename(stem)}.vcf`;
}

export function escapeVcard(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\r|\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

export function formatMeetTime(now = new Date()) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);
}

export function fillIntro(template: string, when: string) {
  return template.replace("{when}", when);
}

export function smsHref(phone: string, body: string, userAgent = "") {
  if (!isE164(phone)) return "";
  const ios = /iPad|iPhone|iPod/.test(userAgent);
  const encoded = encodeURIComponent(body.slice(0, 500));
  return ios ? `sms:${phone}&body=${encoded}` : `sms:${phone}?body=${encoded}`;
}
