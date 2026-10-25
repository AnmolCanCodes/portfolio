/** Normalized calendar cell shared by the LeetCode and GitHub heatmaps. */
export type HeatmapDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type LeetCodeStats = {
  username: string;
  rating: number;
  /** Best contest rating ever reached, computed from the full contest history. */
  maxRating: number;
  globalRanking: number;
  topPercentage: number;
  contests: number;
  solved: { all: number; easy: number; medium: number; hard: number };
  totals: { easy: number; medium: number; hard: number };
  streak: number;
  activeDays: number;
  calendar: HeatmapDay[];
  stale: boolean;
};

export type CodeforcesStats = {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  contests: number;
  solved: number;
  history: { date: string; rating: number; contest: string }[];
  stale: boolean;
};

export type GithubStats = {
  login: string;
  totalContributions: number;
  mergedPullRequests: number;
  publicRepos: number;
  calendar: HeatmapDay[];
  stale: boolean;
};

export type CodeChefStats = {
  handle: string;
  rating: number;
  maxRating: number;
  stars: number;
  contests: number;
  bestRank: number;
  solved: number;
  history: { date: string; rating: number; contest: string }[];
  stale: boolean;
};
