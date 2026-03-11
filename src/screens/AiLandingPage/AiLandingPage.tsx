import { useEffect, useState } from "react";
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

export const AiLandingPage = (): JSX.Element => {
  const [videoReady, setVideoReady] = useState(false);

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
      style={{ backgroundColor: "#000", fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
    >
      {/* ── Noise texture overlay ───────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none",
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
      {/* ── Top hero background: looping video + bottom fade ──────────── */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none overflow-hidden"
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
          {/* Desktop / fallback */}
          <source src="/Background_video.mov" type="video/mp4" />
          <source src="/Background_video.mov" type="video/quicktime" />
        </video>
        {/* Dark overlay so text stays readable */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.60)" }}
        />
        {/* Bottom fade into page */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 70%, #000000 100%)",
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
        @media(max-width:768px) {
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
