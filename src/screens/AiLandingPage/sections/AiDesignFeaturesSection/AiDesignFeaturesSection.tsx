import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SectionDivider } from "../../components/SectionDivider";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";

type StepItem = {
  num: string;
  title: string;
  description: string;
};

const steps: StepItem[] = [
  {
    num: "01",
    title: "Nezávazná konzultace",
    description:
      "Vyplníte krátký dotazník a do 24 hodin vám zavolám, abychom domluvili bezplatnou konzultaci a probrali vaši představu o webu.",
  },
  {
    num: "02",
    title: "Návrh webu zdarma",
    description:
      "Do 3 dnů získáte ukázku front-end verze webu a cenovou nabídku na míru. Podle prototypu se rozhodnete, zda chcete pokračovat.",
  },
  {
    num: "03",
    title: "Vývoj webu",
    description:
      "Po schválení prototypu připravím kompletní web, který je standardně hotový do 14 dnů dle náročnosti projektu.",
  },
  {
    num: "04",
    title: "Předání a správa",
    description:
      "Web vám osobně vysvětlím, ukážu statistiky návštěvnosti a naučím vás, jak jej jednoduše upravovat.",
  },
];

const stepsEn: StepItem[] = [
  {
    num: "01",
    title: "Free consultation",
    description:
      "You fill in a short form and within 24 hours I call to schedule a free consultation and discuss your website goals.",
  },
  {
    num: "02",
    title: "Free website design",
    description:
      "Within 3 days you get a front-end prototype and a tailored pricing proposal. Then you decide whether to continue.",
  },
  {
    num: "03",
    title: "Website development",
    description:
      "After prototype approval, I build the complete website, typically delivered within 14 days based on project complexity.",
  },
  {
    num: "04",
    title: "Handover and management",
    description:
      "I personally walk you through the website, show key metrics, and teach you how to edit it easily.",
  },
];

export const AiDesignFeaturesSection = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const items = isEn ? stepsEn : steps;

  const sectionRef = useRef<HTMLElement | null>(null);
  const howStepsRef = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);
  const [mobileRail, setMobileRail] = useState<{
    left: number;
    top: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        obs.disconnect();
      },
      {
        threshold: 0.12,
        // Require a bit more scroll before starting animations
        rootMargin: "-50px 0px 0px 0px",
      },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useLayoutEffect(() => {
    const wrap = howStepsRef.current;
    if (!wrap) return;

    const update = (): void => {
      if (typeof window === "undefined" || window.innerWidth > 767) {
        setMobileRail(null);
        return;
      }
      const dots = wrap.querySelectorAll<HTMLElement>(".how-step-dot");
      if (dots.length < 2) return;
      const c = wrap.getBoundingClientRect();
      const first = dots[0].getBoundingClientRect();
      const last = dots[dots.length - 1].getBoundingClientRect();
      const centerY = (r: DOMRect) => r.top + r.height / 2 - c.top;
      const centerX = (r: DOMRect) => r.left + r.width / 2 - c.left;
      const top = centerY(first);
      const h = Math.max(0, centerY(last) - top);
      setMobileRail({
        left: centerX(first) - 2,
        top,
        height: h,
      });
    };

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(update);
    });
    ro.observe(wrap);
    window.addEventListener("resize", update);
    requestAnimationFrame(() => requestAnimationFrame(update));
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [items, started, language]);

  return (
  <section ref={sectionRef} id="features" style={{ width: "100%", backgroundColor: pk.hero, padding: "55px 0 95px", marginTop: "-50px", marginBottom: "-50px" }}>
    <SectionDivider />
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>

      {/* Section header */}
      <div className="how-row">
        <div className="how-left">
          <h2 className="how-title">
            {isEn ? "How the " : "Jak probíhá "}
            <span style={{ color: pk.onDark }}>{isEn ? "collaboration works" : "spolupráce"}</span>
          </h2>
          <p className="how-sub section-sub">
            {isEn
              ? "A straightforward path from the first consultation to launching your finished website."
              : "Jednoduchý proces od první konzultace až po spuštění hotového webu."}
          </p>
        </div>

        <div
          ref={howStepsRef}
          className="how-steps"
          role="list"
          aria-label={isEn ? "Steps" : "Kroky"}
        >
          <div
            className={`how-progress${started ? " is-started" : ""}`}
            aria-hidden="true"
            style={
              mobileRail
                ? {
                    left: mobileRail.left,
                    top: mobileRail.top,
                    height: mobileRail.height,
                    right: "auto",
                    bottom: "auto",
                    width: 4,
                  }
                : undefined
            }
          >
            <div className="how-progress-base" />
            <div className="how-progress-fill" />
          </div>
          {items.map((step, idx) => (
            <div
              key={step.num}
              className={`how-step${started ? " is-started" : ""}`}
              style={{ transitionDelay: `${idx * 1000}ms` }}
              role="listitem"
            >
              <div className="how-step-top">
                <div className="how-step-dot" aria-hidden="true">
                  {step.num}
                </div>
              </div>

              <div className="how-step-body">
                <div className="how-step-title">{step.title}</div>
                <div className="how-step-desc">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <style>{`
      .how-row{
        display:grid;
        grid-template-columns: minmax(260px, 360px) 1fr;
        gap: 34px;
        align-items: center;
      }
      .how-left{
        display:flex;
        flex-direction: column;
        gap: 14px;
        align-items: center;
        text-align: center;
      }
      .how-title{
        margin: 0;
        font-family: "Montserrat", sans-serif;
        font-weight: 800;
        font-size: clamp(26px, 3.6vw, 42px);
        line-height: 1.08;
        letter-spacing: -0.02em;
        color: var(--pk-on-dark-92);
      }
      .how-sub{
        margin: 0;
        font-family: "Montserrat", sans-serif;
        font-weight: 400;
        font-size: 18px;
        line-height: 1.6;
        color: var(--pk-on-dark-60);
        max-width: 42ch;
      }

      .how-steps{
        display:grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 22px;
        align-items: start;
        position: relative;
        /* Line center y = 80px + 2px; 54px dot center at 27px → top at 55px */
        padding-top: 55px;
      }
      .how-progress{
        position:absolute;
        left: 18px;
        right: 18px;
        top: 80px;
        height: 4px;
        z-index: 0;
      }
      .how-progress-base{
        position:absolute;
        inset:0;
        border-radius: 999px;
        background: var(--pk-on-dark-border-12);
      }
      .how-progress-fill{
        position:absolute;
        top: 0;
        height: 4px;
        border-radius: 999px;
        transform-origin: left;
        transform: scaleX(0);
        inset: 0;
        background: var(--pk-gradient-popular);
      }
      .how-progress.is-started .how-progress-fill{
        animation: howFill 4000ms linear forwards;
      }
      @keyframes howFill{
        from{ transform: scaleX(0); }
        to{ transform: scaleX(1); }
      }
      .how-step{
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 420ms cubic-bezier(0.2,0.8,0.2,1), transform 420ms cubic-bezier(0.2,0.8,0.2,1);
        position: relative;
        z-index: 1;
      }
      .how-step.is-started{
        opacity: 1;
        transform: translateY(0);
      }
      .how-step-top{
        display:flex;
        flex-direction: column;
        align-items:center;
        justify-content: center;
        margin-bottom: 14px;
      }
      .how-step-dot{
        width: 54px;
        height: 54px;
        border-radius: 999px;
        display:flex;
        align-items:center;
        justify-content:center;
        background: var(--pk-panel-dark);
        border: 1px solid var(--pk-on-dark-border-16);
        font-family: "Montserrat", sans-serif;
        font-weight: 800;
        font-size: 18px;
        letter-spacing: 0.08em;
        color: var(--pk-on-dark-88);
        position: relative;
        z-index: 2;
      }
      .how-step-body{
        display:flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        text-align: center;
      }
      .how-step-title{
        font-family: "Montserrat", sans-serif;
        font-weight: 800;
        font-size: 16px;
        line-height: 1.25;
        color: var(--pk-on-dark-92);
        margin: 0;
        max-width: 18ch;
      }
      .how-step-desc{
        font-family: "Montserrat", sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 1.65;
        color: var(--pk-on-dark-60);
      }

      @media(max-width: 1023px){
        .how-row{
          grid-template-columns: 1fr;
          gap: 24px;
        }
        .how-sub{ max-width: none; }
      }
      @media(max-width: 767px){
        .how-steps{
          grid-template-columns: 1fr;
          gap: 18px;
          padding-top: 0;
          padding-left: 8px;
        }
        /* Vertical rail: position/size from inline style (dot centers); same 4s linear fill as desktop */
        .how-progress{
          right: auto;
          width: 4px;
          height: auto;
        }
        .how-progress-base{
          border-radius: 999px;
          inset: 0;
        }
        .how-progress-fill{
          inset: 0;
          height: auto;
          width: auto;
          transform: scaleY(0);
          transform-origin: top center;
          animation: none;
        }
        .how-progress.is-started .how-progress-fill{
          animation: howFillY 4000ms linear forwards;
        }
        @keyframes howFillY{
          from{ transform: scaleY(0); }
          to{ transform: scaleY(1); }
        }
        .how-step{
          display: grid;
          grid-template-columns: 54px minmax(0, 1fr);
          gap: 14px;
          align-items: start;
        }
        .how-step-top{
          display:flex;
          margin-bottom: 0;
        }
        .how-step-body{
          align-items: flex-start;
          text-align: left;
          padding-top: 4px;
        }
        .how-step-title{
          max-width: none;
        }
      }
    `}</style>
  </section>
);
};
