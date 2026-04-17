import { useEffect } from "react";
import { Header } from "../../components/Header";
import { LandingStylePageRoot } from "../../components/PageBackground";
import { SiteFooterSection } from "../AiLandingPage/sections/SiteFooterSection/SiteFooterSection";
import { ContactFormBlock } from "../AiLandingPage/sections/ContactSection/ContactFormBlock";
import { ContactMapFaqBlock } from "../AiLandingPage/sections/ContactSection/ContactMapFaqBlock";
import { useLanguage } from "../../i18n/LanguageContext";

export const NapisteNamPage = (): JSX.Element => {
  const { language } = useLanguage();
  const t = language === "en" ? {
    reply: "We reply within 24h",
    titlePre: "Take the first step to your new website.",
    titleAccent: "It only takes 5 minutes.",
  } : {
    reply: "Odpovídáme do 24h",
    titlePre: "Udělejte první krok k novému webu.",
    titleAccent: "Zabere to jen 5 minut.",
  };
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

      <section className="contact-hero" style={{ position: "relative", paddingTop: "160px", paddingBottom: "48px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{ marginBottom: "24px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(0,229,255,0.10)", border: "1px solid rgba(0,229,255,0.18)",
              borderRadius: "99px", padding: "6px 16px",
              fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "12px", color: "#0f6b78",
              textTransform: "uppercase", letterSpacing: "0.1em"
            }}>
              <span style={{ width: "8px", height: "8px", background: "#0f6b78", borderRadius: "50%", display: "inline-block" }} />
              {t.reply}
            </span>
          </div>
          <h1 className="contact-hero-title" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4.5vw, 42px)", lineHeight: 1.2, color: "#070B14", margin: 0, letterSpacing: "-0.02em" }}>
            {t.titlePre}{" "}
            <span style={{ color: "#070B14" }}>{t.titleAccent}</span>
          </h1>
        </div>
      </section>

      <main className="relative" style={{ zIndex: 1 }}>
        <ContactFormBlock />
        <ContactMapFaqBlock />
      </main>

      <SiteFooterSection />

      <style>{`
        @media(max-width:768px) {
          .contact-hero-title { font-size: clamp(20px, 5.2vw, 26px) !important; line-height: 1.25 !important; max-width: 20em; margin-left: auto !important; margin-right: auto !important; }
          .contact-hero { padding-top: 120px !important; padding-bottom: 20px !important; }
        }
      `}</style>
    </LandingStylePageRoot>
  );
};
