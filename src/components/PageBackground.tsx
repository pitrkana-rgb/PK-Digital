import type { CSSProperties, ReactNode } from "react";
import { HeroBackgroundVideo } from "./HeroBackgroundVideo";
import { pk } from "../design/pkLandingColors";

/** Same base surface as `AiLandingPage` (gradients + dark tone). */
export const landingPageSurfaceStyle: CSSProperties = {
  backgroundColor: pk.void,
  backgroundImage: pk.gradientPageDepth,
};

export const NoiseTextureOverlay = (): JSX.Element => (
  <div
    aria-hidden="true"
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      pointerEvents: "none",
      opacity: 0.03,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
      backgroundSize: "128px 128px",
    }}
  />
);

type LandingStylePageRootProps = {
  children: ReactNode;
  className?: string;
  /** Merged after defaults (e.g. NotFound tweaks). */
  style?: CSSProperties;
  /** Looping hero video (same as home). Off by default — only `AiLandingPage` includes it directly. */
  includeHeroVideo?: boolean;
};

/**
 * Full-page shell matching the landing page background (gradients + noise). Hero video is landing-only.
 */
export const LandingStylePageRoot = ({
  children,
  className = "",
  style,
  includeHeroVideo = false,
}: LandingStylePageRootProps): JSX.Element => (
  <div
    className={`relative w-full min-h-screen overflow-x-hidden ${className}`}
    style={{
      ...landingPageSurfaceStyle,
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      color: pk.onDark,
      ...style,
    }}
  >
    <NoiseTextureOverlay />
    {includeHeroVideo ? <HeroBackgroundVideo /> : null}
    {children}
  </div>
);
