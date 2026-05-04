import type { CSSProperties } from "react";
import { pk } from "../../../design/pkLandingColors";

type SectionTitleBadgeProps = {
  children: string;
  style?: CSSProperties;
  /** Defaults to Montserrat; pass a different stack if needed. */
  fontFamily?: string;
};

export const SectionTitleBadge = ({ children, style, fontFamily }: SectionTitleBadgeProps): JSX.Element => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "7px 12px",
      borderRadius: "999px",
      fontFamily: fontFamily ?? "'Montserrat', sans-serif",
      fontWeight: 900,
      fontSize: "17px",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      lineHeight: 1,
      color: "transparent",
      backgroundImage: pk.gradientMilestoneWordmark,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      ...style,
    }}
  >
    {children}
  </div>
);

