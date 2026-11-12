// Settings and links for the whole site. Anything still unknown stays null,
// and the parts of the site that need it stay hidden or show "coming soon".

export type Variant = 'plain' | 'photos';

function reviewRequested(): boolean {
  const env = import.meta.env as Record<string, string | undefined>;
  if (env.REVIEW_BUILD !== '1') return false;
  if (env.RENDER) {
    throw new Error('REVIEW_BUILD=1 must never run on Render: the review build contains the with-photos version.');
  }
  return true;
}

export const site = {
  name: 'Soles with Goals',
  hashtag: '#SolesWithGoals',

  // Review build: both versions (/ and /with-photos/), the review bar,
  // pending items outlined, and noindex. OFF by default, so every normal build
  // (npm run build, Render) is the launch build and never contains /with-photos/
  // or her photos. It turns on only for a local review: `npm run dev:review` or
  // `npm run build:review` (they set REVIEW_BUILD=1). It never runs on Render.
  review: reviewRequested(),

  // A parent's written OK for Amalia's photos and clips as shown (her school
  // name and race-bib name are visible): note the date and who gave it here
  // when it arrives. Set only by the site's builder once that OK is in hand.
  photosConsent: false,

  // The version that goes live once review is off: 'photos' only once
  // photosConsent is true, otherwise 'plain'.
  get liveVariant(): Variant {
    return this.photosConsent ? 'photos' : 'plain';
  },

  // Contact and sign-up: each stays null until it exists. While it is null the
  // site shows a plain "Coming soon" there (no dead link, no button). Filling
  // one in here turns that one on everywhere it appears.
  //   email   -> "Email us" on Contact, the privacy page, the Contact route cards
  //   forms.* -> the "Open the form" button on that Get involved bib and Contact card
  //   socials -> links in the footer and on Contact
  //   donateUrl / event.registerUrl -> Donate / Register (also need confirmed.* below)
  email: null as string | null,
  socials: [] as { label: string; url: string }[],

  // Google Forms in Amalia's account (minors' details never touch this site).
  forms: {
    run: null as string | null,
    families: null as string | null,
    volunteer: null as string | null,
    coach: null as string | null,
    partner: null as string | null,
    updates: null as string | null,
  },

  event: {
    date: null as string | null, // e.g. "Saturday 18 April 2027", once the park permit is confirmed
    startTime: null as string | null, // New York time
    startFinish: null as string | null,
    registerUrl: null as string | null, // on an adult-owned account
  },

  donateUrl: null as string | null, // SOP's own page or an adult-owned fundraiser

  // Written confirmations received (plan D2, D3).
  confirmed: {
    sop: false, // Special Olympics Pakistan may be named, and how money reaches them
    donate: false, // the fundraiser exists and its purpose is confirmed
  },

  film: null as null | { title: string; embedUrl: string; note: string },
};

// True once at least one sign-up form or the project email is set.
export const hasSignupRoute = Object.values(site.forms).some(Boolean);
export const hasContactRoute = hasSignupRoute || Boolean(site.email);

// Show a pending item: always once confirmed, and outlined in the review build.
export const showPending = (confirmed: boolean) => confirmed || site.review;
