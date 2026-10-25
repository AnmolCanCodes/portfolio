import { portfolio } from "~/portfolio.config";

/**
 * Canonical origin, in one place. metadataBase, the sitemap and robots.txt all
 * read from here. Edit `portfolio.config.ts`, not this file.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || portfolio.url;
