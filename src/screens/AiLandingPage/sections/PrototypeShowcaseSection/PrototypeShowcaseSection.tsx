import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";
import investicniPoradceImg from "../../../../../Images/Prototypes/investiční poradce.png";
import realitniMaklerImg from "../../../../../Images/Prototypes/realitní makléř.png";
import fitnessTrenerImg from "../../../../../Images/Prototypes/fitness trenér.png";

type PrototypeCard = {
  category: string;
  title: string;
  bullets: string[];
  trust: string;
  image: string;
  previewUrl: string;
};

const cards: PrototypeCard[] = [
  {
    category: "Investiční poradce",
    title: "Získejte web, který okamžitě budí důvěru a přivádí nové poptávky.",
    bullets: [
      "Jasně vysvětlené služby a expertiza",
      "Formulář pro kvalitní leady",
      "Silný premium dojem pro bonitní klienty",
    ],
    trust: "Připraveno pro jasnou nabídku, reference i konzultační funnel.",
    image: investicniPoradceImg,
    previewUrl: "https://financni-partner-demo.vercel.app/",
  },
  {
    category: "Realitní makléř",
    title: "Představte nemovitosti i sebe tak, aby klient chtěl zavolat hned.",
    bullets: [
      "Vyšší důvěryhodnost při prvním dojmu",
      "Lepší prezentace nabídek a lokalit",
      "Rychlá cesta ke kontaktu a prohlídce",
    ],
    trust: "Ideální pro osobní značku, lead capture a lokální viditelnost.",
    image: realitniMaklerImg,
    previewUrl: "https://domov-snadno.vercel.app/",
  },
  {
    category: "Fitness trenér",
    title: "Přeměňte návštěvníky v rezervace tréninku a dlouhodobé klienty.",
    bullets: [
      "Silná transformační komunikace",
      "Prostor pro výsledky klientů a recenze",
      "Napojení na rezervace nebo poptávku",
    ],
    trust: "Navrženo pro osobní značku, balíčky služeb a pravidelné leady.",
    image: fitnessTrenerImg,
    previewUrl: "https://fitness-trainer-alpha.vercel.app/",
  },
];

const cardsEn: PrototypeCard[] = [
  {
    category: "Financial advisor",
    title: "Get a website that builds trust instantly and brings new inquiries.",
    bullets: [
      "Services and expertise explained clearly",
      "A form that attracts high-quality leads",
      "Strong premium impression for high-value clients",
    ],
    trust: "Ready for a clear offer, testimonials, and a consultation funnel.",
    image: investicniPoradceImg,
    previewUrl: "https://financni-partner-demo.vercel.app/",
  },
  {
    category: "Real estate agent",
    title: "Present properties and yourself so clients want to call immediately.",
    bullets: [
      "Higher credibility from the first impression",
      "Better presentation of listings and locations",
      "Fast path to contact and property viewings",
    ],
    trust: "Ideal for personal branding, lead capture, and local visibility.",
    image: realitniMaklerImg,
    previewUrl: "https://domov-snadno.vercel.app/",
  },
  {
    category: "Personal trainer",
    title: "Turn visitors into training bookings and long-term clients.",
    bullets: [
      "Strong transformation-focused messaging",
      "Space for client results and testimonials",
      "Integration with booking or inquiries",
    ],
    trust: "Designed for personal brand, service packages, and steady lead flow.",
    image: fitnessTrenerImg,
    previewUrl: "https://fitness-trainer-alpha.vercel.app/",
  },
];

const CheckChip = () => (
  <span
    aria-hidden="true"
    style={{
      width: 22,
      height: 22,
      borderRadius: 999,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: pk.accent10,
      boxShadow: `0 0 0 1px ${pk.prototypeRing18} inset`,
      color: pk.linkSky,
      flexShrink: 0,
      marginTop: 1,
      fontSize: 13,
      fontWeight: 700,
    }}
  >
    ✓
  </span>
);

export const PrototypeShowcaseSection = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const t = isEn
    ? {
        heading: "Get a free prototype in 3 days",
        subheading: "We’ll show you a tailored website concept before you commit. No obligation, no risk.",
        cta: "View prototype",
        closeAria: "Close preview",
      }
    : {
        heading: "Získejte zdarma prototyp do 3 dnů",
        subheading: "Ukážeme vám konkrétní návrh vašeho webu na míru ještě před spoluprací. Bez závazků, bez rizika.",
        cta: "Zobraz prototyp",
        closeAria: "Zavřít náhled",
      };

  const activeCards = isEn ? cardsEn : cards;
  const [activePreview, setActivePreview] = useState<PrototypeCard | null>(null);
  const [cardsVisible, setCardsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [mobileIdx, setMobileIdx] = useState(0);
  const touchStartX = useRef<number>(0);
  const SWIPE_THRESHOLD = 50;

  const goTo = (idx: number) => setMobileIdx(Math.max(0, Math.min(activeCards.length - 1, idx)));
  const onTouchStart = (e: any) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: any) => {
    const endX = e.changedTouches[0].clientX;
    const delta = touchStartX.current - endX;
    if (delta > SWIPE_THRESHOLD) goTo(mobileIdx + 1);
    else if (delta < -SWIPE_THRESHOLD) goTo(mobileIdx - 1);
  };

  useEffect(() => {
    if (!activePreview) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePreview(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activePreview]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setCardsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.18 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section
      ref={(el) => { sectionRef.current = el; }}
      style={{
        width: "100%",
        backgroundColor: pk.page,
        padding: "40px 0 84px",
        marginTop: "-30px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "42px" }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(26px,3.6vw,42px)",
              lineHeight: 1.1,
              color: pk.ink,
              margin: "0 auto 18px",
              letterSpacing: "-0.02em",
              maxWidth: "860px",
            }}
          >
            {t.heading}
          </h2>
          <p
            className="section-sub"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: 1.6,
              color: pk.ink65,
              margin: "0 auto",
              maxWidth: "860px",
            }}
          >
            {t.subheading}
          </p>
        </div>

        <div className="prototype-grid prototype-grid-desktop">
          {activeCards.map((card) => (
            <article key={card.category} className="prototype-card">
              <div className="prototype-card-top">
                <div className="prototype-mockup">
                  <img src={card.image} alt={card.category} className="prototype-mockup-image" />
                </div>
              </div>

              <div className="prototype-category">{card.category}</div>

              <h3 className="prototype-title">{card.title}</h3>

              <ul className="prototype-benefits">
                {card.bullets.map((bullet) => (
                  <li key={bullet}>
                    <CheckChip />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <p className="prototype-trust">{card.trust}</p>

              <button type="button" className="prototype-cta" onClick={() => setActivePreview(card)}>
                {t.cta}
              </button>
            </article>
          ))}
        </div>

        {/* Mobile carousel (one card) */}
        <div className="prototype-mobile-carousel">
          <div style={{ overflow: "hidden", width: "100%" }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div
              className="prototype-carousel-track"
              style={{
                display: "flex",
                width: `${activeCards.length * 100}%`,
                transform: `translateX(${-mobileIdx * (100 / activeCards.length)}%)`,
                transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              {activeCards.map((card) => (
                <div
                  key={card.category}
                  className="prototype-mobile-slide"
                  style={{ flex: `0 0 ${100 / activeCards.length}%`, padding: "0 0 4px", boxSizing: "border-box" }}
                >
                  <article className="prototype-card">
                    <div className="prototype-card-top">
                      <div className="prototype-mockup">
                        <img src={card.image} alt={card.category} className="prototype-mockup-image" />
                      </div>
                    </div>
                    <div className="prototype-category">{card.category}</div>
                    <h3 className="prototype-title">{card.title}</h3>
                    <ul className="prototype-benefits">
                      {card.bullets.map((bullet) => (
                        <li key={bullet}>
                          <CheckChip />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="prototype-trust">{card.trust}</p>
                    <button type="button" className="prototype-cta" onClick={() => setActivePreview(card)}>
                      {t.cta}
                    </button>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "22px" }}>
            {activeCards.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={isEn ? `Go to card ${i + 1}` : `Přejít na kartu ${i + 1}`}
                onClick={() => goTo(i)}
                style={{
                  width: i === mobileIdx ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  background: i === mobileIdx ? pk.accent : pk.slateTint16,
                  transition: "width 250ms ease, background 250ms ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {activePreview ? (
        <div className="prototype-modal" role="dialog" aria-modal="true" aria-label={activePreview.category}>
          <div className="prototype-modal-backdrop" onClick={() => setActivePreview(null)} />
          <div className="prototype-modal-shell">
            <div className="prototype-modal-topbar">
              <div>
                <div className="prototype-modal-label">{activePreview.category}</div>
                <h3 className="prototype-modal-title">{activePreview.title}</h3>
              </div>
              <button type="button" className="prototype-modal-close" onClick={() => setActivePreview(null)} aria-label={t.closeAria}>
                ×
              </button>
            </div>
            <iframe
              src={activePreview.previewUrl}
              title={activePreview.category}
              className="prototype-modal-frame"
            />
          </div>
        </div>
      ) : null}

      <style>{`
        .prototype-grid{
          display:grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }
        .prototype-mobile-carousel{ display:none; }
        .prototype-card{
          background: var(--pk-page);
          border: 1px solid var(--pk-slate-600-border-16);
          border-radius: 28px;
          box-shadow: 0 20px 48px var(--pk-slate-tint-08);
          padding: 20px;
          display:flex;
          flex-direction:column;
          transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
          opacity: ${cardsVisible ? 0 : 1};
          animation: ${cardsVisible ? "prototypeCardFadeIn 700ms cubic-bezier(0.2,0.8,0.2,1) forwards" : "none"};
        }
        .prototype-card:nth-child(1){ animation-delay: 0ms; }
        .prototype-card:nth-child(2){ animation-delay: 1000ms; }
        .prototype-card:nth-child(3){ animation-delay: 2000ms; }
        .prototype-card:hover{
          transform: translateY(-6px);
          box-shadow: 0 26px 56px var(--pk-slate-tint-12);
          border-color: var(--pk-prototype-ring-18);
        }
        @keyframes prototypeCardFadeIn{
          from{ opacity: 0; transform: translateY(18px); }
          to{ opacity: 1; transform: translateY(0); }
        }
        .prototype-card-top{
          margin-bottom: 18px;
        }
        .prototype-mockup{
          border-radius: 22px;
          overflow: hidden;
          background: var(--pk-gradient-prototype-card);
          min-height: 220px;
          box-shadow: inset 0 1px 0 var(--pk-on-dark-10);
        }
        .prototype-mockup-image{
          display:block;
          width:100%;
          height:100%;
          min-height:220px;
          object-fit:cover;
          object-position: top center;
        }
        .prototype-category{
          display:inline-flex;
          align-self:flex-start;
          margin-bottom: 14px;
          padding: 7px 12px;
          border-radius: 999px;
          background: var(--pk-slate-tint-05);
          color: var(--pk-ink-72);
          font-family: "Space Grotesk", sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .prototype-title{
          margin: 0 0 16px;
          font-family: "Space Grotesk", sans-serif;
          font-weight: 700;
          font-size: 24px;
          line-height: 1.18;
          letter-spacing: -0.02em;
          color: var(--pk-ink);
        }
        .prototype-benefits{
          list-style:none;
          padding:0;
          margin:0 0 16px;
          display:flex;
          flex-direction:column;
          gap: 12px;
        }
        .prototype-benefits li{
          display:flex;
          align-items:flex-start;
          gap: 10px;
          font-family: "Space Grotesk", sans-serif;
          font-size: 15px;
          line-height: 1.5;
          color: var(--pk-ink-82);
        }
        .prototype-trust{
          margin: 0 0 20px;
          font-family: "Space Grotesk", sans-serif;
          font-size: 13px;
          line-height: 1.55;
          color: var(--pk-ink-55);
        }
        .prototype-cta{
          margin-top:auto;
          border:none;
          border-radius: 12px;
          padding: 15px 20px;
          background: var(--pk-gradient-cta-soft);
          color: var(--pk-ink);
          font-family: "Space Grotesk", sans-serif;
          font-weight: 700;
          font-size: 16px;
          cursor:pointer;
          transition: transform 220ms ease, filter 220ms ease;
        }
        .prototype-cta:hover{
          transform: translateY(-2px);
          filter: brightness(1.06);
        }
        .prototype-modal{
          position: fixed;
          inset: 0;
          z-index: 12000;
          display:flex;
          align-items:center;
          justify-content:center;
          padding: 24px;
        }
        .prototype-modal-backdrop{
          position:absolute;
          inset:0;
          background: var(--pk-slate-tint-58);
          backdrop-filter: blur(8px);
        }
        .prototype-modal-shell{
          position:relative;
          z-index:1;
          width:min(1320px, 100%);
          height:min(84vh, 920px);
          background: var(--pk-page);
          border-radius: 24px;
          overflow:hidden;
          box-shadow: 0 30px 80px var(--pk-slate-tint-28);
          display:flex;
          flex-direction:column;
        }
        .prototype-modal-topbar{
          display:flex;
          align-items:flex-start;
          justify-content:space-between;
          gap:16px;
          padding: 18px 20px;
          border-bottom: 1px solid var(--pk-slate-tint-08);
          background: var(--pk-on-dark-94);
        }
        .prototype-modal-label{
          font-family:"Space Grotesk", sans-serif;
          font-size:12px;
          font-weight:700;
          letter-spacing:0.05em;
          text-transform:uppercase;
          color: var(--pk-ink-55);
          margin-bottom:6px;
        }
        .prototype-modal-title{
          margin:0;
          font-family:"Space Grotesk", sans-serif;
          font-size:20px;
          font-weight:700;
          color: var(--pk-ink);
          line-height:1.25;
        }
        .prototype-modal-close{
          width:40px;
          height:40px;
          border:none;
          border-radius:999px;
          background: var(--pk-slate-tint-05);
          color: var(--pk-ink);
          font-size:28px;
          line-height:1;
          cursor:pointer;
          flex-shrink:0;
        }
        .prototype-modal-frame{
          width:100%;
          height:100%;
          border:none;
          background: var(--pk-page);
        }
        @media (max-width: 1024px){
          .prototype-grid-desktop{ display:none !important; }
          .prototype-mobile-carousel{ display:block !important; }
          .prototype-mobile-slide{ padding-top: 6px; }
          .prototype-mobile-carousel .prototype-card{
            width: min(520px, 100%);
            margin: 0 auto;
          }
        }
        @media (max-width: 768px){
          .prototype-mockup{ min-height: 190px; }
          .prototype-mockup-image{ min-height:190px; }
          .prototype-title{ font-size: 22px; }
          .prototype-modal{ padding: 12px; }
          .prototype-modal-shell{ height: 88vh; border-radius: 18px; }
          .prototype-modal-topbar{ padding: 14px 16px; }
          .prototype-modal-title{ font-size: 17px; }
        }
        @media (prefers-reduced-motion: reduce){
          .prototype-card{ animation: none !important; opacity: 1 !important; }
        }
      `}</style>
    </section>
  );
};
