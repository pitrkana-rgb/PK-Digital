import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../../i18n/LanguageContext";

type AnimatedBadgeValue = {
  count: number;
  suffix: string;
};

/* ── Badge value animation hook ─────────────────────────────────── */
const useAnimatedBadgeValue = (badge: Badge, start = false, duration = 1500): AnimatedBadgeValue => {
  const [value, setValue] = useState<AnimatedBadgeValue>({ count: 0, suffix: badge.suffix });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const isTimeBadge = badge.suffix.includes("dn");

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      if (!isTimeBadge) {
        setValue({ count: Math.round(eased * badge.numericValue), suffix: badge.suffix });
      } else {
        const phaseSplit = 0.62;

        if (progress <= phaseSplit) {
          // Phase 1: enough visual motion via hours 1..24.
          const phaseProgress = progress / phaseSplit;
          const phaseEased = 1 - Math.pow(1 - phaseProgress, 3);
          const hours = Math.max(1, Math.round(1 + phaseEased * 23));
          setValue({ count: hours, suffix: " h" });
        } else {
          // Phase 2: switch to final unit/value (days) and count up.
          const phaseProgress = (progress - phaseSplit) / (1 - phaseSplit);
          const phaseEased = 1 - Math.pow(1 - phaseProgress, 3);
          const fromDays = 1;
          const toDays = badge.numericValue;
          const days = Math.round(fromDays + (toDays - fromDays) * phaseEased);
          setValue({ count: days, suffix: badge.suffix });
        }
      }

      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [start, badge.numericValue, badge.suffix, duration]);

  return value;
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
    description: "Neodevzdáváme, dokud nejste spokojeni.",
  },
  {
    title: "Prototyp zdarma",
    numericValue: 3,
    suffix: " dny",
    description: "Dle prototypu se rozhodnete o budoucí spolupráci.",
  },
  {
    title: "Hotový web",
    numericValue: 14,
    suffix: " dnů",
    description: "Rychlé dodání bez kompromisů v kvalitě",
  },
];

const badgesEn: Badge[] = [
  {
    title: "Satisfaction guarantee",
    numericValue: 100,
    suffix: " %",
    description: "We finalize your website only when you are fully satisfied with the result.",
  },
  {
    title: "Free prototype",
    numericValue: 3,
    suffix: " days",
    description: "Get a free website prototype within 3 days, then decide on future collaboration.",
  },
  {
    title: "Website delivered",
    numericValue: 14,
    suffix: " days",
    description: "We typically deliver a complete website within 14 days after prototype approval.",
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

  const animated = useAnimatedBadgeValue(badge, started, 2475);
  const titleParts = badge.title.split(/\s+/);
  const titleLine1 = titleParts[0] ?? "";
  const titleLine2 = titleParts.slice(1).join(" ") ?? "";

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

      {/* Title — on mobile shows as 2 lines (e.g. GARANCE / SPOKOJENOSTI) */}
      <span
        className="badge-title"
        style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 500, fontSize: "12px",
          letterSpacing: "0.1em", color: "#00E5FF",
          textTransform: "uppercase" as const,
        }}
      >
        <span className="badge-title-line1">{titleLine1}</span>
        <span className="badge-title-line2">{titleLine2}</span>
      </span>

      {/* Animated value */}
      <div
        className="badge-value"
        style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 700,
          fontSize: "clamp(26px, 4.5vw, 42px)",
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
        {animated.count}{animated.suffix}
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
export const UserTestimonialsSection = (): JSX.Element => {
  const { language } = useLanguage();
  const items = language === "en" ? badgesEn : badges;
  return (
  <section
    className="stats-section"
    style={{ width: "100%", backgroundColor: "transparent", padding: "110px 0 60px" }}
  >
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}
        className="stats-grid"
      >
        {items.map((badge, i) => (
          <AnimatedBadge key={badge.title} badge={badge} delay={i * 120} />
        ))}
      </div>
    </div>

    <style>{`
      @media(max-width:767px){
        .stats-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 8px !important; }
        .badge-card { padding: 14px 10px !important; border-radius: 12px !important; gap: 6px !important; min-width: 0 !important; }
        .badge-title { font-size: 9px !important; letter-spacing: 0.06em !important; display: block !important; }
        .badge-title-line1, .badge-title-line2 { display: block !important; line-height: 1.25 !important; }
        .badge-title-line2 { margin-top: 1px !important; }
        .badge-title-line2::before { content: none !important; }
        .badge-value { font-size: 22px !important; }
        /* Detail: three lines visible (was 2) */
        .badge-desc {
          font-size: 10px !important;
          line-height: 1.35 !important;
          display: -webkit-box !important;
          -webkit-line-clamp: 3 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
        }
        .stats-section { padding-top: 60px !important; padding-bottom: 40px !important; }
      }
      @media(min-width:768px){
        .badge-title { display: flex !important; flex-wrap: nowrap !important; gap: 0.25em !important; }
        .badge-title-line1, .badge-title-line2 { display: inline !important; }
        .badge-title-line2::before { content: "\\00a0" !important; }
        .badge-card {
          width: calc(100% - 20px) !important;
          max-width: calc(100% - 20px) !important;
          margin-left: auto !important;
          margin-right: auto !important;
          box-sizing: border-box !important;
        }
      }
      @media(prefers-reduced-motion:reduce){
        .badge-card { transition: none !important; }
        .badge-value { transition: none !important; opacity: 1 !important; transform: none !important; }
      }
      .badge-card:focus-visible { outline: 2px solid #00E5FF; outline-offset: 4px; }
    `}</style>
  </section>
);
};
