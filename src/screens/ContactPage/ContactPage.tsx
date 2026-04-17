import { useEffect } from "react";
import { Header } from "../../components/Header";
import { LandingStylePageRoot } from "../../components/PageBackground";
import { SiteFooterSection } from "../AiLandingPage/sections/SiteFooterSection/SiteFooterSection";
import { CompanyInfoBlock } from "../AiLandingPage/sections/ContactSection/CompanyInfoBlock";
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

      <div style={{ position: "relative", zIndex: 1, paddingTop: "120px" }}>
        <CompanyInfoBlock />
        <AboutPageContent />
      </div>

      <SiteFooterSection />
    </LandingStylePageRoot>
  );
};
