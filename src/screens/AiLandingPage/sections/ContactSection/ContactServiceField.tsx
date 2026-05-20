import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { pk } from "../../../../design/pkLandingColors";

type ContactServiceFieldProps = {
  isEn: boolean;
  options: string[];
  selected: string[];
  onToggle: (service: string) => void;
  error?: string;
  inverse?: boolean;
};

export const ContactServiceField = ({
  isEn,
  options,
  selected,
  onToggle,
  error,
  inverse = false,
}: ContactServiceFieldProps): JSX.Element => {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (ev: MouseEvent | TouchEvent) => {
      const target = ev.target as Node | null;
      if (!target || panelRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open]);

  const labelColor = inverse ? pk.onDark : pk.ink;
  const textColor = inverse ? pk.onDark : pk.ink;
  const mutedColor = inverse ? pk.onDark45 : pk.ink45;
  const fieldBg = inverse ? pk.panelDark : pk.slateTint03;
  const fieldBorder = inverse ? pk.onDarkBorder12 : pk.slateTint12;
  const panelBg = inverse ? pk.panelDarker : pk.page;

  const labelText = isEn ? "What type of service are you interested in?" : "O jaký typ služby máte zájem?";
  const placeholder = isEn ? "Select services" : "Vyberte služby";
  const selectedLabel = selected.length
    ? isEn
      ? `${selected.length} selected`
      : `${selected.length} vybrané`
    : placeholder;

  if (!isMobile) {
    return (
      <div>
        <p style={{
          fontFamily: "'Montserrat',sans-serif",
          fontWeight: 500,
          fontSize: "15px",
          lineHeight: 1.45,
          color: labelColor,
          margin: "0 0 10px",
        }}>
          {labelText}
        </p>
        <div className="contact-service-checks" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {options.map((opt) => {
            const checked = selected.includes(opt);
            return (
              <label
                key={opt}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "4px 0",
                  cursor: "pointer",
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.45,
                  color: textColor,
                }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(opt)}
                  style={{ marginTop: "3px", width: "18px", height: "18px", flexShrink: 0, accentColor: pk.accent }}
                />
                <span>{opt}</span>
              </label>
            );
          })}
        </div>
        {error ? (
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12px", color: pk.error400, display: "block", marginTop: "6px" }}>
            {error}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div ref={panelRef}>
      <p style={{
        fontFamily: "'Montserrat',sans-serif",
        fontWeight: 500,
        fontSize: "15px",
        lineHeight: 1.45,
        color: labelColor,
        margin: "0 0 10px",
      }}>
        {labelText}
      </p>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        aria-haspopup="listbox"
        style={{
          width: "100%",
          background: fieldBg,
          border: `1px solid ${open ? pk.accent : error ? pk.errorRed50 : fieldBorder}`,
          borderRadius: "16px",
          minHeight: "52px",
          padding: "12px 16px",
          fontFamily: "'Montserrat',sans-serif",
          fontWeight: 400,
          fontSize: "16px",
          color: selected.length ? textColor : mutedColor,
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          cursor: "pointer",
          boxShadow: open ? `0 0 0 4px ${pk.accent10}` : "none",
        }}
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          style={{
            width: "18px",
            flexShrink: 0,
            color: inverse ? pk.onDark : pk.ink,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 200ms ease",
          }}
        />
      </button>
      {open ? (
        <div
          role="listbox"
          aria-multiselectable="true"
          style={{
            marginTop: "8px",
            background: panelBg,
            border: `1px solid ${fieldBorder}`,
            borderRadius: "14px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          {options.map((opt) => {
            const checked = selected.includes(opt);
            return (
              <label
                key={opt}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 10px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  background: checked ? pk.accent12 : "transparent",
                }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(opt)}
                  style={{ width: "16px", height: "16px", accentColor: pk.accent }}
                />
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "14px", color: textColor }}>{opt}</span>
              </label>
            );
          })}
        </div>
      ) : null}
      {error ? (
        <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "12px", color: pk.error400, display: "block", marginTop: "6px" }}>
          {error}
        </span>
      ) : null}
    </div>
  );
};
