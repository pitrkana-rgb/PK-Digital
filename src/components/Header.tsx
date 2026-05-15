import { useState, useEffect } from "react";
import { MenuIcon, XIcon, Phone, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import companyLogoV4BlackUrl from "../../Images/Company_logo_V4_black.png";
import { pk } from "../design/pkLandingColors";

const HEADER_PHONE_DISPLAY = "+420 725 703 868";
const HEADER_PHONE_HREF = "tel:+420725703868";
const HEADER_EMAIL_DISPLAY = "info@pk-digital.cz";
const HEADER_EMAIL_HREF = "mailto:info@pk-digital.cz";

/** Matches header + hero primary CTA (tightened in steps vs original 15px). */
const HEADER_CTA_PAD_Y = Math.round(11 * 0.8);
const HEADER_CTA_PAD_X = Math.round(28 * 0.8);
const CONTACT_ICON_PX = Math.round(15 * 1.3);
const CONTACT_ICON_DRAWER_PX = Math.round(17 * 1.3);

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [headerGlass, setHeaderGlass] = useState(false);

    useEffect(() => {
        const onScroll = () => setHeaderGlass(window.scrollY > 16);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    const navigate = useNavigate();
    const location = useLocation();
    const { language } = useLanguage();

    const t = language === "en" ? {
        navServices: "Services",
        navReference: "Reference",
        navFaq: "Common questions",
        navContact: "Contact",
        writeUs: "Contact us",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        backHomeAria: "PK Digital – back to homepage",
    } : {
        navServices: "Služby",
        navReference: "Reference",
        navFaq: "Časté dotazy",
        navContact: "Kontakt",
        writeUs: "Napište nám",
        openMenu: "Otevřít menu",
        closeMenu: "Zavřít menu",
        backHomeAria: "AI-agency – zpět na začátek",
    };

    const navigationItems = [
        { label: t.navServices, targetId: "co-nabizime" as const, path: "/" as const },
        { label: t.navReference, targetId: "reference" as const, path: "/" as const },
        { label: t.navFaq, targetId: "faq" as const, path: "/" as const },
        { label: t.navContact, path: "/kontakt" as const },
    ] as const;

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

    const goHome = () => {
        setMenuOpen(false);
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => scrollToSection("hero"), 120);
        } else {
            scrollToSection("hero");
        }
    };

    const navItemIsActive = (item: (typeof navigationItems)[number]) => {
        if (item.path === "/kontakt") return location.pathname === "/kontakt";
        return false;
    };

    return (
        <>
            <header
                style={{
                    zIndex: 10000,
                    backgroundColor: headerGlass ? pk.headerGlassSurface : pk.page,
                    backdropFilter: headerGlass ? "blur(14px) saturate(1.35)" : "none",
                    WebkitBackdropFilter: headerGlass ? "blur(14px) saturate(1.35)" : "none",
                    borderBottom: headerGlass ? `1px solid ${pk.headerGlassBorder}` : "none",
                    boxShadow: headerGlass ? "0 8px 28px rgb(15 23 42 / 0.06)" : "0 1px 0 rgb(15 23 42 / 0.05)",
                }}
                className="fixed top-0 left-0 w-full transition-all duration-300 ease-out"
            >
                <nav
                    className="flex flex-nowrap items-center justify-between gap-x-3 md:gap-x-4 header-nav min-w-0"
                    style={{
                        paddingTop: "15px",
                        paddingBottom: "15px",
                        maxWidth: "1400px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        paddingLeft: "24px",
                        paddingRight: "24px",
                    }}
                >
                    <div className="flex justify-start shrink-0">
                        <button
                            type="button"
                            onClick={goHome}
                            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pk-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-md"
                            aria-label={t.backHomeAria}
                        >
                            <img
                                src={companyLogoV4BlackUrl}
                                alt="PK Digital logo"
                                className="header-logo"
                                style={{ height: "59.2px", width: "auto", display: "block" }}
                            />
                        </button>
                    </div>

                    {/* Inline nav only from xl up — one row; narrower viewports use the drawer */}
                    <div className="hidden xl:flex flex-1 min-w-0 justify-center items-center gap-6 flex-nowrap px-2 overflow-hidden">
                        {navigationItems.map((item, index) => (
                            <button
                                key={`nav-${index}`}
                                type="button"
                                onClick={() => handleNavClick(item)}
                                className="nav-link-underline flex items-center group focus-visible:outline-none shrink-0"
                                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                            >
                                <span
                                    style={{
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontWeight: 600,
                                        fontSize: "13px",
                                        color: navItemIsActive(item) ? pk.brand4 : pk.ink,
                                        transition: "color 0.2s ease",
                                        whiteSpace: "nowrap",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.06em",
                                        lineHeight: 1,
                                    }}
                                    className="group-hover:text-[color:var(--pk-brand-4)]"
                                >
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-end items-center gap-3 md:gap-4 shrink-0 min-w-0">
                        {/* Phone + email where language toggle was — md+ so the bar stays one row with logo + CTA + menu */}
                        <div className="hidden md:flex items-center gap-3 lg:gap-4 flex-shrink-0 min-w-0">
                            <div
                                aria-hidden="true"
                                className="hidden lg:block"
                                style={{
                                    width: "1px",
                                    height: "22px",
                                    background: pk.slateBorderStrong,
                                    flexShrink: 0,
                                }}
                            />
                            <a
                                href={HEADER_PHONE_HREF}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    textDecoration: "none",
                                    color: pk.ink,
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "13px",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <Phone size={CONTACT_ICON_PX} strokeWidth={2} color={pk.brand4} aria-hidden />
                                <span>{HEADER_PHONE_DISPLAY}</span>
                            </a>
                            <a
                                href={HEADER_EMAIL_HREF}
                                className="hidden lg:inline-flex items-center gap-[6px]"
                                style={{
                                    textDecoration: "none",
                                    color: pk.ink,
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "13px",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <Mail size={CONTACT_ICON_PX} strokeWidth={2} color={pk.brand4} aria-hidden />
                                <span>{HEADER_EMAIL_DISPLAY}</span>
                            </a>
                        </div>
                        <div className="hidden md:block">
                            <button
                                type="button"
                                onClick={() => navigate("/napiste-nam")}
                                style={{
                                    backgroundColor: pk.accent,
                                    color: pk.ink,
                                    borderRadius: "12px",
                                    padding: `${HEADER_CTA_PAD_Y}px ${HEADER_CTA_PAD_X}px`,
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    textTransform: "none",
                                    letterSpacing: "0.01em",
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "transform 0.25s ease, filter 0.25s ease",
                                }}
                                className="animate-pulse-glow hero-primary-btn hover:brightness-105 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--pk-accent)] focus-visible:outline-offset-2"
                            >
                                {t.writeUs}
                            </button>
                        </div>

                        <button
                            type="button"
                            aria-label={menuOpen ? t.closeMenu : t.openMenu}
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen(o => !o)}
                            className="flex xl:hidden items-center justify-center shrink-0"
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: pk.ink,
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
                        background: pk.black60,
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
                        backgroundColor: pk.page,
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        borderLeft: `1px solid ${pk.slateBorderStrong}`,
                        borderBottom: `1px solid ${pk.slateBorderStrong}`,
                        borderBottomLeftRadius: "16px",
                        boxShadow: menuOpen ? `-8px 8px 40px ${pk.slateTint28}` : "none",
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
                            style={{ background: "none", border: "none", cursor: "pointer", color: pk.ink55, padding: "4px" }}
                        >
                            <XIcon size={20} />
                        </button>
                    </div>

                    {navigationItems.map((item, mobIdx) => (
                        <button
                            key={`mob-nav-${mobIdx}-${item.path}`}
                            type="button"
                            onClick={() => handleNavClick(item)}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontFamily: "'Montserrat', sans-serif",
                                fontWeight: 600,
                                fontSize: "16px",
                                color: navItemIsActive(item) ? pk.brand4 : pk.ink82,
                                textAlign: "left",
                                padding: "14px 0",
                                borderBottom: `1px solid ${pk.slateTint08}`,
                                transition: "color 200ms ease",
                                width: "100%",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}
                        >
                            {item.label}
                        </button>
                    ))}

                    <div
                        aria-hidden="true"
                        style={{
                            height: "1px",
                            background: pk.slateTint08,
                            margin: "12px 0 8px",
                        }}
                    />
                    <a
                        href={HEADER_PHONE_HREF}
                        onClick={() => setMenuOpen(false)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            textDecoration: "none",
                            color: pk.ink,
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 500,
                            fontSize: "15px",
                            padding: "10px 0",
                        }}
                    >
                        <Phone size={CONTACT_ICON_DRAWER_PX} strokeWidth={2} color={pk.brand4} aria-hidden />
                        {HEADER_PHONE_DISPLAY}
                    </a>
                    <a
                        href={HEADER_EMAIL_HREF}
                        onClick={() => setMenuOpen(false)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            textDecoration: "none",
                            color: pk.ink,
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 500,
                            fontSize: "15px",
                            padding: "6px 0 14px",
                            borderBottom: `1px solid ${pk.slateTint08}`,
                        }}
                    >
                        <Mail size={CONTACT_ICON_DRAWER_PX} strokeWidth={2} color={pk.brand4} aria-hidden />
                        {HEADER_EMAIL_DISPLAY}
                    </a>

                    <button
                        type="button"
                        onClick={() => { navigate("/napiste-nam"); setMenuOpen(false); }}
                        style={{
                            marginTop: "24px",
                            backgroundColor: pk.accent,
                            color: pk.ink,
                            border: "none",
                            borderRadius: "12px",
                            padding: `${HEADER_CTA_PAD_Y}px ${HEADER_CTA_PAD_X}px`,
                            fontFamily: "'Montserrat',sans-serif",
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
                .header-logo { height: 66px !important; }
              }
            `}</style>
        </>
    );
};

