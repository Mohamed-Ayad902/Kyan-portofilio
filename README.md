# Kayan Equipment Rental: website

Corporate website for Kayan Equipment Rental (Nasr City, Cairo). Heavy equipment rental for construction, industrial and infrastructure projects in Egypt, in English, Arabic (RTL) and Simplified Chinese.

Built with Next.js 16 (App Router), React 19, TypeScript and GSAP. There is no CMS: all copy lives in typed dictionaries.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the values you have
npm run dev                  # http://localhost:3000 (redirects to /en)
```

| Script               | What it does                                                      |
| -------------------- | ----------------------------------------------------------------- |
| `npm run build`      | Production build (all 51 localized pages are prerendered)         |
| `npm run start`      | Serve the production build                                        |
| `npm run lint`       | ESLint (Next core-web-vitals + TypeScript rules)                  |
| `npm run typecheck`  | `tsc --noEmit`                                                    |
| `npm run check:i18n` | Fails if the Arabic or Chinese dictionary is missing an English key |

## Environment variables

| Variable               | Needed for                          | Notes                                                                    |
| ---------------------- | ----------------------------------- | ------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, hreflang, sitemap, OG | The production origin, e.g. `https://www.example.com`. Falls back to Vercel's production URL, then localhost. |
| `RESEND_API_KEY`       | Sending quote requests by email     | Server only. Never prefix with `NEXT_PUBLIC_`.                           |
| `QUOTE_TO_EMAIL`       | Inbox that receives quote requests  | Server only.                                                             |
| `QUOTE_FROM_EMAIL`     | Sender address on a verified Resend domain | Server only.                                                      |

Until all three `QUOTE_*`/`RESEND_*` values are set, the form never pretends to send. `/api/quote` answers `503 not_configured`, and the page offers email, WhatsApp and phone links with the request already filled in.

## Where things live

```
src/
  app/[locale]/        pages (home, about, equipment + 9 detail pages, industries,
                       projects, rental-process, faq, contact), layout, 404
  app/api/quote/       quote endpoint: validation, honeypot, minimum fill time,
                       rate limit, idempotency, origin check, Resend delivery
  app/sitemap.ts       every page x every locale, with hreflang alternates
  app/robots.ts
  proxy.ts             redirects locale-less URLs to the visitor's saved locale or /en
  dictionaries/        en.ts (source of truth), ar.ts, zh.ts
  content/catalog.ts   slugs, equipment families, projects, industries, images
  lib/                 i18n, SEO metadata, JSON-LD, quote validation, company facts
  components/          header, footer, theme toggle, language switcher, quote form,
                       flat equipment drawings, home sections
  styles/globals.css   the whole design system (tokens, light/dark, RTL, CJK)
  assets/images/       photos extracted from Kayan's company portfolio PDF
```

**Editing copy.** Change `src/dictionaries/en.ts`, then make the same change in `ar.ts` and `zh.ts`. `npm run check:i18n` lists anything missing.

**Company facts** (phones, email, address, WhatsApp) are in `src/lib/site.ts`.

**Project details.** Each project in the dictionaries has an empty `details` list. Add verified scope, location, dates or equipment there and the projects page shows them.

## Design and behaviour notes

- Light and dark themes follow the system setting until the visitor picks one; the choice is saved in `localStorage` (`kayan-theme`). A small inline script applies it before first paint, so there is no flash.
- The language switcher keeps the current page (`/en/equipment/cranes` → `/ar/equipment/cranes`) and remembers the choice in the `kayan-locale` cookie.
- Motion is GSAP + ScrollTrigger. All of it is skipped for `prefers-reduced-motion`, and content is only hidden by script, so nothing stays invisible if JavaScript fails.
- Equipment without a usable photo in the portfolio is shown as a flat elevation drawing (`components/EquipmentDrawing.tsx`) rather than a stock or generated image.
- Production responses carry a Content-Security-Policy and the usual security headers (`next.config.ts`).

## Needs confirmation from Kayan before launch

These are written conservatively on the site and marked in code with `TODO(verify)` or `TODO(brand)` where relevant:

- WhatsApp number (assumed to be the first phone number).
- Vector logo. The site uses a PNG taken from the portfolio.
- Project details (scope, dates, locations, equipment supplied) for the five named projects.
- What "Clarks" means in Kayan's fleet. It is treated here as the local term for compact lift trucks.
- The "technical team on call around the clock" claim from the portfolio.
- Rights to the portfolio photos, especially the press-style project photos. Some are illustrative and the footer says so.
- A native-speaker review of the Arabic and Chinese copy.
- The production domain (`NEXT_PUBLIC_SITE_URL`) and the email-delivery variables.
