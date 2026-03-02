import { StarIcon } from "lucide-react";

/* ── Avatar initials SVG ─────────────────────────────────────────── */
const AvatarSvg = ({
  initials,
  from,
  to,
}: { initials: string; from: string; to: string }) => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`g-${initials}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={from} />
        <stop offset="100%" stopColor={to} />
      </linearGradient>
    </defs>
    <circle cx="22" cy="22" r="22" fill="#111" />
    <circle cx="22" cy="22" r="20" fill={`url(#g-${initials})`} />
    <text x="22" y="27" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontWeight="700" fontSize="14" fill="white">{initials}</text>
  </svg>
);

const avatars = [
  { initials: "MK", from: "#FF6A2A", to: "#c1440f" },
  { initials: "LN", from: "#7B61FF", to: "#3b2fc9" },
  { initials: "PV", from: "#19B9A0", to: "#0d7a6b" },
  { initials: "JH", from: "#FF5A1F", to: "#a82c00" },
  { initials: "AK", from: "#F59E0B", to: "#b45309" },
];

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
    <div className="animate-bounce" style={{ color: "#FF5A1F" }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  </div>
);

export const MainHeroSection = (): JSX.Element => {
  return (
    <section
      className="relative w-full flex items-center justify-center"
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
        {/* Orange glow left */}
        <div style={{
          position: "absolute", top: "10%", left: "-5%",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(255,90,31,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
        {/* Purple glow right */}
        <div style={{
          position: "absolute", top: "5%", right: "-5%",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(120,80,255,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
      </div>

      {/* Hero content */}
      <div
        className="relative z-10 flex flex-col items-center animate-fade-in hero-content-wrap"
        style={{ maxWidth: "900px", textAlign: "center", padding: "0 24px", marginTop: "-300px" }}
      >
        {/* Rating pill */}
        <div
          className="inline-flex items-center gap-4 hero-rating-pill"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "999px",
            padding: "10px 18px",
            marginBottom: "32px",
          }}
          role="img"
          aria-label="Hodnocení 5.0 z 5 – 117 spokojených klientů"
        >
          <div className="flex items-center" style={{ marginRight: "4px" }}>
            {avatars.map((av, i) => (
              <div key={av.initials} style={{
                marginLeft: i === 0 ? 0 : "-12px",
                border: "2px solid #111",
                borderRadius: "50%",
                boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
                lineHeight: 0,
                zIndex: avatars.length - i,
                position: "relative",
              }}>
                <AvatarSvg initials={av.initials} from={av.from} to={av.to} />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static
                <StarIcon key={i} fill="#FF5A1F" className="w-4 h-4 text-[#FF5A1F]" />
              ))}
            </div>
            <div className="flex flex-col items-start">
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff", lineHeight: 1.3, margin: 0, whiteSpace: "nowrap" }}>
                Hodnocení 5.0 / 5
              </p>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.3, margin: 0, whiteSpace: "nowrap" }}>
                117+ spokojených klientů
              </p>
            </div>
          </div>
        </div>

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
            background: "linear-gradient(135deg, #FF6A2A 0%, #FFB347 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 24px rgba(255,90,31,0.5))",
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
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{
              background: "linear-gradient(135deg, #FF6A2A 0%, #FF3C00 100%)",
              color: "#FFFFFF",
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
              border: "1px solid rgba(255,255,255,0.2)",
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
        .animate-scroll-dot {
          animation: scroll-dot 1.8s ease-in-out infinite;
        }
        @media (max-width: 480px) {
          .hero-primary-btn, .hero-secondary-btn {
            width: 100%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-dot { animation: none; }
        }
        #hero-primary-cta:focus-visible,
        #hero-secondary-cta:focus-visible {
          outline: 2px solid #FF5A1F;
          outline-offset: 3px;
        }
        /* ── Mobile hero adjustments ────────────── */
        @media (max-width: 768px) {
          .hero-rating-pill {
            display: none !important;
          }
          .hero-content-wrap {
            max-width: 100% !important;
            padding: 0 20px !important;
          }
          .hero-headline {
            font-size: clamp(28px, 8vw, 42px) !important;
            max-width: 340px;
          }
          .hero-subheading {
            max-width: 340px !important;
            font-size: 15px !important;
          }
        }
        @media (max-width: 480px) {
          .hero-headline {
            font-size: clamp(26px, 7vw, 36px) !important;
            max-width: 300px;
          }
          .hero-subheading {
            max-width: 300px !important;
          }
        }
      `}</style>
    </section>
  );
};
