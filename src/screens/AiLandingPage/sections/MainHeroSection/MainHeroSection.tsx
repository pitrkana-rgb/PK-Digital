import { useNavigate } from "react-router-dom";

/* ── Scroll indicator ─────────────────────────────────────────────── */
const ScrollIndicator = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
      marginTop: "48px",
    }}
  >
    <span
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "12px",
        fontWeight: 400,
        color: "rgba(255,255,255,0.4)",
        letterSpacing: "0.1em",
        textTransform: "uppercase" as const,
      }}
    >
      Scroll
    </span>
    <div className="animate-bounce" style={{ color: "#00E5FF" }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  </div>
);

export const MainHeroSection = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full flex items-center justify-center hero-section-mobile"
      style={{
        minHeight: "max(100vh, 1100px)",
        paddingTop: "44px",
        paddingBottom: "0",
        marginTop: "-50px",
        marginBottom: "-520px",
      }}
    >
      {/* Particle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        {/* Subtle grid lines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)",
        }} />
        {/* Teal glow right */}
        <div style={{
          position: "absolute", top: "5%", right: "-5%",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(0,229,255,0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
      </div>

      {/* Hero content */}
      <div
        className="relative z-10 flex flex-col items-center animate-fade-in hero-content-wrap"
        style={{ maxWidth: "900px", textAlign: "center", padding: "0 24px", marginTop: "-300px" }}
      >

        {/* Headline */}
        <h1 className="hero-headline" style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(38px, 7vw, 68px)",
          lineHeight: 1.05,
          color: "#FFFFFF",
          margin: "0 0 16px 0",
          letterSpacing: "-0.02em",
        }}>
          <span>Získejte moderní web nové generace díky síle </span>
          <span style={{
            background: "linear-gradient(135deg, #E040FB 0%, #00E5FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 20px rgba(0,229,255,0.35))",
          }}>AI</span>
        </h1>

        {/* Paragraph */}
        <p className="hero-subheading" style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 400,
          fontSize: "clamp(16px, 2.2vw, 19px)",
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.72)",
          maxWidth: "680px",
          margin: "0 auto 32px auto",
        }}>
          Vytváříme nové weby a modernizujeme ty stávající pomocí pokročilých AI nástrojů,
          které zvyšují konverze, generují více zákazníků a podporují dlouhodobý růst.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center" style={{ gap: "16px" }}>
          <button
            id="hero-primary-cta"
            type="button"
            className="animate-pulse-glow hero-primary-btn"
            onClick={() => navigate("/kontakt")}
            style={{
              background: "linear-gradient(135deg, #0ABDC6 0%, #00E5FF 100%)",
              color: "#070B14",
              border: "none",
              borderRadius: "12px",
              padding: "15px 32px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "16px",
              cursor: "pointer",
              transition: "transform 0.25s ease, filter 0.25s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = "translateY(-3px)"; b.style.filter = "brightness(1.1)"; }}
            onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = ""; b.style.filter = ""; }}
            onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)"; }}
            onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)"; }}
          >
            Kontaktujte nás
          </button>

          <button
            id="hero-secondary-cta"
            type="button"
            className="hero-secondary-btn"
            onClick={() => {
              document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "#FFFFFF",
              border: "1px solid rgba(0,229,255,0.25)",
              borderRadius: "12px",
              padding: "15px 32px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              cursor: "pointer",
              transition: "background 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
              whiteSpace: "nowrap",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.1)"; b.style.borderColor = "rgba(255,255,255,0.4)"; }}
            onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.05)"; b.style.borderColor = "rgba(255,255,255,0.2)"; }}
            onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)"; }}
            onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
          >
            Naše služby
          </button>
        </div>

      </div>

      <style>{`
        @keyframes scroll-dot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(12px); opacity: 0.3; }
        }
        .animate-scroll-dot { animation: scroll-dot 1.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .animate-scroll-dot { animation: none; } }
        #hero-primary-cta:focus-visible, #hero-secondary-cta:focus-visible {
          outline: 2px solid #00E5FF; outline-offset: 3px;
        }
        /* ── Mobile hero adjustments ────────────── */
        @media (max-width: 768px) {
          .hero-rating-pill { display: none !important; }
          .hero-content-wrap {
            max-width: 100% !important;
            padding: 0 16px !important;
            margin-top: -180px !important;
          }
          .hero-headline {
            font-size: 32px !important;
            line-height: 1.1 !important;
            max-width: 100% !important;
            margin-bottom: 10px !important;
          }
          .hero-subheading {
            max-width: 320px !important;
            font-size: 14px !important;
            line-height: 1.5 !important;
            margin-bottom: 20px !important;
          }
          .hero-primary-btn, .hero-secondary-btn {
            padding: 10px 20px !important;
            font-size: 14px !important;
          }
        }
      `}</style>
    </section>
  );
};
