import { useEffect } from "react";
import { Header } from "../../components/Header";
import { SiteFooterSection } from "../AiLandingPage/sections/SiteFooterSection/SiteFooterSection";
import { ContactSection } from "../AiLandingPage/sections/ContactSection/ContactSection";

export const ContactPage = (): JSX.Element => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div
            className="relative w-full min-h-screen overflow-x-hidden"
            style={{ backgroundColor: "#000", fontFamily: "'Space Grotesk', 'Inter', sans-serif", color: "#fff" }}
        >
            {/* Grain Texture Overlay */}
            <div
                aria-hidden="true"
                style={{
                    position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none",
                    opacity: 0.03,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "128px 128px",
                }}
            />

            <Header />

            {/* Hero Section — solid black, badge + title only */}
            <section className="contact-hero" style={{ position: "relative", paddingTop: "160px", paddingBottom: "80px", backgroundColor: "#000" }}>
                <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
                    <div style={{ marginBottom: "24px" }}>
                        <span style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.2)",
                            borderRadius: "99px", padding: "6px 16px",
                            fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "12px", color: "#00E5FF",
                            textTransform: "uppercase", letterSpacing: "0.1em"
                        }}>
                            <span style={{ width: "8px", height: "8px", background: "#00E5FF", borderRadius: "50%", display: "inline-block" }} />
                            Odpovídáme do 24h
                        </span>
                    </div>
                    <h1 className="contact-hero-title" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4.5vw, 42px)", lineHeight: 1.2, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                        Udělejte první krok k novému webu.{" "}
                        <span style={{ background: "linear-gradient(135deg, #E040FB, #00E5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Zabere to jen 5 minut.</span>
                    </h1>
                </div>
            </section>

            <main className="relative" style={{ zIndex: 1 }}>
                <ContactSection />
            </main>

            <SiteFooterSection />

            <style>{`
                @media(max-width:768px) {
                    .contact-hero-title { font-size: clamp(20px, 5.2vw, 26px) !important; line-height: 1.25 !important; max-width: 20em; margin-left: auto !important; margin-right: auto !important; }
                    .contact-hero { padding-top: 120px !important; padding-bottom: 20px !important; }
                }
            `}</style>
        </div>
    );
};
