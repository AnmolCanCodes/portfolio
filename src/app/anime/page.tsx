/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CommandMenu } from "@/components/command-menu";
import { CurrentTime } from "@/components/CurrentTime";
import { FooterBackground } from "@/components/FooterBackground";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimeGrid } from "@/components/AnimeGrid";
import { animeList, animeStats } from "@/data/animeData";
import { albums, musicScenes, nowPlaying } from "@/data/musicData";
import { portfolio } from "~/portfolio.config";

export const metadata: Metadata = {
  title: `Anime & Music | ${portfolio.name}`,
  description: `Everything ${portfolio.name} has watched, and what is on repeat while building.`,
};

const horizontalDots = {
  maskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
  WebkitMaskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
};

const verticalDots = {
  maskImage: "repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)",
  WebkitMaskImage: "repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)",
};

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[20px] font-bold leading-none tracking-tight text-zinc-900 tabular-nums dark:text-zinc-100">
        {value}
      </span>
      <span className="mt-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
        {label}
      </span>
    </div>
  );
}

export default function AnimePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white transition-colors duration-300 dark:bg-black">
      <div className="pointer-events-none absolute bottom-0 left-[30%] top-0 hidden w-0 border-r border-black/30 dark:border-white/[0.15] md:block" style={verticalDots} />
      <div className="pointer-events-none absolute bottom-0 right-[30%] top-0 hidden w-0 border-r border-black/30 dark:border-white/[0.15] md:block" style={verticalDots} />
      <div className="pointer-events-none absolute left-0 right-0 top-[22vh] h-0 border-b border-black/30 dark:border-white/[0.15]" style={horizontalDots} />
      <div className="pointer-events-none absolute left-0 right-0 top-[calc(22vh+112px)] h-0 border-b border-black/30 dark:border-white/[0.15]" style={horizontalDots} />

      {[
        { top: "22vh", left: "30%" },
        { top: "22vh", right: "30%" },
        { top: "calc(22vh + 112px)", left: "30%" },
        { top: "calc(22vh + 112px)", right: "30%" },
      ].map((position, index) => (
        <div
          key={index}
          className="pointer-events-none absolute z-10 hidden h-[2px] w-[2px] bg-black/50 dark:bg-white/[0.25] md:block"
          style={{ ...position, transform: `translate(${position.right ? "50%" : "-50%"}, -50%)` }}
        />
      ))}

      <div className="absolute left-0 right-0 top-0 h-[22vh] md:left-[30%] md:right-[30%]">
        <FooterBackground />
        <div className="pointer-events-auto absolute bottom-3 right-2 z-10">
          <CurrentTime />
        </div>
      </div>

      <header className="absolute left-0 right-0 top-[22vh] z-20 flex h-[112px] items-center px-4 md:left-[30%] md:right-[30%]">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-5">
            <Link
              href="/#anime"
              aria-label="Back home"
              className="group flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-zinc-200/50 bg-zinc-100 text-zinc-400 transition-all hover:bg-zinc-200 hover:text-zinc-900 dark:border-zinc-800/50 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </Link>
            <div className="flex flex-col justify-center">
              <h1 className="mb-0.5 text-[20px] font-bold leading-none tracking-tight text-zinc-800 [text-shadow:-1.5px_0_0_rgba(0,200,255,0.3),1.5px_0_0_rgba(255,80,0,0.3)] dark:text-zinc-100 dark:[text-shadow:-1.5px_0_0_rgba(0,200,255,0.6),1.5px_0_0_rgba(255,80,0,0.6)] sm:text-[24px]">
                Anime &amp; Music
              </h1>
              <p className="text-[12px] text-zinc-500 dark:text-zinc-400">What I watch, and what is on repeat</p>
            </div>
          </div>

          <div className="flex h-20 items-start justify-end gap-2 py-1 sm:h-24 sm:gap-3">
            <CommandMenu />
            <ThemeToggle className="dark:text-zinc-400 hover:dark:text-zinc-300" />
          </div>
        </div>
      </header>

      <main className="relative z-10 ml-0 mr-0 flex flex-col px-4 pb-16 pt-[calc(22vh+112px)] md:ml-[30%] md:mr-[30%]">
        {/* stats */}
        <div className="flex flex-wrap items-start gap-x-10 gap-y-4 py-6">
          <Stat value={String(animeStats.total)} label="Titles" />
          <Stat value={animeStats.episodes.toLocaleString()} label="Episodes" />
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -left-[100vw] -right-[100vw] bottom-0 h-0 border-b border-black/30 dark:border-white/[0.15]" style={horizontalDots} />
          <div className="pointer-events-none absolute -bottom-px -left-4 z-10 h-[2px] w-[2px] bg-black/50 dark:bg-white/[0.25]" />
          <div className="pointer-events-none absolute -bottom-px -right-4 z-10 h-[2px] w-[2px] bg-black/50 dark:bg-white/[0.25]" />
        </div>

        {/* anime */}
        <div className="flex items-center justify-between gap-4 py-5">
          <h2 className="text-[15px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Anime</h2>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-600">
            {String(animeList.length).padStart(2, "0")} titles
          </span>
        </div>

        <AnimeGrid />

        {/* music */}
        <div className="relative mt-12">
          <div className="pointer-events-none absolute -left-[100vw] -right-[100vw] top-0 h-0 border-t border-black/30 dark:border-white/[0.15]" style={horizontalDots} />
          <div className="pointer-events-none absolute -left-4 -top-px z-10 h-[2px] w-[2px] bg-black/50 dark:bg-white/[0.25]" />
          <div className="pointer-events-none absolute -right-4 -top-px z-10 h-[2px] w-[2px] bg-black/50 dark:bg-white/[0.25]" />
        </div>

        <div className="flex items-center justify-between gap-4 py-5">
          <h2 className="text-[15px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Music</h2>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-600">
            {musicScenes.length} scenes
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-5">
            {musicScenes.map((s) => (
              <div key={s.scene}>
                <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
                  {s.scene}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {s.artists.map((a) => (
                    <span
                      key={a}
                      className="rounded-[6px] border border-black/30 bg-zinc-100 px-2.5 py-1 text-[12.5px] font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:border-white/[0.15] dark:bg-[#0a0a0a] dark:text-zinc-400 dark:hover:text-zinc-200"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-[4px] rounded-[10px] border border-black/5 dark:border-white/5" />
            <div className="relative overflow-hidden rounded-[6px] border border-black/5 bg-zinc-50 p-3 dark:border-white/5 dark:bg-[#09090b]">
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
                  height="352"
                  frameBorder="0"
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  className="block w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pb-3 pt-8">
          <h3 className="font-mono text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
            Albums on rotation
          </h3>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-600">
            {String(albums.length).padStart(2, "0")} records
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {albums.map((album) => (
            <a
              key={album.id}
              href={`https://open.spotify.com/album/${album.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-500"
            >
              <div className="relative aspect-square overflow-hidden rounded-[6px] border border-black/5 bg-zinc-100 dark:border-white/5 dark:bg-[#0a0a0a]">
                <Image
                  src={album.cover}
                  alt={`${album.title} by ${album.artist}`}
                  fill
                  sizes="(min-width: 1024px) 18vw, 45vw"
                  quality={75}
                  className="object-cover saturate-[.85] transition-[filter,transform] duration-500 ease-out group-hover:saturate-100 motion-safe:group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="truncate text-[12.5px] font-medium text-zinc-800 dark:text-zinc-200">
                  {album.title}
                </p>
                <p className="truncate font-mono text-[10px] text-zinc-400 dark:text-zinc-600">
                  {album.artist} · {album.year}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="relative mt-10">
          <div className="pointer-events-none absolute -left-[100vw] -right-[100vw] bottom-0 h-0 border-b border-black/30 dark:border-white/[0.15]" style={horizontalDots} />
          <div className="pointer-events-none absolute -bottom-px -left-4 z-10 h-[2px] w-[2px] bg-black/50 dark:bg-white/[0.25]" />
          <div className="pointer-events-none absolute -bottom-px -right-4 z-10 h-[2px] w-[2px] bg-black/50 dark:bg-white/[0.25]" />
        </div>
      </main>
    </div>
  );
}
