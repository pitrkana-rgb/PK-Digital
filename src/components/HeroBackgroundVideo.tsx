import { useState } from "react";
import heroBackgroundUrl from "../../Images/Hero_background.png";
import { pk } from "../design/pkLandingColors";

/**
 * Top-of-page looping hero background (same asset as desktop everywhere).
 * Absolute positioning; parent should be `relative`.
 */
export const HeroBackgroundVideo = (): JSX.Element => {
  const [ready, setReady] = useState(false);

  return (
    <>
      <div
        className="hero-video-bg-wrap absolute top-0 left-0 w-full pointer-events-none overflow-hidden"
        style={{ height: "900px", zIndex: 0 }}
        aria-hidden="true"
      >
        <img
          src={heroBackgroundUrl}
          alt=""
          aria-hidden="true"
          draggable={false}
          onLoad={() => setReady(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "right center",
            display: "block",
            opacity: ready ? 1 : 0,
            transform: ready ? "scale(1)" : "scale(1.02)",
            transition: "opacity 900ms cubic-bezier(0.2,0.8,0.2,1), transform 1400ms cubic-bezier(0.2,0.8,0.2,1)",
            filter: "saturate(1.02) contrast(1.02)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: pk.black61 }}
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
        @media (min-width: 1200px) {
          /* Keep the right side always visible */
          .hero-video-bg-wrap img { object-position: right top !important; }
        }
        @media (max-width: 768px) {
          .hero-video-bg-wrap {
            height: 630px !important;
          }
        }
      `}</style>
    </>
  );
};
