import { useEffect } from "react";
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
import { Header } from "../../components/Header";

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
      style={{ backgroundColor: "#000000", fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
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
      {/* ── Top hero background: zooming image + bottom fade ─────────── */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none overflow-hidden"
        style={{ height: "900px", zIndex: 0 }}
        aria-hidden="true"
      >
        <div
          className="animate-bg-zoom absolute"
          style={{
            inset: "-5%",
            backgroundImage: `url('/background.png')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 70%, #000000 100%)",
          }}
        />
      </div>

      <Header />

      <main className="relative" style={{ zIndex: 1 }}>
        <section id="hero">
          <MainHeroSection />
        </section>

        <section id="trust" data-animate-on-scroll style={{ backgroundColor: "transparent" }}>
          <UserTestimonialsSection />
        </section>

        <section id="features" data-animate-on-scroll style={{ backgroundColor: "#000000" }}>
          <AiDesignFeaturesSection />
        </section>

        <section id="co-nabizime" data-animate-on-scroll style={{ backgroundColor: "#000000" }}>
          <CoNabizimeSection />
        </section>

        <section id="why-us" data-animate-on-scroll style={{ backgroundColor: "#000000" }}>
          <WhyChooseUsSection />
        </section>

        <section data-animate-on-scroll style={{ backgroundColor: "#000000" }}>
          <ClientTestimonialsSection />
        </section>

        <section id="pricing" data-animate-on-scroll style={{ backgroundColor: "#000000" }}>
          <SubscriptionPlansSection />
        </section>

        <section id="faq" data-animate-on-scroll style={{ backgroundColor: "#000000" }}>
          <FrequentlyAskedQuestionsSection />
        </section>

        <section data-animate-on-scroll style={{ backgroundColor: "#000000" }}>
          <ReadyToDesignSection />
        </section>

        <SiteFooterSection />
      </main>

      <style>{`
        @media(max-width:768px) {
          .header-logo { height: 38px !important; }
          .header-nav { padding-top: 5px !important; padding-bottom: 5px !important; }
          .hero-section-mobile { margin-top: -200px !important; }
          .hero-content-wrap { margin-top: -220px !important; }
          .stats-section { margin-top: -50px !important; }
        }
      `}</style>
    </div>
  );
};
