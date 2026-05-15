import { useEffect, useMemo, useState } from "react";
import heroFrameV3Url from "../../../../../Images/Hero_PC_frame_V3.png";

/** Natural pixel size of Hero_PC_frame_V3.png */
const FRAME_NATURAL = { w: 1536, h: 1024 } as const;

const ROTATE_MS = 3000;
const FADE_MS = 850;

/** Screen cutouts in original image coordinates (scale with frame). */
const DESKTOP_SCREEN = { x: 65, y: 68, w: 1108, h: 600 } as const;
const MOBILE_SCREEN = { x: 1180, y: 268, w: 327, h: 750, borderRadiusPx: 36 } as const;

const pctX = (n: number): string => `${(n / FRAME_NATURAL.w) * 100}%`;
const pctY = (n: number): string => `${(n / FRAME_NATURAL.h) * 100}%`;

type ProjectPair = {
  id: string;
  desktop: string;
  mobile: string;
};

function loadAllProjectPairs(): ProjectPair[] {
  const desktopGlob = import.meta.glob<{ default: string }>(
    "../../../../../Images/Project_images/*-desktop.png",
    { eager: true },
  );
  const mobileGlob = import.meta.glob<{ default: string }>(
    "../../../../../Images/Project_images/*-mobil.png",
    { eager: true },
  );

  const mobileByBase = new Map<string, string>();
  for (const [path, mod] of Object.entries(mobileGlob)) {
    const m = path.match(/([^/]+)-mobil\.png$/i);
    if (m?.[1]) mobileByBase.set(m[1].toLowerCase(), mod.default);
  }

  const pairs: ProjectPair[] = [];
  for (const [path, mod] of Object.entries(desktopGlob)) {
    const m = path.match(/([^/]+)-desktop\.png$/i);
    if (!m?.[1]) continue;
    const base = m[1];
    pairs.push({
      id: base.toLowerCase(),
      desktop: mod.default,
      mobile: mobileByBase.get(base.toLowerCase()) ?? mod.default,
    });
  }

  const order = ["profitherm", "finance", "reality", "fitness"];
  return pairs.sort((a, b) => {
    const ai = order.indexOf(a.id);
    const bi = order.indexOf(b.id);
    if (ai === -1 && bi === -1) return a.id.localeCompare(b.id, "cs");
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

const heroProjectPairs = loadAllProjectPairs();

const shotLayerStyle = {
  position: "absolute" as const,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
  objectPosition: "center center" as const,
  display: "block" as const,
  maxWidth: "none" as const,
  pointerEvents: "none" as const,
  transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
  willChange: "opacity" as const,
};

type HeroScreenCarouselProps = {
  shots: string[];
  activeIdx: number;
  className?: string;
  /** Phone cutouts need contain so side bezels in mockups stay visible (cover crops horizontally). */
  objectFit?: "cover" | "contain";
};

/** Crossfades screenshots inside one frame cutout (index controlled by parent for sync). */
const HeroScreenCarousel = ({
  shots,
  activeIdx,
  className,
  objectFit = "cover",
}: HeroScreenCarouselProps): JSX.Element | null => {
  if (shots.length === 0) return null;

  return (
    <>
      {shots.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          draggable={false}
          className={className}
          style={{
            ...shotLayerStyle,
            objectFit,
            opacity: i === activeIdx ? 1 : 0,
            zIndex: i === activeIdx ? 2 : 1,
          }}
        />
      ))}
    </>
  );
};

type HeroCompositeFrameProps = {
  imgClassName?: string;
  wrapperClassName?: string;
  /** When false, skips hero entrance fade class (e.g. embedded in offer card). */
  animateEntrance?: boolean;
};

export const HeroCompositeFrame = ({
  imgClassName,
  wrapperClassName,
  animateEntrance = true,
}: HeroCompositeFrameProps): JSX.Element => {
  const [activeIdx, setActiveIdx] = useState(0);
  const desktopShots = useMemo(() => heroProjectPairs.map((p) => p.desktop), []);
  const mobileShots = useMemo(() => heroProjectPairs.map((p) => p.mobile), []);
  const count = heroProjectPairs.length;

  useEffect(() => {
    if (count <= 1) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const timer = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % count);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [count]);

  const desktopSlot = {
    position: "absolute" as const,
    left: pctX(DESKTOP_SCREEN.x),
    top: pctY(DESKTOP_SCREEN.y),
    width: pctX(DESKTOP_SCREEN.w),
    height: pctY(DESKTOP_SCREEN.h),
    overflow: "hidden" as const,
    borderRadius: 0,
    zIndex: 0,
  };

  const mobileCornerPct = `${(MOBILE_SCREEN.borderRadiusPx / MOBILE_SCREEN.w) * 100}%`;

  const mobileSlot = {
    position: "absolute" as const,
    left: pctX(MOBILE_SCREEN.x),
    top: pctY(MOBILE_SCREEN.y),
    width: pctX(MOBILE_SCREEN.w),
    height: pctY(MOBILE_SCREEN.h),
    overflow: "hidden" as const,
    borderRadius: mobileCornerPct,
    zIndex: 0,
  };

  const hasShots = count > 0;
  const safeIdx = count > 0 ? activeIdx % count : 0;

  return (
    <div
      className={[animateEntrance ? "hero-composite-anim" : "", wrapperClassName].filter(Boolean).join(" ")}
      style={{
        position: "relative",
        width: "100%",
        lineHeight: 0,
        aspectRatio: `${FRAME_NATURAL.w} / ${FRAME_NATURAL.h}`,
      }}
    >
      {hasShots ? (
        <>
          <div aria-hidden="true" className="hero-slot-desktop hero-slot" style={desktopSlot}>
            <HeroScreenCarousel shots={desktopShots} activeIdx={safeIdx} className="hero-project-shot" />
          </div>
          <div aria-hidden="true" className="hero-slot-mobile hero-slot" style={mobileSlot}>
            <HeroScreenCarousel
              shots={mobileShots}
              activeIdx={safeIdx}
              className="hero-project-shot hero-project-shot--phone"
              objectFit="contain"
            />
          </div>
        </>
      ) : null}
      <img
        src={heroFrameV3Url}
        alt=""
        draggable={false}
        className={imgClassName}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          position: "relative",
          zIndex: 1,
        }}
      />
      <style>{`
        .hero-slot {
          pointer-events: none;
        }
        .hero-project-shot {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          filter: contrast(1.05) saturate(1.07);
        }
        .hero-project-shot--phone {
          object-fit: contain;
          object-position: center center;
        }
        @supports (image-rendering: high-quality) {
          .hero-project-shot {
            image-rendering: high-quality;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-project-shot {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};
