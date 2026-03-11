import { useEffect, useRef, useState } from "react";
import { Header } from "../../components/Header";
import { SiteFooterSection } from "../AiLandingPage/sections/SiteFooterSection/SiteFooterSection";
import { useNavigate } from "react-router-dom";

/* ── Small feature point icon ──────────────────────────────────── */
const FeatureIcon = ({ children }: { children: React.ReactNode }) => (
    <div style={{
        width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0,
        background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.18)",
        color: "#00E5FF", display: "flex", alignItems: "center", justifyContent: "center",
    }}>
        {children}
    </div>
);

const DataIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
);
const AIIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);
const SpeedIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
);
const GrowthIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
    </svg>
);

const featurePoints = [
    {
        Icon: DataIcon,
        title: "Weby navržené na základě dat",
        text: "Více než 10 let pracuji s daty a jejich vizualizací v korporátním prostředí. Díky tomu navrhuji weby tak, aby byly přehledné, logicky strukturované a podporovaly obchodní cíle.",
    },
    {
        Icon: AIIcon,
        title: "Data, design a AI v jednom",
        text: "Na rozdíl od běžných webdesignerů kombinuji design webu s datovou analytikou a moderními AI nástroji, které pomáhají zvyšovat konverze a efektivitu webu.",
    },
    {
        Icon: SpeedIcon,
        title: "Rychlá realizace projektu",
        text: "Díky moderním nástrojům dokážu připravit prototyp webu během několika dní a kompletní web standardně dodat do 14 dnů.",
    },
    {
        Icon: GrowthIcon,
        title: "Web jako nástroj pro růst",
        text: "Každý web navrhuji tak, aby nebyl jen prezentací firmy, ale funkčním nástrojem pro získávání zákazníků.",
    },
];

/* ── Fade-in-on-scroll hook ────────────────────────────────────── */
const useFadeIn = (threshold = 0.15) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
        }, { threshold });
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
};

export const AboutPage = (): JSX.Element => {
    const navigate = useNavigate();
    const section1 = useFadeIn();
    const section2 = useFadeIn();

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div
            className="relative w-full min-h-screen overflow-x-hidden"
            style={{ backgroundColor: "#000000", fontFamily: "'Space Grotesk', 'Inter', sans-serif", color: "#fff" }}
        >
            {/* Grain texture */}
            <div
                aria-hidden="true"
                style={{
                    position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none",
                    opacity: 0.03,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat", backgroundSize: "128px 128px",
                }}
            />

            <Header />

            <main style={{ position: "relative", zIndex: 1 }}>

                {/* ── Page hero ─────────────────────────────────────────── */}
                <section style={{ paddingTop: "160px", paddingBottom: "32px", textAlign: "center", position: "relative" }}>
                    {/* Radial glow */}
                    <div style={{
                        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                        width: "800px", height: "500px", pointerEvents: "none",
                        background: "radial-gradient(ellipse at top, rgba(0,229,255,0.08) 0%, transparent 65%)",
                    }} />
                    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative" }}>

                        <h1 style={{
                            fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800,
                            fontSize: "clamp(32px, 5vw, 60px)", lineHeight: 1.05,
                            color: "#fff", margin: "0 auto 24px", letterSpacing: "-0.03em",
                            maxWidth: "760px",
                        }}>
                            Kdo stojí za{" "}
                            <span style={{
                                background: "linear-gradient(135deg, #E040FB 0%, #00E5FF 100%)",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                            }}>PK-Digital?</span>
                        </h1>
                        <p style={{
                            fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400,
                            fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.65,
                            color: "rgba(255,255,255,0.65)", maxWidth: "560px", margin: "0 auto 40px",
                        }}>
                            Propojuji data, design a moderní technologie, aby web byl skutečným nástrojem pro růst vašeho podnikání.
                        </p>
                    </div>
                </section>

                {/* ── Section 1: Personal introduction ──────────────────── */}
                <section style={{ padding: "80px 0", position: "relative" }}>
                    {/* Subtle divider line */}
                    <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
                    <div
                        ref={section1.ref}
                        style={{
                            maxWidth: "1200px", margin: "0 auto", padding: "0 24px",
                            opacity: section1.visible ? 1 : 0,
                            transform: section1.visible ? "translateY(0)" : "translateY(40px)",
                            transition: "opacity 0.7s ease, transform 0.7s ease",
                        }}
                    >
                        <div className="about-row">
                            {/* Image */}
                            <div className="about-img-col">
                                <div style={{
                                    position: "relative", borderRadius: "24px", overflow: "hidden",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
                                }}>
                                    {/* Gradient border glow */}
                                    <div style={{
                                        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
                                        background: "linear-gradient(145deg, rgba(0,229,255,0.06), transparent 60%)",
                                    }} />
                                    <img
                                        src="/Founder.png"
                                        alt="Petr Kaňa – zakladatel PK-Digital"
                                        style={{ width: "100%", height: "520px", objectFit: "cover", display: "block", position: "relative", zIndex: 1 }}
                                        className="about-img"
                                    />
                                    {/* Bottom fade */}
                                    <div style={{
                                        position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", zIndex: 2,
                                        background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))",
                                    }} />
                                </div>
                            </div>

                            {/* Text */}
                            <div className="about-text-col" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>

                                <h2 style={{
                                    fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700,
                                    fontSize: "clamp(26px, 3.5vw, 42px)", lineHeight: 1.15,
                                    color: "#fff", margin: "0 0 28px", letterSpacing: "-0.02em",
                                }}>
                                    <span style={{ background: "linear-gradient(135deg, #E040FB, #00E5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Kdo tvoří</span>{" "}
                                    webové stránky
                                </h2>
                                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                                    <p style={{
                                        fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "17px",
                                        color: "rgba(255,255,255,0.92)", lineHeight: 1.5, margin: 0,
                                    }}>
                                        Pomáhám firmám vytvářet moderní weby, které přivádějí nové klienty.
                                    </p>
                                    <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "16px", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>
                                        Jmenuji se Petr Kaňa a více než 10 let se věnuji práci s daty, analytikou a digitálními technologiemi. Během této doby jsem pomáhal firmám lépe porozumět jejich datům, vizualizovat je a využívat pro lepší rozhodování.
                                    </p>
                                    <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "16px", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>
                                        Dnes tyto zkušenosti propojuji s tvorbou moderních webových stránek a AI nástrojů. Díky tomu nevznikají jen designově hezké weby, ale funkční digitální nástroje, které pomáhají firmám růst, získávat nové zákazníky a efektivně pracovat s návštěvníky webu.
                                    </p>
                                    <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "16px", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>
                                        Za projektem PK-Digital stojí jednoduchá myšlenka — propojit data, design a moderní technologie, aby web nebyl pouze vizitkou firmy, ale skutečným nástrojem pro její růst.
                                    </p>
                                </div>

                                {/* CTA */}
                                <div style={{ marginTop: "36px" }}>
                                    <button
                                        type="button"
                                        onClick={() => navigate("/kontakt")}
                                        style={{
                                            background: "linear-gradient(135deg, #0ABDC6, #00E5FF)",
                                            color: "#070B14", border: "none", borderRadius: "12px",
                                            padding: "14px 28px",
                                            fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "16px",
                                            cursor: "pointer",
                                            transition: "transform 250ms ease, filter 250ms ease, box-shadow 250ms ease",
                                            boxShadow: "0 0 20px rgba(0,229,255,0.25)",
                                        }}
                                        onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = "translateY(-3px)"; b.style.filter = "brightness(1.08)"; }}
                                        onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = ""; b.style.filter = ""; }}
                                    >
                                        Nezávazná konzultace
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Section 2: Why choose me ───────────────────────────── */}
                <section style={{ padding: "80px 0 120px", position: "relative" }}>
                    <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
                    {/* Ambient glow */}
                    <div style={{
                        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                        width: "800px", height: "500px", pointerEvents: "none",
                        background: "radial-gradient(ellipse at center, rgba(224,64,251,0.05) 0%, transparent 65%)",
                    }} />
                    <div
                        ref={section2.ref}
                        style={{
                            maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative",
                            opacity: section2.visible ? 1 : 0,
                            transform: section2.visible ? "translateY(0)" : "translateY(40px)",
                            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
                        }}
                    >
                        <div className="about-row about-row-reverse">
                            {/* Text with feature points */}
                            <div className="about-text-col" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>

                                <h2 style={{
                                    fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700,
                                    fontSize: "clamp(26px, 3.5vw, 42px)", lineHeight: 1.15,
                                    color: "#fff", margin: "0 0 36px", letterSpacing: "-0.02em",
                                }}>
                                    Proč si vybrat{" "}
                                    <span style={{ background: "linear-gradient(135deg, #E040FB, #00E5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                                        právě mě?
                                    </span>
                                </h2>

                                {/* Feature points */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                                    {featurePoints.map((fp, i) => (
                                        <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                                            <FeatureIcon><fp.Icon /></FeatureIcon>
                                            <div>
                                                <h3 style={{
                                                    fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "16px",
                                                    color: "#F0F4F8", margin: "0 0 6px", lineHeight: 1.3,
                                                }}>
                                                    {fp.title}
                                                </h3>
                                                <p style={{
                                                    fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "14px",
                                                    color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: 0,
                                                }}>
                                                    {fp.text}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Image */}
                            <div className="about-img-col">
                                <div style={{
                                    position: "relative", borderRadius: "24px", overflow: "hidden",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
                                }}>
                                    {/* Gradient overlay */}
                                    <div style={{
                                        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
                                        background: "linear-gradient(145deg, rgba(224,64,251,0.04), transparent 60%)",
                                    }} />
                                    <img
                                        src="/Studio.png"
                                        alt="PK-Digital studio"
                                        style={{ width: "100%", height: "520px", objectFit: "cover", display: "block", position: "relative", zIndex: 1 }}
                                        className="about-img"
                                    />
                                    <div style={{
                                        position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", zIndex: 2,
                                        background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))",
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <SiteFooterSection />

            <style>{`
        /* ── Two-column about row ── */
        .about-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
        }
        .about-row-reverse {
          /* Text left, image right — grid order stays 1/2 but we swap columns */
        }
        /* Image height on mobile */
        .about-img {
          height: 520px;
          object-fit: cover;
        }

        @media (max-width: 900px) {
          .about-row {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          /* On mobile: always show image first, then text */
          .about-img-col { order: -1; }
          .about-text-col { order: 1; }
          .about-img { height: 280px !important; }
        }

        @media (max-width: 600px) {
          .about-img { height: 220px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          div[style*="transition"] { transition: none !important; }
        }
      `}</style>
        </div>
    );
};
