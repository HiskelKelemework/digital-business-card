"use client";

import QRCode from "qrcode";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Tile, TileLabel } from "@/components/tile";
import { card } from "@/lib/card";
import { safeHttpsUrl } from "@/lib/format";

function QrBox({ value, label }: { value: string; label: string }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    void QRCode.toDataURL(value, {
      margin: 1,
      width: 360,
      errorCorrectionLevel: "M",
      color: { dark: "#111111", light: "#ffffff" },
    }).then(setSrc);
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-full rounded-2xl bg-white p-2 ring-1 ring-border">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={label} className="aspect-square w-full" />
        ) : (
          <div className="aspect-square w-full bg-muted" />
        )}
      </div>
      <p className="text-xs font-medium">{label}</p>
    </div>
  );
}

function CopyLink({ href, text }: { href: string; text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-ink">
      <a href={href} className="min-w-0 flex-1 truncate text-sm font-medium">
        {text}
      </a>
      <button
        type="button"
        onClick={() => void copy()}
        aria-label={`Copy ${text}`}
        className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-white"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  );
}

export function ShareLinks() {
  const siteUrl = safeHttpsUrl(card.siteUrl);
  if (!siteUrl) return null;
  const contactUrl = `${siteUrl.replace(/\/$/, "")}${card.contactPath}`;
  const host = siteUrl.replace(/^https:\/\//, "").replace(/\/$/, "");

  return (
    <Tile id="share" tone="ink" delay={320}>
      <TileLabel>Scan</TileLabel>
      <p className="mt-2 text-sm text-muted-foreground">Print or show these. One saves the contact, one opens this card.</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <QrBox value={contactUrl} label="Save contact" />
        <QrBox value={card.siteUrl} label="Open site" />
      </div>
      <div className="mt-4 grid gap-2">
        <CopyLink href={contactUrl} text={`${host}${card.contactPath}`} />
        <CopyLink href={card.siteUrl} text={host} />
      </div>
    </Tile>
  );
}
