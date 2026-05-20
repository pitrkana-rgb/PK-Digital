/**
 * Square favicons for Google Search (48×48, 96×96) + browser tab (32×32).
 * Source: public/Company_logo_Icon_V4.png (PK icon mark). White square background
 * so the logo is visible in browser tabs and matches Google SERP favicon display.
 */
import sharp from "sharp";
import { copyFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public");

const sourceCandidates = [
  join(root, "public", "Company_logo_Icon_V4.png"),
  join(root, "Images", "Only_logo_V4_black.png"),
  join(root, "public", "Favicon.png"),
];

const src = sourceCandidates.find((p) => existsSync(p));
const googleSizes = [48, 96];
const browserSize = 32;
const appleTouchSize = 180;

/** White square — visible in browser chrome and Google results. */
const squareBg = { r: 255, g: 255, b: 255, alpha: 1 };

if (!src) {
  console.error("No favicon source found. Expected one of:", sourceCandidates);
  process.exit(1);
}

console.log("Favicon source:", src);

const resizeSquare = (size) =>
  sharp(src).resize(size, size, {
    fit: "contain",
    background: squareBg,
  });

for (const size of googleSizes) {
  const out = join(outDir, `favicon-google-${size}.png`);
  await resizeSquare(size).png().toFile(out);
  console.log("Wrote:", out);
}

const browserOut = join(outDir, `favicon-browser-${browserSize}.png`);
await resizeSquare(browserSize).png().toFile(browserOut);
console.log("Wrote:", browserOut);

const appleOut = join(outDir, "apple-touch-icon.png");
await resizeSquare(appleTouchSize).png().toFile(appleOut);
console.log("Wrote:", appleOut);

/** Browsers request /favicon.ico — square 48×48 PNG (Google uses the same asset). */
const faviconIco = join(outDir, "favicon.ico");
copyFileSync(join(outDir, "favicon-google-48.png"), faviconIco);
console.log("Wrote:", faviconIco);
