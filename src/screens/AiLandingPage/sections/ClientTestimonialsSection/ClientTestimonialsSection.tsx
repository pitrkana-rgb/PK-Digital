import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { SectionDivider } from "../../components/SectionDivider";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";

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
    avatarBg: pk.avatarA,
  },
  {
    id: "2",
    author: "Marcel Abraham",
    date: "21. 03. 2026",
    text: "Vřele doporučuji, s výsledkem jsem maximálně spokojený. Skvělá komunikace, majitel aktivně vylepšoval mé zadání a výsledek je skvělý. Cílem bylo mít moderní stránky do jednoho měsíce. Výsledek - projekt hotový za polovinu času a design předčil mé očekávání!",
    avatarBg: pk.avatarB,
  },
  {
    id: "3",
    author: "Lucie Horáková",
    date: "22. 1. 2026",
    text: "Skvělá komunikace a výsledek přesně podle domluvy. Přestavba e-shopu proběhla v termínu a zákazníci oceňují nový vzhled i rychlost načítání.",
    avatarBg: pk.avatarC,
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
          fill={pk.ratingStar}
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
        fill={pk.brandGoogleBlue}
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill={pk.brandGoogleGreen}
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill={pk.brandGoogleYellow}
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill={pk.brandGoogleRed}
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function GoogleGIcon({ size = 22 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <path
        fill={pk.brandGoogleBlue}
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill={pk.brandGoogleGreen}
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill={pk.brandGoogleYellow}
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill={pk.brandGoogleRed}
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

const MOBILE_STAR_SIZE = 22; /* 18px + 20% */

const cardShell: CSSProperties = {
  boxSizing: "border-box",
  padding: "20px 18px 22px",
  background: pk.page,
  border: `1px solid ${pk.slateTint10}`,
  borderRadius: "12px",
  boxShadow: `0 20px 48px ${pk.slateTint09}`,
};

function ReviewCardMobileSlide({ r, isEn }: { r: Review; isEn: boolean }) {
  return (
    <div className="gr-review-mobile-slide-inner">
      <div className="gr-review-mobile-top" aria-label={isEn ? "Rating: 5 out of 5" : "Hodnocení: 5 z 5"}>
        <GoogleStars size={MOBILE_STAR_SIZE} />
        <span className="gr-review-score">5 / 5</span>
      </div>
      <p className="gr-review-body gr-review-body--mobile">{r.text}</p>
    </div>
  );
}

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
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              color: pk.onDark,
            }}
          >
            {initialsFrom(r.author)}
          </div>
          <div className="gr-review-name-wrap" style={{ textAlign: "left" }}>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                color: pk.ink,
              }}
            >
              {r.author}
            </div>
            <time
              dateTime={toIsoDate(r.date)}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "11px",
                color: pk.ink,
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
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "13px",
          lineHeight: 1.6,
          color: pk.ink,
          margin: 0,
          flex: "1 1 auto",
        }}
      >
        {r.text}
      </p>
    </article>
  );
}

export const ClientTestimonialsSection = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const [carouselIndex, setCarouselIndex] = useState(0);
  const n = reviews.length;
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);
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

  const activeReview = localizedReviews[carouselIndex] ?? localizedReviews[0]!;
  const [viewportWidthPx, setViewportWidthPx] = useState(0);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth;
      if (w > 0) setViewportWidthPx(w);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const goPrev = useCallback(() => {
    setCarouselIndex((i) => (i - 1 + n) % n);
  }, [n]);

  const goNext = useCallback(() => {
    setCarouselIndex((i) => (i + 1) % n);
  }, [n]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
    touchDeltaXRef.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const startX = touchStartXRef.current;
    if (startX == null) return;
    const x = e.touches[0]?.clientX ?? startX;
    touchDeltaXRef.current = x - startX;
  };
  const onTouchEnd = () => {
    const dx = touchDeltaXRef.current;
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
    const threshold = 42;
    if (dx > threshold) goPrev();
    if (dx < -threshold) goNext();
  };

  return (
    <section
      id="reference"
      className="google-reviews-section google-reviews-section--on-hero landing-scroll-target"
      style={{
        width: "100%",
        background: pk.gradientSectionPremium,
        color: pk.onDark,
        padding: "76px 0 100px",
        marginTop: 0,
        position: "relative",
        zIndex: 3,
        overflow: "hidden",
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
          className="google-reviews-heading pk-section-heading pk-section-heading--on-dark"
          style={{
            margin: "0 auto 40px",
            textAlign: "center",
            maxWidth: "980px",
          }}
        >
          {language === "en" ? "What do clients say about me?" : "Co o mně říkají klienti?"}
        </h2>

        <div className="gr-widget-row">
          {/* Left: Google G + stats — no background, white text */}
          <aside className="gr-left-panel">
            <div className="gr-stats-copy">
              <div className="gr-stats-rating-row" aria-label="Hodnocení 5.0 z 5">
                <GoogleLogoMark className="gr-google-logo-inline" />
                <div className="gr-stats-rating-value">5.0</div>
                <GoogleStars size={26} />
                <span className="gr-stats-score">5 / 5</span>
              </div>
              <p className="gr-stats-sub">{isEn ? "5 Google reviews" : "5 Google recenzí"}</p>
              <p className="gr-stats-note">
                {isEn
                  ? "Clients value my professionalism, speed, and results that drive real growth."
                  : "Moji klienti oceňují profesionalitu, rychlost a výsledky, které přinášejí skutečný růst."}
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
          <div className="gr-carousel-mobile" aria-label={isEn ? "Reviews carousel" : "Recenze — carousel"}>
            <article className="gr-mobile-review-unit">
              <div
                className="gr-carousel-viewport"
                ref={viewportRef}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onTouchCancel={onTouchEnd}
              >
                <div
                  className="gr-carousel-track"
                  style={{
                    width: viewportWidthPx > 0 ? viewportWidthPx * n : undefined,
                    transform:
                      viewportWidthPx > 0
                        ? `translate3d(-${carouselIndex * viewportWidthPx}px, 0, 0)`
                        : undefined,
                  }}
                >
                  {localizedReviews.map((r) => (
                    <div
                      key={r.id}
                      className="gr-carousel-slide"
                      style={
                        viewportWidthPx > 0
                          ? {
                              flex: `0 0 ${viewportWidthPx}px`,
                              width: viewportWidthPx,
                              minWidth: viewportWidthPx,
                              maxWidth: viewportWidthPx,
                            }
                          : undefined
                      }
                    >
                      <ReviewCardMobileSlide r={r} isEn={isEn} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="gr-mobile-card-bottom">
                <footer className="gr-review-mobile-footer">
                  <span className="gr-review-mobile-author">{activeReview.author}</span>
                  <time className="gr-review-mobile-date" dateTime={toIsoDate(activeReview.date)}>
                    {activeReview.date}
                  </time>
                </footer>
                <div className="gr-carousel-dots" role="tablist" aria-label={isEn ? "Review picker" : "Výběr recenze"}>
                  {localizedReviews.map((r, i) => (
                    <button
                      key={r.id}
                      type="button"
                      role="tab"
                      aria-selected={i === carouselIndex}
                      aria-label={isEn ? `Review ${i + 1}` : `Recenze ${i + 1}`}
                      onClick={() => setCarouselIndex(i)}
                      className="gr-carousel-dot"
                      data-active={i === carouselIndex ? "true" : undefined}
                    />
                  ))}
                </div>
              </div>
            </article>
            <a
              className="gr-stats-link gr-stats-link-mobile"
              href="https://maps.app.goo.gl/HFuawq4yJgxCo54X6"
              target="_blank"
              rel="noopener noreferrer"
            >
              {isEn ? "View all reviews" : "Zobrazit všechny recenze"}
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .google-reviews-section--on-hero .google-reviews-heading,
        .google-reviews-section--on-hero .gr-stats-title,
        .google-reviews-section--on-hero .gr-stats-rating-value,
        .google-reviews-section--on-hero .gr-stats-score,
        .google-reviews-section--on-hero .gr-stats-sub,
        .google-reviews-section--on-hero .gr-stats-note,
        .google-reviews-section--on-hero .gr-stats-link,
        .google-reviews-section--on-hero .gr-stats-link:hover,
        .google-reviews-section--on-hero .gr-stats-link-mobile {
          color: var(--pk-on-dark);
        }
        /* Dots live inside white mobile cards — use dark ink, not on-dark hero text colors */
        .google-reviews-section--on-hero .gr-mobile-review-unit .gr-carousel-dot {
          background: var(--pk-slate-tint-16);
        }
        .google-reviews-section--on-hero .gr-mobile-review-unit .gr-carousel-dot[data-active="true"] {
          background: var(--pk-ink);
        }
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
          align-items: center;
          text-align: center;
          gap: 0;
          min-width: 0;
        }
        .gr-stats-title {
          font-family: Roboto, "Segoe UI", system-ui, sans-serif;
          font-weight: 700;
          font-size: 26px;
          color: var(--pk-ink);
          margin: 0 0 10px;
          line-height: 1.2;
        }
        .gr-stats-rating-row{
          display:flex;
          align-items:center;
          flex-wrap: nowrap;
          gap:10px;
          margin-bottom: 8px;
          justify-content: center;
        }
        .gr-google-logo-inline{
          height: 32px;
          width: auto;
          max-height: 32px;
          flex-shrink: 0;
        }
        .gr-stats-rating-value{
          font-family: Roboto, "Segoe UI", system-ui, sans-serif;
          font-weight: 800;
          font-size: 22px;
          color: var(--pk-ink);
          line-height: 1;
        }
        .gr-stats-score {
          display: none;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 16px;
          line-height: 1;
          color: var(--pk-ink);
        }
        .gr-stats-link-mobile {
          display: none;
        }
        .gr-stats-stars {
          margin-bottom: 0;
        }
        .gr-stats-sub {
          font-family: Roboto, "Segoe UI", system-ui, sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: var(--pk-ink);
          margin: 0;
          line-height: 1.45;
        }
        .gr-stats-note{
          font-family: "Montserrat", system-ui, sans-serif;
          font-weight: 500;
          font-size: 20px;
          color: var(--pk-ink);
          line-height: 1.6;
          margin: 10px 0 0;
          max-width: 36ch;
        }
        @media (min-width: 901px) {
          .gr-stats-note{
            font-size: 15px;
            line-height: 1.45;
            max-width: 100%;
          }
          .gr-stats-rating-row{
            justify-content: flex-start;
          }
          .gr-stats-copy{
            text-align: left;
            align-items: flex-start;
          }
          .gr-left-panel{
            align-items: flex-start;
          }
        }
        .gr-stats-link {
          display: inline-block;
          margin-top: 10px;
          font-family: Roboto, "Segoe UI", system-ui, sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: var(--pk-ink);
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s ease, opacity 0.2s ease;
        }
        .gr-stats-link:hover {
          color: var(--pk-ink);
          text-decoration: underline;
        }
        .gr-stats-link:focus-visible {
          outline: 2px solid var(--pk-accent);
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
        .gr-carousel-viewport {
          width: 100%;
          overflow: hidden;
          overflow-x: clip;
          border-radius: 0;
          padding: 0;
          touch-action: pan-y;
          position: relative;
          isolation: isolate;
        }
        .gr-carousel-track {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          align-items: stretch;
          will-change: transform;
        }
        .gr-carousel-slide {
          flex-shrink: 0;
          box-sizing: border-box;
          overflow: hidden;
        }
        .gr-carousel-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin-top: 0;
          min-height: 14px;
          flex-shrink: 0;
        }
        .gr-mobile-review-unit {
          width: min(520px, 100%);
          margin: 0 auto;
          box-sizing: border-box;
          background: var(--pk-page);
          border: 1px solid var(--pk-slate-tint-10);
          border-radius: 12px;
          box-shadow: 0 20px 48px var(--pk-slate-tint-09);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .gr-mobile-card-bottom {
          flex-shrink: 0;
          padding: 0 18px 16px;
        }
        .gr-carousel-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: none;
          padding: 0;
          background: var(--pk-slate-tint-16);
          cursor: pointer;
          transition: width 0.25s ease, background 0.25s ease;
        }
        .gr-carousel-dot[data-active="true"] {
          width: 36px;
          background: var(--pk-ink);
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
          .google-reviews-section .google-reviews-heading {
            margin-bottom: 20px !important;
          }
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
            margin-bottom: 15px;
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
          .gr-stats-rating-row {
            justify-content: center !important;
          }
          .gr-stats-rating-value {
            display: none !important;
          }
          .gr-stats-score {
            display: inline !important;
            font-size: 19.2px !important;
          }
          .gr-stats-rating-row svg {
            width: 31px !important;
            height: 31px !important;
          }
          .gr-stats-link {
            display: none !important;
          }
          .gr-stats-link-mobile {
            display: block !important;
            margin: 20px auto 0;
            padding: 0 4px;
            text-align: center;
            width: min(520px, 100%);
            font-family: Roboto, "Segoe UI", system-ui, sans-serif;
            font-size: 13px;
            font-weight: 500;
            color: var(--pk-on-dark) !important;
            text-decoration: underline;
            text-underline-offset: 3px;
            position: relative;
            z-index: 2;
            box-sizing: border-box;
          }
          .gr-google-logo-inline {
            height: 33.6px !important;
            max-height: 33.6px !important;
          }
          .gr-carousel-mobile {
            width: 100%;
            display: flex !important;
            flex-direction: column;
            align-items: center;
          }
          .google-reviews-section {
            padding: 56px 0 !important;
          }
          .gr-stats-note {
            display: none !important;
          }
          .gr-carousel-viewport {
            padding: 20px 0 0;
            width: 100%;
            max-width: min(520px, 100%);
            margin: 0 auto;
            overflow: hidden;
            overflow-x: clip;
          }
          .gr-carousel-slide {
            box-sizing: border-box;
            padding: 0;
            overflow: hidden;
          }
          .gr-mobile-review-unit {
            width: 100%;
            max-width: min(520px, 100%);
          }
          .gr-review-mobile-slide-inner {
            display: flex;
            flex-direction: column;
            min-height: 200px;
            padding: 0 18px;
            box-sizing: border-box;
            width: 100%;
            overflow: hidden;
          }
          .gr-review-mobile-top {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 12px;
          }
          .gr-review-score {
            font-family: "Montserrat", sans-serif;
            font-weight: 700;
            font-size: 17px;
            line-height: 1;
            color: var(--pk-ink);
          }
          .gr-review-body--mobile {
            flex: 1 1 auto;
            margin: 0;
            padding-bottom: 8px;
            font-family: "Montserrat", sans-serif;
            font-size: 14px;
            line-height: 1.65;
            font-style: italic;
            color: var(--pk-ink);
            text-align: left;
            overflow-wrap: anywhere;
            word-break: break-word;
          }
          .gr-review-mobile-footer {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 6px 10px;
            margin: 0 0 10px;
            padding: 0;
          }
          .gr-review-mobile-author {
            font-family: "Montserrat", sans-serif;
            font-weight: 700;
            font-size: 14px;
            color: var(--pk-ink);
          }
          .gr-review-mobile-date {
            font-family: "Montserrat", sans-serif;
            font-size: 12px;
            color: var(--pk-ink);
            white-space: nowrap;
          }
          .gr-mobile-card-bottom {
            padding: 0 18px 18px;
          }
          .gr-mobile-card-bottom .gr-carousel-dots {
            display: flex !important;
            margin-top: 4px;
            padding-top: 0;
            visibility: visible;
          }
          .gr-mobile-review-unit .gr-carousel-dot {
            flex-shrink: 0;
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
