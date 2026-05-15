/** Fixed header clearance when scrolling to in-page anchors. */
export const SECTION_SCROLL_OFFSET = 96;

export function scrollToSectionId(targetId: string): void {
  const element = document.getElementById(targetId);
  if (!element) return;
  const top = element.getBoundingClientRect().top + window.scrollY - SECTION_SCROLL_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}
