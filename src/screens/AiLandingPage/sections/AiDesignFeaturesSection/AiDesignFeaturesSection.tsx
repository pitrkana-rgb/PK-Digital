import { SectionDivider } from "../../components/SectionDivider";
import { useLanguage } from "../../../../i18n/LanguageContext";

/* ── Modern SaaS-style icons (unique gradient ids per SVG) ──────── */
const ConsultationIcon = () => (
  <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="step-g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00E5FF" />
        <stop offset="55%" stopColor="#0ABDC6" />
        <stop offset="100%" stopColor="#E040FB" stopOpacity="0.85" />
      </linearGradient>
      <linearGradient id="step-g1s" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#E040FB" stopOpacity="0.25" />
      </linearGradient>
      <filter id="step-f1" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="1.2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <circle cx="32" cy="32" r="26" fill="url(#step-g1s)" opacity="0.4" />
    <rect x="18" y="12" width="28" height="44" rx="8" stroke="url(#step-g1)" strokeWidth="2.25" fill="rgba(0,229,255,0.06)" />
    <rect x="24" y="18" width="16" height="22" rx="2" fill="url(#step-g1)" opacity="0.15" />
    <circle cx="32" cy="46" r="2.5" fill="url(#step-g1)" />
    <path
      d="M8 28c4-8 12-12 24-12s20 4 24 12"
      stroke="url(#step-g1)"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.55"
      filter="url(#step-f1)"
    />
  </svg>
);

const PrototypeIcon = () => (
  <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="step-g2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00E5FF" />
        <stop offset="55%" stopColor="#0ABDC6" />
        <stop offset="100%" stopColor="#E040FB" stopOpacity="0.85" />
      </linearGradient>
    </defs>
    <rect x="8" y="14" width="48" height="38" rx="6" stroke="url(#step-g2)" strokeWidth="2.25" fill="rgba(0,229,255,0.05)" />
    <rect x="8" y="14" width="48" height="10" rx="6" fill="url(#step-g2)" opacity="0.12" />
    <circle cx="16" cy="19" r="2" fill="#00E5FF" opacity="0.9" />
    <circle cx="24" cy="19" r="2" fill="#0ABDC6" opacity="0.65" />
    <circle cx="32" cy="19" r="2" fill="#E040FB" opacity="0.5" />
    <rect x="16" y="30" width="14" height="10" rx="2" stroke="url(#step-g2)" strokeWidth="1.75" opacity="0.85" />
    <rect x="34" y="30" width="14" height="4" rx="1.5" fill="url(#step-g2)" opacity="0.35" />
    <rect x="34" y="36" width="10" height="4" rx="1.5" fill="url(#step-g2)" opacity="0.2" />
    <path d="M16 44h32" stroke="url(#step-g2)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const DevelopmentIcon = () => (
  <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="step-g3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00E5FF" />
        <stop offset="55%" stopColor="#0ABDC6" />
        <stop offset="100%" stopColor="#E040FB" stopOpacity="0.85" />
      </linearGradient>
      <filter id="step-f3" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="1.2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect x="10" y="12" width="44" height="42" rx="7" stroke="url(#step-g3)" strokeWidth="2.25" fill="rgba(0,229,255,0.04)" />
    <path
      d="M22 24l-6 8 6 8M42 24l6 8-6 8"
      stroke="url(#step-g3)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#step-f3)"
    />
    <path d="M30 28v8M34 28v8" stroke="url(#step-g3)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <circle cx="20" cy="46" r="2" fill="url(#step-g3)" opacity="0.7" />
    <circle cx="32" cy="46" r="2" fill="url(#step-g3)" opacity="0.45" />
    <circle cx="44" cy="46" r="2" fill="url(#step-g3)" opacity="0.25" />
  </svg>
);

const HandoverIcon = () => (
  <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="step-g4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00E5FF" />
        <stop offset="55%" stopColor="#0ABDC6" />
        <stop offset="100%" stopColor="#E040FB" stopOpacity="0.85" />
      </linearGradient>
      <filter id="step-f4" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="1.2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect x="12" y="16" width="32" height="36" rx="5" stroke="url(#step-g4)" strokeWidth="2.25" fill="rgba(0,229,255,0.05)" />
    <path d="M18 26h20M18 32h14M18 38h18" stroke="url(#step-g4)" strokeWidth="1.75" strokeLinecap="round" opacity="0.45" />
    <circle cx="28" cy="44" r="3" fill="url(#step-g4)" opacity="0.5" />
    <path
      d="M44 32h12M52 26l6 6-6 6"
      stroke="url(#step-g4)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#step-f4)"
    />
    <circle cx="50" cy="32" r="10" stroke="url(#step-g4)" strokeWidth="1.5" opacity="0.25" fill="none" />
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

const stepsEn = [
  {
    num: "01",
    title: "Free consultation",
    description:
      "You fill in a short form and within 24 hours we call to schedule a free consultation and discuss your website goals.",
    Icon: ConsultationIcon,
  },
  {
    num: "02",
    title: "Free prototype",
    description:
      "Within 3 days you get a front-end prototype and a tailored pricing proposal. Then you decide whether to continue.",
    Icon: PrototypeIcon,
  },
  {
    num: "03",
    title: "Website development",
    description:
      "After prototype approval, we build the complete website, typically delivered within 14 days based on project complexity.",
    Icon: DevelopmentIcon,
  },
  {
    num: "04",
    title: "Handover and management",
    description:
      "We personally walk you through the website, show key metrics, and teach you how to edit it easily.",
    Icon: HandoverIcon,
  },
];

export const AiDesignFeaturesSection = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const items = isEn ? stepsEn : steps;
  return (
  <section id="features" style={{ width: "100%", backgroundColor: "transparent", padding: "80px 0 100px", marginTop: "-50px", marginBottom: "-50px" }}>
    <SectionDivider />
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

      {/* Section header */}
      <div className="how-it-works-head" style={{ marginBottom: "56px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4.5vw,52px)", lineHeight: 1.1, color: "#fff", margin: "0 auto 20px", letterSpacing: "-0.02em", maxWidth: "770px" }}>
          {isEn ? "How the " : "Jak probíhá "}
          <span style={{ background: "linear-gradient(135deg,#E040FB,#00E5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{isEn ? "collaboration works" : "spolupráce"}</span>
        </h2>
        <p className="section-sub" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: 1.6, color: "rgba(255,255,255,0.65)", margin: "0 auto" }}>
          {isEn
            ? "With advanced AI tools, we significantly accelerate development - prototype in 3 days and full website in 14 days."
            : "Díky pokročilým AI nástrojům dokážeme výrazně zrychlit vývoj webu — prototyp připravíme do 3 dnů a hotový web dodáme již za 14 dnů."}
        </p>
      </div>

      {/* Step grid */}
      <div className="stepper-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0", position: "relative" }}>

        {/* Connecting line — behind circles; circles use opaque fill so line is not visible inside */}
        <div
          className="stepper-line"
          style={{
            position: "absolute",
            top: "64px",
            left: "12.5%",
            right: "12.5%",
            height: "2px",
            background: "linear-gradient(90deg, rgba(0,229,255,0.95) 0%, rgba(0,229,255,0.35) 50%, rgba(0,229,255,0.12) 100%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Time labels between steps */}
        <div
          className="stepper-time-label"
          style={{
            position: "absolute",
            top: "40px",
            left: "25%",
            transform: "translateX(-50%)",
            zIndex: 2,
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 800,
            fontSize: "18px",
            color: "rgba(255,255,255,0.75)",
            background: "rgba(7,12,18,0.96)",
            border: "1px solid rgba(0,229,255,0.18)",
            padding: "6px 10px",
            borderRadius: "999px",
            whiteSpace: "nowrap",
            backdropFilter: "blur(8px)",
            pointerEvents: "none",
          }}
        >
          {isEn ? "24 hours" : "24 hodin"}
        </div>
        <div
          className="stepper-time-label"
          style={{
            position: "absolute",
            top: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 800,
            fontSize: "18px",
            color: "rgba(255,255,255,0.75)",
            background: "rgba(7,12,18,0.96)",
            border: "1px solid rgba(0,229,255,0.18)",
            padding: "6px 10px",
            borderRadius: "999px",
            whiteSpace: "nowrap",
            backdropFilter: "blur(8px)",
            pointerEvents: "none",
          }}
        >
          {isEn ? "3 days" : "3 dny"}
        </div>
        <div
          className="stepper-time-label"
          style={{
            position: "absolute",
            top: "40px",
            left: "75%",
            transform: "translateX(-50%)",
            zIndex: 2,
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 800,
            fontSize: "18px",
            color: "rgba(255,255,255,0.75)",
            background: "rgba(7,12,18,0.96)",
            border: "1px solid rgba(0,229,255,0.18)",
            padding: "6px 10px",
            borderRadius: "999px",
            whiteSpace: "nowrap",
            backdropFilter: "blur(8px)",
            pointerEvents: "none",
          }}
        >
          {isEn ? "14 days" : "14 dnů"}
        </div>

        {items.map((step) => (
          <div
            key={step.num}
            className="step-block"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 20px", position: "relative", zIndex: 1 }}
          >
            {/* Icon: opaque disc masks the connector line; rotate only on hover */}
            <div
              className="step-icon-wrap"
              style={{
                width: "128px",
                height: "128px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
                flexShrink: 0,
                borderRadius: "50%",
                /* Opaque disc masks connector line; subtle cyan rim */
                background: "radial-gradient(circle at 50% 28%, rgba(0,229,255,0.1) 0%, #05060a 35%, #030305 55%, #000 100%)",
                border: "1px solid rgba(0,229,255,0.28)",
                boxShadow: "0 0 24px rgba(0,229,255,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
                transition: "background 250ms ease, box-shadow 250ms ease, border-color 250ms ease",
                cursor: "default",
                position: "relative",
                perspective: "900px",
                transformStyle: "preserve-3d",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(0,229,255,0.45)";
                el.style.boxShadow = "0 0 32px rgba(0,229,255,0.22), inset 0 1px 0 rgba(255,255,255,0.08)";
                const icon = el.querySelector<HTMLElement>(".step-svg-icon");
                if (icon) icon.classList.add("step-icon-rotate-3d");
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(0,229,255,0.28)";
                el.style.boxShadow = "0 0 24px rgba(0,229,255,0.12), inset 0 1px 0 rgba(255,255,255,0.06)";
                const icon = el.querySelector<HTMLElement>(".step-svg-icon");
                if (icon) icon.classList.remove("step-icon-rotate-3d");
              }}
            >
              <span
                className="step-svg-icon"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                <span className="step-svg-face step-svg-front" aria-hidden="true">
                  <step.Icon />
                </span>
                <span className="step-svg-face step-svg-back" aria-hidden="true">
                  <step.Icon />
                </span>
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
      /* Ensure SVG stays visible through 3D rotation */
      .step-svg-icon{
        backface-visibility: visible !important;
        transform-style: preserve-3d !important;
        will-change: transform;
        position: relative;
        width: 56px;
        height: 56px;
      }

      .step-svg-face{
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        backface-visibility: hidden;
        transform-style: preserve-3d;
        opacity: 1 !important;
      }
      .step-svg-front{
        transform: translateZ(1px);
      }
      .step-svg-back{
        transform: rotateY(180deg) translateZ(1px);
      }
      @keyframes step-icon-rotate-3d{
        from { transform: rotateY(0deg) translateZ(1px); }
        to { transform: rotateY(360deg) translateZ(1px); }
      }
      .step-icon-rotate-3d{
        animation: step-icon-rotate-3d 3200ms cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      .step-svg-icon svg{
        backface-visibility: visible !important;
        transform-style: preserve-3d !important;
        -webkit-backface-visibility: visible !important;
      }
      .step-svg-icon *{
        backface-visibility: visible !important;
      }

      /* ── Mobile: stacked single column ── */
      @media(max-width:767px){
        .how-it-works-head { margin-bottom: 32px !important; }
        .stepper-grid {
          grid-template-columns: 1fr !important;
          gap: 16px !important;
        }
        .stepper-line { display: none !important; }
        .stepper-time-label { display: none !important; }
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
        .stepper-time-label { display: none !important; }
        .step-block { padding: 0 8px !important; }
      }
      @media(prefers-reduced-motion:reduce){
        .step-svg-icon { transition: none !important; transform: none !important; }
        .step-icon-wrap { transition: none !important; }
      }
    `}</style>
  </section>
);
};
