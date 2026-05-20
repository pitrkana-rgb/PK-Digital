import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import { pk } from "../../design/pkLandingColors";
import { headerPrimaryCtaClassName, headerPrimaryCtaStyle } from "../../design/headerCtaStyle";
import founderHeadUrl from "../../../Images/Founder_head.png";

const PAGE_SHELL_MAX = "1400px";
const PAGE_SHELL_PAD = "24px";

const IconWrap = ({ children }: { children: React.ReactNode }) => (
  <span className="about-builder-icon" aria-hidden>
    {children}
  </span>
);

const IconExperience = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="m9 16 2 2 4-4" />
  </svg>
);
const IconSpark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
);
const IconPerson = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconBolt = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
const IconChip = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
  </svg>
);
const IconChat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 10h8M8 14h5" />
  </svg>
);
const IconGrowth = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="m7 14 4-4 4 4 5-6" />
  </svg>
);

const sidebarCardsCs = [
  { Icon: IconExperience, title: "10+ let zkušeností", text: "Více než 10 let pracuji s daty, analytikou a moderními technologiemi." },
  { Icon: IconSpark, title: "AI-first workflow", text: "Denně pracuji s moderními AI nástroji a automatizací, které zrychlují vývoj a zvyšují kvalitu výsledků." },
  { Icon: IconPerson, title: "Přímá spolupráce", text: "Komunikujete přímo se mnou. Bez zprostředkovatelů a zbytečných agenturních procesů." },
  { Icon: IconBolt, title: "Rychlé změny", text: "Úpravy a nové požadavky řeším flexibilně a rychle, i do budoucna." },
] as const;

const sidebarCardsEn = [
  { Icon: IconExperience, title: "10+ years of experience", text: "For more than 10 years I have worked with data, analytics, and modern technology." },
  { Icon: IconSpark, title: "AI-first workflow", text: "I use modern AI tools and automation daily to speed up development and raise quality." },
  { Icon: IconPerson, title: "Direct collaboration", text: "You communicate directly with me — no middlemen or unnecessary agency processes." },
  { Icon: IconBolt, title: "Fast changes", text: "I handle updates and new requests flexibly and quickly, including after launch." },
] as const;

const mainFeaturesCs = [
  {
    Icon: IconChip,
    title: "AI workflow místo agenturního chaosu",
    text: "Využívám AI nástroje k urychlení vývoje, prototypování i optimalizace webu — bez kompromisů v kvalitě.",
  },
  {
    Icon: IconChat,
    title: "Přímá komunikace a flexibilita",
    text: "Komunikujete přímo se mnou. Změny a nové požadavky řeším rychle a bez zbytečných průtahů.",
  },
  {
    Icon: IconGrowth,
    title: "Web jako nástroj pro růst",
    text: "Nestavím jen hezké stránky. Web má pomáhat firmě růst, získávat zákazníky a budovat důvěru.",
  },
] as const;

const mainFeaturesEn = [
  {
    Icon: IconChip,
    title: "AI workflow instead of agency chaos",
    text: "I use AI tools to speed up development, prototyping, and optimization — without compromising quality.",
  },
  {
    Icon: IconChat,
    title: "Direct communication and flexibility",
    text: "You work directly with me. I handle changes and new requests quickly, without unnecessary delays.",
  },
  {
    Icon: IconGrowth,
    title: "A website built for growth",
    text: "I do not just build pretty pages. Your site should help your business grow, win customers, and build trust.",
  },
] as const;

const MOBILE_FADE_IN_MAX_WIDTH = 768;

const useFadeIn = (threshold = 0.12) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_FADE_IN_MAX_WIDTH}px)`);
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

export const AboutWhoSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isEn = language === "en";
  const fade = useFadeIn();
  const sidebarCards = isEn ? sidebarCardsEn : sidebarCardsCs;
  const mainFeatures = isEn ? mainFeaturesEn : mainFeaturesCs;

  const t = isEn
    ? {
        headline: "I build modern websites — faster, more flexible, and without unnecessary cost",
        intro1:
          "My name is Petr Kana and for more than 10 years I have worked with data, analytics, and modern technology. Today I combine that experience with building websites and an AI workflow that significantly speeds up development, prototyping, and ongoing website management.",
        intro2:
          "Unlike traditional agencies, I work on the project directly from start to finish. With modern AI tools, I deliver professional websites faster and more flexibly — without the unnecessary cost of complex processes or large teams.",
        role: "Web design & AI specialist",
        ctaPrimary: "Free consultation",
        imgAlt: "Petr Kana – PK-Digital",
      }
    : {
        headline: "Tvořím moderní weby rychleji, flexibilněji a bez zbytečných nákladů",
        intro1:
          "Jmenuji se Petr Kaňa a více než 10 let pracuji s daty, analytikou a moderními technologiemi. Dnes tyto zkušenosti propojuji s tvorbou webových stránek a AI workflow, které výrazně zrychlují vývoj, prototypování i budoucí správu webu.",
        intro2:
          "Na rozdíl od klasických agentur pracuji přímo na projektu od začátku do konce. Díky moderním AI nástrojům dokážu dodávat profesionální weby rychleji, flexibilněji a bez zbytečných nákladů za složité procesy nebo velké týmy.",
        role: "Web design & AI specialista",
        ctaPrimary: "Nezávazná konzultace",
        imgAlt: "Petr Kaňa – PK-Digital",
      };

  return (
    <section
      id="about-who"
      ref={fade.ref}
      className={`about-builder${fade.visible ? " is-visible" : ""}`}
      aria-labelledby="about-builder-heading"
    >
      <div className="about-builder-shell">
        <h2 id="about-builder-heading" className="about-builder-headline pk-section-heading">
          {t.headline}
        </h2>

        <div className="about-builder-grid">
          <aside className="about-builder-sidebar">
            <div className="about-builder-profile">
              <div className="about-builder-profile-photo-wrap">
                <img src={founderHeadUrl} alt={t.imgAlt} className="about-builder-profile-photo" />
              </div>
              <div className="about-builder-profile-copy">
                <p className="about-builder-profile-sign">
                  <span className="about-builder-profile-sign-text">Petr Kaňa</span>
                </p>
                <p className="about-builder-profile-role">{t.role}</p>
              </div>
            </div>

            <div className="about-builder-intro-mobile-first">
              <p>{t.intro1}</p>
            </div>

            <ul className="about-builder-cards">
              {sidebarCards.map(({ Icon, title, text }) => (
                <li key={title} className="about-builder-card">
                  <IconWrap>
                    <Icon />
                  </IconWrap>
                  <div className="about-builder-card-text">
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                </li>
              ))}
            </ul>

          </aside>

          <div className="about-builder-divider" aria-hidden />

          <div className="about-builder-main">
            <div className="about-builder-intro">
              <p className="about-builder-intro-desktop-first">{t.intro1}</p>
              <p>{t.intro2}</p>
            </div>

            <div className="about-builder-features about-builder-features--desktop">
              {mainFeatures.map(({ Icon, title, text }, i) => (
                <article key={title} className="about-builder-feature">
                  <IconWrap>
                    <Icon />
                  </IconWrap>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                  {i < mainFeatures.length - 1 ? <div className="about-builder-feature-rule" aria-hidden /> : null}
                </article>
              ))}
            </div>

            <ul className="about-builder-cards about-builder-features--mobile">
              {mainFeatures.map(({ Icon, title, text }) => (
                <li key={`mobile-${title}`} className="about-builder-card">
                  <IconWrap>
                    <Icon />
                  </IconWrap>
                  <div className="about-builder-card-text">
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="about-builder-actions">
              <button
                type="button"
                className={headerPrimaryCtaClassName}
                style={{ ...headerPrimaryCtaStyle, whiteSpace: "nowrap" }}
                onClick={() => navigate("/napiste-nam")}
              >
                {t.ctaPrimary}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-builder {
          padding: 56px 0 88px;
          background: ${pk.page};
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .about-builder.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .about-builder-shell {
          max-width: ${PAGE_SHELL_MAX};
          margin: 0 auto;
          padding: 0 ${PAGE_SHELL_PAD};
          box-sizing: border-box;
        }
        .about-builder-grid {
          display: grid;
          grid-template-columns: minmax(260px, 36%) 1px minmax(0, 1fr);
          gap: 0 48px;
          align-items: start;
        }
        .about-builder-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 0;
        }
        .about-builder-cards {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .about-builder-card,
        .about-builder-profile {
          background: ${pk.page};
          border: 1px solid ${pk.slateBorder};
          border-radius: 16px;
          box-shadow: 0 12px 36px rgb(2 6 23 / 0.06);
        }
        .about-builder-card {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 20px 20px 18px;
        }
        .about-builder-icon {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${pk.ink};
        }
        .about-builder-icon svg {
          width: 26px;
          height: 26px;
        }
        .about-builder-card-text {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }
        .about-builder-card-text strong {
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 16px;
          line-height: 1.3;
          color: ${pk.ink};
        }
        .about-builder-card-text span {
          font-family: "Montserrat", sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 1.55;
          color: ${pk.ink68};
        }
        .about-builder-profile {
          display: flex;
          gap: 18px;
          align-items: center;
          padding: 18px;
        }
        .about-builder-profile-photo-wrap {
          width: 88px;
          height: 88px;
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .about-builder-profile-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
        }
        .about-builder-profile-copy {
          min-width: 0;
        }
        .about-builder-profile-role {
          margin: 8px 0 0;
          font-family: "Montserrat", sans-serif;
          font-weight: 500;
          font-size: 15.6px;
          color: ${pk.ink65};
        }
        .about-builder-profile-sign {
          margin: 0;
        }
        .about-builder-profile-sign-text {
          display: inline-block;
          font-family: "Montserrat", sans-serif;
          font-weight: 500;
          font-style: italic;
          font-size: 26.4px;
          line-height: 1.2;
          color: ${pk.ink};
          padding-bottom: 4px;
          background-image: ${pk.gradientPopular};
          background-size: 100% 2px;
          background-position: 0 100%;
          background-repeat: no-repeat;
        }
        .about-builder-divider {
          width: 1px;
          min-height: 100%;
          background: ${pk.slateBorder};
          align-self: stretch;
        }
        .about-builder-main {
          min-width: 0;
          padding-top: 4px;
        }
        .about-builder-headline {
          margin: 0 auto 48px;
          max-width: 980px;
          text-align: center;
        }
        .about-builder-intro {
          margin: 0 0 32px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          max-width: 56ch;
        }
        .about-builder-intro p,
        .about-builder-intro-mobile-first p {
          margin: 0;
          font-family: "Montserrat", sans-serif;
          font-weight: 400;
          font-size: 19.2px;
          line-height: 1.7;
          color: ${pk.ink68};
        }
        .about-builder-intro-mobile-first {
          display: none;
        }
        .about-builder-features--mobile {
          display: none;
        }
        .about-builder-features {
          display: flex;
          flex-direction: column;
          margin-bottom: 36px;
        }
        .about-builder-feature {
          position: relative;
          display: flex;
          gap: 18px;
          align-items: flex-start;
          padding: 22px 0;
        }
        .about-builder-feature:first-child {
          padding-top: 0;
        }
        .about-builder-feature:last-child {
          padding-bottom: 0;
        }
        .about-builder-feature h3 {
          margin: 0 0 8px;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 17px;
          line-height: 1.35;
          color: ${pk.ink};
        }
        .about-builder-feature p {
          margin: 0;
          font-family: "Montserrat", sans-serif;
          font-weight: 400;
          font-size: 15px;
          line-height: 1.65;
          color: ${pk.ink68};
          max-width: 52ch;
        }
        .about-builder-feature-rule {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: ${pk.slateBorder};
        }
        .about-builder-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 14px 24px;
        }


        @media (min-width: 961px) {
          .about-builder-grid {
            grid-template-columns: minmax(248px, 29%) 1px minmax(0, 1fr);
            gap: 0 44px;
          }
          .about-builder-main {
            width: 100%;
            max-width: none;
          }
          .about-builder-intro {
            max-width: none;
          }
          .about-builder-features {
            max-width: 75%;
            width: 100%;
          }
          .about-builder-card {
            align-items: center;
          }
          .about-builder-card .about-builder-icon {
            width: 68px;
            height: 68px;
          }
          .about-builder-card .about-builder-icon svg {
            width: 40.8px;
            height: 40.8px;
          }
          .about-builder-feature .about-builder-icon {
            width: 82px;
            height: 82px;
            min-width: 82px;
            min-height: 82px;
            overflow: visible;
            flex-shrink: 0;
          }
          .about-builder-feature .about-builder-icon svg {
            width: 49px;
            height: 49px;
          }
          .about-builder-feature {
            gap: 22px;
            align-items: center;
          }
          .about-builder-feature > div {
            flex: 1 1 auto;
            min-width: 0;
            max-width: 100%;
          }
          .about-builder-feature h3 {
            max-width: 100%;
            line-height: 1.35;
          }
          .about-builder-feature p {
            max-width: 54ch;
            line-height: 1.65;
          }
        }

        @media (max-width: 960px) {
          .about-builder-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .about-builder-divider {
            display: none;
          }
          .about-builder-sidebar {
            gap: 16px;
          }
          .about-builder-intro-mobile-first {
            display: block;
            text-align: center;
          }
          .about-builder-intro-mobile-first p {
            text-align: center;
          }
          .about-builder-intro-desktop-first {
            display: none;
          }
          .about-builder-intro {
            gap: 18px;
            margin-bottom: 0;
            max-width: none;
            text-align: center;
            padding-bottom: 20px;
          }
          .about-builder-intro p {
            text-align: center;
          }
          .about-builder-main {
            padding-top: 0;
          }
          .about-builder-features {
            max-width: 100%;
          }
          .about-builder-feature p {
            max-width: none;
          }
          .about-builder-features--desktop {
            display: none;
          }
          .about-builder-features--mobile {
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin: 0 0 28px;
            padding: 0;
            list-style: none;
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .about-builder {
            padding: 32px 0 64px;
          }
          .about-builder-headline {
            margin-bottom: 32px;
          }
        }

        @media (max-width: 600px) {
          .about-builder {
            padding: 28px 0 64px;
          }
          .about-builder-shell {
            padding: 0 20px;
          }
          .about-builder-card {
            padding: 16px;
          }
          .about-builder-profile {
            flex-direction: column;
            text-align: center;
          }
          .about-builder-profile-photo-wrap {
            width: 100px;
            height: 100px;
          }
          .about-builder-actions {
            flex-direction: column;
            align-items: stretch;
          }
          .about-builder-actions .hero-primary-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-builder {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};
