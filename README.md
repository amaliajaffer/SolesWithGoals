# Soles with Goals

The website for Soles with Goals, a student-led running community. Every pace counts.

A static site built with [Astro](https://astro.build). There's no database, no server
code, and no cookies or analytics. Sign-ups open Google Forms in Amalia's account, and
donations (once they open) link out to the fundraiser's own page.

## Run it

Needs Node 22.12 or newer (see `.nvmrc`).

```bash
npm install
npm run dev      # http://localhost:4321, reloads as you edit
npm run build    # writes the site to dist/
npm run preview  # serves dist/ to check the build
```

## Where things live

| What | Where |
|---|---|
| Amalia's words, page by page | `src/data/copy.ts` |
| Dates, form links, email, socials, donate link, launch switches | `src/data/site.ts` |
| Pages, one file each | `src/pages/[...v]/` |
| Header, footer, Goal Ring, bib maker and other parts | `src/components/` |
| Colours, fonts, spacing and motion | `src/styles/global.css` |
| Photos (optimised at build time) | `src/assets/photos/` |
| Running loops, share image and icons | `public/` |

Anything not known yet is `null` in `site.ts` or `copy.ts`, and the page shows a
"coming soon" state until it's filled in. Lines wrapped in `DRAFT(...)` in `copy.ts`
are stand-ins that need Amalia's own words before launch.

## Review build and live build

`review` in `src/data/site.ts` switches between them.

- **Review build** (`review: true`): every page is built twice, without photos at `/`
  and with Amalia's photos at `/with-photos/`, with a switch at the bottom of each page.
  Anything waiting on a written confirmation (Special Olympics Pakistan, Donate,
  Fundraising) shows with a yellow note. Search engines are kept out.
- **Live build** (`review: false`): only `liveVariant` is built, at the root, and
  anything not yet confirmed is left out. `confirmed.sop` and `confirmed.donate` turn
  those parts on once the confirmations are in writing.

Photos of anyone under 18 go live only with a parent's or guardian's written OK. If the
photos version isn't used, delete `public/media/`: everything in `public/` ships with
every build.

## Going live

1. Fill in `site.ts` and replace the `DRAFT(...)` lines.
2. Set `review: false` and choose `liveVariant`.
3. Host on any static host: build command `npm run build`, output folder `dist`, and an
   environment variable `SITE_URL` set to the domain (canonical links, the sitemap and
   share cards need it). On Render, `render.yaml` sets this up: New > Blueprint, pick
   this repo, then fill in `SITE_URL`.
4. Update the "Last updated" date on the privacy page, and keep that page matching what
   the site loads (an embedded video or analytics, for example).
