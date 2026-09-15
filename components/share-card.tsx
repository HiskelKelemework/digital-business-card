"use client";

import { toBlob } from "html-to-image";
import QRCode from "qrcode";
import { useEffect, useState, type RefObject } from "react";
import { card } from "@/lib/card";
import { buildVcard } from "@/lib/vcard";

export async function captureCardPng(node: HTMLElement) {
  return toBlob(node, {
    pixelRatio: 3,
    cacheBust: true,
    backgroundColor: "#0a0a0a",
  });
}

function DotRow({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: 99,
          flexShrink: 0,
          background: "#3b82f6",
          boxShadow: "0 0 0 3px rgb(59 130 246 / 0.2)",
        }}
      />
      <span style={{ fontSize: 13, lineHeight: 1.35, color: "#ebe6dc" }}>{text}</span>
    </div>
  );
}

export function ShareCardFace({
  cardRef,
  onReady,
}: {
  cardRef: RefObject<HTMLDivElement | null>;
  onReady?: (ready: boolean) => void;
}) {
  const [qr, setQr] = useState("");
  const rows = [card.email, card.websiteDisplay].filter(Boolean);

  useEffect(() => {
    onReady?.(false);
    void QRCode.toDataURL(buildVcard(), {
      margin: 1,
      width: 512,
      errorCorrectionLevel: "M",
      color: { dark: "#111111", light: "#ffffff" },
    }).then((data) => {
      setQr(data);
      onReady?.(true);
    });
  }, [onReady]);

  return (
    <div
      ref={cardRef}
      className="relative w-full overflow-hidden rounded-[1.35rem]"
      style={{
        background:
          "radial-gradient(120% 70% at 115% -5%, rgba(255,255,255,0.16) 0%, transparent 42%), radial-gradient(80% 55% at -15% 110%, rgba(29,78,216,0.32) 0%, transparent 50%), #0a0a0a",
        color: "#f4f1ea",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        aspectRatio: "55 / 85",
      }}
    >
      <div style={{ display: "flex", height: "100%", flexDirection: "column", padding: "26px 24px 22px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#c8c3b8",
              }}
            >
              {card.person.company || card.person.shortName}
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.person.photo}
            alt=""
            width={64}
            height={64}
            style={{
              width: 64,
              height: 64,
              objectFit: "cover",
              borderRadius: 999,
              background: "#1a1a1a",
              boxShadow: "0 0 0 1px rgb(255 255 255 / 0.12)",
            }}
          />
        </div>

        <div style={{ marginTop: 28 }}>
          <h2
            style={{
              margin: 0,
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
              textTransform: "uppercase",
            }}
          >
            {card.person.name}
          </h2>
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "#9a958c" }}>{card.person.role}</p>
        </div>

        <div style={{ marginTop: 22, display: "grid", gap: 11 }}>
          {rows.map((text) => (
            <DotRow key={text} text={text} />
          ))}
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: 14,
            paddingTop: 18,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 7,
              width: 78,
              height: 78,
              flexShrink: 0,
            }}
          >
            {qr ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qr} alt="" width={64} height={64} style={{ width: "100%", height: "100%" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "#eee" }} />
            )}
          </div>
          <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8a857c", lineHeight: 1.45 }}>
            Scan to save contact
            <br />
            {card.person.location}
          </p>
        </div>
      </div>
    </div>
  );
}
