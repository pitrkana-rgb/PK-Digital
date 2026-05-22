import type { CSSProperties } from "react";
import { webpDefaultSrc, webpSrcSet } from "../utils/responsiveWebp";

type ResponsiveWebpImageProps = {
  basePath: string;
  widths: readonly number[];
  sizes: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
};

export const ResponsiveWebpImage = ({
  basePath,
  widths,
  sizes,
  width,
  height,
  className,
  style,
  loading = "lazy",
  fetchPriority,
}: ResponsiveWebpImageProps): JSX.Element => {
  const fallback = widths.includes(1280) ? 1280 : widths[widths.length - 1];

  return (
    <img
      src={webpDefaultSrc(basePath, fallback)}
      srcSet={webpSrcSet(basePath, widths)}
      sizes={sizes}
      width={width}
      height={height}
      alt=""
      className={className}
      style={style}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      draggable={false}
      aria-hidden
    />
  );
};
