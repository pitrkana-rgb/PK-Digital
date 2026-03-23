import { useEffect, useRef, useState } from "react";

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
import { AiDesignFeaturesSection } from "./sections/AiDesignFeaturesSection/AiDesignFeaturesSection";
import { FrequentlyAskedQuestionsSection } from "./sections/FrequentlyAskedQuestionsSection";
import { MainHeroSection } from "./sections/MainHeroSection";
import { ReadyToDesignSection } from "./sections/ReadyToDesignSection";
import { SiteFooterSection } from "./sections/SiteFooterSection/SiteFooterSection";
import { SubscriptionPlansSection } from "./sections/SubscriptionPlansSection/SubscriptionPlansSection";
import { UserTestimonialsSection } from "./sections/UserTestimonialsSection";
import { ClientTestimonialsSection } from "./sections/ClientTestimonialsSection";
import { WhyChooseUsSection } from "./sections/WhyChooseUsSection/WhyChooseUsSection";
import { CoNabizimeSection } from "./sections/CoNabizimeSection/CoNabizimeSection";
// Hidden for now – re-enable by uncommenting import and section below
// import { PriceCalculatorSection } from "./sections/PriceCalculatorSection/PriceCalculatorSection";
import { Header } from "../../components/Header";
import { landingPageSurfaceStyle, NoiseTextureOverlay } from "../../components/PageBackground";

export const AiLandingPage = (): JSX.Element => {
  const [videoReady, setVideoReady] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroLoopBlendRef = useRef<HTMLDivElement>(null);

  /* Drive loop-seam dark fade via rAF (smoother than timeupdate) */
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

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      "[data-animate-on-scroll]",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            entry.target.classList.remove("opacity-0", "translate-y-6");
          }
        });
      },
      { threshold: 0.15 },
    );

    sections.forEach((section) => {
      section.classList.add("opacity-0", "translate-y-6");
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="relative w-full min-h-screen overflow-x-hidden"
      style={{
        ...landingPageSurfaceStyle,
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      }}
    >
      <NoiseTextureOverlay />
      {/* ── Top hero background: looping video + bottom fade ──────────── */}
      <div
        className="hero-video-bg-wrap absolute top-0 left-0 w-full pointer-events-none overflow-hidden"
        style={{ height: "900px", zIndex: 0 }}
        aria-hidden="true"
      >
        {/* Poster: instant render before video loads */}
        <div
          className="hero-video-poster"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url(/hero-video-poster.jpg)",
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
          poster="/hero-video-poster.jpg"
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
          {/* Mobile: Background_video_mobile.mp4 */}
          <source src="/Background_video_mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
          {/* Desktop / fallback — Images/Background_video_V3.mp4 */}
          <source src="/Background_video_V3.mp4" type="video/mp4" />
        </video>
        {/* Extra black at loop boundary (last 1s → black, then fade up after restart) */}
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
        {/* Base dark scrim (reduced by additional 10%) */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.61)" }}
        />
        {/* Bottom fade into page */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(1,2,4,0) 55%, rgba(1,2,4,0.72) 82%, #010204 100%)",
          }}
        />
        {/* Hard bottom edge mask — ensures video seam is hidden */}
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{
            height: "240px",
            background: "linear-gradient(to bottom, rgba(1,2,4,0) 0%, #010204 82%)",
          }}
        />
      </div>

      <Header />

      <main className="relative">
        <section id="hero">
          <MainHeroSection />
        </section>

        <section id="trust" data-animate-on-scroll>
          <UserTestimonialsSection />
        </section>

        <section id="features" data-animate-on-scroll className="section-mb-mobile">
          <AiDesignFeaturesSection />
        </section>

        <section id="co-nabizime" data-animate-on-scroll className="section-mb-mobile">
          <CoNabizimeSection />
        </section>

        <section id="why-us" data-animate-on-scroll className="section-mb-mobile">
          <WhyChooseUsSection />
        </section>

        <section data-animate-on-scroll className="section-mb-mobile">
          <ClientTestimonialsSection />
        </section>

        <section id="pricing" data-animate-on-scroll className="section-mb-mobile">
          <SubscriptionPlansSection />
        </section>

        {/* Price calculator hidden – uncomment to show */}
        {/* <section id="calculator" data-animate-on-scroll className="section-mb-mobile">
          <PriceCalculatorSection />
        </section> */}

        <section id="faq" data-animate-on-scroll className="section-mb-mobile">
          <FrequentlyAskedQuestionsSection />
        </section>

        <section data-animate-on-scroll className="section-mb-mobile">
          <ReadyToDesignSection />
        </section>

        <SiteFooterSection />
      </main>

      <style>{`
        /* Wide desktop: keep top of hero video in frame */
        @media (min-width: 1200px) {
          .hero-video-bg-wrap .hero-video {
            object-position: center top !important;
          }
          .hero-video-bg-wrap .hero-video-poster {
            background-position: center top !important;
            background-size: cover;
          }
        }

        @media(max-width:768px) {
          /* Hero video area: 30% shorter on mobile (900px → 630px) */
          .hero-video-bg-wrap {
            height: 630px !important;
          }
          .hero-section-mobile { margin-top: -200px !important; }
          .hero-content-wrap { margin-top: -220px !important; }
          .stats-section { margin-top: -50px !important; }

          /* ── Unified section subheading size (matches hero mobile: 14px) ── */
          .section-sub {
            font-size: 14px !important;
            line-height: 1.55 !important;
          }

          /* ── Reduce section internal padding on mobile to tighten spacing ── */
          #features > section,
          #co-nabizime > section,
          #why-us > section,
          #pricing > section,
          #faq > section {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }
          /* Client testimonials + ReadyToDesign (no ID on wrapper) */
          .section-mb-mobile > section {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};
