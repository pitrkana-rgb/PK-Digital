import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";

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
    const isTimeBadge = badge.suffix.includes("dn") || badge.suffix.includes("day");
    const useHoursIntro = isTimeBadge && !badge.valuePrefix;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      if (!isTimeBadge) {
        setValue({ count: Math.round(eased * badge.numericValue), suffix: badge.suffix });
      } else {
        if (useHoursIntro) {
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
        } else {
          const fromDays = 1;
          const toDays = badge.numericValue;
          const days = Math.round(fromDays + (toDays - fromDays) * eased);
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
  valuePrefix?: string; // e.g. "Do "
  icon: "prototype" | "delivery" | "satisfaction";
}

const badges: Badge[] = [
  {
    title: "Prototyp zdarma",
    numericValue: 3,
    suffix: " dnů",
    valuePrefix: "Do ",
    icon: "prototype",
  },
  {
    title: "Hotový web",
    numericValue: 14,
    suffix: " dnů",
    valuePrefix: "Do ",
    icon: "delivery",
  },
  {
    title: "Garance spokojenosti",
    numericValue: 100,
    suffix: " %",
    icon: "satisfaction",
  },
];

const badgesEn: Badge[] = [
  {
    title: "Free prototype",
    numericValue: 3,
    suffix: " days",
    icon: "prototype",
  },
  {
    title: "Website delivered",
    numericValue: 14,
    suffix: " days",
    icon: "delivery",
  },
  {
    title: "Satisfaction guarantee",
    numericValue: 100,
    suffix: " %",
    icon: "satisfaction",
  },
];

const BadgeIcon = ({ type, isHero }: { type: Badge["icon"]; isHero: boolean }) => {
  const stroke = isHero ? pk.onDark94 : pk.ink88;

  if (type === "prototype") {
    return (
      <svg width="70" height="70" viewBox="0 0 58 58" fill="none" aria-hidden="true">
        <rect x="10" y="12" width="38" height="26" rx="8" stroke={stroke} strokeWidth="2.2" />
        <path d="M18 22h22M18 28h14" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M22 46h14" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M29 38v8" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "delivery") {
    return (
      <svg width="70" height="70" viewBox="0 0 58 58" fill="none" aria-hidden="true">
        <rect x="11" y="15" width="25" height="19" rx="4" stroke={stroke} strokeWidth="2.2" />
        <path d="M36 21h7l4 5v8h-3" stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="19" cy="39" r="4" stroke={stroke} strokeWidth="2.2" />
        <circle cx="40" cy="39" r="4" stroke={stroke} strokeWidth="2.2" />
        <path d="M23 39h13" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg width="70" height="70" viewBox="0 0 58 58" fill="none" aria-hidden="true">
      <path d="M29 10 16 15v10.5c0 8.5 5.3 15.9 13 18.5 7.7-2.6 13-10 13-18.5V15L29 10Z" stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="m22.8 27.9 4.3 4.3 8.6-9.3" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 46h16" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
};

/* ── Animated metric (compact strip item) ─────────────────────────── */
const AnimatedMetric = ({ badge, delay, isHero }: { badge: Badge; delay: number; isHero: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
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

  const animated = useAnimatedBadgeValue(badge, started, 4200);

  return (
    <div ref={ref} className="stats-metric">
      <div
        className="stats-metric-top"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
          textAlign: "left",
        }}
      >
        <div
          className="stats-metric-icon"
          style={{
            flexShrink: 0,
            opacity: started ? 1 : 0,
            transform: started ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 320ms ease, transform 320ms ease",
          }}
        >
          <BadgeIcon type={badge.icon} isHero={isHero} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
        <div
          className="stats-metric-value"
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 700,
            fontSize: "40px",
            lineHeight: 1.05,
            color: isHero ? pk.onDark : pk.ink,
            opacity: started ? 1 : 0,
            transform: started ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 320ms ease, transform 320ms ease",
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
          aria-live="polite"
          aria-atomic="true"
        >
          {badge.valuePrefix ? <span style={{ fontWeight: 700 }}>{badge.valuePrefix}</span> : null}
          {animated.count}
          <span style={{ fontWeight: 700 }}>{animated.suffix}</span>
        </div>
        <div
          className="stats-metric-title"
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 600,
            fontSize: "17px",
            lineHeight: 1.2,
            color: isHero ? pk.onDark82 : pk.ink78,
            maxWidth: "180px",
          }}
        >
          {badge.title}
        </div>
      </div>
      </div>
      <div
        className="stats-metric-desc"
        style={{
          display: "none",
        }}
      >
      </div>
    </div>
  );
};

/* ── Section ─────────────────────────────────────────────────────── */
export const UserTestimonialsSection = ({ variant = "default" }: { variant?: "default" | "hero" }): JSX.Element => {
  const { language } = useLanguage();
  const items = language === "en" ? badgesEn : badges;
  const isHero = variant === "hero";
  return (
  <section
    className="stats-section"
    data-variant={variant}
    style={{
      width: "100%",
      backgroundColor: "transparent",
      padding: isHero ? "0" : "44px 0 80px",
    }}
  >
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
      <div
        className="stats-strip"
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderRadius: 0,
          boxShadow: "none",
          padding: isHero ? "0" : "14px 18px",
          position: "relative",
        }}
      >
        <div
          className="stats-strip-row"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
            gap: 0,
            alignItems: "center",
          }}
        >
          {items.map((badge, i) => (
            <div
              key={badge.title}
              className="stats-strip-cell"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: isHero ? "0 8px" : "8px 8px",
                position: "relative",
              }}
            >
              <AnimatedMetric badge={badge} delay={i * 120} isHero={isHero} />
            </div>
          ))}
        </div>
      </div>
    </div>

    <style>{`
      @media(max-width:767px){
        .stats-section[data-variant="hero"]{ display:none !important; }
        .stats-section { padding-top: ${isHero ? "0" : "22px"} !important; padding-bottom: ${isHero ? "0" : "44px"} !important; }
        .stats-strip { padding: 0 !important; border-radius: 0 !important; }
        .stats-strip-row { grid-template-columns: 1fr !important; }
        .stats-strip-cell { padding: 10px 6px !important; }
        .stats-metric-top { gap: 10px !important; }
        .stats-metric-icon svg { width: 53px !important; height: 53px !important; }
        .stats-metric-value { font-size: 30px !important; }
        .stats-metric-title { font-size: 13px !important; max-width: 100% !important; }
      }
      @media(prefers-reduced-motion:reduce){
        .stats-metric-value { transition: none !important; opacity: 1 !important; transform: none !important; }
      }
    `}</style>
  </section>
);
};
