/**
 * Responsive WebP for Naše služby slide visuals.
 * Output: public/offer-previews/{id}/preview-{width}.webp
 *
 * Usage: node scripts/generate-offer-previews.mjs
 */
import sharp from "sharp";
import { existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outRoot = join(root, "public", "offer-previews");

const WIDTHS = [480, 720, 960, 1280];

const SOURCES = [
  { id: "web-app", file: join(root, "Images", "Web_app.png") },
  { id: "ai-bot", file: join(root, "Images", "AI bot.png") },
  { id: "modernizace-before", file: join(root, "Images", "Modernizace", "Before.png") },
  { id: "modernizace-after", file: join(root, "Images", "Modernizace", "After.png") },
];

for (const { id, file } of SOURCES) {
  if (!existsSync(file)) {
    console.error("Missing source:", file);
    process.exit(1);
  }
  const outDir = join(outRoot, id);
  mkdirSync(outDir, { recursive: true });

  for (const width of WIDTHS) {
    const out = join(outDir, `preview-${width}.webp`);
    await sharp(file)
      .rotate()
      .resize(width, null, { fit: "inside", withoutEnlargement: false })
      .webp({ quality: 88, effort: 4, smartSubsample: true })
      .toFile(out);
    console.log("Wrote:", out);
  }
}

console.log("Done —", SOURCES.length, "offer slides ×", WIDTHS.length, "sizes");
