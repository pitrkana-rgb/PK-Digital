import { useNavigate, useLocation } from "react-router-dom";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "lucide-react";

const navLinks = [
  { label: "Domů", id: "hero", path: "/" },
  { label: "Služby", id: "pricing", path: "/" },
  { label: "O nás", id: "", path: "/o-nas" },
  { label: "FAQ", id: "faq", path: "/" },
  { label: "Kontakt", id: "contact", path: "/kontakt" },
];

export const SiteFooterSection = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (location.pathname === link.path && link.path === "/") {
      document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(link.path);
      if (link.path === "/") {
        setTimeout(() => {
          document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  };

  return (
    <footer style={{ width: "100%", backgroundColor: "#000", position: "relative", overflow: "hidden" }}>
      {/* Orange gradient top border */}
      <div style={{ height: "1px", background: "linear-gradient(90deg,transparent 0%,#00E5FF 40%,rgba(0,229,255,0.25) 70%,transparent 100%)" }} />

      <div className="footer-wrapper" style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px 40px" }}>
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
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: 0 }}>
              Navrhujeme moderní weby, automatizujeme procesy a stavíme AI agenty pro váš tým.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: "12px" }}>
              {[{ Icon: TwitterIcon, label: "Twitter" }, { Icon: LinkedinIcon, label: "LinkedIn" }, { Icon: GithubIcon, label: "GitHub" }].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} style={{
                  width: "36px", height: "36px", borderRadius: "8px",
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 200ms ease, border-color 200ms ease",
                  color: "rgba(255,255,255,0.6)",
                }}
                  onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.background = "rgba(0,229,255,0.12)"; a.style.borderColor = "rgba(0,229,255,0.3)"; a.style.color = "#00E5FF"; }}
                  onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.background = "rgba(255,255,255,0.06)"; a.style.borderColor = "rgba(255,255,255,0.08)"; a.style.color = "rgba(255,255,255,0.6)"; }}
                >
                  <Icon style={{ width: "16px", height: "16px" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav + Contact — wrapped for mobile 2-column row */}
          <div className="footer-columns" style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>

            {/* Nav links */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "13px", letterSpacing: "0.08em", color: "#00E5FF", textTransform: "uppercase" as const, marginBottom: "4px" }}>Navigace</span>
              {navLinks.map(link => (
                <button key={link.id} type="button" onClick={() => handleNavClick(link)}
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
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "13px", letterSpacing: "0.08em", color: "#00E5FF", textTransform: "uppercase" as const, marginBottom: "4px" }}>Kontakt</span>
              <button type="button" onClick={() => navigate("/kontakt")}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", color: "rgba(255,255,255,0.6)", textAlign: "left", transition: "color 200ms ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)"; }}
              >
                Napište nám
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "14px", color: "rgba(255,255,255,0.35)", margin: 0 }}>
            © 2025 AI-agency. Všechna práva vyhrazena.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Zásady ochrany soukromí", "Podmínky užití"].map(t => (
              <a key={t} href="#" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 200ms ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)"; }}
              >{t}</a>
            ))}
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
