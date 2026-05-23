export const OFFER_SLIDE_WIDTHS = [480, 720, 960, 1280] as const;

/** Right-column mockup on mobile (full card width). */
export const OFFER_SLIDE_SIZES_MOBILE = "92vw";

/** Right-column mockup on desktop (~56% of card, scaled 0.85). */
export const OFFER_SLIDE_SIZES_DESKTOP = "(min-width: 901px) min(520px, 42vw), 92vw";

export const offerSlideBasePath = (assetId: string) => `/offer-previews/${assetId}`;

export const OFFER_ASSET_INTRINSIC = {
  "web-app": { width: 1223, height: 817 },
  "ai-bot": { width: 1536, height: 1024 },
  "modernizace-before": { width: 1622, height: 1020 },
  "modernizace-after": { width: 1622, height: 1020 },
} as const;

export type OfferAssetId = keyof typeof OFFER_ASSET_INTRINSIC;

export const offerSlideSizes = (isMobile: boolean) =>
  isMobile ? OFFER_SLIDE_SIZES_MOBILE : OFFER_SLIDE_SIZES_DESKTOP;
