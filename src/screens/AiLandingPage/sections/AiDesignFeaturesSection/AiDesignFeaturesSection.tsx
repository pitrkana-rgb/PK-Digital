import { SectionDivider } from "../../components/SectionDivider";

/* ── Inline SVG icons (outline / minimal style) ─────────────────── */
const ConsultationIcon = () => (
  <svg width="65" height="65" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* Phone handset — coordinates scaled 3× from 24×24 → 72×72 viewBox */}
    <path d="M66 50.76v9a6 6 0 0 1-6.54 6 59.37 59.37 0 0 1-25.89-9.21A58.5 58.5 0 0 1 14.55 36a59.37 59.37 0 0 1-9.21-26.01A6 6 0 0 1 11.31 3.54h9a6 6 0 0 1 6 5.16c.381 2.88 1.083 5.709 2.1 8.43a6 6 0 0 1-1.35 6.33l-3.81 3.81a48 48 0 0 0 18.48 18.48l3.81-3.81a6 6 0 0 1 6.33-1.35c2.721 1.017 5.55 1.719 8.43 2.1a6 6 0 0 1 5.16 6.09z" />
  </svg>
);

const PrototypeIcon = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="12" width="54" height="42" rx="3" />
    <line x1="9" y1="24" x2="63" y2="24" />
    <rect x="18" y="33" width="15" height="12" rx="2" />
    <line x1="42" y1="33" x2="54" y2="33" />
    <line x1="42" y1="40" x2="51" y2="40" />
    <line x1="27" y1="57" x2="45" y2="57" />
    <line x1="36" y1="54" x2="36" y2="57" />
  </svg>
);

const DevelopmentIcon = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="6" y="12" width="60" height="48" rx="4" />
    <polyline points="24 30 12 36 24 42" />
    <polyline points="48 30 60 36 48 42" />
    <line x1="33" y1="21" x2="39" y2="51" />
  </svg>
);

const HandoverIcon = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 27 9 57 63 57 63 27" />
    <polyline points="21 27 21 15 51 15 51 27" />
    <line x1="9" y1="27" x2="63" y2="27" />
    <polyline points="30 42 36 48 42 42" />
    <line x1="36" y1="33" x2="36" y2="48" />
  </svg>
);

const steps = [
  {
    num: "01",
    title: "Nezávazná konzultace",
    description:
      "Vyplníte krátký dotazník a do 24 hodin vám zavolám, abychom domluvili bezplatnou konzultaci a probrali vaši představu o webu.",
    Icon: ConsultationIcon,
  },
  {
    num: "02",
    title: "Prototyp zdarma",
    description:
      "Do 3 dnů získáte ukázku front-end verze webu a cenovou nabídku na míru. Podle prototypu se rozhodnete, zda chcete pokračovat.",
    Icon: PrototypeIcon,
  },
  {
    num: "03",
    title: "Vývoj webu",
    description:
      "Po schválení prototypu připravím kompletní web, který je standardně hotový do 14 dnů dle náročnosti projektu.",
    Icon: DevelopmentIcon,
  },
  {
    num: "04",
    title: "Předání a správa",
    description:
      "Web vám osobně vysvětlím, ukážu statistiky návštěvnosti a naučím vás, jak jej jednoduše upravovat.",
    Icon: HandoverIcon,
  },
];

export const AiDesignFeaturesSection = (): JSX.Element => (
  <section id="features" style={{ width: "100%", backgroundColor: "#000", padding: "80px 0 100px", marginTop: "-50px", marginBottom: "-50px" }}>
    <SectionDivider />
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

      {/* Section header */}
      <div className="how-it-works-head" style={{ marginBottom: "56px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4.5vw,52px)", lineHeight: 1.1, color: "#fff", margin: "0 auto 20px", letterSpacing: "-0.02em", maxWidth: "700px" }}>
          Jak probíhá{" "}
          <span style={{ background: "linear-gradient(135deg,#E040FB,#00E5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>spolupráce</span>
        </h2>
        <p className="section-sub" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: 1.6, color: "rgba(255,255,255,0.65)", margin: "0 auto", maxWidth: "640px" }}>
          Díky pokročilým AI nástrojům dokážeme výrazně zrychlit vývoj webu — prototyp připravíme do 3 dnů a hotový web dodáme již za 14 dnů.
        </p>
      </div>

      {/* Step grid */}
      <div className="stepper-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0", position: "relative" }}>

        {/* Connecting gradient line — desktop only */}
        <div
          className="stepper-line"
          style={{
            position: "absolute", top: "64px", left: "12.5%", right: "12.5%", height: "2px",
            background: "linear-gradient(90deg, rgba(0,229,255,0.95) 0%, rgba(0,229,255,0.35) 50%, rgba(0,229,255,0.12) 100%)",
            zIndex: 0,
          }}
        />

        {steps.map((step) => (
          <div
            key={step.num}
            className="step-block"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 20px", position: "relative", zIndex: 1 }}
          >
            {/* Icon container with spin-on-hover */}
            <div
              className="step-icon-wrap"
              style={{
                width: "128px", height: "128px",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "24px", flexShrink: 0,
                borderRadius: "50%",
                background: "rgba(0,229,255,0.06)",
                border: "1px solid rgba(0,229,255,0.18)",
                color: "#00E5FF",
                boxShadow: "0 0 18px rgba(0,229,255,0.10)",
                transition: "background 250ms ease, box-shadow 250ms ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = "rgba(0,229,255,0.12)";
                el.style.boxShadow = "0 0 28px rgba(0,229,255,0.22)";
                const icon = el.querySelector<SVGElement>(".step-svg-icon");
                if (icon) {
                  icon.style.transform = "rotate(360deg)";
                  icon.style.transition = "transform 0.7s ease-in-out";
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = "rgba(0,229,255,0.06)";
                el.style.boxShadow = "0 0 18px rgba(0,229,255,0.10)";
                const icon = el.querySelector<SVGElement>(".step-svg-icon");
                if (icon) {
                  icon.style.transform = "rotate(0deg)";
                  icon.style.transition = "transform 0.5s ease-in-out";
                }
              }}
            >
              <span className="step-svg-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <step.Icon />
              </span>
            </div>

            <div className="step-text">
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "17px", color: "#fff", marginBottom: "10px", lineHeight: 1.3 }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: 0 }}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <style>{`
      /* ── Mobile: stacked single column ── */
      @media(max-width:767px){
        .how-it-works-head { margin-bottom: 32px !important; }
        .stepper-grid {
          grid-template-columns: 1fr !important;
          gap: 16px !important;
        }
        .stepper-line { display: none !important; }
        .step-block {
          flex-direction: row !important;
          align-items: flex-start !important;
          text-align: left !important;
          padding: 16px !important;
          gap: 16px !important;
          background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.08);
          border-left: 2px solid rgba(0,229,255,0.35) !important;
          border-radius: 16px;
        }
        .step-icon-wrap {
          width: 72px !important;
          height: 72px !important;
          min-width: 72px !important;
          margin-bottom: 0 !important;
          flex-shrink: 0;
        }
        .step-icon-wrap svg {
          width: 40px !important;
          height: 40px !important;
        }
        .step-text h3 { font-size: 15px !important; margin-bottom: 4px !important; }
        .step-text p { font-size: 13px !important; }
      }
      /* Tablet: 2×2 grid */
      @media(min-width:768px) and (max-width:1023px){
        .stepper-grid { grid-template-columns: repeat(2,1fr) !important; gap: 40px 24px !important; }
        .stepper-line { display: none !important; }
        .step-block { padding: 0 8px !important; }
      }
      @media(prefers-reduced-motion:reduce){
        .step-svg-icon { transition: none !important; transform: none !important; }
        .step-icon-wrap { transition: none !important; }
      }
    `}</style>
  </section>
);
