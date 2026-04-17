import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../../../i18n/LanguageContext";

export const SiteFooterSection = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();

  const t = language === "en" ? {
    home: "Home",
    services: "Services",
    faq: "FAQ",
    contact: "Contact",
    footerDesc: "We design modern websites, automate processes, and build AI agents for your team.",
    nav: "Navigation",
    contactTitle: "Contact",
    writeUs: "Contact us",
    rights: "© 2025 PK-Digital. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
  } : {
    home: "Domů",
    services: "Služby",
    faq: "FAQ",
    contact: "Kontakt",
    footerDesc: "Navrhujeme moderní weby, automatizujeme procesy a stavíme AI agenty pro váš tým.",
    nav: "Navigace",
    contactTitle: "Kontakt",
    writeUs: "Napište nám",
    rights: "© 2025 PK-Digital. Všechna práva vyhrazena.",
    privacy: "Zásady ochrany soukromí",
    terms: "Podmínky užití",
  };

  const navLinks = [
    { label: t.home, id: "hero", path: "/" },
    { label: t.services, id: "pricing", path: "/" },
    { label: t.faq, id: "faq", path: "/" },
    { label: t.contact, id: undefined, path: "/kontakt" },
  ] as const;

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.path === "/kontakt") {
      if (location.pathname !== "/kontakt") {
        navigate("/kontakt");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    if (location.pathname === link.path && link.path === "/" && link.id) {
      document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(link.path);
      if (link.path === "/" && link.id) {
        setTimeout(() => {
          document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  };

  return (
    <footer style={{ width: "100%", backgroundColor: "#000000", position: "relative", overflow: "hidden" }}>
      {/* Orange gradient top border */}
      <div style={{ height: "1px", background: "linear-gradient(90deg,transparent 0%,#00E5FF 40%,rgba(0,229,255,0.25) 70%,transparent 100%)" }} />

      <div className="footer-wrapper" style={{ maxWidth: "1400px", margin: "0 auto", padding: "56px 24px 40px" }}>
        <div className="footer-top" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "48px", flexWrap: "wrap", marginBottom: "48px" }}>

          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "300px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src="/Company_logo_V2.png"
                alt="PK Digital logo"
                style={{ height: "40px", width: "auto", display: "block" }}
              />
            </div>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: 0 }}>
              {t.footerDesc}
            </p>
          </div>

          {/* Nav + Contact — wrapped for mobile 2-column row */}
          <div className="footer-columns" style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>

            {/* Nav links */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "13px", letterSpacing: "0.08em", color: "#00E5FF", textTransform: "uppercase" as const, marginBottom: "4px" }}>{t.nav}</span>
              {navLinks.map(link => (
                <button key={`${link.path}-${link.label}`} type="button" onClick={() => handleNavClick(link)}
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", color: "rgba(255,255,255,0.6)", textAlign: "left", transition: "color 200ms ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)"; }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Contact */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "13px", letterSpacing: "0.08em", color: "#00E5FF", textTransform: "uppercase" as const, marginBottom: "4px" }}>{t.contactTitle}</span>
              <button type="button" onClick={() => navigate("/napiste-nam")}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", color: "rgba(255,255,255,0.6)", textAlign: "left", transition: "color 200ms ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)"; }}
              >
                {t.writeUs}
              </button>
              <a
                href="tel:+420725703868"
                style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", color: "rgba(255,255,255,0.6)", textAlign: "left", textDecoration: "none", transition: "color 200ms ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)"; }}
              >
                +420 725 703 868
              </a>
              <a
                href="mailto:info@pk-digital.cz"
                style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", color: "rgba(255,255,255,0.6)", textAlign: "left", textDecoration: "none", transition: "color 200ms ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)"; }}
              >
                info@pk-digital.cz
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "14px", color: "rgba(255,255,255,0.35)", margin: 0 }}>
            {t.rights}
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            <button type="button" onClick={() => navigate("/zasady-ochrany-soukromi")}
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 200ms ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.35)"; }}
            >{t.privacy}</button>
            <button type="button" onClick={() => navigate("/podminky-uziti")}
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 200ms ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.35)"; }}
            >{t.terms}</button>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){
          .footer-wrapper { padding: 40px 20px 28px !important; }
          .footer-top {
            flex-direction: column !important;
            gap: 32px !important;
            margin-bottom: 32px !important;
          }
          /* Brand block: full width on top */
          .footer-top > div:first-child {
            max-width: 100% !important;
            width: 100% !important;
          }
          /* Nav + Contact side by side */
          .footer-top > nav,
          .footer-top > div:last-child {
            flex: 1 1 0 !important;
          }
          /* Wrap only nav+contact into a row */
          .footer-columns {
            display: flex !important;
            flex-direction: row !important;
            gap: 32px !important;
            width: 100% !important;
          }
          /* Bottom bar: stacked */
          .footer-bottom {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 12px !important;
          }
          .footer-logo { height: 32px !important; }
        }
      `}</style>

    </footer>
  );
};
