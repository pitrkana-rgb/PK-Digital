/**
 * Square favicons for Google Search (48×48, 96×96) + browser tab (32×32).
 * Source: public/Favicon.png (run after updating the master favicon).
 */
import sharp from "sharp";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const src = join(root, "public", "Favicon.png");
const outDir = join(root, "public");

const googleSizes = [48, 96];
const browserSize = 32;

if (!existsSync(src)) {
  console.error("Missing:", src);
  process.exit(1);
}

const resizeSquare = (size) =>
  sharp(src).resize(size, size, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 0 },
  });

for (const size of googleSizes) {
  const out = join(outDir, `favicon-google-${size}.png`);
  await resizeSquare(size).png().toFile(out);
  console.log("Wrote:", out);
}

const browserOut = join(outDir, `favicon-browser-${browserSize}.png`);
await resizeSquare(browserSize).png().toFile(browserOut);
console.log("Wrote:", browserOut);
