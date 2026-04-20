import reactLogo from "../../../../../Images/technology_list/React.png";
import vueLogo from "../../../../../Images/technology_list/Vue.png";
import angularLogo from "../../../../../Images/technology_list/Angular.png";
import nextLogo from "../../../../../Images/technology_list/Next.png";
import nuxtLogo from "../../../../../Images/technology_list/Nuxt.png";
import expressLogo from "../../../../../Images/technology_list/Express.png";
import tailwindLogo from "../../../../../Images/technology_list/Tailwind.png";
import { pk } from "../../../../design/pkLandingColors";

const logos = [
  { src: reactLogo, alt: "React" },
  { src: vueLogo, alt: "Vue" },
  { src: angularLogo, alt: "Angular" },
  { src: nextLogo, alt: "Next.js" },
  { src: nuxtLogo, alt: "Nuxt" },
  { src: expressLogo, alt: "Express" },
  { src: tailwindLogo, alt: "Tailwind CSS" },
];

export const BrandLogosCarouselSection = (): JSX.Element => {
  const groups = Array.from({ length: 4 }, (_, idx) => `${idx}`);

  return (
    <section
      aria-label="Technology logos"
      style={{
        width: "100%",
        background: pk.bandMuted,
        padding: "15px 0",
        overflow: "hidden",
        position: "relative",
        zIndex: 4,
      }}
    >
      <div className="brand-logo-marquee">
        {groups.map((group) => (
          <div key={group} className="brand-logo-group" aria-hidden={group !== "0" && group !== "1"}>
            {logos.map((logo) => (
              <div key={`${group}-${logo.alt}`} className="brand-logo-item">
                <img src={logo.src} alt={logo.alt} className="brand-logo-image" />
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
          animation: brandLogoMarquee 31.2s linear infinite;
        }
        .brand-logo-group{
          display:flex;
          align-items:center;
          gap:48px;
          flex: 0 0 auto;
          padding-right: 48px;
        }
        .brand-logo-item{
          flex: 0 0 auto;
          display:flex;
          align-items:center;
          justify-content:center;
          opacity: 0.98;
          transition: opacity 220ms ease, transform 220ms ease;
        }
        .brand-logo-item:hover{
          opacity: 1;
          transform: translateY(-1px);
        }
        .brand-logo-image{
          display:block;
          height: 41px;
          width: auto;
          object-fit: contain;
        }
        @keyframes brandLogoMarquee{
          from{ transform: translateX(0); }
          to{ transform: translateX(calc(-50% - 24px)); }
        }
        @media (max-width: 768px){
          .brand-logo-group{
            gap: 32px;
            padding-right: 32px;
          }
          .brand-logo-image{ height: 34px; }
        }
        @media (prefers-reduced-motion: reduce){
          .brand-logo-marquee{ animation: none !important; }
        }
      `}</style>
    </section>
  );
};
