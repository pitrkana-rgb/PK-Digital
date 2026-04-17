import { useCallback, useState, type CSSProperties } from "react";
import { SectionDivider } from "../../components/SectionDivider";
import { useLanguage } from "../../../../i18n/LanguageContext";

const GOOGLE_STAR = "#fbbc04";

type Review = {
  id: string;
  author: string;
  date: string;
  text: string;
  avatarBg: string;
};

const reviews: Review[] = [
  {
    id: "1",
    author: "Pavel Zezula",
    date: "19. 3. 2026",
    text: "Maximální spokojenost s modernizací mých stránek! Nejvíce oceňuji skvělý osobní přístup a bleskovou rychlost zpracování – vše bylo hotovo do 14 dnů.",
    avatarBg: "linear-gradient(135deg, #5c6bc0, #3949ab)",
  },
  {
    id: "2",
    author: "Marcel Abraham",
    date: "21. 03. 2026",
    text: "Vřele doporučuji, s výsledkem jsem maximálně spokojený. Skvělá komunikace, majitel aktivně vylepšoval mé zadání a výsledek je skvělý. Cílem bylo mít moderní stránky do jednoho měsíce. Výsledek - projekt hotový za polovinu času a design předčil mé očekávání!",
    avatarBg: "linear-gradient(135deg, #00897b, #00695c)",
  },
  {
    id: "3",
    author: "Lucie Horáková",
    date: "22. 1. 2026",
    text: "Skvělá komunikace a výsledek přesně podle domluvy. Přestavba e-shopu proběhla v termínu a zákazníci oceňují nový vzhled i rychlost načítání.",
    avatarBg: "linear-gradient(135deg, #ec407a, #c2185b)",
  },
];

function initialsFrom(name: string): string {
  const p = name.split(/\s+/).filter(Boolean);
  if (p.length >= 2) return (p[0]![0]! + p[1]![0]!).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function toIsoDate(cs: string): string | undefined {
  const m = cs.match(/(\d+)\.\s*(\d+)\.\s*(\d+)/);
  if (!m) return undefined;
  const d = m[1]!.padStart(2, "0");
  const mo = m[2]!.padStart(2, "0");
  return `${m[3]}-${mo}-${d}`;
}

function GoogleStars({ size = 22 }: { size?: number }) {
  return (
    <span
      style={{ display: "inline-flex", gap: "2px", lineHeight: 1, verticalAlign: "middle" }}
      aria-hidden
    >
      {Array.from({ length: 5 }).map((_, si) => (
        <svg
          // biome-ignore lint/suspicious/noArrayIndexKey: static star row
          key={si}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={GOOGLE_STAR}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </span>
  );
}

/** Multicolor Google G — height set via CSS to match adjacent stats block */
function GoogleLogoMark({ style, className }: { style?: CSSProperties; className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      style={{ display: "block", ...style }}
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function GoogleGIcon({ size = 22 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

const cardShell: CSSProperties = {
  boxSizing: "border-box",
  padding: "20px 18px 22px",
  background: "#ffffff",
  border: "1px solid rgba(2, 6, 23, 0.10)",
  borderRadius: "12px",
  boxShadow: "0 20px 48px rgba(2,6,23,0.09)",
};

function ReviewCard({ r }: { r: Review }) {
  return (
    <article
      className="gr-review-card"
      style={{
        ...cardShell,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        className="gr-review-header"
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "10px",
          marginBottom: "12px",
        }}
      >
        <div className="gr-review-author-row" style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              flexShrink: 0,
              background: r.avatarBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              color: "#ffffff",
            }}
          >
            {initialsFrom(r.author)}
          </div>
          <div className="gr-review-name-wrap" style={{ textAlign: "left" }}>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                color: "rgba(7,11,20,0.92)",
              }}
            >
              {r.author}
            </div>
            <time
              dateTime={toIsoDate(r.date)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "11px",
                color: "rgba(7,11,20,0.50)",
              }}
            >
              {r.date}
            </time>
          </div>
        </div>
        <div className="gr-review-g-icon" style={{ flexShrink: 0, opacity: 0.95 }} title="Google">
          <GoogleGIcon size={20} />
        </div>
      </header>

      <div className="gr-review-stars-row" style={{ marginBottom: "10px" }} aria-label="Hodnocení: 5 z 5">
        <GoogleStars size={16} />
      </div>

      <p
        className="gr-review-body"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "13px",
          lineHeight: 1.6,
          color: "rgba(7,11,20,0.74)",
          margin: 0,
          flex: "1 1 auto",
        }}
      >
        {r.text}
      </p>
    </article>
  );
}

const navBtnStyle: CSSProperties = {
  flexShrink: 0,
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "1px solid rgba(2,6,23,0.12)",
  background: "rgba(2,6,23,0.04)",
  color: "rgba(7,11,20,0.82)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "22px",
  lineHeight: 1,
  transition: "background 0.2s ease, border-color 0.2s ease",
};

export const ClientTestimonialsSection = (): JSX.Element => {
  const { language } = useLanguage();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const n = reviews.length;
  const localizedReviews =
    language === "en"
      ? reviews.map((r) => {
          if (r.id === "1") {
            return {
              ...r,
              text: "Maximum satisfaction with the modernization of my website! I especially appreciate the excellent personal approach and very fast delivery - everything was completed within 14 days.",
            };
          }
          if (r.id === "2") {
            return {
              ...r,
              text: "I highly recommend them. I am fully satisfied with the result. Great communication, the owner actively improved my brief, and the output is excellent. The goal was a modern website within one month. Result: completed in half the time and the design exceeded my expectations!",
            };
          }
          if (r.id === "3") {
            return {
              ...r,
              text: "Great communication and a result exactly as agreed. The e-shop rebuild was delivered on time and customers appreciate the new look and loading speed.",
            };
          }
          return r;
        })
      : reviews;

  const goPrev = useCallback(() => {
    setCarouselIndex((i) => (i - 1 + n) % n);
  }, [n]);

  const goNext = useCallback(() => {
    setCarouselIndex((i) => (i + 1) % n);
  }, [n]);

  return (
    <section
      className="google-reviews-section"
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        padding: "76px 0 100px",
        marginTop: "-50px",
        overflow: "visible",
      }}
    >
      <SectionDivider />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(22px, 3.2vw, 38px)",
            color: "#070B14",
            margin: "0 0 40px",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            textAlign: "center",
          }}
        >
          {language === "en" ? "What do customers say about us?" : "Co o nás říkají zákazníci?"}
        </h2>

        <div className="gr-widget-row">
          {/* Left: Google G + stats — no background, white text */}
          <aside className="gr-left-panel">
            <div className="gr-stats-copy">
              <div className="gr-google-logo-col" aria-hidden>
                <GoogleLogoMark className="gr-google-logo-svg" />
              </div>
              <div className="gr-stats-rating-row" aria-label="Hodnocení 5.0 z 5">
                <div className="gr-stats-rating-value">5.0</div>
                <GoogleStars size={26} />
              </div>
              <p className="gr-stats-sub">{language === "en" ? "Based on 3 reviews" : "Na základě 3 hodnocení"}</p>
              <p className="gr-stats-note">
                {language === "en"
                  ? "Clients value our professionalism, speed, and results that drive real growth."
                  : "Naši klienti oceňují profesionalitu, rychlost a výsledky, které přinášejí skutečný růst."}
              </p>
              <a
                className="gr-stats-link"
                href="https://maps.app.goo.gl/HFuawq4yJgxCo54X6"
                target="_blank"
                rel="noopener noreferrer"
              >
                {language === "en" ? "View all reviews" : "Zobrazit všechny recenze"}
              </a>
            </div>
          </aside>

          {/* Desktop / tablet: grid */}
          <div className="gr-cards-grid gr-cards-desktop">
            {localizedReviews.map((r) => (
              <ReviewCard key={r.id} r={r} />
            ))}
          </div>

          {/* Mobile: one row carousel */}
          <div className="gr-carousel-mobile" aria-label="Recenze — carousel">
            <div className="gr-carousel-inner">
              <button
                type="button"
                className="gr-carousel-nav gr-carousel-prev"
                aria-label={language === "en" ? "Previous review" : "Předchozí recenze"}
                onClick={goPrev}
                style={navBtnStyle}
              >
                ‹
              </button>
              <div className="gr-carousel-viewport">
                <div
                  className="gr-carousel-track"
                  style={{
                    transform: `translateX(-${carouselIndex * 100}%)`,
                  }}
                >
                  {localizedReviews.map((r) => (
                    <div key={r.id} className="gr-carousel-slide">
                      <ReviewCard r={r} />
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="gr-carousel-nav gr-carousel-next"
                aria-label={language === "en" ? "Next review" : "Další recenze"}
                onClick={goNext}
                style={navBtnStyle}
              >
                ›
              </button>
            </div>
            <div className="gr-carousel-dots" role="tablist" aria-label={language === "en" ? "Review picker" : "Výběr recenze"}>
              {localizedReviews.map((r, i) => (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  aria-selected={i === carouselIndex}
                  aria-label={`Recenze ${i + 1}`}
                  onClick={() => setCarouselIndex(i)}
                  className="gr-carousel-dot"
                  data-active={i === carouselIndex ? "true" : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .gr-widget-row {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 28px;
          flex-wrap: wrap;
        }
        .gr-left-panel {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          background: transparent;
          box-shadow: none;
          border-radius: 0;
          padding: 0;
          max-width: 320px;
        }
        .gr-google-logo-col {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 100%;
          min-height: 42px;
        }
        .gr-google-logo-col .gr-google-logo-svg {
          height: 40px;
          width: auto;
          max-height: 40px;
          max-width: 120px;
        }
        .gr-stats-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          gap: 0;
          min-width: 0;
        }
        .gr-stats-title {
          font-family: Roboto, "Segoe UI", system-ui, sans-serif;
          font-weight: 700;
          font-size: 26px;
          color: #070B14;
          margin: 0 0 10px;
          line-height: 1.2;
        }
        .gr-stats-rating-row{
          display:flex;
          align-items:center;
          gap:10px;
          margin-bottom: 8px;
          justify-content: center;
        }
        .gr-stats-rating-value{
          font-family: Roboto, "Segoe UI", system-ui, sans-serif;
          font-weight: 800;
          font-size: 22px;
          color: #070B14;
          line-height: 1;
        }
        .gr-stats-stars {
          margin-bottom: 0;
        }
        .gr-stats-sub {
          font-family: Roboto, "Segoe UI", system-ui, sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: rgba(7, 11, 20, 0.62);
          margin: 0;
          line-height: 1.45;
        }
        .gr-stats-note{
          font-family: "Space Grotesk", system-ui, sans-serif;
          font-weight: 500;
          font-size: 20px;
          color: rgba(7,11,20,0.68);
          line-height: 1.6;
          margin: 10px 0 0;
          max-width: 36ch;
        }
        .gr-stats-link {
          display: inline-block;
          margin-top: 10px;
          font-family: Roboto, "Segoe UI", system-ui, sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #070B14;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s ease, opacity 0.2s ease;
        }
        .gr-stats-link:hover {
          color: rgba(7,11,20,0.78);
          opacity: 1;
        }
        .gr-stats-link:focus-visible {
          outline: 2px solid #00e5ff;
          outline-offset: 3px;
          border-radius: 4px;
        }
        .gr-cards-desktop {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          flex: 1 1 0;
          min-width: 0;
          padding-bottom: 16px;
        }
        .gr-carousel-mobile {
          display: none;
          flex: 1 1 100%;
          min-width: 0;
          width: 100%;
        }
        .gr-carousel-inner {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
          width: 100%;
        }
        .gr-carousel-viewport {
          flex: 1 1 0;
          min-width: 0;
          overflow: visible;
          border-radius: 12px;
          padding-bottom: 16px;
        }
        .gr-carousel-track {
          display: flex;
          flex-direction: row;
          transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          align-items: stretch;
        }
        .gr-carousel-slide {
          flex: 0 0 100%;
          min-width: 0;
          box-sizing: border-box;
          height: 100%;
          display: flex;
        }
        .gr-carousel-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 14px;
        }
        .gr-carousel-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          border: none;
          padding: 0;
          background: rgba(2, 6, 23, 0.16);
          cursor: pointer;
          transition: width 0.2s ease, background 0.2s ease;
        }
        .gr-carousel-dot[data-active="true"] {
          width: 22px;
          background: #00e5ff;
        }
        .gr-carousel-nav:hover {
          background: rgba(0, 229, 255, 0.12) !important;
          border-color: rgba(0, 229, 255, 0.35) !important;
        }
        @media (max-width: 1100px) {
          .gr-cards-desktop {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 901px) {
          .gr-carousel-mobile {
            display: none !important;
          }
        }
        @media (max-width: 900px) {
          .gr-cards-desktop {
            display: none !important;
          }
          .gr-carousel-mobile {
            display: block !important;
          }
          .gr-widget-row {
            flex-direction: column;
            align-items: stretch;
          }
          /* Logo + stats stay side-by-side on mobile */
          .gr-left-panel {
            max-width: none;
            margin-bottom: 20px;
            margin-left: auto;
            margin-right: auto;
            flex-direction: column !important;
            align-items: stretch !important;
            justify-content: center;
            width: 100%;
            text-align: center;
          }
          .gr-stats-copy {
            text-align: center !important;
            align-items: center !important;
          }
          .gr-google-logo-col {
            min-height: 42px !important;
            margin-bottom: 6px !important;
          }
          .google-reviews-section {
            padding: 56px 0 !important;
          }
          .gr-carousel-mobile .gr-review-card {
            text-align: center !important;
            height: clamp(340px, 56vh, 420px);
            max-height: 420px;
          }
          .gr-carousel-mobile .gr-review-header {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .gr-carousel-mobile .gr-review-author-row {
            flex-direction: column !important;
            align-items: center !important;
          }
          .gr-carousel-mobile .gr-review-name-wrap {
            text-align: center !important;
          }
          .gr-carousel-mobile .gr-review-g-icon {
            margin-top: 4px;
          }
          .gr-carousel-mobile .gr-review-stars-row {
            display: flex !important;
            justify-content: center !important;
          }
          .gr-carousel-mobile .gr-review-body {
            text-align: center !important;
            display: -webkit-box;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .gr-carousel-track {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};
