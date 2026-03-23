import { useEffect, useRef, useState, type TouchEvent } from "react";
import { SectionDivider } from "../../components/SectionDivider";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../i18n/LanguageContext";
import pcFrameUrl from "../../../../../Images/PC_frame.png";
import tvorbaWebuUrl from "../../../../../Images/Tvorba webu.png";
import aiBotUrl from "../../../../../Images/AI bot.png";
import modernizaceBeforeUrl from "../../../../../Images/Modernizace/Before.png";
import modernizaceAfterUrl from "../../../../../Images/Modernizace/After.png";

type BeforeAfter = {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
  /** One-time demo: on first viewport entry, nudge slider right → left → center */
  introDemo?: boolean;
};

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const BeforeAfterSlider = ({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  introDemo = false,
}: BeforeAfter): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(55);
  const [dragging, setDragging] = useState(false);
  const [introRunning, setIntroRunning] = useState(false);
  const introPlayedRef = useRef(false);

  const transitionStyle =
    dragging || !introRunning
      ? "none"
      : "clip-path 0.65s cubic-bezier(0.4, 0, 0.2, 1), left 0.65s cubic-bezier(0.4, 0, 0.2, 1)";

  useEffect(() => {
    if (!introDemo || introPlayedRef.current) return;
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      introPlayedRef.current = true;
      return;
    }

    let cancelled = false;
    const runIntro = async () => {
      const center = 55;
      const right = 78;
      const left = 28;
      introPlayedRef.current = true;
      setIntroRunning(true);
      await sleep(450);
      if (cancelled) return;
      setPos(right);
      await sleep(780);
      if (cancelled) return;
      setPos(left);
      await sleep(780);
      if (cancelled) return;
      setPos(center);
      await sleep(720);
      if (!cancelled) setIntroRunning(false);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.12) return;
        obs.disconnect();
        void runIntro();
      },
      { threshold: [0, 0.12, 0.25], rootMargin: "0px" },
    );
    obs.observe(el);
    return () => {
      cancelled = true;
      obs.disconnect();
    };
  }, [introDemo]);

  const updateFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => updateFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [dragging]);

  return (
    <div
      ref={ref}
      className="offer-before-after-slider"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        touchAction: introRunning ? "none" : "none",
        cursor: dragging ? "ew-resize" : "default",
        userSelect: "none",
        pointerEvents: introRunning ? "none" : "auto",
      }}
      aria-label="Před/po porovnání"
      role="group"
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
      onPointerDown={(e) => {
        if (introRunning) return;
        e.preventDefault();
        setDragging(true);
        updateFromClientX(e.clientX);
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }}
      onPointerMove={(e) => {
        if (!dragging) return;
        updateFromClientX(e.clientX);
      }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <img
        src={beforeSrc}
        alt={beforeLabel}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center top",
          display: "block",
          pointerEvents: "none",
        }}
      />

      {/* Overlay: after image (clipped) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          overflow: "hidden",
          /* Keep image size stable: we only clip what part is visible. */
          clipPath: `inset(0 0 0 ${pos}%)`,
          transition: transitionStyle,
        }}
      >
        <img
          src={afterSrc}
          alt={afterLabel}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center top",
            display: "block",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Divider line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${pos}%`,
          width: 2,
          transform: "translateX(-1px)",
          background: "rgba(0,229,255,0.65)",
          boxShadow: "0 0 28px rgba(0,229,255,0.25)",
          pointerEvents: "none",
          zIndex: 5,
          transition: transitionStyle,
        }}
      />

      {/* Handle */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: `${pos}%`,
          transform: "translate(-50%, -50%)",
          transition: transitionStyle,
          width: 44,
          height: 44,
          borderRadius: 999,
          background: "rgba(13,13,13,0.72)",
          border: "1px solid rgba(0,229,255,0.25)",
          boxShadow: "0 0 28px rgba(0,229,255,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          backdropFilter: "blur(8px)",
          zIndex: 6,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(0,229,255,0.95)"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="14 7 9 12 14 17" />
          </svg>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(0,229,255,0.95)"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="10 7 15 12 10 17" />
          </svg>
        </div>
      </div>
    </div>
  );
};

type Slide = {
  id: string;
  title: string;
  description: string;
  /** Optional line above the bullet list (e.g. AI card) */
  featuresSubheading?: string;
  features: string[];
  cta: string;
  image?: string;
  beforeAfter?: BeforeAfter;
};

const slides: Slide[] = [
  {
    id: "tvorba-webu",
    title: "Tvorba webových stránek",
    description:
      "Moderní web, který jasně komunikuje vaši hodnotu, získává zákazníky a je připravený na růst s vaším podnikáním.",
    features: [
      "Konzultace a návrh webu zdarma",
      "Standardní dodání do 14 dnů",
      "Design zaměřený pro konverze",
      "Optimalizováno na mobil i počítač",
      "Jednoduchá správa bez vývojáře",
    ],
    cta: "Chci web",
    image: tvorbaWebuUrl,
  },
  {
    id: "upgrade-webu",
    title: "Modernizace stránek",
    description:
      "Kompletní modernizace vašeho stávajícího webu — nový design, vyšší rychlost, lepší konverze.",
    features: [
      "Audit webu a identifikace slabých míst",
      "Silnější značka díky modernímu designu",
      "Rychlejší web s dopadem na SEO i výkon",
      "Stabilní řešení připravené na růst",
      "Jednoduchá budoucí správa webu",
    ],
    cta: "Chci modernizaci",
    beforeAfter: {
      beforeSrc: modernizaceBeforeUrl,
      afterSrc: modernizaceAfterUrl,
      beforeLabel: "Před",
      afterLabel: "Po",
      introDemo: true,
    },
  },
  {
    id: "automatizace-ai",
    title: "Automatizace a AI agenti",
    description: "Získejte více zákazníků a snižte náklady díky chytré automatizaci",
    features: [
      "Eliminace rutinní práce",
      "Okamžité zpracování požadavků",
      "Snížení nákladů až o desítky %",
      "Zvýšení konverzí a kvality leadů",
      "Škálování bez navyšování týmu",
    ],
    cta: "Chci automatizaci",
    image: aiBotUrl,
  },
];

const slidesEn: Slide[] = [
  {
    id: "tvorba-webu",
    title: "Website Development",
    description:
      "A modern website that clearly communicates your value, gains customers, and is ready to grow with your business.",
    features: [
      "Free consultation and website concept",
      "Standard delivery within 14 days",
      "Conversion-focused design",
      "Optimized for mobile and desktop",
      "Easy management without a developer",
    ],
    cta: "I want a website",
    image: tvorbaWebuUrl,
  },
  {
    id: "upgrade-webu",
    title: "Website Modernization",
    description:
      "Complete modernization of your existing website - new design, higher speed, and better conversions.",
    features: [
      "Website audit and weak-point identification",
      "Stronger brand through modern design",
      "Faster website with SEO and performance impact",
      "Stable solution prepared for growth",
      "Easy future website management",
    ],
    cta: "I want modernization",
    beforeAfter: {
      beforeSrc: modernizaceBeforeUrl,
      afterSrc: modernizaceAfterUrl,
      beforeLabel: "Before",
      afterLabel: "After",
      introDemo: true,
    },
  },
  {
    id: "automatizace-ai",
    title: "Automation and AI Agents",
    description: "Get more customers and reduce costs with smart automation",
    features: [
      "Eliminate routine work",
      "Immediate request processing",
      "Reduce costs by tens of percent",
      "Increase conversions and lead quality",
      "Scale without expanding your team",
    ],
    cta: "I want automation",
    image: aiBotUrl,
  },
];

export const CoNabizimeSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 50;
  const isEn = language === "en";
  const activeSlides = isEn ? slidesEn : slides;

  const activeSlide = activeSlides[activeIdx];

  const goTo = (idx: number) => {
    setActiveIdx(Math.max(0, Math.min(activeSlides.length - 1, idx)));
  };

  const isBeforeAfterSliderTarget = (target: EventTarget | null) =>
    target instanceof Element && Boolean(target.closest(".offer-before-after-slider"));

  const onTouchStart = (e: TouchEvent) => {
    if (isBeforeAfterSliderTarget(e.target)) {
      touchStartX.current = null;
      return;
    }
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const delta = touchStartX.current - endX;
    touchStartX.current = null;
    if (delta > SWIPE_THRESHOLD) goTo(activeIdx + 1);
    else if (delta < -SWIPE_THRESHOLD) goTo(activeIdx - 1);
  };

  return (
    <section
      id="co-nabizime"
      style={{
        width: "100%",
        backgroundColor: "transparent",
        padding: "80px 0 100px",
        marginTop: "-50px",
        marginBottom: "-50px",
      }}
    >
      <SectionDivider />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div className="offer-head" style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 700,
              fontSize: "clamp(32px,4.5vw,52px)",
              lineHeight: 1.1,
              color: "#fff",
              margin: "0 auto 20px",
              letterSpacing: "-0.02em",
              maxWidth: "770px",
            }}
          >
            {isEn ? "What we " : "Co "}
            <span
              style={{
                background: "linear-gradient(135deg,#E040FB,#00E5FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {isEn ? "offer" : "nabízíme"}
            </span>
          </h2>
          <p
            className="section-sub offer-subheading"
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.65)",
              margin: "0 auto",
            }}
          >
            {isEn
              ? "From building a new website to visual redesign and AI deployment - solutions for startups and growing businesses."
              : "Od vytvoření nového webu přes vizuální redesign až po nasazení AI nástrojů – řešení pro začínající podnikatele i rostoucí firmy."}
          </p>
        </div>

        <div className="offer-carousel" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="offer-carousel-viewport" aria-label={isEn ? "What we offer carousel" : "Carousel Co nabízíme"}>
            <div
              className="offer-carousel-track"
              style={{ transform: `translateX(${-activeIdx * 100}%)` }}
            >
              {activeSlides.map((slide) => (
                <div key={slide.id} className="offer-slide">
                  <div className="offer-premium-card">
                    <div className="offer-premium-card-inner">
                      {/* Minimal ambient lights (gentle, premium, non-distracting) */}
                      <div className="offer-ambient-lights" aria-hidden="true">
                        <div className="offer-blob offer-blob--a" />
                        <div className="offer-blob offer-blob--b" />
                        <div className="offer-blob offer-blob--c" />
                      </div>

                      <div className="offer-gallery-grid">
                        {/* Left: text */}
                        <div className="offer-gallery-left">
                          <div className="offer-left-copy">
                            <div className="offer-title-wrap">
                              <h3 className="offer-title offer-title-large">{slide.title}</h3>
                              <div className="offer-title-underline" aria-hidden="true" />
                            </div>

                            <p className="offer-desc">{slide.description}</p>

                            {slide.featuresSubheading ? (
                              <p className="offer-features-subheading">{slide.featuresSubheading}</p>
                            ) : null}

                            <ul className="offer-bullets">
                              {slide.features.map((f) => (
                                <li key={f}>{f}</li>
                              ))}
                            </ul>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              navigate("/napiste-nam");
                              setTimeout(() => {
                                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                              }, 180);
                            }}
                            className="offer-cta animate-pulse-glow hero-primary-btn"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                              fontWeight: 600,
                              fontSize: "16px",
                              letterSpacing: "0",
                            }}
                          >
                            {slide.cta}
                          </button>
                        </div>

                        {/* Right: notebook/monitor visualization */}
                        <div className="offer-gallery-right">
                          {slide.id === "tvorba-webu" || slide.id === "automatizace-ai" ? (
                            <div
                              className={`offer-simple-media${slide.id === "automatizace-ai" ? " offer-simple-media--ai-bot" : ""}`}
                            >
                              <img
                                src={slide.image}
                                alt={slide.title}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: slide.id === "automatizace-ai" ? "contain" : "cover",
                                  objectPosition: "center",
                                  display: "block",
                                }}
                              />
                            </div>
                          ) : (
                            <div className="notebook">
                              <div className="notebook-screen">
                                <img
                                  className="notebook-frame-img"
                                  src={pcFrameUrl}
                                  alt=""
                                  aria-hidden="true"
                                />
                                <div className="notebook-screen-inner" aria-hidden="true">
                                  {slide.beforeAfter ? (
                                    <BeforeAfterSlider {...slide.beforeAfter} />
                                  ) : (
                                    <img
                                      src={slide.image}
                                      alt={slide.title}
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        objectPosition: "center top",
                                        display: "block",
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="offer-carousel-controls">
            <button
              type="button"
              className="offer-nav-btn"
              aria-label={isEn ? "Previous" : "Předchozí"}
              onClick={() => goTo(activeIdx - 1)}
              style={{ opacity: activeIdx === 0 ? 0.35 : 1 }}
            >
              ←
            </button>

            <div className="offer-carousel-dots" aria-label={isEn ? "Card selection" : "Volba karty"}>
              {activeSlides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className={`offer-dot ${i === activeIdx ? "offer-dot-active" : ""}`}
                  aria-label={isEn ? `Card ${i + 1}` : `Karta ${i + 1}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>

            <button
              type="button"
              className="offer-nav-btn"
              aria-label={isEn ? "Next" : "Další"}
              onClick={() => goTo(activeIdx + 1)}
              style={{ opacity: activeIdx === activeSlides.length - 1 ? 0.35 : 1 }}
            >
              →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .offer-carousel{
          width: 100%;
          display:flex;
          flex-direction:column;
          gap: 24px;
        }

        .offer-carousel-viewport{
          width: 100%;
          overflow: hidden;
        }

        .offer-carousel-track{
          display:flex;
          width: 100%;
          transition: transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1);
          will-change: transform;
        }

        .offer-slide{
          flex: 0 0 100%;
          display: flex;
          flex-direction: column;
          /* Height from content + media aspect-ratio (no vh clamp — avoids jump below laptop) */
          min-height: auto;
        }

        .offer-premium-card{
          border-radius: 28px;
          padding: 1px;
          background: linear-gradient(90deg, rgba(0,229,255,0.45) 0%, rgba(224,64,251,0.26) 100%);
          box-shadow: 0 0 60px rgba(0,229,255,0.08);
          flex: 0 1 auto;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .offer-premium-card-inner{
          border-radius: 27px;
          background:
            radial-gradient(ellipse at 25% 0%, rgba(0,229,255,0.055) 0%, transparent 45%),
            radial-gradient(ellipse at 85% 25%, rgba(224,64,251,0.045) 0%, transparent 42%),
            linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.36) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 15px 28px;
          position: relative;
          overflow: hidden;
          isolation: isolate;
          flex: 0 1 auto;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        /* Guaranteed dark fade above card background, below content */
        .offer-premium-card-inner::before{
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0,0,0,0.42) 0%,
            rgba(0,0,0,0.46) 55%,
            rgba(0,0,0,0.52) 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        .offer-premium-card-inner > *{
          position: relative;
          z-index: 2;
        }

        .offer-ambient-lights{
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .offer-blob{
          position: absolute;
          width: clamp(300px, 38vw, 560px);
          height: clamp(300px, 38vw, 560px);
          border-radius: 9999px;
          filter: blur(120px);
          opacity: 0.12;
          transform: translate3d(0,0,0);
          background: radial-gradient(circle at 30% 30%, rgba(0,194,255,0.18) 0%, rgba(0,194,255,0) 62%);
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        .offer-blob--a{
          left: -8%;
          top: 10%;
          opacity: 0.08;
          background: radial-gradient(circle at 30% 30%, rgba(0,194,255,0.18) 0%, rgba(0,194,255,0) 62%);
          animation-name: offerBlobMoveA;
          animation-duration: 34s;
        }

        .offer-blob--b{
          left: 36%;
          top: -18%;
          opacity: 0.05;
          background: radial-gradient(circle at 30% 30%, rgba(74,222,128,0.16) 0%, rgba(74,222,128,0) 62%);
          animation-name: offerBlobMoveB;
          animation-duration: 40s;
        }

        .offer-blob--c{
          left: 52%;
          top: 45%;
          opacity: 0.06;
          background: radial-gradient(circle at 30% 30%, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0) 62%);
          animation-name: offerBlobMoveC;
          animation-duration: 28s;
        }

        @keyframes offerBlobMoveA{
          0%{ transform: translate3d(0px, 0px, 0) scale(1); }
          50%{ transform: translate3d(18px, -14px, 0) scale(1.02); }
          100%{ transform: translate3d(0px, 0px, 0) scale(1); }
        }
        @keyframes offerBlobMoveB{
          0%{ transform: translate3d(0px, 0px, 0) scale(1); }
          50%{ transform: translate3d(-22px, 16px, 0) scale(1.02); }
          100%{ transform: translate3d(0px, 0px, 0) scale(1); }
        }
        @keyframes offerBlobMoveC{
          0%{ transform: translate3d(0px, 0px, 0) scale(1); }
          50%{ transform: translate3d(14px, 18px, 0) scale(1.02); }
          100%{ transform: translate3d(0px, 0px, 0) scale(1); }
        }

        .offer-card-swap{
          animation: offerSwap 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        @keyframes offerSwap{
          from { opacity: 0; transform: translateY(10px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .offer-gallery-grid{
          display:flex;
          gap: 8px;
          align-items: center;
          flex: 0 1 auto;
          min-height: 0;
        }

        .offer-gallery-left{
          flex: 1 1 35%;
          min-width: 0;
          padding: 40px 0;
        }

        .offer-left-copy{
          width: 100%;
        }

        @media(min-width:901px){
          .offer-gallery-grid{
            align-items: stretch;
          }
          .offer-gallery-left{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            align-self: stretch;
            min-height: 0;
            flex: 1 1 35%;
            justify-content: flex-start;
          }
          .offer-left-copy{
            flex: 0 1 auto;
            align-self: stretch;
            text-align: left;
          }
          .offer-title-wrap{
            text-align: left;
            width: 100%;
          }
          .offer-desc{
            text-align: left;
          }
          .offer-bullets{
            text-align: left;
            margin-bottom: 0;
          }
          .offer-cta{
            margin-top: auto;
            align-self: flex-start;
          }
        }

        .offer-gallery-right{
          flex: 1 1 75%;
          min-width: 0;
          display:flex;
          align-items:center;
          justify-content:center;
          padding: 5px 0;
        }

        .offer-simple-media{
          width: 100%;
          aspect-ratio: 6 / 4;
          border-radius: 0;
          overflow: hidden;
          border: none;
          box-shadow: none;
          background: transparent;
        }

        /* AI card: single asset only — no frame, no extra chrome */
        .offer-simple-media--ai-bot{
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
        }

        /* kebab-case required — camelCase is ignored in plain <style> (was blocking font-weight) */
        h3.offer-title,
        .offer-title{
          font-family: "Space Grotesk", sans-serif;
          font-weight: 700;
          color: #fff;
          margin: 0;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }

        .offer-title-large{
          font-size: 28px !important;
          line-height: 1.08;
          display: inline-block;
        }

        .offer-title-wrap{
          display: inline-block;
        }

        .offer-title-underline{
          width: 100%;
          height: 2px;
          margin: 12px 0 18px;
          background: linear-gradient(90deg, rgba(0,229,255,0.95), rgba(224,64,251,0.65));
          border-radius: 999px;
        }

        .offer-desc{
          font-family: "Space Grotesk", sans-serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255,255,255,0.72);
          margin: 0 0 18px;
        }

        .offer-features-subheading{
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 15px;
          line-height: 1.45;
          color: rgba(255,255,255,0.9);
          margin: 0 0 10px;
        }

        .offer-bullets{
          margin: 0 0 22px;
          padding-left: 20px;
          list-style: disc;
        }
        .offer-bullets li{
          margin: 10px 0;
          font-family: "Space Grotesk", sans-serif;
          font-weight: 500;
          font-size: 13px;
          line-height: 1.45;
          color: rgba(255,255,255,0.86);
        }

        .offer-cta{
          background: linear-gradient(135deg, #0ABDC6 0%, #00E5FF 100%);
          color: #070B14;
          border: none;
          border-radius: 12px;
          padding: 15px 32px;
          font-family: "Space Grotesk", sans-serif;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: filter 0.25s ease, transform 0.25s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .offer-cta:hover{
          filter: brightness(1.1);
          transform: translateY(-2px);
        }

        /* Notebook (monitor) mock */
        .notebook{
          width: 100%;
          display:flex;
          align-items:center;
          justify-content:center;
          transform: scale(1.3);
          transform-origin: center;
        }

        .notebook-screen{
          position:relative;
          width: 100%;
          aspect-ratio: 6 / 4;
          border-radius: 18px;
          overflow:hidden;
          transform: none;
          box-shadow: none;
          border: none;
          background: transparent;
        }

        .notebook-frame-img{
          position:absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 2;
          display:block;
          pointer-events:none;
          user-select:none;
        }

        .notebook-screen-inner{
          position:absolute;
          /* Hole inside PC_frame.png:
             frame = 1536x1024, hole = 915x580
             => left = 310.5px (20.234%), top = 222px (21.679%)
             => width = 915px (59.505%), height = 580px (56.641%)
          */
          left: 20.2344%;
          /* Nudge hole upward to reduce remaining top blank space */
          top: 17.7%;
          width: 59.5052%;
          /* Keep bottom alignment: top + height should stay ~78.3203% */
          height: 60.6203%;
          border-radius: 2.4%;
          overflow:hidden;
          background: #000;
          z-index: 1;
        }

        .notebook-screen-inner > *{
          width: 100%;
          height: 100%;
        }

        /* Controls */
        .offer-carousel-controls{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap: 16px;
          margin-top: 4px;
        }

        .offer-nav-btn{
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.75);
          cursor:pointer;
          transition: background 200ms ease, border-color 200ms ease, transform 200ms ease;
          font-family: system-ui;
          font-size: 18px;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .offer-nav-btn:hover{
          background: rgba(0,229,255,0.12);
          border-color: rgba(0,229,255,0.35);
          transform: translateY(-2px);
        }

        .offer-carousel-dots{
          display:flex;
          gap: 10px;
          align-items:center;
          justify-content:center;
          flex: 1 1 auto;
        }

        .offer-dot{
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: none;
          cursor:pointer;
          background: rgba(255,255,255,0.18);
          transition: width 250ms ease, background 250ms ease;
          padding: 0;
        }
        .offer-dot-active{
          width: 28px;
          background: rgba(0,229,255,0.95);
        }

        /* Large desktop: pin media column to top; height still content-driven */
        @media (min-width: 1440px) {
          .offer-gallery-right{
            align-items: flex-start;
            padding: 0;
          }
        }

        @media(max-width:900px){
          .offer-premium-card-inner{ padding: 15px; }
          .offer-gallery-grid{ flex-direction: column; gap: 8px; }
          .offer-gallery-left{
            padding: 40px 0;
            text-align: left;
            display: flex;
            flex-direction: column;
            align-items: stretch;
          }
          .offer-left-copy{
            width: 100%;
            text-align: left;
          }
          .offer-gallery-right{ width: 100%; }
          .offer-title-wrap{
            text-align: left;
            width: 100%;
          }
          /* Keep mobile titles readable, not bigger than section heading */
          .offer-title-large{ font-size: 24px !important; }
          .offer-title:not(.offer-title-large){ font-size: clamp(22px, 6vw, 30px) !important; }
          .offer-desc{
            font-size: 14px !important;
            line-height: 1.7 !important;
            text-align: left !important;
          }
          .offer-features-subheading{
            font-size: 14px !important;
            text-align: left !important;
            margin-bottom: 8px !important;
          }
          .offer-bullets{
            padding-left: 20px !important;
            list-style-position: outside;
            text-align: left;
            margin-bottom: 11px !important;
            align-self: stretch;
            width: 100%;
            box-sizing: border-box;
          }
          .offer-bullets li{
            font-size: 14px !important;
            line-height: 1.7 !important;
            text-align: left !important;
          }
          /* Match pricing mobile CTA: full card width, same padding & type size */
          .offer-cta{
            align-self: stretch;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            padding: 10px 16px !important;
            font-size: 14px !important;
            font-weight: 600;
            margin-top: 10px;
          }
          .notebook-screen{ transform: none; }
          .offer-carousel-controls{ margin-top: 0; }
        }

        /* Desktop: screen >= 1025px => double the card title size */
        @media(min-width:1025px){
          .offer-title-large{
            /* keep desktop fixed size (32px) */
            font-size: 28px !important;
            line-height: 1.08;
          }
        }

        @media(prefers-reduced-motion: reduce){
          .offer-card-swap{ animation: none !important; }
          .notebook-screen{ transform: none !important; }
        }
      `}</style>
    </section>
  );
};

