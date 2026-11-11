import { portfolio } from "~/portfolio.config";

const normalizeOrigin = (value: string): string => value.trim().replace(/\/+$/, "");

const getProductionUrl = (): string | null => {
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  return vercelProductionUrl ? `https://${vercelProductionUrl}` : null;
};

/**
 * Canonical origin, in one place. metadataBase, the sitemap and robots.txt all
 * read from here. Edit `portfolio.config.ts`, not this file.
 */
export const SITE_URL = normalizeOrigin(
  process.env.NEXT_PUBLIC_SITE_URL ??
    getProductionUrl() ??
    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : portfolio.url),
);

export const DEFAULT_TITLE = "Anmol Gupta | AI Backend Developer (RAG and Agent Systems)";
export const DEFAULT_DESCRIPTION =
  "AI backend developer building RAG chatbots, agent workflows and FastAPI backends for small teams and startups. Fixed-scope projects, 3 to 7 days.";
export const DEFAULT_OG_IMAGE_ALT = "Anmol Gupta portfolio preview for AI backend developer, RAG systems, and agent workflows";
export const OG_IMAGE_PATH = "/opengraph-image";
export const OG_IMAGE_URL = new URL(OG_IMAGE_PATH, SITE_URL).toString();
