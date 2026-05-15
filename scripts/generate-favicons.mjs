/**
 * Square favicons for Google Search (48×48, 96×96) + browser tab (32×32).
 * Google requires 1:1 ratio — Only_logo_V4_black.png is not square.
 */
import sharp from "sharp";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const blackSrc = join(root, "Images", "Only_logo_V4_black.png");
const browserSrc = join(root, "public", "Company_logo_Icon_V4.png");
const outDir = join(root, "public");

const googleSizes = [48, 96];
const browserSize = 32;

if (!existsSync(blackSrc)) {
  console.error("Missing:", blackSrc);
  process.exit(1);
}

for (const size of googleSizes) {
  const out = join(outDir, `favicon-google-${size}.png`);
  await sharp(blackSrc)
    .resize(size, size, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toFile(out);
  console.log("Wrote:", out);
}

if (existsSync(browserSrc)) {
  const out = join(outDir, `favicon-browser-${browserSize}.png`);
  await sharp(browserSrc)
    .resize(browserSize, browserSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(out);
  console.log("Wrote:", out);
}
