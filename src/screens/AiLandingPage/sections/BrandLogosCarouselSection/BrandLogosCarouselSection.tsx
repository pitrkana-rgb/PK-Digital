import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";

const BENEFIT_POINTS_CS = [
  "Prototyp zdarma do 3 dnů",
  "Moderní design na míru",
  "SEO optimalizace",
  "Rychlé načítání webu",
  "Mobile-first řešení",
  "Vyšší důvěra zákazníků",
] as const;

const BENEFIT_POINTS_EN = [
  "Free prototype within 3 days",
  "Tailored modern design",
  "SEO optimization",
  "Fast page load",
  "Mobile-first approach",
  "Stronger customer trust",
] as const;

export const BrandLogosCarouselSection = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const points = isEn ? BENEFIT_POINTS_EN : BENEFIT_POINTS_CS;
  const groups = Array.from({ length: 4 }, (_, idx) => `${idx}`);

  return (
    <section
      aria-label={isEn ? "Key benefits" : "Hlavní přínosy"}
      style={{
        width: "100%",
        background: pk.bandMuted,
        padding: "12px 0",
        overflow: "hidden",
        position: "relative",
        zIndex: 4,
      }}
    >
      <div className="brand-logo-marquee">
        {groups.map((group) => (
          <div key={group} className="brand-logo-group" aria-hidden={group !== "0" && group !== "1"}>
            {points.map((label) => (
              <div key={`${group}-${label}`} className="brand-benefit-chip">
                <span className="brand-benefit-check" aria-hidden="true">
                  ✓
                </span>
                <span className="brand-benefit-text">{label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        .brand-logo-marquee{
          display:flex;
          align-items:center;
          width:max-content;
          will-change: transform;
          animation: brandLogoMarquee 40s linear infinite;
        }
        .brand-logo-group{
          display:flex;
          align-items:center;
          gap: 36px;
          flex: 0 0 auto;
          padding-right: 36px;
        }
        .brand-benefit-chip{
          flex: 0 0 auto;
          display:inline-flex;
          align-items:center;
          gap: 10px;
          white-space: nowrap;
          font-family: "Montserrat", sans-serif;
          font-weight: 600;
          font-size: clamp(14.4px, 1.38vw, 18px);
          letter-spacing: 0.02em;
          line-height: 1.25;
          color: var(--pk-ink-82);
        }
        .brand-benefit-check{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          width: 1.15em;
          height: 1.15em;
          font-size: 0.95em;
          font-weight: 800;
          color: var(--pk-ink);
          flex-shrink: 0;
        }
        .brand-benefit-text{
          padding-top: 1px;
        }
        @keyframes brandLogoMarquee{
          from{ transform: translateX(0); }
          to{ transform: translateX(calc(-50% - 18px)); }
        }
        @media (max-width: 768px){
          .brand-logo-group{
            gap: 24px;
            padding-right: 24px;
          }
          .brand-benefit-chip{
            font-size: clamp(13.2px, 3.48vw, 15.6px);
            gap: 8px;
          }
        }
        @media (prefers-reduced-motion: reduce){
          .brand-logo-marquee{ animation: none !important; }
        }
      `}</style>
    </section>
  );
};
