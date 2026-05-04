import { pk } from "../design/pkLandingColors";

/**
 * Top-of-page hero backdrop: premium charcoal surface + subtle depth (no bitmap).
 * Absolute positioning; parent should be `relative`.
 */
export const HeroBackgroundVideo = (): JSX.Element => {
  return (
    <>
      <div
        className="hero-video-bg-wrap absolute top-0 left-0 w-full pointer-events-none overflow-hidden"
        style={{ height: "900px", zIndex: 0 }}
        aria-hidden="true"
      >
        <div className="absolute inset-0" style={{ backgroundColor: pk.hero }} />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 120% 85% at 100% 0%, ${pk.accent08} 0%, transparent 55%), radial-gradient(ellipse 90% 70% at 0% 100%, ${pk.violetGlow016} 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: pk.gradientHeroFade,
          }}
        />
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{
            height: "240px",
            background: pk.gradientHeroFadeStrong,
          }}
        />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-video-bg-wrap {
            height: 630px !important;
          }
        }
      `}</style>
    </>
  );
};
