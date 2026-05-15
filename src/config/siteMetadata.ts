/**
 * Site-wide metadata (Next.js `export const metadata` equivalent for this Vite SPA).
 * Injected into index.html at build/dev via vite.config.ts — keep OG image in sync with `Images/metadata.png`.
 */

export const SITE_URL = "https://pk-digital.cz" as const;

/** Bump when `public/og-image.png` changes (cache bust for Facebook, LinkedIn, Discord, Google). */
export const OG_IMAGE_VERSION = 5;

const title = "Moderní weby na míru, redesign a AI automatizace | Prototyp do 3 dnů";
const description =
  "Tvoříme nové weby, modernizujeme staré a implementujeme AI automatizace. Zdarma návrh do 3 dnů, dodání do 14 dní. Získej funkční web, který přivádí zákazníky.";

const ogImagePath = `/og-image.png?v=${OG_IMAGE_VERSION}`;
const ogImageAlt =
  "PK Digital – weby nové generace s AI, ukázka responzivního webu na desktopu a mobilu";

export const siteMetadata = {
  metadataBase: SITE_URL,
  title,
  description,
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    siteName: "PK Digital",
    locale: "cs_CZ",
    title,
    description,
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
    title,
    description,
    image: ogImagePath,
    imageAlt: ogImageAlt,
  },
} as const;

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const ogImageAbsoluteUrl = absoluteUrl(ogImagePath);
