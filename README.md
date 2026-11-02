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
| Amalia's photos and running loops (blurred versions only) | `media/` |
| Share image and icons | `public/` |

Anything not known yet is `null` in `site.ts` or `copy.ts`, and the page shows a
"coming soon" state until it's filled in. Lines wrapped in `DRAFT(...)` in `copy.ts`
are stand-ins that need Amalia's own words before launch.

## Review build and live build

`review` in `src/data/site.ts` switches between them.

- **Review build** (`review: true`): every page is built twice, without photos at `/`
  and with Amalia's photos at `/with-photos/`, with a switch at the bottom of each page.
  Anything waiting on a written confirmation (Special Olympics Pakistan, Donate,
  Fundraising) shows with a yellow note. Search engines are kept out.
- **Live build** (`review: false`): only one version is built, at the root, and
  anything not yet confirmed is left out. `confirmed.sop` and `confirmed.donate` turn
  those parts on once the confirmations are in writing.

Photos of anyone under 18 go live only with a parent's or guardian's written OK. The
photos and loops in `media/` are the blurred versions (school lettering, race-bib names
and bystanders removed). They are copied into a build only when a page links to them, so
the version without photos never ships them.

## Going live

1. Fill in `site.ts` and replace the `DRAFT(...)` lines.
2. Set `review: false`. The site goes live without photos. To go live with Amalia's
   photos (blurred versions only), once a parent's written OK is in, change this one line
   in `src/data/site.ts`, noting the date and who gave the OK in the comment above it:
   `photosConsent: false,` → `photosConsent: true,`
3. Host on any static host: build command `npm run build`, output folder `dist`, and an
   environment variable `SITE_URL` set to the domain (canonical links, the sitemap and
   share cards need it). On Render, `render.yaml` sets this up: New > Blueprint, pick
   this repo, then fill in `SITE_URL`.
4. Update the "Last updated" date on the privacy page, and keep that page matching what
   the site loads (an embedded video or analytics, for example).

## Adding Amalia's film

The film slot at the top of About stays hidden while `film` in `src/data/site.ts` is
`null`. When the documentary is online, set it like this:

```ts
film: {
  title: 'The film’s title',
  embedUrl: 'https://www.youtube-nocookie.com/embed/VIDEO_ID',
  note: '',
},
```

Use a privacy-enhanced embed (`youtube-nocookie.com` for YouTube, or Vimeo's
`?dnt=1`), add captions for any speech, and add a line about the embedded video to the
privacy page in the same change.
