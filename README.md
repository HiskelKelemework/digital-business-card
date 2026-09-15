# Hiskel Card

Hiskel's digital business card — a single-page Next.js app that works as a contact card, a QR-code vCard, and a shareable link. All personal data lives in one file: [`lib/card.ts`](lib/card.ts).

Scan **Save contact** (`/contact.vcf`) to add a vCard. Scan **Open site** to open the card page. The dark card QR also encodes the vCard so a saved image still works offline.

## Running the project

Requirements: Node.js 20+ and npm.

```bash
npm install     # install dependencies (first time only)
npm run dev     # start the dev server at http://localhost:3000
```

Other useful commands:

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # lint the code
npm run check   # run the lib/format.ts unit checks
```

The app has no backend/server secrets — everything is static except the small `/api/contact` route. There's nothing to configure in `.env` (see `.env.example`).

## Setup checklist

`lib/card.ts` is filled with empty placeholders (marked `TODO(Hiskel)`) — fill in:

- Role, bio
- Photo — drop a file in `public/` and point `person.photo` at it (couldn't be pulled automatically from TikTok; it blocks scraping)
- Email, phone, website, WhatsApp
- LinkedIn profile URL
- Steam profile URL (`https://steamcommunity.com/...`)
- `siteUrl` once deployed

Already wired up: Telegram group, YouTube channel, TikTok, and Tiply — all in `lib/card.ts`, shown in the "Channels" section.

A field left empty (`""`) simply hides that part of the card — nothing renders half-filled, so it's safe to leave anything blank until you're ready.

### Cal.com booking

The "Book Now" button and embedded scheduler only appear once `booking.calLink` is set. This card does **not** ship with a Cal.com account wired up — add your own:

1. Create a free account at [cal.com](https://cal.com) and set up an event type (e.g. a 30-minute call).
2. Set `booking.calLink` to your link slug (e.g. `"your-username/30min"`) and `booking.url` to the full `https://cal.com/...` URL in `lib/card.ts`.

## Adding more social or contact links

The card already covers email, phone, website, WhatsApp, LinkedIn, Steam, Telegram, YouTube, TikTok, and Tiply. To add another platform (e.g. Instagram, X/Twitter, a personal blog), follow the same four-step pattern used for the existing ones:

1. **Add the data** in `lib/card.ts`, e.g.:
   ```ts
   instagram: {
     url: "https://instagram.com/your-handle",
     label: "Follow on Instagram",
   },
   ```
2. **Add a URL validator** in `lib/format.ts` so a malformed or wrong-domain link never renders as a clickable button:
   ```ts
   export function isInstagramUrl(raw: string) {
     try {
       const url = new URL(raw);
       return url.protocol === "https:" && /(^|\.)instagram\.com$/.test(url.hostname);
     } catch {
       return false;
     }
   }
   ```
3. **Add an icon** (an inline SVG component) in `components/icons.tsx`, following the existing icons (`LinkedInIcon`, `TelegramIcon`, etc.) as a template.
4. **Wire it in** `components/card-app.tsx`:
   - Validate the URL near the top of the file (next to `const steam = ...`).
   - For a simple icon-only link, add it to the `Social` tile alongside LinkedIn/WhatsApp/Steam.
   - For a link with its own label/row, add it to the `channels` array so it shows up in the "Channels" tile automatically.

Simple contact fields (a second phone number, an alternate email, a physical address) can just be added next to the existing ones in `lib/card.ts` and rendered as another `ContactRow` in the `Contact` tile in `components/card-app.tsx`.

## Project structure

```
lib/card.ts          all personal data — the only file most edits touch
lib/format.ts         validators (isEmail, isCalLink, isTelegramUrl, ...) — keep untrusted URLs safe
lib/vcard.ts          builds the downloadable .vcf contact file
components/card-app.tsx   the whole page layout
components/icons.tsx  inline SVG icons for each platform
components/booking-embed.tsx   the Cal.com scheduler embed
app/globals.css       theme colors (blue/black/white)
```
