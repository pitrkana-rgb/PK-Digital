import { useState, useRef } from "react";
import { CheckIcon, ChevronRightIcon } from "lucide-react";

const pricingPlans = [
  {
    name: "Tvorba webu na míru",
    description: "Moderní, rychlý a srozumitelný web, který od první sekundy vysvětlí, co děláte a proč by to mělo zajímat vaše klienty.",
    price: "od 14 900 Kč",
    features: [
      "Konzultace a návrh řešení zdarma frontend verze",
      "Kompletní web standardně dodán do 14 dnů",
      "Zpracování včetně plně optimalizované mobilní verze",
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
      "Integrace AI nástrojů",
      "Chatbot, generování leadů, inteligentní vyhledávání, cenové kalkulátory a další",
      "Průběžná správa, údržba a datová optimalizace",
    ],
    highlighted: false,
    cta: "Chci modernizaci",
  },
];

import { SectionDivider } from "../../components/SectionDivider";
import { useNavigate } from "react-router-dom";

/* ── Card component shared by desktop grid + mobile carousel ── */
const PricingCard = ({ plan, navigate }: { plan: typeof pricingPlans[0]; navigate: (path: string) => void }) => (
  <div
    className={`pricing-card ${plan.highlighted ? "popular-card" : ""}`}
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

    <div style={{
      background: "#0D1B2A",
      borderRadius: plan.highlighted ? "21px" : "24px",
      border: plan.highlighted ? "none" : "1px solid rgba(0,229,255,0.12)",
      padding: "40px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "32px",
      boxSizing: "border-box" as const,
    }}>
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

      {/* Price */}
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "40px", color: "#F0F4F8", letterSpacing: "-0.03em", lineHeight: 1, marginTop: "-8px", marginBottom: "-8px" }}>
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
        className="pricing-cta"
        onClick={() => navigate("/kontakt")}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          padding: "14px 28px",
          background: plan.highlighted ? "linear-gradient(135deg,#0ABDC6,#00E5FF)" : "rgba(13,27,42,0.65)",
          border: plan.highlighted ? "none" : "1px solid rgba(0,229,255,0.12)",
          borderRadius: "12px",
          fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "16px",
          color: plan.highlighted ? "#070B14" : "#F0F4F8", cursor: "pointer",
          transition: "filter 250ms ease, transform 250ms ease",
          boxShadow: plan.highlighted ? "0 0 18px rgba(0,229,255,0.25)" : "none",
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
  const [mobileIdx, setMobileIdx] = useState(0);
  const touchStartX = useRef<number>(0);

  const goTo = (idx: number) => setMobileIdx(Math.max(0, Math.min(pricingPlans.length - 1, idx)));

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
    <section id="pricing" style={{ width: "100%", backgroundColor: "#000", padding: "80px 0 100px", marginTop: "-50px" }}>
      <SectionDivider />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4.5vw,56px)", color: "#fff", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Vyberte službu
          </h2>
          <p className="section-sub" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", color: "rgba(255,255,255,0.65)", margin: "0 auto", maxWidth: "560px" }}>
            Ať už potřebujete nový web od základu nebo modernizaci toho stávajícího, připravíme řešení, které odpovídá vašim cílům i rozpočtu.
          </p>
        </div>

        {/* Desktop grid (hidden on mobile) */}
        <div className="pricing-grid-desktop" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "24px", alignItems: "stretch" }}>
          {pricingPlans.map(plan => (
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
                width: `${pricingPlans.length * 100}%`,
                transform: `translateX(${-mobileIdx * (100 / pricingPlans.length)}%)`,
                transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              {pricingPlans.map((plan) => (
                <div key={plan.name} style={{ flex: `0 0 ${100 / pricingPlans.length}%`, padding: "20px 0 4px", boxSizing: "border-box" }}>
                  <PricingCard plan={plan} navigate={navigate} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="pricing-dots" style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
            {pricingPlans.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Přejít na kartu ${i + 1}`}
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
                aria-label={dir === -1 ? "Předchozí" : "Další"}
                onClick={() => goTo(mobileIdx + dir)}
                style={{
                  width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "system-ui", fontSize: "16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: (dir === -1 && mobileIdx === 0) || (dir === 1 && mobileIdx === pricingPlans.length - 1) ? 0.3 : 1,
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
        .pricing-mobile-carousel { display: none; }
        @media(max-width:768px){
          .pricing-grid-desktop { display: none !important; }
          .pricing-mobile-carousel { display: block !important; }
          .pricing-carousel-track { will-change: transform; }
          .pricing-card { transform: scale(1) !important; }
          .popular-card { transform: scale(1) !important; }
          .pricing-cta { padding: 10px 16px !important; font-size: 14px !important; }
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
