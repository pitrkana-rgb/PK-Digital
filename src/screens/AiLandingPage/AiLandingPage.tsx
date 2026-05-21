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

          <section className="section-mb-mobile">
            <CoNabizimeSection />
          </section>

          <section className="section-mb-mobile prototype-section-wrap">
            <PrototypeShowcaseSection />
          </section>

          <div
            className="how-unified pk-section-soft-band"
            style={{
              width: "100%",
              background: pk.gradientSectionSoft,
              color: pk.ink,
              position: "relative",
              overflowX: "hidden",
            }}
          >
            <section id="features" className="how-unified__section">
              <AiDesignFeaturesSection />
            </section>
            <section id="why-us" className="how-unified__section section-mb-mobile">
              <WhyChooseUsSection />
            </section>
          </div>

          <section className="section-mb-mobile">
            <ClientTestimonialsSection />
          </section>

          {/* Price calculator hidden – uncomment to show */}
          {/* <section id="calculator" data-animate-on-scroll className="section-mb-mobile">
          <PriceCalculatorSection />
        </section> */}

          <section className="section-mb-mobile">
            <FrequentlyAskedQuestionsSection />
          </section>

          <section className="section-mb-mobile">
            <ReadyToDesignSection />
          </section>

          <SiteFooterSection />
        </section>
      </main>

      <style>{`
        /* Subheadings & descriptive copy — clean black on light sections, white on dark */
        .section-sub {
          color: var(--pk-ink) !important;
        }
        .offer-desc,
        .offer-bullets li,
        .offer-bullets--checks li,
        .offer-features-subheading,
        .why-trust-sub,
        .prototype-item-desc,
        .gr-stats-sub,
        .gr-stats-note,
        .gr-review-body {
          color: var(--pk-ink);
        }
        .pk-section-soft-band .section-sub,
        #features .how-sub.section-sub,
        #features .how-step-desc {
          color: var(--pk-ink) !important;
        }
        .google-reviews-section--on-hero .gr-stats-sub,
        .google-reviews-section--on-hero .gr-stats-note,
        .google-reviews-section--on-hero .google-reviews-heading,
        .google-reviews-section--on-hero .gr-stats-rating-value,
        .google-reviews-section--on-hero .gr-stats-score,
        .google-reviews-section--on-hero .gr-stats-link,
        .google-reviews-section--on-hero .gr-stats-link-mobile {
          color: var(--pk-on-dark) !important;
        }
        .how-unified__section {
          margin: 0;
        }
        .how-unified__section > section {
          margin: 0;
        }

        .hero-subheading,
        .hero-trust-under-cta {
          color: var(--pk-on-dark) !important;
        }

        @media (max-width: 1024px) {
          .prototype-section-wrap {
            overflow: visible;
          }
        }

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
