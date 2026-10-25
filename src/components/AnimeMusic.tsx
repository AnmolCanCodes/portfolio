import Image from "next/image";
import Link from "next/link";
import { animeList, animeStats } from "@/data/animeData";
import { allArtists, featuredArtists, musicScenes, nowPlaying } from "@/data/musicData";

const dashedX = {
  maskImage:
    "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
  WebkitMaskImage:
    "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
} as const;

/** Homepage teaser. The full list, covers and scenes live at /anime. */
export function AnimeMusic() {
  const featured = animeList.slice(0, 8);

  return (
    <div className="relative pt-6 pb-2 flex flex-col gap-5">
      <div className="relative group">
        <div className="pointer-events-none absolute -inset-[5px] rounded-[11px] border border-black/5 transition-colors duration-300 group-hover:border-black/10 dark:border-white/5 dark:group-hover:border-white/10" />
        <div className="relative flex flex-col overflow-hidden rounded-[6px] border border-black/5 bg-zinc-50 shadow-sm shadow-black/5 dark:border-white/5 dark:bg-[#09090b] dark:shadow-lg dark:shadow-black/80">
          <header className="flex flex-wrap items-center gap-x-2 gap-y-1 px-4 pt-3 pb-2.5">
            <h3 className="text-[14px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Anime</h3>
            <span className="text-[12px] text-zinc-400 dark:text-zinc-600">everything I have watched</span>
            <span className="ml-auto font-mono text-[11px] tabular-nums text-zinc-400 dark:text-zinc-600">
              {animeStats.total} titles · {animeStats.episodes.toLocaleString()} episodes
            </span>
          </header>

          <div className="h-px bg-black/30 dark:bg-white/[0.15]" style={dashedX} />

          <div className="grid grid-cols-4 gap-3 p-4 sm:grid-cols-8">
            {featured.map((a) => (
              <div key={a.title} className="group/card relative">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[5px] border border-black/5 bg-zinc-100 dark:border-white/5 dark:bg-[#0a0a0a]">
                  {a.cover ? (
                    <Image
                      src={a.cover}
                      alt={a.title}
                      fill
                      sizes="(min-width: 640px) 10vw, 22vw"
                      quality={70}
                      className="object-cover saturate-[.85] transition-[filter,transform] duration-500 motion-safe:group-hover/card:scale-[1.04] group-hover/card:saturate-100"
                      draggable={false}
                    />
                  ) : null}
                </div>
                <p className="mt-1.5 truncate text-[11px] font-medium text-zinc-600 dark:text-zinc-400">{a.title}</p>
              </div>
            ))}
          </div>

          <div className="h-px bg-black/30 dark:bg-white/[0.15]" style={dashedX} />

          <div className="flex flex-col gap-3 px-4 py-3.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="text-[14px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Music</h3>
              <span className="text-[12px] text-zinc-400 dark:text-zinc-600">
                {musicScenes.length} scenes, no loyalty to any
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {featuredArtists.map((a) => (
                <span
                  key={a}
                  className="rounded-[6px] border border-black/30 bg-zinc-100 px-2.5 py-1 text-[12px] font-medium text-zinc-600 dark:border-white/[0.15] dark:bg-[#0a0a0a] dark:text-zinc-400"
                >
                  {a}
                </span>
              ))}
              <span className="px-1 py-1 font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
                +{allArtists.length - featuredArtists.length} more
              </span>
            </div>
          </div>

          <div className="h-px bg-black/30 dark:bg-white/[0.15]" style={dashedX} />

          <div className="px-4 py-3.5">
            <div className="flex items-baseline gap-2 pb-2.5">
              <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
                On repeat
              </p>
              <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-600">{nowPlaying.artist}</span>
            </div>
            <div className="overflow-hidden rounded-[10px]">
              <iframe
                title={`${nowPlaying.title} by ${nowPlaying.artist} on Spotify`}
                src={`https://open.spotify.com/embed/track/${nowPlaying.trackId}?utm_source=generator`}
                width="100%"
                height="152"
                frameBorder="0"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="block w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* View All, matching the other sections */}
      <div className="relative -mx-4 flex cursor-pointer justify-center rounded-b-lg px-4 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/20">
        <div
          className="pointer-events-none absolute bottom-0 left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15]"
          style={dashedX}
        />
        <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[2px] w-[2px] -translate-x-1/2 translate-y-1/2 bg-black/50 dark:bg-white/[0.25]" />
        <div className="pointer-events-none absolute bottom-0 right-0 z-20 h-[2px] w-[2px] translate-x-1/2 translate-y-1/2 bg-black/50 dark:bg-white/[0.25]" />

        <Link href="/anime" className="group relative block">
          <div className="pointer-events-none absolute -inset-[5px] rounded-[11px] border border-black/5 transition-colors duration-300 group-hover:border-black/10 dark:border-white/5 dark:group-hover:border-white/10" />
          <div className="relative flex items-center gap-1.5 rounded-[6px] border border-black/5 bg-zinc-50 px-4 py-2 text-[13px] font-medium text-zinc-600 shadow-sm shadow-black/20 transition-all duration-300 hover:bg-zinc-100 hover:text-zinc-900 dark:border-white/5 dark:bg-[#09090b] dark:text-zinc-400 dark:shadow-lg dark:shadow-black/80 dark:hover:bg-[#121214] dark:hover:text-zinc-100">
            View All
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-zinc-500 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-300" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}
