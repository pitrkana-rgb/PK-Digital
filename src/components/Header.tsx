import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navigationItems = [
    { label: "Domů", targetId: "hero", path: "/" },
    { label: "Služby", targetId: "pricing", path: "/" },
    { label: "O nás", targetId: "", path: "/o-nas" },
    { label: "FAQ", targetId: "faq", path: "/" },
    { label: "Kontakt", targetId: "company-info", path: "/kontakt" },
];



export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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
        if (location.pathname === item.path && item.path === "/") {
            scrollToSection(item.targetId);
        } else {
            navigate(item.path);
            if (item.path === "/") {
                setTimeout(() => scrollToSection(item.targetId), 120);
            } else if (item.targetId) {
                setTimeout(() => scrollToSection(item.targetId), 180);
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
                className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1280px] px-6 transition-all duration-300 ${isScrolled
                    ? "backdrop-blur-xl bg-black/60 border border-white/5 rounded-b-2xl shadow-lg"
                    : ""
                    }`}
            >
                <nav className="grid grid-cols-2 md:grid-cols-3 items-center header-nav" style={{ paddingTop: "13px", paddingBottom: "13px" }}>
                    <div className="flex justify-start">
                        <button
                            type="button"
                            onClick={() => handleNavClick(navigationItems[0])}
                            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-md"
                            aria-label="AI-agency – zpět na začátek"
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
                                        fontSize: "15px",
                                        color: (location.pathname === item.path && (item.path !== "/" || item.targetId === "hero")) ? "#00E5FF" : "rgba(240,244,248,0.9)",
                                        transition: "color 0.2s ease",
                                        whiteSpace: "nowrap",
                                    }}
                                    className="group-hover:!text-white"
                                >
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-end items-center gap-4">
                        <div className="hidden md:block">
                            <Button
                                type="button"
                                onClick={() => navigate("/kontakt")}
                                style={{
                                    background: "linear-gradient(135deg, #0ABDC6 0%, #00E5FF 100%)",
                                    color: "#070B14",
                                    borderRadius: "999px",
                                    padding: "12px 22px",
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "15px",
                                    border: "none",
                                    transition: "filter 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
                                    boxShadow: "0 0 20px rgba(0, 229, 255, 0.3)",
                                }}
                                className="hover:brightness-105 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#00E5FF]"
                            >
                                Napište nám
                            </Button>
                        </div>

                        <button
                            type="button"
                            aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
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
                        boxShadow: "-8px 8px 40px rgba(0,0,0,0.8)",
                        padding: "24px",
                        transform: menuOpen ? "translateX(0)" : "translateX(100%)",
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

                    <button
                        type="button"
                        onClick={() => { navigate("/kontakt"); setMenuOpen(false); }}
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
                        Napište nám
                    </button>
                </div>
            </div>
        </>
    );
};

