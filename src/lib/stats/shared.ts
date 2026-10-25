import type { HeatmapDay } from "@/types";

export const REVALIDATE = 60 * 60 * 6; // 6 hours

/**
 * Every stats section renders from live data when it can and from the committed
 * snapshot when it cannot. LeetCode's GraphQL is unofficial and does change -
 * this is why a bad day upstream degrades a number instead of blanking a section.
 */
export async function withFallback<T extends { stale: boolean }>(
  label: string,
  live: () => Promise<Omit<T, "stale">>,
  fallback: Omit<T, "stale">,
): Promise<T> {
  try {
    const data = await live();
    return { ...data, stale: false } as T;
  } catch (error) {
    console.warn(`[stats] ${label} fell back to snapshot:`, error);
    return { ...fallback, stale: true } as T;
  }
}

/** Buckets a day's count into the 0-4 scale both heatmaps share. */
export function toLevel(count: number, max: number): HeatmapDay["level"] {
  if (count <= 0) return 0;
  const step = Math.max(max, 4) / 4;
  if (count <= step) return 1;
  if (count <= step * 2) return 2;
  if (count <= step * 3) return 3;
  return 4;
}

/** Trailing `days` calendar ending today, so a sparse feed still renders a full grid. */
export function buildCalendar(counts: Map<string, number>, days = 365): HeatmapDay[] {
  const max = Math.max(1, ...counts.values());
  const out: HeatmapDay[] = [];
  const cursor = new Date();
  cursor.setUTCHours(0, 0, 0, 0);
  cursor.setUTCDate(cursor.getUTCDate() - (days - 1));

  for (let i = 0; i < days; i++) {
    const date = cursor.toISOString().slice(0, 10);
    const count = counts.get(date) ?? 0;
    out.push({ date, count, level: toLevel(count, max) });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return out;
}

/**
 * Every upstream here is either an unofficial endpoint or an HTML scrape, and a
 * build machine's IP gets rate-limited or blackholed far more often than a
 * laptop's. `withFallback` only catches rejections, and undici's default
 * headers timeout is 300s - so a host that accepts the connection and then
 * stalls costs five minutes per call before anything throws. Six of those is a
 * build that looks hung. Each request carries its own deadline instead.
 */
export const FETCH_TIMEOUT_MS = 8000;

export function requestTimeout(ms = FETCH_TIMEOUT_MS): AbortSignal {
  return AbortSignal.timeout(ms);
}
