import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionDivider } from "../../components/SectionDivider";
import { ChevronDown, Check } from "lucide-react";
import { pk } from "../../../../design/pkLandingColors";

/* ── Pricing data ────────────────────────────────────────────────── */
const PROJECT_OPTIONS = [
  { name: "Landing page", price_czk: 19900 },
  { name: "Firemní web", price_czk: 29900 },
  { name: "E-shop", price_czk: 49900 },
  { name: "Modernizace webu", price_czk: 17900 },
];

const PAGE_OPTIONS = [
  { name: "1 stránka", price_czk: 0 },
  { name: "3–5 stránek", price_czk: 0 },
  { name: "6–10 stránek", price_czk: 5000 },
  { name: "10+ stránek", price_czk: 10000 },
];

const FEATURE_OPTIONS = [
  { name: "Chatbot", price_czk: 15900 },
  { name: "Cenový kalkulátor", price_czk: 9900 },
  { name: "Rezervační systém", price_czk: 7900 },
  { name: "Lead management", price_czk: 19900 },
  { name: "Kontaktní formulář", price_czk: 3900 },
  { name: "Galerie", price_czk: 5900 },
];

const DOMAIN_PRICE = 1500;

const formatPrice = (n: number) =>
  n.toLocaleString("cs-CZ").replace(/\u00a0/g, "\u00a0") + "\u00a0Kč";

/* ── Animated price ───────────────────────────────────────────────── */
function useAnimatedPrice(target: number) {
  const [display, setDisplay] = useState(target);
  const prev = useRef(target);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    const from = prev.current;
    const to = target;
    const dur = 420;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) raf.current = requestAnimationFrame(step);
      else prev.current = to;
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target]);
  return display;
}

/* ── Shared select styles ────────────────────────────────────────── */
const selectBase = {
  fontFamily: "'Space Grotesk',sans-serif",
  fontWeight: 500,
  fontSize: "15px",
  color: pk.ink,
  background: pk.slateTint03,
  border: `1px solid ${pk.slateTint12}`,
  borderRadius: "12px",
  padding: "12px 40px 12px 16px",
  width: "100%",
  boxSizing: "border-box" as const,
  outline: "none",
  cursor: "pointer",
  appearance: "none" as const,
  WebkitAppearance: "none" as const,
  MozAppearance: "none" as const,
  transition: "border-color 200ms ease, box-shadow 200ms ease",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Space Grotesk',sans-serif",
  fontWeight: 600,
  fontSize: "12px",
  letterSpacing: "0.08em",
  color: pk.ink55,
  textTransform: "uppercase",
  marginBottom: "8px",
  display: "block",
};

/* ── Multi-select dropdown ───────────────────────────────────────── */
function MultiSelectDropdown({
  options,
  selected,
  onChange,
  placeholder,
}: {
  options: { name: string; price_czk: number }[];
  selected: Set<string>;
  onChange: (next: Set<string>) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  const toggle = (name: string) => {
    const next = new Set(selected);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    onChange(next);
  };

  const displayText =
    selected.size === 0
      ? placeholder
      : selected.size === 1
        ? [...selected][0]
        : `Vybráno ${selected.size} položek`;

  return (
    <div ref={ref} style={{ position: "relative", width: "100%" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          ...selectBase,
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = pk.accent40;
          e.currentTarget.style.boxShadow = `0 0 0 3px ${pk.accent10}`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = pk.slateTint12;
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <span style={{ color: selected.size ? pk.ink : pk.ink45 }}>
          {displayText}
        </span>
        <ChevronDown
          style={{
            width: "18px",
            height: "18px",
            color: pk.ink45,
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 200ms ease",
          }}
        />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: "4px",
            background: pk.page,
            border: `1px solid ${pk.slateTint12}`,
            borderRadius: "12px",
            boxShadow: `0 18px 40px ${pk.slateTint12}`,
            zIndex: 20,
            padding: "8px",
            maxHeight: "260px",
            overflowY: "auto",
          }}
        >
          {options.map((opt) => {
            const isSelected = selected.has(opt.name);
            return (
              <button
                key={opt.name}
                type="button"
                onClick={() => toggle(opt.name)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "none",
                  background: isSelected ? pk.accent12 : "transparent",
                  color: isSelected ? pk.accent : pk.ink86,
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: "14px",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {isSelected ? (
                    <Check style={{ width: "16px", height: "16px", color: pk.accent }} />
                  ) : (
                    <span style={{ width: "16px", height: "16px" }} />
                  )}
                  {opt.name}
                </span>
                <span style={{ fontSize: "12px", color: pk.ink50 }}>
                  +{formatPrice(opt.price_czk)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export const PriceCalculatorSection = (): JSX.Element => {
  const navigate = useNavigate();
  const [project, setProject] = useState(PROJECT_OPTIONS[0]);
  const [pages, setPages] = useState(PAGE_OPTIONS[0]);
  const [features, setFeatures] = useState<Set<string>>(new Set());
  const [domain, setDomain] = useState<"Ano" | "Ne">("Ne");

  const total =
    project.price_czk +
    pages.price_czk +
    [...features].reduce(
      (sum, name) =>
        sum + (FEATURE_OPTIONS.find((f) => f.name === name)?.price_czk ?? 0),
      0
    ) +
    (domain === "Ano" ? DOMAIN_PRICE : 0);

  const animatedPrice = useAnimatedPrice(total);

  return (
    <section
      id="calculator"
      style={{
        width: "100%",
        backgroundColor: pk.page,
        padding: "80px 0 100px",
        marginTop: "-50px",
        marginBottom: "-50px",
        position: "relative",
      }}
    >
      <SectionDivider />
      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "0 24px" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px,4.5vw,48px)",
              lineHeight: 1.1,
              color: pk.ink,
              letterSpacing: "-0.02em",
              margin: "0 auto 16px",
              maxWidth: "700px",
            }}
          >
            Kolik bude váš web{" "}
            <span
              style={{
                background: pk.gradientCalculatorAccent,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              stát?
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: pk.ink62,
              lineHeight: 1.6,
              margin: "0 auto",
            }}
          >
            Vyberte parametry projektu a zjistěte orientační cenu během několika sekund.
          </p>
        </div>

        {/* Single card container */}
        <div
          className="calc-card"
          style={{
            background: pk.charcoal95,
            border: `1px solid ${pk.accent20}`,
            borderRadius: "24px",
            padding: "32px 28px",
            boxShadow:
              `0 0 0 1px ${pk.accent08}, 0 0 40px ${pk.accent06}, 0 24px 48px ${pk.black40}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Neon glow accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: pk.gradientCalculatorShine,
              opacity: 0.8,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Typ projektu */}
            <div>
              <label style={labelStyle}>Typ projektu</label>
              <div style={{ position: "relative" }}>
                <select
                  value={project.name}
                  onChange={(e) => {
                    const opt = PROJECT_OPTIONS.find((o) => o.name === e.target.value);
                    if (opt) setProject(opt);
                  }}
                  style={selectBase}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = pk.accent40;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${pk.accent10}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = pk.onDarkBorder12;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {PROJECT_OPTIONS.map((o) => (
                    <option key={o.name} value={o.name} style={{ background: pk.page, color: pk.ink }}>
                      {o.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "18px",
                    height: "18px",
                    color: pk.onDark40,
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>

            {/* Počet stránek */}
            <div>
              <label style={labelStyle}>Počet stránek</label>
              <div style={{ position: "relative" }}>
                <select
                  value={pages.name}
                  onChange={(e) => {
                    const opt = PAGE_OPTIONS.find((o) => o.name === e.target.value);
                    if (opt) setPages(opt);
                  }}
                  style={selectBase}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = pk.accent40;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${pk.accent10}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = pk.onDarkBorder12;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {PAGE_OPTIONS.map((o) => (
                    <option key={o.name} value={o.name} style={{ background: pk.page, color: pk.ink }}>
                      {o.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "18px",
                    height: "18px",
                    color: pk.onDark40,
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>

            {/* Požadované funkce (multi-select) */}
            <div>
              <label style={labelStyle}>Požadované funkce</label>
              <MultiSelectDropdown
                options={FEATURE_OPTIONS}
                selected={features}
                onChange={setFeatures}
                placeholder="Vyberte funkce..."
              />
            </div>

            {/* Doména a hosting */}
            <div>
              <label style={labelStyle}>Doména a hosting</label>
              <div style={{ position: "relative" }}>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value as "Ano" | "Ne")}
                  style={selectBase}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = pk.accent40;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${pk.accent10}`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = pk.onDarkBorder12;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <option value="Ne" style={{ background: pk.page, color: pk.ink }}>
                    Ne
                  </option>
                  <option value="Ano" style={{ background: pk.page, color: pk.ink }}>
                    Ano
                  </option>
                </select>
                <ChevronDown
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "18px",
                    height: "18px",
                    color: pk.onDark40,
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: `linear-gradient(90deg, transparent, ${pk.accent20}, transparent)`,
              }}
            />

            {/* Odhad ceny projektu + price */}
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  color: pk.onDark45,
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                Odhad ceny projektu
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(36px,6vw,52px)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  background: pk.gradientPriceDisplay,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "24px",
                }}
                aria-live="polite"
                aria-atomic="true"
              >
                {formatPrice(animatedPrice)}
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={() => {
                  navigate("/napiste-nam");
                  setTimeout(() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }, 180);
                }}
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  background: pk.gradientCtaSoft,
                  border: "none",
                  borderRadius: "14px",
                  color: pk.hero,
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "all 280ms cubic-bezier(0.2,0.8,0.2,1)",
                  boxShadow: `0 12px 32px ${pk.accent25}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  margin: "0 auto",
                }}
                onMouseEnter={(e) => {
                  const b = e.currentTarget as HTMLButtonElement;
                  b.style.transform = "translateY(-3px)";
                  b.style.filter = "brightness(1.1)";
                  b.style.boxShadow = `0 18px 40px ${pk.accent35}`;
                }}
                onMouseLeave={(e) => {
                  const b = e.currentTarget as HTMLButtonElement;
                  b.style.transform = "";
                  b.style.filter = "";
                  b.style.boxShadow = `0 12px 32px ${pk.accent25}`;
                }}
              >
                Získat přesnou nabídku
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .calc-card:focus-within { border-color: var(--pk-accent-35); box-shadow: 0 0 0 1px var(--pk-accent-12), 0 0 48px var(--pk-accent-08); }
        @media (max-width: 600px) {
          .calc-card { padding: 24px 20px !important; }
        }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
        select option { background: var(--pk-panel-darker) !important; color: var(--pk-on-dark) !important; }
      `}</style>
    </section>
  );
};
