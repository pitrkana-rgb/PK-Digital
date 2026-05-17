import { AboutWhoSection } from "./AboutWhoSection";
import { AboutPreContactSection } from "./AboutPreContactSection";
import { ReadyToDesignSection } from "../AiLandingPage/sections/ReadyToDesignSection";

/** About page body — follows AboutMeHeroSection on /o-me */
export const AboutPageContent = (): JSX.Element => {
  return (
    <>
      <main style={{ position: "relative", zIndex: 1 }}>
        <AboutWhoSection />
      </main>
      <AboutPreContactSection />
      <ReadyToDesignSection avoidFooterOverlap />
    </>
  );
};
