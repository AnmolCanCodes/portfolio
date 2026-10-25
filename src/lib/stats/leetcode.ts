import type { LeetCodeStats } from "@/types";
import { handles } from "@/data/links";
import snapshot from "@/data/stats-snapshot.json";
import { REVALIDATE, requestTimeout, buildCalendar, withFallback } from "./shared";

const QUERY = `query u($u: String!) {
  matchedUser(username: $u) {
    username
    profile { ranking }
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    userCalendar { streak totalActiveDays submissionCalendar }
  }
  userContestRanking(username: $u) {
    rating globalRanking attendedContestsCount topPercentage
  }
  userContestRankingHistory(username: $u) { attended rating }
  allQuestionsCount { difficulty count }
}`;

type Bucket = { difficulty: string; count: number };

export function getLeetCode(): Promise<LeetCodeStats> {
  return withFallback<LeetCodeStats>("leetcode", async () => {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (portfolio stats fetcher)",
      },
      body: JSON.stringify({ query: QUERY, variables: { u: handles.leetcode } }),
      next: { revalidate: REVALIDATE },
      signal: requestTimeout(),
    });
    if (!res.ok) throw new Error(`leetcode http ${res.status}`);

    const json = await res.json();
    if (json.errors?.length) throw new Error(json.errors[0].message);

    const user = json.data?.matchedUser;
    if (!user) throw new Error("leetcode returned no user");
    const contest = json.data?.userContestRanking;

    // LeetCode exposes no "max rating" field, so derive it from every contest
    // actually attended - unattended entries carry a stale rating.
    const history: { attended: boolean; rating: number }[] =
      json.data?.userContestRankingHistory ?? [];
    const attended = history.filter((h) => h.attended).map((h) => h.rating);
    const rating = Math.round(contest?.rating ?? 0);
    const maxRating = attended.length ? Math.round(Math.max(...attended)) : rating;

    const pick = (list: Bucket[], key: string) =>
      list.find((b) => b.difficulty.toLowerCase() === key)?.count ?? 0;

    const solvedList: Bucket[] = user.submitStatsGlobal.acSubmissionNum;
    const totalList: Bucket[] = json.data?.allQuestionsCount ?? [];

    const raw: Record<string, number> = JSON.parse(user.userCalendar.submissionCalendar || "{}");
    const counts = new Map<string, number>();
    for (const [seconds, count] of Object.entries(raw)) {
      const date = new Date(Number(seconds) * 1000).toISOString().slice(0, 10);
      counts.set(date, (counts.get(date) ?? 0) + count);
    }

    return {
      username: user.username,
      rating,
      maxRating,
      globalRanking: contest?.globalRanking ?? 0,
      topPercentage: Number((contest?.topPercentage ?? 0).toFixed(2)),
      contests: contest?.attendedContestsCount ?? 0,
      solved: {
        all: pick(solvedList, "all"),
        easy: pick(solvedList, "easy"),
        medium: pick(solvedList, "medium"),
        hard: pick(solvedList, "hard"),
      },
      totals: {
        easy: pick(totalList, "easy"),
        medium: pick(totalList, "medium"),
        hard: pick(totalList, "hard"),
      },
      streak: user.userCalendar.streak ?? 0,
      activeDays: user.userCalendar.totalActiveDays ?? 0,
      calendar: buildCalendar(counts),
    };
  }, snapshot.leetcode as Omit<LeetCodeStats, "stale">);
}
