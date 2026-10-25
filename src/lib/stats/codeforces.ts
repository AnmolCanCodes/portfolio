import type { CodeforcesStats } from "@/types";
import { handles } from "@/data/links";
import snapshot from "@/data/stats-snapshot.json";
import { REVALIDATE, requestTimeout, withFallback } from "./shared";

type CfEnvelope<T> = { status: string; result: T; comment?: string };

async function cf<T>(path: string): Promise<T> {
  const res = await fetch(`https://codeforces.com/api/${path}`, {
    next: { revalidate: REVALIDATE },
    signal: requestTimeout(),
    headers: { "User-Agent": "portfolio stats fetcher" },
  });
  if (!res.ok) throw new Error(`codeforces http ${res.status}`);
  const json = (await res.json()) as CfEnvelope<T>;
  if (json.status !== "OK") throw new Error(json.comment ?? "codeforces error");
  return json.result;
}

export function getCodeforces(): Promise<CodeforcesStats> {
  return withFallback<CodeforcesStats>("codeforces", async () => {
    const handle = handles.codeforces;

    const [info] = await cf<
      { rating?: number; maxRating?: number; rank?: string; maxRank?: string }[]
    >(`user.info?handles=${handle}`);

    const rating = await cf<
      { contestName: string; newRating: number; ratingUpdateTimeSeconds: number }[]
    >(`user.rating?handle=${handle}`);

    // Distinct problems with an accepted verdict, not raw submission count.
    const status = await cf<
      { verdict?: string; problem: { contestId?: number; index: string } }[]
    >(`user.status?handle=${handle}&from=1&count=10000`);

    const solved = new Set<string>();
    for (const sub of status) {
      if (sub.verdict === "OK") solved.add(`${sub.problem.contestId ?? "x"}-${sub.problem.index}`);
    }

    return {
      handle,
      rating: info.rating ?? 0,
      maxRating: info.maxRating ?? 0,
      rank: info.rank ?? "unrated",
      maxRank: info.maxRank ?? "unrated",
      contests: rating.length,
      solved: solved.size,
      history: rating.map((r) => ({
        date: new Date(r.ratingUpdateTimeSeconds * 1000).toISOString().slice(0, 10),
        rating: r.newRating,
        contest: r.contestName,
      })),
    };
  }, snapshot.codeforces as Omit<CodeforcesStats, "stale">);
}
