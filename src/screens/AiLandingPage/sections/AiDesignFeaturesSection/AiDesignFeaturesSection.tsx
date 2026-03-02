import { MessageCircleIcon, CheckCircle2Icon, Code2Icon, CogIcon } from "lucide-react";

const steps = [
  { num: "01", title: "Bezplatná konzultace", description: "Nezávazně projdeme váš web nebo projektový záměr, identifikujeme konverzní příležitosti a navrhneme konkrétní možnosti využití AI pro zvýšení výkonu.", icon: MessageCircleIcon },
  { num: "02", title: "Návrh řešení", description: "Připravíme strategii a strukturu webu a během přibližně 3 dnů vytvoříme bezplatnou frontendovou verzi, abyste si mohli ověřit směr a podobu řešení ještě před plnou realizací.", icon: CheckCircle2Icon },
  { num: "03", title: "Vývoj a implementace", description: "Po schválení konceptu web dokončíme nebo modernizujeme, implementujeme AI nástroje a nastavíme měření výkonu i konverzí.", icon: Code2Icon },
  { num: "04", title: "Optimalizace a rozvoj", description: "Na základě dat web průběžně optimalizujeme, rozšiřujeme AI funkce a dlouhodobě zvyšujeme jeho obchodní přínos.", icon: CogIcon },
];

import { SectionDivider } from "../../components/SectionDivider";

export const AiDesignFeaturesSection = (): JSX.Element => (
  <section id="features" style={{ width: "100%", backgroundColor: "#000", padding: "80px 0 100px", marginTop: "-50px", marginBottom: "-50px" }}>
    <SectionDivider />
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

      {/* Section badge + headline */}
      <div style={{ marginBottom: "56px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4.5vw,52px)", lineHeight: 1.1, color: "#fff", margin: "0 auto 20px", letterSpacing: "-0.02em", maxWidth: "700px" }}>
          Jak probíhá{" "}
          <span style={{ background: "linear-gradient(135deg,#FF6A2A,#FFB347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>spolupráce</span>
        </h2>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: 1.6, color: "rgba(255,255,255,0.65)", margin: "0 auto", maxWidth: "560px" }}>
          Navrhujeme AI řešení, která propojují váš web, interní nástroje i tým. Od prvního nápadu až po škálování.
        </p>
      </div>

      {/* Horizontal stepper */}
      <div className="stepper-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0", position: "relative" }}>
        {/* Connecting gradient line */}
        <div style={{
          position: "absolute", top: "36px", left: "12.5%", right: "12.5%", height: "2px",
          background: "linear-gradient(90deg, #FF5A1F 0%, rgba(255,90,31,0.4) 50%, rgba(255,90,31,0.1) 100%)",
          zIndex: 0,
        }} className="stepper-line" />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="step-block"
              style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 16px", position: "relative", zIndex: 1 }}
            >
              {/* Numbered circle */}
              <div
                className="step-circle"
                style={{
                  width: "72px", height: "72px", borderRadius: "50%",
                  background: "linear-gradient(135deg,#FF6A2A,#FF3C00)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "24px", flexShrink: 0,
                  boxShadow: "0 0 0 0 rgba(255,90,31,0.4)",
                  transition: "box-shadow 250ms ease, transform 250ms ease",
                  position: "relative",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 0 0 12px rgba(255,90,31,0.15)"; el.style.transform = "scale(1.08)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 0 0 0 rgba(255,90,31,0.4)"; el.style.transform = ""; }}
              >
                <Icon style={{ width: "40px", height: "40px", color: "#fff" }} strokeWidth={1.75} />
                <span style={{
                  position: "absolute", top: "-6px", right: "-6px",
                  width: "22px", height: "22px", borderRadius: "50%",
                  background: "#000", border: "1px solid rgba(255,90,31,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "10px", color: "#FF5A1F",
                }}>
                  {i + 1}
                </span>
              </div>

              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "18px", color: "#fff", marginBottom: "12px", lineHeight: 1.3 }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>

    <style>{`
      @media(max-width:768px){
        .stepper-grid{ grid-template-columns:repeat(2,1fr) !important; gap:48px 24px !important; }
        .stepper-line{ display:none !important; }
      }
      @media(max-width:480px){
        .stepper-grid{ grid-template-columns:1fr !important; gap:40px !important; }
        .step-block{ align-items:center !important; text-align:center !important; }
        .step-circle{ margin-bottom:16px !important; }
      }
      @media(prefers-reduced-motion:reduce){ .step-circle{ transition:none !important; } }
    `}</style>
  </section>
);
