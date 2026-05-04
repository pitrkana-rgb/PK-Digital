import { useNavigate } from "react-router-dom";
import { LandingStylePageRoot } from "../../components/PageBackground";

export const NotFoundPage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <LandingStylePageRoot>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "clamp(28px,5vw,40px)", marginBottom: "16px" }}>
          Stránka nenalezena
        </h1>
        <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "32px", maxWidth: "400px" }}>
          Omlouváme se, tato stránka neexistuje.
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="animate-pulse-glow hero-primary-btn"
          style={{
            padding: "9px 22px",
            borderRadius: "12px",
            background: "var(--pk-gradient-popular)",
            color: "#070B14",
            border: "none",
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            cursor: "pointer",
            transition: "transform 0.25s ease, filter 0.25s ease",
          }}
          onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = "translateY(-3px)"; b.style.filter = "brightness(1.1)"; }}
          onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = ""; b.style.filter = ""; }}
        >
          Zpět na úvodní stránku
        </button>
      </div>
    </LandingStylePageRoot>
  );
};
