import { useState, type CSSProperties, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Send } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";
import {
  buildLeadPayload,
  getContactServiceOptions,
  leadFormInit,
  type LeadFormState,
} from "./contactFormConfig";
import { ContactServiceField } from "./ContactServiceField";
import { headerPrimaryCtaClassName, headerPrimaryCtaStyle } from "../../../../design/headerCtaStyle";
import { pushLeadFormSubmitSuccessToDataLayer } from "../../../../utils/gtmDataLayer";

const SUBMIT_LEAD_FN_URL = "https://hmgicymajfjsnwkctvqf.supabase.co/functions/v1/submit-lead";

const FloatingField = ({
  label, id, type = "text", value, onChange, error, placeholder, inverse = false,
}: {
  label: string; id: string; type?: string; value: string;
  onChange: (v: string) => void; error?: string; placeholder: string;
  inverse?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const labelIdle = inverse ? pk.onDark45 : pk.ink45;
  const labelColor = focused ? pk.accent : labelIdle;
  const fieldBg = inverse ? pk.panelDark : pk.slateTint03;
  const fieldBorder = inverse
    ? (focused ? pk.accent : error ? pk.errorRed50 : pk.onDarkBorder12)
    : (focused ? pk.accent : error ? pk.errorRed50 : pk.slateTint12);
  const textColor = inverse ? pk.onDark : pk.ink;

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "4px" }}>
      <label htmlFor={id} style={{
        position: "absolute", left: "16px",
        top: active ? "8px" : "50%",
        transform: active ? "translateY(0) scale(0.85)" : "translateY(-50%)",
        transformOrigin: "left",
        fontFamily: "'Montserrat',sans-serif", fontWeight: 500,
        fontSize: active ? "12px" : "15px",
        color: labelColor,
        transition: "all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        pointerEvents: "none", zIndex: 1,
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
          background: fieldBg,
          border: `1px solid ${fieldBorder}`,
          borderRadius: "16px",
          padding: active ? "28px 20px 10px" : "20px",
          fontFamily: "'Montserrat',sans-serif", fontWeight: 400, fontSize: "16px", color: textColor,
          outline: "none", width: "100%",
          boxSizing: "border-box", transition: "all 250ms ease",
          boxShadow: focused ? `0 0 0 4px ${pk.accent10}` : "none",
        }}
      />
      {error && <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12px", color: pk.error400, paddingLeft: "4px", marginTop: "2px" }}>{error}</span>}
    </div>
  );
};

const columnTitleStyle = (inverse: boolean): CSSProperties => ({
  fontFamily: "'Montserrat',sans-serif",
  fontWeight: 700,
  fontSize: "18px",
  lineHeight: 1.3,
  color: inverse ? pk.onDark : pk.ink,
  margin: "0 0 4px",
});

const fieldGroupLabelStyle = (inverse: boolean): CSSProperties => ({
  fontFamily: "'Montserrat',sans-serif",
  fontWeight: 500,
  fontSize: "15px",
  lineHeight: 1.45,
  color: inverse ? pk.onDark78 : pk.ink70,
  margin: "0 0 10px",
});

export const ContactFormBlock = (): JSX.Element => {
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

      if (!response.ok) {
        let detail = "";
        try {
          const data = await response.json();
          detail = data?.error || data?.message || "";
        } catch {
          /* ignore non-JSON response */
        }
        throw new Error(detail || `Request failed with status ${response.status}`);
      }

      // Consume success body so the fetch is fully settled before GTM fires (helps async clarity).
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
    <section id="contact" className="contact-form-page-section" style={{ width: "100%", padding: "0 0 64px", position: "relative", backgroundColor: pk.page }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: "0" }} className="contact-form-shadow-wrap">
          <div
            style={{
              background: pk.hero,
              border: `1px solid ${pk.onDarkBorder12}`,
              borderRadius: "24px",
              padding: "48px 40px",
              boxSizing: "border-box",
              boxShadow: `inset 0 1px 0 ${pk.onDarkBorder08}`,
            }}
            className="contact-form-card"
          >
            <div
              className="contact-form-intro"
              style={{
                position: "relative",
                zIndex: 1,
                marginBottom: "26px",
                maxWidth: "760px",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
              }}
            >
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
                {isEn ? "I reply within 24h" : "Odpovídám do 24h"}
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
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontFamily: "'Montserrat',sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: pk.onDark72,
                }}
              >
                {isEn
                  ? "Fill in the form and I will get back to you with the next steps."
                  : "Udělejte první krok k novému webu. Zabere to jen 5 minut."}
              </p>
            </div>

            {submitted ? (
              <div style={{
                textAlign: "center",
                padding: "32px 24px",
                background: pk.page,
                borderRadius: "16px",
                border: `1px solid ${pk.slateTint10}`,
              }}>
                <div style={{
                  width: "80px", height: "80px", borderRadius: "50%", background: pk.success10,
                  border: `2px solid ${pk.success500}`, display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px"
                }}>
                  <CheckCircle2 color={pk.success500} size={40} />
                </div>
                <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "28px", color: pk.ink, marginBottom: "12px" }}>{isEn ? "Thank you for your request." : "Děkuji za odeslání."}</h3>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "17px", color: pk.ink62, marginBottom: "32px" }}>{isEn ? "I will get back to you within 24 hours." : "Ozvu se do 24 hodin."}</p>
                <button type="button" onClick={() => setSubmitted(false)} style={{ background: pk.slateTint04, border: `1px solid ${pk.slateTint12}`, color: pk.ink, padding: "12px 24px", borderRadius: "12px", cursor: "pointer", fontFamily: "'Montserrat',sans-serif" }}>{isEn ? "Send another message" : "Odeslat další zprávu"}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="contact-form-grid">
                  <div className="contact-form-col contact-form-col--spec">
                    <h3 style={columnTitleStyle(true)}>
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
                      <label htmlFor="f-details" style={fieldGroupLabelStyle(true)}>
                        {isEn ? "Describe your project" : "Popište mi svůj požadavek"}
                      </label>
                      <textarea
                        id="f-details"
                        className="contact-details-field"
                        value={form.projectDetails}
                        onChange={(e) => set("projectDetails")(e.target.value)}
                        rows={5}
                        placeholder={isEn ? "Tell me about your goals, scope, and timeline…" : "Napište mi o cílech, rozsahu a termínu…"}
                        style={{
                          width: "100%",
                          resize: "vertical",
                          background: pk.panelDark,
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
                        }}
                      />
                    </div>
                  </div>

                  <div className="contact-form-col contact-form-col--contact">
                    <h3 style={columnTitleStyle(true)}>
                      {isEn ? "2. Contact details" : "2. Kontaktní údaje"}
                    </h3>
                    <FloatingField
                      inverse
                      id="f-name"
                      label={isEn ? "Name / Company name (required)" : "Jméno / Název společnosti (povinné)"}
                      value={form.name}
                      onChange={set("name") as (v: string) => void}
                      error={errors.name}
                      placeholder={isEn ? "John Smith / Company Ltd." : "Jan Novák / Firma s.r.o."}
                    />
                    <FloatingField
                      inverse
                      id="f-email"
                      label={isEn ? "Email (required)" : "E-mail (povinné)"}
                      type="email"
                      value={form.email}
                      onChange={set("email") as (v: string) => void}
                      error={errors.email}
                      placeholder={isEn ? "john@company.com" : "jan@firma.cz"}
                    />
                    <FloatingField
                      inverse
                      id="f-phone"
                      label={isEn ? "Phone (optional)" : "Telefon (nepovinné)"}
                      type="tel"
                      value={form.phone}
                      onChange={set("phone") as (v: string) => void}
                      placeholder="+420 725 703 868"
                    />
                    <FloatingField
                      inverse
                      id="f-address"
                      label={isEn ? "Address (optional)" : "Adresa (nepovinné)"}
                      value={form.address}
                      onChange={set("address") as (v: string) => void}
                      placeholder={isEn ? "Street, city" : "Ulice, město"}
                    />

                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "4px" }}>
                      <p style={{ ...fieldGroupLabelStyle(true), marginBottom: "6px" }}>
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
                          <Link to="/zasady-ochrany-soukromi" style={{ color: pk.accent, textDecoration: "underline" }}>{isEn ? "Privacy Policy" : "Zásad ochrany soukromí"}</Link>.
                        </span>
                      </label>
                      {errors.gdprConsent && (
                        <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12px", color: pk.error400, paddingLeft: "30px" }}>{errors.gdprConsent}</span>
                      )}
                    </div>

                    {submitError && (
                      <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "14px", color: pk.error400, margin: 0 }} role="alert">
                        {submitError}
                      </p>
                    )}

                    <div className="contact-form-submit-wrap flex w-full justify-center md:justify-end">
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
                          maxWidth: "100%",
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
                        {loading ? (isEn ? "Sending..." : "Odesílám...") : <><Send size={20} /> {isEn ? "Send request" : "Odeslat poptávku"}</>}
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
          border-radius: 28px;
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
        .contact-form-grid {
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
          .contact-form-grid {
            grid-template-columns: 1fr !important;
            gap: 28px;
          }
          .contact-form-col:first-child { order: 1; }
          .contact-form-col:last-child  { order: 2; }
          .contact-form-card { padding: 28px 16px !important; }
          .contact-form-col--spec .contact-details-block {
            flex: none;
          }
          .contact-form-col--spec .contact-details-field {
            min-height: 120px;
            height: auto;
          }
          .contact-form-submit-wrap {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
};
