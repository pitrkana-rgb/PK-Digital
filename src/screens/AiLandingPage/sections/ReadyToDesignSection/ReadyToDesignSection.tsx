import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { SectionDivider } from "../../components/SectionDivider";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";
import arrowSendUrl from "../../../../../Images/arrow_send.png";

const PROJECT_TYPE_OPTIONS = [
  "Landing page (pro jeden produkt/službu)",
  "Firemní web / prezentační stránky",
  "E-shop (internetový obchod)",
  "Modernizace / redesign stávajícího webu",
  "Jiné",
];

const FEATURES_OPTIONS = [
  "Chatbot",
  "Cenový Kalkulátor",
  "Rezervační systém",
  "Lead management",
  "E-shop",
  "Galerie / Videa",
  "Kontaktní formuláře",
  "Napojení na sociální sítě",
  "Blog / články",
  "Napojení na analytiku (Google Analytics apod.)",
];

const DOMAIN_OPTIONS = ["Ano", "Ne"];
const SUBMIT_LEAD_FN_URL = "https://hmgicymajfjsnwkctvqf.supabase.co/functions/v1/submit-lead";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  features: string[];
  hasDomain: string;
  budget: string;
  gdprConsent: boolean;
};

const init: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  features: [],
  hasDomain: "",
  budget: "",
  gdprConsent: false,
};

const DarkFloatingField = ({
  label, id, type = "text", value, onChange, error, placeholder, isSelect, options,
}: {
  label: string; id: string; type?: string; value: string;
  onChange: (v: string) => void; error?: string; placeholder: string;
  isSelect?: boolean; options?: string[];
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const sharedStyle = {
    background: pk.onDark06,
    border: `1px solid ${focused ? pk.accent80 : error ? pk.errorRed75 : pk.onDarkBorder12}`,
    borderRadius: "16px",
    fontFamily: "'Space Grotesk',sans-serif",
    fontWeight: 400,
    fontSize: "16px",
    color: pk.onDark,
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
    transition: "all 250ms ease",
    boxShadow: focused ? `0 0 0 4px ${pk.accent12}` : "none",
    backdropFilter: "blur(10px)",
  };

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "4px" }}>
      <label htmlFor={id} style={{
        position: "absolute",
        left: "16px",
        top: active ? "8px" : "50%",
        transform: active ? "translateY(0) scale(0.85)" : "translateY(-50%)",
        transformOrigin: "left",
        fontFamily: "'Space Grotesk',sans-serif",
        fontWeight: 500,
        fontSize: active ? "12px" : "15px",
        color: focused ? pk.accent : pk.onDark52,
        transition: "all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        pointerEvents: "none",
        zIndex: 1,
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
              ...sharedStyle,
              padding: active ? "26px 40px 10px 20px" : "20px 40px 20px 20px",
              appearance: "none",
              cursor: "pointer",
              color: value ? pk.onDark : "transparent",
            }}
          >
            <option value="" disabled hidden></option>
            {options?.map((opt) => (
              <option key={opt} value={opt} style={{ background: pk.panelDark, color: pk.onDark }}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", width: "18px", color: pk.onDark45, pointerEvents: "none" }} />
        </div>
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
            ...sharedStyle,
            padding: active ? "28px 20px 10px" : "20px",
          }}
        />
      )}
      {error ? <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "12px", color: pk.error300, paddingLeft: "4px", marginTop: "2px" }}>{error}</span> : null}
    </div>
  );
};

export const ReadyToDesignSection = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const PROJECT_OPTIONS = isEn
    ? [
      "Landing page (single product/service)",
      "Company website / presentation pages",
      "E-commerce store",
      "Modernization / redesign of existing website",
      "Other",
    ]
    : PROJECT_TYPE_OPTIONS;
  const FEATURES = isEn
    ? [
      "Chatbot",
      "Price Calculator",
      "Booking system",
      "Lead management",
      "E-commerce",
      "Gallery / Videos",
      "Contact forms",
      "Social media integration",
      "Blog / articles",
      "Analytics integration (Google Analytics etc.)",
    ]
    : FEATURES_OPTIONS;
  const DOMAIN = isEn ? ["Yes", "No"] : DOMAIN_OPTIONS;
  const [form, setForm] = useState<FormState>(init);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const featuresDropdownRef = useRef<HTMLDivElement | null>(null);

  const set = (f: keyof FormState) => (v: string | boolean) => {
    setForm((p) => ({ ...p, [f]: v }));
    if (errors[f]) setErrors((p) => ({ ...p, [f]: undefined }));
    if (submitError) setSubmitError(null);
  };

  const toggleFeature = (feature: string) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
    if (submitError) setSubmitError(null);
  };

  useEffect(() => {
    if (!featuresOpen) return;
    const onPointerDown = (ev: MouseEvent | TouchEvent) => {
      const target = ev.target as Node | null;
      if (!target) return;
      if (featuresDropdownRef.current?.contains(target)) return;
      setFeaturesOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [featuresOpen]);

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = isEn ? "Enter name" : "Zadejte jméno";
    if (!form.email.trim()) e.email = isEn ? "Enter email" : "Zadejte email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = isEn ? "Invalid email" : "Neplatný email";
    if (!form.phone.trim()) e.phone = isEn ? "Enter phone" : "Zadejte telefon";
    if (!form.projectType) e.projectType = isEn ? "Select project type" : "Vyberte typ projektu";
    if (!form.hasDomain) e.hasDomain = isEn ? "Select option" : "Vyberte možnost";
    if (!form.gdprConsent) e.gdprConsent = isEn ? "Consent is required to submit the form." : "Pro odeslání je nutný souhlas se zpracováním osobních údajů.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSubmitError(null);
    const row = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
      project_type: form.projectType,
      budget: form.budget.trim(),
      message: `${isEn ? "Requested features" : "Požadované funkce"}: ${form.features.length ? form.features.join(", ") : isEn ? "None" : "Žádné"}\n${isEn ? "Domain/hosting" : "Doména/hosting"}: ${form.hasDomain}`,
    };
    try {
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
      if (!anonKey) throw new Error("Missing Supabase anon key");
      const response = await fetch(SUBMIT_LEAD_FN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${anonKey}`,
        },
        body: JSON.stringify(row),
      });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      setForm(init);
      setSubmitted(true);
      setFeaturesOpen(false);
    } catch {
      setSubmitError(isEn ? "Sending failed. Please try again." : "Odeslání se nepodařilo. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ width: "100%", backgroundColor: pk.page, padding: "80px 0 100px", marginTop: "-50px", marginBottom: "-80px" }}>
      <SectionDivider />
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        <div className="cta-form-wrap" style={{ position: "relative" }}>
          <img
            src={arrowSendUrl}
            alt=""
            aria-hidden="true"
            className="cta-arrow-img"
            style={{
              position: "absolute",
              right: "18px",
              top: "18px",
              transform: "none",
              width: "180px",
              height: "auto",
              pointerEvents: "none",
              opacity: 0.98,
              zIndex: 3,
            }}
          />

          <div
            className="cta-form-shell"
            style={{
              position: "relative",
              borderRadius: "32px",
              background: pk.ctaPanel,
              padding: "44px 56px 42px",
              overflow: "hidden",
              boxShadow: `0 24px 60px ${pk.slateShadow14}`,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(ellipse 60% 70% at 50% 0%, ${pk.accent16} 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 10% 120%, ${pk.magenta14} 0%, transparent 55%)`,
                pointerEvents: "none",
                opacity: 0.9,
              }}
            />

            <div style={{ position: "relative", zIndex: 1, marginBottom: "26px", maxWidth: "760px", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
              <h2
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(26px, 3.2vw, 40px)",
                  lineHeight: 1.12,
                  margin: 0,
                  color: pk.onDark,
                }}
              >
                {isEn ? "Let’s start the consultation" : "Začněme konzultovat"}
              </h2>
              <p
                style={{
                  margin: "14px 0 0",
                  maxWidth: "720px",
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: pk.onDark72,
                }}
              >
                {isEn
                  ? "Fill in the same request fields as on the contact page and we’ll get back to you with the next steps."
                  : "Udělejte první krok k novému webu. Zabere to jen 5 minut."}
              </p>
            </div>

            {submitted ? (
              <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "34px 0 12px" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: pk.success12, border: `2px solid ${pk.success500}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                  <CheckCircle2 color={pk.success500} size={40} />
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "28px", color: pk.onDark, marginBottom: "12px" }}>
                  {isEn ? "Thank you for your request." : "Děkujeme za odeslání."}
                </h3>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "17px", color: pk.onDark72, marginBottom: "32px" }}>
                  {isEn ? "We will get back to you within 24 hours." : "Ozveme se do 24 hodin."}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  style={{ background: pk.onDarkBorder08, border: `1px solid ${pk.onDarkBorder16}`, color: pk.onDark, padding: "12px 24px", borderRadius: "12px", cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif" }}
                >
                  {isEn ? "Send another request" : "Odeslat další poptávku"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="cta-form-grid">
                  <div className="cta-form-col" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <DarkFloatingField id="cta-name" label={isEn ? "Name (required)" : "Jméno (povinné)"} value={form.name} onChange={set("name") as (v: string) => void} error={errors.name} placeholder={isEn ? "John Smith" : "Jan Novák"} />
                    <DarkFloatingField id="cta-email" label={isEn ? "Email (required)" : "E-mail (povinné)"} type="email" value={form.email} onChange={set("email") as (v: string) => void} error={errors.email} placeholder={isEn ? "john@company.com" : "jan@firma.cz"} />
                    <DarkFloatingField id="cta-type" label={isEn ? "Project type (required)" : "Typ projektu (povinné)"} isSelect options={PROJECT_OPTIONS} value={form.projectType} onChange={set("projectType") as (v: string) => void} error={errors.projectType} placeholder="" />
                    <div ref={featuresDropdownRef} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <button
                        type="button"
                        onClick={() => setFeaturesOpen((p) => !p)}
                        aria-expanded={featuresOpen}
                        aria-controls="cta-features-listbox"
                        style={{
                          background: pk.onDark06,
                          border: `1px solid ${featuresOpen ? pk.accent80 : pk.onDarkBorder12}`,
                          borderRadius: "16px",
                          minHeight: "58px",
                          padding: "12px 16px",
                          fontFamily: "'Space Grotesk',sans-serif",
                          fontWeight: 400,
                          fontSize: "16px",
                          color: pk.onDark,
                          textAlign: "left",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "12px",
                          cursor: "pointer",
                          boxShadow: featuresOpen ? `0 0 0 4px ${pk.accent12}` : "none",
                          transition: "all 250ms ease",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <span style={{ color: form.features.length ? pk.onDark : pk.onDark52 }}>
                          {form.features.length
                            ? isEn ? `${form.features.length} selected options` : `${form.features.length} vybraných možností`
                            : isEn ? "Requested features / AI tools" : "Požadované funkce / AI nástroje"}
                        </span>
                        <ChevronDown style={{ width: "18px", color: pk.onDark45, transform: featuresOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms ease" }} />
                      </button>
                      {featuresOpen ? (
                        <div
                          id="cta-features-listbox"
                          role="listbox"
                          aria-multiselectable="true"
                          style={{
                            background: pk.ctaPanelElevated,
                            border: `1px solid ${pk.onDarkBorder12}`,
                            borderRadius: "14px",
                            padding: "10px",
                            display: "grid",
                            gap: "8px",
                          }}
                        >
                          {FEATURES.map((opt) => {
                            const checked = form.features.includes(opt);
                            return (
                              <label key={opt} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px 8px", borderRadius: "10px", cursor: "pointer", background: checked ? pk.accent12 : "transparent" }}>
                                <input type="checkbox" checked={checked} onChange={() => toggleFeature(opt)} style={{ width: "16px", height: "16px", accentColor: pk.accent }} />
                                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "14px", color: pk.onDark }}>{opt}</span>
                              </label>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="cta-form-col" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <DarkFloatingField id="cta-company" label={isEn ? "Company" : "Firma"} value={form.company} onChange={set("company") as (v: string) => void} placeholder={isEn ? "Company Ltd." : "Firma s.r.o."} />
                    <DarkFloatingField id="cta-phone" label={isEn ? "Phone (required)" : "Telefon (povinné)"} type="tel" value={form.phone} onChange={set("phone") as (v: string) => void} error={errors.phone} placeholder="+420 725 703 868" />
                    <DarkFloatingField id="cta-domain" label={isEn ? "Do you have a domain / hosting? (required)" : "Máte doménu / webhosting? (povinné)"} isSelect options={DOMAIN} value={form.hasDomain} onChange={set("hasDomain") as (v: string) => void} error={errors.hasDomain} placeholder="" />
                    <DarkFloatingField id="cta-budget" label={isEn ? "Budget" : "Rozpočet"} value={form.budget} onChange={set("budget") as (v: string) => void} placeholder={isEn ? "e.g. 30 000 CZK" : "např. 30 000 Kč"} />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: pk.onDark78 }}>
                    <input
                      type="checkbox"
                      checked={form.gdprConsent}
                      onChange={(e) => set("gdprConsent")(e.target.checked)}
                      style={{ marginTop: "4px", width: "18px", height: "18px", accentColor: pk.accent }}
                      aria-invalid={!!errors.gdprConsent}
                    />
                    <span>
                      {isEn ? "I agree to the processing of personal data according to the " : "Souhlasím se zpracováním osobních údajů dle "}
                      <Link to="/zasady-ochrany-soukromi" style={{ color: pk.accent, textDecoration: "underline" }}>
                        {isEn ? "Privacy Policy" : "Zásad ochrany soukromí"}
                      </Link>.
                    </span>
                  </label>
                  {errors.gdprConsent ? <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "12px", color: pk.error300, paddingLeft: "30px" }}>{errors.gdprConsent}</span> : null}
                </div>

                {submitError ? (
                  <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "14px", color: pk.error300, margin: 0 }} role="alert">
                    {submitError}
                  </p>
                ) : null}

                <div className="contact-form-submit-wrap" style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                  <button
                    type="submit"
                    disabled={loading}
                    id="contact-form-submit"
                    className="animate-pulse-glow hero-primary-btn"
                    style={{
                      marginTop: "8px",
                      padding: "15px 32px",
                      borderRadius: "12px",
                      background: pk.gradientCtaSoft,
                      border: "none",
                      color: pk.ink,
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontWeight: 600,
                      fontSize: "16px",
                      cursor: loading ? "wait" : "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      transition: "transform 0.25s ease, filter 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (loading) return;
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.filter = "brightness(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "";
                      e.currentTarget.style.filter = "";
                    }}
                  >
                    {loading ? (isEn ? "Sending..." : "Odesílám...") : (isEn ? "Start consultation" : "Začít konzultovat")}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .cta-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }
        @media(max-width:768px){
          .cta-form-shell { padding: 28px 18px 26px !important; border-radius: 26px !important; }
          .cta-form-grid { grid-template-columns: 1fr !important; }
          .cta-arrow-img { display: none !important; }
        }
        @media(prefers-reduced-motion:reduce){
          .cta-form-shell * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </section>
  );
};
