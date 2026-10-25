"use client";

import { useEffect } from "react";

/**
 * The archive pages link back to `/#anime`, `/#highlights` and so on so the
 * reader lands on the section they came from. The hash does its job during
 * that scroll and then just sits in the address bar, so it is dropped once
 * the page has settled.
 *
 * Mount-only on purpose: clicking an index link should still put the hash
 * there while the smooth scroll runs.
 */
export function CleanHash() {
  useEffect(() => {
    const { hash, pathname, search } = window.location;
    if (!hash) return;

    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    // Let the browser finish its own hash scroll before rewriting the URL,
    // otherwise the jump is cancelled and the reader lands at the top.
    const frame = requestAnimationFrame(() => {
      target.scrollIntoView();
      window.history.replaceState(null, "", pathname + search);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return null;
}
