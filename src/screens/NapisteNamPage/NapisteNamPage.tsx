import { useEffect } from "react";
import { Header } from "../../components/Header";
import { LandingStylePageRoot } from "../../components/PageBackground";
import { SiteFooterSection } from "../AiLandingPage/sections/SiteFooterSection/SiteFooterSection";
import { ContactFormBlock } from "../AiLandingPage/sections/ContactSection/ContactFormBlock";

export const NapisteNamPage = (): JSX.Element => {
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

      <main className="relative napiste-nam-main" style={{ zIndex: 1 }}>
        <ContactFormBlock />
      </main>

      <SiteFooterSection />

      <style>{`
        .napiste-nam-main {
          padding-top: 120px;
        }
        @media (max-width: 768px) {
          .napiste-nam-main {
            padding-top: 100px;
          }
        }
      `}</style>
    </LandingStylePageRoot>
  );
};
