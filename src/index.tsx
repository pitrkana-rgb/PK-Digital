import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AiLandingPage } from "./screens/AiLandingPage/AiLandingPage";
import { ContactPage } from "./screens/ContactPage/ContactPage";
import { NapisteNamPage } from "./screens/NapisteNamPage/NapisteNamPage";
import { PrivacyPolicyPage } from "./screens/PrivacyPolicyPage/PrivacyPolicyPage";
import { TermsPage } from "./screens/TermsPage/TermsPage";
import { NotFoundPage } from "./screens/NotFoundPage/NotFoundPage";
import { CookieConsentBanner } from "./components/CookieConsentBanner";
import { LanguageProvider } from "./i18n/LanguageContext";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AiLandingPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/napiste-nam" element={<NapisteNamPage />} />
          <Route path="/o-nas" element={<Navigate to="/kontakt" replace />} />
          <Route path="/zasady-ochrany-soukromi" element={<PrivacyPolicyPage />} />
          <Route path="/podminky-uziti" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <CookieConsentBanner />
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
);
