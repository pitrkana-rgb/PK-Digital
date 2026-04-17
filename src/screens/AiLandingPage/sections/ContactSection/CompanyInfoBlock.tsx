import {
  Phone, MapPin, Building2, FileText, Mail, Landmark, Inbox,
} from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext";

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

export const CompanyInfoBlock = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const items = isEn
    ? [
      { icon: Building2, label: "Company name", text: "PK-Digital" },
      { icon: MapPin, label: "Address", text: "Němčice 329, Ivančice 664 91" },
      { icon: Phone, label: "Phone", text: "+420 725 703 868" },
      { icon: Mail, label: "Email", text: "info@pk-digital.cz" },
      { icon: FileText, label: "Company ID", text: "21185301" },
      { icon: Inbox, label: "Data box", text: "f4i6cbb" },
      { icon: Landmark, label: "Bank account", text: "1025290491/5500" },
      { icon: Landmark, label: "IBAN", text: "CZ60 5500 0000 0010 2529 0491" },
    ]
    : companyInfoOrdered;
  return (
  <section
    style={{
      width: "100%",
      padding: "0 0 64px",
      position: "relative",
      backgroundColor: "#ffffff",
    }}
  >
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
      <h2
        id="company-info"
        style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 700,
          fontSize: "clamp(22px, 2.5vw, 28px)",
          color: "#070B14",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        {isEn ? "Company Information" : "Firemní údaje"}
      </h2>
      <div
        style={{
          background: "#ffffff",
          border: "1px solid rgba(2,6,23,0.10)",
          borderRadius: "20px",
          padding: "32px 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "repeat(4, auto)",
            gridAutoFlow: "column",
            gap: "24px 32px",
          }}
          className="company-info-grid"
        >
          {items.map(({ icon: Icon, label, text }) => (
            <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(2,6,23,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#070B14",
                  flexShrink: 0,
                }}
              >
                <Icon size={20} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: "11px",
                    color: "rgba(7,11,20,0.55)",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    marginBottom: "4px",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: "14px",
                    color: "#070B14",
                    lineHeight: 1.45,
                  }}
                >
                  {text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <style>{`
      @media (max-width: 768px) {
        .company-info-grid {
          grid-template-columns: 1fr !important;
          grid-auto-flow: row !important;
          grid-template-rows: unset !important;
        }
      }
    `}</style>
  </section>
);
};
