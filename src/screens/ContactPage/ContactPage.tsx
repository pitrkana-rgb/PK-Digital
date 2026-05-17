import { useEffect } from "react";
import { Header } from "../../components/Header";
import { LandingStylePageRoot } from "../../components/PageBackground";
import { SiteFooterSection } from "../AiLandingPage/sections/SiteFooterSection/SiteFooterSection";
import { AboutMeHeroSection } from "../AboutPage/AboutMeHeroSection";
import { AboutPageContent } from "../AboutPage/AboutPageContent";

export const ContactPage = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LandingStylePageRoot
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: "none",
        color: "#070B14",
      }}
    >
      <Header />

      <div style={{ position: "relative", zIndex: 1 }}>
        <AboutMeHeroSection />
        <AboutPageContent />
      </div>

      <SiteFooterSection />
    </LandingStylePageRoot>
  );
};
