import { useEffect, useRef, useState } from "react";

/** Desktop hero asset — used on all breakpoints and routes */
export const HERO_VIDEO_MP4 = "/Background_video_V3.mp4";
export const HERO_VIDEO_POSTER = "/hero-video-poster.jpg";

const smoothstep01 = (x: number) => {
  const t = Math.min(1, Math.max(0, x));
  return t * t * (3 - 2 * t);
};

/** Smooth black blend at loop seam: fade in over last 1s, fade out over first ~0.45s after restart */
function getHeroLoopBlendOpacity(video: HTMLVideoElement): number {
  const d = video.duration;
  if (!Number.isFinite(d) || d <= 0) return 0;
  const t = video.currentTime;
  if (d < 2) {
    const endW = Math.min(0.6, d * 0.35);
    const startW = Math.min(0.35, d * 0.22);
    if (endW > 0 && d - t <= endW) {
      return smoothstep01(1 - (d - t) / endW);
    }
    if (startW > 0 && t < startW) {
      return smoothstep01(1 - t / startW);
    }
    return 0;
  }
  const endWindow = 1;
  const startWindow = 0.45;
  const remaining = d - t;
  if (remaining <= endWindow && remaining >= 0) {
    return smoothstep01(1 - remaining / endWindow);
  }
  if (t < startWindow) {
    return smoothstep01(1 - t / startWindow);
  }
  return 0;
}

/**
 * Top-of-page looping hero background (same asset as desktop everywhere).
 * Absolute positioning; parent should be `relative`.
 */
export const HeroBackgroundVideo = (): JSX.Element => {
  const [videoReady, setVideoReady] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroLoopBlendRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoReady) return;
    const video = heroVideoRef.current;
    const blend = heroLoopBlendRef.current;
    if (!video || !blend) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      blend.style.opacity = "0";
      return;
    }

    let raf = 0;
    const tick = () => {
      if (document.visibilityState === "visible") {
        const o = getHeroLoopBlendOpacity(video);
        blend.style.opacity = String(o);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [videoReady]);

  return (
    <>
      <div
        className="hero-video-bg-wrap absolute top-0 left-0 w-full pointer-events-none overflow-hidden"
        style={{ height: "900px", zIndex: 0 }}
        aria-hidden="true"
      >
        <div
          className="hero-video-poster"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${HERO_VIDEO_POSTER})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: videoReady ? 0 : 1,
            transition: "opacity 0.8s ease-out",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
        <video
          ref={heroVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_VIDEO_POSTER}
          className={`hero-video ${videoReady ? "hero-video-visible" : ""}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            opacity: videoReady ? 1 : 0,
            transition: "opacity 0.8s ease-out",
          }}
          onCanPlay={() => setVideoReady(true)}
        >
          <source src={HERO_VIDEO_MP4} type="video/mp4" />
        </video>
        <div
          ref={heroLoopBlendRef}
          className="absolute inset-0"
          style={{
            background: "#000",
            opacity: 0,
            pointerEvents: "none",
            willChange: "opacity",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.61)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(1,2,4,0) 55%, rgba(1,2,4,0.72) 82%, #010204 100%)",
          }}
        />
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{
            height: "240px",
            background: "linear-gradient(to bottom, rgba(1,2,4,0) 0%, #010204 82%)",
          }}
        />
      </div>

      <style>{`
        @media (min-width: 1200px) {
          .hero-video-bg-wrap .hero-video {
            object-position: center top !important;
          }
          .hero-video-bg-wrap .hero-video-poster {
            background-position: center top !important;
            background-size: cover;
          }
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
