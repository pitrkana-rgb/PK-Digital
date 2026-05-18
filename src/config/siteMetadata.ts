/**
 * Site-wide metadata (Next.js `export const metadata` equivalent for this Vite SPA).
 * Injected into index.html at build/dev via vite.config.ts — keep OG image in sync with `Images/metadata.png`.
 */

export const SITE_URL = "https://pk-digital.cz" as const;

/** Master favicon + square PNGs from `npm run favicons` (Google 48×48+, browser tab 32×32). */
export const faviconUrl = `${SITE_URL}/Favicon.png`;
export const faviconGoogle48Url = `${SITE_URL}/favicon-google-48.png`;
export const faviconGoogle96Url = `${SITE_URL}/favicon-google-96.png`;
export const faviconBrowser32Url = `${SITE_URL}/favicon-browser-32.png`;

/** Bump when `public/og-image.png` changes (cache bust for Facebook, LinkedIn, Discord, Google). */
export const OG_IMAGE_VERSION = 6;

export const siteTitle =
  "Tvorba webových stránek a aplikací na míru, automatizace a AI";

export const siteDescription =
  "Zajišťujeme kompletní webové služby. Naší prací je tvorba webových stránek a aplikací na míru, včetně automatizace. Získejte prototyp zdarma do 3 dnů.";

const ogImagePath = `/og-image.png?v=${OG_IMAGE_VERSION}`;
const ogImageAlt =
  "PK Digital – tvorba webových stránek a aplikací na míru, ukázka hero sekce s mockupy";

export const siteMetadata = {
  metadataBase: SITE_URL,
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    siteName: "PK Digital",
    locale: "cs_CZ",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pkdigital_cz",
    creator: "@pkdigital_cz",
    title: siteTitle,
    description: siteDescription,
    image: ogImagePath,
    imageAlt: ogImageAlt,
  },
} as const;

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const ogImageAbsoluteUrl = absoluteUrl(ogImagePath);

/** Escape for HTML attribute values. */
export function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}
