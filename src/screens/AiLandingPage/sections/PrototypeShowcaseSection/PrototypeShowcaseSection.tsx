import { useEffect, useRef, useState } from "react";
import {
  hasBeenRevealed,
  markRevealedById,
  useInViewOnce,
} from "../../../../hooks/useInViewOnce";

const PROTOTYPE_ENTRANCE_ID = "prototype-showcase-entrance";
const PROTOTYPE_CARD_STAGGER_MS = 250;
const prototypeEntranceTotalMs = (cardCount: number) =>
  PROTOTYPE_CARD_STAGGER_MS * Math.max(0, cardCount - 1);
const PREVIEW_MOBILE_FRAME_WIDTH_PX = 390;
type PreviewViewport = "desktop" | "mobile";
import { createPortal } from "react-dom";
import { Monitor, Smartphone } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext";
import {
  HEADER_CTA_PAD_Y,
  headerPrimaryCtaClassName,
  headerPrimaryCtaStyle,
} from "../../../../design/headerCtaStyle";
import { pk } from "../../../../design/pkLandingColors";
import { scrollToSectionId } from "../../../../utils/scrollToSection";
import companyLogoV4BlackUrl from "../../../../../Images/Company_logo_V4_black.png";
import { PrototypePreviewImage } from "./PrototypePreviewImage";

type PrototypeCard = {
  title: string;
  badge: string;
  description: string;
  imageId: string;
  previewUrl: string;
};

const cards: PrototypeCard[] = [
  {
    title: "Profitherm Solution",
    badge: "Rekonstrukce",
    description:
      "Web zaměřený na dotační programy a rekonstrukce domů na klíč. Jasně vysvětluje služby, buduje důvěru a pomáhá přivádět kvalitní poptávky od majitelů nemovitostí.",
    imageId: "profitherm",
    previewUrl: "https://profithermsolution.cz/",
  },
  {
    title: "Black Beard",
    badge: "Barbershop",
    description:
      "Stylový web pro pánský barbershop s důrazem na atmosféru a řemeslo. Prezentuje služby, ceník a rezervace tak, aby zákazníci snadno našli termín a vraceli se pravidelně.",
    imageId: "black-beard",
    previewUrl: "https://black-beard-chi.vercel.app/",
  },
  {
    title: "Dentio",
    badge: "Zubní ordinace",
    description:
      "Profesionální prezentace pro zubaře a dentální hygienisty. Přehledné služby, moderní vizuál a snadný kontakt pomáhají pacientům rychle objednat termín a posílit důvěru v ordinaci.",
    imageId: "dentio",
    previewUrl: "https://dentio.vercel.app/",
  },
  {
    title: "Jan Novák",
    badge: "Fitness",
    description:
      "Dynamický web zaměřený na osobní značku trenéra a získávání rezervací. Přehledné sekce, silný vizuál a důraz na výsledky klientů pomáhají zvýšit počet nových zájemců.",
    imageId: "jan-novak",
    previewUrl: "https://fitness-trainer-alpha.vercel.app/",
  },
  {
    title: "Váš finanční partner",
    badge: "Finance",
    description:
      "Web vytvořený pro profesionální prezentaci finančních služeb a budování důvěry. Pomáhá jednoduše vysvětlit nabídku a přivádět nové klienty přes kvalitní poptávky.",
    imageId: "vas-financni-partner",
    previewUrl: "https://financni-partner-demo.vercel.app/",
  },
  {
    title: "Osobní makléř",
    badge: "Reality",
    description:
      "Prémiová prezentace pro makléře, kteří chtějí působit moderně a důvěryhodně. Web usnadňuje prezentaci nabídek a podporuje rychlejší kontakt od zájemců.",
    imageId: "osobni-makler",
    previewUrl: "https://domov-snadno.vercel.app/",
  },
];

const cardsEn: PrototypeCard[] = [
  {
    title: "Profitherm Solution",
    badge: "Renovation",
    description:
      "A website focused on grant programs and turnkey home renovations. It explains services clearly, builds trust, and brings quality inquiries from property owners.",
    imageId: "profitherm",
    previewUrl: "https://profithermsolution.cz/",
  },
  {
    title: "Black Beard",
    badge: "Barbershop",
    description:
      "A stylish website for a men’s barbershop with a focus on atmosphere and craft. It showcases services, pricing, and booking so clients find a slot and keep coming back.",
    imageId: "black-beard",
    previewUrl: "https://black-beard-chi.vercel.app/",
  },
  {
    title: "Dentio",
    badge: "Dental",
    description:
      "A professional presentation for dentists and dental hygienists. Clear services, a modern look, and easy contact help patients book faster and trust the practice.",
    imageId: "dentio",
    previewUrl: "https://dentio.vercel.app/",
  },
  {
    title: "Jan Novák",
    badge: "Fitness",
    description:
      "A dynamic website focused on the trainer’s personal brand and booking growth. Strong visuals and clear sections help turn visitors into new inquiries.",
    imageId: "jan-novak",
    previewUrl: "https://fitness-trainer-alpha.vercel.app/",
  },
  {
    title: "Your financial partner",
    badge: "Finance",
    description:
      "A website built for a professional financial services presentation and trust-building. It explains the offer clearly and brings new clients through high-quality inquiries.",
    imageId: "vas-financni-partner",
    previewUrl: "https://financni-partner-demo.vercel.app/",
  },
  {
    title: "Personal broker",
    badge: "Real estate",
    description:
      "A premium presentation for agents who want to look modern and trustworthy. The site showcases listings clearly and encourages faster contact from prospects.",
    imageId: "osobni-makler",
    previewUrl: "https://domov-snadno.vercel.app/",
  },
];

const PrototypeShowcaseMobileCard = ({
  card,
  onPreview,
  priority = false,
}: {
  card: PrototypeCard;
  onPreview: (card: PrototypeCard) => void;
  priority?: boolean;
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
      className="prototype-mobile-card"
      role="button"
      tabIndex={0}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      aria-label={card.title}
    >
      <div className="prototype-mobile-preview">
        <PrototypePreviewImage
          imageId={card.imageId}
          className="prototype-mobile-preview-image"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      </div>
      <div className="prototype-mobile-heading">
        <h3 className="prototype-mobile-title">{card.title}</h3>
        <span className="prototype-item-badge">{card.badge}</span>
      </div>
      <p className="prototype-mobile-body">{card.description}</p>
    </article>
  );
};

const PrototypeShowcaseItem = ({
  card,
  onPreview,
  revealed,
  priority = false,
}: {
  card: PrototypeCard;
  onPreview: (card: PrototypeCard) => void;
  revealed: boolean;
  priority?: boolean;
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
      className={`prototype-item${revealed ? " prototype-item--revealed" : ""}`}
      role="button"
      tabIndex={0}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      aria-label={card.title}
    >
      <div className="prototype-preview">
        <PrototypePreviewImage
          imageId={card.imageId}
          className="prototype-preview-image"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      </div>
      <div className="prototype-item-heading">
        <h3 className="prototype-item-title">{card.title}</h3>
        <span className="prototype-item-badge">{card.badge}</span>
      </div>
      <p className="prototype-item-desc">{card.description}</p>
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
        previewBack: "Back to showcase",
        previewBackShort: "Back",
        viewportDesktop: "Desktop layout",
        viewportMobile: "Mobile layout",
        stickyCta: "I want a similar website",
      }
    : {
        heading: "Návrh webu zdarma do 3 dnů",
        subheading:
          "Prohlédněte si ukázkové prototypy a udělejte si představu o kvalitě zpracování, kterou zdarma získáte do 3 dnů. Váš návrh vytvořím na míru vašemu podnikání a pokud budete spokojeni, proměním jej v profesionální web připravený reprezentovat vaši značku na nejvyšší úrovni.",
        previewBack: "Zpět na ukázky",
        previewBackShort: "Zpět",
        viewportDesktop: "Rozložení pro počítač",
        viewportMobile: "Rozložení pro mobil",
        stickyCta: "Chci podobný web",
      };

  const activeCards = isEn ? cardsEn : cards;
  const [activePreview, setActivePreview] = useState<PrototypeCard | null>(null);
  const [previewViewport, setPreviewViewport] = useState<PreviewViewport>("desktop");
  const [sectionRef, cardsVisible] = useInViewOnce({
    id: "prototype-showcase",
    threshold: 0.38,
    rootMargin: "0px 0px -12% 0px",
  });
  const entranceDone = hasBeenRevealed(PROTOTYPE_ENTRANCE_ID);
  const [revealedCount, setRevealedCount] = useState(
    entranceDone ? activeCards.length : 0,
  );

  useEffect(() => {
    if (!cardsVisible) return;
    if (entranceDone) {
      setRevealedCount(activeCards.length);
      return;
    }

    setRevealedCount(0);
    let timers: number[] = [];
    let doneTimer = 0;
    let cancelled = false;

    const startStagger = () => {
      if (cancelled) return;
      timers = activeCards.map((_, index) =>
        window.setTimeout(
          () => {
            if (!cancelled) setRevealedCount(index + 1);
          },
          index * PROTOTYPE_CARD_STAGGER_MS,
        ),
      );
      doneTimer = window.setTimeout(() => {
        if (!cancelled) markRevealedById(PROTOTYPE_ENTRANCE_ID);
      }, prototypeEntranceTotalMs(activeCards.length));
    };

    const raf = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(startStagger);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      timers.forEach((id) => window.clearTimeout(id));
      window.clearTimeout(doneTimer);
    };
  }, [cardsVisible, entranceDone, activeCards.length]);
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
    setPreviewViewport("desktop");
    setActivePreview(card);
  };

  const closePreview = () => {
    setActivePreview(null);
    setPreviewViewport("desktop");
  };

  useEffect(() => {
    if (!activePreview) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreview();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activePreview]);

  return (
    <section
      ref={sectionRef}
      className="prototype-showcase-section"
      style={{
        width: "100%",
        backgroundColor: pk.page,
        padding: "40px 0 84px",
        marginTop: "-30px",
      }}
    >
      <div className="prototype-showcase-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "42px" }}>
          <h2
            className="pk-section-heading"
            style={{
              margin: "0 auto 18px",
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
          {activeCards.map((card, index) => (
            <PrototypeShowcaseItem
              key={card.previewUrl}
              card={card}
              onPreview={handlePreview}
              revealed={entranceDone || revealedCount > index}
              priority={index < 3}
            />
          ))}
        </div>

        {/* Mobile carousel (one card) */}
        <div className="prototype-mobile-carousel">
          <div className="prototype-mobile-carousel-shadow-room">
          <div
            className="prototype-mobile-track-wrap"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="prototype-carousel-track"
              style={{
                width: `${activeCards.length * 100}%`,
                transform: `translateX(${-mobileIdx * (100 / activeCards.length)}%)`,
              }}
            >
              {activeCards.map((card, index) => (
                <div
                  key={card.previewUrl}
                  className="prototype-mobile-slide"
                  style={{ flex: `0 0 ${100 / activeCards.length}%` }}
                >
                  <PrototypeShowcaseMobileCard
                    card={card}
                    onPreview={handlePreview}
                    priority={index === mobileIdx}
                  />
                </div>
              ))}
            </div>
          </div>
          </div>

          <div className="prototype-mobile-dots" role="tablist" aria-label={isEn ? "Prototype slides" : "Prototypy"}>
            {activeCards.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === mobileIdx}
                aria-label={isEn ? `Go to card ${i + 1}` : `Přejít na kartu ${i + 1}`}
                className="prototype-mobile-dot"
                data-active={i === mobileIdx ? "true" : "false"}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {activePreview
        ? createPortal(
          <div
            className="prototype-preview-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={activePreview.title}
          >
            <header className="prototype-preview-bar">
              <nav className="prototype-preview-nav" aria-label={isEn ? "Prototype preview" : "Náhled prototypu"}>
                <div className="prototype-preview-brand">
                  <button
                    type="button"
                    className="prototype-preview-logo-btn"
                    onClick={closePreview}
                    aria-label={isEn ? "Close preview" : "Zavřít náhled"}
                  >
                    <img
                      src={companyLogoV4BlackUrl}
                      alt="PK Digital"
                      className="prototype-preview-logo"
                    />
                  </button>
                </div>

                <div className="prototype-preview-center">
                  <p className="prototype-preview-title">{activePreview.title}</p>
                  <div
                    className="prototype-preview-viewport"
                    role="group"
                    aria-label={isEn ? "Preview device width" : "Šířka náhledu"}
                  >
                    <button
                      type="button"
                      className="prototype-preview-viewport-btn"
                      aria-pressed={previewViewport === "desktop"}
                      aria-label={t.viewportDesktop}
                      onClick={() => setPreviewViewport("desktop")}
                    >
                      <Monitor size={18} strokeWidth={2} aria-hidden />
                    </button>
                    <button
                      type="button"
                      className="prototype-preview-viewport-btn"
                      aria-pressed={previewViewport === "mobile"}
                      aria-label={t.viewportMobile}
                      onClick={() => setPreviewViewport("mobile")}
                    >
                      <Smartphone size={18} strokeWidth={2} aria-hidden />
                    </button>
                  </div>
                </div>

                <div className="prototype-preview-actions">
                  <button
                    type="button"
                    className="prototype-preview-back"
                    onClick={closePreview}
                  >
                    <span className="prototype-preview-back-label prototype-preview-back-label--full">
                      {t.previewBack}
                    </span>
                    <span className="prototype-preview-back-label prototype-preview-back-label--short">
                      {t.previewBackShort}
                    </span>
                  </button>
                  <button
                    type="button"
                    className={`prototype-preview-cta landing-primary-cta ${headerPrimaryCtaClassName}`}
                    style={headerPrimaryCtaStyle}
                    onClick={() => {
                      closePreview();
                      window.requestAnimationFrame(() => scrollToSectionId("kontakt"));
                    }}
                  >
                    {t.stickyCta}
                  </button>
                </div>
              </nav>
            </header>
            <div
              className={`prototype-preview-scroll${previewViewport === "mobile" ? " prototype-preview-scroll--device-mobile" : ""}`}
            >
              <div
                className={`prototype-preview-stage${previewViewport === "mobile" ? " prototype-preview-stage--device-mobile" : ""}`}
              >
                <iframe
                  src={activePreview.previewUrl}
                  title={activePreview.title}
                  className="prototype-preview-frame"
                />
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
        }
        @media (min-width: 901px) {
          .prototype-grid-desktop .prototype-item{
            opacity: 0;
            transform: translate3d(0, 16px, 0);
            pointer-events: none;
            will-change: opacity, transform;
            transition:
              opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .prototype-grid-desktop .prototype-item.prototype-item--revealed{
            opacity: 1;
            transform: translate3d(0, 0, 0);
            pointer-events: auto;
          }
          .prototype-grid-desktop .prototype-item.prototype-item--revealed:hover,
          .prototype-grid-desktop .prototype-item.prototype-item--revealed:focus-visible{
            transform: translate3d(0, -6px, 0);
          }
        }
        @media (max-width: 900px) {
          .prototype-item:hover,
          .prototype-item:focus-visible{
            transform: translateY(-6px);
          }
        }
        .prototype-item:focus-visible{
          outline: 2px solid var(--pk-accent);
          outline-offset: 4px;
        }
        .prototype-preview{
          position: relative;
          isolation: isolate;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 16 / 9;
          width: 100%;
          max-height: none;
          background: rgb(15 23 42 / 0.04);
          box-shadow:
            0 1px 0 rgb(255 255 255 / 0.65) inset,
            0 4px 6px rgb(2 6 23 / 0.04),
            0 12px 28px rgb(2 6 23 / 0.08);
          transition:
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .prototype-item:hover .prototype-preview,
        .prototype-item:focus-visible .prototype-preview{
          transform: translateZ(0) scale(1.012);
          box-shadow:
            0 1px 0 rgb(255 255 255 / 0.7) inset,
            0 8px 16px rgb(2 6 23 / 0.06),
            0 20px 40px rgb(2 6 23 / 0.1);
        }
        .prototype-preview-image{
          display: block;
          width: 100%;
          height: 100%;
          max-width: none;
          object-fit: cover;
          object-position: top center;
          image-rendering: auto;
          -webkit-font-smoothing: antialiased;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .prototype-item-heading{
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
        }
        .prototype-item-title{
          margin: 0;
          font-family: "Montserrat", sans-serif;
          font-weight: 800;
          font-size: 20px;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--pk-ink);
          text-align: left;
          flex: 1 1 auto;
          min-width: 0;
        }
        .prototype-item-badge{
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 12px;
          border-radius: 999px;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 12px;
          line-height: 1;
          letter-spacing: 0.02em;
          color: var(--pk-ink);
          background: var(--pk-slate-tint-06);
          border: 1px solid var(--pk-slate-tint-16);
          white-space: nowrap;
        }
        .prototype-item-desc{
          margin: 0;
          font-family: "Montserrat", sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 1.65;
          color: var(--pk-ink);
          text-align: left;
        }
        .prototype-preview-overlay{
          position: fixed;
          inset: 0;
          z-index: 12000;
          width: 100vw;
          max-width: 100vw;
          height: 100vh;
          height: 100dvh;
          margin: 0;
          padding: 0;
          border: none;
          border-radius: 0;
          box-shadow: none;
          background: var(--pk-page);
          display: grid;
          grid-template-rows: auto minmax(0, 1fr);
          overflow: hidden;
        }
        .prototype-preview-bar{
          position: sticky;
          top: 0;
          z-index: 3;
          flex: 0 0 auto;
          width: 100%;
          background: var(--pk-page);
          border-bottom: 1px solid rgb(15 23 42 / 0.05);
          box-shadow: 0 1px 0 rgb(15 23 42 / 0.05);
        }
        .prototype-preview-nav{
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px 20px;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 15px 24px;
          box-sizing: border-box;
        }
        .prototype-preview-brand,
        .prototype-preview-actions{
          flex: 0 0 auto;
          display: flex;
          align-items: center;
        }
        .prototype-preview-logo-btn{
          display: block;
          border: none;
          padding: 0;
          margin: 0;
          background: transparent;
          cursor: pointer;
          border-radius: 6px;
        }
        .prototype-preview-logo-btn:focus-visible{
          outline: 2px solid var(--pk-accent);
          outline-offset: 3px;
        }
        .prototype-preview-logo{
          display: block;
          height: 59.2px;
          width: auto;
        }
        .prototype-preview-center{
          flex: 1 1 auto;
          min-width: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 0 12px;
        }
        .prototype-preview-title{
          margin: 0;
          max-width: 100%;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: clamp(14px, 1.6vw, 17px);
          line-height: 1.25;
          letter-spacing: -0.02em;
          color: var(--pk-ink);
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .prototype-preview-viewport{
          display: inline-flex;
          align-items: center;
          gap: 2px;
          padding: 3px;
          border-radius: 10px;
          border: 1px solid var(--pk-slate-tint-10);
          background: var(--pk-slate-tint-08);
        }
        .prototype-preview-viewport-btn{
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 34px;
          border: none;
          border-radius: 8px;
          padding: 0;
          background: transparent;
          color: var(--pk-ink);
          cursor: pointer;
          transition: background 180ms ease, color 180ms ease, box-shadow 180ms ease;
        }
        .prototype-preview-viewport-btn:hover{
          color: var(--pk-brand-4);
        }
        .prototype-preview-viewport-btn[aria-pressed="true"]{
          background: var(--pk-page);
          color: var(--pk-brand-4);
          box-shadow: 0 2px 10px rgb(2 6 23 / 0.08);
        }
        .prototype-preview-viewport-btn:focus-visible{
          outline: 2px solid var(--pk-accent);
          outline-offset: 2px;
        }
        .prototype-preview-actions{
          gap: 10px;
        }
        .prototype-preview-back{
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          border: 1px solid var(--pk-slate-tint-10);
          border-radius: 12px;
          padding: ${HEADER_CTA_PAD_Y}px 16px;
          background: var(--pk-page);
          color: var(--pk-ink);
          font-family: "Montserrat", sans-serif;
          font-weight: 600;
          font-size: 16px;
          line-height: 1.2;
          letter-spacing: 0.01em;
          cursor: pointer;
          white-space: nowrap;
          transition: background 200ms ease, border-color 200ms ease, transform 200ms ease;
        }
        .prototype-preview-back:hover{
          border-color: var(--pk-slate-tint-16);
          transform: translateY(-1px);
        }
        .prototype-preview-back:focus-visible{
          outline: 2px solid var(--pk-accent);
          outline-offset: 2px;
        }
        .prototype-preview-back-label--short{
          display: none;
        }
        .prototype-preview-scroll{
          min-height: 0;
          width: 100%;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
          background: var(--pk-page);
        }
        .prototype-preview-scroll--device-mobile{
          background: var(--pk-slate-tint-08);
        }
        .prototype-preview-stage{
          width: 100%;
          min-height: 100%;
          height: 100%;
        }
        .prototype-preview-stage--device-mobile{
          width: min(${PREVIEW_MOBILE_FRAME_WIDTH_PX}px, 100%);
          margin: 0 auto;
          min-height: 100%;
          background: var(--pk-page);
          box-shadow:
            0 0 0 1px var(--pk-slate-tint-10),
            0 18px 48px rgb(2 6 23 / 0.08);
        }
        .prototype-preview-frame{
          display: block;
          width: 100%;
          height: 100%;
          min-height: 100%;
          border: none;
          margin: 0;
          padding: 0;
          background: var(--pk-page);
        }
        @media (max-width: 1024px){
          .prototype-showcase-section{
            overflow: visible;
          }
          .prototype-showcase-inner{
            overflow: visible;
          }
          .prototype-grid-desktop{ display:none !important; }
          .prototype-mobile-carousel{
            display:block !important;
            width: 100%;
            max-width: min(520px, 100%);
            margin: 0 auto;
            padding: 0;
            overflow: visible;
          }
          .prototype-mobile-carousel-shadow-room{
            width: 100%;
            overflow: hidden;
          }
          .prototype-mobile-track-wrap{
            overflow: hidden;
            width: 100%;
            padding: 16px 0 20px;
            box-sizing: border-box;
          }
          .prototype-carousel-track{
            display: flex;
            align-items: stretch;
            transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          .prototype-mobile-slide{
            box-sizing: border-box;
            min-width: 0;
            padding: 0 14px;
          }
          .prototype-mobile-card{
            display: flex;
            flex-direction: column;
            width: 100%;
            margin: 0;
            padding: 14px;
            box-sizing: border-box;
            background: var(--pk-page);
            border: 1px solid rgb(15 23 42 / 0.07);
            border-radius: 16px;
            box-shadow:
              0 1px 2px rgb(15 23 42 / 0.05),
              0 4px 12px rgb(15 23 42 / 0.07);
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            text-align: left;
          }
          .prototype-mobile-card:focus-visible{
            outline: 2px solid var(--pk-accent);
            outline-offset: 3px;
          }
          .prototype-mobile-preview{
            position: relative;
            isolation: isolate;
            width: 100%;
            border-radius: 12px;
            overflow: hidden;
            aspect-ratio: 16 / 9;
            margin: 0 0 12px;
            background: rgb(15 23 42 / 0.04);
            box-shadow:
              0 1px 0 rgb(255 255 255 / 0.6) inset,
              inset 0 0 0 1px rgb(15 23 42 / 0.05);
          }
          .prototype-mobile-preview-image{
            display: block;
            width: 100%;
            height: 100%;
            max-width: none;
            object-fit: cover;
            object-position: top center;
            image-rendering: auto;
            transform: translateZ(0);
            backface-visibility: hidden;
          }
          .prototype-mobile-heading{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            margin: 0 0 8px;
          }
          .prototype-mobile-title{
            margin: 0;
            font-family: "Montserrat", sans-serif;
            font-weight: 800;
            font-size: 17px;
            line-height: 1.25;
            letter-spacing: -0.02em;
            color: var(--pk-ink);
            flex: 1 1 auto;
            min-width: 0;
            text-align: left;
          }
          .prototype-mobile-body{
            margin: 0;
            font-family: "Montserrat", sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 1.55;
            color: var(--pk-ink);
          }
          .prototype-mobile-dots{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin-top: 12px;
            padding: 0 8px;
          }
          .prototype-mobile-dot{
            width: 10px;
            height: 10px;
            border-radius: 999px;
            border: none;
            padding: 0;
            cursor: pointer;
            background: var(--pk-slate-tint-16);
            transition: width 250ms ease, background 250ms ease;
          }
          .prototype-mobile-dot[data-active="true"]{
            width: 36px;
            background: var(--pk-ink);
          }
        }
        @media (max-width: 768px){
          .prototype-preview{ border-radius: 14px; }
          .prototype-item{ gap: 14px; }
          .prototype-item-title{ font-size: 18px; }
          .prototype-mobile-card{
            padding: 12px;
            border-radius: 14px;
          }
          .prototype-showcase-inner{
            padding-left: 18px;
            padding-right: 18px;
          }
          .prototype-mobile-track-wrap{
            padding: 14px 0 18px;
          }
          .prototype-mobile-slide{
            padding: 0 12px;
          }
          .prototype-mobile-title{ font-size: 16px; }
          .prototype-mobile-body{ font-size: 13px; line-height: 1.5; }
          .prototype-preview-brand{
            display: none !important;
          }
          .prototype-preview-center{
            display: none;
          }
          .prototype-preview-viewport{
            display: none !important;
          }
          .prototype-preview-nav{
            padding: 15px 20px;
            gap: 10px;
            justify-content: space-between;
          }
          .prototype-preview-actions{
            flex: 1 1 auto;
            min-width: 0;
            width: 100%;
            margin-left: 0;
            justify-content: space-between;
            gap: 10px;
          }
          .prototype-preview-back-label--full{
            display: none;
          }
          .prototype-preview-back-label--short{
            display: inline;
          }
          .prototype-preview-back{
            flex-shrink: 0;
            font-size: 14px;
            padding: ${HEADER_CTA_PAD_Y}px 14px;
          }
          .prototype-preview-cta{
            flex-shrink: 0;
            margin-left: 0;
            max-width: none;
            font-size: 13px !important;
            padding: ${HEADER_CTA_PAD_Y}px 14px !important;
            white-space: nowrap;
          }
        }
        @media (min-width: 768px){
          .prototype-preview-logo{
            height: 66px;
          }
        }
        @media (prefers-reduced-motion: reduce){
          .prototype-grid-desktop .prototype-item{
            opacity: 1 !important;
            pointer-events: auto !important;
          }
          .prototype-item,
          .prototype-preview{
            transition: none !important;
            transform: none !important;
          }
          .prototype-preview-image{
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
