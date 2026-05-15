import { useEffect } from "react";
import { AiDesignFeaturesSection } from "./sections/AiDesignFeaturesSection/AiDesignFeaturesSection";
import { FrequentlyAskedQuestionsSection } from "./sections/FrequentlyAskedQuestionsSection";
import { MainHeroSection } from "./sections/MainHeroSection";
import { ReadyToDesignSection } from "./sections/ReadyToDesignSection";
import { SiteFooterSection } from "./sections/SiteFooterSection/SiteFooterSection";
import { ClientTestimonialsSection } from "./sections/ClientTestimonialsSection";
import { WhyChooseUsSection } from "./sections/WhyChooseUsSection/WhyChooseUsSection";
import { CoNabizimeSection } from "./sections/CoNabizimeSection/CoNabizimeSection";
import { BrandLogosCarouselSection } from "./sections/BrandLogosCarouselSection/BrandLogosCarouselSection";
import { PrototypeShowcaseSection } from "./sections/PrototypeShowcaseSection/PrototypeShowcaseSection";
// Hidden for now – re-enable by uncommenting import and section below
// import { PriceCalculatorSection } from "./sections/PriceCalculatorSection/PriceCalculatorSection";
import { Header } from "../../components/Header";
import { HeroBackgroundVideo } from "../../components/HeroBackgroundVideo";
import { pk } from "../../design/pkLandingColors";

export const AiLandingPage = (): JSX.Element => {
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
        backgroundColor: pk.page,
        color: pk.ink,
        fontFamily: "'Montserrat', 'Inter', sans-serif",
      }}
    >
      <Header />

      <main className="relative">
        {/* Header + hero */}
        <section
          style={{
            position: "relative",
            backgroundColor: pk.hero,
            color: pk.onDark,
            overflow: "hidden",
            zIndex: 2,
          }}
        >
          <HeroBackgroundVideo />
          <section id="hero">
            <MainHeroSection />
          </section>

        </section>

        {/* White page content */}
        <section style={{ backgroundColor: pk.page, position: "relative", zIndex: 1 }}>
          <section>
            <BrandLogosCarouselSection />
          </section>

          <section data-animate-on-scroll className="section-mb-mobile">
            <CoNabizimeSection />
          </section>

          <section data-animate-on-scroll className="section-mb-mobile">
            <PrototypeShowcaseSection />
          </section>

          <section id="why-us" data-animate-on-scroll className="section-mb-mobile">
            <WhyChooseUsSection />
          </section>

          <section id="features" data-animate-on-scroll className="section-mb-mobile">
            <AiDesignFeaturesSection />
          </section>

          <section className="section-mb-mobile">
            <ClientTestimonialsSection />
          </section>

          {/* Price calculator hidden – uncomment to show */}
          {/* <section id="calculator" data-animate-on-scroll className="section-mb-mobile">
          <PriceCalculatorSection />
        </section> */}

          <section data-animate-on-scroll className="section-mb-mobile">
            <FrequentlyAskedQuestionsSection />
          </section>

          <section data-animate-on-scroll className="section-mb-mobile">
            <ReadyToDesignSection />
          </section>

          <SiteFooterSection />
        </section>
      </main>

      <style>{`
        @media(max-width:768px) {
          /* Hero spacing is handled inside MainHeroSection */
          .stats-section { margin-top: 0 !important; }

          /* ── Unified section subheading size (matches hero mobile: 14px) ── */
          .section-sub {
            font-size: 14px !important;
            line-height: 1.55 !important;
          }

          /* ── Reduce section internal padding on mobile to tighten spacing ── */
          #features > section,
          #co-nabizime > section,
          #why-us > section,
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
