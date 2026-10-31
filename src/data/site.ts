// Settings and links for the whole site. Anything still unknown stays null,
// and the parts of the site that need it stay hidden or show "coming soon".

export type Variant = 'plain' | 'photos';

export const site = {
  name: 'Soles with Goals',
  hashtag: '#SolesWithGoals',

  // Review build: both versions (/ and /with-photos/), the review bar,
  // pending items outlined, and noindex. Set to false before launch.
  review: true,

  // The version that goes live once review is off. Stays 'plain' until a
  // parent has agreed in writing to her photos being published.
  liveVariant: 'plain' as Variant,

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

// Show a pending item: always once confirmed, and outlined in the review build.
export const showPending = (confirmed: boolean) => confirmed || site.review;
