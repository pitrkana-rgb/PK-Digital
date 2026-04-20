import { useEffect, useRef, useState } from "react";
import { SectionDivider } from "../../components/SectionDivider";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";

import konzultaceIcon from "../../../../assets/icons/konzultace_icon.png";
import prototypIcon from "../../../../assets/icons/prototyp_icon.png";
import vyvojWebuIcon from "../../../../assets/icons/vyvoj_webu_icon.png";
import predaniWebuIcon from "../../../../assets/icons/predani_webu_icon.png";

type StepItem = {
  num: string;
  title: string;
  description: string;
  iconSrc: string;
};

const steps: StepItem[] = [
  {
    num: "01",
    title: "Nezávazná konzultace",
    description:
      "Vyplníte krátký dotazník a do 24 hodin vám zavolám, abychom domluvili bezplatnou konzultaci a probrali vaši představu o webu.",
    iconSrc: konzultaceIcon,
  },
  {
    num: "02",
    title: "Prototyp zdarma",
    description:
      "Do 3 dnů získáte ukázku front-end verze webu a cenovou nabídku na míru. Podle prototypu se rozhodnete, zda chcete pokračovat.",
    iconSrc: prototypIcon,
  },
  {
    num: "03",
    title: "Vývoj webu",
    description:
      "Po schválení prototypu připravím kompletní web, který je standardně hotový do 14 dnů dle náročnosti projektu.",
    iconSrc: vyvojWebuIcon,
  },
  {
    num: "04",
    title: "Předání a správa",
    description:
      "Web vám osobně vysvětlím, ukážu statistiky návštěvnosti a naučím vás, jak jej jednoduše upravovat.",
    iconSrc: predaniWebuIcon,
  },
];

const stepsEn: StepItem[] = [
  {
    num: "01",
    title: "Free consultation",
    description:
      "You fill in a short form and within 24 hours we call to schedule a free consultation and discuss your website goals.",
    iconSrc: konzultaceIcon,
  },
  {
    num: "02",
    title: "Free prototype",
    description:
      "Within 3 days you get a front-end prototype and a tailored pricing proposal. Then you decide whether to continue.",
    iconSrc: prototypIcon,
  },
  {
    num: "03",
    title: "Website development",
    description:
      "After prototype approval, we build the complete website, typically delivered within 14 days based on project complexity.",
    iconSrc: vyvojWebuIcon,
  },
  {
    num: "04",
    title: "Handover and management",
    description:
      "We personally walk you through the website, show key metrics, and teach you how to edit it easily.",
    iconSrc: predaniWebuIcon,
  },
];

export const AiDesignFeaturesSection = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const items = isEn ? stepsEn : steps;
  const baseDelay = 490; // 30% faster vs 700ms
  const stepInterval = 980; // 30% faster vs 1400ms
  // ~20% darker tones vs previous (per design request)
  const stepColors = [pk.stepViolet, pk.stepVioletDeep, pk.stepTeal, pk.stepTealDeep];

  const sectionRef = useRef<HTMLElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        obs.disconnect();
      },
      {
        threshold: 0.12,
        // Require a bit more scroll before starting animations
        rootMargin: "-50px 0px 0px 0px",
      },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
  <section ref={sectionRef} id="features" style={{ width: "100%", backgroundColor: pk.page, padding: "70px 0 80px", marginTop: "-50px", marginBottom: "-50px" }}>
    <SectionDivider />
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>

      {/* Section header */}
      <div className="how-it-works-head" style={{ marginBottom: "56px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(26px,3.6vw,42px)", lineHeight: 1.1, color: pk.ink, margin: "0 auto 20px", letterSpacing: "-0.02em", maxWidth: "770px" }}>
          {isEn ? "How the " : "Jak probíhá "}
          <span style={{ color: pk.ink }}>{isEn ? "collaboration works" : "spolupráce"}</span>
        </h2>
        <p className="section-sub" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: 1.6, color: pk.ink65, margin: "0 auto" }}>
          {isEn
            ? "With advanced AI tools, we significantly accelerate development - prototype in 3 days and full website in 14 days."
            : "Díky pokročilým AI nástrojům dokážeme výrazně zrychlit vývoj webu — prototyp připravíme do 3 dnů a hotový web dodáme již za 14 dnů."}
        </p>
      </div>

      {/* Step grid */}
      <div className="stepper-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0", position: "relative" }}>
        {/* Base line */}
        <div aria-hidden="true" className="stepper-line" />

        {/* Segmented gradient fill (syncs with step reveal) */}
        {Array.from({ length: 3 }).map((_, segIdx) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static segments
            key={segIdx}
            aria-hidden="true"
            className={`stepper-line-seg${started ? " is-started" : ""}`}
            style={{
              left: `${12.5 + segIdx * 25}%`,
              background: `linear-gradient(90deg, ${stepColors[segIdx]} 0%, ${stepColors[segIdx + 1]} 100%)`,
              animationDelay: `${baseDelay + segIdx * stepInterval}ms`,
              animationDuration: `${stepInterval}ms`,
            }}
          />
        ))}

        {items.map((step, idx) => {
          const color = stepColors[idx] ?? stepColors[0]!;
          return (
            <div
              key={step.num}
              className="step-block"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "0 18px",
                position: "relative",
                zIndex: 1,
                opacity: 0,
                transform: "translateY(14px)",
                animation: started ? `stepperFadeUp 490ms cubic-bezier(0.2,0.8,0.2,1) forwards` : "none",
                animationDelay: started ? `${baseDelay + idx * stepInterval}ms` : "0ms",
              }}
            >
              {/* Hex + icon */}
              <div className="step-hex-wrap" aria-hidden="true">
                <div className="step-hex">
                  <div className="step-hex-inner">
                    <div className="step-hex-icon">
                      <img src={step.iconSrc} alt="" aria-hidden="true" className="step-hex-icon-img" />
                    </div>
                    <div className="step-hex-num" style={{ color }}>
                      {isEn ? "STEP" : "KROK"} {idx + 1}
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector down to the line */}
              <div className="step-connector" aria-hidden="true" />

              {/* Dot sitting on the horizontal line */}
              <div className="step-dot" aria-hidden="true" style={{ borderColor: color }} />

              <div className="step-text">
                <h3 className="step-title-gradient" style={{ color }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "14px", color: pk.ink65, lineHeight: 1.65, margin: 0 }}>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    <style>{`
      @keyframes stepperFadeUp{
        from{ opacity: 0; transform: translateY(14px); }
        to{ opacity: 1; transform: translateY(0); }
      }
      @keyframes stepperFadeIn{
        from{ opacity: 0; transform: translateX(-50%) scale(0.98); }
        to{ opacity: 1; transform: translateX(-50%) scale(1); }
      }
      @keyframes stepperLineLoad{
        from{ transform: scaleX(0); }
        to{ transform: scaleX(1); }
      }
      @keyframes stepperLineFill{
        from{ transform: scaleX(0); }
        to{ transform: scaleX(1); }
      }

      .stepper-grid{
        --hex-h: 196px;
        --connector-h: 44px;
        --dot: 28px;
        --line-y: calc(var(--hex-h) + var(--connector-h) + (var(--dot) / 2));
      }
      .stepper-line{
        position: absolute;
        top: var(--line-y);
        left: 12.5%;
        width: 75%;
        height: 6px;
        border-radius: 999px;
        background: var(--pk-ink-10);
        overflow: hidden;
        z-index: 0;
      }
      .stepper-line-seg{
        position:absolute;
        top: var(--line-y);
        width: 25%;
        height: 6px;
        border-radius: 999px;
        transform-origin: left;
        transform: scaleX(0);
        z-index: 1;
      }
      .stepper-line-seg.is-started{
        animation-name: stepperLineFill;
        animation-timing-function: cubic-bezier(0.2,0.8,0.2,1);
        animation-fill-mode: forwards;
      }

      .step-dot{
        position: relative;
        width: var(--dot);
        height: var(--dot);
        border-radius: 999px;
        background: var(--pk-page);
        border: 6px solid var(--pk-accent-55);
        box-shadow: 0 12px 30px var(--pk-slate-shadow-14);
        z-index: 2;
        margin: 0 auto;
      }
      .step-hex-wrap{
        position: relative;
        width: 224px;
        height: 196px;
        /* Strong, smooth outside halo (like reference) */
        filter:
          drop-shadow(0 26px 44px var(--pk-slate-shadow-14))
          drop-shadow(0 10px 18px var(--pk-slate-tint-10));
      }
      .step-hex{
        position: absolute;
        inset: 0;
        width: 224px;
        height: 196px;
        display:flex;
        align-items:center;
        justify-content:center;
        background: var(--pk-page);
        border: 1px solid var(--pk-slate-600-55);
        box-shadow: 0 18px 46px var(--pk-slate-tint-10);
        clip-path: polygon(25% 6%, 75% 6%, 96% 50%, 75% 94%, 25% 94%, 4% 50%);
        margin-bottom: 8px;
      }
      .step-hex-inner{
        width: 100%;
        height: 100%;
        display:flex;
        flex-direction: column;
        align-items:center;
        justify-content:center;
        transform: translateY(-2px);
        gap: 10px;
      }
      .step-hex-icon-img{
        width: 83px;
        height: 83px;
        object-fit: contain;
        display:block;
      }
      .step-hex-num{
        font-family: "Space Grotesk", sans-serif;
        font-weight: 800;
        font-size: 26px;
        line-height: 1;
        letter-spacing: -0.02em;
      }
      .step-connector{
        width: 2px;
        height: var(--connector-h);
        margin: 0 auto;
        width: 2px;
        background-image: radial-gradient(circle, var(--pk-slate-tint-55) 1.3px, transparent 1.9px);
        background-size: 4px 9px;
        background-repeat: repeat-y;
        background-position: center;
        opacity: 0.92;
        box-shadow: 0 0 0 1px var(--pk-slate-500-22);
      }
      .step-title-gradient{
        font-family: "Space Grotesk", sans-serif;
        font-weight: 800;
        font-size: 22px;
        line-height: 1.25;
        margin: 16px 0 10px 0;
      }

      /* ── Mobile: stacked single column ── */
      @media(max-width:767px){
        .how-it-works-head { margin-bottom: 32px !important; }
        .stepper-grid {
          grid-template-columns: 1fr !important;
          gap: 16px !important;
        }
        .stepper-line { display: none !important; }
        .stepper-line-seg{ display:none !important; }
        .step-block {
          flex-direction: row !important;
          align-items: flex-start !important;
          text-align: left !important;
          padding: 16px !important;
          gap: 16px !important;
          background: var(--pk-page);
          border: 1px solid var(--pk-slate-tint-10);
          border-left: 2px solid var(--pk-accent-35) !important;
          border-radius: 16px;
        }
        .step-hex-wrap{ flex-shrink: 0 !important; }
        .step-hex-wrap{
          width: 92px !important;
          height: 82px !important;
          margin-bottom: 0 !important;
        }
        .step-hex{
          width: 92px !important;
          height: 82px !important;
        }
        .step-hex-icon-img{ width: 52px !important; height: 52px !important; }
        .step-hex-num{ display:none !important; }
        .step-connector{ display:none !important; }
        .step-dot{ display:none !important; }
        .step-title-gradient { font-size: 15px !important; margin-top: 0 !important; margin-bottom: 4px !important; text-align: left; }
        .step-text p { font-size: 13px !important; }
      }
      /* Tablet: 2×2 grid */
      @media(min-width:768px) and (max-width:1023px){
        .stepper-grid { grid-template-columns: repeat(2,1fr) !important; gap: 40px 24px !important; }
        .stepper-line { display: none !important; }
        .stepper-line-seg{ display:none !important; }
        .step-block { padding: 0 8px !important; }
        .step-dot{ display:none !important; }
      }
      @media(prefers-reduced-motion:reduce){
        .stepper-line-seg{ animation: none !important; transform: scaleX(1) !important; }
      }
    `}</style>
  </section>
);
};
