"use client";

import { Calendar } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { card } from "@/lib/card";
import { calEmbedLink, safeHttpsUrl } from "@/lib/format";
import { Tile, TileLabel } from "./tile";

const CAL_NAMESPACE = "booking";

export function BookingEmbed() {
  const calLink = calEmbedLink(card.booking.calLink);
  const bookingUrl = safeHttpsUrl(card.booking.url) || (calLink ? `https://cal.com/${calLink}` : "");

  useEffect(() => {
    if (!calLink) return;
    void (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, [calLink]);

  if (!calLink) return <BookingPlaceholder />;

  return (
    <Tile id="book" delay={280} className="overflow-hidden p-0">
      <div className="px-5 pt-5">
        <TileLabel>Book a meeting</TileLabel>
        <p className="mt-1 text-sm text-muted-foreground">Pick a time that works.</p>
      </div>
      <div className="mt-3 h-[min(36rem,70dvh)] overflow-hidden">
        <Cal
          namespace={CAL_NAMESPACE}
          calLink={calLink}
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
        />
      </div>
      {bookingUrl ? (
        <p className="px-5 pb-4 text-center text-xs text-muted-foreground">
          Or open{" "}
          <a href={bookingUrl} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
            cal.com
          </a>
        </p>
      ) : null}
    </Tile>
  );
}

function BookingPlaceholder() {
  return (
    <Tile id="book" delay={280} className="border-2 border-dashed border-border">
      <TileLabel>Book a meeting</TileLabel>
      <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl bg-muted px-5 py-8 text-center">
        <span className="grid size-10 place-items-center rounded-full bg-oxide/15 text-oxide">
          <Calendar className="size-5" />
        </span>
        <p className="text-sm font-medium">Cal.com not connected yet</p>
        <p className="max-w-xs text-xs text-muted-foreground">
          Hiskel: create a free account at{" "}
          <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            cal.com
          </a>
          , then set <code className="rounded bg-background px-1 py-0.5">booking.calLink</code> and{" "}
          <code className="rounded bg-background px-1 py-0.5">booking.url</code> in{" "}
          <code className="rounded bg-background px-1 py-0.5">lib/card.ts</code> to replace this placeholder.
        </p>
      </div>
    </Tile>
  );
}
