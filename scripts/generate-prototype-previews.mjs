/**
 * Responsive WebP previews for Prototyp section (16:9, top-aligned crop).
 * Output: public/prototype-previews/{id}/preview-{width}.webp
 *
 * Usage: node scripts/generate-prototype-previews.mjs
 */
import sharp from "sharp";
import { existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outRoot = join(root, "public", "prototype-previews");

/** Display widths; 2× covers retina in ~450px cards. */
const WIDTHS = [480, 720, 960, 1280, 1600];

const SOURCES = [
  { id: "profitherm", file: join(root, "Images", "Project_images", "Profitherm-desktop.png") },
  { id: "black-beard", file: join(root, "Images", "Project_images", "Barber-desktop.png") },
  { id: "dentio", file: join(root, "Images", "Project_images", "Dentist-desktop.png") },
  { id: "jan-novak", file: join(root, "Images", "Prototypes", "fitness trenér.png") },
  { id: "vas-financni-partner", file: join(root, "Images", "Prototypes", "investiční poradce.png") },
  { id: "osobni-makler", file: join(root, "Images", "Prototypes", "realitní makléř.png") },
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
      .resize(width, Math.round((width * 9) / 16), { fit: "cover", position: "north" })
      .webp({ quality: 88, effort: 4, smartSubsample: true })
      .toFile(out);
    console.log("Wrote:", out);
  }
}

console.log("Done —", SOURCES.length, "prototypes ×", WIDTHS.length, "sizes");
