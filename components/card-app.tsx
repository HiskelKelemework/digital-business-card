"use client";

import { ArrowUpRight, Calendar, Download, ImageDown, Mail, MapPin, Phone, UserPlus } from "lucide-react";
import { useRef, useState } from "react";
import { BookingEmbed } from "@/components/booking-embed";
import {
  LinkedInIcon,
  SteamIcon,
  TelegramIcon,
  TikTokIcon,
  TiplyIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/icons";
import { ProjectsSection } from "@/components/projects-section";
import { captureCardPng, ShareCardFace } from "@/components/share-card";
import { ShareLinks } from "@/components/share-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tile, TileLabel } from "@/components/tile";
import { card } from "@/lib/card";
import {
  isCalLink,
  isE164,
  isEmail,
  isSteamUrl,
  isTelegramUrl,
  isTikTokUrl,
  isTiplyUrl,
  isWhatsAppUrl,
  isYouTubeUrl,
  safeFilename,
  safeHttpsUrl,
} from "@/lib/format";
import { exchangeSmsHref } from "@/lib/sms";
import { downloadVcard } from "@/lib/vcard";

const phone = isE164(card.phone) ? card.phone : "";
const email = isEmail(card.email) ? card.email : "";
const website = safeHttpsUrl(card.website);
const linkedin = safeHttpsUrl(card.linkedin);
const whatsapp = isWhatsAppUrl(card.whatsapp) ? card.whatsapp : "";
const steam = isSteamUrl(card.steam) ? card.steam : "";
const telegramGroup = isTelegramUrl(card.telegramGroup.url) ? card.telegramGroup.url : "";
const youtube = isYouTubeUrl(card.youtube.url) ? card.youtube.url : "";
const tiply = isTiplyUrl(card.tiply.url) ? card.tiply.url : "";
const tiktok = isTikTokUrl(card.tiktok.url) ? card.tiktok.url : "";
type Channel = { href: string; label: string; icon: React.ReactNode };
const channelCandidates: (Channel | null)[] = [
  telegramGroup ? { href: telegramGroup, label: card.telegramGroup.label, icon: <TelegramIcon className="size-4" /> } : null,
  youtube ? { href: youtube, label: card.youtube.label, icon: <YouTubeIcon className="size-4" /> } : null,
  tiktok ? { href: tiktok, label: card.tiktok.label, icon: <TikTokIcon className="size-4" /> } : null,
  tiply ? { href: tiply, label: card.tiply.label, icon: <TiplyIcon className="size-4" /> } : null,
];
const channels: Channel[] = channelCandidates.filter((item): item is Channel => item !== null);

const company = card.person.company;
const roleLine = [card.person.role, company].filter(Boolean).join(" at ");

export function CardApp() {
  const faceRef = useRef<HTMLDivElement>(null);
  const [cardReady, setCardReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveHint, setSaveHint] = useState<string | null>(null);

  async function saveCardImage() {
    const node = faceRef.current;
    if (!node || saving) return;
    setSaving(true);
    setSaveHint(null);
    try {
      const blob = await captureCardPng(node);
      if (!blob) throw new Error("Could not render card");
      const file = new File([blob], `${safeFilename(card.fileStem)}-card.png`, { type: "image/png" });
      const canShare = typeof navigator.canShare === "function" && navigator.canShare({ files: [file] });
      if (canShare) {
        await navigator.share({ files: [file], title: [card.person.name, company].filter(Boolean).join(" · ") });
        setSaveHint("Use Save Image in the share sheet to keep it in your gallery.");
      } else {
        const href = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = href;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(href);
        setSaveHint("Card image downloaded.");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        setSaveHint(null);
      } else {
        setSaveHint("Could not save the image. Try again.");
      }
    } finally {
      setSaving(false);
    }
  }

  function exchangeContact() {
    const href = exchangeSmsHref();
    if (href) window.location.href = href;
  }

  return (
    <div className="relative isolate min-h-full">
      <div className="page-glow" aria-hidden>
        <div className="blob blob-oxide" />
        <div className="blob blob-you" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-md px-4 pb-20 pt-4 sm:max-w-lg md:max-w-3xl">
        <header className="mb-4 flex items-center justify-between px-1">
          <p className="rounded-full bg-ink px-3 py-1 text-xs font-medium text-white">{card.person.shortName}</p>
          <ThemeToggle />
        </header>

        <div className="grid gap-4 md:grid-cols-2 md:items-start">
          <div className="floaty md:col-span-2 md:mx-auto md:max-w-md">
            <Tile tone="ink" className="overflow-hidden p-3">
              <p className="px-2 pt-1 text-[11px] uppercase tracking-[0.22em] text-white/55">
                {[company, card.person.location].filter(Boolean).join(" · ")}
              </p>
              <div className="relative mt-3 overflow-hidden rounded-[1.35rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.person.photo}
                  alt=""
                  className="aspect-[4/5] w-full object-cover saturate-[1.12] contrast-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-oxide/15 to-you/10" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xl font-semibold tracking-tight">{card.person.name}</p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-white/75">{card.person.role}</p>
                </div>
              </div>
              <div className="halftone h-7" />
              <div className="rounded-b-[1.35rem] bg-white px-4 pt-4 pb-4 text-ink">
                <h1 className="text-3xl font-semibold tracking-tight">{card.person.name}</h1>
                {roleLine ? <p className="mt-1 text-sm text-ink/60">{roleLine}</p> : null}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {isCalLink(card.booking.calLink) ? (
                    <a
                      href="#book"
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-white"
                    >
                      Book Now
                      <span className="grid size-7 place-items-center rounded-full bg-white/15">
                        <Calendar className="size-3.5" />
                      </span>
                    </a>
                  ) : email ? (
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-white"
                    >
                      Email
                    </a>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => downloadVcard()}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-oxide px-4 text-sm font-medium text-white"
                  >
                    <Download className="size-4" />
                    Save
                  </button>
                  {phone ? (
                    <button
                      type="button"
                      onClick={exchangeContact}
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-you px-4 text-sm font-medium text-white"
                    >
                      <UserPlus className="size-4" />
                      Exchange
                    </button>
                  ) : null}
                  {telegramGroup ? (
                    <a
                      href={telegramGroup}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={card.telegramGroup.label}
                      className="grid size-11 shrink-0 place-items-center rounded-full border border-border text-ink"
                    >
                      <TelegramIcon className="size-4" />
                    </a>
                  ) : null}
                  {youtube ? (
                    <a
                      href={youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={card.youtube.label}
                      className="grid size-11 shrink-0 place-items-center rounded-full border border-border text-ink"
                    >
                      <YouTubeIcon className="size-4" />
                    </a>
                  ) : null}
                </div>
              </div>
            </Tile>
          </div>

          {channels.length ? (
            <Tile tone="oxide" delay={80} className="tilt-left">
              <TileLabel className="text-white">Channels</TileLabel>
              <p className="mt-2 text-sm font-medium">Where I stream, post, and share.</p>
              <div className="mt-4 grid gap-2">
                {channels.map((channel) => (
                  <a
                    key={channel.href}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    {channel.icon}
                    {channel.label}
                    <ArrowUpRight className="ml-auto size-4 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </Tile>
          ) : null}

          {linkedin || whatsapp || steam ? (
            <Tile tone="you" delay={120} className="tilt-right">
              <TileLabel className="text-white">Social</TileLabel>
              <p className="mt-2 text-sm font-medium">Find me where we already talk.</p>
              <div className="mt-4 flex gap-3">
                {linkedin ? (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="grid size-12 place-items-center rounded-full bg-[#0a66c2] text-white"
                  >
                    <LinkedInIcon className="size-5" />
                  </a>
                ) : null}
                {whatsapp ? (
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="grid size-12 place-items-center rounded-full bg-[#25d366] text-white"
                  >
                    <WhatsAppIcon className="size-5" />
                  </a>
                ) : null}
                {steam ? (
                  <a
                    href={steam}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Steam"
                    className="grid size-12 place-items-center rounded-full bg-[#171a21] text-white"
                  >
                    <SteamIcon className="size-5" />
                  </a>
                ) : null}
              </div>
            </Tile>
          ) : null}

          {isCalLink(card.booking.calLink) ? (
            <Tile tone="mist" delay={160} className="tilt-left">
              <TileLabel>Featured</TileLabel>
              <a
                href="#book"
                className="mt-3 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-medium dark:bg-ink"
              >
                <Calendar className="size-4 text-oxide" />
                {card.booking.label}
                <ArrowUpRight className="ml-auto size-4 opacity-50" />
              </a>
            </Tile>
          ) : null}

          <Tile delay={200} id="card-image">
            <TileLabel>Contact</TileLabel>
            <ul className="mt-2 divide-y divide-border">
              {phone ? (
                <ContactRow href={`tel:${phone}`} icon={<Phone className="size-4" />} label="Mobile" value={card.phoneDisplay} />
              ) : null}
              {email ? (
                <ContactRow href={`mailto:${email}`} icon={<Mail className="size-4" />} label="Email" value={email} />
              ) : null}
              {website ? (
                <ContactRow
                  href={website}
                  icon={<ArrowUpRight className="size-4" />}
                  label="Website"
                  value={card.websiteDisplay}
                  external
                />
              ) : linkedin ? (
                <ContactRow
                  href={linkedin}
                  icon={<LinkedInIcon className="size-4" />}
                  label="LinkedIn"
                  value={linkedin.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  external
                />
              ) : null}
              <ContactRow icon={<MapPin className="size-4" />} label="Location" value={card.person.location} />
              <li>
                <button
                  type="button"
                  onClick={() => void saveCardImage()}
                  disabled={saving || !cardReady}
                  className="flex w-full items-start gap-3 py-3 text-left disabled:opacity-60"
                >
                  <span className="mt-0.5 text-oxide">
                    <ImageDown className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Card image</span>
                    <span className="mt-0.5 block truncate text-sm font-medium">
                      {saving ? "Saving card…" : saveHint || "Save card image"}
                    </span>
                  </span>
                </button>
              </li>
            </ul>
            {/* Rendered off-screen (not display:none/sr-only) so html-to-image can still measure and capture it. */}
            <div aria-hidden className="pointer-events-none fixed top-0 -left-[999em] w-72">
              <ShareCardFace cardRef={faceRef} onReady={setCardReady} />
            </div>
          </Tile>

          <Tile tone="oxide" delay={240} className="tilt-right">
            <TileLabel className="text-white">Bio</TileLabel>
            <p className="mt-3 text-sm leading-relaxed text-white/95">{card.person.bio}</p>
          </Tile>

          {card.stack.length ? (
            <Tile delay={260} className="tilt-left">
              <TileLabel>Stack</TileLabel>
              <p className="mt-2 text-sm text-muted-foreground">Tools I like working with.</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {card.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </Tile>
          ) : null}

          <ProjectsSection />

          <div className="md:col-span-2">
            <BookingEmbed />
          </div>

          <div className="md:col-span-2">
            <ShareLinks />
          </div>
        </div>

        <p className="mt-6 px-1 text-center text-xs text-muted-foreground">
          {[company, card.person.location].filter(Boolean).join(" · ")}
        </p>
      </div>
    </div>
  );
}

function ContactRow({
  href,
  icon,
  label,
  value,
  external,
}: {
  href?: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="mt-0.5 text-oxide">{icon}</span>
      <span className="min-w-0">
        <span className="block text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
        <span className="mt-0.5 block truncate text-sm font-medium">{value}</span>
      </span>
    </>
  );

  if (!href) {
    return <li className="flex items-start gap-3 py-3">{inner}</li>;
  }

  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="flex items-start gap-3 py-3"
      >
        {inner}
      </a>
    </li>
  );
}
