import { ArrowRightIcon, ShieldCheckIcon, ZapIcon, UsersIcon } from "lucide-react";

const trustBadges = [
  { icon: ZapIcon, label: "Prototyp do 3 dnů" },
  { icon: ShieldCheckIcon, label: "Zaměřeno na konverze" },
  { icon: UsersIcon, label: "Osobní přístup" },
];

import { SectionDivider } from "../../components/SectionDivider";

import { useNavigate } from "react-router-dom";

export const ReadyToDesignSection = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <section style={{ width: "100%", backgroundColor: "#000", padding: "80px 0 100px", marginTop: "-50px", marginBottom: "-80px" }}>
      <SectionDivider />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{
          position: "relative", borderRadius: "28px", overflow: "hidden",
          background: "linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "80px 64px",
        }}>
          {/* Radial glow background */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 60% 80% at 50% -10%,rgba(255,90,31,0.18) 0%,transparent 70%)",
          }} />
          {/* Orange grain border top */}
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg,transparent,#FF5A1F,transparent)" }} />

          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "32px" }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(28px,4vw,56px)", color: "#fff", margin: 0, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: "720px" }}>
              Připraveni na web, který pracuje za vás?
            </h2>

            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: 1.65, color: "rgba(255,255,255,0.65)", margin: 0, maxWidth: "560px" }}>
              Ať už potřebujete nový web od základu nebo modernizaci toho stávajícího — začněte nezávaznou konzultací zdarma. Prototyp můžete mít už do 3 dnů.
            </p>

            {/* Trust badges */}
            <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Icon style={{ width: "16px", height: "16px", color: "#FF5A1F" }} />
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: "14px", color: "rgba(255,255,255,0.65)" }}>{label}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              id="ready-cta-btn"
              onClick={() => navigate("/kontakt")}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "16px 36px",
                background: "linear-gradient(135deg,#FF6A2A,#FF3C00)",
                border: "none", borderRadius: "12px",
                fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "17px", color: "#fff",
                cursor: "pointer",
                transition: "transform 250ms ease, box-shadow 250ms ease, filter 250ms ease",
                boxShadow: "0 16px 40px rgba(255,90,31,0.35)",
              }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = "translateY(-4px)"; b.style.filter = "brightness(1.08)"; b.style.boxShadow = "0 24px 56px rgba(255,90,31,0.45)"; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = ""; b.style.filter = ""; b.style.boxShadow = "0 16px 40px rgba(255,90,31,0.35)"; }}
              onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)"; }}
              onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-4px)"; }}
            >
              Nezávazně nás kontaktujte
              <ArrowRightIcon style={{ width: "18px", height: "18px" }} />
            </button>
          </div>
        </div>
      </div>
      <style>{`
      #ready-cta-btn:focus-visible{ outline:2px solid #FF5A1F; outline-offset:3px; }
      @media(max-width:768px){ div[style*="padding: 80px 64px"]{ padding:40px 24px !important; } }
      @media(prefers-reduced-motion:reduce){ #ready-cta-btn{ transition:none !important; } }
    `}</style>
    </section>
  );
};
