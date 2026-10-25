import { handles } from "@/data/links";
import { portfolio } from "~/portfolio.config";
import { REVALIDATE, requestTimeout, withFallback } from "./shared";
import { getLeetCode } from "./leetcode";

export type SocialProfileData = {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  location: string;
  banner?: boolean;
  stats: { value: string | number; label: string }[];
  stale: boolean;
};

const AVATAR = `https://github.com/${handles.github}.png`;
const LOCATION = `${portfolio.location} (${portfolio.utcOffset})`;

/**
 * X killed its public follower endpoint and LinkedIn answers every
 * unauthenticated request with HTTP 999, so neither count can be fetched.
 * Set real numbers in `portfolio.config.ts` to show them.
 */
const FOLLOWERS = portfolio.followers;

/** GitHub's REST API is public, so repo and follower counts are always current. */
function getGithubProfile() {
  return withFallback<SocialProfileData>("github-profile", async () => {
    const res = await fetch(`https://api.github.com/users/${handles.github}`, {
      next: { revalidate: REVALIDATE },
      signal: requestTimeout(),
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) throw new Error(`github http ${res.status}`);
    const d = await res.json();
    return {
      name: d.name || portfolio.name,
      handle: handles.github,
      avatar: AVATAR,
      bio: d.bio || portfolio.bios.github,
      location: LOCATION,
      stats: [
        { value: String(d.public_repos ?? 0), label: "Repositories" },
        { value: String(d.followers ?? 0), label: "Followers" },
      ],
    };
  }, {
    name: portfolio.name,
    handle: handles.github,
    avatar: AVATAR,
    bio: portfolio.bios.github,
    location: LOCATION,
    stats: [],
  });
}

/**
 * x.com is JavaScript-gated, but the server still renders Open Graph tags, so the
 * real bio is readable. Follower counts are not exposed without an API key.
 */
function getXProfile() {
  return withFallback<SocialProfileData>("x-profile", async () => {
    const res = await fetch(`https://x.com/${handles.x}`, {
      next: { revalidate: REVALIDATE },
      signal: requestTimeout(),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; portfolio/1.0)" },
    });
    if (!res.ok) throw new Error(`x http ${res.status}`);
    const html = await res.text();
    const m = html.match(/property="og:description" content="([^"]+)"/);
    if (!m) throw new Error("x bio not found");
    const bio = m[1]
      .replace(/&#x27;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"');
    return {
      name: portfolio.name,
      handle: `@${handles.x}`,
      avatar: AVATAR,
      bio,
      location: LOCATION,
      banner: true,
      stats: FOLLOWERS.x ? [{ value: FOLLOWERS.x, label: "Followers" }] : [],
    };
  }, {
    name: portfolio.name,
    handle: `@${handles.x}`,
    avatar: AVATAR,
    bio: portfolio.bios.x,
    location: LOCATION,
    banner: true,
    stats: [],
  });
}

async function getLeetCodeProfile(): Promise<SocialProfileData> {
  const lc = await getLeetCode();
  return {
    name: portfolio.name,
    handle: `u/${lc.username}`,
    avatar: AVATAR,
    bio: `Knight · ${lc.solved.all.toLocaleString()} solved · ${lc.contests} contests`,
    location: LOCATION,
    banner: true,
    stats: [
      { value: lc.solved.all.toLocaleString(), label: "Solved" },
      { value: `#${lc.globalRanking.toLocaleString()}`, label: "Contest rank" },
    ],
    stale: lc.stale,
  };
}

/**
 * LinkedIn returns HTTP 999 to every unauthenticated request, so there is no
 * public data to read. This mirrors his actual headline and is edited by hand.
 */
function getLinkedInProfile(): SocialProfileData {
  return {
    name: portfolio.name,
    handle: `in/${handles.linkedin}`,
    avatar: AVATAR,
    bio: portfolio.bios.linkedin,
    location: portfolio.location,
    banner: true,
    stats: FOLLOWERS.linkedin
      ? [{ value: FOLLOWERS.linkedin, label: "Followers" }]
      : [],
    stale: false,
  };
}

export async function getSocialProfiles(): Promise<Record<string, SocialProfileData>> {
  const [github, x, leetcode] = await Promise.all([
    getGithubProfile(),
    getXProfile(),
    getLeetCodeProfile(),
  ]);
  return { GitHub: github, Twitter: x, LeetCode: leetcode, LinkedIn: getLinkedInProfile() };
}
