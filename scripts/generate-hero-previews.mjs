/**
 * Responsive WebP for hero frame screen cutouts (desktop + phone slots).
 * Output: public/hero-previews/{id}/desktop|mobile/preview-{width}.webp
 *
 * Usage: node scripts/generate-hero-previews.mjs
 */
import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const srcDir = join(root, "Images", "Project_images");
const outRoot = join(root, "public", "hero-previews");

/** Hero desktop cutout ≈ 1108×600 */
const DESKTOP_ASPECT = { w: 1108, h: 600 };
const DESKTOP_WIDTHS = [640, 960, 1280, 1600, 1920];

/** Hero phone cutout ≈ 327×750 */
const MOBILE_ASPECT = { w: 327, h: 750 };
const MOBILE_WIDTHS = [320, 480, 640, 960, 1280];

const files = readdirSync(srcDir);
const desktopFiles = files.filter((f) => /-desktop\.png$/i.test(f));

for (const file of desktopFiles) {
  const id = file.replace(/-desktop\.png$/i, "").toLowerCase();
  const desktopSrc = join(srcDir, file);
  const mobileFile = files.find(
    (f) => f.replace(/\.png$/i, "").toLowerCase() === `${id}-mobil`,
  );
  const mobileSrc = mobileFile ? join(srcDir, mobileFile) : null;

  const desktopOut = join(outRoot, id, "desktop");
  mkdirSync(desktopOut, { recursive: true });

  for (const width of DESKTOP_WIDTHS) {
    const height = Math.round((width * DESKTOP_ASPECT.h) / DESKTOP_ASPECT.w);
    const out = join(desktopOut, `preview-${width}.webp`);
    await sharp(desktopSrc)
      .rotate()
      .resize(width, height, { fit: "cover", position: "north" })
      .webp({ quality: 88, effort: 4, smartSubsample: true })
      .toFile(out);
    console.log("Wrote:", out);
  }

  if (mobileSrc && existsSync(mobileSrc)) {
    const mobileOut = join(outRoot, id, "mobile");
    mkdirSync(mobileOut, { recursive: true });
    for (const width of MOBILE_WIDTHS) {
      const height = Math.round((width * MOBILE_ASPECT.h) / MOBILE_ASPECT.w);
      const out = join(mobileOut, `preview-${width}.webp`);
      await sharp(mobileSrc)
        .rotate()
        .resize(width, height, { fit: "cover", position: "north" })
        .webp({ quality: 88, effort: 4, smartSubsample: true })
        .toFile(out);
      console.log("Wrote:", out);
    }
  }
}

console.log("Done —", desktopFiles.length, "hero projects");
