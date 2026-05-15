import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig, type Plugin } from "vite";
import {
  escapeHtmlAttr,
  ogImageAbsoluteUrl,
  siteDescription,
  siteMetadata,
  siteTitle,
} from "./src/config/siteMetadata";

/** Injects SEO + Open Graph metadata from siteMetadata (Next.js metadata pattern). */
function siteMetadataHtmlPlugin(): Plugin {
  const og = siteMetadata.openGraph;
  const tw = siteMetadata.twitter;
  const img = ogImageAbsoluteUrl;
  const title = escapeHtmlAttr(siteTitle);
  const description = escapeHtmlAttr(siteDescription);
  const descriptionJson = siteDescription.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

  return {
    name: "pk-site-metadata",
    transformIndexHtml(html) {
      return html
        .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
        .replace(
          /<meta name="title" content="[^"]*"/,
          `<meta name="title" content="${title}"`,
        )
        .replace(
          /<meta name="description"\s+content="[^"]*"/,
          `<meta name="description" content="${description}"`,
        )
        .replace(
          /<meta property="og:title" content="[^"]*"/,
          `<meta property="og:title" content="${title}"`,
        )
        .replace(
          /<meta property="og:description"\s+content="[^"]*"/,
          `<meta property="og:description" content="${description}"`,
        )
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
          `<meta property="og:image:alt" content="${escapeHtmlAttr(og.images[0].alt)}"`,
        )
        .replace(
          /<meta name="twitter:title" content="[^"]*"/,
          `<meta name="twitter:title" content="${title}"`,
        )
        .replace(
          /<meta name="twitter:description"\s+content="[^"]*"/,
          `<meta name="twitter:description" content="${description}"`,
        )
        .replace(
          /<meta name="twitter:image" content="[^"]*"/,
          `<meta name="twitter:image" content="${img}"`,
        )
        .replace(
          /<meta name="twitter:image:alt" content="[^"]*"/,
          `<meta name="twitter:image:alt" content="${escapeHtmlAttr(tw.imageAlt)}"`,
        )
        .replace(
          /"image": "https:\/\/pk-digital\.cz\/og-image\.png\?v=\d+"/,
          `"image": "${img}"`,
        )
        .replace(
          /"@type": \["Organization", "LocalBusiness"\][\s\S]*?"description": "[^"]*"/,
          (block) => block.replace(/"description": "[^"]*"/, `"description": "${descriptionJson}"`),
        )
        .replace(
          /"@type": "WebSite"[\s\S]*?"description": "[^"]*"/,
          (block) => block.replace(/"description": "[^"]*"/, `"description": "${descriptionJson}"`),
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
