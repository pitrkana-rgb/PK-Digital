import { useEffect, useState, type CSSProperties } from "react";
import { ResponsiveWebpImage } from "../../../../components/ResponsiveWebpImage";
import heroFrameV3Url from "../../../../../Images/Hero_PC_frame_V3.png";
import {
  HERO_DESKTOP_INTRINSIC,
  HERO_DESKTOP_SIZES,
  HERO_DESKTOP_WIDTHS,
  HERO_MOBILE_INTRINSIC,
  HERO_MOBILE_SIZES,
  HERO_MOBILE_WIDTHS,
  HERO_PROJECT_IDS,
  heroDesktopBasePath,
  heroMobileBasePath,
} from "./heroPreviewAssets";

/** Natural pixel size of Hero_PC_frame_V3.png */
const FRAME_NATURAL = { w: 1536, h: 1024 } as const;

const ROTATE_MS = 3000;
const FADE_MS = 850;

/** Screen cutouts in original image coordinates (scale with frame). */
const DESKTOP_SCREEN = { x: 65, y: 68, w: 1108, h: 600 } as const;
const MOBILE_SCREEN = { x: 1180, y: 268, w: 327, h: 750, borderRadiusPx: 36 } as const;

const pctX = (n: number): string => `${(n / FRAME_NATURAL.w) * 100}%`;
const pctY = (n: number): string => `${(n / FRAME_NATURAL.h) * 100}%`;

const shotLayerStyle: CSSProperties = {
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  maxWidth: "none",
  pointerEvents: "none",
  transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
  willChange: "opacity",
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
  imageRendering: "auto",
};

type HeroScreenCarouselProps = {
  projectIds: readonly string[];
  variant: "desktop" | "mobile";
  activeIdx: number;
  className?: string;
  objectFit?: "cover" | "contain";
};

/** Crossfades screenshots inside one frame cutout (index controlled by parent for sync). */
const HeroScreenCarousel = ({
  projectIds,
  variant,
  activeIdx,
  className,
  objectFit = "cover",
}: HeroScreenCarouselProps): JSX.Element | null => {
  if (projectIds.length === 0) return null;

  const isDesktop = variant === "desktop";
  const basePathFn = isDesktop ? heroDesktopBasePath : heroMobileBasePath;
  const widths = isDesktop ? HERO_DESKTOP_WIDTHS : HERO_MOBILE_WIDTHS;
  const sizes = isDesktop ? HERO_DESKTOP_SIZES : HERO_MOBILE_SIZES;
  const intrinsic = isDesktop ? HERO_DESKTOP_INTRINSIC : HERO_MOBILE_INTRINSIC;

  return (
    <>
      {projectIds.map((projectId, i) => (
        <ResponsiveWebpImage
          key={projectId}
          basePath={basePathFn(projectId)}
          widths={widths}
          sizes={sizes}
          width={intrinsic.width}
          height={intrinsic.height}
          className={className}
          style={{
            ...shotLayerStyle,
            objectFit,
            objectPosition: isDesktop ? "top center" : "center center",
            opacity: i === activeIdx ? 1 : 0,
            zIndex: i === activeIdx ? 2 : 1,
          }}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === activeIdx && i === 0 ? "high" : "auto"}
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
  const count = HERO_PROJECT_IDS.length;

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
    isolation: "isolate" as const,
    background: "rgb(15 23 42 / 0.06)",
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
    isolation: "isolate" as const,
    background: "rgb(15 23 42 / 0.06)",
  };

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
      <div aria-hidden="true" className="hero-slot-desktop hero-slot" style={desktopSlot}>
        <HeroScreenCarousel
          projectIds={HERO_PROJECT_IDS}
          variant="desktop"
          activeIdx={safeIdx}
          className="hero-project-shot"
        />
      </div>
      <div aria-hidden="true" className="hero-slot-mobile hero-slot" style={mobileSlot}>
        <HeroScreenCarousel
          projectIds={HERO_PROJECT_IDS}
          variant="mobile"
          activeIdx={safeIdx}
          className="hero-project-shot hero-project-shot--phone"
          objectFit="contain"
        />
      </div>
      <img
        src={heroFrameV3Url}
        alt=""
        draggable={false}
        className={imgClassName}
        width={FRAME_NATURAL.w}
        height={FRAME_NATURAL.h}
        decoding="async"
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
