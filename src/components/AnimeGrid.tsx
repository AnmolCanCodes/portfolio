"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { animeSections, type Anime } from "@/data/animeData";

const statusDot: Record<string, string> = {
  Watching: "bg-emerald-500",
  Completed: "bg-zinc-400 dark:bg-zinc-600",
  "On hold": "bg-amber-500",
  Dropped: "bg-zinc-300 dark:bg-zinc-700",
};

const dashedX = {
  maskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
  WebkitMaskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
} as const;

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[9.5px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600">{label}</span>
      <span className="text-[13px] font-medium text-zinc-800 tabular-nums dark:text-zinc-200">{value}</span>
    </div>
  );
}

export function AnimeGrid() {
  const [open, setOpen] = useState<Anime | null>(null);

  return (
    <>
      <div className="flex flex-col gap-10">
        {animeSections.map((section) => (
          <section key={section.id} aria-labelledby={`anime-${section.id}`}>
            <div className="flex items-center justify-between gap-4 pb-3">
              <h3
                id={`anime-${section.id}`}
                className="font-mono text-[10px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-600"
              >
                {section.title}
              </h3>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-600">
                {String(section.items.length).padStart(2, "0")}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {section.items.map((item, index) => (
                <article key={`${item.title}-${index}`} className="group relative">
                  <div className="pointer-events-none absolute -inset-[4px] rounded-[10px] border border-black/5 transition-colors duration-300 group-hover:border-black/10 dark:border-white/5 dark:group-hover:border-white/10" />

                  <button
                    type="button"
                    onClick={() => setOpen(item)}
                    aria-label={`Details for ${item.title}`}
                    className="relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[6px] border border-black/5 bg-zinc-50 text-left shadow-sm shadow-black/5 transition-all duration-300 group-hover:bg-zinc-100/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-white/5 dark:bg-[#09090b] dark:shadow-lg dark:shadow-black/80 dark:group-hover:bg-[#121214] dark:focus-visible:outline-zinc-100"
                  >
                    <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-100 dark:bg-[#0a0a0a]">
                      {item.cover ? (
                        <Image
                          src={item.cover}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
                          quality={70}
                          className="object-cover saturate-[.85] transition-[filter,transform] duration-500 ease-out group-hover:saturate-100 motion-safe:group-hover:scale-[1.03]"
                          draggable={false}
                        />
                      ) : (
                        <div
                          className="absolute inset-0 opacity-[0.06] dark:opacity-[0.05]"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(0deg,transparent,transparent 15px,currentColor 15px,currentColor 16px),repeating-linear-gradient(90deg,transparent,transparent 15px,currentColor 15px,currentColor 16px)",
                          }}
                        />
                      )}

                      <span className="absolute left-1.5 top-1.5 rounded-[4px] bg-black/60 px-1.5 py-[1px] font-mono text-[10px] tabular-nums text-white backdrop-blur-sm">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`absolute right-1.5 top-1.5 h-2 w-2 rounded-full ring-2 ring-black/30 ${statusDot[item.status] ?? statusDot.Completed}`}
                        title={item.status}
                      />
                      {item.score ? (
                        <span className="absolute bottom-1.5 right-1.5 rounded-[4px] bg-black/60 px-1.5 py-[1px] font-mono text-[10px] tabular-nums text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                          {item.score}
                        </span>
                      ) : null}
                    </div>

                    <div className="h-px bg-black/30 dark:bg-white/[0.15]" style={dashedX} />

                    <div className="flex flex-1 flex-col gap-0.5 px-2.5 py-2">
                      <h3 className="text-[12.5px] font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">
                        {item.title}
                      </h3>
                      <p className="font-mono text-[10px] tabular-nums text-zinc-400 dark:text-zinc-600">
                        {item.episodes ? `${item.episodes} ep` : item.note || "—"}
                        {item.year ? ` · ${item.year}` : ""}
                      </p>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Dialog open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-[min(42rem,calc(100vw-2rem))] overflow-hidden p-0 sm:max-w-[42rem]">
          {open ? (
            <div className="flex flex-col sm:flex-row">
              {open.cover ? (
                <div className="relative hidden w-[200px] shrink-0 sm:block">
                  <Image src={open.cover} alt={open.title} fill sizes="200px" className="object-cover" />
                </div>
              ) : null}

              <div className="flex min-w-0 flex-col gap-3 p-5">
                <DialogHeader className="gap-1 text-left">
                  <DialogTitle className="text-[17px] font-bold leading-tight tracking-tight">
                    {open.title}
                  </DialogTitle>
                  <DialogDescription className="font-mono text-[11px] text-zinc-500 dark:text-zinc-500">
                    {[open.year, open.studio, open.status].filter(Boolean).join(" · ")}
                  </DialogDescription>
                </DialogHeader>

                {open.genres?.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    {open.genres.map((g) => (
                      <span
                        key={g}
                        className="rounded-[5px] border border-black/20 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-white/[0.15] dark:bg-[#0a0a0a] dark:text-zinc-400"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                ) : null}

                {open.synopsis ? (
                  <p className="max-h-[11rem] overflow-y-auto text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {open.synopsis}
                  </p>
                ) : (
                  <p className="text-[13px] italic text-zinc-400 dark:text-zinc-600">No synopsis on file.</p>
                )}

                <div className="h-px bg-black/30 dark:bg-white/[0.15]" style={dashedX} />

                <div className="flex flex-wrap items-end gap-x-7 gap-y-3">
                  {open.episodes ? <Meta label="Episodes" value={String(open.episodes)} /> : null}
                  {open.runtime ? <Meta label="Per ep" value={`${open.runtime} min`} /> : null}
                  {open.score ? <Meta label="Score" value={`${open.score}/100`} /> : null}
                  {open.note ? <Meta label="Note" value={open.note} /> : null}

                  {open.url ? (
                    <a
                      href={open.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1 font-mono text-[11px] text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200"
                    >
                      AniList
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
