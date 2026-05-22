import { webpDefaultSrc, webpSrcSet } from "../../../../utils/responsiveWebp";

export const HERO_DESKTOP_WIDTHS = [640, 960, 1280, 1600, 1920] as const;
export const HERO_MOBILE_WIDTHS = [320, 480, 640, 960, 1280] as const;

/** Desktop screen inside PC frame (~72% of composite width at max rail size). */
export const HERO_DESKTOP_SIZES =
  "(min-width: 1024px) 540px, (min-width: 769px) 48vw, 85vw";

/** Phone cutout in frame corner. */
export const HERO_MOBILE_SIZES =
  "(min-width: 1024px) 170px, (min-width: 769px) 20vw, 75vw";

export const HERO_DESKTOP_INTRINSIC = { width: 1108, height: 600 } as const;
export const HERO_MOBILE_INTRINSIC = { width: 327, height: 750 } as const;

export const heroDesktopBasePath = (projectId: string) =>
  `/hero-previews/${projectId}/desktop`;

export const heroMobileBasePath = (projectId: string) =>
  `/hero-previews/${projectId}/mobile`;

export const heroDesktopSrcSet = (projectId: string) =>
  webpSrcSet(heroDesktopBasePath(projectId), HERO_DESKTOP_WIDTHS);

export const heroDesktopDefaultSrc = (projectId: string) =>
  webpDefaultSrc(heroDesktopBasePath(projectId), 1280);

export const heroMobileSrcSet = (projectId: string) =>
  webpSrcSet(heroMobileBasePath(projectId), HERO_MOBILE_WIDTHS);

export const heroMobileDefaultSrc = (projectId: string) =>
  webpDefaultSrc(heroMobileBasePath(projectId), 640);

/** Carousel order in hero frame. */
export const HERO_PROJECT_IDS = ["profitherm", "finance", "reality", "fitness"] as const;
