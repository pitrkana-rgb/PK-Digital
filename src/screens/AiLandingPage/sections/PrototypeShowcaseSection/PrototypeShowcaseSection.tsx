import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";
import { scrollToSectionId } from "../../../../utils/scrollToSection";
import investicniPoradceImg from "../../../../../Images/Prototypes/investiční poradce.png";
import realitniMaklerImg from "../../../../../Images/Prototypes/realitní makléř.png";
import fitnessTrenerImg from "../../../../../Images/Prototypes/fitness trenér.png";

type PrototypeCard = {
  title: string;
  description: string;
  image: string;
  previewUrl: string;
};

const cards: PrototypeCard[] = [
  {
    title: "Investiční poradce",
    description:
      "Web vytvořený pro profesionální prezentaci finančních služeb a budování důvěry. Pomáhá jednoduše vysvětlit nabídku a přivádět nové klienty přes kvalitní poptávky.",
    image: investicniPoradceImg,
    previewUrl: "https://financni-partner-demo.vercel.app/",
  },
  {
    title: "Realitní makléř",
    description:
      "Prémiová prezentace pro makléře, kteří chtějí působit moderně a důvěryhodně. Web usnadňuje prezentaci nabídek a podporuje rychlejší kontakt od zájemců.",
    image: realitniMaklerImg,
    previewUrl: "https://domov-snadno.vercel.app/",
  },
  {
    title: "Fitness trenér",
    description:
      "Dynamický web zaměřený na osobní značku trenéra a získávání rezervací. Přehledné sekce, silný vizuál a důraz na výsledky klientů pomáhají zvýšit počet nových zájemců.",
    image: fitnessTrenerImg,
    previewUrl: "https://fitness-trainer-alpha.vercel.app/",
  },
];

const cardsEn: PrototypeCard[] = [
  {
    title: "Financial advisor",
    description:
      "A website built for a professional financial services presentation and trust-building. It explains the offer clearly and brings new clients through high-quality inquiries.",
    image: investicniPoradceImg,
    previewUrl: "https://financni-partner-demo.vercel.app/",
  },
  {
    title: "Real estate agent",
    description:
      "A premium presentation for agents who want to look modern and trustworthy. The site showcases listings clearly and encourages faster contact from prospects.",
    image: realitniMaklerImg,
    previewUrl: "https://domov-snadno.vercel.app/",
  },
  {
    title: "Personal trainer",
    description:
      "A dynamic website focused on the trainer’s personal brand and booking growth. Strong visuals and clear sections help turn visitors into new inquiries.",
    image: fitnessTrenerImg,
    previewUrl: "https://fitness-trainer-alpha.vercel.app/",
  },
];

const PrototypeShowcaseItem = ({
  card,
  linkLabel,
  onPreview,
}: {
  card: PrototypeCard;
  linkLabel: string;
  onPreview: (card: PrototypeCard) => void;
}): JSX.Element => {
  const handleActivate = () => onPreview(card);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleActivate();
    }
  };

  return (
    <article
      className="prototype-item"
      role="button"
      tabIndex={0}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      aria-label={`${card.title} – ${linkLabel}`}
    >
      <h3 className="prototype-item-title">{card.title}</h3>
      <div className="prototype-preview">
        <img src={card.image} alt="" className="prototype-preview-image" aria-hidden="true" />
      </div>
      <p className="prototype-item-desc">{card.description}</p>
      <span className="prototype-item-link">{linkLabel}</span>
    </article>
  );
};

export const PrototypeShowcaseSection = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const t = isEn
    ? {
        heading: "Get a free website design in 3 days",
        subheading:
          "Browse sample prototypes and get a sense of the quality you'll receive free of charge within 3 days. I'll create your design tailored to your business, and if you're happy with it, I'll turn it into a professional website ready to represent your brand at the highest level.",
        cta: "View prototype →",
        closeAria: "Close preview",
        stickyCta: "I want a similar website",
      }
    : {
        heading: "Návrh webu zdarma do 3 dnů",
        subheading:
          "Prohlédněte si ukázkové prototypy a udělejte si představu o kvalitě zpracování, kterou zdarma získáte do 3 dnů. Váš návrh vytvořím na míru vašemu podnikání a pokud budete spokojeni, proměním jej v profesionální web připravený reprezentovat vaši značku na nejvyšší úrovni.",
        cta: "Zobrazit prototyp →",
        closeAria: "Zavřít náhled",
        stickyCta: "Chci podobný web",
      };

  const activeCards = isEn ? cardsEn : cards;
  const [activePreview, setActivePreview] = useState<PrototypeCard | null>(null);
  const [cardsVisible, setCardsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [mobileIdx, setMobileIdx] = useState(0);
  const touchStartX = useRef<number>(0);
  const suppressCardClickRef = useRef(false);
  const SWIPE_THRESHOLD = 50;

  const goTo = (idx: number) => setMobileIdx(Math.max(0, Math.min(activeCards.length - 1, idx)));
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    suppressCardClickRef.current = false;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (Math.abs(e.touches[0].clientX - touchStartX.current) > SWIPE_THRESHOLD) {
      suppressCardClickRef.current = true;
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const delta = touchStartX.current - endX;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      suppressCardClickRef.current = true;
      if (delta > 0) goTo(mobileIdx + 1);
      else goTo(mobileIdx - 1);
    }
  };
  const handlePreview = (card: PrototypeCard) => {
    if (suppressCardClickRef.current) {
      suppressCardClickRef.current = false;
      return;
    }
    setActivePreview(card);
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
      className="prototype-showcase-section"
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
              fontFamily: "'Montserrat', sans-serif",
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
            className="section-sub prototype-section-sub"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: 1.6,
              margin: "0 auto",
            }}
          >
            {t.subheading}
          </p>
        </div>

        <div className="prototype-grid prototype-grid-desktop">
          {activeCards.map((card) => (
            <PrototypeShowcaseItem
              key={card.previewUrl}
              card={card}
              linkLabel={t.cta}
              onPreview={handlePreview}
            />
          ))}
        </div>

        {/* Mobile carousel (one card) */}
        <div className="prototype-mobile-carousel">
          <div style={{ overflow: "hidden", width: "100%" }} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
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
                  key={card.previewUrl}
                  className="prototype-mobile-slide"
                  style={{ flex: `0 0 ${100 / activeCards.length}%`, padding: "0 0 4px", boxSizing: "border-box" }}
                >
                  <PrototypeShowcaseItem card={card} linkLabel={t.cta} onPreview={handlePreview} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "22px" }}>
            {activeCards.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={isEn ? `Go to card ${i + 1}` : `Přejít na kartu ${i + 1}`}
                onClick={() => goTo(i)}
                style={{
                  width: i === mobileIdx ? "36px" : "10px",
                  height: "10px",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  background: i === mobileIdx ? pk.ink : pk.slateTint16,
                  transition: "width 250ms ease, background 250ms ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {activePreview
        ? createPortal(
          <div className="prototype-modal" role="dialog" aria-modal="true" aria-label={activePreview.title}>
            <div className="prototype-modal-backdrop" onClick={() => setActivePreview(null)} />
            <div className="prototype-modal-shell">
              <button
                type="button"
                className="prototype-modal-close"
                onClick={() => setActivePreview(null)}
                aria-label={t.closeAria}
              >
                ×
              </button>
              <div className="prototype-modal-frame-wrap">
                <iframe
                  src={activePreview.previewUrl}
                  title={activePreview.title}
                  className="prototype-modal-frame"
                />
              </div>
              <div className="prototype-modal-cta-bar">
                <button
                  type="button"
                  className="prototype-modal-cta-btn landing-primary-cta"
                  onClick={() => {
                    setActivePreview(null);
                    window.requestAnimationFrame(() => scrollToSectionId("kontakt"));
                  }}
                >
                  {t.stickyCta}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )
        : null}

      <style>{`
        @media (min-width: 901px) {
          .prototype-showcase-section {
            padding-top: 30px !important;
          }
          .prototype-section-sub{
            max-width: 100%;
          }
        }
        .prototype-grid{
          display:grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 32px;
          align-items: start;
        }
        .prototype-mobile-carousel{ display:none; }
        .prototype-item{
          background: transparent;
          border: none;
          border-radius: 0;
          box-shadow: none;
          padding: 0;
          margin: 0;
          display:flex;
          flex-direction:column;
          gap: 16px;
          width: 100%;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          opacity: ${cardsVisible ? 0 : 1};
          animation: ${cardsVisible ? "prototypeItemFadeIn 500ms cubic-bezier(0.2,0.8,0.2,1) forwards" : "none"};
        }
        .prototype-item:hover,
        .prototype-item:focus-visible{
          transform: translateY(-6px);
        }
        .prototype-item:focus-visible{
          outline: 2px solid var(--pk-accent);
          outline-offset: 4px;
        }
        .prototype-item:nth-child(1){ animation-delay: 0ms; }
        .prototype-item:nth-child(2){ animation-delay: 500ms; }
        .prototype-item:nth-child(3){ animation-delay: 1000ms; }
        @keyframes prototypeItemFadeIn{
          from{ opacity: 0; transform: translateY(14px); }
          to{ opacity: 1; transform: translateY(0); }
        }
        .prototype-preview{
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 16 / 9;
          width: 100%;
          box-shadow:
            0 4px 6px rgb(2 6 23 / 0.04),
            0 12px 28px rgb(2 6 23 / 0.08),
            0 24px 48px rgb(2 6 23 / 0.06);
          transition:
            transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .prototype-item:hover .prototype-preview,
        .prototype-item:focus-visible .prototype-preview{
          transform: scale(1.015);
          box-shadow:
            0 8px 16px rgb(2 6 23 / 0.06),
            0 20px 40px rgb(2 6 23 / 0.12),
            0 36px 64px rgb(2 6 23 / 0.1);
        }
        .prototype-preview-image{
          display:block;
          width:100%;
          height:100%;
          object-fit:cover;
          object-position: top center;
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .prototype-item:hover .prototype-preview-image,
        .prototype-item:focus-visible .prototype-preview-image{
          transform: scale(1.04);
        }
        .prototype-item-title{
          margin: 0;
          font-family: "Montserrat", sans-serif;
          font-weight: 800;
          font-size: 20px;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--pk-ink);
          text-align: center;
        }
        .prototype-item-desc{
          margin: 0;
          font-family: "Montserrat", sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 1.65;
          color: var(--pk-ink);
          text-align: center;
        }
        .prototype-item-link{
          align-self: center;
          font-family: "Montserrat", sans-serif;
          font-weight: 800;
          font-size: 14px;
          line-height: 1.65;
          color: var(--pk-ink);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .prototype-modal{
          position: fixed;
          inset: 0;
          z-index: 12000;
          display:flex;
          align-items:center;
          justify-content:center;
          padding: 24px;
          overflow: auto;
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
          width:min(1320px, calc(100% - 48px));
          height:min(84vh, 920px);
          background: var(--pk-page);
          border-radius: 24px;
          overflow:hidden;
          box-shadow: 0 30px 80px var(--pk-slate-tint-28);
          display:flex;
          flex-direction:column;
        }
        .prototype-modal-frame-wrap{
          flex: 1 1 auto;
          min-height: 0;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .prototype-modal-cta-bar{
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 14px 20px 18px;
          background: linear-gradient(to top, var(--pk-page) 60%, transparent);
          border-top: 1px solid var(--pk-slate-tint-10);
          box-shadow: 0 -12px 32px var(--pk-slate-tint-08);
        }
        .prototype-modal-cta-btn{
          border: none;
          border-radius: 12px;
          padding: 12px 28px;
          font-family: "Montserrat", sans-serif;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: transform 200ms ease, filter 200ms ease;
        }
        .prototype-modal-cta-btn:hover{
          transform: translateY(-2px);
          filter: brightness(1.05);
        }
        .prototype-modal-close{
          position:absolute;
          top:14px;
          right:14px;
          z-index:2;
          width:40px;
          height:40px;
          border:none;
          border-radius:999px;
          background: var(--pk-on-dark-94);
          color: var(--pk-ink);
          font-size:28px;
          line-height:1;
          cursor:pointer;
          flex-shrink:0;
          box-shadow: 0 8px 24px var(--pk-slate-tint-16);
        }
        .prototype-modal-frame{
          width:100%;
          flex: 1 1 auto;
          min-height: 0;
          border:none;
          background: var(--pk-page);
        }
        @media (max-width: 1024px){
          .prototype-grid-desktop{ display:none !important; }
          .prototype-mobile-carousel{ display:block !important; }
          .prototype-mobile-slide{ padding-top: 6px; }
          .prototype-mobile-carousel .prototype-item{
            width: min(520px, 100%);
            margin: 0 auto;
          }
        }
        @media (max-width: 768px){
          .prototype-preview{ border-radius: 14px; }
          .prototype-item{ gap: 14px; }
          .prototype-item-title{ font-size: 18px; }
          .prototype-modal{ padding: 12px; }
          .prototype-modal-shell{ height: 88vh; border-radius: 18px; }
        }
        @media (prefers-reduced-motion: reduce){
          .prototype-item{ animation: none !important; opacity: 1 !important; }
          .prototype-item,
          .prototype-preview,
          .prototype-preview-image{
            transition: none !important;
            transform: none !important;
          }
          .prototype-item:hover,
          .prototype-item:focus-visible{
            transform: none !important;
          }
          .prototype-item:hover .prototype-preview,
          .prototype-item:focus-visible .prototype-preview{
            box-shadow:
              0 4px 6px rgb(2 6 23 / 0.04),
              0 12px 28px rgb(2 6 23 / 0.08),
              0 24px 48px rgb(2 6 23 / 0.06);
          }
        }
      `}</style>
    </section>
  );
};
