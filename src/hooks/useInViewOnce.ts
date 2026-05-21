import { useEffect, useRef, useState, type RefObject } from "react";

type UseInViewOnceOptions = {
  /** Stable id so reveal survives remounts (e.g. section id). */
  id?: string;
  threshold?: number | number[];
  rootMargin?: string;
};

const revealedById = new Set<string>();
const revealedElements = new WeakSet<Element>();

export function hasBeenRevealed(id: string): boolean {
  return revealedById.has(id);
}

export function markRevealedById(id: string): void {
  revealedById.add(id);
}

/** True only until the entrance sequence for `id` has played once (survives remounts). */
export function useEntranceOnce(
  active: boolean,
  id: string,
  durationMs: number,
): boolean {
  const [play, setPlay] = useState(() => !hasBeenRevealed(id));

  useEffect(() => {
    if (!active || !play) return;
    const timer = window.setTimeout(() => {
      markRevealedById(id);
      setPlay(false);
    }, durationMs);
    return () => window.clearTimeout(timer);
  }, [active, play, id, durationMs]);

  return play;
}

function meetsThreshold(
  ratio: number,
  threshold: number | number[],
): boolean {
  if (Array.isArray(threshold)) {
    return threshold.some((t) => ratio >= t);
  }
  return ratio >= threshold;
}

function isElementInView(
  el: Element,
  threshold: number | number[],
  rootMargin: string,
): boolean {
  if (typeof window === "undefined") return false;
  const root = { top: 0, left: 0, right: window.innerWidth, bottom: window.innerHeight };
  const margin = parseRootMargin(rootMargin);
  const adjusted = {
    top: root.top + margin.top,
    left: root.left + margin.left,
    right: root.right - margin.right,
    bottom: root.bottom - margin.bottom,
  };
  const rect = el.getBoundingClientRect();
  const overlapTop = Math.max(rect.top, adjusted.top);
  const overlapBottom = Math.min(rect.bottom, adjusted.bottom);
  const overlapLeft = Math.max(rect.left, adjusted.left);
  const overlapRight = Math.min(rect.right, adjusted.right);
  const overlapW = Math.max(0, overlapRight - overlapLeft);
  const overlapH = Math.max(0, overlapBottom - overlapTop);
  const overlapArea = overlapW * overlapH;
  const targetArea = rect.width * rect.height;
  const ratio = targetArea > 0 ? overlapArea / targetArea : 0;
  return meetsThreshold(ratio, threshold);
}

function parseRootMargin(margin: string): {
  top: number;
  right: number;
  bottom: number;
  left: number;
} {
  const parts = margin.trim().split(/\s+/).map((p) => parseFloat(p) || 0);
  if (parts.length === 1) {
    return { top: parts[0], right: parts[0], bottom: parts[0], left: parts[0] };
  }
  if (parts.length === 2) {
    return { top: parts[0], right: parts[1], bottom: parts[0], left: parts[1] };
  }
  if (parts.length === 3) {
    return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[1] };
  }
  return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[3] };
}

/**
 * Fires once when the target enters the viewport; stays true after scroll-away and remounts (with `id`).
 */
export function useInViewOnce(
  options: UseInViewOnceOptions = {},
): [RefObject<HTMLElement | null>, boolean] {
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(() =>
    options.id ? revealedById.has(options.id) : false,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { id, threshold = 0.12, rootMargin = "0px" } = optionsRef.current;

    const markRevealed = (): void => {
      revealedElements.add(el);
      if (id) revealedById.add(id);
      setInView(true);
    };

    if (id && revealedById.has(id)) {
      markRevealed();
      return;
    }
    if (revealedElements.has(el)) {
      markRevealed();
      return;
    }

    if (isElementInView(el, threshold, rootMargin)) {
      markRevealed();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (!meetsThreshold(entry.intersectionRatio, threshold)) return;
        markRevealed();
        observer.disconnect();
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [
    JSON.stringify(options.threshold ?? 0.12),
    options.rootMargin ?? "0px",
    options.id ?? "",
  ]);

  return [ref, inView];
}
