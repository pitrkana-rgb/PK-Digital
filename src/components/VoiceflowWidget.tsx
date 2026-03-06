import { useEffect, useState } from "react";

/* Extend window type for Voiceflow */
declare global {
    interface Window {
        voiceflow?: {
            chat: {
                open: () => void;
                close: () => void;
                toggle: () => void;
            };
        };
    }
}

const ChatIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
    >
        <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="12" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
    </svg>
);

export const VoiceflowWidget = (): JSX.Element => {
    const [ready, setReady] = useState(false);
    const [hovered, setHovered] = useState(false);

    /* Poll until Voiceflow SDK is available */
    useEffect(() => {
        const id = setInterval(() => {
            if (window.voiceflow?.chat) {
                setReady(true);
                clearInterval(id);
            }
        }, 300);
        return () => clearInterval(id);
    }, []);

    const handleClick = () => {
        if (window.voiceflow?.chat) {
            window.voiceflow.chat.open();
        }
    };

    return (
        <>
            {/* Floating button */}
            <button
                type="button"
                id="vf-custom-launcher"
                aria-label="Otevřít chat"
                onClick={handleClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    position: "fixed",
                    bottom: "28px",
                    right: "28px",
                    zIndex: 99990,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "14px 20px",
                    background: hovered
                        ? "linear-gradient(135deg,#FF7A3A,#FF4510)"
                        : "linear-gradient(135deg,#0ABDC6,#00E5FF)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "999px",
                    cursor: "pointer",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: "15px",
                    boxShadow: hovered
                        ? "0 8px 32px rgba(0,229,255,0.35), 0 2px 8px rgba(0,0,0,0.3)"
                        : "0 4px 20px rgba(0,229,255,0.25), 0 2px 8px rgba(0,0,0,0.25)",
                    transform: hovered ? "translateY(-2px) scale(1.03)" : "translateY(0) scale(1)",
                    transition: "all 220ms cubic-bezier(0.34,1.56,0.64,1)",
                    opacity: ready ? 1 : 0,
                    pointerEvents: ready ? "all" : "none",
                    letterSpacing: "-0.01em",
                    whiteSpace: "nowrap",
                }}
            >
                <ChatIcon />
                <span className="vf-chat-label">Chat</span>
            </button>

            <style>{`
        /* Hide Voiceflow's own default launcher button */
        #voiceflow-chat-widget .vfrc-launcher,
        #voiceflow-chat-widget [data-testid="launcher"],
        .vfrc-launcher { display: none !important; }

        /* Mobile: hide text label, keep only icon */
        @media (max-width: 768px) {
          #vf-custom-launcher {
            padding: 13px !important;
            bottom: 20px !important;
            right: 20px !important;
          }
          #vf-custom-launcher .vf-chat-label {
            display: none !important;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          #vf-custom-launcher { transition: opacity 150ms ease !important; }
        }
      `}</style>
        </>
    );
};
