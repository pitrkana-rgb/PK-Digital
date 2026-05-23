/** Mobile-only overlay: cursor + “tap/click for preview” (parent supplies positioning context). */
export const MobilePreviewClickHint = ({ label }: { label: string }): JSX.Element => (
  <div className="pk-mobile-preview-click-hint" aria-hidden="true">
    <svg
      className="pk-mobile-preview-click-hint__icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.4 20.8L6.4 6.8L17.8 13.6L12 14.6L10.4 19L6.4 20.8Z"
        fill="currentColor"
      />
    </svg>
    <span className="pk-mobile-preview-click-hint__label">{label}</span>
  </div>
);
