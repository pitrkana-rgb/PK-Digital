import { useEffect, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { pk } from "../../design/pkLandingColors";
import founderV3Url from "../../../Images/Founder_V3.png";

const HERO_MIN_HEIGHT = "max(70vh, 644px)";
const HEADER_BOTTOM_OFFSET_PX = 90;
const IconChat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconRocket = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-5c1.62-2.03 5-2 5-2" />
    <path d="M12 15v5s3.03-.55 5-2c2.03-1.62 2-5 2-5" />
  </svg>
);
const IconBadge = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);
const IconSpark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
);

const perksCs = [
  { Icon: IconChat, title: "Přímá komunikace", sub: "bez prostředníků" },
  { Icon: IconRocket, title: "Rychlé dodání", sub: "bez zbytečných průtahů" },
  { Icon: IconBadge, title: "10+ let zkušeností", sub: "s daty a technologiemi" },
  { Icon: IconSpark, title: "Moderní AI workflow", sub: "pro lepší výsledky" },
] as const;

const perksEn = [
  { Icon: IconChat, title: "Direct communication", sub: "no middlemen" },
  { Icon: IconRocket, title: "Fast delivery", sub: "without unnecessary delays" },
  { Icon: IconBadge, title: "10+ years of experience", sub: "with data and technology" },
  { Icon: IconSpark, title: "Modern AI workflow", sub: "for better results" },
] as const;

const useHeroBackgroundReady = (src: string) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    const finish = () => setReady(true);
    img.onload = finish;
    img.onerror = finish;
    img.src = src;
    if (img.complete) finish();
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return ready;
};

export const AboutMeHeroSection = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const perks = isEn ? perksEn : perksCs;
  const bgReady = useHeroBackgroundReady(founderV3Url);

  const t = isEn
    ? {
        eyebrow: "ABOUT ME",
        line1: "I am not an agency.",
        line2a: "On your project you work",
        line2b: "directly with me.",
        sub: "That means fast communication, a simple process, and a website that truly fits your business needs.",
        imgAlt: "Petr Kana – founder of PK-Digital",
      }
    : {
        eyebrow: "O MNĚ",
        line1: "Nejsem agentura.",
        line2a: "Na projektu pracujete",
        line2b: "přímo se mnou.",
        sub: "Díky tomu je komunikace rychlá, proces jednoduchý a výsledný web odpovídá skutečným potřebám vašeho podnikání.",
        imgAlt: "Petr Kaňa – zakladatel PK-Digital",
      };

  return (
    <section className="about-hero" aria-labelledby="about-hero-heading">
      <div
        className={`about-hero-bg${bgReady ? " is-loaded" : ""}`}
        role="img"
        aria-label={t.imgAlt}
        style={{ backgroundImage: `url(${founderV3Url})` }}
      />
      <div className={`about-hero-fade${bgReady ? " is-loaded" : ""}`} aria-hidden />

      <div className="about-hero-shell">
        <div className="about-hero-grid">
          <div className="about-hero-copy">
            <p className="about-hero-eyebrow about-hero-reveal about-hero-reveal-up about-hero-delay-1">{t.eyebrow}</p>
            <h1 id="about-hero-heading" className="about-hero-title">
              <span className="about-hero-title-line about-hero-reveal about-hero-reveal-left about-hero-delay-2">{t.line1}</span>
              <span className="about-hero-title-line about-hero-reveal about-hero-reveal-left about-hero-delay-3">{t.line2a}</span>
              <span className="about-hero-title-accent about-hero-reveal about-hero-reveal-right about-hero-delay-4">{t.line2b}</span>
            </h1>
            <p className="about-hero-sub about-hero-reveal about-hero-reveal-left about-hero-delay-5">{t.sub}</p>
          </div>
        </div>

        <div className="about-hero-bottom">
          <ul className="about-hero-perks" aria-label={isEn ? "Benefits" : "Výhody"}>
            {perks.map(({ Icon, title, sub }, i) => (
              <li
                key={title}
                className={`about-hero-perk about-hero-reveal about-hero-reveal-up about-hero-delay-${6 + i}`}
              >
                <span className="about-hero-perk-icon">
                  <Icon />
                </span>
                <span className="about-hero-perk-text">
                  <strong>{title}</strong>
                  <span>{sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes aboutHeroRevealLeft {
          from { opacity: 0; transform: translateX(-32px); filter: blur(8px); }
          to { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        @keyframes aboutHeroRevealRight {
          from { opacity: 0; transform: translateX(32px); filter: blur(8px); }
          to { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        @keyframes aboutHeroRevealUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes aboutHeroBgReveal {
          from {
            opacity: 0;
            transform: scale(1.035);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }
        @keyframes aboutHeroFadeReveal {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .about-hero {
          position: relative;
          width: 100%;
          min-height: ${HERO_MIN_HEIGHT};
          padding: 100px 0 34px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .about-hero-bg {
          position: absolute;
          top: ${HEADER_BOTTOM_OFFSET_PX}px;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          background-color: ${pk.page};
          background-size: auto 100%;
          background-repeat: no-repeat;
          background-position: right center;
          opacity: 0;
          transform: scale(1.035);
          filter: blur(8px);
          will-change: opacity, transform, filter;
        }
        .about-hero-bg.is-loaded {
          animation: aboutHeroBgReveal 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .about-hero-fade {
          position: absolute;
          top: ${HEADER_BOTTOM_OFFSET_PX}px;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          background: linear-gradient(
            to right,
            ${pk.page} 0%,
            ${pk.page} 24%,
            rgb(255 255 255 / 0.98) 50%,
            rgb(255 255 255 / 0.88) 60%,
            rgb(255 255 255 / 0.62) 70%,
            rgb(255 255 255 / 0.28) 80%,
            transparent 94%
          );
        }
        .about-hero-fade.is-loaded {
          animation: aboutHeroFadeReveal 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
        }
        .about-hero-shell {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          box-sizing: border-box;
        }
        .about-hero-grid {
          position: relative;
          display: block;
          min-height: calc(${HERO_MIN_HEIGHT} - 134px);
        }
        .about-hero-copy {
          max-width: min(680px, 52vw);
        }
        .about-hero-reveal {
          opacity: 0;
          will-change: transform, opacity, filter;
        }
        .about-hero-reveal-left {
          animation: aboutHeroRevealLeft 900ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .about-hero-reveal-right {
          animation: aboutHeroRevealRight 900ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .about-hero-reveal-up {
          animation: aboutHeroRevealUp 750ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .about-hero-delay-1 { animation-delay: 200ms; }
        .about-hero-delay-2 { animation-delay: 450ms; }
        .about-hero-delay-3 { animation-delay: 650ms; }
        .about-hero-delay-4 { animation-delay: 850ms; }
        .about-hero-delay-5 { animation-delay: 1050ms; }
        .about-hero-delay-6 { animation-delay: 1350ms; }
        .about-hero-delay-7 { animation-delay: 1500ms; }
        .about-hero-delay-8 { animation-delay: 1650ms; }
        .about-hero-delay-9 { animation-delay: 1800ms; }
        .about-hero-eyebrow {
          margin: 0 0 18px;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 15.6px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          background: ${pk.gradientPopular};
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .about-hero-title {
          margin: 0 0 20px;
          font-family: "Montserrat", sans-serif;
          font-weight: 800;
          font-size: clamp(32px, 4.2vw, 52px);
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: ${pk.ink};
        }
        .about-hero-title-line {
          display: block;
        }
        .about-hero-title-accent {
          display: block;
          background: ${pk.gradientPopular};
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .about-hero-sub {
          margin: 0 0 28px;
          max-width: 540px;
          font-family: "Montserrat", sans-serif;
          font-weight: 400;
          font-size: clamp(15px, 1.8vw, 17px);
          line-height: 1.65;
          color: ${pk.ink65};
        }
        .about-hero-perks {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: flex-start;
          align-items: flex-start;
          gap: clamp(5px, 2.2vw, 21px);
          width: 100%;
        }
        .about-hero-perk {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 10px;
          flex: 0 0 auto;
          width: max-content;
          max-width: none;
        }
        .about-hero-perk-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${pk.ink};
        }
        .about-hero-perk-icon svg {
          width: 36px;
          height: 36px;
        }
        .about-hero-perk-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 0 1 auto;
          font-family: "Montserrat", sans-serif;
          font-size: 15.6px;
          font-weight: 600;
          line-height: 1.35;
          color: ${pk.ink65};
        }
        .about-hero-perk-text strong {
          font-weight: 700;
          font-size: 16.8px;
          color: ${pk.ink};
          white-space: nowrap;
          display: block;
        }
        .about-hero-perk-text > span {
          display: block;
          white-space: nowrap;
          font-weight: 600;
        }
        .about-hero-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          width: 100%;
          margin-top: 28px;
        }
        @media (min-width: 1101px) {
          .about-hero {
            min-height: max(70vh, 644px);
          }
          .about-hero-shell {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: calc(max(70vh, 644px) - 134px);
          }
          .about-hero-grid {
            min-height: 0;
            flex: 1 1 auto;
          }
          .about-hero-copy {
            padding-top: 40px;
            max-width: min(960px, 62vw);
          }
          .about-hero-bottom {
            flex-direction: row;
            align-items: flex-end;
            justify-content: flex-start;
            gap: clamp(16px, 2vw, 32px);
            margin-top: 0;
            margin-bottom: 40px;
            flex-shrink: 0;
          }
          .about-hero-perks {
            flex: 0 1 auto;
            min-width: 0;
            width: auto;
          }
        }

        @media (max-width: 1100px) {
          .about-hero-bg {
            background-size: auto min(100%, 520px);
            background-position: right bottom;
          }
          .about-hero-fade {
            background: linear-gradient(
              to bottom,
              ${pk.page} 0%,
              ${pk.page} 28%,
              rgb(255 255 255 / 0.95) 42%,
              rgb(255 255 255 / 0.7) 55%,
              rgb(255 255 255 / 0.25) 68%,
              transparent 82%
            );
          }
          .about-hero-grid {
            grid-template-columns: 1fr;
            min-height: 0;
            gap: 28px;
          }
          .about-hero-copy {
            max-width: 100%;
            padding-top: 0;
            text-align: center;
          }
          .about-hero-sub {
            margin-left: auto;
            margin-right: auto;
          }
          .about-hero-perks {
            flex-wrap: wrap;
            justify-content: center;
            max-width: 520px;
            margin: 0 auto;
          }
          .about-hero-perk-text strong,
          .about-hero-perk-text > span {
            white-space: normal;
          }
          .about-hero-bottom {
            margin-top: 32px;
          }
        }

        @media (max-width: 768px) {
          .about-hero {
            min-height: 70svh;
            min-height: 70dvh;
            padding: 96px 0 40px;
            align-items: stretch;
            box-sizing: border-box;
          }
          .about-hero-shell {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: calc(70svh - 96px - 40px);
            min-height: calc(70dvh - 96px - 40px);
            box-sizing: border-box;
          }
          .about-hero-grid {
            min-height: 0;
            flex: 0 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }
          .about-hero-eyebrow,
          .about-hero-sub {
            display: none !important;
          }
          .about-hero-bg {
            top: 96px;
            bottom: 0;
            left: 0;
            right: 0;
            height: auto;
            background-size: auto 100%;
            background-position: right -80px center;
            background-repeat: no-repeat;
          }
          .about-hero-fade {
            top: 96px;
            bottom: 0;
            left: 0;
            right: 0;
            height: auto;
            background: rgb(255 255 255 / 0.2);
          }
          .about-hero-copy {
            position: relative;
            z-index: 2;
            padding-top: 30px;
            text-align: left;
          }
          .about-hero-title,
          .about-hero-title-line,
          .about-hero-title-accent {
            text-align: left;
          }
          .about-hero-bottom {
            margin-top: auto;
            padding-top: 20px;
            width: 100%;
            position: relative;
            z-index: 2;
          }
          .about-hero-perks {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
            width: 100%;
            max-width: 100%;
            margin: 0;
          }
          .about-hero-perk {
            width: auto;
            max-width: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
            padding: 12px 10px;
            border-radius: 12px;
            background: rgb(255 255 255 / 0.5);
            border: 1px solid rgb(255 255 255 / 0.55);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-sizing: border-box;
            text-align: center;
          }
          .about-hero-perk-icon {
            display: none !important;
          }
          .about-hero-perk-text strong {
            font-size: 14px;
            white-space: normal;
          }
          .about-hero-perk-text > span {
            font-size: 13px;
            white-space: normal;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-hero-bg,
          .about-hero-fade,
          .about-hero-reveal {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>
    </section>
  );
};
