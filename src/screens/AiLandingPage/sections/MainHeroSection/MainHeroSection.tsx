import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { HeroCompositeFrame } from "./HeroCompositeFrame";
import { pk } from "../../../../design/pkLandingColors";

const HERO_TYPING = { typeMs: 1000, holdMs: 2000, deleteMs: 1000, startDelayMs: 1000 } as const;
/** Align hero primary/secondary CTA height with header CTA. */
const HERO_CTA_PAD_Y = Math.round(11 * 0.8);
const HERO_CTA_PAD_X = Math.round(28 * 0.8);

const HERO_TYPING_MESSAGES_CS = [
  "KVALITNÍ WEB JE INVESTICE",
  "ZÍSKÁTE PROTOTYP WEBU ZDARMA",
  "DODÁVÁME RYCHLE A NA MÍRU",
  "ZVYŠUJEME POČTY ZÁKAZNÍKŮ",
  "PRO KAŽDÝ TYP BUSINESSU",
  "ŽÁDNÉ MĚSÍČNÍ POPLATKY",
  "MOŽNÁ PODPORA 24/7",
] as const;

const HERO_TYPING_MESSAGES_EN = [
  "A QUALITY WEBSITE IS AN INVESTMENT",
  "GET A FREE WEBSITE PROTOTYPE",
  "WE DELIVER FAST AND TAILORED",
  "WE GROW YOUR CUSTOMER BASE",
  "FOR EVERY TYPE OF BUSINESS",
  "NO MONTHLY FEES",
  "SUPPORT AVAILABLE 24/7",
] as const;

const HeroTypingLine = ({ messages }: { messages: readonly string[] }) => {
  const [text, setText] = useState("");
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setText(messagesRef.current[0] ?? "");
      return;
    }
    let cancelled = false;
    let msgIndex = 0;
    let phase: "type" | "hold" | "del" = "type";
    let phaseStart = performance.now();
    let raf = 0;
    let loopStarted = false;

    const tick = (now: number) => {
      if (cancelled) return;
      const list = messagesRef.current;
      const msg = list[msgIndex] ?? "";
      const elapsed = now - phaseStart;
      if (phase === "type") {
        const p = Math.min(1, elapsed / HERO_TYPING.typeMs);
        setText(msg.slice(0, Math.max(0, Math.ceil(p * msg.length))));
        if (p >= 1) {
          phase = "hold";
          phaseStart = now;
        }
      } else if (phase === "hold") {
        setText(msg);
        if (elapsed >= HERO_TYPING.holdMs) {
          phase = "del";
          phaseStart = now;
        }
      } else {
        const p = Math.min(1, elapsed / HERO_TYPING.deleteMs);
        setText(msg.slice(0, Math.max(0, Math.floor((1 - p) * msg.length))));
        if (p >= 1) {
          msgIndex = (msgIndex + 1) % list.length;
          phase = "type";
          phaseStart = now;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (cancelled || loopStarted) return;
      loopStarted = true;
      phaseStart = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const delayTimer = window.setTimeout(startLoop, HERO_TYPING.startDelayMs);
    return () => {
      cancelled = true;
      window.clearTimeout(delayTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="hero-typing-line"
      aria-live="polite"
      aria-atomic="true"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "nowrap",
        gap: "10px",
        width: "100%",
        minHeight: "44px",
        margin: "0 0 28px 0",
        maxWidth: "640px",
        overflow: "hidden",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 600,
        fontSize: "clamp(22px, 3.2vw, 26px)",
        letterSpacing: "0.04em",
        lineHeight: 1.35,
        color: pk.onDark92,
      }}
    >
      <div className="hero-typing-inner">
        <span aria-hidden="true" style={{ flexShrink: 0, color: pk.onDark }}>
          ✓
        </span>
        <span
          className="hero-typing-text"
          style={{
            minWidth: 0,
            flex: "1 1 auto",
            textAlign: "left",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {text}
          <span className="hero-typing-cursor" aria-hidden="true">
            |
          </span>
        </span>
      </div>
    </div>
  );
};

const splitTextForReveal = (text: string): [string, string] => {
  const midpoint = Math.floor(text.length / 2);
  const splitAt = text.indexOf(" ", midpoint);
  if (splitAt === -1) return [text, ""];
  return [text.slice(0, splitAt), text.slice(splitAt + 1)];
};

/* ── Scroll indicator ─────────────────────────────────────────────── */
const ScrollIndicator = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
      marginTop: "48px",
    }}
  >
    <span
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "12px",
        fontWeight: 400,
        color: pk.ink55,
        letterSpacing: "0.1em",
        textTransform: "uppercase" as const,
      }}
    >
      Scroll
    </span>
    <div className="animate-bounce" style={{ color: pk.accent }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  </div>
);

export const MainHeroSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = language === "en" ? {
    headlinePre: "Next‑generation websites with",
    headlineMid: "that",
    headlineAccent: "change the rules and bring customers",
    subheading: "Websites and AI‑powered apps designed for growth, performance, and scale. Technology that delivers measurable results and a competitive edge.",
    ctaPrimary: "Contact us",
    ctaSecondary: "Our services",
  } : {
    headlinePre: "Weby nové generace s",
    headlineMid: ", které",
    headlineAccent: "mění pravidla hry a přivádějí zákazníky",
    subheading: "Weby a aplikace s podporou AI navržené pro růst, výkon a škálování. Technologie, které přinášejí měřitelné výsledky a konkurenční výhodu.",
    ctaPrimary: "Kontaktujte nás",
    ctaSecondary: "Naše služby",
  };
  const [subheadingLead, subheadingTrail] = splitTextForReveal(t.subheading);
  const typingMessages = language === "en" ? HERO_TYPING_MESSAGES_EN : HERO_TYPING_MESSAGES_CS;

  return (
    <section
      className="relative w-full flex items-center justify-center hero-section-mobile"
      style={{
        minHeight: "max(100vh, 920px)",
        paddingTop: "44px",
        paddingBottom: "0",
        marginTop: "-50px",
        marginBottom: "0px",
        backgroundColor: "transparent",
      }}
    >
      {/* Hero content — same horizontal alignment as other sections (max-width 1536px + 24px padding) */}
      <div
        className="hero-shell relative z-10"
        style={{
          width: "100%",
          maxWidth: "none",
          marginLeft: 0,
          marginRight: 0,
          paddingLeft: 0,
          paddingRight: 0,
          boxSizing: "border-box",
        }}
      >
        <div className="hero-grid">
          <div className="hero-left-rail">
          <div className="hero-content-shift">
            <div
              className="flex flex-col items-center md:items-start animate-fade-in hero-content-wrap"
              style={{ width: "100%", maxWidth: "none", padding: 0, marginTop: 0 }}
            >

        <div className="hero-heading-block">
        {/* Headline */}
        <h1 className="hero-headline" style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(13px, 3.6vw, 32px)",
          lineHeight: 1.05,
          color: pk.onDark,
          margin: "0 0 16px 0",
          letterSpacing: "-0.02em",
          maxWidth: "100%",
          width: "100%",
        }}>
          <span className="hero-headline-part hero-headline-part-left">
            {t.headlinePre}{" "}
            <span style={{
              background: pk.gradientPopular,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: pk.heroHeadlineGlow,
            }}>AI</span>
            {t.headlineMid ? `${t.headlineMid}` : ""}
          </span>{" "}
          <span className="hero-headline-part hero-headline-part-right" style={{
            background: pk.gradientPopular,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: pk.heroHeadlineGlow,
          }}>{t.headlineAccent}</span>
        </h1>

        {/* Paragraph */}
        <p className="hero-subheading" style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 400,
          fontSize: "clamp(14px, 2.0vw, 17px)",
          lineHeight: 1.65,
          color: pk.onDark88,
          maxWidth: "640px",
          margin: "0 0 20px 0",
        }}>
          <span className="hero-subheading-part hero-subheading-part-left">{subheadingLead}</span>{" "}
          <span className="hero-subheading-part hero-subheading-part-right">{subheadingTrail}</span>
        </p>
        </div>

        <HeroTypingLine messages={typingMessages} />

        {/* Mobile-only: show PC frame under subheading */}
        <div className="hero-mobile-frame" aria-hidden="true">
          <HeroCompositeFrame imgClassName="hero-mobile-frame-img" />
        </div>

        {/* CTAs */}
        <div className="hero-actions-wrap">
        <div className="hero-cta-row flex flex-wrap items-center justify-center md:justify-start" style={{ gap: "16px" }}>
          <button
            id="hero-primary-cta"
            type="button"
            className="animate-pulse-glow hero-primary-btn landing-primary-cta"
            onClick={() => navigate("/napiste-nam")}
            style={{
              color: pk.ink,
              border: "none",
              borderRadius: "12px",
              padding: `${HERO_CTA_PAD_Y}px ${HERO_CTA_PAD_X}px`,
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: "16px",
              cursor: "pointer",
              transition: "transform 0.25s ease, filter 0.25s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = "translateY(-3px)"; b.style.filter = "brightness(1.1)"; }}
            onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = ""; b.style.filter = ""; }}
            onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)"; }}
            onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)"; }}
          >
            {t.ctaPrimary}
          </button>

          <button
            id="hero-secondary-cta"
            type="button"
            className="hero-secondary-btn"
            onClick={() => {
              const el = document.getElementById("co-nabizime");
              if (el) {
                const headerOffset = 80;
                const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
                window.scrollTo({ top, behavior: "smooth" });
              }
            }}
            style={{
              background: pk.onDark05,
              color: pk.onDark,
              border: `1px solid ${pk.accent25}`,
              borderRadius: "12px",
              padding: `${HERO_CTA_PAD_Y}px ${HERO_CTA_PAD_X}px`,
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              cursor: "pointer",
              transition: "background 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
              whiteSpace: "nowrap",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = pk.onDark10; b.style.borderColor = pk.onDark40; }}
            onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = pk.onDark05; b.style.borderColor = pk.onDarkBorder20; }}
            onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)"; }}
            onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
          >
            {t.ctaSecondary}
          </button>
        </div>

        <div
          className="hero-google-overview"
          style={{
            marginTop: "30px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          <div aria-hidden="true" style={{ width: 28, height: 28, flexShrink: 0 }}>
            <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
              <path fill={pk.brandGoogleBlue} d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill={pk.brandGoogleGreen} d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill={pk.brandGoogleYellow} d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill={pk.brandGoogleRed} d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 18, color: pk.onDark92, lineHeight: 1 }}>
              5.0
            </div>
            <div aria-label="5 out of 5" style={{ display: "inline-flex", gap: 3, color: pk.ratingStar }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </div>
          </div>
        </div>

        </div>
            </div>
          </div>
          </div>

          {/* Right media: PC frame (desktop only) */}
          <div className="hero-media" aria-hidden="true">
            <HeroCompositeFrame imgClassName="hero-pc-frame" />
          </div>
        </div>
      </div>

      {/* Desktop-only: constrain PC frame to page width rail */}
      <div
        className="hero-media-rail"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(100%, 1400px)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <div className="hero-media-rail-inner">
          <HeroCompositeFrame imgClassName="hero-pc-frame" />
        </div>
      </div>

      <style>{`
        @keyframes scroll-dot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(12px); opacity: 0.3; }
        }
        @keyframes heroRevealLeft {
          from { opacity: 0; transform: translateX(-40px); filter: blur(10px); }
          to { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        @keyframes heroRevealRight {
          from { opacity: 0; transform: translateX(40px); filter: blur(10px); }
          to { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-scroll-dot { animation: scroll-dot 1.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .animate-scroll-dot { animation: none; } }
        @keyframes heroTypingCursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .hero-typing-cursor {
          display: inline-block;
          margin-left: 1px;
          font-weight: 400;
          animation: heroTypingCursorBlink 1s step-end infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-typing-cursor { animation: none; opacity: 1; }
        }
        .hero-typing-inner {
          display: contents;
        }
        @media (min-width: 769px) {
          .hero-typing-line {
            justify-content: flex-start !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }
        #hero-primary-cta:focus-visible, #hero-secondary-cta:focus-visible {
          outline: 2px solid var(--pk-accent); outline-offset: 3px;
        }
        .hero-headline-part,
        .hero-subheading-part,
        .hero-actions-wrap{
          display: inline-block;
          opacity: 0;
          will-change: transform, opacity, filter;
        }
        .hero-headline-part-left{
          animation: heroRevealLeft 900ms cubic-bezier(0.2,0.8,0.2,1) forwards;
        }
        .hero-headline-part-right{
          animation: heroRevealRight 900ms cubic-bezier(0.2,0.8,0.2,1) forwards;
        }
        .hero-subheading-part-left{
          animation: heroRevealLeft 900ms cubic-bezier(0.2,0.8,0.2,1) forwards;
          animation-delay: 1000ms;
        }
        .hero-subheading-part-right{
          animation: heroRevealRight 900ms cubic-bezier(0.2,0.8,0.2,1) forwards;
          animation-delay: 1000ms;
        }
        .hero-actions-wrap{
          animation: heroFadeUp 700ms cubic-bezier(0.2,0.8,0.2,1) forwards;
          animation-delay: 2000ms;
        }
        .hero-content-wrap {
          text-align: center;
        }
        .hero-grid{
          display: flex;
          flex-direction: column;
          gap: 40px;
          align-items: center;
        }
        .hero-left-rail{
          width: 100%;
          max-width: 1400px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 24px;
          padding-right: 24px;
          box-sizing: border-box;
        }
        .hero-media{
          display: none;
        }
        .hero-mobile-frame{ display:none; }
        .hero-media-rail{ display:none; }
        .hero-media-rail-inner{ display:none; }
        @media (min-width: 769px) {
          .hero-content-shift{
            transform: translateY(-20px);
          }
          .hero-heading-block {
            transform: translateY(-30px);
          }
          .hero-google-overview {
            justify-content: flex-start !important;
          }
          /* Left content aligns with header logo rail */
          .hero-left-rail{
            padding-right: 20px;
          }
          .hero-section-mobile{
            /* Keep hero tall enough to match the standard notebook/video visual height */
            min-height: 860px !important;
          }
          .hero-content-wrap{
            margin-top: 0 !important;
            max-width: 50%;
          }
          .hero-grid{
            display: block;
            position: relative;
          }
          /* Use page-width rail for right media alignment */
          .hero-media{ display:none !important; }
          .hero-media-rail{ display:block !important; }
          .hero-media-rail-inner{
            display: block;
            position: absolute;
            right: 20px;
            top: 50%;
            /* Single scale for frame + screen slots. 0.7168 × 1.1 ≈ +10% vs prior desktop size. */
            transform: translateY(calc(-50% + 50px)) scale(0.78848);
            transform-origin: right center;
            width: min(56vw, 920px);
            max-width: 920px;
          }
          .hero-media-rail-inner .hero-pc-frame{
            width: 100%;
            height: auto;
            display: block;
          }
          /* Whole composite (frame + screen clips) fades in in place — 1s */
          .hero-media-rail-inner .hero-composite-anim {
            opacity: 0;
            animation: heroCompositeFadeIn 2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            animation-delay: 1000ms;
            will-change: opacity;
          }
          .hero-content-wrap {
            text-align: left;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box;
          }
          .hero-headline,
          .hero-subheading {
            box-sizing: border-box;
          }
          .hero-headline {
            width: 60% !important;
            max-width: 60% !important;
            box-sizing: border-box;
          }
          .hero-subheading {
            width: 56% !important;
            max-width: 56% !important;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .hero-headline {
            margin-left: 0;
            margin-right: 0;
          }
          .hero-subheading {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }
        @keyframes heroCompositeFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        /* ── Mobile hero adjustments ────────────── */
        @media (max-width: 768px) {
          .hero-section-mobile{
            min-height: auto !important;
            padding-top: 100px !important;
            padding-bottom: 20px !important;
            margin-top: 0 !important;
          }
          .hero-rating-pill { display: none !important; }
          .hero-subheading{ display:block !important; }
          .hero-mobile-frame{
            display:block !important;
            width: min(520px, 100%);
            margin: 10px auto 18px;
            opacity: 0.98;
            filter: drop-shadow(0 18px 40px var(--pk-slate-tint-16));
          }
          .hero-mobile-frame-img{
            opacity: 1;
            transform: none;
            will-change: auto;
          }
          .hero-mobile-frame .hero-composite-anim {
            opacity: 0;
            animation: heroCompositeFadeIn 2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            animation-delay: 1000ms;
            will-change: opacity;
          }
          .hero-shell {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .hero-content-wrap {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin-top: 20px !important;
          }
          .hero-headline {
            font-size: 19px !important;
            line-height: 1.1 !important;
            max-width: 100% !important;
            margin-bottom: 10px !important;
          }
          .hero-subheading {
            max-width: 340px !important;
            font-size: 14px !important;
            line-height: 1.5 !important;
            margin-left: auto !important;
            margin-right: auto !important;
            margin-bottom: 20px !important;
          }
          .hero-typing-inner {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            max-width: 100%;
            flex-wrap: wrap;
          }
          .hero-typing-line {
            font-size: clamp(14px, 3.6vw, 20px) !important;
            min-height: 36px !important;
            justify-content: center !important;
            flex-wrap: wrap !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .hero-typing-text {
            flex: 0 1 auto !important;
            text-align: center !important;
            white-space: normal !important;
            justify-content: center;
          }
          .hero-primary-btn, .hero-secondary-btn {
            padding: 9px 22px !important;
            font-size: 14px !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-mobile-frame-img{
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
          .hero-media-rail-inner .hero-composite-anim,
          .hero-mobile-frame .hero-composite-anim {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
};
