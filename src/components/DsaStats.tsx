import { getLeetCode } from "@/lib/stats/leetcode";
import { getCodeforces } from "@/lib/stats/codeforces";
import { getCodeChef } from "@/lib/stats/codechef";
import { handles } from "@/data/links";

const dashedX = {
  maskImage:
    "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
  WebkitMaskImage:
    "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
} as const;

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="relative min-w-0 px-3 py-2 after:absolute after:bottom-0 after:right-0 after:top-0 after:w-0 after:border-r after:border-black/30 after:[mask-image:repeating-linear-gradient(to_bottom,black_0,black_1px,transparent_1px,transparent_6px)] dark:after:border-white/[0.15] [&:nth-child(2n)]:after:hidden sm:[&:not(:last-child)]:after:block sm:[&:last-child]:after:hidden">
      <p className="whitespace-nowrap text-[16px] font-bold leading-none text-zinc-900 dark:text-zinc-100">
        {value}
      </p>
      <p className="mt-1 text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-600">
        {label}
      </p>
    </div>
  );
}

function StatCard({
  title,
  handle,
  href,
  stale,
  metrics,
  children,
}: {
  title: string;
  handle: string;
  href: string;
  stale: boolean;
  metrics: { label: string; value: string }[];
  children?: React.ReactNode;
}) {
  return (
    <div className="relative group">
      <div className="absolute -inset-[5px] rounded-[11px] border border-black/5 dark:border-white/5 pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
      <div className="relative flex flex-col rounded-[6px] overflow-hidden bg-zinc-50 dark:bg-[#09090b] border border-black/5 dark:border-white/5 shadow-sm shadow-black/5 dark:shadow-lg dark:shadow-black/80">
        <div className="flex items-center justify-between gap-2 px-4 pt-3 pb-2.5">
          <div className="flex items-center gap-2">
            <h3 className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {title}
            </h3>
            {stale && (
              <span className="px-1.5 py-[1px] rounded-[4px] text-[10px] font-medium uppercase text-zinc-500 dark:text-zinc-500 bg-zinc-200/50 dark:bg-zinc-800/50 border border-zinc-300/50 dark:border-zinc-700/50">
                last known
              </span>
            )}
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[12px] font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
          >
            {handle}
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>

        <div className="h-px bg-black/30 dark:bg-white/[0.15]" style={dashedX} />

        <div className={`grid py-1 ${metrics.length === 3 ? "grid-cols-3" : metrics.length === 5 ? "grid-cols-2 sm:grid-cols-5" : "grid-cols-2 sm:grid-cols-4"}`}>
          {metrics.map((m) => (
            <Metric key={m.label} label={m.label} value={m.value} />
          ))}
        </div>

        {children && (
          <>
            <div className="h-px bg-black/30 dark:bg-white/[0.15]" style={dashedX} />
            <div className="px-4 py-3.5">{children}</div>
          </>
        )}
      </div>
    </div>
  );
}

function RatingSparkline({
  history,
  platform,
}: {
  history: { date: string; rating: number; contest: string }[];
  platform: string;
}) {
  if (history.length < 2) return null;

  const W = 320;
  const H = 64;
  const PAD = 10;
  const ratings = history.map((h) => h.rating);
  const min = Math.min(...ratings);
  const max = Math.max(...ratings);
  const span = Math.max(1, max - min);
  const x = (i: number) => PAD + (i / (history.length - 1)) * (W - PAD * 2);
  const y = (r: number) => H - PAD - ((r - min) / span) * (H - PAD * 2);
  const line = history
    .map((h, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(h.rating).toFixed(1)}`)
    .join(" ");
  const area = `${line} L${x(history.length - 1).toFixed(1)},${H - PAD} L${x(0).toFixed(1)},${H - PAD} Z`;
  const last = history[history.length - 1];

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-[64px] text-zinc-900 dark:text-zinc-100"
        role="img"
        aria-label={`${platform} rating across ${history.length} rated contests, from ${min} to ${max}, currently ${last.rating}`}
      >
        <path d={area} fill="currentColor" fillOpacity="0.07" />
        <path d={line} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeOpacity="0.75" />
        <circle cx={x(history.length - 1)} cy={y(last.rating)} r="3" fill="currentColor" />
        <text x={PAD} y={H - 1} fontSize="9" className="fill-zinc-400 dark:fill-zinc-600">{min}</text>
        <text x={W - PAD} y="9" fontSize="9" textAnchor="end" className="fill-zinc-400 dark:fill-zinc-600">{max}</text>
      </svg>
      <figcaption className="mt-1.5 text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-600">
        Rating across every rated contest
      </figcaption>
    </figure>
  );
}

export async function DsaStats() {
  const [lc, cf, cc] = await Promise.all([getLeetCode(), getCodeforces(), getCodeChef()]);

  const difficulties = [
    { key: "Easy", solved: lc.solved.easy, total: lc.totals.easy },
    { key: "Medium", solved: lc.solved.medium, total: lc.totals.medium },
    { key: "Hard", solved: lc.solved.hard, total: lc.totals.hard },
  ];

  return (
    <div className="relative pt-6 pb-2 grid gap-5 md:grid-cols-2">
      <div className="md:col-span-2">
      <StatCard
        title="LeetCode"
        handle={`@${lc.username}`}
        href={`https://leetcode.com/u/${handles.leetcode}`}
        stale={lc.stale}
        metrics={[
          { label: "Peak", value: lc.maxRating.toLocaleString() },
          { label: "Solved", value: lc.solved.all.toLocaleString() },
          { label: "Contest Rank", value: `Top ${lc.topPercentage}%` },
          { label: "Active Days", value: lc.activeDays.toLocaleString() },
        ]}
      >
        <div className="flex flex-col gap-2.5">
          {difficulties.map((d) => (
            <div key={d.key} className="flex items-center gap-3">
              <span className="w-12 shrink-0 text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-600">
                {d.key}
              </span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div
                  className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100"
                  style={{ width: `${d.total ? Math.min(100, (d.solved / d.total) * 100) : 0}%` }}
                />
              </div>
              <span className="w-[86px] shrink-0 text-right text-[11px] font-medium text-zinc-600 dark:text-zinc-400 tabular-nums">
                {d.solved.toLocaleString()}
                <span className="text-zinc-400 dark:text-zinc-600"> / {d.total.toLocaleString()}</span>
              </span>
            </div>
          ))}
        </div>
      </StatCard>
      </div>

      <StatCard
        title="Codeforces"
        handle={cf.handle}
        href={`https://codeforces.com/profile/${cf.handle}`}
        stale={cf.stale}
        metrics={[
          { label: "Peak", value: cf.maxRating.toLocaleString() },
          { label: "Rank", value: cf.rank.charAt(0).toUpperCase() + cf.rank.slice(1) },
          { label: "Solved", value: cf.solved.toLocaleString() },
        ]}
      >
        <RatingSparkline history={cf.history} platform="Codeforces" />
      </StatCard>

      <StatCard
        title="CodeChef"
        handle={cc.handle}
        href={`https://www.codechef.com/users/${cc.handle}`}
        stale={cc.stale}
        metrics={[
          { label: "Peak", value: cc.maxRating.toLocaleString() },
          { label: "Stars", value: `${cc.stars}\u2605` },
          { label: "Solved", value: cc.solved.toLocaleString() },
        ]}
      >
        <RatingSparkline history={cc.history} platform="CodeChef" />
      </StatCard>
    </div>
  );
}
