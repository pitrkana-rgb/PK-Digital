export function webpSrcSet(basePath: string, widths: readonly number[]): string {
  return widths.map((w) => `${basePath}/preview-${w}.webp ${w}w`).join(", ");
}

export function webpDefaultSrc(basePath: string, fallbackWidth = 1280): string {
  return `${basePath}/preview-${fallbackWidth}.webp`;
}
