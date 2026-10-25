import raw from "./anime.json";

export type AnimeStatus = "Watching" | "Completed" | "On hold" | "Dropped";

export type AnimeSectionId = "watching" | "favorites" | "recent" | "classics" | "movies" | "more";

export type Anime = {
  title: string;
  /** Which group the title shows under on /anime. Unknown or missing ids fall into "more". */
  section?: AnimeSectionId;
  status: AnimeStatus;
  episodes: number | null;
  year: number | null;
  /** Free text shown when there is no episode count - "Movie", manga progress, etc. */
  note?: string;
  cover?: string;
  url?: string;
  /** Detail-view fields, resolved from AniList. */
  synopsis?: string;
  genres?: string[];
  score?: number;
  studio?: string;
  runtime?: number;
};

/** Display order of the groups on /anime. Empty groups are skipped. */
export const animeSectionDefs: { id: AnimeSectionId; title: string }[] = [
  { id: "watching", title: "Watching now" },
  { id: "favorites", title: "All-time favorites" },
  { id: "recent", title: "Recently watched" },
  { id: "classics", title: "Classics" },
  { id: "movies", title: "Movies" },
  { id: "more", title: "Also watched" },
];

const all = raw as Anime[];
const knownIds = new Set(animeSectionDefs.map((s) => s.id));
const sectionOf = (a: Anime): AnimeSectionId => (a.section && knownIds.has(a.section) ? a.section : "more");

/**
 * The list lives in `anime.json`. Each block's `section` picks its group, and
 * array order within a group IS the display order - no code changes needed.
 *
 * To add one: copy any block, set `title` and `section`, and either point
 * `cover` at an image in /public/anime or leave it out for a blueprint tile.
 */
export const animeSections = animeSectionDefs
  .map((def) => ({ ...def, items: all.filter((a) => sectionOf(a) === def.id) }))
  .filter((s) => s.items.length > 0);

/** Every title, flattened in section order, so the homepage teaser leads with favorites. */
export const animeList = animeSections.flatMap((s) => s.items);

export const animeStats = {
  total: animeList.length,
  watching: animeList.filter((a) => a.status === "Watching").length,
  completed: animeList.filter((a) => a.status === "Completed").length,
  episodes: animeList.reduce((sum, a) => sum + (a.episodes ?? 0), 0),
  withCovers: animeList.filter((a) => a.cover).length,
};
