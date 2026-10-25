import { revalidatePath, revalidateTag } from "next/cache";
import { GUESTBOOK_TAG, getLiveGuestbookTotal } from "@/lib/stats/guestbook";

/**
 * Pinged by the giscus widget on /guestbook whenever the comment count changes.
 * The homepage renders notes from a cached GitHub fetch, so without this a note
 * only shows up once the cache and the prerendered page both expire.
 *
 * This used to skip the revalidate when the cached count already matched
 * GitHub's. That guard was self-defeating: reading the cached count here is
 * itself a tagged fetch, so once the data cache had expired this handler
 * refreshed it, saw the two agree, and returned without marking anything stale
 * - while the prerendered homepage still held the old notes. Deleting the last
 * note left the homepage showing it permanently. The data cache and the route
 * cache are different caches; only one of them was ever being compared.
 *
 * So: always mark stale, and bound abuse with a throttle instead of a
 * correctness check. Regenerating a page that did not change is cheap and
 * idempotent; serving a note the author deleted is not.
 */

/**
 * Per-instance, so it bounds a single hot lambda rather than the whole deploy.
 * That is deliberate - this only needs to stop one widget from pinging on every
 * resize message, not to be a real rate limiter.
 */
let lastPingAt = 0;
const THROTTLE_MS = 15_000;

export async function POST() {
  try {
    const now = Date.now();
    if (now - lastPingAt < THROTTLE_MS) {
      return Response.json({ revalidated: false, throttled: true });
    }
    lastPingAt = now;

    // expire: 0 so whoever just signed (or just deleted) sees the change on the
    // very next load, instead of one more stale render while it regenerates.
    revalidateTag(GUESTBOOK_TAG, { expire: 0 });
    // revalidateTag drops the tagged data; revalidatePath drops the homepage's
    // prerendered output. The docs are explicit that these are separate and may
    // need to be used together, and this bug is what "may" looks like.
    revalidatePath("/");

    const total = await getLiveGuestbookTotal().catch(() => null);
    return Response.json({ revalidated: true, total });
  } catch (error) {
    console.error("[guestbook] revalidate failed:", error);
    return Response.json({ revalidated: false }, { status: 500 });
  }
}
