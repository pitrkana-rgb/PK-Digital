import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AiLandingPage } from "./screens/AiLandingPage/AiLandingPage";
import { ContactPage } from "./screens/ContactPage/ContactPage";
import { AboutPage } from "./screens/AboutPage/AboutPage";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AiLandingPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/o-nas" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
