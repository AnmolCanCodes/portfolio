"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { portfolio } from "~/portfolio.config";

const GISCUS_ORIGIN = "https://giscus.app";

/**
 * Comments backed by GitHub Discussions. The script injects an iframe, so the
 * theme cannot be set with a className - it is handed over at load time and
 * then updated by postMessage whenever the site theme changes.
 */
export function Guestbook() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "light" ? "light" : "dark";

  useEffect(() => {
    const host = ref.current;
    if (!host || host.querySelector("iframe, script")) return;

    const script = document.createElement("script");
    script.src = `${GISCUS_ORIGIN}/client.js`;
    script.async = true;
    script.crossOrigin = "anonymous";
    Object.entries({
      repo: portfolio.giscus.repo,
      "repo-id": portfolio.giscus.repoId,
      category: portfolio.giscus.category,
      "category-id": portfolio.giscus.categoryId,
      // One thread for the whole guestbook, keyed on a fixed term rather than
      // the pathname, so renaming the route never orphans existing entries.
      mapping: "specific",
      term: "guestbook",
      strict: "0",
      "reactions-enabled": "1",
      // Metadata carries the comment count, which tells the homepage cache
      // when a new note has landed (see the message listener below).
      "emit-metadata": "1",
      "input-position": "top",
      theme,
      lang: "en",
      loading: "lazy",
    }).forEach(([k, v]) => script.setAttribute(`data-${k}`, String(v)));

    host.appendChild(script);
    // The script is only read on first load; the theme effect below handles
    // later changes, so this deliberately does not depend on `theme`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // giscus posts the discussion's metadata on load and again after every new
  // comment. Each new count is handed to /api/guestbook, which refreshes the
  // homepage's cached notes if they are behind.
  useEffect(() => {
    let lastTotal: number | undefined;
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== GISCUS_ORIGIN) return;
      const giscus = event.data?.giscus;
      // The metadata message always carries a `discussion` key, but it is null
      // once the thread has no comments left. Reading totalCommentCount off it
      // and bailing when the result is not a number meant deleting the last
      // note never pinged - the one case where the homepage is most obviously
      // wrong. Treat "discussion present but empty" as a count of zero.
      if (!giscus || !("discussion" in giscus)) return;
      const total = giscus.discussion?.totalCommentCount ?? 0;
      if (typeof total !== "number" || total === lastTotal) return;
      lastTotal = total;
      fetch("/api/guestbook", { method: "POST" }).catch(() => {});
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    const frame = ref.current?.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
    frame?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, GISCUS_ORIGIN);
  }, [theme]);

  return <div ref={ref} className="giscus min-h-[220px]" />;
}
