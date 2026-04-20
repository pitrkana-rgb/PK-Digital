import { useRef, useEffect, useState } from "react";
import { SectionDivider } from "../../components/SectionDivider";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";

import prototypIcon from "../../../../assets/icons/prototyp_icon.png";
import aiIcon from "../../../../assets/icons/AI_icon.png";
import dobaRealizaceIcon from "../../../../assets/icons/doba_realizace_icon.png";
import optimalizaceIcon from "../../../../assets/icons/optimalizace_icon.png";
import cenikIcon from "../../../../assets/icons/cenik_icon.png";
import osobniPristupIcon from "../../../../assets/icons/osobni_pristup_icon.png";

const usPoints = [
    "Bezplatný prototyp do 3 dnů",
    "AI nástroje zvyšující konverze",
    "Průměrná doba realizace 14 dní",
    "Průběžná optimalizace na základě dat",
    "Transparentní ceník bez skrytých poplatků",
    "Osobní přístup a flexibilní komunikace",
];

const usPointsEn = [
    "Free prototype within 3 days",
    "AI tools that improve conversions",
    "Average delivery time: 14 days",
    "Continuous optimization based on data",
    "Transparent pricing with no hidden fees",
    "Personal approach and flexible communication",
];

const iconSrcs = [
    prototypIcon,
    aiIcon,
    dobaRealizaceIcon,
    optimalizaceIcon,
    cenikIcon,
    osobniPristupIcon,
] as const;

const TrustBadgeIcon = ({ index }: { index: number }) => {
    return (
        <img
            src={iconSrcs[index] ?? iconSrcs[0]}
            alt=""
            aria-hidden="true"
            className="why-trust-icon-img"
        />
    );
};

const TrustBadge = ({ text, index }: { text: string; index: number }) => (
    <div className="why-trust-badge">
        <div className="why-trust-icon">
            <TrustBadgeIcon index={index} />
        </div>
        <div className="why-trust-copy">{text}</div>
    </div>
);

export const WhyChooseUsSection = (): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const { language } = useLanguage();
    const isEn = language === "en";
    const items = isEn ? usPointsEn : usPoints;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={ref}
            style={{
                width: "100%",
                backgroundColor: pk.page,
                padding: "40px 0 110px",
                position: "relative",
                overflow: "visible",
                zIndex: 3,
            }}
        >
            <SectionDivider />
            {/* Ambient glow */}
            <div style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                width: "900px", height: "500px",
                background: `radial-gradient(ellipse at center, ${pk.accent06} 0%, transparent 70%)`,
                pointerEvents: "none",
            }} />

            <div
                style={{
                    maxWidth: "1400px", margin: "0 auto", padding: "0 24px",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(40px)",
                    transition: "opacity 0.7s ease, transform 0.7s ease",
                }}
            >
                {/* Heading */}
                <div className="why-head" style={{ textAlign: "center", marginBottom: "64px" }}>
                    <h2 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: "clamp(26px,3.6vw,42px)",
                        lineHeight: 1.1,
                        color: pk.ink,
                        margin: "0 auto 20px",
                        letterSpacing: "-0.02em",
                        maxWidth: "770px",
                    }}>
                        {isEn ? "Why choose " : "Proč si vybrat "}
                        <span style={{ color: pk.ink }}>{isEn ? "us" : "právě nás"}</span>
                    </h2>
                    <p className="section-sub" style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 400, fontSize: "18px", lineHeight: 1.6,
                        color: pk.ink62,
                        margin: "0 auto",
                    }}>
                        {isEn
                          ? "We build websites fast, use AI effectively, and take responsibility for delivering solutions that actually work."
                          : "Stavíme weby rychle, využíváme AI a neseme odpovědnost za to, že vaše řešení skutečně funguje."}
                    </p>
                </div>

                <div className="why-trust-grid">
                    {items.map((item, index) => (
                        <TrustBadge key={item} text={item} index={index} />
                    ))}
                </div>

            </div>

            <style>{`
        .why-trust-grid{
          display:grid;
          grid-template-columns: repeat(3, minmax(0,1fr));
          gap:18px;
        }
        .why-trust-badge{
          display:flex;
          flex-direction: column;
          align-items:center;
          justify-content: center;
          gap: 12px;
          padding: 20px 22px;
          border-radius:22px;
          border: 1px solid var(--pk-slate-600-border-16);
          background: var(--pk-page);
          box-shadow: var(--pk-shadow-trust-card);
          transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
        }
        .why-trust-badge:hover{
          transform: translateY(-4px);
          box-shadow: var(--pk-shadow-trust-card-hover);
        }
        .why-trust-icon{
          flex-shrink:0;
          display:flex;
          align-items:center;
          justify-content:center;
          background: transparent;
          box-shadow: none;
        }
        .why-trust-icon-img{
          width: 82px;
          height: 82px;
          object-fit: contain;
          display:block;
        }
        .why-trust-copy{
          font-family: "Space Grotesk", sans-serif;
          font-weight: 600;
          font-size: 18px;
          line-height: 1.4;
          color: var(--pk-ink-86);
          text-align: center;
          max-width: 26ch;
        }
        @media(max-width: 768px) {
          .why-trust-grid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; gap: 14px !important; }
          .why-head { margin-bottom: 32px !important; }
          .why-trust-badge { padding: 16px 18px !important; border-radius: 18px !important; }
          .why-trust-copy { font-size: 14px !important; line-height: 1.55 !important; }
          .why-trust-icon-img{ width: 64px !important; height: 64px !important; }
        }
        @media(prefers-reduced-motion: reduce) {
          .why-trust-badge { transition: none !important; }
        }
      `}</style>
        </section>
    );
};
