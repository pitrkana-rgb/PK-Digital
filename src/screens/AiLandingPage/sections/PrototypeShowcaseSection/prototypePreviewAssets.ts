/** Base path for `public/prototype-previews/{id}/` (run `npm run prototype-previews`). */
export const PROTOTYPE_PREVIEW_WIDTHS = [480, 720, 960, 1280, 1600] as const;

export const PROTOTYPE_PREVIEW_SIZES =
  "(min-width: 901px) calc((min(100vw, 1400px) - 48px - 64px) / 3), (min-width: 640px) 88vw, 92vw";

export const prototypePreviewBasePath = (imageId: string) =>
  `/prototype-previews/${imageId}`;

/** Intrinsic 16:9 dimensions for layout stability (largest variant). */
export const PROTOTYPE_PREVIEW_INTRINSIC = { width: 1280, height: 720 } as const;
