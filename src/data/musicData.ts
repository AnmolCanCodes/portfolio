import raw from "./music.json";

export type Scene = {
  scene: string;
  artists: string[];
};

export type Album = {
  id: string;
  artist: string;
  year: number;
  scene: string;
  title: string;
  cover: string;
};

export type NowPlaying = {
  trackId: string;
  title: string;
  artist: string;
};

/**
 * Everything lives in `music.json` and the array order IS the display order, so
 * reordering the site is just moving blocks in that file - no code changes.
 *
 * Scenes are the artist chips, grouped however you like; the first few of each
 * are what the homepage teaser shows.
 */
export const musicScenes = raw.scenes as Scene[];

/** Every artist across the scenes, for counts and the homepage teaser. */
export const allArtists = musicScenes.flatMap((s) => s.artists);

/** A few from each scene, so the homepage teaser shows the spread, not one scene. */
export const featuredArtists = musicScenes.flatMap((s) => s.artists.slice(0, 3));

/**
 * The track embedded on both pages. Swap the id for any Spotify track - it is
 * the segment after /track/ in a Spotify share link.
 */
export const nowPlaying = raw.nowPlaying as NowPlaying;

/**
 * To add one: paste a Spotify album id into `music.json` with artist, year and
 * scene, then run `npm run refresh-music` to fill in the title and download the
 * cover. Albums without a cover are skipped so a failed fetch never ships a gap.
 */
export const albums = (raw.albums as Album[]).filter((a) => a.cover);
