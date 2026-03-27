import type { CSSProperties, ReactNode } from "react";
import { HeroBackgroundVideo } from "./HeroBackgroundVideo";

/** Same base surface as `AiLandingPage` (gradients + dark tone). */
export const landingPageSurfaceStyle: CSSProperties = {
  backgroundColor: "#010204",
  backgroundImage:
    "radial-gradient(1100px 620px at 12% 100%, rgba(0,229,255,0.02) 0%, rgba(0,229,255,0.00) 68%), radial-gradient(900px 540px at 100% 14%, rgba(123,97,255,0.016) 0%, rgba(123,97,255,0.00) 70%), linear-gradient(180deg, #02040A 0%, #010204 100%)",
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
  /** Same looping hero video as the home page (desktop asset on all breakpoints). Default true. */
  includeHeroVideo?: boolean;
};

/**
 * Full-page shell matching the landing page background (gradients + noise + optional hero video).
 */
export const LandingStylePageRoot = ({
  children,
  className = "",
  style,
  includeHeroVideo = true,
}: LandingStylePageRootProps): JSX.Element => (
  <div
    className={`relative w-full min-h-screen overflow-x-hidden ${className}`}
    style={{
      ...landingPageSurfaceStyle,
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      color: "#fff",
      ...style,
    }}
  >
    <NoiseTextureOverlay />
    {includeHeroVideo ? <HeroBackgroundVideo /> : null}
    {children}
  </div>
);
