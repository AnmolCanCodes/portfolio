import { portfolio } from "~/portfolio.config";
import { requestTimeout, withFallback } from "./shared";

export type GuestbookNote = {
  login: string;
  avatar: string;
  profile: string;
  body: string;
  createdAt: string;
  url: string;
};

export type GuestbookData = { notes: GuestbookNote[]; total: number; stale: boolean };

/** Cache tag on the discussion fetch, so a new note can invalidate it on demand. */
export const GUESTBOOK_TAG = "guestbook";

const QUERY = `query g($owner: String!, $name: String!, $number: Int!) {
  repository(owner: $owner, name: $name) {
    discussion(number: $number) {
      url
      comments(last: 12) {
        totalCount
        nodes {
          bodyText
          createdAt
          url
          author { login avatarUrl url }
        }
      }
    }
  }
}`;

type Node = {
  bodyText: string;
  createdAt: string;
  url: string;
  author: { login: string; avatarUrl: string; url: string } | null;
};

/**
 * The notes left on the guestbook, read straight from the GitHub Discussion so
 * the homepage can render them in the site's own styling instead of embedding
 * a second giscus iframe. Needs GITHUB_TOKEN: GitHub's GraphQL API refuses
 * unauthenticated requests even for public data.
 *
 * Shorter revalidate than the stats cards - a guestbook that takes six hours to
 * show your note feels broken to whoever just signed it. The 600s is only the
 * backstop: /api/guestbook drops the cache as soon as the giscus widget reports
 * a comment count this cache has not seen.
 */
export function getGuestbook(discussionNumber = 1): Promise<GuestbookData> {
  return withFallback<GuestbookData>(
    "guestbook",
    async () => {
      const token = process.env.GITHUB_TOKEN;
      if (!token) throw new Error("GITHUB_TOKEN is not set");

      const [owner, name] = portfolio.giscus.repo.split("/");
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          query: QUERY,
          variables: { owner, name, number: discussionNumber },
        }),
        next: { revalidate: 600, tags: [GUESTBOOK_TAG] },
        signal: requestTimeout(),
      });
      if (!res.ok) throw new Error(`guestbook http ${res.status}`);

      const json = await res.json();
      if (json.errors?.length) throw new Error(json.errors[0].message);

      const discussion = json.data?.repository?.discussion;
      if (!discussion) throw new Error("guestbook discussion not found");

      const nodes: Node[] = discussion.comments?.nodes ?? [];
      const notes = nodes
        .filter((n) => n.author && n.bodyText.trim())
        .map((n) => ({
          login: n.author!.login,
          avatar: n.author!.avatarUrl,
          profile: n.author!.url,
          body: n.bodyText.trim(),
          createdAt: n.createdAt,
          url: n.url,
        }))
        .reverse();

      return { notes, total: discussion.comments?.totalCount ?? notes.length };
    },
    { notes: [], total: 0 },
  );
}

/**
 * The discussion's comment count straight from GitHub, skipping every cache.
 * Lets /api/guestbook check that a "new note" ping is real before it throws
 * away the cached homepage, so the endpoint cannot be used to force rebuilds.
 */
export async function getLiveGuestbookTotal(discussionNumber = 1): Promise<number> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not set");

  const [owner, name] = portfolio.giscus.repo.split("/");
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query g($owner: String!, $name: String!, $number: Int!) {
        repository(owner: $owner, name: $name) {
          discussion(number: $number) { comments { totalCount } }
        }
      }`,
      variables: { owner, name, number: discussionNumber },
    }),
    cache: "no-store",
    signal: requestTimeout(),
  });
  if (!res.ok) throw new Error(`guestbook http ${res.status}`);

  const json = await res.json();
  return json.data?.repository?.discussion?.comments?.totalCount ?? 0;
}
