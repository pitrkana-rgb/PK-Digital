import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext";

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(2,6,23,0.10)", overflow: "hidden" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "24px 0",
          background: "none",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 600,
            fontSize: "17px",
            color: open ? "#00E5FF" : "#070B14",
            transition: "color 250ms ease",
          }}
        >
          {q}
        </span>
        <ChevronDown
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 300ms ease",
            color: open ? "#00E5FF" : "rgba(7,11,20,0.35)",
          }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? "200px" : "0",
          opacity: open ? 1 : 0,
          transition: "all 300ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          paddingBottom: open ? "24px" : "0",
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: "15px",
          color: "rgba(7,11,20,0.64)",
          lineHeight: 1.6,
        }}
      >
        {a}
      </div>
    </div>
  );
};

export const ContactMapFaqBlock = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  return (
  <section
    style={{
      width: "100%",
      padding: "0 0 100px",
      position: "relative",
      backgroundColor: "#ffffff",
    }}
  >
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "60px",
          alignItems: "flex-start",
        }}
        className="contact-bottom-grid"
      >
        <div>
          <div
            style={{
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(2,6,23,0.10)",
              height: "400px",
              boxShadow: "0 18px 40px rgba(2,6,23,0.10)",
            }}
          >
            <iframe
              title={isEn ? "Map" : "Mapa"}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2612.981881518349!2d16.376824976939943!3d49.10609338356163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4712959828766103%3A0xc0fb13a79d029583!2zTsSbbsSNaWNlIDMyOSwgNjY0IDkxIEl2YW7EjWljZQ!5e0!3m2!1scs!2scz!4v1709030000000!5m2!1scs!2scz"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) opacity(0.7)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div>
          <h3
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 700,
              fontSize: "24px",
              color: "#070B14",
              marginBottom: "24px",
            }}
          >
            {isEn ? "Frequently Asked Questions" : "Často kladené dotazy"}
          </h3>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <FAQItem
              q={isEn ? "How fast do you reply?" : "Jak rychle odpovídáte?"}
              a={isEn ? "We guarantee a reply within 24 hours, but usually much sooner - often within a few hours." : "Garantujeme odpověď do 24 hodin, ale většinou se ozýváme mnohem dříve – často už během pár hodin."}
            />
            <FAQItem
              q={isEn ? "Is the first consultation free?" : "Je první konzultace zdarma?"}
              a={isEn ? "Yes, the first 15-30 minute consultation is completely free. We discuss your idea and see if we are a good fit." : "Ano, první 15-30minutová konzultace je zcela zdarma. Probereme váš nápad a zjistíme, zda jsme pro sebe vhodní partneři."}
            />
            <FAQItem
              q={isEn ? "Can we meet in person?" : "Můžeme se potkat osobně?"}
              a={isEn ? "Absolutely. We are based in Ivančice near Brno and can meet in our office or travel to you in South Moravia. We also work very effectively online." : "Určitě! Sídlíme v Ivančicích u Brna a rádi vás uvidíme u nás v kanceláři nebo přijedeme za vámi v rámci Jihomoravského kraje. Jinak fungujeme skvěle online."}
            />
          </div>
        </div>
      </div>
    </div>
    <style>{`
      @media (max-width: 768px) {
        .contact-bottom-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
);
};
