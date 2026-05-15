import { useEffect } from "react";
import { Header } from "../../components/Header";
import { LandingStylePageRoot } from "../../components/PageBackground";
import { SiteFooterSection } from "../AiLandingPage/sections/SiteFooterSection/SiteFooterSection";
import { useLanguage } from "../../i18n/LanguageContext";
import { pk } from "../../design/pkLandingColors";

const h2Style = {
  fontFamily: "'Montserrat',sans-serif",
  fontWeight: 600,
  fontSize: "20px",
  marginTop: "32px",
  marginBottom: "12px",
  color: pk.ink,
} as const;

const pStyle = {
  fontFamily: "'Montserrat',sans-serif",
  fontSize: "15px",
  color: pk.ink62,
  lineHeight: 1.7,
  marginBottom: "16px",
} as const;

export const PrivacyPolicyPage = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LandingStylePageRoot
      style={{
        backgroundColor: pk.page,
        backgroundImage: "none",
        color: pk.ink,
      }}
    >
      <Header />
      <main className="relative" style={{ zIndex: 1, paddingTop: "100px", paddingBottom: "80px", backgroundColor: pk.page }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px" }}>
          <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "clamp(28px,4vw,40px)", marginBottom: "32px", letterSpacing: "-0.02em", color: pk.ink }}>
            {isEn ? "Privacy Policy" : "Zásady ochrany soukromí"}
          </h1>
          <p style={{ ...pStyle, marginBottom: "24px" }}>
            {isEn
              ? "Effective from 1 Jan 2025. These rules describe how PK-Digital processes personal data in relation to this website and services."
              : "Platnost od 1. 1. 2025. Tyto zásady popisují, jak PK-Digital („my“) zpracovává vaše osobní údaje v souvislosti s webem a službami."}
          </p>

          <h2 style={h2Style}>{isEn ? "1. What data we collect" : "1. Jaká data sbíráme"}</h2>
          <p style={pStyle}>
            {isEn ? "We may process: name, email, phone, company, contact form messages, technical usage data (IP, browser), and cookies as described below." : "Můžeme zpracovávat: jméno, e-mail, telefon, název firmy, obsah zpráv z kontaktního formuláře; údaje o použití webu (IP, prohlížeč); cookies dle níže uvedeného."}
          </p>

          <h2 style={h2Style}>{isEn ? "2. Purpose of processing" : "2. Účel zpracování"}</h2>
          <p style={pStyle}>
            {isEn ? "Form data is used to respond to inquiries, offer services, and manage client relationships. Technical data and cookies are used to run the website, analyze traffic, and improve user experience." : "Údaje z formuláře slouží k odpovědi na poptávku, nabídce služeb a správě vztahu s klientem. Technické údaje a cookies používáme k provozu webu, analýze návštěvnosti a zlepšení zážitku."}
          </p>

          <h2 style={h2Style}>{isEn ? "3. Cookies" : "3. Cookies"}</h2>
          <p style={pStyle}>
            {isEn ? "The website may use essential cookies (functionality) and optional cookies (analytics, preferences). You can change your choice in browser settings or in the cookie banner." : "Web může používat nezbytné cookies (funkčnost) a volitelné (analytika, preference). Volbu můžete změnit v nastavení prohlížeče nebo v cookie liště na webu."}
          </p>

          <h2 style={h2Style}>{isEn ? "4. Third parties" : "4. Třetí strany"}</h2>
          <p style={pStyle}>
            {isEn ? "Data may be shared with hosting, email, and analytics providers within the EU/EEA or with adequate safeguards. We do not sell your data to third parties for marketing." : "Data mohou být předána poskytovatelům hostingů, e-mailových a analytických nástrojů v rámci EU/EEA nebo s odpovídající ochranou. Neprodáváme vaše údaje třetím stranám pro marketing."}
          </p>

          <h2 style={h2Style}>{isEn ? "5. Your rights (GDPR)" : "5. Vaše práva (GDPR)"}</h2>
          <p style={pStyle}>
            {isEn ? "You have the right to access, rectify, erase, restrict processing, data portability, and objection. To exercise your rights, contact us. You may also lodge a complaint with the supervisory authority." : "Máte právo na přístup k údajům, jejich opravu, výmaz („právo být zapomenut“), omezení zpracování, přenositelnost údajů a námitku. Pro uplatnění práva nás kontaktujte (kontakt níže). Máte též právo podat stížnost u dozorového úřadu (ÚOOÚ)."}
          </p>

          <h2 style={h2Style}>{isEn ? "6. Data controller and contact" : "6. Správce údajů a kontakt"}</h2>
          <p style={pStyle}>
            {isEn
              ? "Data controller: PK-Digital, Company ID: 21185301, registered office: Němčice 329, 664 91 Ivančice. Email: info@pk-digital.cz, phone: +420 725 703 868. Data box: f4i6cbb."
              : "Správce osobních údajů: PK-Digital, IČO: 21185301, sídlo: Němčice 329, 664 91 Ivančice. E-mail: info@pk-digital.cz, telefon: +420 725 703 868. Datová schránka: f4i6cbb."}
          </p>
        </div>
      </main>
      <SiteFooterSection />
    </LandingStylePageRoot>
  );
};
