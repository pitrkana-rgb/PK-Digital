import type { Slide } from "./offerSlideTypes";
import { webpDefaultSrc } from "../../../../utils/responsiveWebp";
import {
  heroDesktopBasePath,
  heroMobileBasePath,
} from "../MainHeroSection/heroPreviewAssets";
import { offerSlideBasePath } from "./offerPreviewAssets";

const preloadImage = (src: string): Promise<void> =>
  new Promise((resolve) => {
    const img = new Image();
    const done = () => resolve();
    img.onload = done;
    img.onerror = done;
    img.src = src;
  });

const preloadCache = new Map<string, Promise<void>>();

export const getOfferPreloadUrls = (slide: Slide, isMobile: boolean): string[] => {
  switch (slide.id) {
    case "tvorba-webu":
      return [
        webpDefaultSrc(heroDesktopBasePath("profitherm"), isMobile ? 960 : 1280),
        webpDefaultSrc(heroMobileBasePath("profitherm"), 640),
      ];
    case "upgrade-webu":
      return [
        webpDefaultSrc(offerSlideBasePath("modernizace-before"), isMobile ? 720 : 960),
        webpDefaultSrc(offerSlideBasePath("modernizace-after"), isMobile ? 720 : 960),
      ];
    case "webove-aplikace":
      return [webpDefaultSrc(offerSlideBasePath("web-app"), isMobile ? 720 : 960)];
    case "automatizace-ai":
      return [webpDefaultSrc(offerSlideBasePath("ai-bot"), isMobile ? 720 : 960)];
    default:
      return [];
  }
};

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Preload only assets for the active slide; cached per slide + viewport. */
export const preloadOfferSlideMedia = (
  slide: Slide,
  isMobile: boolean,
): Promise<void> => {
  const cacheKey = `${slide.id}:${isMobile ? "m" : "d"}`;
  const cached = preloadCache.get(cacheKey);
  if (cached) return cached;

  const urls = getOfferPreloadUrls(slide, isMobile);
  const budgetMs = isMobile ? 480 : 2400;

  const task = Promise.race([
    Promise.all(urls.map(preloadImage)),
    sleep(budgetMs),
  ]).then(() => undefined);

  preloadCache.set(cacheKey, task);
  return task;
};
