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

const TrustBadge = ({ text, subtitle, index }: { text: string; subtitle: string; index: number }) => (
    <div className="why-trust-badge" style={{ animationDelay: `${index * 500}ms` }}>
        <div className="why-trust-icon">
            <TrustBadgeIcon index={index} />
        </div>
        <div className="why-trust-copy">
            <div className="why-trust-title">{text}</div>
            <div className="why-trust-sub">{subtitle}</div>
        </div>
    </div>
);

export const WhyChooseUsSection = (): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const { language } = useLanguage();
    const isEn = language === "en";
    const items = isEn ? usPointsEn : usPoints;
    const subtitles = isEn
        ? [
            "You get a clear picture of the solution before you invest. We quickly validate direction and design a functional foundation you can build on.",
            "We deploy smart automation that simplifies workflows, saves time and cost, and measurably improves how your business performs.",
            "We ship without unnecessary delays—clear plan, efficient execution, and fast go-live.",
            "We do not stop at launch. We continuously review data and refine the solution so it keeps delivering better results.",
            "You always know what you are paying for—fair, transparent terms with no surprises.",
            "Every project is individual. We respond fast, adapt to your needs, and keep communication clear and effective.",
        ]
        : [
            "Získáte jasnou představu o řešení ještě před investicí. Rychle ověříme směr a navrhneme funkční základ, na kterém můžete stavět.",
            "Nasazujeme chytrou automatizaci, která zjednodušuje procesy, šetří čas i náklady a zároveň prokazatelně zvyšuje výkon vašeho byznysu.",
            "Dodáváme řešení bez zbytečných průtahů. Máme jasný plán, efektivní postup a rychlé uvedení do provozu.",
            "Nekončíme spuštěním. Neustále vyhodnocujeme data a upravujeme řešení tak, aby dlouhodobě přinášelo lepší výsledky.",
            "Přesně víte, za co platíte. Žádná překvapení, jen férové a srozumitelné podmínky.",
            "Každý projekt řešíme individuálně. Reagujeme rychle, přizpůsobujeme se vašim potřebám a držíme komunikaci jasnou a efektivní.",
        ];

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
                        fontFamily: "'Montserrat', sans-serif",
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
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 400, fontSize: "18px", lineHeight: 1.6,
                        color: pk.ink62,
                        margin: "0 auto",
                    }}>
                        {isEn
                          ? "We build websites fast, use AI effectively, and take responsibility for delivering solutions that actually work."
                          : "Stavíme weby rychle, využíváme AI a neseme odpovědnost za to, že vaše řešení skutečně funguje."}
                    </p>
                </div>

                <div className={`why-shell${visible ? " is-visible" : ""}`} aria-label={isEn ? "Reasons" : "Důvody"}>
                    <div className="why-three-col">
                        <div className="why-col why-col--left">
                            {items.slice(0, 3).map((item, i) => (
                                <TrustBadge key={item} text={item} subtitle={subtitles[i] ?? ""} index={i} />
                            ))}
                        </div>

                        <div className="why-center why-center--hero">
                            <div className="why-center-icon" aria-hidden="true">
                                <img
                                    src={`${import.meta.env.BASE_URL}Company_logo_Icon_V4.png`}
                                    alt=""
                                    className="why-center-logo"
                                />
                            </div>
                            <div className="why-center-title">{isEn ? "Solutions that work" : "Řešení, která fungují"}</div>
                            <div className="why-center-sub">{isEn ? "Fast. Smart. Reliable." : "Rychle. Chytře. Spolehlivě."}</div>
                            <div className="why-center-stars" aria-hidden="true">★★★★★</div>
                        </div>

                        <div className="why-col why-col--right">
                            {items.slice(3, 6).map((item, i) => (
                                <TrustBadge key={item} text={item} subtitle={subtitles[i + 3] ?? ""} index={i + 3} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            <style>{`
        .why-shell{
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 26px 28px;
          border-radius: 28px;
          border: 1px solid var(--pk-slate-tint-10);
          background: var(--pk-page);
          box-shadow: var(--pk-shadow-trust-card);
        }
        .why-three-col{
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(240px, 300px) minmax(0, 1fr);
          gap: 22px 28px;
          align-items: center;
        }
        .why-col{
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: 0;
        }
        .why-center{
          position: relative;
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
          border-radius: 24px;
          padding: 28px 22px;
          text-align: center;
          align-self: center;
        }
        .why-center--hero{
          background: var(--pk-hero);
          border: 1px solid var(--pk-on-dark-border-12);
          box-shadow: inset 0 1px 0 var(--pk-on-dark-10);
        }
        .why-center-icon{
          width: 72px;
          height: 72px;
          margin: 0 auto 14px;
          border-radius: 16px;
          background: transparent;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .why-center-logo{
          width: 64px;
          height: 64px;
          object-fit: contain;
          display: block;
        }
        .why-center--hero .why-center-title{
          font-family: "Montserrat", sans-serif;
          font-weight: 900;
          font-size: 16px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--pk-on-dark-92);
          margin-bottom: 6px;
        }
        .why-center--hero .why-center-sub{
          font-family: "Montserrat", sans-serif;
          font-weight: 600;
          font-size: 13px;
          color: var(--pk-on-dark-60);
          margin-bottom: 10px;
        }
        .why-center--hero .why-center-stars{
          color: var(--pk-rating-star);
          letter-spacing: 2px;
          font-size: 14px;
        }

        .why-trust-badge{
          display:flex;
          flex-direction: row;
          align-items:center;
          justify-content: flex-start;
          gap: 14px;
          padding: 4px 0;
          border-radius: 0;
          border: none;
          background: transparent;
          box-shadow: none;
          opacity: 0;
          transform: translateY(10px);
        }
        .why-shell.is-visible .why-trust-badge{
          animation: whyPopIn 500ms cubic-bezier(0.2,0.8,0.2,1) forwards;
        }
        @keyframes whyPopIn{
          from{ opacity: 0; transform: translateY(10px); }
          to{ opacity: 1; transform: translateY(0); }
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
          width: 54px;
          height: 54px;
          object-fit: contain;
          display:block;
        }
        .why-trust-title{
          font-family: "Montserrat", sans-serif;
          font-weight: 800;
          font-size: 14px;
          line-height: 1.3;
          color: var(--pk-ink);
          margin-bottom: 8px;
          max-width: none;
        }
        .why-trust-sub{
          font-family: "Montserrat", sans-serif;
          font-weight: 500;
          font-size: 13px;
          line-height: 1.55;
          color: var(--pk-ink-55);
          max-width: none;
        }
        @media(max-width: 900px) {
          .why-three-col{
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .why-center{
            order: -1;
            max-width: 380px;
          }
          .why-shell{ padding: 22px 18px; }
          .why-head { margin-bottom: 32px !important; }
          .why-trust-icon-img{ width: 46px !important; height: 46px !important; }
        }
        @media(prefers-reduced-motion: reduce) {
          .why-trust-badge { opacity: 1 !important; transform: none !important; }
          .why-shell.is-visible .why-trust-badge { animation: none !important; }
        }
      `}</style>
        </section>
    );
};
