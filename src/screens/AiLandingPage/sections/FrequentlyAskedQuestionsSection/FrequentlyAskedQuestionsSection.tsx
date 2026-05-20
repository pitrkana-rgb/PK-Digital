import { useState } from "react";
import { PlusIcon, MinusIcon } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";
import { SectionDivider } from "../../components/SectionDivider";
import { faqData, faqDataEn } from "./faqCopy";

export const FrequentlyAskedQuestionsSection = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const items = isEn ? faqDataEn : faqData;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="landing-scroll-target pk-section-soft-band faq-section"
      style={{
        width: "100%",
        background: pk.gradientSectionSoft,
        color: pk.ink,
        padding: "76px 0 100px",
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      <SectionDivider />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2 className="faq-heading pk-section-heading" style={{ margin: "0 auto 20px", maxWidth: "770px" }}>
            {isEn ? "Frequently Asked Questions" : "Často vás zajímá"}
          </h2>
          <p className="section-sub" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 400, fontSize: "18px", margin: "0 auto" }}>
            {isEn
              ? "Answers to common questions about custom websites, how I work with clients, pricing, and ongoing site management."
              : "Odpovědi na nejčastější otázky ohledně tvorby webových stránek na míru, průběhu spolupráce, ceny i správy webu."}
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {items.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.question}
                style={{
                  borderBottom: `1px solid ${pk.slateTint10}`,
                  borderTop: i === 0 ? `1px solid ${pk.slateTint10}` : "none",
                }}
              >
                <button
                  type="button"
                  id={`faq-btn-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "24px 0", background: "none", border: "none", cursor: "pointer",
                    textAlign: "left", gap: "16px",
                    outline: "none",
                  }}
                  className="faq-trigger"
                >
                  <span style={{
                    fontFamily: "'Montserrat',sans-serif", fontWeight: isOpen ? 700 : 500,
                    fontSize: "18px",
                    color: pk.ink,
                    lineHeight: 1.4,
                    transition: "font-weight 200ms ease",
                  }}>
                    {faq.question}
                  </span>
                  <div style={{
                    flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%",
                    background: isOpen ? pk.accent08 : pk.slateTint04,
                    border: `1px solid ${isOpen ? pk.accent25 : pk.slateBorderStrong}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 200ms ease, border-color 200ms ease, transform 200ms ease",
                    transform: isOpen ? "rotate(0deg)" : "rotate(0deg)",
                  }}>
                    {isOpen
                      ? <MinusIcon style={{ width: "14px", height: "14px", color: pk.accentStrong }} />
                      : <PlusIcon style={{ width: "14px", height: "14px", color: pk.ink55 }} />
                    }
                  </div>
                </button>

                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  style={{
                    maxHeight: isOpen ? "2400px" : "0",
                    overflow: "hidden",
                    transition: "max-height 320ms ease",
                  }}
                >
                  <p className="faq-panel-copy" style={{
                    fontFamily: "'Montserrat',sans-serif", fontWeight: 400, fontSize: "16px",
                    lineHeight: 1.7, color: pk.ink78, padding: "0 0 24px 0", margin: 0,
                  }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-trigger:focus-visible{ outline:2px solid var(--pk-accent); outline-offset:2px; border-radius:4px; }
        @media(max-width:768px){
          .faq-section { padding: 48px 0 60px !important; }
          .faq-heading { margin-bottom: 8px !important; }
          .faq-subtitle { font-size: 13px !important; }
          .faq-header { margin-bottom: 32px !important; }
          .faq-trigger { padding: 12px 0 !important; }
          .faq-question { font-size: 15px !important; }
          .faq-answer { font-size: 13px !important; padding-bottom: 14px !important; line-height: 1.6 !important; }
          .faq-icon { width: 26px !important; height: 26px !important; }
        }
        @media(prefers-reduced-motion:reduce){ div[style*="max-height"]{ transition:none !important; } }
      `}</style>
    </section>
  );
};
