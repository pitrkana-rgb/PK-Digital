import { useState, useRef, useEffect } from "react";
import { SectionDivider } from "../../components/SectionDivider";
import { useNavigate } from "react-router-dom";

const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: "2px" }}>
        <circle cx="8" cy="8" r="8" fill="rgba(255,90,31,0.15)" />
        <path d="M4.5 8.5L6.5 10.5L11.5 5.5" stroke="#FF5A1F" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const slides = [
    {
        id: "tvorba-webu",
        label: "Tvorba webových stránek",
        title: "Tvorba webových stránek",
        description:
            "Moderní web, který jasně komunikuje vaši hodnotu, získává zákazníky a je připravený růst s vaším podnikáním",
        features: [
            "Konzultace a návrh zdarma",
            "Dodání do 14 dnů",
            "Responzivní mobilní verze",
            "Napojení na interní systémy",
            "Pravidelná optimalizace",
        ],
        cta: "Chci web",
        image: "/New.web-promotion-V2.png",
    },
    {
        id: "modernizace-webu",
        label: "Modernizace webu",
        title: "Modernizace Webu",
        description:
            "Kompletní modernizace vašeho stávajícího webu — nový design, vyšší rychlost, lepší konverze a nasazení AI nástrojů pro růst.",
        features: [
            "Bezplatný audit webu",
            "Redesign vizuální identity",
            "Optimalizace rychlosti a SEO",
            "Integrace AI nástrojů",
            "Průběžná správa a údržba",
        ],
        cta: "Chci modernizaci",
        image: "/profitherm.png?v=2",
    },
    {
        id: "integrace-ai",
        label: "Integrace AI",
        title: "Integrace AI nástrojů",
        description:
            "Nasazujeme AI nástroje, které automatizují práci, zlepšují zákaznickou zkušenost a maximalizují konverzní potenciál vašeho webu.",
        features: [
            "AI chatboty",
            "Generování leadů",
            "Chytré cenové kalkulátory",
            "Inteligentní vyhledávání",
            "Automatizace procesů",
        ],
        cta: "Zjistit více",
        image: "/AI.png",
    },
];

const SWIPE_THRESHOLD = 50;

export const CoNabizimeSection = (): JSX.Element => {
    const [active, setActive] = useState(0);
    const [animating, setAnimating] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef<number>(0);
    const navigate = useNavigate();

    const goTo = (idx: number) => {
        if (idx === active || animating) return;
        setAnimating(true);
        setActive(idx);
        setTimeout(() => setAnimating(false), 420);
    };

    // Keyboard navigation
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") goTo(Math.min(active + 1, slides.length - 1));
            if (e.key === "ArrowLeft") goTo(Math.max(active - 1, 0));
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [active]);

    const onTouchStart = (e: any) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: any) => {
        const endX = e.changedTouches[0].clientX;
        const delta = touchStartX.current - endX;
        if (delta > SWIPE_THRESHOLD) goTo(Math.min(active + 1, slides.length - 1));
        else if (delta < -SWIPE_THRESHOLD) goTo(Math.max(active - 1, 0));
    };

    const slide = slides[active];

    return (
        <section
            id="co-nabizime"
            style={{ width: "100%", backgroundColor: "#000", padding: "80px 0 100px", marginTop: "-50px", marginBottom: "-50px" }}
        >
            <SectionDivider />
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

                {/* Head */}
                <div className="offer-head" style={{ textAlign: "center", marginBottom: "56px" }}>
                    <h2 style={{
                        fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700,
                        fontSize: "clamp(32px,4.5vw,52px)", lineHeight: 1.1,
                        color: "#fff", margin: "0 auto 20px", letterSpacing: "-0.02em", maxWidth: "700px",
                    }}>
                        Co{" "}
                        <span style={{ background: "linear-gradient(135deg,#FF6A2A,#FFB347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>nabízíme</span>
                    </h2>
                    <p className="section-sub offer-subheading" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: 1.6, color: "rgba(255,255,255,0.65)", margin: "0 auto", maxWidth: "560px" }}>
                        Od vytvoření nového webu přes vizuální redesign až po integraci AI nástrojů – řešení pro začínající podnikatele i rostoucí firmy.
                    </p>
                </div>

                {/* Tab pills — hidden on mobile */}
                <div className="offer-tabs" style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "40px", flexWrap: "wrap" }}>
                    {slides.map((s, i) => (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => goTo(i)}
                            style={{
                                fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "14px",
                                padding: "8px 20px", borderRadius: "999px", cursor: "pointer",
                                border: i === active ? "none" : "1px solid rgba(255,255,255,0.15)",
                                background: i === active
                                    ? "linear-gradient(135deg,#FF6A2A,#FF3C00)"
                                    : "rgba(255,255,255,0.05)",
                                color: i === active ? "#fff" : "rgba(255,255,255,0.55)",
                                transition: "all 200ms ease",
                                boxShadow: i === active ? "0 4px 20px rgba(255,90,31,0.35)" : "none",
                            }}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* Slide panel — touch swipe on mobile */}
                <div
                    ref={trackRef}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "0",
                        borderRadius: "24px",
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
                        opacity: animating ? 0 : 1,
                        transform: animating ? "scale(0.99)" : "scale(1)",
                        transition: "opacity 300ms ease, transform 300ms ease",
                    }}
                    className="offer-panel"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Left — image or placeholder */}
                    <div
                        className="offer-image-col"
                        style={{
                            background: slide.image
                                ? "#000"
                                : "linear-gradient(145deg, rgba(255,106,42,0.08), rgba(255,90,31,0.03))",
                            borderRight: "1px solid rgba(255,255,255,0.06)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            minHeight: "460px",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        {slide.image ? (
                            /* Real image — cover the entire column */
                            <img
                                src={slide.image}
                                alt={slide.title}
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                    display: "block",
                                }}
                            />
                        ) : (
                            /* Placeholder */
                            <>
                                <div style={{
                                    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                                    width: "260px", height: "260px",
                                    background: "radial-gradient(circle, rgba(255,90,31,0.18) 0%, transparent 70%)",
                                    pointerEvents: "none",
                                }} />
                                <div style={{
                                    display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
                                    position: "relative", zIndex: 1,
                                }}>
                                    <div style={{
                                        width: "80px", height: "80px", borderRadius: "20px",
                                        background: "rgba(255,90,31,0.12)",
                                        border: "1px dashed rgba(255,90,31,0.3)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                    }}>
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="rgba(255,90,31,0.5)" strokeWidth="1.5" />
                                            <path d="M3 9h18M9 21V9" stroke="rgba(255,90,31,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                                        Obrázek bude přidán
                                    </span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Right — content */}
                    <div
                        className="offer-content-col"
                        style={{
                            background: "#0D0D0D",
                            padding: "52px 48px",
                            display: "flex", flexDirection: "column", gap: "28px",
                        }}
                    >
                        {/* Label tag */}
                        <span style={{
                            display: "inline-flex", alignSelf: "flex-start",
                            fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "11px",
                            color: "#FF5A1F", letterSpacing: "0.12em", textTransform: "uppercase",
                            background: "rgba(255,90,31,0.12)",
                            border: "1px solid rgba(255,90,31,0.25)",
                            borderRadius: "999px", padding: "4px 14px",
                        }}>
                            {slide.label}
                        </span>

                        {/* Title */}
                        <h3 style={{
                            fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700,
                            fontSize: "clamp(26px,3vw,36px)", lineHeight: 1.15,
                            color: "#fff", margin: 0, letterSpacing: "-0.02em",
                        }}>
                            {slide.title}
                        </h3>

                        {/* Description */}
                        <p style={{
                            fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400,
                            fontSize: "16px", lineHeight: 1.7,
                            color: "rgba(255,255,255,0.65)", margin: 0,
                        }}>
                            {slide.description}
                        </p>

                        {/* Feature list */}
                        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                            {slide.features.map(f => (
                                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                    <CheckIcon />
                                    <span className="offer-bullet" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                                        {f}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA */}
                        <button
                            type="button"
                            onClick={() => navigate("/kontakt")}
                            style={{
                                alignSelf: "flex-start",
                                background: "linear-gradient(135deg,#FF6A2A,#FF3C00)",
                                color: "#fff", border: "none", borderRadius: "12px",
                                padding: "14px 28px",
                                fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "15px",
                                cursor: "pointer",
                                boxShadow: "0 8px 28px rgba(255,90,31,0.35)",
                                transition: "filter 200ms ease, transform 200ms ease",
                            }}
                            onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.filter = "brightness(1.1)"; b.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.filter = ""; b.style.transform = ""; }}
                        >
                            {slide.cta}
                        </button>
                    </div>
                </div>

                {/* Dot navigation */}
                <div className="offer-dots" style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "28px" }}>
                    {slides.map((s, i) => (
                        <button
                            key={s.id}
                            type="button"
                            aria-label={`Přejít na slide ${i + 1}`}
                            onClick={() => goTo(i)}
                            style={{
                                width: i === active ? "28px" : "8px", height: "8px",
                                borderRadius: "999px", border: "none", cursor: "pointer",
                                background: i === active ? "#FF5A1F" : "rgba(255,255,255,0.2)",
                                transition: "width 250ms ease, background 250ms ease",
                                padding: 0,
                            }}
                        />
                    ))}
                </div>

                {/* Arrow navigation */}
                <div className="offer-arrows" style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
                    {[
                        { label: "←", dir: -1 },
                        { label: "→", dir: 1 },
                    ].map(({ label, dir }) => (
                        <button
                            key={label}
                            type="button"
                            aria-label={dir === -1 ? "Předchozí" : "Další"}
                            onClick={() => goTo(Math.max(0, Math.min(slides.length - 1, active + dir)))}
                            style={{
                                width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer",
                                border: "1px solid rgba(255,255,255,0.15)",
                                background: "rgba(255,255,255,0.05)",
                                color: "rgba(255,255,255,0.7)",
                                fontFamily: "system-ui", fontSize: "16px",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                transition: "background 200ms ease, border-color 200ms ease",
                                opacity: (dir === -1 && active === 0) || (dir === 1 && active === slides.length - 1) ? 0.3 : 1,
                            }}
                            onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,90,31,0.15)"; b.style.borderColor = "rgba(255,90,31,0.4)"; }}
                            onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.05)"; b.style.borderColor = "rgba(255,255,255,0.15)"; }}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <style>{`
        @media(max-width: 767px) {
          .offer-tabs { display: none !important; }
          .offer-head { margin-bottom: 20px !important; }
          .offer-subheading { display: none !important; }
          .offer-panel {
            grid-template-columns: 1fr !important;
          }
          .offer-image-col {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.06) !important;
            min-height: 280px !important;
          }
          .offer-image-col img{
            object-position: top center !important;
          }
          .offer-content-col {
            padding: 32px 24px !important;
            gap: 20px !important;
          }
          .offer-bullet { font-size: 13px !important; line-height: 1.55 !important; }
          .offer-dots { margin-top: 18px !important; }
          .offer-arrows { margin-top: 10px !important; }
        }
        @media(prefers-reduced-motion: reduce) {
          .offer-panel { transition: none !important; }
        }
      `}</style>
        </section>
    );
};
