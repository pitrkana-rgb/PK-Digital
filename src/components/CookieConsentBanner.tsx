import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import { pk } from "../design/pkLandingColors";

const STORAGE_KEY = "cookie-consent";

export const CookieConsentBanner = (): JSX.Element | null => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === null) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const hide = (value: "all" | "essential") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={isEn ? "Cookie consent" : "Cookie souhlas"}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: "20px 24px",
        backgroundColor: pk.black98,
        borderTop: `1px solid ${pk.accent20}`,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        boxShadow: `0 -4px 24px ${pk.black40}`,
      }}
    >
      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "14px", color: pk.onDark90, margin: 0, flex: "1 1 280px" }}>
        {isEn ? "This website uses cookies to improve your experience. " : "Tento web používá cookies pro zlepšení vašeho zážitku. "}
        <Link to="/zasady-ochrany-soukromi" style={{ color: pk.accent, textDecoration: "underline" }}>
          {isEn ? "Privacy Policy" : "Zásady ochrany soukromí"}
        </Link>
      </p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => hide("all")}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            background: pk.gradientCtaSoft,
            color: pk.hero,
            border: "none",
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          {isEn ? "Accept all" : "Přijmout vše"}
        </button>
        <button
          type="button"
          onClick={() => hide("essential")}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            background: "transparent",
            color: pk.onDark90,
            border: `1px solid ${pk.onDarkBorder30}`,
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 500,
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          {isEn ? "Essential only" : "Pouze nezbytné"}
        </button>
      </div>
    </div>
  );
};
