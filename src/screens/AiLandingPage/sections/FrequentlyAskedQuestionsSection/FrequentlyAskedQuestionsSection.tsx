import { useState } from "react";
import { PlusIcon, MinusIcon } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";
import { SectionDivider } from "../../components/SectionDivider";

const faqData = [
  {
    question: "Co budu pro začátek potřebovat?",
    answer:
      "Na začátku stačí základní informace o vašem podnikání, cílech a představě o webu. Nemusíte mít hotové texty ani detailní zadání — celým procesem vás provedeme krok za krokem.",
  },
  {
    question: "Zatím nemám obsah, co s tím?",
    answer:
      "To vůbec nevadí. Pomůžeme vám s návrhem struktury webu, doporučením obsahu i směřováním textace tak, aby web působil profesionálně a podporoval získávání poptávek.",
  },
  {
    question: "Můžete navrhnout logo mého webu?",
    answer:
      "Ano. Pomůžeme vám vytvořit moderní vizuální identitu včetně loga a základního brandingu, který bude odpovídat stylu vašeho podnikání.",
  },
  {
    question: "Budu si moci své webové stránky snadno upravovat? Nejsem programátor.",
    answer:
      "Ano. Web připravujeme tak, aby byla běžná správa jednoduchá i bez technických znalostí. Texty, fotografie nebo obsah můžete upravovat sami. Po spuštění vám vše osobně vysvětlíme.",
  },
  {
    question: "Kolik stojí vytvoření webu?",
    answer:
      "Cena webových stránek na míru závisí na rozsahu projektu, funkcích a celkové náročnosti řešení. Menší firemní weby začínají přibližně od nižších desítek tisíc korun, rozsáhlejší webové aplikace naceníme individuálně podle zadání. Součástí je vždy konzultace, návrh řešení a transparentní cenová nabídka bez skrytých poplatků.",
  },
  {
    question: "Co všechno je zahrnuto v ceně?",
    answer:
      "Součástí projektu bývá návrh designu, vývoj webu, responzivní optimalizace, základní SEO nastavení, kontaktní formuláře, optimalizace rychlosti, napojení analytiky a spuštění webu. Přesný rozsah vždy přizpůsobíme konkrétním potřebám projektu.",
  },
  {
    question: "Je možné platit zálohovou fakturou?",
    answer:
      "Ano. Projekty standardně rozdělujeme do jasných etap s transparentním způsobem fakturace, aby byla spolupráce jednoduchá a přehledná pro obě strany.",
  },
  {
    question: "Potřebuji vlastní doménu a webhosting?",
    answer:
      "Pokud ještě nemáte vlastní doménu nebo hosting, pomůžeme vám s výběrem i kompletním nastavením. Web připravíme tak, aby byl rychlý, bezpečný a připravený pro SEO i Google Ads kampaně.",
  },
  {
    question: "Jak dlouho trvá vytvoření webových stránek?",
    answer:
      "Většinu webových stránek dokážeme spustit přibližně do 14 dnů od schválení návrhu. Menší projekty mohou být hotové i rychleji, rozsáhlejší webové aplikace individuálně podle náročnosti projektu.",
  },
  {
    question: "Jsou webové stránky připravené pro SEO?",
    answer:
      "Ano. Každý web vytváříme s důrazem na technické SEO, rychlost načítání, responzivitu a správnou strukturu obsahu. Web je připravený pro dohledatelnost ve vyhledávání Google i pro reklamní kampaně.",
  },
  {
    question: "Můžete vytvořit web na míru podle konkrétního zadání?",
    answer:
      "Ano. Specializujeme se na webové stránky a aplikace na míru podle potřeb konkrétní firmy nebo podnikání. Každý projekt navrhujeme individuálně podle cílů klienta a cílové skupiny.",
  },
];

const faqDataEn = [
  {
    question: "What do I need to get started?",
    answer:
      "To begin, basic information about your business, goals, and vision for the site is enough. You do not need finished copy or a detailed brief — we guide you through every step.",
  },
  {
    question: "I do not have content yet. What should I do?",
    answer:
      "That is fine. We help with site structure, content recommendations, and messaging direction so the site looks professional and supports lead generation.",
  },
  {
    question: "Can you design a logo for my website?",
    answer:
      "Yes. We can help you build a modern visual identity, including a logo and core branding that matches your business style.",
  },
  {
    question: "Will I be able to edit my website easily? I am not a developer.",
    answer:
      "Yes. We build sites so day-to-day management is straightforward without technical skills. You can update text, photos, and content yourself, and we walk you through everything at launch.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Pricing depends on scope, features, and overall complexity. Smaller corporate sites typically start in the lower tens of thousands of CZK; larger web applications are quoted individually. Every project includes consultation, a solution proposal, and a transparent quote with no hidden fees.",
  },
  {
    question: "What is included in the price?",
    answer:
      "Projects usually include design, development, responsive optimization, baseline SEO, contact forms, performance tuning, analytics setup, and go-live. The exact scope is always tailored to your needs.",
  },
  {
    question: "Can I pay with a deposit invoice?",
    answer:
      "Yes. We typically split projects into clear milestones with transparent invoicing so collaboration stays simple for both sides.",
  },
  {
    question: "Do I need my own domain and hosting?",
    answer:
      "If you do not have a domain or hosting yet, we help you choose and set everything up. We prepare the site to be fast, secure, and ready for SEO and Google Ads campaigns.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "Most websites go live in about 14 days after the design is approved. Smaller projects can be faster; larger web applications depend on complexity.",
  },
  {
    question: "Is the website SEO-ready?",
    answer:
      "Yes. Every site is built with technical SEO, fast loading, responsive layout, and sound content structure in mind — ready for Google search visibility and ad campaigns.",
  },
  {
    question: "Can you build a fully custom site from a specific brief?",
    answer:
      "Yes. We specialize in bespoke websites and applications for individual businesses. Each project is designed around your goals and target audience.",
  },
];

export const FrequentlyAskedQuestionsSection = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const items = isEn ? faqDataEn : faqData;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="landing-scroll-target" style={{ width: "100%", backgroundColor: pk.page, padding: "76px 0 100px", marginTop: "-50px", marginBottom: "-80px" }}>
      <SectionDivider />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "clamp(26px,3.6vw,42px)", color: pk.ink, margin: "0 auto 20px", letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: "770px" }}>
            {isEn ? "Frequently Asked Questions" : "Často vás zajímá"}
          </h2>
          <p className="section-sub" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 400, fontSize: "18px", color: pk.ink65, margin: "0 auto" }}>
            {isEn
              ? "Answers to common questions about custom websites, how we work together, pricing, and ongoing site management."
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
                  <p style={{
                    fontFamily: "'Montserrat',sans-serif", fontWeight: 400, fontSize: "16px",
                    lineHeight: 1.7, color: pk.ink68, padding: "0 0 24px 0", margin: 0,
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
