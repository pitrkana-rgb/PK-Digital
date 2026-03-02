import { useEffect } from "react";
import { Header } from "../../components/Header";
import { CompanyMilestonesSection } from "../AiLandingPage/sections/CompanyMilestonesSection/CompanyMilestonesSection";
import { SiteFooterSection } from "../AiLandingPage/sections/SiteFooterSection/SiteFooterSection";

export const AboutPage = (): JSX.Element => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div
            className="relative w-full min-h-screen overflow-x-hidden"
            style={{ backgroundColor: "#000000", fontFamily: "'Space Grotesk', 'Inter', sans-serif", color: "#fff" }}
        >
            {/* Grain texture overlay */}
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

            <main className="relative" style={{ zIndex: 1, paddingTop: "120px" }}>
                <CompanyMilestonesSection />
            </main>

            <SiteFooterSection />

            <style>{`
                @media(max-width:768px) {
                    h1 { font-size: clamp(36px, 10vw, 48px) !important; }
                }
            `}</style>
        </div>
    );
};
