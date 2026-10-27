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
    <!-- codeforces: "",  i am not on codeforce so remove it for now but in future i should have option to add it  -->
    <!-- codechef: "",  am not on codechef so remove it for now but in future i should have option to add it  -->
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

 

  email: "anmolgupta2k05@gmail.com",
  /** Path under /public. Swap the file and this string together. */
  resume: "/anmol_resume.pdf", i wll add rusme later just tell mw how can i do later

  <!-- /** "Book an intro call" button. Set to "" to hide it. */ -->
  <!-- bookingLink: "", remove this , i dont want it  -->

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

<!-- Projeects information and links -->
pricezen = {
    description: PriceZen is a competitor price intelligence platform for e-commerce brands. It helps businesses track market pricing, identify revenue risks, and act on clear recommendations before customers switch to a cheaper alternative.
    github : https://github.com/AnmolCanCodes/pricezen-frontend , 
    live: pricezen.in
}

AI-support-copilot = {
    A professional RAG-based customer support assistant that enables users to upload their own PDF/TXT documents and ask questions based exclusively on those uploaded files. 
    github : https://github.com/AnmolCanCodes/AI-Customer-Support-Copilot , 
    live: [AI-support-copilot](https://ai-customer-support-copilot-silk.vercel.app)
}

AI-preo-intelligence = {
    An AI-powered codebase assistant that enables developers to connect a GitHub repository and ask questions about the codebase using natural language. Instead of manually searching through files, developers can ask questions like "Where is authentication implemented?" or "How does the login flow work?" and receive intelligent answers grounded in the actual code 
    github : https://github.com/AnmolCanCodes/AI-Repo-Intelligence-Agent , 
    live: [BroskiRepo](https://ai-repo-intelligence-agent.vercel.app)
}



 


