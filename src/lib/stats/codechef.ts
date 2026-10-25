import type { CodeChefStats } from "@/types";
import { handles } from "@/data/links";
import snapshot from "@/data/stats-snapshot.json";
import { REVALIDATE, requestTimeout, withFallback } from "./shared";

type RatingEntry = { rating: string; rank: string; name: string; end_date: string };

/** CodeChef's star band is derived from rating, so it never needs scraping. */
export function starsFor(rating: number): number {
  if (rating >= 2500) return 7;
  if (rating >= 2200) return 6;
  if (rating >= 2000) return 5;
  if (rating >= 1800) return 4;
  if (rating >= 1600) return 3;
  if (rating >= 1400) return 2;
  return 1;
}

/**
 * CodeChef has no public API. The profile page embeds the full rated-contest
 * history as JSON in a script tag, which is far more stable than scraping the
 * rendered markup - but it is still scraping, so a parse failure falls back to
 * the committed snapshot rather than blanking the card.
 */
export function getCodeChef(): Promise<CodeChefStats> {
  return withFallback<CodeChefStats>("codechef", async () => {
    const handle = handles.codechef;
    const res = await fetch(`https://www.codechef.com/users/${handle}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      },
      next: { revalidate: REVALIDATE },
      signal: requestTimeout(),
    });
    if (!res.ok) throw new Error(`codechef http ${res.status}`);

    const html = await res.text();

    // [\s\S] rather than the /s flag, which needs an es2018 target.
    const block = html.match(/"all":\s*(\[\{[\s\S]*?\}\])\s*,\s*"all_old"/);
    if (!block) throw new Error("codechef rating history not found in page");

    const entries: RatingEntry[] = JSON.parse(block[1]);
    if (!entries.length) throw new Error("codechef rating history is empty");

    const ratings = entries.map((e) => Number(e.rating));
    const ranks = entries.map((e) => Number(e.rank)).filter((r) => r > 0);
    const current = ratings[ratings.length - 1];

    const solvedMatch = html.match(/Total Problems Solved:\s*(\d+)/);

    return {
      handle,
      rating: current,
      maxRating: Math.max(...ratings),
      stars: starsFor(current),
      contests: entries.length,
      bestRank: ranks.length ? Math.min(...ranks) : 0,
      solved: solvedMatch ? Number(solvedMatch[1]) : 0,
      history: entries.map((e) => ({
        date: e.end_date.slice(0, 10),
        rating: Number(e.rating),
        contest: e.name,
      })),
    };
  }, snapshot.codechef as Omit<CodeChefStats, "stale">);
}
