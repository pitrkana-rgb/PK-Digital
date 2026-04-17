import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../i18n/LanguageContext";
import heroPcFrameUrl from "../../../../../Images/Hero_PC_frame_V2.png";

const splitTextForReveal = (text: string): [string, string] => {
  const midpoint = Math.floor(text.length / 2);
  const splitAt = text.indexOf(" ", midpoint);
  if (splitAt === -1) return [text, ""];
  return [text.slice(0, splitAt), text.slice(splitAt + 1)];
};

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
  const { language } = useLanguage();
  const t = language === "en" ? {
    headlinePre: "Next‑generation websites with",
    headlineMid: "that",
    headlineAccent: "change the rules and bring customers",
    subheading: "Websites, e‑shops, and AI‑powered apps designed for growth, performance, and scale. Technology that delivers measurable results and a competitive edge.",
    ctaPrimary: "Contact us",
    ctaSecondary: "Our services",
  } : {
    headlinePre: "Weby nové generace s",
    headlineMid: ", které",
    headlineAccent: "mění pravidla hry a přivádějí zákazníky",
    subheading: "Weby, e-shopy a aplikace s podporou AI navržené pro růst, výkon a škálování. Technologie, které přinášejí měřitelné výsledky a konkurenční výhodu.",
    ctaPrimary: "Kontaktujte nás",
    ctaSecondary: "Naše služby",
  };
  const [subheadingLead, subheadingTrail] = splitTextForReveal(t.subheading);

  return (
    <section
      className="relative w-full flex items-center justify-center hero-section-mobile"
      style={{
        minHeight: "max(100vh, 920px)",
        paddingTop: "44px",
        paddingBottom: "0",
        marginTop: "-50px",
        marginBottom: "0px",
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

      {/* Hero content — same horizontal alignment as other sections (max-width 1536px + 24px padding) */}
      <div
        className="hero-shell relative z-10"
        style={{
          width: "100%",
          maxWidth: "none",
          marginLeft: 0,
          marginRight: 0,
          paddingLeft: 0,
          paddingRight: 0,
          boxSizing: "border-box",
        }}
      >
        <div className="hero-grid">
          <div className="hero-left-rail">
          <div className="hero-content-shift">
            <div
              className="flex flex-col items-center md:items-start animate-fade-in hero-content-wrap"
              style={{ width: "100%", maxWidth: "none", padding: 0, marginTop: 0 }}
            >

        {/* Headline */}
        <h1 className="hero-headline" style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(16px, 4.5vw, 40px)",
          lineHeight: 1.05,
          color: "#FFFFFF",
          margin: "0 0 16px 0",
          letterSpacing: "-0.02em",
          maxWidth: "100%",
          width: "100%",
        }}>
          <span className="hero-headline-part hero-headline-part-left">
            {t.headlinePre}{" "}
            <span style={{
              background: "linear-gradient(135deg, #E040FB 0%, #00E5FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 20px rgba(0,229,255,0.35))",
            }}>AI</span>
            {t.headlineMid ? `${t.headlineMid}` : ""}
          </span>{" "}
          <span className="hero-headline-part hero-headline-part-right" style={{
            background: "linear-gradient(135deg, #E040FB 0%, #00E5FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 20px rgba(0,229,255,0.35))",
          }}>{t.headlineAccent}</span>
        </h1>

        {/* Paragraph */}
        <p className="hero-subheading" style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 400,
          fontSize: "clamp(14px, 2.0vw, 17px)",
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.88)",
          maxWidth: "640px",
          margin: "0 0 32px 0",
        }}>
          <span className="hero-subheading-part hero-subheading-part-left">{subheadingLead}</span>{" "}
          <span className="hero-subheading-part hero-subheading-part-right">{subheadingTrail}</span>
        </p>

        {/* Mobile-only: show PC frame under subheading */}
        <div className="hero-mobile-frame" aria-hidden="true">
          <img
            src={heroPcFrameUrl}
            alt=""
            draggable={false}
            className="hero-mobile-frame-img"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* CTAs */}
        <div className="hero-actions-wrap">
        <div className="hero-cta-row flex flex-wrap items-center justify-center md:justify-start" style={{ gap: "16px" }}>
          <button
            id="hero-primary-cta"
            type="button"
            className="animate-pulse-glow hero-primary-btn"
            onClick={() => navigate("/napiste-nam")}
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
            {t.ctaPrimary}
          </button>

          <button
            id="hero-secondary-cta"
            type="button"
            className="hero-secondary-btn"
            onClick={() => {
              const pricingHeading = document.getElementById("pricing-heading");
              if (pricingHeading) {
                pricingHeading.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
              }
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
            {t.ctaSecondary}
          </button>
        </div>

        {/* Google overview */}
        <div className="hero-google-overview" style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "12px", justifyContent: "center" }}>
          <div aria-hidden="true" style={{ width: 28, height: 28, flexShrink: 0 }}>
            <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 18, color: "rgba(255,255,255,0.92)", lineHeight: 1 }}>
              5.0
            </div>
            <div aria-label="5 out of 5" style={{ display: "inline-flex", gap: 3, color: "#fbbc04" }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </div>
          </div>
        </div>
        </div>
            </div>
          </div>
          </div>

          {/* Right media: PC frame (desktop only) */}
          <div className="hero-media" aria-hidden="true">
            <img
              src={heroPcFrameUrl}
              alt=""
              draggable={false}
              className="hero-pc-frame"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>

      {/* Desktop-only: constrain PC frame to page width rail */}
      <div
        className="hero-media-rail"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(100%, 1400px)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <div className="hero-media-rail-inner">
          <img
            src={heroPcFrameUrl}
            alt=""
            draggable={false}
            className="hero-pc-frame"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scroll-dot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(12px); opacity: 0.3; }
        }
        @keyframes heroRevealLeft {
          from { opacity: 0; transform: translateX(-40px); filter: blur(10px); }
          to { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        @keyframes heroRevealRight {
          from { opacity: 0; transform: translateX(40px); filter: blur(10px); }
          to { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroMobileFrameIn {
          from { opacity: 0; transform: translateX(44px); filter: blur(6px); }
          to { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        .animate-scroll-dot { animation: scroll-dot 1.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .animate-scroll-dot { animation: none; } }
        #hero-primary-cta:focus-visible, #hero-secondary-cta:focus-visible {
          outline: 2px solid #00E5FF; outline-offset: 3px;
        }
        .hero-headline-part,
        .hero-subheading-part,
        .hero-actions-wrap{
          display: inline-block;
          opacity: 0;
          will-change: transform, opacity, filter;
        }
        .hero-headline-part-left{
          animation: heroRevealLeft 900ms cubic-bezier(0.2,0.8,0.2,1) forwards;
        }
        .hero-headline-part-right{
          animation: heroRevealRight 900ms cubic-bezier(0.2,0.8,0.2,1) forwards;
        }
        .hero-subheading-part-left{
          animation: heroRevealLeft 900ms cubic-bezier(0.2,0.8,0.2,1) forwards;
          animation-delay: 1000ms;
        }
        .hero-subheading-part-right{
          animation: heroRevealRight 900ms cubic-bezier(0.2,0.8,0.2,1) forwards;
          animation-delay: 1000ms;
        }
        .hero-actions-wrap{
          animation: heroFadeUp 700ms cubic-bezier(0.2,0.8,0.2,1) forwards;
          animation-delay: 2000ms;
        }
        .hero-content-wrap {
          text-align: center;
        }
        .hero-grid{
          display: flex;
          flex-direction: column;
          gap: 40px;
          align-items: center;
        }
        .hero-left-rail{
          width: 100%;
          max-width: 1400px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 24px;
          padding-right: 24px;
          box-sizing: border-box;
        }
        .hero-media{
          display: none;
        }
        .hero-mobile-frame{ display:none; }
        .hero-media-rail{ display:none; }
        .hero-media-rail-inner{ display:none; }
        @media (min-width: 769px) {
          .hero-content-shift{
            transform: translateY(-120px);
          }
          .hero-google-overview{
            justify-content: flex-start !important;
          }
          /* Left content aligns with header logo rail */
          .hero-left-rail{
            padding-right: 20px;
          }
          .hero-section-mobile{
            /* Keep hero tall enough to match the standard notebook/video visual height */
            min-height: 860px !important;
          }
          .hero-content-wrap{
            margin-top: 0 !important;
            max-width: 50%;
          }
          .hero-grid{
            display: block;
            position: relative;
          }
          /* Use page-width rail for right media alignment */
          .hero-media{ display:none !important; }
          .hero-media-rail{ display:block !important; }
          .hero-media-rail-inner{
            display: block;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            width: min(56vw, 920px);
            max-width: 920px;
          }
          .hero-media-rail-inner .hero-pc-frame{
            width: 100%;
            height: auto;
            display: block;
          }
          .hero-pc-frame{
            opacity: 0;
            transform: translateX(60vw) scale(0.896);
            transform-origin: right center;
            animation: heroPcArrive 2200ms cubic-bezier(0.2,0.8,0.2,1) forwards;
            animation-delay: 1000ms;
            will-change: transform, opacity;
          }
          .hero-content-wrap {
            text-align: left;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box;
          }
          .hero-headline,
          .hero-subheading {
            box-sizing: border-box;
          }
          .hero-headline {
            width: 60% !important;
            max-width: 60% !important;
            box-sizing: border-box;
          }
          .hero-subheading {
            width: 56% !important;
            max-width: 56% !important;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .hero-headline {
            margin-left: 0;
            margin-right: 0;
          }
          .hero-subheading {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }
        @keyframes heroPcArrive{
          from{ opacity: 0; transform: translateX(60vw) scale(0.896); }
          to{ opacity: 1; transform: translateX(0) scale(0.896); }
        }
        /* ── Mobile hero adjustments ────────────── */
        @media (max-width: 768px) {
          .hero-section-mobile{
            min-height: auto !important;
            padding-top: 100px !important;
            padding-bottom: 20px !important;
            margin-top: 0 !important;
          }
          .hero-rating-pill { display: none !important; }
          .hero-subheading{ display:block !important; }
          .hero-mobile-frame{
            display:block !important;
            width: min(520px, 100%);
            margin: 10px auto 18px;
            opacity: 0.98;
            filter: drop-shadow(0 18px 40px rgba(0,0,0,0.35));
          }
          .hero-mobile-frame-img{
            opacity: 0;
            transform: translateX(44px);
            will-change: transform, opacity, filter;
            animation: heroMobileFrameIn 900ms cubic-bezier(0.2,0.8,0.2,1) forwards;
            animation-delay: 1000ms;
          }
          .hero-shell {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .hero-content-wrap {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin-top: 20px !important;
          }
          .hero-google-overview{
            margin-bottom: 0 !important;
          }
          .hero-headline {
            font-size: 24px !important;
            line-height: 1.1 !important;
            max-width: 100% !important;
            margin-bottom: 10px !important;
          }
          .hero-subheading {
            max-width: 340px !important;
            font-size: 14px !important;
            line-height: 1.5 !important;
            margin-left: auto !important;
            margin-right: auto !important;
            margin-bottom: 20px !important;
          }
          .hero-primary-btn, .hero-secondary-btn {
            padding: 10px 20px !important;
            font-size: 14px !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-mobile-frame-img{
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>
    </section>
  );
};
