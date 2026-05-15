declare global {
  interface Window {
    /** Google Tag Manager standard queue — created by snippet in index.html */
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * GTM lead conversion — call only after the backend confirms a successful submit.
 *
 * SPA (React Router): GTM boots once from index.html; `dataLayer` persists across navigations,
 * so each successful form send pushes a discrete event for triggers.
 *
 * Does not run on validation errors or failed fetches — callers must invoke only inside success paths.
 */
export function pushLeadFormSubmitSuccessToDataLayer(): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "lead_form_submit" });
}
