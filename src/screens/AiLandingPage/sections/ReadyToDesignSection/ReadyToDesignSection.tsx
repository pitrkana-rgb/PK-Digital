import { useState, type CSSProperties, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { SectionDivider } from "../../components/SectionDivider";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";
import arrowSendUrl from "../../../../../Images/arrow_send.png";
import {
  buildLeadPayload,
  getContactServiceOptions,
  leadFormInit,
  type LeadFormState,
} from "../ContactSection/contactFormConfig";
import { ContactServiceField } from "../ContactSection/ContactServiceField";
import { headerPrimaryCtaClassName, headerPrimaryCtaStyle } from "../../../../design/headerCtaStyle";
import { pushLeadFormSubmitSuccessToDataLayer } from "../../../../utils/gtmDataLayer";

const SUBMIT_LEAD_FN_URL = "https://hmgicymajfjsnwkctvqf.supabase.co/functions/v1/submit-lead";

const DarkFloatingField = ({
  label, id, type = "text", value, onChange, error, placeholder,
}: {
  label: string; id: string; type?: string; value: string;
  onChange: (v: string) => void; error?: string; placeholder: string;
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const sharedStyle = {
    background: pk.onDark06,
    border: `1px solid ${focused ? pk.accent80 : error ? pk.errorRed75 : pk.onDarkBorder12}`,
    borderRadius: "16px",
    fontFamily: "'Montserrat',sans-serif",
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
        fontFamily: "'Montserrat',sans-serif",
        fontWeight: 500,
        fontSize: active ? "12px" : "15px",
        color: focused ? pk.accent : pk.onDark52,
        transition: "all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        pointerEvents: "none",
        zIndex: 1,
      }}>
        {label}
      </label>
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
      {error ? <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12px", color: pk.error300, paddingLeft: "4px", marginTop: "2px" }}>{error}</span> : null}
    </div>
  );
};

const columnTitleStyle: CSSProperties = {
  fontFamily: "'Montserrat',sans-serif",
  fontWeight: 700,
  fontSize: "18px",
  lineHeight: 1.3,
  color: pk.onDark,
  margin: "0 0 4px",
};

const fieldGroupLabelStyle: CSSProperties = {
  fontFamily: "'Montserrat',sans-serif",
  fontWeight: 500,
  fontSize: "15px",
  lineHeight: 1.45,
  color: pk.onDark78,
  margin: "0 0 10px",
};

export const ReadyToDesignSection = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const serviceOptions = getContactServiceOptions(isEn);
  const [form, setForm] = useState<LeadFormState>(leadFormInit);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = (f: keyof LeadFormState) => (v: string | boolean) => {
    setForm((p) => ({ ...p, [f]: v }));
    if (errors[f]) setErrors((p) => ({ ...p, [f]: undefined }));
    if (submitError) setSubmitError(null);
  };

  const toggleService = (service: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
    if (errors.services) setErrors((p) => ({ ...p, services: undefined }));
    if (submitError) setSubmitError(null);
  };

  const validate = () => {
    const e: Partial<Record<keyof LeadFormState, string>> = {};
    if (!form.name.trim()) e.name = isEn ? "Enter name or company" : "Zadejte jméno nebo název společnosti";
    if (!form.email.trim()) e.email = isEn ? "Enter email" : "Zadejte e-mail";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = isEn ? "Invalid email" : "Neplatný e-mail";
    if (form.services.length === 0) e.services = isEn ? "Select at least one service" : "Vyberte alespoň jednu službu";
    if (!form.gdprConsent) e.gdprConsent = isEn ? "Consent is required to submit the form." : "Pro odeslání je nutný souhlas se zpracováním osobních údajů.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSubmitError(null);
    try {
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
      if (!anonKey) throw new Error("Missing Supabase anon key");
      const response = await fetch(SUBMIT_LEAD_FN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${anonKey}`,
        },
        body: JSON.stringify(buildLeadPayload(form, isEn)),
      });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

      await response.text().catch(() => "");

      // GTM: AFTER ok response + body drained — Custom Event trigger `lead_form_submit` (Preview → Summary → dataLayer pushes).
      pushLeadFormSubmitSuccessToDataLayer();

      setForm(leadFormInit);
      setSubmitted(true);
    } catch {
      setSubmitError(isEn ? "Sending failed. Please try again." : "Odeslání se nepodařilo. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="kontakt" className="landing-scroll-target" style={{ width: "100%", backgroundColor: pk.page, padding: "80px 0 100px", marginTop: "-50px", marginBottom: "-80px" }}>
      <SectionDivider />
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        <div className="cta-form-wrap contact-form-shadow-wrap" style={{ position: "relative" }}>
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
              <p
                style={{
                  margin: "0 0 10px",
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  lineHeight: 1.4,
                  letterSpacing: "0.04em",
                  color: pk.onDark88,
                }}
              >
                {isEn ? "We reply within 24h" : "Odpovídáme do 24h"}
              </p>
              <h2
                style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(26px, 3.2vw, 40px)",
                  lineHeight: 1.12,
                  margin: 0,
                  color: pk.onDark,
                }}
              >
                {isEn ? "Non-binding inquiry" : "Nezávazná poptávka"}
              </h2>
              <p
                style={{
                  margin: "14px 0 0",
                  maxWidth: "720px",
                  fontFamily: "'Montserrat',sans-serif",
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
                <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "28px", color: pk.onDark, marginBottom: "12px" }}>
                  {isEn ? "Thank you for your request." : "Děkujeme za odeslání."}
                </h3>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "17px", color: pk.onDark72, marginBottom: "32px" }}>
                  {isEn ? "We will get back to you within 24 hours." : "Ozveme se do 24 hodin."}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  style={{ background: pk.onDarkBorder08, border: `1px solid ${pk.onDarkBorder16}`, color: pk.onDark, padding: "12px 24px", borderRadius: "12px", cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}
                >
                  {isEn ? "Send another request" : "Odeslat další poptávku"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="cta-form-grid">
                  <div className="cta-form-col contact-form-col--spec">
                    <h3 style={columnTitleStyle}>
                      {isEn ? "1. Project specification" : "1. Specifikace projektu"}
                    </h3>
                    <ContactServiceField
                      isEn={isEn}
                      options={serviceOptions}
                      selected={form.services}
                      onToggle={toggleService}
                      error={errors.services}
                      inverse
                    />

                    <div className="contact-details-block">
                      <label htmlFor="cta-details" style={fieldGroupLabelStyle}>
                        {isEn ? "Describe your project" : "Popište nám svůj požadavek"}
                      </label>
                      <textarea
                        id="cta-details"
                        className="contact-details-field"
                        value={form.projectDetails}
                        onChange={(e) => set("projectDetails")(e.target.value)}
                        rows={5}
                        placeholder={isEn ? "Tell us about your goals, scope, and timeline…" : "Napište nám o cílech, rozsahu a termínu…"}
                        style={{
                          width: "100%",
                          resize: "vertical",
                          background: pk.onDark06,
                          border: `1px solid ${pk.onDarkBorder12}`,
                          borderRadius: "16px",
                          padding: "16px 18px",
                          fontFamily: "'Montserrat',sans-serif",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: 1.55,
                          color: pk.onDark,
                          outline: "none",
                          boxSizing: "border-box",
                          backdropFilter: "blur(10px)",
                        }}
                      />
                    </div>
                  </div>

                  <div className="cta-form-col contact-form-col--contact">
                    <h3 style={columnTitleStyle}>
                      {isEn ? "2. Contact details" : "2. Kontaktní údaje"}
                    </h3>
                    <DarkFloatingField
                      id="cta-name"
                      label={isEn ? "Name / Company name (required)" : "Jméno / Název společnosti (povinné)"}
                      value={form.name}
                      onChange={set("name") as (v: string) => void}
                      error={errors.name}
                      placeholder={isEn ? "John Smith / Company Ltd." : "Jan Novák / Firma s.r.o."}
                    />
                    <DarkFloatingField
                      id="cta-email"
                      label={isEn ? "Email (required)" : "E-mail (povinné)"}
                      type="email"
                      value={form.email}
                      onChange={set("email") as (v: string) => void}
                      error={errors.email}
                      placeholder={isEn ? "john@company.com" : "jan@firma.cz"}
                    />
                    <DarkFloatingField
                      id="cta-phone"
                      label={isEn ? "Phone (optional)" : "Telefon (nepovinné)"}
                      type="tel"
                      value={form.phone}
                      onChange={set("phone") as (v: string) => void}
                      placeholder="+420 725 703 868"
                    />
                    <DarkFloatingField
                      id="cta-address"
                      label={isEn ? "Address (optional)" : "Adresa (nepovinné)"}
                      value={form.address}
                      onChange={set("address") as (v: string) => void}
                      placeholder={isEn ? "Street, city" : "Ulice, město"}
                    />

                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "4px" }}>
                      <p style={{ ...fieldGroupLabelStyle, marginBottom: "6px" }}>
                        {isEn ? "Personal data processing *" : "Zpracování osobních údajů *"}
                      </p>
                      <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", fontFamily: "'Montserrat',sans-serif", fontSize: "15px", color: pk.onDark78 }}>
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
                      {errors.gdprConsent ? <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12px", color: pk.error300, paddingLeft: "30px" }}>{errors.gdprConsent}</span> : null}
                    </div>

                    {submitError ? (
                      <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "14px", color: pk.error300, margin: 0 }} role="alert">
                        {submitError}
                      </p>
                    ) : null}

                    <div className="contact-form-submit-wrap" style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                      <button
                        type="submit"
                        disabled={loading}
                        id="contact-form-submit"
                        className={headerPrimaryCtaClassName}
                        style={{
                          ...headerPrimaryCtaStyle,
                          marginTop: "4px",
                          cursor: loading ? "wait" : "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                          width: "100%",
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
                  </div>
                </div>

              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .contact-form-shadow-wrap {
          border-radius: 32px;
          box-shadow:
            0 2px 6px rgba(2, 6, 23, 0.05),
            0 14px 36px rgba(2, 6, 23, 0.09),
            0 36px 72px rgba(2, 6, 23, 0.12);
        }
        .contact-form-col--spec,
        .contact-form-col--contact {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .cta-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: stretch;
        }
        @media (min-width: 769px) {
          .contact-form-col--spec {
            min-height: 100%;
          }
          .contact-details-block {
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            gap: 8px;
            min-height: 0;
          }
          .contact-details-field {
            flex: 1 1 auto;
            min-height: 120px;
            height: 100%;
          }
        }
        @media (max-width: 768px) {
          .contact-details-field {
            min-height: 140px;
          }
        }
        @media (max-width: 768px) {
          .contact-form-col--spec .contact-details-block { flex: none; }
          .contact-form-col--spec .contact-details-field { min-height: 120px; height: auto; }
          .cta-form-shell { padding: 28px 18px 26px !important; border-radius: 26px !important; }
          .cta-form-grid { grid-template-columns: 1fr !important; gap: 28px; }
          .cta-arrow-img { display: none !important; }
        }
        @media(prefers-reduced-motion:reduce){
          .cta-form-shell * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </section>
  );
};
