import { portfolio } from "~/portfolio.config";

/**
 * Re-exported from `portfolio.config.ts` so every component keeps its existing
 * import. Edit the config file - these are just views onto it.
 */
export const handles = portfolio.handles;
export const email = portfolio.email;
export const resume = portfolio.resume;

/** Cal.com booking link used by the "Book an intro call" button. */
export const bookingLink = portfolio.bookingLink;
