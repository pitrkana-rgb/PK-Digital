import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";

import prototypIcon from "../../../../assets/icons/prototyp_icon.png";
import aiIcon from "../../../../assets/icons/AI_icon.png";
import dobaRealizaceIcon from "../../../../assets/icons/doba_realizace_icon.png";
import optimalizaceIcon from "../../../../assets/icons/optimalizace_icon.png";
import cenikIcon from "../../../../assets/icons/cenik_icon.png";
import osobniPristupIcon from "../../../../assets/icons/osobni_pristup_icon.png";
import pcPromoImg from "../../../../../Images/PC_promo.png";

type Benefit = {
  title: string;
  description: string;
  icon: string;
  side: "left" | "right";
};

const benefitsCs: Benefit[] = [
  {
    title: "Web zdarma do 3 dnů",
    description:
      "Nezávazně připravím první návrh vašeho webu, abyste ještě před investicí viděli styl, směr i potenciál celého řešení.",
    icon: prototypIcon,
    side: "left",
  },
  {
    title: "Osobní přístup bez agentury",
    description:
      "Komunikujete přímo se mnou bez zdlouhavého předávání informací, což přináší rychlejší realizaci a lepší výsledek.",
    icon: osobniPristupIcon,
    side: "left",
  },
  {
    title: "Hotový web už za 14 dnů",
    description:
      "Díky efektivnímu workflow a moderním technologiím dodávám kvalitní weby výrazně rychleji než běžné agentury.",
    icon: dobaRealizaceIcon,
    side: "left",
  },
  {
    title: "SEO optimalizace pro Google",
    description:
      "Web vytvářím tak, aby byl rychlý, přehledný a dobře připravený pro vyhledávání i budoucí marketingové kampaně.",
    icon: optimalizaceIcon,
    side: "right",
  },
  {
    title: "Moderní AI automatizace",
    description:
      "Využívám pokročilé AI nástroje a automatizace, které šetří čas, zvyšují efektivitu a urychlují celý proces.",
    icon: aiIcon,
    side: "right",
  },
  {
    title: "Výborný poměr cena / výkon",
    description:
      "Získáte moderní a profesionální řešení bez zbytečných nákladů navíc, které často bývají součástí agenturních služeb.",
    icon: cenikIcon,
    side: "right",
  },
];

const benefitsEn: Benefit[] = [
  {
    title: "Free website design in 3 days",
    description:
      "I prepare your first website draft with no obligation, so you can see the style, direction, and potential of the full solution before you invest.",
    icon: prototypIcon,
    side: "left",
  },
  {
    title: "Personal approach, no agency",
    description:
      "You communicate directly with me without long handoffs, which means faster delivery and better results.",
    icon: osobniPristupIcon,
    side: "left",
  },
  {
    title: "Live website in 14 days",
    description:
      "Thanks to an efficient workflow and modern technology, I deliver quality websites much faster than typical agencies.",
    icon: dobaRealizaceIcon,
    side: "left",
  },
  {
    title: "SEO optimization for Google",
    description:
      "I build your site to be fast, clear, and ready for search as well as future marketing campaigns.",
    icon: optimalizaceIcon,
    side: "right",
  },
  {
    title: "Modern AI automation",
    description:
      "I use advanced AI tools and automation that save time, increase efficiency, and speed up the whole process.",
    icon: aiIcon,
    side: "right",
  },
  {
    title: "Excellent value for money",
    description:
      "You get a modern, professional solution without the extra costs that often come with agency services.",
    icon: cenikIcon,
    side: "right",
  },
];

/** Clockwise reveal: top-left → top-right → middle-left → middle-right → bottom-left → bottom-right */
const ANIM_SEQUENCE = [0, 3, 1, 4, 2, 5] as const;
const ORBIT_MS = 750;
const STEP_MS = 520;
/** Orbit radius in SVG viewBox units (10% smaller than previous r=296) */
const ORBIT_R = 266;
const ORBIT_VIEWBOX = 520;
const ORBIT_LAYER_MAX_PX = 468; /* 90% of prior 520px hub */
const ORBIT_CIRCUMFERENCE = 2 * Math.PI * ORBIT_R;
/** Middle rows (2nd left + 2nd right): icons shift away from orbit for visible connectors */
const MIDDLE_BENEFIT_INDICES = new Set([1, 4]);
const MIDDLE_ICON_ORBIT_OFFSET_PX = 50;

type ConnectorLine = {
  index: number;
  dotX: number;
  dotY: number;
  iconX: number;
  iconY: number;
};

const animDelay = (index: number, offset: 0 | 1 | 2): number => {
  const slot = ANIM_SEQUENCE.indexOf(index as (typeof ANIM_SEQUENCE)[number]);
  return ORBIT_MS + slot * STEP_MS + offset;
};

const BenefitIcon = ({ src }: { src: string }) => (
  <img src={src} alt="" aria-hidden="true" className="why-benefit-icon-img" />
);

const BenefitNode = ({
  benefit,
  index,
  visible,
  iconRef,
}: {
  benefit: Benefit;
  index: number;
  visible: boolean;
  iconRef: (el: HTMLDivElement | null) => void;
}) => {
  const sideClass = benefit.side === "left" ? "why-benefit--left" : "why-benefit--right";
  const midClass = MIDDLE_BENEFIT_INDICES.has(index) ? " why-benefit--mid" : "";
  const visibleClass = visible ? " is-visible" : "";

  return (
    <article
      className={`why-benefit ${sideClass}${midClass}${visibleClass}`}
      style={
        {
          "--why-icon-delay": `${animDelay(index, 1)}ms`,
          "--why-text-delay": `${animDelay(index, 2)}ms`,
          "--why-line-delay": `${animDelay(index, 0)}ms`,
        } as React.CSSProperties
      }
    >
      <div className="why-benefit-copy">
        <h3 className="why-benefit-title">{benefit.title}</h3>
        <p className="why-benefit-desc">{benefit.description}</p>
      </div>
      <div ref={iconRef} className="why-benefit-icon-disc">
        <BenefitIcon src={benefit.icon} />
      </div>
    </article>
  );
};

const BenefitCardMobile = ({
  benefit,
  index,
  visible,
}: {
  benefit: Benefit;
  index: number;
  visible: boolean;
}) => (
  <article
    className={`why-benefit-card${visible ? " is-visible" : ""}`}
    style={{ animationDelay: `${ORBIT_MS + index * 140}ms` }}
  >
    <div className="why-benefit-icon-disc why-benefit-icon-disc--mobile">
      <BenefitIcon src={benefit.icon} />
    </div>
    <div className="why-benefit-copy">
      <h3 className="why-benefit-title">{benefit.title}</h3>
      <p className="why-benefit-desc">{benefit.description}</p>
    </div>
  </article>
);

export const WhyChooseUsSection = (): JSX.Element => {
  const ref = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const hubRef = useRef<HTMLDivElement | null>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState(false);
  const [connectors, setConnectors] = useState<ConnectorLine[]>([]);
  const { language } = useLanguage();
  const isEn = language === "en";
  const benefits = isEn ? benefitsEn : benefitsCs;
  const leftBenefits = benefits.filter((b) => b.side === "left");
  const rightBenefits = benefits.filter((b) => b.side === "right");

  const setIconRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      iconRefs.current[index] = el;
    },
    [],
  );

  const updateConnectors = useCallback(() => {
    if (typeof window === "undefined" || window.innerWidth <= 900) {
      setConnectors([]);
      return;
    }
    const stage = stageRef.current;
    const hub = hubRef.current;
    if (!stage || !hub) return;

    const stageRect = stage.getBoundingClientRect();
    const hubRect = hub.getBoundingClientRect();
    const cx = hubRect.left + hubRect.width / 2 - stageRect.left;
    const cy = hubRect.top + hubRect.height / 2 - stageRect.top;
    const orbitR = hubRect.width * (ORBIT_R / ORBIT_VIEWBOX);

    const next: ConnectorLine[] = [];
    benefits.forEach((b, index) => {
      const icon = iconRefs.current[index];
      if (!icon) return;
      const ir = icon.getBoundingClientRect();
      const iconY = ir.top + ir.height / 2 - stageRect.top;
      const iconX =
        b.side === "left"
          ? ir.right - stageRect.left
          : ir.left - stageRect.left;
      const dy = iconY - cy;
      if (Math.abs(dy) >= orbitR - 0.5) return;
      const dx = Math.sqrt(orbitR * orbitR - dy * dy);
      const dotX = b.side === "left" ? cx - dx : cx + dx;
      next.push({ index, dotX, dotY: iconY, iconX, iconY });
    });
    setConnectors(next);
  }, [benefits]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    updateConnectors();
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(updateConnectors);
    });
    ro.observe(stage);
    window.addEventListener("resize", updateConnectors);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateConnectors);
    };
  }, [updateConnectors, visible, language]);

  return (
    <section
      ref={ref}
      className="why-choose-section pk-section-soft-band"
      style={{
        width: "100%",
        background: "transparent",
        padding: "8px 0 95px",
        position: "relative",
        overflow: "hidden",
        zIndex: 3,
      }}
    >
      <div className="why-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        <header className="why-head">
          <h2 className="why-heading pk-section-heading">
            {isEn ? "Why work with me" : "Proč spolupracovat se mnou"}
          </h2>
        </header>

        {/* Desktop radial layout */}
        <div
          ref={stageRef}
          className={`why-radial-stage${visible ? " is-visible" : ""}`}
          aria-label={isEn ? "Reasons" : "Důvody"}
        >
          {/* Connectors: above orbit, below PC image (z-index 3) */}
          <svg className="why-stage-connectors" aria-hidden="true">
            <defs>
              <linearGradient id="why-dot-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--pk-accent-magenta)" />
                <stop offset="100%" stopColor="var(--pk-accent)" />
              </linearGradient>
            </defs>
            {connectors.map((c) => (
              <g
                key={c.index}
                className={`why-connector-g why-connector-g--${c.index}`}
                style={{ "--why-line-delay": `${animDelay(c.index, 0)}ms` } as React.CSSProperties}
              >
                <line
                  className="why-connector-line"
                  x1={c.dotX}
                  y1={c.dotY}
                  x2={c.iconX}
                  y2={c.iconY}
                />
                <circle className="why-connector-dot" cx={c.dotX} cy={c.dotY} r="5" />
              </g>
            ))}
          </svg>

          <div className="why-radial-col why-radial-col--left">
            {leftBenefits.map((b) => {
              const index = benefits.indexOf(b);
              return (
                <BenefitNode
                  key={b.title}
                  benefit={b}
                  index={index}
                  visible={visible}
                  iconRef={setIconRef(index)}
                />
              );
            })}
          </div>

          <div ref={hubRef} className="why-orbit-layer" aria-hidden="true">
            <div className="why-orbit-wrap">
              <svg className="why-orbit-svg" viewBox={`0 0 ${ORBIT_VIEWBOX} ${ORBIT_VIEWBOX}`} aria-hidden="true">
                <circle className="why-orbit-circle" cx="260" cy="260" r={ORBIT_R} />
              </svg>
              <div className="why-orbit-glow why-orbit-glow--left" />
              <div className="why-orbit-glow why-orbit-glow--right" />
            </div>
          </div>

          <div className="why-radial-hub" aria-hidden="true">
            <img src={pcPromoImg} alt="" className="why-promo-img" />
          </div>

          <div className="why-radial-col why-radial-col--right">
            {rightBenefits.map((b) => {
              const index = benefits.indexOf(b);
              return (
                <BenefitNode
                  key={b.title}
                  benefit={b}
                  index={index}
                  visible={visible}
                  iconRef={setIconRef(index)}
                />
              );
            })}
          </div>
        </div>

        {/* Mobile vertical layout */}
        <div className={`why-mobile${visible ? " is-visible" : ""}`}>
          <div className="why-mobile-promo-wrap">
            <img src={pcPromoImg} alt="" className="why-promo-img why-promo-img--mobile" />
          </div>
          <div className="why-mobile-list">
            {benefits.map((b, i) => (
              <BenefitCardMobile key={b.title} benefit={b} index={i} visible={visible} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .why-head {
          text-align: center;
          margin-bottom: 0;
        }
        .why-heading {
          margin: 0 auto;
          max-width: 100%;
        }

        .why-radial-stage {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1.12fr) minmax(280px, ${ORBIT_LAYER_MAX_PX}px) minmax(0, 1.12fr);
          gap: clamp(4px, 0.65vw, 10px);
          align-items: center;
          min-height: clamp(460px, 38vw, 540px);
          margin-top: 0;
        }
        .why-stage-connectors {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          pointer-events: none;
          z-index: 3;
        }
        .why-connector-line {
          stroke: rgb(7 11 20 / 0.18);
          stroke-width: 1.25;
          vector-effect: non-scaling-stroke;
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
        }
        .why-radial-stage.is-visible .why-connector-line {
          animation: whyConnectorLine 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--why-line-delay, 0ms);
        }
        @keyframes whyConnectorLine {
          to { stroke-dashoffset: 0; }
        }
        .why-connector-dot {
          fill: url(#why-dot-gradient);
          opacity: 0;
          transform-origin: center;
        }
        .why-radial-stage.is-visible .why-connector-dot {
          animation: whyConnectorDot 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--why-line-delay, 0ms);
        }
        @keyframes whyConnectorDot {
          to { opacity: 1; }
        }
        .why-mobile {
          display: none;
        }

        .why-radial-col {
          position: relative;
          z-index: 6;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: clamp(28px, 4vw, 48px);
          min-height: clamp(400px, 34vw, 480px);
          padding: clamp(8px, 1.2vw, 16px) 0;
          width: 100%;
        }
        .why-radial-col--left {
          align-items: flex-end;
        }
        .why-radial-col--right {
          align-items: flex-start;
        }

        .why-orbit-layer,
        .why-radial-hub {
          grid-column: 2;
          grid-row: 1;
          align-self: center;
          justify-self: center;
          width: min(${ORBIT_LAYER_MAX_PX}px, 100%);
          aspect-ratio: 1;
        }
        .why-orbit-layer {
          position: relative;
          z-index: 2;
          pointer-events: none;
        }
        .why-radial-hub {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .why-orbit-wrap {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .why-orbit-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .why-orbit-circle {
          fill: none;
          stroke: rgb(7 11 20 / 0.14);
          stroke-width: 1.5;
          stroke-dasharray: ${ORBIT_CIRCUMFERENCE};
          stroke-dashoffset: ${ORBIT_CIRCUMFERENCE};
          transform-origin: center;
        }
        .why-radial-stage.is-visible .why-orbit-circle {
          animation: whyOrbitDraw 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes whyOrbitDraw {
          to { stroke-dashoffset: 0; }
        }
        .why-orbit-glow {
          position: absolute;
          z-index: 0;
          width: 55%;
          height: 55%;
          border-radius: 50%;
          filter: blur(42px);
          opacity: 0;
          transition: opacity 1s ease;
        }
        .why-orbit-glow--left {
          left: 4%;
          top: 28%;
          background: rgb(224 64 251 / 0.22);
        }
        .why-orbit-glow--right {
          right: 4%;
          bottom: 22%;
          background: rgb(0 229 255 / 0.18);
        }
        .why-radial-stage.is-visible .why-orbit-glow {
          opacity: 1;
        }
        .why-promo-img {
          position: relative;
          z-index: 10;
          width: min(361px, 74.1%);
          height: auto;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 28px 48px rgb(2 6 23 / 0.14));
          opacity: 0;
          transform: scale(0.96);
        }
        .why-radial-stage.is-visible .why-promo-img {
          animation: whyPromoIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.35s forwards;
        }
        @keyframes whyPromoIn {
          to { opacity: 1; transform: scale(1); }
        }

        .why-benefit {
          display: flex;
          align-items: center;
          gap: 0;
          max-width: 100%;
          min-width: 0;
        }
        .why-benefit--left {
          flex-direction: row;
          text-align: right;
        }
        .why-benefit--right {
          flex-direction: row-reverse;
          text-align: left;
        }
        .why-benefit-copy {
          position: relative;
          z-index: 7;
          flex: 1 1 auto;
          min-width: 0;
          max-width: min(100%, 380px);
          opacity: 0;
          transform: translateY(8px);
        }
        .why-benefit--left .why-benefit-copy {
          padding-right: clamp(6px, 0.85vw, 10px);
          margin-right: clamp(-8px, -0.6vw, -4px);
        }
        .why-benefit--right .why-benefit-copy {
          padding-left: clamp(6px, 0.85vw, 10px);
          margin-left: clamp(-8px, -0.6vw, -4px);
        }
        .why-benefit--left {
          gap: clamp(6px, 0.75vw, 10px);
        }
        .why-benefit--right {
          gap: clamp(6px, 0.75vw, 10px);
        }
        .why-benefit.is-visible .why-benefit-copy {
          animation: whyTextIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--why-text-delay);
        }
        @keyframes whyTextIn {
          to { opacity: 1; transform: translateY(0); }
        }
        .why-benefit-title {
          margin: 0 0 8px;
          font-family: "Montserrat", sans-serif;
          font-weight: 800;
          font-size: clamp(13px, 1.22vw, 16px);
          line-height: 1.2;
          color: var(--pk-ink);
          white-space: nowrap;
        }
        .why-benefit-desc {
          margin: 0;
          font-family: "Montserrat", sans-serif;
          font-weight: 500;
          font-size: clamp(12px, 1.1vw, 14px);
          line-height: 1.55;
          color: var(--pk-ink);
        }
        @media (min-width: 901px) {
          .why-choose-section.pk-section-soft-band {
            padding-bottom: 75px !important;
          }
          .why-head {
            padding-top: 20px;
            padding-bottom: 20px;
          }
          .why-benefit-desc {
            font-size: 14px;
            line-height: 1.55;
            min-height: calc(14px * 1.55 * 3);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
          .why-benefit--mid.why-benefit--left .why-benefit-copy {
            max-width: min(100%, 330px);
            margin-left: -50px;
            margin-right: 0;
          }
          .why-benefit--mid.why-benefit--right .why-benefit-copy {
            max-width: min(100%, 330px);
            margin-left: 50px;
          }
        }
        .why-benefit--mid.why-benefit--right .why-benefit-icon-disc {
          transform: translateX(${MIDDLE_ICON_ORBIT_OFFSET_PX}px) scale(0.82);
        }
        .why-benefit--mid.why-benefit--right.is-visible .why-benefit-icon-disc {
          animation: whyIconInMidRight 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--why-icon-delay);
        }
        @keyframes whyIconInMidRight {
          to { opacity: 1; transform: translateX(${MIDDLE_ICON_ORBIT_OFFSET_PX}px) scale(1); }
        }
        .why-benefit--mid.why-benefit--left.is-visible .why-benefit-icon-disc {
          animation: whyIconIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--why-icon-delay);
        }

        .why-benefit-icon-disc {
          position: relative;
          z-index: 6;
          width: clamp(52px, 5.5vw, 64px);
          height: clamp(52px, 5.5vw, 64px);
          border-radius: 50%;
          background: var(--pk-page);
          border: 1px solid var(--pk-slate-tint-10);
          box-shadow:
            0 10px 28px rgb(2 6 23 / 0.08),
            0 2px 8px rgb(2 6 23 / 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          opacity: 0;
          transform: scale(0.82);
        }
        .why-benefit.is-visible .why-benefit-icon-disc {
          animation: whyIconIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--why-icon-delay);
        }
        @keyframes whyIconIn {
          to { opacity: 1; transform: scale(1); }
        }
        .why-benefit-icon-img {
          width: 58%;
          height: 58%;
          object-fit: contain;
          display: block;
        }

        @media (max-width: 1024px) {
          .why-radial-stage {
            grid-template-columns: minmax(0, 1.08fr) minmax(260px, 420px) minmax(0, 1.08fr);
            min-height: 440px;
          }
          .why-orbit-layer,
          .why-radial-hub {
            width: min(420px, 100%);
          }
          .why-benefit-copy {
            max-width: min(100%, 300px);
          }
          .why-benefit-title {
            font-size: clamp(12px, 1.15vw, 15px);
          }
        }

        @media (max-width: 900px) {
          .why-radial-stage {
            display: none;
          }
          .why-benefit-title {
            white-space: normal;
            font-size: clamp(15.6px, 1.495vw, 19.5px);
          }
          .why-mobile {
            display: block;
          }
          .why-head {
            margin-bottom: 28px;
          }
          .why-mobile-promo-wrap {
            display: flex;
            justify-content: center;
            margin-bottom: 28px;
          }
          .why-promo-img--mobile {
            width: min(320px, 100%);
            opacity: 0;
            transform: translateY(12px);
          }
          .why-mobile.is-visible .why-promo-img--mobile {
            animation: whyPromoIn 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
          }
          .why-mobile-list {
            display: flex;
            flex-direction: column;
            gap: 14px;
            max-width: 520px;
            margin: 0 auto;
          }
          .why-benefit-card {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            padding: 18px 18px 20px;
            border-radius: 16px;
            border: 1px solid var(--pk-slate-tint-10);
            background: var(--pk-page);
            box-shadow: 0 14px 36px rgb(2 6 23 / 0.07);
            opacity: 0;
            transform: translateY(14px);
          }
          .why-benefit-card.is-visible {
            animation: whyCardIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          @keyframes whyCardIn {
            to { opacity: 1; transform: translateY(0); }
          }
          .why-benefit-icon-disc--mobile {
            width: 52px;
            height: 52px;
            opacity: 1;
            transform: none;
            animation: none;
          }
          .why-benefit-card .why-benefit-copy {
            max-width: none;
            padding: 0;
            text-align: left;
            opacity: 1;
            transform: none;
            animation: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .why-orbit-circle,
          .why-promo-img,
          .why-connector-line,
          .why-connector-dot,
          .why-benefit-icon-disc,
          .why-benefit-copy,
          .why-benefit-card,
          .why-promo-img--mobile {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            stroke-dashoffset: 0 !important;
          }
          .why-benefit--mid.why-benefit--right .why-benefit-icon-disc {
            transform: translateX(${MIDDLE_ICON_ORBIT_OFFSET_PX}px) !important;
          }
          .why-orbit-glow { opacity: 1; }
        }
      `}</style>
    </section>
  );
};
