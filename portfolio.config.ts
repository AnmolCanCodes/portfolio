/**
 * The one file to edit when you fork this portfolio.
 *
 * Everything here is identity: who the site is about and where to find them.
 * Page *content* - roles, projects, skills, highlights - lives in `src/data/`.
 * See SETUP.md for the full list and what each file expects.
 */

export const portfolio = {
  /** Shown in the hero, page titles and social cards. */
  name: "Anmol Gupta",
  /** One line under the name. Keep it short - it is also the meta description. */
  tagline: "Full-stack AI engineer building end-to-end software, with a focus on backend engineering, Generative AI, and agentic systems.",
  /** Longer form, used for Open Graph and the social hover cards. */
  description:
    "Full-stack AI engineer building end-to-end software, with a focus on backend engineering, Generative AI, and agentic systems across Python, C++, JavaScript, and TypeScript.",
  location: "Uttar Pradesh, India",
  /** IANA zone for the live clock in the banner. */
  timeZone: "Asia/Kolkata",
  /** UTC offset label shown on the social hover cards. */
  utcOffset: "UTC +05:30",

  /** Canonical origin. NEXT_PUBLIC_SITE_URL overrides this at build time. */
  url: "https://anmolgupta.is-a.dev",

  /**
   * Usernames only, never full URLs - the code builds the links and the stats
   * fetchers query these directly. Leave a value empty to hide that profile.
   */
  handles: {
    github: "AnmolCanCodes",
    linkedin: "anmol-gupta-fr",
    x: "stateful_anmol",
    leetcode: "CodessWAnmol",
    // codeforces: "", // Not using codeforces yet - uncomment in future
    // codechef: "", // Not using codechef yet - uncomment in future
  },

  /**
   * Guestbook, backed by GitHub Discussions via giscus. Entries live as
   * comments in your repo, so there is no database and no spam - signing
   * requires a GitHub account. Get these from giscus.app after installing the
   * giscus app on the repo. Leave `repoId` empty to hide the guestbook.
   */
  giscus: {
    repo: "AnmolCanCodes/portfolio" as `${string}/${string}`,
    repoId: "R_kgDOVVJC4w",
    category: "Announcements",
    categoryId: "DIC_kwDOVVJC484DJe6u",
  },

  /** This site's own source, linked in the footer. Set to "" to hide the link. */
  repo: "https://github.com/AnmolCanCodes/portfolio",

  email: "anmolgupta2k05@gmail.com",
  /** Path under /public. Swap the file and this string together. */
  resume: "/anmol_resume.pdf",
  /** "Book an intro call" button. Set to "" to hide it. */
  bookingLink: "",

  /**
   * Search Console verification. Paste the `content` value from Google's
   * "HTML tag" method here - just the token, not the whole <meta> tag. Left
   * empty, no verification tag is emitted.
   */
  googleSiteVerification: "",

  /**
   * Toggle optional sections off without deleting their code. The components
   * and routes stay in place, so flipping one back to true is the whole job.
   */
  sections: {
    /** Off until the first post is written - an empty list reads as neglect. */
    blog: false,
    anime: true,
  },

  /**
   * Profile blurbs for the hover cards. GitHub's is replaced by the live bio
   * when the API answers; the other two are always read from here because
   * X and LinkedIn block unauthenticated requests.
   */
  bios: {
    github: "Full-stack AI engineer building end-to-end software, with a focus on backend engineering, Generative AI, and agentic systems.",
    x: "20 | Full stack x AI Eng. | Agentci AI | Building in public | Hacktoberfest'26 | Love to yapping and larping about tech",
    linkedin: "I built end-to-end software, with a focus on backend engineering, Generative AI, and agentic systems across Python, C++, JavaScript, and TypeScript.",
  },

  /**
   * X and LinkedIn give no public follower count, so there is nothing to fetch.
   * Put real numbers here to show them, or leave null to show no stat row.
   */
  followers: {
    x: "100+" as string | null,
    linkedin: "100+" as string | null,
  },
} as const;

export type PortfolioConfig = typeof portfolio;
