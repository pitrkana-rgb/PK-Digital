declare global {
  interface Window {
    /** Google Tag Manager standard queue — created by snippet in index.html */
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Signal a validated lead submission to Google Tag Manager.
 *
 * Use only after HTTP success is confirmed (`response.ok`).
 * Runs in queueMicrotask so the push clears the synchronous React/fetch chain — Tag Assistant
 * Preview timelines record Custom Events more reliably than synchronous pushes inside `onSubmit`.
 *
 * Mirrors the standard snippet:
 *   window.dataLayer = window.dataLayer || [];
 *   window.dataLayer.push({ event: 'lead_form_submit' });
 */
export function pushLeadFormSubmitSuccessToDataLayer(): void {
  if (typeof window === "undefined") return;

  const flush = (): void => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "lead_form_submit" });
  };

  if (typeof queueMicrotask === "function") {
    queueMicrotask(flush);
  } else {
    Promise.resolve().then(flush);
  }
}
