import { useState } from "react";
import { PlusIcon, MinusIcon } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";
import { SectionDivider } from "../../components/SectionDivider";
import { faqData, faqDataEn } from "./faqCopy";

type FaqItem = { question: string; answer: string };

const FAQ_COLUMN_SIZE = 5;

const FaqAccordionItem = ({
  faq,
  index,
  isFirstInColumn,
  isOpen,
  onToggle,
}: {
  faq: FaqItem;
  index: number;
  isFirstInColumn: boolean;
  isOpen: boolean;
  onToggle: () => void;
}): JSX.Element => (
  <div
    style={{
      borderBottom: `1px solid ${pk.slateTint10}`,
      borderTop: isFirstInColumn ? `1px solid ${pk.slateTint10}` : "none",
    }}
  >
    <button
      type="button"
      id={`faq-btn-${index}`}
      aria-expanded={isOpen}
      aria-controls={`faq-panel-${index}`}
      onClick={onToggle}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 0",
        background: "none",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        gap: "16px",
        outline: "none",
      }}
      className="faq-trigger"
    >
      <span className="faq-question">
        {faq.question}
      </span>
      <div
        style={{
          flexShrink: 0,
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: isOpen ? pk.accent08 : pk.slateTint04,
          border: `1px solid ${isOpen ? pk.accent25 : pk.slateBorderStrong}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 200ms ease, border-color 200ms ease",
        }}
      >
        {isOpen ? (
          <MinusIcon style={{ width: "14px", height: "14px", color: pk.accentStrong }} />
        ) : (
          <PlusIcon style={{ width: "14px", height: "14px", color: pk.ink55 }} />
        )}
      </div>
    </button>

    <div
      id={`faq-panel-${index}`}
      role="region"
      aria-labelledby={`faq-btn-${index}`}
      style={{
        maxHeight: isOpen ? "2400px" : "0",
        overflow: "hidden",
        transition: "max-height 320ms ease",
      }}
    >
      <p className="faq-panel-copy section-sub">
        {faq.answer}
      </p>
    </div>
  </div>
);

export const FrequentlyAskedQuestionsSection = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const items: readonly FaqItem[] = isEn ? faqDataEn : faqData;
  const [open, setOpen] = useState<number | null>(0);
  const leftColumn = items.slice(0, FAQ_COLUMN_SIZE);
  const rightColumn = items.slice(FAQ_COLUMN_SIZE);

  return (
    <section
      id="faq"
      className="landing-scroll-target faq-section"
      style={{
        width: "100%",
        backgroundColor: pk.page,
        color: pk.ink,
        padding: "76px 0 100px",
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      <SectionDivider />
      <div className="faq-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2 className="faq-heading pk-section-heading" style={{ margin: "0 auto 20px", maxWidth: "770px" }}>
            {isEn ? "Frequently Asked Questions" : "Často vás zajímá"}
          </h2>
          <p
            className="section-sub"
            style={{
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              margin: "0 auto",
            }}
          >
            {isEn
              ? "Answers to common questions about custom websites, how I work with clients, pricing, and ongoing site management."
              : "Odpovědi na nejčastější otázky ohledně tvorby webových stránek na míru, průběhu spolupráce, ceny i správy webu."}
          </p>
        </div>

        <div className="faq-accordion-wrap">
          <div className="faq-column">
            {leftColumn.map((faq, i) => (
              <FaqAccordionItem
                key={faq.question}
                faq={faq}
                index={i}
                isFirstInColumn={i === 0}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </div>
          <div className="faq-column">
            {rightColumn.map((faq, i) => {
              const index = i + FAQ_COLUMN_SIZE;
              return (
                <FaqAccordionItem
                  key={faq.question}
                  faq={faq}
                  index={index}
                  isFirstInColumn={i === 0}
                  isOpen={open === index}
                  onToggle={() => setOpen(open === index ? null : index)}
                />
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .faq-trigger:focus-visible{ outline:2px solid var(--pk-accent); outline-offset:2px; border-radius:4px; }
        .faq-accordion-wrap{
          display:flex;
          flex-direction:column;
          max-width:800px;
          margin:0 auto;
        }
        @media(min-width:769px){
          .faq-section{ padding-bottom:5px !important; }
          .faq-accordion-wrap{
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:0 56px;
            max-width:none;
            margin:0;
          }
        }
        .faq-question{
          font-family:"Montserrat",sans-serif;
          font-weight:500;
          font-size:18px;
          color:var(--pk-ink);
          line-height:1.4;
          transition:font-weight 200ms ease;
        }
        .faq-trigger[aria-expanded="true"] .faq-question{ font-weight:700; }
        .faq-panel-copy{
          font-family:"Montserrat",sans-serif;
          font-weight:400;
          font-size:16px;
          line-height:1.7;
          color:${pk.ink78};
          padding:0 0 24px;
          margin:0;
        }
        @media(max-width:768px){
          .faq-section { padding: 48px 0 60px !important; }
          .faq-heading { margin-bottom: 8px !important; }
          .faq-header { margin-bottom: 32px !important; }
          .faq-trigger { padding: 12px 0 !important; }
          .faq-question { font-size: 15.3px !important; }
          .faq-panel-copy.section-sub{
            font-size:14px !important;
            line-height:1.55 !important;
            font-weight:400 !important;
            color:var(--pk-ink) !important;
            padding-bottom:14px !important;
          }
        }
        @media(prefers-reduced-motion:reduce){ div[style*="max-height"]{ transition:none !important; } }
      `}</style>
    </section>
  );
};
