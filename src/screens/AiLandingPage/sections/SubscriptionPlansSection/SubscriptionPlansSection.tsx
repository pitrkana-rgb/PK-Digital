import { useState, useRef } from "react";
import { CheckIcon, ChevronRightIcon } from "lucide-react";

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
const PricingCard = ({ plan, navigate }: { plan: typeof pricingPlans[0]; navigate: (path: string) => void }) => (
  <div
    className={`pricing-card pricing-card-outer ${plan.highlighted ? "popular-card" : ""}`}
    style={{
      position: "relative",
      borderRadius: "24px",
      padding: plan.highlighted ? "3px" : "0",
      background: plan.highlighted
        ? "linear-gradient(90deg, #E040FB, #00E5FF)"
        : "transparent",
      transition: "transform 250ms ease, box-shadow 250ms ease",
      transform: plan.highlighted ? "scale(1.05)" : "scale(1)",
      zIndex: plan.highlighted ? 5 : 1,
      boxShadow: plan.highlighted ? "0 0 22px rgba(0,229,255,0.22)" : "none",
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.transform = plan.highlighted ? "scale(1.08) translateY(-4px)" : "translateY(-8px)";
      el.style.boxShadow = plan.highlighted ? "0 0 26px rgba(0,229,255,0.28), 0 32px 80px rgba(0,0,0,0.5)" : "0 24px 48px rgba(0,0,0,0.5)";
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.transform = plan.highlighted ? "scale(1.05)" : "scale(1)";
      el.style.boxShadow = plan.highlighted ? "0 0 22px rgba(0,229,255,0.22)" : "none";
    }}
  >
    {/* Popular badge — sits above the card, outside the gradient border */}
    {plan.highlighted && (
      <div style={{
        position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
        background: "linear-gradient(90deg, #E040FB, #00E5FF)",
        borderRadius: "999px", padding: "4px 16px",
        fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "12px", color: "#000",
        letterSpacing: "0.06em", textTransform: "uppercase" as const,
        whiteSpace: "nowrap", zIndex: 10,
      }}>
        Populární
      </div>
    )}

    <div
      className="pricing-card-body"
      style={{
      backgroundColor: "#0D0D0D",
      background: "radial-gradient(ellipse 60% 80% at 50% -10%, rgba(0,229,255,0.14) 0%, rgba(0,229,255,0) 70%), linear-gradient(145deg, #1A2633 0%, #0D0D0D 100%)",
      borderRadius: plan.highlighted ? "21px" : "24px",
      border: "1px solid rgba(255,255,255,0.08)",
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
          color: plan.highlighted ? "#00E5FF" : "#F0F4F8",
          marginBottom: "12px",
        }}>
          {plan.name}
        </h3>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", color: "rgba(136,153,170,0.95)", lineHeight: 1.6, margin: 0 }}>
          {plan.description}
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.15),rgba(255,255,255,0))" }} />

      {/* Features */}
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
        {plan.features.map(f => (
          <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{
              width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0, marginTop: "1px",
              background: "rgba(0,229,255,0.12)", border: "1px solid rgba(0,229,255,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <CheckIcon style={{ width: "11px", height: "11px", color: "#00E5FF", strokeWidth: 3 }} />
            </div>
            <span className="pricing-bullet" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", color: "rgba(240,244,248,0.85)", lineHeight: 1.5 }}>{f}</span>
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
          background: "linear-gradient(135deg,#0ABDC6,#00E5FF)",
          border: "none",
          borderRadius: "12px",
          fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "16px",
          color: "#070B14", cursor: "pointer",
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
    <section id="pricing" style={{ width: "100%", backgroundColor: "transparent", padding: "80px 0 100px", marginTop: "-50px" }}>
      <SectionDivider />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 id="pricing-heading" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4.5vw,56px)", color: "#fff", margin: "0 auto 20px", letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: "770px" }}>
            {isEn ? "Choose a Service" : "Vyberte službu"}
          </h2>
          <p className="section-sub" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", color: "rgba(255,255,255,0.65)", margin: "0 auto" }}>
            {isEn ? "Every project is unique for us. We design a solution tailored to your needs." : "Každý projekt je pro nás unikátní. Navrhneme řešení přesně podle vašich potřeb."}
            <br />
            {isEn ? "Within 3 days after consultation, you get a clear plan, solution proposal, and pricing - all free and with no obligation." : "Do 3 dnů od konzultace získáte jasný plán, návrh řešení a cenovou kalkulaci – vše nezávazně a zdarma."}
          </p>
        </div>

        {/* Desktop grid (hidden on mobile) */}
        <div className="pricing-grid-desktop" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px", alignItems: "stretch" }}>
          {plans.map(plan => (
            <PricingCard key={plan.name} plan={plan} navigate={navigate} />
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
                  <PricingCard plan={plan} navigate={navigate} />
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
                  background: i === mobileIdx ? "#00E5FF" : "rgba(255,255,255,0.2)",
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
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "system-ui", fontSize: "16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: (dir === -1 && mobileIdx === 0) || (dir === 1 && mobileIdx === plans.length - 1) ? 0.3 : 1,
                  transition: "background 200ms ease",
                }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(0,229,255,0.12)"; b.style.borderColor = "rgba(0,229,255,0.35)"; }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.05)"; b.style.borderColor = "rgba(255,255,255,0.15)"; }}
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
        @media(max-width:768px){
          .pricing-grid-desktop { display: none !important; }
          .pricing-mobile-carousel { display: block !important; }
          .pricing-carousel-track { will-change: transform; align-items: stretch; }
          .pricing-card { transform: scale(1) !important; }
          .popular-card { transform: scale(1) !important; }
          /* +50px vs prior mobile clamp; fixed height so all three cards match */
          .pricing-mobile-slide {
            height: clamp(414px, calc(54.6vh + 50px), 582px);
          }
          /* Remove flex-grow on feature list so CTA stays under bullets; extra space at bottom of card */
          .pricing-mobile-slide .pricing-card-body > ul {
            flex: 0 0 auto !important;
          }
          .pricing-mobile-slide .pricing-card-body {
            flex: 1 1 auto !important;
            gap: 16px !important;
          }
          .pricing-mobile-slide .pricing-card-outer {
            flex: 1 1 auto !important;
            min-height: 0;
          }
          .pricing-cta { padding: 10px 16px !important; font-size: 14px !important; margin-top: 0; }
          .pricing-bullet { font-size: 13px !important; line-height: 1.55 !important; }
          .pricing-dots { margin-top: 18px !important; }
          .pricing-arrows { margin-top: 10px !important; }
        }
        @media(prefers-reduced-motion:reduce){ .pricing-card,.pricing-cta{ transition:none !important; } }
        .pricing-cta:focus-visible{ outline:2px solid #00E5FF; outline-offset:3px; }
      `}</style>
    </section>
  );
};
