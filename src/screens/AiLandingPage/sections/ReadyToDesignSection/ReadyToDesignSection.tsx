import { ArrowRightIcon, ShieldCheckIcon, ZapIcon, UsersIcon } from "lucide-react";

const trustBadges = [
  { icon: ZapIcon, label: "Prototyp do 3 dnů" },
  { icon: ShieldCheckIcon, label: "Zaměřeno na konverze" },
  { icon: UsersIcon, label: "Osobní přístup" },
];

import { SectionDivider } from "../../components/SectionDivider";
import { useLanguage } from "../../../../i18n/LanguageContext";

import { useNavigate } from "react-router-dom";

export const ReadyToDesignSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isEn = language === "en";
  const badges = isEn
    ? [
      { icon: ZapIcon, label: "Prototype in 3 days" },
      { icon: ShieldCheckIcon, label: "Conversion-focused" },
      { icon: UsersIcon, label: "Personal approach" },
    ]
    : trustBadges;
  return (
    <section style={{ width: "100%", backgroundColor: "transparent", padding: "80px 0 100px", marginTop: "-50px", marginBottom: "-80px" }}>
      <SectionDivider />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div
          className="cta-inner"
          style={{
          position: "relative", borderRadius: "28px", overflow: "hidden",
          background: "linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "80px 64px",
        }}
        >
          {/* Radial glow background */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 60% 80% at 50% -10%,rgba(0,229,255,0.14) 0%,transparent 70%)",
          }} />
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg,transparent,#00E5FF,transparent)" }} />

          <div className="cta-stack" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "32px" }}>
            <h2 className="cta-heading" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(28px,4vw,56px)", color: "#fff", margin: 0, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: "792px" }}>
              {isEn ? "Ready for a website that works for you?" : "Připraveni na web, který pracuje za vás?"}
            </h2>

            <p className="section-sub cta-subtitle" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: 1.65, color: "rgba(255,255,255,0.65)", margin: 0 }}>
              {isEn
                ? "Whether you need a brand-new website or a modernization of your current one, start with a free, no-obligation consultation. You can have a prototype in as little as 3 days."
                : "Ať už potřebujete nový web od základu nebo modernizaci toho stávajícího — začněte nezávaznou konzultací zdarma. Prototyp můžete mít už do 3 dnů."}
            </p>

            {/* Trust badges */}
            <div className="cta-badges" style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
              {badges.map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Icon style={{ width: "16px", height: "16px", color: "#00E5FF" }} />
                  <span className="cta-badge-label" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: "14px", color: "rgba(255,255,255,0.65)" }}>{label}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              id="ready-cta-btn"
              className="animate-pulse-glow hero-primary-btn"
              onClick={() => navigate("/napiste-nam")}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "16px 36px",
                background: "linear-gradient(135deg,#0ABDC6,#00E5FF)",
                border: "none", borderRadius: "12px",
                fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "17px", color: "#070B14",
                cursor: "pointer",
                transition: "transform 0.25s ease, filter 0.25s ease",
              }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = "translateY(-4px)"; b.style.filter = "brightness(1.04)"; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = ""; b.style.filter = ""; }}
              onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)"; }}
              onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-4px)"; }}
            >
              {isEn ? "Contact us with no obligation" : "Nezávazně nás kontaktujte"}
              <ArrowRightIcon style={{ width: "18px", height: "18px" }} />
            </button>
          </div>
        </div>
      </div>
      <style>{`
      #ready-cta-btn:focus-visible{ outline:2px solid #00E5FF; outline-offset:3px; }
      @media(max-width:768px){
        .cta-inner { padding: 44px 20px !important; }
        .cta-stack { gap: 22px !important; }
        .cta-heading { font-size: 22px !important; line-height: 1.2 !important; }
        .cta-subtitle { font-size: 14px !important; }
        .cta-badge-label { font-size: 12px !important; }
        #ready-cta-btn { padding: 12px 24px !important; font-size: 15px !important; }
        .cta-badges { gap: 12px !important; }
      }
      @media(prefers-reduced-motion:reduce){ #ready-cta-btn{ transition:none !important; } }
    `}</style>
    </section>
  );
};
