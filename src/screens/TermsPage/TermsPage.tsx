import { useEffect } from "react";
import { Header } from "../../components/Header";
import { LandingStylePageRoot } from "../../components/PageBackground";
import { SiteFooterSection } from "../AiLandingPage/sections/SiteFooterSection/SiteFooterSection";
import { useLanguage } from "../../i18n/LanguageContext";

export const TermsPage = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LandingStylePageRoot>
      <Header />
      <main className="relative" style={{ zIndex: 1, paddingTop: "100px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px" }}>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(28px,4vw,40px)", marginBottom: "32px", letterSpacing: "-0.02em" }}>
            {isEn ? "Terms of Use" : "Podmínky užití"}
          </h1>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "24px" }}>
            {isEn ? "Effective from 1 Jan 2025. By using pk-digital.cz and related services, you agree to these terms." : "Platnost od 1. 1. 2025. Používáním webu pk-digital.cz a souvisejících služeb souhlasíte s těmito podmínkami."}
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "20px", marginTop: "32px", marginBottom: "12px" }}>{isEn ? "1. Scope of services" : "1. Rozsah služeb"}</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "16px" }}>
            {isEn ? "This website provides information about PK-Digital services (website development, modernization, AI integration). The exact scope of delivery is defined by contract or order." : "Web slouží k informování o službách PK-Digital (tvorba webů, modernizace, integrace AI). Konkrétní rozsah plnění upravuje smlouva nebo objednávka s klientem."}
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "20px", marginTop: "32px", marginBottom: "12px" }}>{isEn ? "2. Intellectual property" : "2. Duševní vlastnictví"}</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "16px" }}>
            {isEn ? "All website content (texts, graphics, logos, layout) is protected by copyright and belongs to PK-Digital or its licensors. Copying or distributing for commercial use is not allowed without written consent." : "Veškerý obsah webu (texty, grafika, loga, layout) je chráněn autorským právem a patří PK-Digital nebo poskytovatelům licencí. Bez písemného souhlasu není dovoleno kopírovat ani šířit obsah pro komerční účely."}
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "20px", marginTop: "32px", marginBottom: "12px" }}>{isEn ? "3. Limitation of liability" : "3. Omezení odpovědnosti"}</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "16px" }}>
            {isEn ? "Information on this website is provided 'as is'. We are not liable for inaccuracies or damages arising from its use. Liability for specific projects is governed by the client contract." : "Informace na webu jsou poskytovány „jak jsou“. Nepřebíráme odpovědnost za nepřesnosti nebo škody vzniklé jejich použitím. Odpovědnost za konkrétní zakázku se řídí smlouvou s klientem."}
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "20px", marginTop: "32px", marginBottom: "12px" }}>{isEn ? "4. Governing law and place of performance" : "4. Rozhodné právo a místo plnění"}</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "16px" }}>
            {isEn ? "All relations arising from website use and services are governed by Czech law. Place of performance is the registered office of PK-Digital (Němčice 329, 664 91 Ivančice)." : "Pro veškeré vztahy z užití webu a poskytování služeb platí právo České republiky. Místem plnění je sídlo PK-Digital (Němčice 329, 664 91 Ivančice)."}
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "20px", marginTop: "32px", marginBottom: "12px" }}>{isEn ? "5. Dispute resolution" : "5. Řešení sporů"}</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "16px" }}>
            {isEn ? "We aim to resolve disputes amicably. If necessary, competent courts of the Czech Republic apply. Consumers may use out-of-court dispute resolution (e.g., EU ODR platform)." : "Spory se snažíme řešit dohodou. V případě potřeby jsou příslušné soudy České republiky. Spotřebitelé mohou využít mimosoudní řešení spotřebitelských sporů (např. platforma ODR EU)."}
          </p>
        </div>
      </main>
      <SiteFooterSection />
    </LandingStylePageRoot>
  );
};
