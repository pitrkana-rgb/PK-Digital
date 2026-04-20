import { useEffect, useRef, useState } from "react";
import { SectionDivider } from "../../components/SectionDivider";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";
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
          background: pk.accent65,
          boxShadow: `0 0 28px ${pk.accent25}`,
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
          background: pk.charcoal72,
          border: `1px solid ${pk.accent25}`,
          boxShadow: `0 0 28px ${pk.accent18}`,
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
            stroke={pk.accent95}
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
            stroke={pk.accent95}
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
    title: "Web, který přináší zákazníky",
    description:
      "Navrhneme a dodáme web do 14 dní — bez složitostí a bez rizika.",
    features: [
      "Návrh zdarma do 3 dnů",
      "Design zaměřený na konverze",
      "Jednoduchá správa bez vývojáře",
    ],
    cta: "Nezávazná konzultace",
    image: tvorbaWebuUrl,
  },
  {
    id: "upgrade-webu",
    title: "Modernizace stránek",
    description:
      "Kompletní modernizace vašeho stávajícího webu — nový design, vyšší rychlost, lepší konverze.",
    features: [
      "Zdarma audit webu",
      "Identifikace slabých míst",
      "Rychlejší web s dopadem na SEO",
    ],
    cta: "Nezávazná konzultace",
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
    ],
    cta: "Nezávazná konzultace",
    image: aiBotUrl,
  },
];

const slidesEn: Slide[] = [
  {
    id: "tvorba-webu",
    title: "A website that brings customers",
    description:
      "We design and deliver your website in 14 days — no complexity and no risk.",
    features: [
      "Free concept within 3 days",
      "Conversion-focused design",
      "Easy management without a developer",
    ],
    cta: "Free consultation",
    image: tvorbaWebuUrl,
  },
  {
    id: "upgrade-webu",
    title: "Website Modernization",
    description:
      "Complete modernization of your existing website - new design, higher speed, and better conversions.",
    features: [
      "Free website audit",
      "Weak-point identification",
      "Faster website with SEO impact",
    ],
    cta: "Free consultation",
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
    ],
    cta: "Free consultation",
    image: aiBotUrl,
  },
];

export const CoNabizimeSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const isEn = language === "en";
  const activeSlides = isEn ? slidesEn : slides;
  const activeSlide = activeSlides[activeIdx];
  const [cardVisible, setCardVisible] = useState(true);
  const switchTimeoutRef = useRef<number | null>(null);
  const touchStartX = useRef<number>(0);
  const SWIPE_THRESHOLD = 50;

  useEffect(() => {
    return () => {
      if (switchTimeoutRef.current) window.clearTimeout(switchTimeoutRef.current);
    };
  }, []);

  const goTo = (idx: number) => {
    const nextIdx = Math.max(0, Math.min(activeSlides.length - 1, idx));
    if (nextIdx === activeIdx) return;
    setCardVisible(false);
    if (switchTimeoutRef.current) window.clearTimeout(switchTimeoutRef.current);
    switchTimeoutRef.current = window.setTimeout(() => {
      setActiveIdx(nextIdx);
      setCardVisible(true);
    }, 150);
  };

  const navItems = isEn
    ? ["New website", "Website modernization", "Automation and AI agents"]
    : ["Tvorba nového webu", "Modernizace stránek", "Automatizace a AI agenti"];

  return (
    <section
      id="co-nabizime"
      style={{
        width: "100%",
        backgroundColor: pk.page,
        padding: "60px 0 80px",
        marginTop: "-50px",
        marginBottom: "-50px",
      }}
    >
      <SectionDivider />

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        <div className="offer-head" style={{ textAlign: "center", marginTop: "30px", marginBottom: "56px" }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 700,
              fontSize: "clamp(26px,3.6vw,42px)",
              lineHeight: 1.1,
              color: pk.ink,
              margin: "0 auto 20px",
              letterSpacing: "-0.02em",
              maxWidth: "980px",
            }}
          >
            {isEn ? "We provide comprehensive digital services" : "Poskytujeme komplexní digitální služby"}
          </h2>
          <p
            className="section-sub offer-subheading"
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: 1.6,
              color: pk.ink65,
              margin: "0 auto",
              maxWidth: "980px",
            }}
          >
            {isEn
              ? "We help companies grow through higher sales and a steady flow of new customers. Thanks to advanced AI tools, we significantly speed up development - a prototype is ready in 3 days and the finished website can be delivered in just 14 days."
              : "Pomáháme firmám růst díky vyšším prodejům a stabilnímu přísunu nových zákazníků. Díky pokročilým AI nástrojům výrazně zrychlujeme vývoj – prototyp připravíme do 3 dnů a hotový web dodáme již za 14 dnů."}
          </p>
        </div>

        <div className="offer-tabs" role="tablist" aria-label={isEn ? "Services navigation" : "Navigace služeb"}>
          {navItems.map((label, idx) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={idx === activeIdx}
              className={`offer-tab-btn${idx === activeIdx ? " offer-tab-btn-active" : ""}`}
              onClick={() => goTo(idx)}
            >
              {label}
            </button>
          ))}
        </div>

        <div
          className="offer-carousel"
          onTouchStart={(e) => { touchStartX.current = e.touches[0]!.clientX; }}
          onTouchEnd={(e) => {
            const endX = e.changedTouches[0]!.clientX;
            const delta = touchStartX.current - endX;
            if (delta > SWIPE_THRESHOLD) goTo(activeIdx + 1);
            else if (delta < -SWIPE_THRESHOLD) goTo(activeIdx - 1);
          }}
        >
          <div className={`offer-single-card${cardVisible ? " offer-single-card-visible" : ""}`}>
            <div className="offer-premium-card">
              <div className="offer-premium-card-inner">
                      {/* Minimal ambient lights (gentle, premium, non-distracting) */}
                <div className="offer-ambient-lights" aria-hidden="true">
                  <div className="offer-blob offer-blob--a" />
                  <div className="offer-blob offer-blob--b" />
                  <div className="offer-blob offer-blob--c" />
                </div>

                <div className="offer-gallery-grid">
                  <div className="offer-gallery-left">
                    <div className="offer-left-copy">
                      <div className="offer-title-wrap">
                        {activeSlide.id === "tvorba-webu" ? (
                          <h3 className="offer-title offer-title-large">
                            {isEn ? "A website that brings customers" : "Web, který přináší zákazníky"}
                          </h3>
                        ) : activeSlide.id === "upgrade-webu" ? (
                          <h3 className="offer-title offer-title-large">
                            <span className="offer-title-accent">{isEn ? "Modernization" : "Modernizace"}</span>
                            {isEn ? "" : " stránek"}
                          </h3>
                        ) : (
                          <h3 className="offer-title offer-title-large">
                            <span className="offer-title-accent">{isEn ? "Automation" : "Automatizace"}</span>
                            {isEn ? " and AI Agents" : " a AI agenti"}
                          </h3>
                        )}
                        <div className="offer-title-underline" aria-hidden="true" />
                      </div>

                      <p className="offer-desc">{activeSlide.description}</p>

                      {activeSlide.featuresSubheading ? (
                        <p className="offer-features-subheading">{activeSlide.featuresSubheading}</p>
                      ) : null}

                      <ul className="offer-bullets offer-bullets--checks">
                        {activeSlide.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>

                      <button
                        type="button"
                        className="offer-cta offer-cta-desktop animate-pulse-glow hero-primary-btn"
                        onClick={() => {
                          navigate("/napiste-nam");
                          setTimeout(() => {
                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                          }, 180);
                        }}
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontWeight: 600,
                          fontSize: "16px",
                          letterSpacing: "0",
                        }}
                      >
                        {activeSlide.cta}
                      </button>
                    </div>
                  </div>

                  <div className="offer-gallery-right">
                    {activeSlide.id === "tvorba-webu" || activeSlide.id === "automatizace-ai" ? (
                      <div className={`offer-simple-media${activeSlide.id === "automatizace-ai" ? " offer-simple-media--ai-bot" : ""}`}>
                        <img
                          src={activeSlide.image}
                          alt={activeSlide.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: activeSlide.id === "automatizace-ai" ? "contain" : "cover",
                            objectPosition: "center",
                            display: "block",
                          }}
                        />
                      </div>
                    ) : (
                      <div className="notebook">
                        <div className="notebook-screen">
                          <img className="notebook-frame-img" src={pcFrameUrl} alt="" aria-hidden="true" />
                          <div className="notebook-screen-inner" aria-hidden="true">
                            {activeSlide.beforeAfter ? <BeforeAfterSlider {...activeSlide.beforeAfter} /> : null}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA + mobile dot navigation */}
                  <div className="offer-gallery-actions">
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/napiste-nam");
                        setTimeout(() => {
                          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                        }, 180);
                      }}
                      className="offer-cta offer-cta-mobile animate-pulse-glow hero-primary-btn"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600,
                        fontSize: "16px",
                        letterSpacing: "0",
                      }}
                    >
                      {activeSlide.cta}
                    </button>

                    <div className="offer-mobile-dots" role="tablist" aria-label={isEn ? "Services picker" : "Výběr služby"}>
                      {activeSlides.map((s, i) => (
                        <button
                          key={s.id}
                          type="button"
                          role="tab"
                          aria-selected={i === activeIdx}
                          aria-label={isEn ? `Go to card ${i + 1}` : `Přejít na kartu ${i + 1}`}
                          onClick={() => goTo(i)}
                          className="offer-dot"
                          data-active={i === activeIdx ? "true" : undefined}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .offer-tabs{
          display:flex;
          justify-content:center;
          gap:14px;
          flex-wrap:wrap;
          margin: 0 auto 10px;
        }
        .offer-tab-btn{
          border:none;
          border-radius:12px;
          background: transparent;
          color: var(--pk-ink-78);
          padding: 15px 24px;
          font-family:"Space Grotesk", sans-serif;
          font-size: 22px;
          font-weight:600;
          cursor:pointer;
          transition: background 200ms ease, color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
        }
        .offer-tab-btn:hover{
          transform: translateY(-1px);
          background: transparent;
        }
        .offer-tab-btn-active{
          background: var(--pk-gradient-cta);
          color: var(--pk-ink);
          border-color: transparent;
          box-shadow: 0 16px 34px var(--pk-accent-16);
        }
        .offer-carousel{
          width: 100%;
          display:flex;
          flex-direction:column;
          gap: 0;
        }
        .offer-single-card{
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 180ms ease, transform 180ms ease;
        }
        .offer-single-card-visible{
          opacity: 1;
          transform: translateY(0);
        }
        @media(min-width:901px){
          .offer-head{ margin-bottom: 41px !important; }
          .offer-carousel{ gap: 0 !important; }
        }
        

        .offer-premium-card{
          border-radius: 28px;
          padding: 0;
          background: transparent;
          box-shadow: none;
          flex: 0 1 auto;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .offer-premium-card-inner{
          border-radius: 28px;
          background: transparent;
          border: none;
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
        .offer-premium-card-inner::before{ content: none; }

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
          background: radial-gradient(circle at 30% 30%, var(--pk-cyan-194-18) 0%, var(--pk-cyan-194-00) 62%);
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        .offer-blob--a{
          left: -8%;
          top: 10%;
          opacity: 0.08;
          background: radial-gradient(circle at 30% 30%, var(--pk-cyan-194-18) 0%, var(--pk-cyan-194-00) 62%);
          animation-name: offerBlobMoveA;
          animation-duration: 34s;
        }

        .offer-blob--b{
          left: 36%;
          top: -18%;
          opacity: 0.05;
          background: radial-gradient(circle at 30% 30%, var(--pk-green-glow-16) 0%, var(--pk-green-74-00) 62%);
          animation-name: offerBlobMoveB;
          animation-duration: 40s;
        }

        .offer-blob--c{
          left: 52%;
          top: 45%;
          opacity: 0.06;
          background: radial-gradient(circle at 30% 30%, var(--pk-sky-56-18) 0%, var(--pk-sky-56-00) 62%);
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
          gap: 28px;
          align-items: center;
          flex: 0 1 auto;
          min-height: 0;
        }

        /* Mobile-only row: CTA + swipe dots (hidden on desktop) */
        .offer-gallery-actions{
          display: none;
        }
        .offer-mobile-dots{
          display: none;
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
        }

        .offer-gallery-right{
          flex: 1 1 75%;
          min-width: 0;
          display:flex;
          align-items:center;
          justify-content:center;
          padding: 5px 0;
        }
        /* Desktop: slightly smaller right-side visuals */
        @media(min-width:901px){
          .offer-gallery-right{
            transform: scale(0.85);
            transform-origin: center;
          }
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
          color: var(--pk-ink);
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
          display:none;
        }

        .offer-desc{
          font-family: "Space Grotesk", sans-serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 1.7;
          color: var(--pk-ink-70);
          margin: 0 0 18px;
        }

        .offer-features-subheading{
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 15px;
          line-height: 1.45;
          color: var(--pk-ink-88);
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
          color: var(--pk-ink-82);
        }

        .offer-cta{
          background: var(--pk-gradient-cta);
          color: var(--pk-ink);
          border: none;
          border-radius: 12px;
          padding: 15px 32px;
          font-family: "Space Grotesk", sans-serif;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: filter 0.25s ease, transform 0.25s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }
        /* Card title highlight matches section heading */
        .offer-title-accent{
          background: none;
          -webkit-background-clip: initial;
          -webkit-text-fill-color: currentColor;
          background-clip: initial;
          color: var(--pk-ink);
        }
        .offer-bullets--checks{
          list-style: none;
          padding-left: 0;
          margin: 0;
        }
        .offer-bullets--checks li{
          position: relative;
          padding-left: 40px;
          margin: 10px 0;
          font-size: 18px;
          line-height: 1.55;
        }
        .offer-bullets--checks li::before{
          content: "";
          position: absolute;
          left: 0;
          top: 2px;
          width: 28px;
          height: 28px;
          border-radius: 999px;
          background: var(--pk-cool-gray-06);
          box-shadow: 0 0 0 1px var(--pk-cool-gray-22) inset;
        }
        .offer-bullets--checks li::after{
          content: "";
          position: absolute;
          left: 9px;
          top: 13px;
          width: 10px;
          height: 6px;
          border-left: 3px solid var(--pk-cool-gray-82);
          border-bottom: 3px solid var(--pk-cool-gray-82);
          transform: rotate(-45deg);
        }
        .offer-cta{
          background: var(--pk-gradient-cta) !important;
          color: var(--pk-ink) !important;
        }
        .offer-cta-desktop{
          margin-top: 30px;
          align-self: flex-start;
        }
        .offer-cta-mobile{
          display:none;
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
          background: var(--pk-screen-hole);
          z-index: 1;
        }

        .notebook-screen-inner > *{
          width: 100%;
          height: 100%;
        }

        @media(max-width:900px){
          .offer-premium-card{
            flex: 1 1 auto;
            min-height: 0;
            width: 100%;
          }
          .offer-premium-card-inner{
            padding: 15px;
            flex: 1 1 auto;
            min-height: 0;
          }
          .offer-gallery-grid{
            flex-direction: column;
            gap: 8px;
            flex: 1 1 auto;
            min-height: 0;
          }
          .offer-gallery-actions{
            width: 100%;
            display:flex !important;
            flex-direction: column;
            align-items: center;
            gap: 18px;
            margin-top: 8px;
          }
          .offer-cta-desktop{ display:none !important; }
          .offer-cta-mobile{ display:flex !important; justify-content:center; }
          .offer-mobile-dots{
            display:flex;
            justify-content:center;
            gap: 8px;
            margin-top: 0;
          }
          .offer-dot{
            width: 8px;
            height: 8px;
            border-radius: 999px;
            border: none;
            padding: 0;
            cursor: pointer;
            background: var(--pk-slate-border-strong);
            transition: width 250ms ease, background 250ms ease;
          }
          .offer-dot[data-active="true"]{
            width: 28px;
            background: var(--pk-accent);
          }
          .offer-tabs{
            gap: 10px;
            margin-bottom: 20px;
          }
          .offer-tab-btn{
            width: 100%;
            max-width: 340px;
            font-size: 13px;
            padding: 10px 16px;
          }
          .offer-gallery-left{
            padding: 20px 0 20px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1 1 auto;
            min-height: 0;
          }
          .offer-left-copy{
            width: 100%;
            text-align: center;
            flex: 0 1 auto;
            min-height: 0;
          }
          .offer-gallery-right{
            width: 100%;
            flex: 0 0 auto;
          }
          .offer-title-wrap{
            text-align: center;
            width: 100%;
          }
          /* Keep mobile titles readable, not bigger than section heading */
          .offer-title-large{ font-size: 24px !important; }
          .offer-title:not(.offer-title-large){ font-size: clamp(22px, 6vw, 30px) !important; }
          .offer-desc{
            font-size: 14px !important;
            line-height: 1.7 !important;
            text-align: center !important;
          }
          .offer-features-subheading{
            font-size: 14px !important;
            text-align: center !important;
            margin-bottom: 8px !important;
          }
          .offer-bullets--checks li{
            font-size: 16px !important; /* 2px bigger than 14px description */
            line-height: 1.65 !important;
          }
          .offer-bullets--checks li::before{
            top: 2px !important;
            width: 24px !important;
            height: 24px !important;
          }
          .offer-bullets--checks li::after{
            left: 8px !important;
            top: 12px !important;
            width: 9px !important;
            height: 5px !important;
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
            margin-top: 30px !important;
            flex-shrink: 0;
          }
          .notebook-screen{ transform: none; }
          .offer-tabs{ display:none !important; }
        }

        @media(min-width:1025px){
          .offer-title-large{
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

