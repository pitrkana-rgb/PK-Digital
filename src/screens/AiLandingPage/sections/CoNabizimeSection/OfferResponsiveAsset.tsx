import type { CSSProperties } from "react";
import {
  OFFER_ASSET_INTRINSIC,
  OFFER_SLIDE_WIDTHS,
  offerSlideBasePath,
  offerSlideSizes,
  type OfferAssetId,
} from "./offerPreviewAssets";
import webAppFallback from "../../../../../Images/Web_app.png";
import aiBotFallback from "../../../../../Images/AI bot.png";
import modernizaceBeforeFallback from "../../../../../Images/Modernizace/Before.png";
import modernizaceAfterFallback from "../../../../../Images/Modernizace/After.png";
import { webpSrcSet } from "../../../../utils/responsiveWebp";

const FALLBACK_BY_ASSET: Record<OfferAssetId, string> = {
  "web-app": webAppFallback,
  "ai-bot": aiBotFallback,
  "modernizace-before": modernizaceBeforeFallback,
  "modernizace-after": modernizaceAfterFallback,
};

type OfferResponsiveAssetProps = {
  assetId: OfferAssetId;
  isMobile: boolean;
  className?: string;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
};

export const OfferResponsiveAsset = ({
  assetId,
  isMobile,
  className,
  style,
  loading = "lazy",
  fetchPriority,
}: OfferResponsiveAssetProps): JSX.Element => {
  const intrinsic = OFFER_ASSET_INTRINSIC[assetId];
  const sizes = offerSlideSizes(isMobile);
  const webpSet = webpSrcSet(offerSlideBasePath(assetId), OFFER_SLIDE_WIDTHS);

  return (
    <picture style={{ display: "block", width: "100%", height: "100%" }}>
      <source type="image/webp" srcSet={webpSet} sizes={sizes} />
      <img
        src={FALLBACK_BY_ASSET[assetId]}
        alt=""
        className={className}
        style={style}
        width={intrinsic.width}
        height={intrinsic.height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        draggable={false}
        aria-hidden
      />
    </picture>
  );
};
