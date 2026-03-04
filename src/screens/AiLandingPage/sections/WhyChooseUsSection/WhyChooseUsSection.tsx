import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const usPoints = [
    "Bezplatný prototyp do 3 dnů",
    "AI nástroje zvyšující konverze",
    "Průměrná doba realizace 14 dní",
    "Průběžná optimalizace na základě dat",
    "Transparentní ceník bez skrytých poplatků",
    "Osobní přístup a flexibilní komunikace",
];

const themPoints = [
    "Platíte ještě před prvním náhledem",
    "Statické weby bez inteligence",
    "Týdny až měsíce čekání",
    "Odevzdání a konec spolupráce",
    "Nejasné ceny a příplatky",
    "Šablonový proces bez prostoru pro změny",
];

const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
        <circle cx="10" cy="10" r="10" fill="rgba(255,90,31,0.15)" />
        <path d="M6 10.5L8.5 13L14 7" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CrossIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
        <circle cx="10" cy="10" r="10" fill="rgba(255,255,255,0.04)" />
        <path d="M7 7L13 13M13 7L7 13" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

/* ── The two cards as individual components so they can be reused in carousel ── */
const PkCard = () => (
    <div
        style={{
            position: "relative",
            borderRadius: "24px",
            padding: "3px",
            background: "linear-gradient(145deg, #FF6A2A, #FF3C00 60%, #6B21A8)",
            boxShadow: "0 24px 64px rgba(255,90,31,0.25)",
            transition: "transform 250ms ease, box-shadow 250ms ease",
            transform: "scale(1.02)",
            height: "100%",
            boxSizing: "border-box",
        }}
        onMouseEnter={e => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.transform = "scale(1.04) translateY(-4px)";
            el.style.boxShadow = "0 32px 80px rgba(255,90,31,0.35)";
        }}
        onMouseLeave={e => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.transform = "scale(1.02)";
            el.style.boxShadow = "0 24px 64px rgba(255,90,31,0.25)";
        }}
    >
        <div style={{
            background: "#0D0D0D", borderRadius: "21px", padding: "40px",
            height: "100%", display: "flex", flexDirection: "column", gap: "28px", boxSizing: "border-box",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingBottom: "24px", borderBottom: "1px solid rgba(255,90,31,0.2)" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5A1F", boxShadow: "0 0 10px rgba(255,90,31,0.7)", flexShrink: 0 }} />
                <img src="/Company_logo.png" alt="PK Digital" style={{ height: "32px", width: "auto", display: "block" }} />
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "18px" }}>
                {usPoints.map((point, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                        <CheckIcon />
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px", color: "#FFFFFF", lineHeight: 1.45 }}>{point}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const ThemCard = () => (
    <div
        style={{
            borderRadius: "24px", border: "1px solid rgba(255,255,255,0.08)",
            background: "#0A0A0A", padding: "40px",
            display: "flex", flexDirection: "column", gap: "28px",
            transition: "transform 250ms ease, box-shadow 250ms ease",
            height: "100%", boxSizing: "border-box",
        }}
        onMouseEnter={e => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.transform = "translateY(-4px)";
            el.style.boxShadow = "0 24px 48px rgba(0,0,0,0.5)";
        }}
        onMouseLeave={e => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.transform = "";
            el.style.boxShadow = "";
        }}
    >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "18px", color: "rgba(255,255,255,0.35)", letterSpacing: "-0.01em" }}>Běžné agentury</span>
        </div>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "18px" }}>
            {themPoints.map((point, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <CrossIcon />
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: "15px", color: "rgba(255,255,255,0.32)", lineHeight: 1.45, fontStyle: "italic" }}>{point}</span>
                </li>
            ))}
        </ul>
    </div>
);

const cards = [<PkCard key="pk" />, <ThemCard key="them" />];

export const WhyChooseUsSection = (): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [mobileIdx, setMobileIdx] = useState(0);
    const navigate = useNavigate();

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

    const goTo = (idx: number) => setMobileIdx(Math.max(0, Math.min(cards.length - 1, idx)));

    return (
        <section
            ref={ref}
            style={{
                width: "100%",
                backgroundColor: "#000",
                padding: "40px 0 80px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Ambient glow */}
            <div style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                width: "900px", height: "500px",
                background: "radial-gradient(ellipse at center, rgba(255,90,31,0.07) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            <div
                style={{
                    maxWidth: "1200px", margin: "0 auto", padding: "0 24px",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(40px)",
                    transition: "opacity 0.7s ease, transform 0.7s ease",
                }}
            >
                {/* Heading */}
                <div style={{ textAlign: "center", marginBottom: "64px" }}>
                    <h2 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: "clamp(32px, 4.5vw, 52px)",
                        lineHeight: 1.1,
                        color: "#fff",
                        margin: "0 auto 20px",
                        letterSpacing: "-0.02em",
                        maxWidth: "700px",
                    }}>
                        Proč si vybrat{" "}
                        <span style={{
                            background: "linear-gradient(135deg, #FF6A2A, #FFB347)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}>právě nás</span>
                    </h2>
                    <p style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 400, fontSize: "18px", lineHeight: 1.6,
                        color: "rgba(255,255,255,0.55)",
                        maxWidth: "520px", margin: "0 auto",
                    }}>
                        Kombinujeme rychlost, AI a reálnou zodpovědnost za výsledek.
                    </p>
                </div>

                {/* ── Desktop: 2-column grid ── */}
                <div className="why-grid-desktop" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "stretch" }}>
                    <PkCard />
                    <ThemCard />
                </div>

                {/* ── Mobile: JS carousel with dots + arrows ── */}
                <div className="why-mobile-carousel">
                    <div style={{ padding: "12px 0 4px" }}>
                        {cards[mobileIdx]}
                    </div>

                    {/* Dots */}
                    <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
                        {cards.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                aria-label={`Karta ${i + 1}`}
                                onClick={() => goTo(i)}
                                style={{
                                    width: i === mobileIdx ? "28px" : "8px", height: "8px",
                                    borderRadius: "999px", border: "none", cursor: "pointer",
                                    background: i === mobileIdx ? "#FF5A1F" : "rgba(255,255,255,0.2)",
                                    transition: "width 250ms ease, background 250ms ease",
                                    padding: 0,
                                }}
                            />
                        ))}
                    </div>

                    {/* Arrows */}
                    <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
                        {[{ label: "←", dir: -1 }, { label: "→", dir: 1 }].map(({ label, dir }) => (
                            <button
                                key={label}
                                type="button"
                                aria-label={dir === -1 ? "Předchozí" : "Další"}
                                onClick={() => goTo(mobileIdx + dir)}
                                style={{
                                    width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    background: "rgba(255,255,255,0.05)",
                                    color: "rgba(255,255,255,0.7)",
                                    fontFamily: "system-ui", fontSize: "16px",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    opacity: (dir === -1 && mobileIdx === 0) || (dir === 1 && mobileIdx === cards.length - 1) ? 0.3 : 1,
                                    transition: "background 200ms ease",
                                }}
                                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,90,31,0.15)"; b.style.borderColor = "rgba(255,90,31,0.4)"; }}
                                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.05)"; b.style.borderColor = "rgba(255,255,255,0.15)"; }}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div style={{ textAlign: "center", marginTop: "52px" }}>
                    <button
                        type="button"
                        onClick={() => navigate("/kontakt")}
                        style={{
                            background: "linear-gradient(135deg, #FF6A2A 0%, #FF3C00 100%)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "999px",
                            padding: "16px 36px",
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 600,
                            fontSize: "16px",
                            cursor: "pointer",
                            boxShadow: "0 8px 32px rgba(255,90,31,0.4)",
                            transition: "filter 0.2s ease, transform 0.2s ease",
                        }}
                        onMouseEnter={e => {
                            const el = e.currentTarget as HTMLButtonElement;
                            el.style.filter = "brightness(1.1)";
                            el.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={e => {
                            const el = e.currentTarget as HTMLButtonElement;
                            el.style.filter = "";
                            el.style.transform = "";
                        }}
                    >
                        Začněte s bezplatnou konzultací
                    </button>
                </div>
            </div>

            <style>{`
        .why-mobile-carousel { display: none; }
        @media(max-width: 700px) {
          .why-grid-desktop { display: none !important; }
          .why-mobile-carousel { display: block !important; }
          .why-mobile-carousel > div > div {
            transform: scale(1) !important;
          }
        }
        @media(prefers-reduced-motion: reduce) {
          .why-grid-desktop > div { transition: none !important; }
        }
      `}</style>
        </section>
    );
};
