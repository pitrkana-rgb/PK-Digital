import { useState } from "react";
import { PlusIcon, MinusIcon } from "lucide-react";

const faqData = [
  { question: "Jak probíhá první spolupráce?", answer: "Začínáme krátkým online callem, kde společně pojmenujeme cíle, aktuální situaci a možné překážky. Na základě toho navrhneme konkrétní další kroky – od jednorázového workshopu po dlouhodobější spolupráci. Vše dostanete přehledně sepsané." },
  { question: "Je pro spolupráci potřeba mít jasno v zadání?", answer: "Nemusíte mít hotový brief ani přesně vědět, jaké AI řešení potřebujete. Pomůžeme vám od úplného začátku – společně zmapujeme příležitosti, ověříme nápady na malých experimentech a teprve potom se pouštíme do větší implementace." },
  { question: "Jaké technologie a nástroje používáte?", answer: "Vycházíme z vašeho stávajícího stacku a procesů. Pracujeme s moderním webovým frontendem, nástroji pro automatizaci (např. Make, n8n, Zapier) a s AI modely, které dávají smysl pro daný use‑case. Vždy dbáme na bezpečné zacházení s daty." },
  { question: "Dokážete pomoct i menším firmám nebo freelancerům?", answer: "Ano. Často začínáme právě s menšími týmy, kde má každá hodina navíc velký dopad. Umíme navrhnout řešení, které je finančně i časově realistické – od jednoduchého AI agenta přes chytré formuláře až po kompletní redesign webu." },
  { question: "Jaká je orientační cena a doba dodání?", answer: "U webů se většina projektů pohybuje od 24 900 Kč výše, u AI agentů a automatizací od 29 900 Kč. Délka spolupráce bývá typicky 3–8 týdnů podle rozsahu. Konkrétní odhad vždy dostanete po úvodní konzultaci ještě před tím, než se do projektu pustíme." },
];

import { SectionDivider } from "../../components/SectionDivider";

export const FrequentlyAskedQuestionsSection = (): JSX.Element => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" style={{ width: "100%", backgroundColor: "#000", padding: "96px 0 120px", marginTop: "-50px", marginBottom: "-80px" }}>
      <SectionDivider />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4.5vw,56px)", color: "#fff", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Často kladené dotazy
          </h2>
          <p className="section-sub" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", color: "rgba(255,255,255,0.65)", margin: 0 }}>
            Zajímá vás, jak spolupráce probíhá v praxi? Připravili jsme odpovědi na otázky, které od klientů dostáváme nejčastěji.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {faqData.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.question}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  borderTop: i === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
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
                    fontFamily: "'Space Grotesk',sans-serif", fontWeight: isOpen ? 600 : 500,
                    fontSize: "18px",
                    color: isOpen ? "#00E5FF" : "#F0F4F8",
                    lineHeight: 1.4,
                    transition: "color 200ms ease",
                  }}>
                    {faq.question}
                  </span>
                  <div style={{
                    flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%",
                    background: isOpen ? "rgba(0,229,255,0.12)" : "rgba(13,27,42,0.65)",
                    border: `1px solid ${isOpen ? "rgba(0,229,255,0.35)" : "rgba(0,229,255,0.12)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 200ms ease, border-color 200ms ease, transform 200ms ease",
                    transform: isOpen ? "rotate(0deg)" : "rotate(0deg)",
                  }}>
                    {isOpen
                      ? <MinusIcon style={{ width: "14px", height: "14px", color: "#00E5FF" }} />
                      : <PlusIcon style={{ width: "14px", height: "14px", color: "rgba(255,255,255,0.6)" }} />
                    }
                  </div>
                </button>

                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  style={{
                    maxHeight: isOpen ? "400px" : "0",
                    overflow: "hidden",
                    transition: "max-height 300ms ease",
                  }}
                >
                  <p style={{
                    fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "16px",
                    lineHeight: 1.7, color: "rgba(255,255,255,0.65)", padding: "0 0 24px 0", margin: 0,
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
        .faq-trigger:focus-visible{ outline:2px solid #00E5FF; outline-offset:2px; border-radius:4px; }
        @media(max-width:768px){
          .faq-section { padding: 48px 0 60px !important; }
          .faq-heading { font-size: 22px !important; margin-bottom: 8px !important; }
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
