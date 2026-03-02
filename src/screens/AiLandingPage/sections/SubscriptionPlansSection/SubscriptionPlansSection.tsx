import { CheckIcon, ChevronRightIcon } from "lucide-react";

const pricingPlans = [
  {
    name: "Tvorba webu na míru",
    description: "Moderní, rychlý a srozumitelný web, který od první sekundy vysvětlí, co děláte a proč by to mělo zajímat vaše klienty.",
    price: "od 9 900 Kč",
    features: [
      "Konzultace a návrh řešení zdarma včetně frontend implementace",
      "Kompletní web standardně dodán do 14 dnů",
      "Responzivní zpracování včetně plně optimalizované mobilní verze",
      "Možnost napojení na interní systémy a aplikace třetích stran",
      "Zahrnutý následný technický support a údržba",
    ],
    highlighted: true,
    cta: "Chci web",
  },
  {
    name: "Modernizace webových stránek",
    description: "Kompletní modernizace vašeho stávajícího webu — nový design, vyšší rychlost, lepší konverze a nasazení AI nástrojů pro růst.",
    price: "Individuální",
    features: [
      "Bezplatný audit stávajícího webu a návrh vylepšení",
      "Redesign a modernizace vizuální identity",
      "Optimalizace rychlosti, SEO a konverzního výkonu",
      "Integrace AI chatbotů a automatizačních nástrojů",
      "Průběžná správa, údržba a datová optimalizace",
    ],
    highlighted: false,
    cta: "Chci modernizaci",
  },
];

import { SectionDivider } from "../../components/SectionDivider";

import { useNavigate } from "react-router-dom";

export const SubscriptionPlansSection = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <section id="pricing" style={{ width: "100%", backgroundColor: "#000", padding: "80px 0 100px", marginTop: "-50px" }}>
      <SectionDivider />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4.5vw,56px)", color: "#fff", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Vyberte službu
          </h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", color: "rgba(255,255,255,0.65)", margin: "0 auto", maxWidth: "560px" }}>
            Ať už potřebujete nový web od základu nebo modernizaci toho stávajícího, připravíme řešení, které odpovídá vašim cílům i rozpočtu.
          </p>
        </div>

        {/* Cards */}
        <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "24px", alignItems: "stretch" }}>
          {pricingPlans.map(plan => (
            <div
              key={plan.name}
              className={`pricing-card ${plan.highlighted ? 'popular-card' : ''}`}
              style={{
                position: "relative",
                borderRadius: "24px",
                padding: plan.highlighted ? "3px" : "0",
                background: plan.highlighted
                  ? "linear-gradient(145deg, #FF6A2A, #FF3C00 60%, #6B21A8)"
                  : "transparent",
                transition: "transform 250ms ease, box-shadow 250ms ease",
                transform: plan.highlighted ? "scale(1.05)" : "scale(1)",
                zIndex: plan.highlighted ? 5 : 1,
                boxShadow: plan.highlighted ? "0 24px 64px rgba(255,90,31,0.25)" : "none",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = plan.highlighted ? "scale(1.08) translateY(-4px)" : "translateY(-8px)";
                el.style.boxShadow = plan.highlighted ? "0 32px 80px rgba(255,90,31,0.35)" : "0 24px 48px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = plan.highlighted ? "scale(1.05)" : "scale(1)";
                el.style.boxShadow = plan.highlighted ? "0 24px 64px rgba(255,90,31,0.25)" : "none";
              }}
            >
              {plan.highlighted && (
                <div style={{
                  position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
                  background: "linear-gradient(135deg,#FF6A2A,#FF3C00)",
                  borderRadius: "999px", padding: "4px 16px",
                  fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "12px", color: "#fff",
                  letterSpacing: "0.06em", textTransform: "uppercase" as const,
                  whiteSpace: "nowrap", zIndex: 2,
                }}>
                  Populární
                </div>
              )}

              <div style={{
                background: "#0D0D0D",
                borderRadius: plan.highlighted ? "21px" : "24px",
                border: plan.highlighted ? "none" : "1px solid rgba(255,255,255,0.08)",
                padding: "40px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "32px",
              }}>
                {/* Plan name */}
                <div>
                  <h3 style={{
                    fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700,
                    fontSize: plan.highlighted ? "26px" : "22px",
                    color: plan.highlighted ? "#FF5A1F" : "#fff",
                    marginBottom: "12px",
                  }}>
                    {plan.name}
                  </h3>
                  <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: 0 }}>
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "40px", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {plan.price}
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.15),rgba(255,255,255,0))" }} />

                {/* Features */}
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <div style={{
                        width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0, marginTop: "1px",
                        background: "rgba(255,90,31,0.15)", border: "1px solid rgba(255,90,31,0.4)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <CheckIcon style={{ width: "11px", height: "11px", color: "#FF5A1F", strokeWidth: 3 }} />
                      </div>
                      <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  type="button"
                  className="pricing-cta"
                  onClick={() => navigate("/kontakt")}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    padding: "14px 28px",
                    background: plan.highlighted ? "linear-gradient(135deg,#FF6A2A,#FF3C00)" : "rgba(255,255,255,0.06)",
                    border: plan.highlighted ? "none" : "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "16px",
                    color: "#fff", cursor: "pointer",
                    transition: "filter 250ms ease, transform 250ms ease",
                    boxShadow: plan.highlighted ? "0 12px 30px rgba(255,90,31,0.35)" : "none",
                  }}
                  onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.filter = "brightness(1.1)"; b.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.filter = ""; b.style.transform = ""; }}
                >
                  {plan.cta}
                  <ChevronRightIcon style={{ width: "18px", height: "18px" }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
      @media(max-width:768px){
        .pricing-grid{ grid-template-columns:1fr !important; gap: 48px !important; }
      }
      @media(prefers-reduced-motion:reduce){ .pricing-card,.pricing-cta{ transition:none !important; } }
      .pricing-cta:focus-visible{ outline:2px solid #FF5A1F; outline-offset:3px; }
    `}</style>
    </section>
  );
};
