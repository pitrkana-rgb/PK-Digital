import { useEffect, useRef, useState } from "react";

/* ── Count-up hook ──────────────────────────────────────────────── */
const useCountUp = (target: number, duration = 1400, start = false) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [start, target, duration]);

  return count;
};

/* ── Badge definition ───────────────────────────────────────────── */
interface Badge {
  title: string;
  numericValue: number;
  suffix: string;        // e.g. " %" or " dny" or " dnů"
  description: string;
}

const badges: Badge[] = [
  {
    title: "Garance spokojenosti",
    numericValue: 100,
    suffix: " %",
    description: "Web dokončujeme až ve chvíli, kdy jste s výsledkem plně spokojeni.",
  },
  {
    title: "Prototyp zdarma",
    numericValue: 3,
    suffix: " dny",
    description: "Do 3 dnů máte zdarma prototyp webu, podle kterého se rozhodnete o budoucí spolupráci.",
  },
  {
    title: "Hotový web",
    numericValue: 14,
    suffix: " dnů",
    description: "Standardně dodáme kompletní web do 14 dnů od schválení prototypu.",
  },
];

/* ── Animated badge card ─────────────────────────────────────────── */
const AnimatedBadge = ({ badge, delay }: { badge: Badge; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Trigger when card enters viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [visible, delay]);

  const count = useCountUp(badge.numericValue, 1200, started);

  return (
    <div
      ref={ref}
      className="badge-card"
      style={{
        background: "linear-gradient(145deg, rgba(13,27,42,0.9), rgba(13,27,42,0.55))",
        border: "1px solid rgba(0,229,255,0.12)",
        borderRadius: "20px",
        padding: "28px 24px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "12px",
        transition: "border-color 250ms ease, transform 250ms ease, box-shadow 250ms ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(0,229,255,0.35)";
        el.style.transform = "translateY(-6px)";
        el.style.boxShadow = "0 0 20px rgba(0,229,255,0.18), 0 24px 48px rgba(0,0,0,0.35)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(0,229,255,0.12)";
        el.style.transform = "";
        el.style.boxShadow = "";
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: "32px", right: "32px",
        height: "2px",
        background: "linear-gradient(90deg, #00E5FF, transparent)",
        borderRadius: "1px",
      }} />

      {/* Title */}
      <span
        className="badge-title"
        style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 500, fontSize: "12px",
          letterSpacing: "0.1em", color: "#00E5FF",
          textTransform: "uppercase" as const,
        }}
      >
        {badge.title}
      </span>

      {/* Animated value */}
      <div
        className="badge-value"
        style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 700,
          fontSize: "clamp(36px, 4.5vw, 52px)",
          color: "#F0F4F8",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          // Smooth pop-in when count starts
          opacity: started ? 1 : 0,
          transform: started ? "scale(1)" : "scale(0.85)",
          transition: "opacity 300ms ease, transform 300ms ease",
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {count}{badge.suffix}
      </div>

      {/* Description */}
      <p
        className="badge-desc"
        style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 400, fontSize: "13px",
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.55, margin: 0,
        }}
      >
        {badge.description}
      </p>
    </div>
  );
};

/* ── Section ─────────────────────────────────────────────────────── */
export const UserTestimonialsSection = (): JSX.Element => (
  <section
    className="stats-section"
    style={{ width: "100%", backgroundColor: "transparent", padding: "110px 0 60px" }}
  >
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}
        className="stats-grid"
      >
        {badges.map((badge, i) => (
          <AnimatedBadge key={badge.title} badge={badge} delay={i * 120} />
        ))}
      </div>
    </div>

    <style>{`
      @media(max-width:767px){
        .stats-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 8px !important; }
        .badge-card { padding: 14px 10px !important; border-radius: 12px !important; gap: 6px !important; min-width: 0 !important; }
        .badge-title { font-size: 9px !important; letter-spacing: 0.06em !important; }
        .badge-value { font-size: 22px !important; }
        .badge-desc { font-size: 10px !important; line-height: 1.35 !important; display: -webkit-box !important; -webkit-line-clamp: 2 !important; -webkit-box-orient: vertical !important; overflow: hidden !important; }
        .stats-section { padding-top: 60px !important; padding-bottom: 40px !important; }
      }
      @media(prefers-reduced-motion:reduce){
        .badge-card { transition: none !important; }
        .badge-value { transition: none !important; opacity: 1 !important; transform: none !important; }
      }
      .badge-card:focus-visible { outline: 2px solid #00E5FF; outline-offset: 4px; }
    `}</style>
  </section>
);
