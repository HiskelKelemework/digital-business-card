import { card } from "@/lib/card";
import { vcardFilename } from "@/lib/format";
import { buildVcard } from "@/lib/vcard";

export function GET() {
  return new Response(`${buildVcard()}\r\n`, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `inline; filename="${vcardFilename(card.fileStem)}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=300",
    },
  });
}
