import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig, type Plugin } from "vite";
import { ogImageAbsoluteUrl, siteMetadata } from "./src/config/siteMetadata";

/** Injects Open Graph / Twitter metadata from siteMetadata (Next.js metadata pattern). */
function siteMetadataHtmlPlugin(): Plugin {
  const og = siteMetadata.openGraph;
  const tw = siteMetadata.twitter;
  const img = ogImageAbsoluteUrl;

  return {
    name: "pk-site-metadata",
    transformIndexHtml(html) {
      return html
        .replace(
          /<meta property="og:image" content="[^"]*"/,
          `<meta property="og:image" content="${img}"`,
        )
        .replace(
          /<meta property="og:image:secure_url" content="[^"]*"/,
          `<meta property="og:image:secure_url" content="${img}"`,
        )
        .replace(
          /<meta property="og:image:alt" content="[^"]*"/,
          `<meta property="og:image:alt" content="${og.images[0].alt}"`,
        )
        .replace(
          /<meta name="twitter:image" content="[^"]*"/,
          `<meta name="twitter:image" content="${img}"`,
        )
        .replace(
          /<meta name="twitter:image:alt" content="[^"]*"/,
          `<meta name="twitter:image:alt" content="${tw.imageAlt}"`,
        )
        .replace(
          /"image": "https:\/\/pk-digital\.cz\/og-image\.png\?v=\d+"/,
          `"image": "${img}"`,
        );
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteMetadataHtmlPlugin()],
  base: "./",
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
});
