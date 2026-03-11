import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionDivider } from "../../components/SectionDivider";

/* ─────────────────────────────────────────────────────────────────
   Pricing data — loaded from /Calculator_inputs.csv at runtime.
   Falls back to hard-coded defaults if fetch fails (same values).
────────────────────────────────────────────────────────────────── */
interface CsvRow {
    category: string;
    name: string;
    price_czk: number;
}

const FALLBACK_ROWS: CsvRow[] = [
    { category: "project_type", name: "Landing page", price_czk: 19900 },
    { category: "project_type", name: "Firemní web", price_czk: 29900 },
    { category: "project_type", name: "E-shop", price_czk: 49900 },
    { category: "project_type", name: "Modernizace", price_czk: 14900 },
    { category: "pages", name: "1 stránka", price_czk: 0 },
    { category: "pages", name: "3–5 stránek", price_czk: 0 },
    { category: "pages", name: "6–10 stránek", price_czk: 5000 },
    { category: "pages", name: "10+ stránek", price_czk: 10000 },
    { category: "feature", name: "Chatbot", price_czk: 15900 },
    { category: "feature", name: "Cenový kalkulátor", price_czk: 9900 },
    { category: "feature", name: "Rezervační systém", price_czk: 7900 },
    { category: "feature", name: "Lead management", price_czk: 19900 },
    { category: "feature", name: "Kontaktní formulář", price_czk: 3900 },
    { category: "feature", name: "Galerie", price_czk: 5900 },
    { category: "domain", name: "Doména + hosting", price_czk: 1500 },
];

/** Parse the CSV text (handles both UTF-8 and mangled Win-1250) */
function parseCsv(text: string): CsvRow[] {
    const lines = text.trim().split(/\r?\n/).slice(1); // skip header
    const rows: CsvRow[] = [];
    for (const line of lines) {
        const cols = line.split(",");
        if (cols.length < 3) continue;
        const category = cols[0].trim();
        const name = cols[1].trim();
        const price = parseInt(cols[2].trim(), 10);
        if (category && name && !isNaN(price)) rows.push({ category, name, price_czk: price });
    }
    return rows.length > 0 ? rows : FALLBACK_ROWS;
}

/* ─────────────────────────────────────────────────────────────────
   Animated price counter
────────────────────────────────────────────────────────────────── */
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
            else { prev.current = to; }
        };
        raf.current = requestAnimationFrame(step);
        return () => { if (raf.current) cancelAnimationFrame(raf.current); };
    }, [target]);

    return display;
}

/* ─────────────────────────────────────────────────────────────────
   Small icon components for features
────────────────────────────────────────────────────────────────── */
const icons: Record<string, JSX.Element> = {
    "Chatbot": <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
    "Cenový kalkulátor": <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="12" y2="14" /></svg>,
    "Rezervační systém": <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    "Lead management": <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    "Kontaktní formulář": <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
    "Galerie": <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21,15 16,10 5,21" /></svg>,
};

const formatPrice = (n: number) =>
    n.toLocaleString("cs-CZ").replace(/\u00a0/g, "\u00a0") + "\u00a0Kč";

/* ─────────────────────────────────────────────────────────────────
   Main component
────────────────────────────────────────────────────────────────── */
export const PriceCalculatorSection = (): JSX.Element => {
    const navigate = useNavigate();
    const [rows, setRows] = useState<CsvRow[]>(FALLBACK_ROWS);

    // Load CSV
    useEffect(() => {
        fetch("/Calculator_inputs.csv")
            .then(r => r.text())
            .then(text => setRows(parseCsv(text)))
            .catch(() => setRows(FALLBACK_ROWS));
    }, []);

    // Derived option lists
    const projectTypes = rows.filter(r => r.category === "project_type");
    const pageOptions = rows.filter(r => r.category === "pages");
    const features = rows.filter(r => r.category === "feature");
    const domainRow = rows.find(r => r.category === "domain");

    // State
    const [selectedType, setSelectedType] = useState<CsvRow | null>(null);
    const [selectedPages, setSelectedPages] = useState<CsvRow | null>(null);
    const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
    const [domainEnabled, setDomainEnabled] = useState(false);

    // Recalculate on data load — auto-select first of each
    useEffect(() => {
        if (projectTypes.length) setSelectedType(projectTypes[0]);
        if (pageOptions.length) setSelectedPages(pageOptions[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rows]);

    const rawTotal =
        (selectedType?.price_czk ?? 0) +
        (selectedPages?.price_czk ?? 0) +
        [...selectedFeatures].reduce((s, name) => s + (features.find(f => f.name === name)?.price_czk ?? 0), 0) +
        (domainEnabled ? (domainRow?.price_czk ?? 0) : 0);

    const animatedPrice = useAnimatedPrice(rawTotal);

    const toggleFeature = (name: string) => {
        setSelectedFeatures(prev => {
            const next = new Set(prev);
            next.has(name) ? next.delete(name) : next.add(name);
            return next;
        });
    };

    /* ── Styles ──────────────────────────────────────────────────── */
    const card: React.CSSProperties = {
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "28px",
    };

    const optionBtn = (active: boolean): React.CSSProperties => ({
        fontFamily: "'Space Grotesk',sans-serif",
        fontWeight: active ? 600 : 400,
        fontSize: "14px",
        padding: "10px 16px",
        borderRadius: "12px",
        border: `1px solid ${active ? "rgba(0,229,255,0.5)" : "rgba(255,255,255,0.1)"}`,
        background: active
            ? "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(224,64,251,0.08))"
            : "rgba(255,255,255,0.03)",
        color: active ? "#00E5FF" : "rgba(255,255,255,0.7)",
        cursor: "pointer",
        transition: "all 180ms ease",
        transform: active ? "scale(1.03)" : "scale(1)",
        boxShadow: active ? "0 0 12px rgba(0,229,255,0.15)" : "none",
        outline: "none",
    });

    const segBtn = (active: boolean): React.CSSProperties => ({
        fontFamily: "'Space Grotesk',sans-serif",
        fontWeight: active ? 600 : 400,
        fontSize: "13px",
        padding: "8px 14px",
        borderRadius: "8px",
        border: "none",
        background: active ? "rgba(0,229,255,0.15)" : "transparent",
        color: active ? "#00E5FF" : "rgba(255,255,255,0.55)",
        cursor: "pointer",
        transition: "all 180ms ease",
        flex: "1 1 0",
        transform: active ? "scale(1.02)" : "scale(1)",
        outline: "none",
    });

    const label: React.CSSProperties = {
        fontFamily: "'Space Grotesk',sans-serif",
        fontWeight: 600,
        fontSize: "13px",
        letterSpacing: "0.08em",
        color: "rgba(255,255,255,0.4)",
        textTransform: "uppercase",
        marginBottom: "12px",
        display: "block",
    };

    return (
        <section
            id="calculator"
            style={{
                width: "100%",
                backgroundColor: "#000",
                padding: "80px 0 100px",
                marginTop: "-50px",
                marginBottom: "-50px",
                position: "relative",
            }}
        >
            <SectionDivider />
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

                {/* ── Section header ──────────────────────────────────── */}
                <div style={{ textAlign: "center", marginBottom: "52px" }}>
                    <h2 style={{
                        fontFamily: "'Space Grotesk',sans-serif",
                        fontWeight: 700,
                        fontSize: "clamp(28px,4.5vw,48px)",
                        lineHeight: 1.1,
                        color: "#fff",
                        letterSpacing: "-0.02em",
                        margin: "0 auto 16px",
                        maxWidth: "700px",
                    }}>
                        Kolik bude váš web{" "}
                        <span style={{
                            background: "linear-gradient(135deg,#E040FB,#00E5FF)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}>stát?</span>
                    </h2>
                    <p style={{
                        fontFamily: "'Space Grotesk',sans-serif",
                        fontWeight: 400,
                        fontSize: "17px",
                        color: "rgba(255,255,255,0.55)",
                        lineHeight: 1.6,
                        margin: "0 auto",
                        maxWidth: "540px",
                    }} className="calc-sub">
                        Vyberte parametry projektu a zjistěte orientační cenu během několika sekund.
                    </p>
                </div>

                {/* ── Two-column layout ───────────────────────────────── */}
                <div className="calc-grid">

                    {/* ══ LEFT — Configurator ════════════════════════════ */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                        {/* Project type */}
                        <div style={card}>
                            <span style={label}>Typ projektu</span>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                                {projectTypes.map(pt => (
                                    <button
                                        key={pt.name}
                                        style={optionBtn(selectedType?.name === pt.name)}
                                        onClick={() => setSelectedType(pt)}
                                        onMouseEnter={e => {
                                            if (selectedType?.name !== pt.name) {
                                                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,229,255,0.3)";
                                                (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,229,255,0.06)";
                                            }
                                        }}
                                        onMouseLeave={e => {
                                            if (selectedType?.name !== pt.name) {
                                                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
                                                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
                                            }
                                        }}
                                    >
                                        <span style={{ display: "block", fontSize: "13px", fontWeight: 600 }}>{pt.name}</span>
                                        <span style={{ display: "block", fontSize: "11px", opacity: 0.6, marginTop: "2px" }}>
                                            od {formatPrice(pt.price_czk)}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Pages */}
                        <div style={card}>
                            <span style={label}>Počet stránek</span>
                            <div style={{
                                display: "flex",
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: "10px",
                                padding: "4px",
                                gap: "2px",
                            }}>
                                {pageOptions.map(pg => (
                                    <button
                                        key={pg.name}
                                        style={segBtn(selectedPages?.name === pg.name)}
                                        onClick={() => setSelectedPages(pg)}
                                    >
                                        {pg.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div style={card}>
                            <span style={label}>Požadované funkce</span>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                {features.map(f => {
                                    const active = selectedFeatures.has(f.name);
                                    return (
                                        <button
                                            key={f.name}
                                            onClick={() => toggleFeature(f.name)}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                padding: "10px 14px",
                                                borderRadius: "10px",
                                                border: `1px solid ${active ? "rgba(0,229,255,0.35)" : "rgba(255,255,255,0.07)"}`,
                                                background: active ? "rgba(0,229,255,0.08)" : "rgba(255,255,255,0.02)",
                                                cursor: "pointer",
                                                transition: "all 180ms ease",
                                                outline: "none",
                                            }}
                                            onMouseEnter={e => {
                                                if (!active) {
                                                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,229,255,0.2)";
                                                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,229,255,0.04)";
                                                }
                                            }}
                                            onMouseLeave={e => {
                                                if (!active) {
                                                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
                                                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.02)";
                                                }
                                            }}
                                        >
                                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                <span style={{ color: active ? "#00E5FF" : "rgba(255,255,255,0.4)", display: "flex" }}>
                                                    {icons[f.name] ?? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="16" height="16"><circle cx="12" cy="12" r="9" /></svg>}
                                                </span>
                                                <span style={{
                                                    fontFamily: "'Space Grotesk',sans-serif",
                                                    fontWeight: 500, fontSize: "14px",
                                                    color: active ? "#fff" : "rgba(255,255,255,0.65)",
                                                }}>
                                                    {f.name}
                                                </span>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                <span style={{
                                                    fontFamily: "'Space Grotesk',sans-serif",
                                                    fontSize: "12px",
                                                    color: active ? "#00E5FF" : "rgba(255,255,255,0.3)",
                                                    fontWeight: 500,
                                                }}>
                                                    +{formatPrice(f.price_czk)}
                                                </span>
                                                {/* Checkbox */}
                                                <div style={{
                                                    width: "18px", height: "18px", borderRadius: "5px",
                                                    border: `1.5px solid ${active ? "#00E5FF" : "rgba(255,255,255,0.2)"}`,
                                                    background: active ? "rgba(0,229,255,0.2)" : "transparent",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    transition: "all 180ms ease", flexShrink: 0,
                                                }}>
                                                    {active && (
                                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                            <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Domain toggle */}
                        {domainRow && (
                            <div style={card}>
                                <button
                                    onClick={() => setDomainEnabled(v => !v)}
                                    style={{
                                        width: "100%", display: "flex", alignItems: "center",
                                        justifyContent: "space-between", cursor: "pointer",
                                        background: "none", border: "none", padding: 0, outline: "none",
                                    }}
                                >
                                    <div>
                                        <div style={{
                                            fontFamily: "'Space Grotesk',sans-serif",
                                            fontWeight: 600, fontSize: "15px", color: "#fff",
                                        }}>
                                            {domainRow.name}
                                        </div>
                                        <div style={{
                                            fontFamily: "'Space Grotesk',sans-serif",
                                            fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "2px",
                                        }}>
                                            +{formatPrice(domainRow.price_czk)} / rok
                                        </div>
                                    </div>
                                    {/* Toggle pill */}
                                    <div style={{
                                        width: "44px", height: "24px", borderRadius: "12px",
                                        background: domainEnabled
                                            ? "linear-gradient(135deg,#00C6FF,#00E5FF)"
                                            : "rgba(255,255,255,0.1)",
                                        border: `1px solid ${domainEnabled ? "rgba(0,229,255,0.6)" : "rgba(255,255,255,0.15)"}`,
                                        position: "relative", transition: "all 250ms ease",
                                        boxShadow: domainEnabled ? "0 0 10px rgba(0,229,255,0.3)" : "none",
                                        flexShrink: 0,
                                    }}>
                                        <div style={{
                                            position: "absolute", top: "3px",
                                            left: domainEnabled ? "22px" : "3px",
                                            width: "16px", height: "16px", borderRadius: "50%",
                                            background: "#fff",
                                            transition: "left 250ms ease",
                                            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                                        }} />
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* ══ RIGHT — Price panel ════════════════════════════ */}
                    <div style={{ position: "relative" }}>
                        <div style={{
                            position: "sticky",
                            top: "100px",
                            background: "linear-gradient(145deg, rgba(13,27,42,0.95), rgba(5,12,28,0.85))",
                            border: "1px solid rgba(0,229,255,0.18)",
                            borderRadius: "24px",
                            padding: "36px 32px 32px",
                            boxShadow: "0 0 60px rgba(0,229,255,0.08), 0 32px 64px rgba(0,0,0,0.4)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0",
                        }}>
                            {/* Top accent bar */}
                            <div style={{
                                position: "absolute", top: 0, left: "32px", right: "32px",
                                height: "2px",
                                background: "linear-gradient(90deg, #00E5FF, #E040FB, transparent)",
                                borderRadius: "0 0 1px 1px",
                            }} />

                            <div style={{
                                fontFamily: "'Space Grotesk',sans-serif",
                                fontWeight: 600, fontSize: "13px",
                                letterSpacing: "0.08em", color: "rgba(255,255,255,0.45)",
                                textTransform: "uppercase", marginBottom: "20px",
                            }}>
                                Odhad ceny projektu
                            </div>

                            {/* Animated price */}
                            <div
                                style={{
                                    fontFamily: "'Space Grotesk',sans-serif",
                                    fontWeight: 800,
                                    fontSize: "clamp(38px,5vw,56px)",
                                    lineHeight: 1,
                                    letterSpacing: "-0.03em",
                                    background: "linear-gradient(135deg, #fff 30%, #00E5FF 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    marginBottom: "8px",
                                }}
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {formatPrice(animatedPrice)}
                            </div>

                            <p style={{
                                fontFamily: "'Space Grotesk',sans-serif",
                                fontSize: "13px",
                                color: "rgba(255,255,255,0.4)",
                                lineHeight: 1.5,
                                margin: "0 0 28px",
                            }}>
                                Orientační cena projektu. Finální cena závisí na rozsahu a specifikách projektu.
                            </p>

                            {/* Price breakdown */}
                            <div style={{
                                display: "flex", flexDirection: "column", gap: "8px",
                                borderTop: "1px solid rgba(255,255,255,0.06)",
                                paddingTop: "20px", marginBottom: "28px",
                            }}>
                                {selectedType && (
                                    <PriceLine label={selectedType.name} value={selectedType.price_czk} />
                                )}
                                {selectedPages && selectedPages.price_czk > 0 && (
                                    <PriceLine label={selectedPages.name} value={selectedPages.price_czk} />
                                )}
                                {[...selectedFeatures].map(name => {
                                    const f = features.find(x => x.name === name);
                                    return f ? <PriceLine key={name} label={name} value={f.price_czk} /> : null;
                                })}
                                {domainEnabled && domainRow && (
                                    <PriceLine label={domainRow.name} value={domainRow.price_czk} />
                                )}
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => {
                                    navigate("/kontakt");
                                    setTimeout(() => {
                                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                    }, 180);
                                }}
                                style={{
                                    width: "100%", padding: "16px 24px",
                                    background: "linear-gradient(135deg, #0ABDC6, #00E5FF)",
                                    border: "none", borderRadius: "14px",
                                    color: "#000", fontFamily: "'Space Grotesk',sans-serif",
                                    fontWeight: 700, fontSize: "16px",
                                    cursor: "pointer",
                                    transition: "all 280ms cubic-bezier(0.2,0.8,0.2,1)",
                                    boxShadow: "0 12px 32px rgba(0,229,255,0.25)",
                                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                }}
                                onMouseEnter={e => {
                                    const b = e.currentTarget as HTMLButtonElement;
                                    b.style.transform = "translateY(-3px)";
                                    b.style.filter = "brightness(1.1)";
                                    b.style.boxShadow = "0 18px 40px rgba(0,229,255,0.35)";
                                }}
                                onMouseLeave={e => {
                                    const b = e.currentTarget as HTMLButtonElement;
                                    b.style.transform = "";
                                    b.style.filter = "";
                                    b.style.boxShadow = "0 12px 32px rgba(0,229,255,0.25)";
                                }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                                Získat přesnou nabídku
                            </button>

                            {/* Trust note */}
                            <p style={{
                                fontFamily: "'Space Grotesk',sans-serif",
                                fontSize: "12px", color: "rgba(255,255,255,0.3)",
                                textAlign: "center", margin: "14px 0 0",
                                lineHeight: 1.5,
                            }}>
                                Bez závazku · Odpověď do 24 hodin
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
        .calc-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .calc-grid {
            grid-template-columns: 1fr !important;
          }
          .calc-sub { font-size: 15px !important; }
        }
        @media (max-width: 480px) {
          .calc-grid { gap: 16px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>
        </section>
    );
};

/* ── Price breakdown line ─────────────────────────────────────── */
const PriceLine = ({ label, value }: { label: string; value: number }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
            fontFamily: "'Space Grotesk',sans-serif", fontSize: "13px",
            color: "rgba(255,255,255,0.55)", maxWidth: "70%",
        }}>{label}</span>
        <span style={{
            fontFamily: "'Space Grotesk',sans-serif", fontSize: "13px",
            fontWeight: 600, color: "rgba(255,255,255,0.85)",
        }}>{formatPrice(value)}</span>
    </div>
);
