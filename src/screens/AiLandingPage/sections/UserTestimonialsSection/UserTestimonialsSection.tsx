import { useEffect, useRef, useState } from "react";

const statsData = [
  { label: "REALIZOVANÝCH PROJEKTŮ", value: 120, suffix: "+", description: "Od prvních MVP až po škálované AI řešení." },
  { label: "KLIENTŮ NÁS DOPORUČUJE", value: 97, suffix: " %", description: "Dlouhodobé partnerství místo jednorázových zakázek." },
  { label: "PRŮMĚRNÁ DOBA REALIZACE", value: 14, suffix: " dní", description: "Kompletní web připravený k nasazení." },
];

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

const StatCard = ({ label, value, suffix, delay }: Omit<typeof statsData[0], "description"> & { delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, 1800, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="stat-card"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "26px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        transition: "border-color 250ms ease, transform 250ms ease, box-shadow 250ms ease",
        animationDelay: `${delay}ms`,
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "rgba(255,90,31,0.4)"; el.style.transform = "translateY(-6px)"; el.style.boxShadow = "0 24px 48px rgba(255,90,31,0.12)"; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.transform = ""; el.style.boxShadow = ""; }}
    >
      {/* Orange accent line top */}
      <div style={{ position: "absolute", top: 0, left: "32px", right: "32px", height: "2px", background: "linear-gradient(90deg, #FF5A1F, transparent)", borderRadius: "1px" }} />

      <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: "12px", letterSpacing: "0.1em", color: "#FF5A1F", textTransform: "uppercase" as const }}>
        {label}
      </span>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(40px,5vw,56px)", color: "#fff", lineHeight: 1, letterSpacing: "-0.03em" }}>
        {count.toLocaleString("cs")}{suffix}
      </div>
    </div>
  );
};

export const UserTestimonialsSection = (): JSX.Element => (
  <section style={{ width: "100%", backgroundColor: "transparent", padding: "110px 0 60px" }}>
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }} className="stats-grid">
        {statsData.map((s, i) => <StatCard key={s.label} {...s} delay={i * 100} />)}
      </div>
    </div>
    <style>{`
      @media(max-width:768px){ .stats-grid{ grid-template-columns:1fr !important; gap: 16px !important; } }
      @media(prefers-reduced-motion:reduce){ .stat-card{ transition:none !important; } }
      .stat-card:focus-visible{ outline:2px solid #FF5A1F; outline-offset:4px; }
    `}</style>
  </section>
);
