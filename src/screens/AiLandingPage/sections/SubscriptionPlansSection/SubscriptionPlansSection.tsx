import { useState, useRef } from "react";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { pk } from "../../../../design/pkLandingColors";

const pricingPlans = [
  {
    name: "Tvorba webu na míru",
    description: "Navrhujeme weby, které jasně komunikují hodnotu a přivádí zákazníky.",
    features: [
      "Web, který odpovídá vaší značce a stylu",
      "Design, který vás odliší od konkurence",
      "Bezproblémové zobrazení na mobilu i počítači",
      "Možnost napojení na vaše nástroje a systémy",
      "Připraveno pro další růst a rozšiřování",
    ],
    highlighted: true,
    cta: "Chci web",
  },
  {
    name: "Modernizace stránek",
    description: "Zvyšujeme výkon stávajících webů bez nutnosti začínat od nuly.",
    features: [
      "Analýza slabých míst vašeho webu",
      "Modernější vzhled bez nutnosti začínat od nuly",
      "Lepší přehlednost a orientace pro návštěvníky",
      "Rychlejší načítání a stabilnější fungování",
      "Lepší viditelnost ve vyhledávání",
    ],
    highlighted: false,
    cta: "Chci modernizaci",
  },
  {
    name: "Automatizace a AI agenti",
    description: "Navrhujeme automatizace, které snižují náklady a nahrazují rutinní práci.",
    features: [
      "Mapování procesů a identifikace úspor",
      "Automatizace rutinní komunikace (AI, chatboty)",
      "Integrace mezi systémy (CRM, email, web)",
      "Snížení nákladů na operativu",
      "Škálování bez navyšování týmu",
    ],
    highlighted: false,
    cta: "Chci automatizaci",
  },
];

import { SectionDivider } from "../../components/SectionDivider";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../i18n/LanguageContext";

const pricingPlansEn = [
  {
    name: "Website Development",
    description: "We design websites that clearly communicate your value and bring customers.",
    features: [
      "Website aligned with your brand and style",
      "Design that sets you apart from competitors",
      "Seamless display on mobile and desktop",
      "Option to integrate your tools and systems",
      "Prepared for future growth and expansion",
    ],
    highlighted: true,
    cta: "I want a website",
  },
  {
    name: "Website Modernization",
    description: "We improve performance of existing websites without starting from scratch.",
    features: [
      "Analysis of your website weak points",
      "Modern look without starting from zero",
      "Better clarity and navigation for visitors",
      "Faster loading and more stable operation",
      "Better search engine visibility",
    ],
    highlighted: false,
    cta: "I want modernization",
  },
  {
    name: "Automation and AI Agents",
    description: "We design automations that reduce costs and replace repetitive work.",
    features: [
      "Process mapping and savings identification",
      "Automation of routine communication (AI, chatbots)",
      "Integrations between systems (CRM, email, web)",
      "Reduced operating costs",
      "Scaling without growing your team",
    ],
    highlighted: false,
    cta: "I want automation",
  },
];

/* ── Card component shared by desktop grid + mobile carousel ── */
const PricingCard = ({
  plan,
  navigate,
  popularLabel,
}: {
  plan: typeof pricingPlans[0];
  navigate: (path: string) => void;
  popularLabel: string;
}) => (
  <div
    className={`pricing-card pricing-card-outer ${plan.highlighted ? "popular-card" : ""}`}
    style={{
      position: "relative",
      borderRadius: "24px",
      padding: "0",
      background: "transparent",
      transition: "transform 250ms ease, box-shadow 250ms ease",
      transform: plan.highlighted ? "scale(1.05)" : "scale(1)",
      zIndex: plan.highlighted ? 5 : 1,
      boxShadow: plan.highlighted ? `0 20px 56px ${pk.slateTint12}` : `0 16px 40px ${pk.slateTint06}`,
      border: plan.highlighted ? `2px solid ${pk.coolGray22}` : "none",
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.transform = plan.highlighted ? "scale(1.08) translateY(-4px)" : "translateY(-8px)";
      el.style.boxShadow = plan.highlighted ? `0 0 22px ${pk.accent22}, 0 28px 68px ${pk.slateTint18}` : `0 24px 54px ${pk.slateShadow14}`;
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.transform = plan.highlighted ? "scale(1.05)" : "scale(1)";
      el.style.boxShadow = plan.highlighted ? `0 20px 56px ${pk.slateTint12}` : `0 16px 40px ${pk.slateTint06}`;
    }}
  >
    {/* Popular badge — sits above the card, outside the gradient border */}
    {plan.highlighted && (
      <div style={{
        position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
        background: pk.gradientPopular,
        borderRadius: "999px", padding: "4px 16px",
        fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "12px", color: pk.hero,
        letterSpacing: "0.06em", textTransform: "uppercase" as const,
        whiteSpace: "nowrap", zIndex: 10,
      }}>
        {popularLabel}
      </div>
    )}

    <div
      className="pricing-card-body"
      style={{
      backgroundColor: pk.page,
      background: `radial-gradient(ellipse 60% 80% at 50% -10%, ${pk.accent10} 0%, ${pk.accent00} 70%), ${pk.page}`,
      borderRadius: plan.highlighted ? "21px" : "24px",
      border: `1px solid ${pk.slateTint10}`,
      padding: "40px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "32px",
      boxSizing: "border-box" as const,
      flex: 1,
      minHeight: 0,
    }}
    >
      {/* Plan name */}
      <div>
        <h3 style={{
          fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700,
          fontSize: plan.highlighted ? "26px" : "22px",
          color: pk.ink,
          marginBottom: "12px",
        }}>
          {plan.name}
        </h3>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", color: pk.ink70, lineHeight: 1.6, margin: 0 }}>
          {plan.description}
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: `linear-gradient(90deg,${pk.black00},${pk.slateTint12},${pk.black00})` }} />

      {/* Features */}
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
        {plan.features.map(f => (
          <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{
              width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0, marginTop: "1px",
              background: pk.slateTint06, border: `1px solid ${pk.slateTint12}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <CheckIcon style={{ width: "11px", height: "11px", color: pk.ink, strokeWidth: 3 }} />
            </div>
            <span className="pricing-bullet" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: "15px", color: pk.ink86, lineHeight: 1.5 }}>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        type="button"
        className="pricing-cta animate-pulse-glow hero-primary-btn"
        onClick={() => navigate("/napiste-nam")}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          padding: "15px 32px",
          background: pk.gradientCtaSoft,
          border: "none",
          borderRadius: "12px",
          fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "16px",
          color: pk.ink, cursor: "pointer",
          transition: "transform 0.25s ease, filter 0.25s ease",
          boxShadow: "none",
        }}
        onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.filter = "brightness(1.1)"; b.style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.filter = ""; b.style.transform = ""; }}
      >
        {plan.cta}
        <ChevronRightIcon style={{ width: "18px", height: "18px" }} />
      </button>
    </div>
  </div>
);

const SWIPE_THRESHOLD = 50;

export const SubscriptionPlansSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [mobileIdx, setMobileIdx] = useState(0);
  const touchStartX = useRef<number>(0);
  const isEn = language === "en";
  const plans = isEn ? pricingPlansEn : pricingPlans;
  const popularLabel = isEn ? "Popular" : "Populární";

  const goTo = (idx: number) => setMobileIdx(Math.max(0, Math.min(plans.length - 1, idx)));

  const onTouchStart = (e: any) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: any) => {
    const endX = e.changedTouches[0].clientX;
    const delta = touchStartX.current - endX;
    if (delta > SWIPE_THRESHOLD) goTo(mobileIdx + 1);
    else if (delta < -SWIPE_THRESHOLD) goTo(mobileIdx - 1);
  };

  return (
    <section id="pricing" style={{ width: "100%", backgroundColor: pk.page, padding: "60px 0 96px", marginTop: "-50px", overflow: "visible" }}>
      <SectionDivider />
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 id="pricing-heading" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(26px,3.6vw,42px)", color: pk.ink, margin: "0 auto 20px", letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: "770px" }}>
            {isEn ? "Choose a Service" : "Vyberte službu"}
          </h2>
          <p className="section-sub" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", color: pk.ink65, margin: "0 auto" }}>
            {isEn ? "Every project is unique for us. We design a solution tailored to your needs." : "Každý projekt je pro nás unikátní. Navrhneme řešení přesně podle vašich potřeb."}
            <br />
            {isEn ? "Within 3 days after consultation, you get a clear plan, solution proposal, and pricing - all free and with no obligation." : "Do 3 dnů od konzultace získáte jasný plán, návrh řešení a cenovou kalkulaci – vše nezávazně a zdarma."}
          </p>
        </div>

        {/* Desktop grid (hidden on mobile) */}
        <div className="pricing-grid-desktop" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px", alignItems: "stretch" }}>
          {plans.map(plan => (
            <PricingCard key={plan.name} plan={plan} navigate={navigate} popularLabel={popularLabel} />
          ))}
        </div>

        {/* Mobile carousel (hidden on desktop) — sliding track + touch swipe */}
        <div className="pricing-mobile-carousel">
          <div
            style={{ overflow: "hidden", width: "100%", marginLeft: 0, marginRight: 0 }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="pricing-carousel-track"
              style={{
                display: "flex",
                width: `${plans.length * 100}%`,
                transform: `translateX(${-mobileIdx * (100 / plans.length)}%)`,
                transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className="pricing-mobile-slide"
                  style={{ flex: `0 0 ${100 / plans.length}%`, padding: "20px 0 4px", boxSizing: "border-box" }}
                >
                  <PricingCard plan={plan} navigate={navigate} popularLabel={popularLabel} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="pricing-dots" style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
            {plans.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={isEn ? `Go to card ${i + 1}` : `Přejít na kartu ${i + 1}`}
                onClick={() => goTo(i)}
                style={{
                  width: i === mobileIdx ? "28px" : "8px", height: "8px",
                  borderRadius: "999px", border: "none", cursor: "pointer",
                  background: i === mobileIdx ? pk.accent : pk.slateTint16,
                  transition: "width 250ms ease, background 250ms ease",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="pricing-arrows" style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
            {[{ label: "←", dir: -1 }, { label: "→", dir: 1 }].map(({ label, dir }) => (
              <button
                key={label}
                type="button"
                aria-label={dir === -1 ? (isEn ? "Previous" : "Předchozí") : (isEn ? "Next" : "Další")}
                onClick={() => goTo(mobileIdx + dir)}
                style={{
                  width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer",
                                    border: `1px solid ${pk.slateTint12}`,
                                    background: pk.slateTint04,
                                    color: pk.ink72,
                  fontFamily: "system-ui", fontSize: "16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: (dir === -1 && mobileIdx === 0) || (dir === 1 && mobileIdx === plans.length - 1) ? 0.3 : 1,
                  transition: "background 200ms ease",
                }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = pk.accent12; b.style.borderColor = pk.accent35; }}
                                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = pk.slateTint04; b.style.borderColor = pk.slateTint12; }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* Equal-height cards: desktop grid */
        .pricing-grid-desktop {
          align-items: stretch;
          padding-bottom: 20px;
        }
        .pricing-grid-desktop .pricing-card-outer {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .pricing-grid-desktop .pricing-card-body {
          flex: 1 1 auto;
          min-height: 0;
        }
        .pricing-card-body .pricing-cta {
          margin-top: auto;
          flex-shrink: 0;
        }

        /* Equal-height cards: mobile carousel slides (same height for every slide) */
        .pricing-mobile-slide {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          box-sizing: border-box;
        }
        .pricing-mobile-slide .pricing-card-outer {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .pricing-mobile-slide .pricing-card-body {
          flex: 1 1 auto;
          min-height: 0;
        }

        .pricing-mobile-carousel { display: none; }
        .pricing-mobile-carousel { padding-bottom: 16px; }
        @media(max-width:768px){
          .pricing-grid-desktop { display: none !important; }
          .pricing-mobile-carousel { display: block !important; }
          .pricing-carousel-track { will-change: transform; align-items: stretch; }
          .pricing-card { transform: scale(1) !important; }
          .popular-card { transform: scale(1) !important; }
          /* Fixed slide height so all three cards match (+20px vs previous mobile clamp) */
          .pricing-mobile-slide {
            height: clamp(454px, calc(54.6vh + 90px), 622px);
          }
          /* Feature list does not grow; CTA uses margin-top:auto to sit at bottom of flex body */
          .pricing-mobile-slide .pricing-card-body > ul {
            flex: 0 0 auto !important;
          }
          .pricing-mobile-slide .pricing-card-body {
            flex: 1 1 auto !important;
            gap: 16px !important;
            min-height: 0;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .pricing-mobile-slide .pricing-card-outer {
            flex: 1 1 auto !important;
            min-height: 0;
          }
          .pricing-mobile-slide .pricing-cta {
            padding: 10px 16px !important;
            font-size: 14px !important;
            margin-top: auto !important;
            flex-shrink: 0;
          }
          .pricing-bullet { font-size: 13px !important; line-height: 1.55 !important; }
          .pricing-dots { margin-top: 18px !important; }
          .pricing-arrows { margin-top: 10px !important; }
        }
        @media(prefers-reduced-motion:reduce){ .pricing-card,.pricing-cta{ transition:none !important; } }
        .pricing-cta:focus-visible{ outline:2px solid var(--pk-accent); outline-offset:3px; }
      `}</style>
    </section>
  );
};
