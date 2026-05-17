import { useEffect, useRef, useState, type TouchEvent } from "react";
import { SectionDivider } from "../../components/SectionDivider";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";
import pcFrameUrl from "../../../../../Images/PC_frame.png";
import { HeroCompositeFrame } from "../MainHeroSection/HeroCompositeFrame";
import aiBotUrl from "../../../../../Images/AI bot.png";
import modernizaceBeforeUrl from "../../../../../Images/Modernizace/Before.png";
import modernizaceAfterUrl from "../../../../../Images/Modernizace/After.png";
import webAppUrl from "../../../../../Images/Web_app.png";
import heroFrameV3Url from "../../../../../Images/Hero_PC_frame_V3.png";

type BeforeAfter = {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
  /** One-time demo: on first viewport entry, nudge slider right → left → center */
  introDemo?: boolean;
};

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const preloadImage = (src: string): Promise<void> =>
  new Promise((resolve) => {
    const img = new Image();
    const done = () => resolve();
    img.onload = done;
    img.onerror = done;
    img.src = src;
  });

/** Inactive: colored icons; active: `*_white.png` (first tab uses `Icon_tvorba_webu_white.png` in /public). */
const offerTabIconFile = (slideId: string, isActive: boolean) => {
  if (!isActive) {
    if (slideId === "tvorba-webu" || slideId === "webove-aplikace") return "Icon_novy_web.png";
    if (slideId === "upgrade-webu") return "Icon_modernizace.png";
    return "Icon_Automatizace.png";
  }
  if (slideId === "tvorba-webu" || slideId === "webove-aplikace") return "Icon_tvorba_webu_white.png";
  if (slideId === "upgrade-webu") return "Icon_modernizace_white.png";
  return "Icon_Automatizace_white.png";
};

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

type SlideFeature =
  | string
  | { bold: string; rest: string }
  | { before: string; bold: string; after?: string };

type Slide = {
  id: string;
  title: string;
  description: string;
  /** Optional line above the bullet list (e.g. AI card) */
  featuresSubheading?: string;
  features: SlideFeature[];
  cta: string;
  image?: string;
  beforeAfter?: BeforeAfter;
};

const preloadOfferSlideMedia = async (slide: Slide): Promise<void> => {
  if (slide.id === "tvorba-webu") {
    const desktopGlob = import.meta.glob<{ default: string }>(
      "../../../../../Images/Project_images/*-desktop.png",
      { eager: true },
    );
    const mobileGlob = import.meta.glob<{ default: string }>(
      "../../../../../Images/Project_images/*-mobil.png",
      { eager: true },
    );
    const urls = new Set<string>([heroFrameV3Url]);
    Object.values(desktopGlob).forEach((m) => urls.add(m.default));
    Object.values(mobileGlob).forEach((m) => urls.add(m.default));
    await Promise.all([...urls].map(preloadImage));
    return;
  }
  if (slide.beforeAfter) {
    await Promise.all([
      preloadImage(pcFrameUrl),
      preloadImage(slide.beforeAfter.beforeSrc),
      preloadImage(slide.beforeAfter.afterSrc),
    ]);
    return;
  }
  if (slide.image) {
    await preloadImage(slide.image);
  }
};

const getFeatureBoldText = (feature: SlideFeature): string => {
  if (typeof feature === "string") return feature;
  return feature.bold;
};

const renderOfferFeature = (feature: SlideFeature, key: string, className?: string): JSX.Element => (
  <li key={key} className={className}>
    {typeof feature === "string" ? (
      feature
    ) : "rest" in feature ? (
      <>
        <strong>{feature.bold}</strong>
        {feature.rest}
      </>
    ) : (
      <>
        {feature.before}
        <strong>{feature.bold}</strong>
        {feature.after ?? ""}
      </>
    )}
  </li>
);

const renderOfferFeatureBoldOnly = (feature: SlideFeature, key: string, className?: string): JSX.Element => (
  <li key={key} className={className}>
    <strong>{getFeatureBoldText(feature)}</strong>
  </li>
);

const slides: Slide[] = [
  {
    id: "tvorba-webu",
    title: "Webové stránky na míru",
    description:
      "Moderní webové stránky na míru se zaměřením na výkon, SEO a získávání nových zákazníků.",
    features: [
      { bold: "Návrh webu zdarma", rest: " do 3 dnů bez závazků" },
      { bold: "SEO optimalizace", rest: " pro lepší pozice ve vyhledávání Google" },
      { bold: "Jednoduchá správa webu", rest: " bez programování a technických znalostí" },
      { bold: "Responzivní design", rest: " pro mobily, tablety i počítače" },
      { before: "Web na míru zaměřený na ", bold: "získávání nových zákazníků" },
    ],
    cta: "Nezávazná konzultace",
  },
  {
    id: "upgrade-webu",
    title: "Modernizace webových stránek",
    description:
      "Kompletní modernizace vašeho webu — vyšší rychlost a lepší konverze.",
    features: [
      { bold: "Audit webu zdarma", rest: " s návrhem konkrétních vylepšení" },
      { bold: "Odhalení slabých míst", rest: " snižujících důvěryhodnost a konverze" },
      { bold: "Modernější design webu", rest: " pro vyšší důvěru zákazníků" },
      { bold: "Rychlejší načítání webu", rest: " s pozitivním dopadem na SEO" },
      { bold: "Optimalizace pro mobily", rest: " a lepší uživatelský zážitek" },
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
    id: "webove-aplikace",
    title: "Webové aplikace na míru",
    description: "Navrhnu a vyvinu moderní webovou aplikaci pro vaše podnikání.",
    features: [
      { bold: "Návrh aplikace zdarma", rest: " do 3 dnů bez závazků" },
      { bold: "Moderní UX design", rest: " pro jednoduché a rychlé používání" },
      { bold: "Webová aplikace dostupná", rest: " z mobilu, tabletu i počítače" },
      { bold: "Rychlé a stabilní", rest: " prostředí optimalizované pro výkon" },
      { bold: "Webová aplikace na", rest: " míru zaměřená na růst firmy" },
    ],
    cta: "Nezávazná konzultace",
    image: webAppUrl,
  },
  {
    id: "automatizace-ai",
    title: "Automatizace procesů a AI agenti",
    description: "Získejte více zákazníků a snižte náklady díky chytré automatizaci",
    features: [
      { bold: "Automatizace procesů bez", rest: " rutinní manuální práce" },
      { bold: "Okamžité zpracování požadavků", rest: " 24 hodin denně bez čekání" },
      { bold: "Snížení provozních nákladů", rest: " až o desítky procent" },
      { bold: "Automatické sběry dat", rest: " a propojení firemních systémů" },
      { bold: "Úspora času zaměstnanců", rest: " díky chytrému workflow systému" },
    ],
    cta: "Nezávazná konzultace",
    image: aiBotUrl,
  },
];

const slidesEn: Slide[] = [
  {
    id: "tvorba-webu",
    title: "Custom websites",
    description:
      "Modern custom websites focused on performance, SEO, and winning new customers.",
    features: [
      { bold: "Free website proposal", rest: " within 3 days, no commitment" },
      { bold: "SEO optimization", rest: " for better positions in Google search" },
      { bold: "Easy site management", rest: " without coding or technical skills" },
      { bold: "Responsive design", rest: " for phones, tablets, and desktops" },
      { before: "Tailored website focused on ", bold: "winning new customers" },
    ],
    cta: "Free consultation",
  },
  {
    id: "upgrade-webu",
    title: "Website modernization",
    description:
      "Complete modernization of your website — higher speed and better conversions.",
    features: [
      { bold: "Free website audit", rest: " with specific improvement proposals" },
      { bold: "Weak spots revealed", rest: " that reduce trust and conversions" },
      { bold: "A more modern design", rest: " for stronger customer confidence" },
      { bold: "Faster website loading", rest: " with a positive SEO impact" },
      { bold: "Optimization for mobile", rest: " and a better user experience" },
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
    id: "webove-aplikace",
    title: "Custom web applications",
    description: "I will design and develop a modern web application for your business.",
    features: [
      { bold: "Free application design", rest: " within 3 days, no commitment" },
      { bold: "Modern UX design", rest: " for simple and fast everyday use" },
      { bold: "Web application available", rest: " on phone, tablet, and desktop" },
      { bold: "Fast and stable", rest: " environment optimized for performance" },
      { bold: "Tailored web application", rest: " focused on company growth" },
    ],
    cta: "Free consultation",
    image: webAppUrl,
  },
  {
    id: "automatizace-ai",
    title: "Process automation and AI agents",
    description: "Get more customers and reduce costs with smart automation",
    features: [
      { bold: "Process automation without", rest: " routine manual work" },
      { bold: "Immediate request processing", rest: " 24 hours a day without waiting" },
      { bold: "Lower operating costs", rest: " by up to tens of percent" },
      { bold: "Automatic data collection", rest: " and integration of company systems" },
      { bold: "Employee time savings", rest: " through a smart workflow system" },
    ],
    cta: "Free consultation",
    image: aiBotUrl,
  },
];

export const CoNabizimeSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const isEn = language === "en";
  const activeSlides = isEn ? slidesEn : slides;
  const activeSlide = activeSlides[activeIdx];
  const [cardVisible, setCardVisible] = useState(true);
  const switchTimeoutRef = useRef<number | null>(null);
  const touchStartX = useRef<number>(0);
  const SWIPE_THRESHOLD = 50;
  const [isOfferMobile, setIsOfferMobile] = useState(false);
  const [hoveredTabIdx, setHoveredTabIdx] = useState<number | null>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleBulletCount, setVisibleBulletCount] = useState(0);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [mediaMounted, setMediaMounted] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const resetOfferReveal = () => {
    setHeaderVisible(false);
    setVisibleBulletCount(0);
    setCtaVisible(false);
    setImageVisible(false);
    setMediaMounted(false);
  };

  const revealItemClass = (visible: boolean) => `offer-reveal-item${visible ? " is-in" : ""}`;

  useEffect(() => {
    return () => {
      if (switchTimeoutRef.current) window.clearTimeout(switchTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => setIsOfferMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const goTo = (idx: number) => {
    const nextIdx = Math.max(0, Math.min(activeSlides.length - 1, idx));
    if (nextIdx === activeIdx) return;
    resetOfferReveal();
    setCardVisible(false);
    if (switchTimeoutRef.current) window.clearTimeout(switchTimeoutRef.current);
    switchTimeoutRef.current = window.setTimeout(() => {
      setActiveIdx(nextIdx);
      setCardVisible(true);
    }, 150);
  };

  const navItems = isEn
    ? ["Website creation", "Website modernization", "Web applications", "Process automation"]
    : ["Tvorba stránek", "Modernizace stránek", "Webové aplikace", "Automatizace procesů"];

  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.12) {
          setSectionInView(true);
          obs.disconnect();
        }
      },
      { threshold: [0, 0.12, 0.2], rootMargin: "0px 0px -32px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (!cardVisible) {
      resetOfferReveal();
      return;
    }

    if (!sectionInView) {
      return;
    }

    resetOfferReveal();

    const runReveal = async () => {
      const slide = activeSlides[activeIdx];
      if (!slide) return;

      await preloadOfferSlideMedia(slide);
      if (cancelled) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) {
        setHeaderVisible(true);
        setVisibleBulletCount(slide.features.length);
        setCtaVisible(true);
        setMediaMounted(true);
        setImageVisible(true);
        return;
      }

      setMediaMounted(true);
      requestAnimationFrame(() => {
        if (!cancelled) setImageVisible(true);
      });

      setHeaderVisible(true);
      await sleep(260);
      if (cancelled) return;

      for (let i = 0; i < slide.features.length; i++) {
        setVisibleBulletCount(i + 1);
        await sleep(65);
        if (cancelled) return;
      }

      await sleep(90);
      if (cancelled) return;
      setCtaVisible(true);
    };

    void runReveal();
    return () => {
      cancelled = true;
    };
  }, [cardVisible, activeIdx, activeSlides, sectionInView]);

  const renderOfferTabButton = (slide: Slide, idx: number): JSX.Element => {
    const isHighlighted = idx === activeIdx || hoveredTabIdx === idx;
    return (
    <button
      key={slide.id}
      type="button"
      role="tab"
      aria-selected={idx === activeIdx}
      className={`offer-tab${idx === activeIdx ? " is-active" : ""}`}
      onClick={() => goTo(idx)}
      onMouseEnter={() => setHoveredTabIdx(idx)}
      onMouseLeave={() => setHoveredTabIdx(null)}
      onFocus={() => setHoveredTabIdx(idx)}
      onBlur={() => setHoveredTabIdx(null)}
    >
      <div className="offer-tab-row">
        <div className="offer-tab-icon" aria-hidden="true">
          <img
            src={`${import.meta.env.BASE_URL}${offerTabIconFile(slide.id, isHighlighted)}`}
            alt=""
            width={38}
            height={34}
            style={{ display: "block", objectFit: "contain" }}
          />
        </div>
        <div className="offer-tab-copy">
          <div className="offer-tab-title">{navItems[idx] ?? ""}</div>
        </div>
      </div>
    </button>
    );
  };

  const renderOfferDots = (): JSX.Element => (
    <div className="offer-tabs-dots" aria-hidden={!isOfferMobile}>
      {activeSlides.map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={isEn ? `Go to service ${i + 1}` : `Přejít na službu ${i + 1}`}
          onClick={() => goTo(i)}
          style={{
            width: i === activeIdx ? "28px" : "8px",
            height: "8px",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            background: i === activeIdx ? pk.accent : pk.slateTint16,
            transition: "width 250ms ease, background 250ms ease",
            padding: 0,
          }}
        />
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="co-nabizime"
      className="landing-scroll-target"
      style={{
        width: "100%",
        backgroundColor: pk.page,
        padding: "60px 0 90px",
        marginTop: "-50px",
        marginBottom: "-50px",
        overflow: "visible",
      }}
    >
      <SectionDivider />

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        <div className="offer-head" style={{ textAlign: "center", marginTop: "12px", marginBottom: "48px" }}>
          <h2
            style={{
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: 700,
              fontSize: "clamp(26px,3.6vw,42px)",
              lineHeight: 1.1,
              color: pk.ink,
              margin: "0 auto 20px",
              letterSpacing: "-0.02em",
              maxWidth: "980px",
            }}
          >
            {isEn ? "I provide comprehensive digital services" : "Poskytuji komplexní digitální služby"}
          </h2>
          <p
            className="section-sub offer-subheading"
            style={{
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: 1.6,
              color: pk.ink65,
              margin: "0 auto",
              maxWidth: "980px",
            }}
          >
            {isEn
              ? "I create custom websites and applications, modernize corporate websites, and automate business processes. By combining modern design, SEO, and AI technology, I help companies grow and win more customers."
              : "Tvořím webové stránky a aplikace na míru, modernizuji firemní weby a automatizuji procesy. Díky spojení moderního designu, SEO a AI technologií pomáhám firmám růst a získávat více zákazníků."}
          </p>
          <h3
            className={`offer-mobile-card-title${cardVisible ? " is-visible" : ""}`}
            id="offer-active-service-title"
          >
            {activeSlide.title}
          </h3>
        </div>

        <div className="offer-shell">
          <div className="offer-tabs-desktop" role="tablist" aria-label={isEn ? "Services navigation" : "Navigace služeb"}>
            {activeSlides.map((slide, idx) => renderOfferTabButton(slide, idx))}
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
          <div className={`offer-single-card${cardVisible && sectionInView ? " offer-single-card-visible" : ""}`}>
            <div className="offer-premium-card">
              <div className="offer-premium-card-inner">
                <div className="offer-gallery-grid">
                  <div className="offer-gallery-left">
                    <div className="offer-left-copy">
                      <div className="offer-title-wrap">
                        <h3 className={`offer-title offer-title-large ${revealItemClass(headerVisible)}`}>
                          {activeSlide.title}
                        </h3>
                        <div className={`offer-title-underline ${revealItemClass(headerVisible)}`} aria-hidden="true" />
                      </div>

                      <p className={`offer-desc ${revealItemClass(headerVisible)}`}>{activeSlide.description}</p>

                      {activeSlide.featuresSubheading ? (
                        <p className={`offer-features-subheading ${revealItemClass(headerVisible)}`}>
                          {activeSlide.featuresSubheading}
                        </p>
                      ) : null}

                      <ul className="offer-bullets offer-bullets--checks">
                        {activeSlide.features.map((f, idx) => {
                          const bulletClass = revealItemClass(idx < visibleBulletCount);
                          return isOfferMobile
                            ? renderOfferFeatureBoldOnly(f, `${activeSlide.id}-feature-${idx}`, bulletClass)
                            : renderOfferFeature(f, `${activeSlide.id}-feature-${idx}`, bulletClass);
                        })}
                      </ul>

                      <button
                        type="button"
                        className={`offer-cta offer-cta-desktop animate-pulse-glow hero-primary-btn landing-primary-cta ${revealItemClass(ctaVisible)}`}
                        onClick={() => {
                          navigate("/napiste-nam");
                          setTimeout(() => {
                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                          }, 180);
                        }}
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 600,
                          fontSize: "16px",
                          letterSpacing: "0",
                          transition: "transform 0.25s ease, filter 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                          const b = e.currentTarget as HTMLButtonElement;
                          b.style.transform = "translateY(-2px)";
                          b.style.filter = "brightness(1.08)";
                        }}
                        onMouseLeave={(e) => {
                          const b = e.currentTarget as HTMLButtonElement;
                          b.style.transform = "";
                          b.style.filter = "";
                        }}
                      >
                        {activeSlide.cta}
                      </button>
                    </div>
                  </div>

                  <div className="offer-gallery-right">
                    {mediaMounted ? (
                    <div className={`offer-gallery-media-shell${imageVisible ? " is-in" : ""}`}>
                    {activeSlide.id === "tvorba-webu" ? (
                      <div className="offer-hero-frame" aria-hidden="true">
                        <HeroCompositeFrame animateEntrance={false} />
                      </div>
                    ) : activeSlide.id === "webove-aplikace" || activeSlide.id === "automatizace-ai" ? (
                      <div className={`offer-simple-media${activeSlide.id === "automatizace-ai" ? " offer-simple-media--ai-bot" : ""}`}>
                        <img
                          src={activeSlide.image}
                          alt={activeSlide.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
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
                    ) : (
                    <div className="offer-gallery-media-placeholder" aria-hidden="true" />
                    )}
                  </div>

                  {/* CTA */}
                  <div className="offer-gallery-actions">
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/napiste-nam");
                        setTimeout(() => {
                          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                        }, 180);
                      }}
                      className={`offer-cta offer-cta-mobile animate-pulse-glow hero-primary-btn landing-primary-cta ${revealItemClass(ctaVisible)}`}
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 600,
                        fontSize: "16px",
                        letterSpacing: "0",
                        transition: "transform 0.25s ease, filter 0.25s ease",
                      }}
                      onMouseEnter={(e) => {
                        const b = e.currentTarget as HTMLButtonElement;
                        b.style.transform = "translateY(-2px)";
                        b.style.filter = "brightness(1.08)";
                      }}
                      onMouseLeave={(e) => {
                        const b = e.currentTarget as HTMLButtonElement;
                        b.style.transform = "";
                        b.style.filter = "";
                      }}
                    >
                      {activeSlide.cta}
                    </button>
                    {renderOfferDots()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      <style>{`
        .offer-shell{
          width: 100%;
        }
        .offer-tabs-desktop{
          display:grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          width: 90%;
          max-width: 90%;
          margin-left: auto;
          margin-right: auto;
          padding: 0;
          border: none;
          background: transparent;
        }
        .offer-mobile-card-title{
          display: none;
        }
        .offer-tabs-dots{
          display: none;
          justify-content: center;
          gap: 8px;
          margin: 0;
          padding: 0;
        }
        .offer-tab{
          position: relative;
          overflow: hidden;
          isolation: isolate;
          text-align: center;
          background: var(--pk-page);
          border: none;
          border-radius: 12px;
          padding: 12px 8px;
          min-height: 58px;
          max-height: 58px;
          box-sizing: border-box;
          cursor: pointer;
          transition: color 220ms ease;
          color: var(--pk-ink);
          min-width: 0;
        }
        .offer-tab::before{
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: var(--pk-hero);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .offer-tab.is-active::before,
        .offer-tab:hover::before,
        .offer-tab:focus-visible::before{
          transform: scaleX(1);
        }
        .offer-tab-row{
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          height: 100%;
          min-height: 34px;
        }
        .offer-tab-icon{
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin: 0;
          color: var(--pk-ink-55);
        }
        .offer-tab-icon img{
          width: auto;
          height: 34px;
          max-width: 38px;
          object-fit: contain;
        }
        .offer-tab-copy{
          min-width: 0;
          flex: 0 1 auto;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .offer-tab-title{
          font-family: "Montserrat", sans-serif;
          font-weight: 800;
          font-size: 18px;
          line-height: 1.1;
          color: var(--pk-ink);
          transition: color 220ms ease;
          white-space: nowrap;
        }
        .offer-tab.is-active .offer-tab-title,
        .offer-tab:hover .offer-tab-title,
        .offer-tab:focus-visible .offer-tab-title{
          color: var(--pk-on-dark);
        }
        .offer-tab.is-active .offer-tab-icon,
        .offer-tab:hover .offer-tab-icon,
        .offer-tab:focus-visible .offer-tab-icon{
          color: var(--pk-on-dark);
        }
        @media (prefers-reduced-motion: reduce){
          .offer-tab::before{
            transition: none;
          }
          .offer-tab.is-active::before,
          .offer-tab:hover::before,
          .offer-tab:focus-visible::before{
            transform: scaleX(1);
          }
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
          .offer-head{ margin-top: 22px !important; margin-bottom: 41px !important; }
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
          border-radius: 0;
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 8px 0 0;
          position: relative;
          overflow: visible;
          flex: 0 1 auto;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .offer-premium-card-inner > *{
          position: relative;
          z-index: 1;
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
          gap: 0;
          align-items: center;
          flex: 0 1 auto;
          min-height: 0;
        }

        /* Mobile-only row: CTA */
        .offer-gallery-actions{ display: none; }

        .offer-gallery-left{
          flex: 1 1 43.75%;
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
            flex: 1 1 43.75%;
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

        .offer-reveal-item{
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1), transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .offer-reveal-item.is-in{
          opacity: 1;
          transform: translateY(0);
        }
        .offer-gallery-media-shell{
          width: 100%;
          opacity: 0;
          visibility: hidden;
          transition: opacity 1s ease;
        }
        .offer-gallery-media-shell.is-in{
          opacity: 1;
          visibility: visible;
        }
        .offer-gallery-media-placeholder{
          width: 100%;
          aspect-ratio: 6 / 4;
          flex-shrink: 0;
          visibility: hidden;
          pointer-events: none;
        }
        .offer-gallery-right{
          flex: 1 1 56.25%;
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

        .offer-hero-frame{
          width: 100%;
          max-width: 100%;
        }

        /* kebab-case required — camelCase is ignored in plain <style> (was blocking font-weight) */
        h3.offer-title,
        .offer-title{
          font-family: "Montserrat", sans-serif;
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

        @media(min-width:901px){
          .offer-title-wrap{
            display: block;
            width: 100%;
            max-width: 100%;
            min-width: 0;
            box-sizing: border-box;
          }
          h3.offer-title.offer-title-large,
          .offer-title.offer-title-large{
            display: block;
            width: 100%;
            max-width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: clip;
            box-sizing: border-box;
          }
        }

        .offer-title-underline{
          display:none;
        }

        .offer-desc{
          font-family: "Montserrat", sans-serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 1.7;
          color: var(--pk-ink-70);
          margin: 10px 0 18px;
        }

        .offer-features-subheading{
          font-family: 'Montserrat', sans-serif;
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
          font-family: "Montserrat", sans-serif;
          font-weight: 500;
          font-size: 13px;
          line-height: 1.45;
          color: var(--pk-ink-82);
        }

        .offer-cta{
          background-color: var(--pk-accent);
          color: var(--pk-ink);
          border: none;
          border-radius: 12px;
          padding: 9px 22px;
          font-family: "Montserrat", sans-serif;
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
          padding-left: 28px;
          margin: 0;
          padding-top: 10px;
          padding-bottom: 10px;
          font-family: "Montserrat", sans-serif;
          font-weight: 500;
          font-size: 16px;
          line-height: 1.55;
          color: var(--pk-ink-82);
        }
        .offer-bullets--checks li strong{
          font-weight: 700;
          color: var(--pk-ink);
        }
        .offer-bullets--checks li::before{
          content: "✓";
          position: absolute;
          left: 0;
          top: 0.42em;
          width: auto;
          height: auto;
          border-radius: 0;
          background: none;
          box-shadow: none;
          font-family: "Montserrat", sans-serif;
          font-weight: 800;
          font-size: 1.05em;
          line-height: 1;
          color: var(--pk-ink);
        }
        .offer-bullets--checks li::after{
          display: none;
        }
        .offer-cta-desktop{
          margin-top: 20px;
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
          .offer-tabs-desktop{
            display: none;
          }
          .offer-head{
            margin-bottom: 3px !important;
          }
          .offer-mobile-card-title{
            display: block;
            font-family: "Montserrat", sans-serif;
            font-weight: 700;
            font-size: 24px;
            line-height: 1.15;
            letter-spacing: -0.02em;
            color: var(--pk-ink);
            margin: 37px auto 0;
            max-width: 980px;
            text-align: center;
            opacity: 0.35;
            transition: opacity 180ms ease;
          }
          .offer-mobile-card-title.is-visible{
            opacity: 1;
          }
          .offer-shell{
            display: flex;
            flex-direction: column;
            gap: 0;
          }
          .offer-carousel{
            margin-top: 0;
          }
          .offer-tabs-dots{
            display: flex !important;
            margin-top: 14px;
          }
          .offer-title-wrap{
            display: none !important;
          }
          .offer-premium-card{
            flex: 1 1 auto;
            min-height: 0;
            width: 100%;
          }
          .offer-premium-card-inner{
            padding: 0 15px 0;
            flex: 1 1 auto;
            min-height: 0;
          }
          .offer-gallery-grid{
            flex-direction: column;
            gap: 8px;
            flex: 1 1 auto;
            min-height: 0;
          }
          /* Text → image → CTA */
          .offer-gallery-left{ order: 1; }
          .offer-gallery-right{ order: 2; }
          .offer-gallery-actions{ order: 3; }
          .offer-gallery-actions{
            width: 100%;
            display:flex !important;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            margin-top: 8px;
          }
          .offer-cta-desktop{ display:none !important; }
          .offer-cta-mobile{ display:flex !important; justify-content:center; }
          .offer-gallery-left{
            padding: 0 0 16px;
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
          .offer-bullets--checks{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
          }
          .offer-bullets--checks li{
            display: inline-flex;
            align-items: flex-start;
            justify-content: center;
            gap: 8px;
            width: auto;
            max-width: 100%;
            font-size: 14px !important;
            line-height: 1.65 !important;
            padding: 8px 0 !important;
            padding-left: 0 !important;
            text-align: center;
          }
          .offer-bullets--checks li::before{
            position: static;
            top: auto;
            left: auto;
            flex-shrink: 0;
            margin-top: 0.12em;
            font-size: 1em !important;
          }
          /* Match pricing mobile CTA: full card width, same padding & type size */
          .offer-cta{
            align-self: stretch;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            padding: 9px 22px !important;
            font-size: 14px !important;
            font-weight: 600;
            margin-top: 30px !important;
            flex-shrink: 0;
          }
          .notebook-screen{ transform: none; }
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
          .offer-reveal-item,
          .offer-gallery-media-shell{
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

