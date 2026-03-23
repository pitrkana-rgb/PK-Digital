import { useState } from "react";
import { PlusIcon, MinusIcon } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext";

const faqData = [
  {
    question: "Co budu pro začátek potřebovat?",
    answer: "Na začátku stačí základní informace o vaší firmě, cíle a hrubá představa o webu. Texty, fotky ani přesný plán mít nemusíte – to vše zvládneme společně. Po nezávazné konzultaci vám sdělím, co bude třeba do dalšího kroku.",
  },
  {
    question: "Zatím nemám obsah, co s tím?",
    answer: "Nevadí. Pomůžu vám s přípravou textů, strukturou webu i základním copywritingem. Díky AI nástrojům dokážeme obsah připravit rychle a kvalitně. Fotografie lze vyřešit pořízením vlastních nebo využitím licencovaných stocků.",
  },
  {
    question: "Můžete navrhnout logo mého webu?",
    answer: "Základní návrh loga nebo grafické identity do webu zahrnout mohu. Pro komplexní brand manuál spolupracuji s ověřenými grafiky. Vždy záleží na rozsahu projektu – probereme to při konzultaci.",
  },
  {
    question: "Budu moci své webové stránky snadno upravovat? Nejsem programátor.",
    answer: "Ano. Weby stavím tak, aby je mohl spravovat kdokoliv bez znalosti programování – texty, obrázky i základní sekce upravíte sami přes přehledné rozhraní. Po předání webu vás vším osobně provedu a ukážu, jak na to.",
  },
  {
    question: "Kolik stojí vytvoření webu?",
    answer: "Tvorba webu na míru začíná od 19\u00a0900 Kč, modernizace stávajícího webu od 14\u00a0900 Kč. Každý projekt je jiný, proto vám po konzultaci připravím přesnou kalkulaci ušitou na míru. Neúčtuji žádné měsíční ani roční paušály.",
  },
  {
    question: "Co všechno je zahrnuto v ceně?",
    answer: "V ceně je konzultace, návrh prototypu zdarma, kompletní vývoj webu, mobilní verze, základní SEO optimalizace a osobní předání s ukázkou správy. Dostupné doplňky (AI chatbot, rezervační systém apod.) jsou součástí nabídky při dohodě.",
  },
  {
    question: "Je možné platit zálohovou fakturou?",
    answer: "Ano, standardně probíhá platba ve dvou fázích: záloha před zahájením práce a doplatek po předání hotového webu. Konkrétní podmínky vždy dohodnu individuálně dle projektu.",
  },
  {
    question: "Potřebuji vlastní doménu a webhosting?",
    answer: "Pokud doménu ani hosting ještě nemáte, pomohu vám s jejich výběrem a registrací. Pokud je máte, web nasadím na váš stávající hosting nebo doporučím vhodnou alternativu. Vše probereme při konzultaci.",
  },
];

const faqDataEn = [
  {
    question: "What do I need to start?",
    answer: "At the beginning, basic information about your company, goals, and a rough website idea is enough. You do not need final texts, photos, or a perfect plan yet - we handle that together.",
  },
  {
    question: "I do not have content yet. What now?",
    answer: "That is fine. I can help with website structure, content preparation, and basic copywriting. With AI tools, we can produce content quickly and at high quality.",
  },
  {
    question: "Can you design a logo for my website?",
    answer: "I can include a basic logo or visual identity proposal for your website. For complete brand manuals, I cooperate with trusted designers.",
  },
  {
    question: "Will I be able to edit the website myself?",
    answer: "Yes. Websites are built so anyone can manage them without coding knowledge - text, images, and core sections can be updated in a clear interface.",
  },
  {
    question: "How much does website development cost?",
    answer: "Custom website development starts from CZK 19,900 and modernization from CZK 14,900. Every project is different, so I prepare a custom estimate after consultation.",
  },
  {
    question: "What is included in the price?",
    answer: "The price includes consultation, a free prototype proposal, complete development, mobile version, basic SEO optimization, and handover with onboarding.",
  },
  {
    question: "Can I pay with an advance invoice?",
    answer: "Yes. Payment is typically in two phases: an advance before work starts and the remaining balance after delivery.",
  },
  {
    question: "Do I need my own domain and hosting?",
    answer: "If you do not have a domain or hosting yet, I can help with selection and setup. If you already have them, I deploy on your existing hosting or recommend an alternative.",
  },
];

import { SectionDivider } from "../../components/SectionDivider";

export const FrequentlyAskedQuestionsSection = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const items = isEn ? faqDataEn : faqData;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" style={{ width: "100%", backgroundColor: "transparent", padding: "96px 0 120px", marginTop: "-50px", marginBottom: "-80px" }}>
      <SectionDivider />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4.5vw,56px)", color: "#fff", margin: "0 auto 20px", letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: "770px" }}>
            {isEn ? "Frequently Asked Questions" : "Často kladené dotazy"}
          </h2>
          <p className="section-sub" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", color: "rgba(255,255,255,0.65)", margin: "0 auto" }}>
            {isEn
              ? "Wondering how collaboration works in practice? Here are answers to the questions clients ask most often."
              : "Zajímá vás, jak spolupráce probíhá v praxi? Připravili jsme odpovědi na otázky, které od klientů dostáváme nejčastěji."}
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
                    maxHeight: isOpen ? "600px" : "0",
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
