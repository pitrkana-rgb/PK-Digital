import { SectionDivider } from "../../components/SectionDivider";

const steps = [
  {
    num: "01",
    title: "Konzultace",
    description: "Domluvte si zdarma konzultaci, kde probereme vaši vizi.",
    img: "/Konzultace_Icon.png",
    alt: "Konzultace icon",
  },
  {
    num: "02",
    title: "Návrh",
    description: "Do 3 dnů připravíme zdarma funkční front-end verzi webu.",
    img: "/Navrh_Icon.png",
    alt: "Návrh icon",
  },
  {
    num: "03",
    title: "Implementace",
    description: "Díky AI standardně dodáme hotový web do 14 dnů.",
    img: "/Implementace_Icon.png",
    alt: "Implementace icon",
  },
  {
    num: "04",
    title: "Optimalizace",
    description: "Sledujeme fungování webu a navrhujeme další zlepšení.",
    img: "/Optimalizace_Icon.png",
    alt: "Optimalizace icon",
  },
];

export const AiDesignFeaturesSection = (): JSX.Element => (
  <section id="features" style={{ width: "100%", backgroundColor: "#000", padding: "80px 0 100px", marginTop: "-50px", marginBottom: "-50px" }}>
    <SectionDivider />
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

      {/* Section badge + headline */}
      <div className="how-it-works-head" style={{ marginBottom: "56px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4.5vw,52px)", lineHeight: 1.1, color: "#fff", margin: "0 auto 20px", letterSpacing: "-0.02em", maxWidth: "700px" }}>
          Jak probíhá{" "}
          <span style={{ background: "linear-gradient(135deg,#E040FB,#00E5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>spolupráce</span>
        </h2>
        <p className="section-sub" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: 1.6, color: "rgba(255,255,255,0.65)", margin: "0 auto", maxWidth: "600px" }}>
          Díky pokročilým AI nástrojům dokážeme výrazně zrychlit vývoj webu a dodat kompletní řešení v krátkém časovém horizontu.
        </p>
      </div>

      {/* Desktop: horizontal stepper (4 columns) | Mobile: stacked rows */}
      <div className="stepper-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0", position: "relative" }}>

        {/* Connecting gradient line — desktop only */}
        <div
          className="stepper-line"
          style={{
            position: "absolute", top: "54px", left: "12.5%", right: "12.5%", height: "2px",
            background: "linear-gradient(90deg, rgba(0,229,255,0.95) 0%, rgba(0,229,255,0.35) 50%, rgba(0,229,255,0.12) 100%)",
            zIndex: 0,
          }}
        />

        {steps.map((step) => (
          <div
            key={step.num}
            className="step-block"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 16px", position: "relative", zIndex: 1 }}
          >
            {/* Icon image container — no background circle */}
            <div
              className="step-img-wrap"
              style={{
                width: "108px", height: "108px",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "24px", flexShrink: 0,
                position: "relative",
                transition: "transform 250ms ease",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "scale(1.08)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ""; }}
            >
              <img
                src={step.img}
                alt={step.alt}
                style={{
                  width: "96px", height: "96px",
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 14px rgba(0,229,255,0.22))",
                }}
              />

            </div>

            <div className="step-text">
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "18px", color: "#fff", marginBottom: "12px", lineHeight: 1.3 }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <style>{`
      /* ── Mobile: 2-col row layout per step ── */
      @media(max-width:767px){
        .how-it-works-head{
          margin-bottom: 32px !important;
        }
        .stepper-grid{
          grid-template-columns: 1fr !important;
          gap: 12px !important;
        }
        .stepper-line{ display:none !important; }

        .step-block{
          flex-direction: row !important;
          align-items: center !important;
          text-align: left !important;
          padding: 16px !important;
          gap: 16px !important;
          background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.08);
          border-left: 2px solid rgba(0,229,255,0.3) !important;
          border-radius: 16px;
        }

        .step-img-wrap{
          width: 64px !important;
          height: 64px !important;
          min-width: 64px !important;
          margin-bottom: 0 !important;
          flex-shrink: 0;
        }

        .step-img-wrap img{
          width: 48px !important;
          height: 48px !important;
        }

        .step-text h3{
          font-size: 15px !important;
          margin-bottom: 4px !important;
        }
        .step-text p{
          font-size: 13px !important;
        }
      }

      /* Tablet: 2×2 grid, still vertical cards */
      @media(min-width:768px) and (max-width:1023px){
        .stepper-grid{ grid-template-columns:repeat(2,1fr) !important; gap:32px 24px !important; }
        .stepper-line{ display:none !important; }
        .step-block{ padding: 0 8px !important; }
      }

      @media(prefers-reduced-motion:reduce){ .step-img-wrap{ transition:none !important; } }
    `}</style>
  </section>
);
