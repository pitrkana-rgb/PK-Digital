import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { language, setLanguage } = useLanguage();

    const t = language === "en" ? {
        navHome: "Home",
        navServices: "Services",
        navFaq: "FAQ",
        navContact: "Contact",
        writeUs: "Contact us",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        backHomeAria: "PK Digital – back to homepage",
        languageLabel: "Language",
    } : {
        navHome: "Domů",
        navServices: "Služby",
        navFaq: "FAQ",
        navContact: "Kontakt",
        writeUs: "Napište nám",
        openMenu: "Otevřít menu",
        closeMenu: "Zavřít menu",
        backHomeAria: "AI-agency – zpět na začátek",
        languageLabel: "Jazyk",
    };

    const navigationItems = [
        { label: t.navHome, targetId: "hero", path: "/" },
        { label: t.navServices, targetId: "pricing", path: "/" },
        { label: t.navFaq, targetId: "faq", path: "/" },
        { label: t.navContact, targetId: undefined, path: "/kontakt" },
    ] as const;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (targetId: string) => {
        const element = document.getElementById(targetId);
        if (element) {
            const headerOffset = 80;
            const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    const handleNavClick = (item: typeof navigationItems[0]) => {
        if (item.path === "/kontakt") {
            if (location.pathname !== "/kontakt") {
                navigate("/kontakt");
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
            setMenuOpen(false);
            return;
        }
        if (location.pathname === item.path && item.path === "/" && item.targetId) {
            scrollToSection(item.targetId);
        } else {
            navigate(item.path);
            if (item.path === "/" && item.targetId) {
                setTimeout(() => scrollToSection(item.targetId), 120);
            }
        }
        setMenuOpen(false);
    };

    return (
        <>
            <header
                style={{
                    zIndex: 10000,
                    backgroundColor: menuOpen && !isScrolled ? "#000" : undefined,
                }}
                className={`fixed top-0 left-0 w-full transition-all duration-300 ${isScrolled
                    ? "bg-black shadow-lg"
                    : "bg-black"
                    }`}
            >
                <nav
                    className="grid grid-cols-2 md:grid-cols-3 items-center header-nav"
                    style={{
                        paddingTop: "13px",
                        paddingBottom: "13px",
                        maxWidth: "1400px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        paddingLeft: "24px",
                        paddingRight: "24px",
                    }}
                >
                    <div className="flex justify-start">
                        <button
                            type="button"
                            onClick={() => handleNavClick(navigationItems[0])}
                            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-md"
                            aria-label={t.backHomeAria}
                        >
                            <img
                                src="/Company_logo_V2.png"
                                alt="PK Digital logo"
                                className="header-logo"
                                style={{ height: "52px", width: "auto", display: "block" }}
                            />
                        </button>
                    </div>

                    <div className="hidden md:flex justify-center items-center gap-8">
                        {navigationItems.map((item, index) => (
                            <button
                                key={`nav-${index}`}
                                type="button"
                                onClick={() => handleNavClick(item)}
                                className="nav-link-underline flex flex-col items-center group focus-visible:outline-none"
                                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                            >
                                <span
                                    style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontWeight: 500,
                                        fontSize: "17px",
                                        color: (location.pathname === item.path && (item.path !== "/" || item.targetId === "hero")) ? "#00E5FF" : "rgba(240,244,248,0.9)",
                                        transition: "color 0.2s ease",
                                        whiteSpace: "nowrap",
                                        textTransform: "none",
                                        letterSpacing: "0.01em",
                                    }}
                                    className="group-hover:!text-white"
                                >
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-end items-center gap-4">
                        <div className="hidden md:flex items-center">
                            <button
                                type="button"
                                aria-label={t.languageLabel}
                                onClick={() => setLanguage(language === "cs" ? "en" : "cs")}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    borderRadius: "999px",
                                    padding: "7px 12px",
                                    background: "rgba(0,0,0,0.15)",
                                    color: "rgba(255,255,255,0.9)",
                                    cursor: "pointer",
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontWeight: 700,
                                    fontSize: "12px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em",
                                }}
                            >
                                <span aria-hidden="true" style={{ width: 18, height: 12, display: "inline-flex", borderRadius: 2, overflow: "hidden", boxShadow: "0 0 0 1px rgba(255,255,255,0.16)" }}>
                                    {language === "cs" ? (
                                        <svg viewBox="0 0 60 30" width="18" height="12" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="60" height="30" fill="#012169"/>
                                            <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="6"/>
                                            <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" strokeWidth="3"/>
                                            <path d="M30 0 v30 M0 15 h60" stroke="#fff" strokeWidth="10"/>
                                            <path d="M30 0 v30 M0 15 h60" stroke="#C8102E" strokeWidth="6"/>
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 60 30" width="18" height="12" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="60" height="15" fill="#fff"/>
                                            <rect y="15" width="60" height="15" fill="#D7141A"/>
                                            <path d="M0 0 L26 15 L0 30 Z" fill="#11457E"/>
                                        </svg>
                                    )}
                                </span>
                                <span>{language === "cs" ? "EN" : "CZ"}</span>
                            </button>
                        </div>
                        <div className="hidden md:block">
                            <Button
                                type="button"
                                onClick={() => navigate("/napiste-nam")}
                                style={{
                                    background: "linear-gradient(135deg, #0ABDC6 0%, #00E5FF 100%)",
                                    color: "#070B14",
                                    borderRadius: "12px",
                                    padding: "15px 32px",
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    textTransform: "none",
                                    letterSpacing: "0.01em",
                                    border: "none",
                                    transition: "transform 0.25s ease, filter 0.25s ease",
                                }}
                                className="animate-pulse-glow hero-primary-btn hover:brightness-105 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#00E5FF]"
                            >
                                {t.writeUs}
                            </Button>
                        </div>

                        <button
                            type="button"
                            aria-label={menuOpen ? t.closeMenu : t.openMenu}
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen(o => !o)}
                            className="flex md:hidden items-center justify-center"
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#fff",
                                padding: "8px",
                            }}
                        >
                            {menuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* ── Mobile drawer — outside <header> to escape transform stacking context ── */}
            <div
                aria-label="Mobile navigation"
                style={{
                    display: "block",
                    position: "fixed",
                    inset: 0,
                    zIndex: 99999,
                    pointerEvents: menuOpen ? "all" : "none",
                }}
            >
                {/* Dark backdrop */}
                <div
                    onClick={() => setMenuOpen(false)}
                    style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 0,
                        background: "rgba(0,0,0,0.6)",
                        opacity: menuOpen ? 1 : 0,
                        transition: "opacity 300ms ease",
                    }}
                />

                {/* Solid panel */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 1,
                        width: "280px",
                        height: "fit-content",
                        backgroundColor: "#000",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        borderLeft: "1px solid rgba(255,255,255,0.08)",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        borderBottomLeftRadius: "16px",
                        boxShadow: menuOpen ? "-8px 8px 40px rgba(0,0,0,0.8)" : "none",
                        padding: "24px",
                        transform: menuOpen ? "translateX(0)" : "translateX(110%)",
                        transition: "transform 300ms ease",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
                        <button
                            type="button"
                            onClick={() => setMenuOpen(false)}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", padding: "4px" }}
                        >
                            <XIcon size={20} />
                        </button>
                    </div>

                    {navigationItems.map(item => (
                        <button
                            key={item.targetId}
                            type="button"
                            onClick={() => handleNavClick(item)}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 500,
                                fontSize: "18px",
                                color: (location.pathname === item.path && (item.path !== "/" || item.targetId === "hero")) ? "#00E5FF" : "#F0F4F8",
                                textAlign: "left",
                                padding: "14px 0",
                                borderBottom: "1px solid rgba(255,255,255,0.08)",
                                transition: "color 200ms ease",
                                width: "100%",
                            }}
                        >
                            {item.label}
                        </button>
                    ))}

                    <div
                        style={{
                            marginTop: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                            border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "999px",
                            padding: "6px",
                            position: "sticky",
                            bottom: "12px",
                            background: "rgba(0,0,0,0.55)",
                            backdropFilter: "blur(8px)",
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => setLanguage(language === "cs" ? "en" : "cs")}
                            style={{
                                width: "100%",
                                padding: "10px 14px",
                                borderRadius: "999px",
                                border: "1px solid rgba(255,255,255,0.16)",
                                cursor: "pointer",
                                fontFamily: "'Space Grotesk',sans-serif",
                                fontWeight: 700,
                                fontSize: "12px",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                background: "rgba(0,0,0,0.25)",
                                color: "rgba(255,255,255,0.9)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px",
                            }}
                        >
                            <span aria-hidden="true" style={{ width: 18, height: 12, display: "inline-flex", borderRadius: 2, overflow: "hidden", boxShadow: "0 0 0 1px rgba(255,255,255,0.16)" }}>
                                {language === "cs" ? (
                                    <svg viewBox="0 0 60 30" width="18" height="12" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="60" height="30" fill="#012169"/>
                                        <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="6"/>
                                        <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" strokeWidth="3"/>
                                        <path d="M30 0 v30 M0 15 h60" stroke="#fff" strokeWidth="10"/>
                                        <path d="M30 0 v30 M0 15 h60" stroke="#C8102E" strokeWidth="6"/>
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 60 30" width="18" height="12" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="60" height="15" fill="#fff"/>
                                        <rect y="15" width="60" height="15" fill="#D7141A"/>
                                        <path d="M0 0 L26 15 L0 30 Z" fill="#11457E"/>
                                    </svg>
                                )}
                            </span>
                            <span>{language === "cs" ? "EN" : "CZ"}</span>
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => { navigate("/napiste-nam"); setMenuOpen(false); }}
                        style={{
                            marginTop: "24px",
                            background: "linear-gradient(135deg,#0ABDC6,#00E5FF)",
                            color: "#070B14",
                            border: "none",
                            borderRadius: "999px",
                            padding: "14px 24px",
                            fontFamily: "'Space Grotesk',sans-serif",
                            fontWeight: 600,
                            fontSize: "16px",
                            cursor: "pointer",
                        }}
                    >
                        {t.writeUs}
                    </button>
                </div>
            </div>

            <style>{`
              @media (min-width: 768px) {
                .header-logo { height: 58px !important; }
              }
            `}</style>
        </>
    );
};

