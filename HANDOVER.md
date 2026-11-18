# Changing the site

Everyday changes happen in two files. Every page reads from them, so you never edit a
page to change a sentence, a link or a date.

| What | File |
|---|---|
| Every sentence on the site | `src/data/copy.ts` |
| Email, form links, socials, 5K details, donate link, film, Fundraising switches | `src/data/site.ts` |
| Photos and running clips | `media/` |
| Logo, browser-tab icon, share image | `public/` |
| Colours, fonts, spacing | `src/styles/global.css` |
| Page layout | `src/pages/[...v]/` and `src/components/` |

Every change saved to `main` is built and put live by Vercel in a minute or two. If a
build fails, the live site stays on the last version that worked.

## Two ways to make a change

**On the GitHub website** (wording, links, dates; nothing to install):

1. Open the file on github.com and click the pencil (Edit this file).
2. Change the text, then **Commit changes…** → commit directly to `main`.
3. On vercel.com → the project → **Deployments**, wait for **Ready**, then refresh the site.

**On your computer** (colours, layout, anything bigger), with Node 22.19+ installed:

```bash
npm install      # once
npm run dev      # preview at http://localhost:4321 while you edit
npm test         # before every push: builds the site and checks it; must pass
```

## Rules for the `.ts` files

```ts
heroLine: 'Text goes between straight quote marks, with a comma after.',
startLine: 'Inside the text use the curly apostrophe: we’re, it’s, Amalia’s.',
// A straight ' inside the text ends it early and the build fails.
email: null,   // null means "not yet": that part is hidden or shows "Coming soon"
```

## Common changes

### Fix a word or sentence: `src/data/copy.ts`

Find the sentence (Ctrl+F) and edit it between its quote marks.

```ts
essence: 'Every pace counts.',
```

### Add the project email: `src/data/site.ts`

```ts
email: null as string | null,
// becomes
email: 'hello@example.com' as string | null,
```

"Email us" appears on Contact and Privacy.

### Turn on a sign-up form: `src/data/site.ts`

Use Google Forms in Amalia's own account. Children's details are never collected
anywhere else.

```ts
forms: {
  run: 'https://forms.gle/XXXX' as string | null,   // was: null as string | null,
  families: null as string | null,
  volunteer: null as string | null,
  coach: null as string | null,
  partner: null as string | null,
  updates: null as string | null,
},
```

Each form's **Open the form** button appears on Get involved and Contact.

### Add socials: `src/data/site.ts`

```ts
socials: [
  { label: 'Instagram', url: 'https://www.instagram.com/XXXX' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@XXXX' },
] as { label: string; url: string }[],
```

Links appear in the footer and on Contact.

### Set the 5K details: `src/data/site.ts`

Only once the park permit is confirmed. "Date coming soon" disappears and the bib maker
adds "Central Park" by itself.

```ts
event: {
  date: 'Saturday 18 April 2027' as string | null,
  startTime: '9:00 am' as string | null,          // New York time
  startFinish: 'PLACE' as string | null,
  registerUrl: 'https://...' as string | null,     // on an account an adult owns
},
```

### Open Fundraising: `src/data/site.ts`

Only with a parent or guardian, on an adult-owned fundraiser (or Special Olympics
Pakistan's own donation page), and once the confirmations are in writing.

```ts
donateUrl: 'https://...' as string | null,

confirmed: {
  sop: true,     // Special Olympics Pakistan agreed in writing to be named
  donate: true,  // the fundraiser exists and its purpose is confirmed
},
```

Fundraising opens only when **both** are `true`: it appears in the menu and the footer,
and Fundraise switches on on Home, Get involved and The 5K.

**`sop: true` also publishes "Soles with Goals has a formal partnership with Special
Olympics Pakistan" on How it works** (`copy.ts`, the "Rooted in Pakistan" principle). Set
it only if SOP confirmed a formal partnership in writing; otherwise change that sentence
to the wording SOP agreed, in the same commit.

### Add a module description or a download: `src/data/copy.ts`

Under `impact`. Downloads go in `public/resources/`; a resource shows once it has a
`file` or a `status`.

```ts
{ title: 'How to fuel your body', text: 'YOUR TEXT' as string | null },

{ title: 'Energy and iron: a one-page guide for female runners', file: '/resources/energy-and-iron.pdf' as string | null, status: null as string | null },
```

**Health content (fuel, iron, food, running plans) must come from a named, trusted
source and say it isn't medical advice.** Have a qualified adult, such as a dietitian or
coach, check it before it goes up. No "charity" or
"tax-deductible" wording, and a total shows as a goal, never as a counter.

### Add the documentary: `src/data/site.ts`

The film slot at the top of About stays hidden while `film` is `null`. Use the embed
link (YouTube: Share → Embed, then change `youtube.com` to `youtube-nocookie.com`; Vimeo:
add `?dnt=1`).

```ts
film: {
  title: 'The film’s title',
  embedUrl: 'https://www.youtube-nocookie.com/embed/VIDEO_ID',
  note: '',
},
```

In the same change, add a line about the embedded video to the privacy page
(`src/pages/[...v]/privacy.astro`) and update its "Last updated" date.

### Add a story: `src/data/copy.ts`

Real stories only, each with the athlete's and her family's written OK. Put a square
photo in `public/stories/` (or use `null` for no photo).

```ts
entries: [
  { name: 'First name', line: 'Her words, as she said them.', photo: '/stories/first-name.jpg' },
] as { name: string; line: string; photo: string | null }[],
```

The "Coming soon" block on Stories is replaced by the stories.

### Change a photo or clip: `media/`

Upload the new file under exactly the same name as the one it replaces (for example
`media/stadium.jpg`). Photos of anyone under 18 only with a parent's or guardian's
written OK, covering the photo as shown (school names and race bibs included).

## Changes that aren't quick edits

Don't try these on `main`. List them in one email (what, which page, a screenshot) to
whoever supports the site; they'll say whether it fits the remaining support or is a
new request.

| Change | Why | Send it as |
|---|---|---|
| New colours, fonts or a section's layout | Shared across every page, phone and laptop | Change list |
| A new page or menu item | New page file, menu, sitemap and both photo versions | Change list |
| The Module 1 preview | New content and layout on How it works | Change list |
| New running clips | Must be shrunk to small MP4 loops with a still image | Change list, with the originals |
| A new logo | Logo, tab icon and share image are all made from it | Change list, with the original |
| A deployment still on Error after Instant Rollback | Something outside the two data files broke | Straight away, with the commit link |
| Domain won't show Valid Configuration | DNS at the domain company | With screenshots |
| Donations or payments on the site itself | Needs payments and a backend | New request |
| Sign-ups stored on the site, logins, a dashboard | Needs a database and accounts | New request |
| An Urdu (or other language) version, or a redesign | A second full build of every page | New request |

## Undo a change

vercel.com → Deployments → the last one that worked → ⋯ → **Instant Rollback**. Then
fix the file on GitHub (its **History** shows earlier versions).

## Connecting the domain

1. Vercel → the project → Settings → **Domains**: add the domain and its `www` version.
2. At the domain company, add the DNS records Vercel shows, exactly as shown.
3. Wait for **Valid Configuration** on both.
4. Vercel → Settings → **Environment Variables**: add `SITE_URL` = `https://the-domain`
   for Production. The sitemap, robots.txt and share links use it.
5. Deployments → ⋯ → **Redeploy**.

The build command stays `npm run build`. `npm run build:review` is for a local review
only: it makes the review version, which search engines are told to skip.
