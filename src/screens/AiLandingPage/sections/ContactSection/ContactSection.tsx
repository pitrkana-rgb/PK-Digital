import { useState } from "react";
import {
  Phone, MapPin, Building2, FileText, Mail, Landmark, Inbox, CheckCircle2, ChevronDown, Send
} from "lucide-react";

const PROJECT_TYPE_OPTIONS = ["Tvorba webových stránek", "Modernizace webu", "Integrace AI"];

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  description: string;
};

const init: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  description: ""
};

const FloatingField = ({
  label, id, type = "text", value, onChange, error, placeholder, multiline, isSelect, options
}: {
  label: string; id: string; type?: string; value: string;
  onChange: (v: string) => void; error?: string; placeholder: string; multiline?: boolean;
  isSelect?: boolean; options?: string[];
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "4px" }}>
      <label htmlFor={id} style={{
        position: "absolute", left: "16px",
        top: active ? "8px" : "50%",
        transform: active ? "translateY(0) scale(0.85)" : "translateY(-50%)",
        transformOrigin: "left",
        fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500,
        fontSize: active ? "12px" : "15px",
        color: focused ? "#00E5FF" : "rgba(255,255,255,0.4)",
        transition: "all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        pointerEvents: "none", zIndex: 1,
        ...(multiline ? { top: active ? "8px" : "20px", transform: "none" } : {}),
      }}>
        {label}
      </label>

      {isSelect ? (
        <div style={{ position: "relative" }}>
          <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${focused ? "#00E5FF" : error ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: "16px",
              padding: active ? "26px 20px 10px" : "20px",
              fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "16px", color: value ? "#fff" : "transparent",
              outline: "none", width: "100%", appearance: "none",
              boxSizing: "border-box", cursor: "pointer",
              transition: "all 250ms ease",
              boxShadow: focused ? "0 0 0 4px rgba(0,229,255,0.1)" : "none",
            }}
          >
            <option value="" disabled hidden></option>
            {options?.map(opt => <option key={opt} value={opt} style={{ background: "#0D0D0D", color: "#fff" }}>{opt}</option>)}
          </select>
          <ChevronDown style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", width: "18px", color: "rgba(255,255,255,0.3)", pointerEvents: "none" }} />
        </div>
      ) : multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ""}
          rows={6}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${focused ? "#00E5FF" : error ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "16px",
            padding: active ? "32px 20px 16px" : "20px",
            fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "16px", color: "#fff",
            outline: "none", resize: "none", width: "100%",
            boxSizing: "border-box", transition: "all 250ms ease",
            boxShadow: focused ? "0 0 0 4px rgba(0,229,255,0.1)" : "none",
          }}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ""}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${focused ? "#00E5FF" : error ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "16px",
            padding: active ? "28px 20px 10px" : "20px",
            fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "16px", color: "#fff",
            outline: "none", width: "100%",
            boxSizing: "border-box", transition: "all 250ms ease",
            boxShadow: focused ? "0 0 0 4px rgba(0,229,255,0.1)" : "none",
          }}
        />
      )}
      {error && <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "12px", color: "#F87171", paddingLeft: "4px", marginTop: "2px" }}>{error}</span>}
    </div>
  );
};

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", padding: "24px 0", background: "none", border: "none",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", textAlign: "left"
        }}
      >
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "17px", color: open ? "#00E5FF" : "#fff", transition: "color 250ms ease" }}>{q}</span>
        <ChevronDown style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 300ms ease", color: open ? "#00E5FF" : "rgba(255,255,255,0.3)" }} />
      </button>
      <div style={{
        maxHeight: open ? "200px" : "0", opacity: open ? 1 : 0,
        transition: "all 300ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        paddingBottom: open ? "24px" : "0",
        fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6
      }}>
        {a}
      </div>
    </div>
  );
};

/** Exact order on mobile (single column): Název firmy → Adresa → Telefon → E-mail → IČO → Datová schránka → Číslo účtu → IBAN. Desktop: same list, grid fills column-first (1–4 left, 5–8 right). */
const companyInfoOrdered = [
  { icon: Building2, label: "Název firmy", text: "PK-Digital" },
  { icon: MapPin, label: "Adresa", text: "Němčice 329, Ivančice 664 91" },
  { icon: Phone, label: "Telefon", text: "+420 725 703 868" },
  { icon: Mail, label: "E-mail", text: "info@pk-digital.cz" },
  { icon: FileText, label: "IČO", text: "21185301" },
  { icon: Inbox, label: "Datová schránka", text: "f4i6cbb" },
  { icon: Landmark, label: "Číslo účtu", text: "1025290491/5500" },
  { icon: Landmark, label: "IBAN", text: "CZ60 5500 0000 0010 2529 0491" },
];

export const ContactSection = (): JSX.Element => {
  const [form, setForm] = useState<FormState>(init);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = (f: keyof FormState) => (v: string) => {
    setForm(p => ({ ...p, [f]: v }));
    if (errors[f]) setErrors(p => ({ ...p, [f]: undefined }));
    if (submitError) setSubmitError(null);
  };

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Zadejte jméno";
    if (!form.email.trim()) e.email = "Zadejte email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Neplatný email";
    if (!form.phone.trim()) e.phone = "Zadejte telefon";
    if (!form.projectType) e.projectType = "Vyberte typ projektu";
    if (!form.description.trim()) e.description = "Napište nám, co poptáváte";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSubmitError(null);
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
      project_type: form.projectType,
      budget: form.budget.trim(),
      message: form.description.trim(),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setForm(init);
      setSubmitted(true);
    } catch {
      setSubmitError("Odeslání se nepodařilo. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ width: "100%", padding: "0 0 100px", position: "relative", backgroundColor: "#000" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* ── Full-width contact form (top half) ───────────────────── */}
        <div style={{ marginBottom: "64px" }}>
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            padding: "48px 40px",
            boxSizing: "border-box",
          }} className="contact-form-card">
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{
                  width: "80px", height: "80px", borderRadius: "50%", background: "rgba(34,197,94,0.1)",
                  border: "2px solid #22C55E", display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px"
                }}>
                  <CheckCircle2 color="#22C55E" size={40} />
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "28px", color: "#fff", marginBottom: "12px" }}>Děkujeme za odeslání.</h3>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.6)", marginBottom: "32px" }}>Ozveme se do 24 hodin.</p>
                <button type="button" onClick={() => setSubmitted(false)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "12px 24px", borderRadius: "12px", cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif" }}>Odeslat další zprávu</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="form-row">
                  <FloatingField id="f-name" label="Jméno (povinné)" value={form.name} onChange={set("name")} error={errors.name} placeholder="Jan Novák" />
                  <FloatingField id="f-company" label="Firma" value={form.company} onChange={set("company")} placeholder="Firma s.r.o." />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="form-row">
                  <FloatingField id="f-email" label="E-mail (povinné)" type="email" value={form.email} onChange={set("email")} error={errors.email} placeholder="jan@firma.cz" />
                  <FloatingField id="f-phone" label="Telefon (povinné)" type="tel" value={form.phone} onChange={set("phone")} error={errors.phone} placeholder="+420 725 703 868" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="form-row">
                  <FloatingField id="f-type" label="Typ projektu" isSelect options={PROJECT_TYPE_OPTIONS} value={form.projectType} onChange={set("projectType")} error={errors.projectType} placeholder="" />
                  <FloatingField id="f-budget" label="Rozpočet" value={form.budget} onChange={set("budget")} placeholder="např. 50 000 Kč" />
                </div>
                <FloatingField id="f-desc" label="Napište nám, co poptáváte (povinné)" value={form.description} onChange={set("description")} error={errors.description} placeholder="Stručně popište váš projekt nebo dotaz..." multiline />
                {submitError && (
                  <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "14px", color: "#F87171", margin: 0 }} role="alert">
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: "8px", padding: "18px 32px", borderRadius: "16px",
                    background: "linear-gradient(135deg, #0ABDC6, #00E5FF)",
                    border: "none", color: "#000", fontFamily: "'Space Grotesk',sans-serif",
                    fontWeight: 700, fontSize: "17px", cursor: loading ? "wait" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                    transition: "all 300ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                    boxShadow: "0 16px 40px rgba(0,229,255,0.25)",
                  }}
                  onMouseEnter={e => {
                    if (loading) return;
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.filter = "brightness(1.1)";
                    e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,229,255,0.35)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.filter = "";
                    e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,229,255,0.25)";
                  }}
                >
                  {loading ? "Odesílám..." : <><Send size={20} /> Odeslat poptávku</>}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── Firemní údaje (one card, 2 columns × 4 rows inside) ──────── */}
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(22px, 2.5vw, 28px)", color: "#fff", marginBottom: "24px", textAlign: "center" }}>
          Firemní údaje
        </h2>
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "32px 40px",
            marginBottom: "64px",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "repeat(4, auto)", gridAutoFlow: "column", gap: "24px 32px" }} className="company-info-grid">
            {companyInfoOrdered.map(({ icon: Icon, label, text }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                }}
              >
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(0,229,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00E5FF", flexShrink: 0 }}>
                  <Icon size={20} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "0.05em", marginBottom: "4px" }}>{label}</div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "14px", color: "#fff", lineHeight: 1.45 }}>{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Map + FAQ ────────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "60px", alignItems: "flex-start" }} className="contact-bottom-grid">
          <div>
            <div style={{
              borderRadius: "24px", overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)", height: "400px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
            }}>
              <iframe
                title="Mapa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2612.981881518349!2d16.376824976939943!3d49.10609338356163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4712959828766103%3A0xc0fb13a79d029583!2zTsSbbsSNaWNlIDMyOSwgNjY0IDkxIEl2YW7EjWljZQ!5e0!3m2!1scs!2scz!4v1709030000000!5m2!1scs!2scz"
                width="100%" height="100%" style={{ border: 0, filter: "grayscale(1) invert(1) opacity(0.7)" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "24px", color: "#fff", marginBottom: "24px" }}>Často kladené dotazy</h3>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <FAQItem q="Jak rychle odpovídáte?" a="Garantujeme odpověď do 24 hodin, ale většinou se ozýváme mnohem dříve – často už během pár hodin." />
              <FAQItem q="Je první konzultace zdarma?" a="Ano, první 15-30minutová konzultace je zcela zdarma. Probereme váš nápad a zjistíme, zda jsme pro sebe vhodní partneři." />
              <FAQItem q="Můžeme se potkat osobně?" a="Určitě! Sídlíme v Ivančicích u Brna a rádi vás uvidíme u nás v kanceláři nebo přijedeme za vámi v rámci Jihomoravského kraje. Jinak fungujeme skvěle online." />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .form-row { grid-template-columns: 1fr !important; }
          .company-info-grid { grid-template-columns: 1fr !important; grid-auto-flow: row !important; grid-template-rows: unset !important; }
          .contact-bottom-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
