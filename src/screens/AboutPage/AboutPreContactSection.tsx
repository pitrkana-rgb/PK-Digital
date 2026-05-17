import { Mail, Phone } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { pk } from "../../design/pkLandingColors";

const PHONE_DISPLAY = "+420 725 703 868";
const PHONE_HREF = "tel:+420725703868";
const EMAIL_DISPLAY = "info@pk-digital.cz";
const EMAIL_HREF = "mailto:info@pk-digital.cz";

const CONTACT_ICON_PX = Math.round(28 * 1.3);

export const AboutPreContactSection = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";

  const t = isEn
    ? {
        phoneHours: "Mon–Sun 8:00–18:00",
        emailNote: "I reply within 24 hours",
      }
    : {
        phoneHours: "Po–Ne 8.00–18.00",
        emailNote: "Odpovídám do 24 hodin",
      };

  return (
    <section className="about-pre-contact" aria-label={isEn ? "Contact details" : "Kontaktní údaje"}>
      <div className="about-pre-contact-shell">
        <div className="about-pre-contact-grid">
          <a href={PHONE_HREF} className="about-pre-contact-card">
            <span className="about-pre-contact-icon-wrap" aria-hidden>
              <Phone size={CONTACT_ICON_PX} strokeWidth={2} color={pk.brand4} />
            </span>
            <span className="about-pre-contact-body">
              <span className="about-pre-contact-value">{PHONE_DISPLAY}</span>
              <span className="about-pre-contact-meta">{t.phoneHours}</span>
            </span>
          </a>

          <a href={EMAIL_HREF} className="about-pre-contact-card">
            <span className="about-pre-contact-icon-wrap" aria-hidden>
              <Mail size={CONTACT_ICON_PX} strokeWidth={2} color={pk.brand4} />
            </span>
            <span className="about-pre-contact-body">
              <span className="about-pre-contact-value">{EMAIL_DISPLAY}</span>
              <span className="about-pre-contact-meta">{t.emailNote}</span>
            </span>
          </a>
        </div>
      </div>

      <style>{`
        .about-pre-contact {
          padding: 0 0 40px;
          background: ${pk.page};
          overflow: visible;
        }
        .about-pre-contact-shell {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          box-sizing: border-box;
          overflow: visible;
        }
        .about-pre-contact-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          overflow: visible;
        }
        .about-pre-contact-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 28px 32px;
          border-radius: 20px;
          background: ${pk.page};
          border: 1px solid ${pk.slateBorder};
          box-shadow:
            0 2px 8px rgb(2 6 23 / 0.04),
            0 16px 40px rgb(2 6 23 / 0.07);
          text-decoration: none;
          color: inherit;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .about-pre-contact-card:hover {
          transform: translateY(-3px);
          border-color: ${pk.slateBorderStrong};
          box-shadow:
            0 4px 12px rgb(2 6 23 / 0.06),
            0 22px 48px rgb(2 6 23 / 0.1);
        }
        .about-pre-contact-card:focus-visible {
          outline: 2px solid ${pk.accent};
          outline-offset: 3px;
        }
        .about-pre-contact-icon-wrap {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 0;
        }
        .about-pre-contact-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }
        .about-pre-contact-value {
          font-family: "Montserrat", sans-serif;
          font-weight: 600;
          font-size: clamp(20px, 2.2vw, 24px);
          line-height: 1.25;
          letter-spacing: -0.01em;
          color: ${pk.ink};
        }
        .about-pre-contact-meta {
          font-family: "Montserrat", sans-serif;
          font-weight: 500;
          font-size: 15px;
          line-height: 1.45;
          color: ${pk.ink68};
        }

        @media (min-width: 721px) {
          .about-pre-contact {
            padding-bottom: 6px;
          }
          .about-pre-contact-grid {
            padding-top: 8px;
          }
        }

        @media (max-width: 720px) {
          .about-pre-contact {
            margin-top: 0;
            padding-top: 6px;
            padding-bottom: 20px;
            overflow: visible;
          }
          .about-pre-contact-shell {
            padding: 0 20px;
            overflow: visible;
          }
          .about-pre-contact-grid {
            grid-template-columns: 1fr;
            padding-top: 12px;
            overflow: visible;
          }
          .about-pre-contact-card {
            padding: 22px 24px;
          }
          .about-pre-contact-card:hover {
            transform: none;
            border-color: ${pk.slateBorder};
            box-shadow:
              0 2px 8px rgb(2 6 23 / 0.04),
              0 16px 40px rgb(2 6 23 / 0.07);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-pre-contact-card {
            transition: none !important;
          }
          .about-pre-contact-card:hover {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};
