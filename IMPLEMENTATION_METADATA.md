# IMPLEMENTATION_METADATA.md — Web & social metadata (PK-Digital)

**Goal:** Ensure link previews (WhatsApp, Facebook, LinkedIn, X/Twitter, Discord, Slack, Telegram, iMessage) show **correct title, description, and image**, using **`metadata.png`** as the visual source of truth, and maintain **consistent, robust metadata** across the stack.

**Stack today:** Static meta in `index.html` (no per-route `<head>` updates in React). SPA routes share the same default preview unless extended (see Phase 2).

---

## 1. Current state (audit)

| Area | Location | Notes |
|------|----------|--------|
| Primary title / description | `index.html` | Present; title and `og:title` differ slightly — align copy intentionally. |
| Open Graph | `index.html` | `og:image` → `https://pk-digital.cz/og-image.png` |
| Twitter / X | `index.html` | `summary_large_image`, image same URL |
| JSON-LD | `index.html` | `Organization` + `LocalBusiness`, `WebSite`; `logo` / `image` reference `og-image.png` |
| Theme color | `index.html` | `#FF5A1F` — brand UI uses cyan (`#00E5FF`); decide one primary for browser chrome / PWA |
| Source image | `Images/metadata.png` | Copied to **`public/og-image.png`** (keep in sync when updating art) |
| Favicon | `index.html`, `public/site.webmanifest` | `/favicon-v2.png` + `/favicon-google.png` |

**Status (implemented):** Run **`npm run og-image`** after changing **`Images/metadata.png`**. That script resizes to **1200×630** with **`fit: cover`** and **`position: northwest`** (top-left anchor) so X/Facebook/WhatsApp previews favor the **logo, headline, and left CTA** instead of a centered crop. Bump **`?v=`** on `og-image.png` in `index.html` when you ship a new PNG.

---

## 2. Image asset pipeline (`metadata.png`)

### 2.0 Why a script? (center vs left)

Social apps often **center-crop** large images. If `metadata.png` is a full-width screenshot, the preview cut off **PK** and the left headline. The repo uses **`scripts/generate-og-image.mjs`** (Sharp) to bake in a **left-priority** crop to 1200×630 — there is **no HTML meta tag** to set crop position on third-party previews.

### 2.1 Requirements (social platforms)

- **Recommended:** **1200 × 630 px** (1.91∶1) for Open Graph / most link previews.
- **Format:** PNG or JPG; PNG for sharp text/logos.
- **Safe zone:** Keep key text/logo inside ~**1100 × 580 px** — edges can be cropped on some clients.
- **File size:** Target **&lt; 300–500 KB** after optimization (TinyPNG, Squoosh, or `sharp` in build) for fast WhatsApp/Telegram loads.

### 2.2 Steps (recommended)

1. Update the design source **`Images/metadata.png`** (full-width marketing capture is OK).
2. From repo root: **`npm install`** (once) then **`npm run og-image`** → writes **`public/og-image.png`**.
3. Bump **`og-image.png?v=N`** in **`index.html`** (all occurrences) so caches refresh.
4. **Manual fallback:** Export a 1200×630 PNG yourself with important content in the **left/center safe zone**, save as **`public/og-image.png`**.

### 2.3 Update `og:image` dimensions meta

After final export, **measure real width/height** and set:

- `og:image:width`
- `og:image:height`

If the image is exactly 1200×630, current values are fine; if not, **update** to avoid platform warnings.

---

## 3. `index.html` — unified, robust static metadata

Apply in one pass so **`<title>`, `meta name="description"`, `og:*`, `twitter:*`** tell the **same story** (only length varies).

### 3.1 Recommended fields to verify / add

| Tag | Purpose |
|-----|---------|
| `title` | Browser tab + fallback SEO |
| `meta name="description"` | SERP snippet (~150–160 chars CS) |
| `link rel="canonical"` | Already `https://pk-digital.cz/` |
| `og:type` | `website` (home) |
| `og:url` | Absolute production URL |
| `og:title` | Can match or slightly shorten vs `title` |
| `og:description` | 1–2 sentences; can match `description` |
| `og:image` | **Absolute** `https://pk-digital.cz/...` (required for FB/LinkedIn) |
| `og:image:secure_url` | Same as `og:image` if HTTPS (optional duplicate) |
| `og:locale` | `cs_CZ`; add `og:locale:alternate` if you add EN later |
| `article:author` | Only if `og:type` is `article` — skip for homepage |
| `twitter:card` | `summary_large_image` |
| `twitter:title` / `twitter:description` / `twitter:image` | Align with OG |
| `meta name="theme-color"` | Single brand color (see §3.2) |

### 3.2 Brand consistency

- **Twitter handles:** `@pkdigital_cz` — **confirm** the account exists; if not, remove or replace `twitter:site` / `twitter:creator` to avoid dead references.
- **Theme color:** Align with primary brand (e.g. `#00E5FF` or dark `#010204`) or keep orange only if intentional for marketing.

### 3.3 Optional extras

- **`meta name="format-detection"`** — `telephone=no` if you don’t want auto-linking numbers on iOS (usually omit = allow).
- **`link rel="alternate"`** — already `hreflang="cs"`; add EN when you have `/en`.

---

## 4. Checklist — strings to keep in sync when image or URL changes

When you change the preview file name or domain:

- [ ] `og:image` (absolute URL)
- [ ] `twitter:image`
- [ ] JSON-LD `"image"` (Organization / WebSite if used)
- [ ] Any future **`og:image`** in env-specific builds (staging vs prod)

**Search in repo:** `og-image`, `pk-digital.cz`, `metadata.png`

---

## 5. JSON-LD (`index.html`)

- Update **`logo`** URL if you switch to a new canonical logo path.
- Update **`image`** to match the **same** social preview image URL as `og:image`.
- **`sameAs`:** Add real profiles when available, e.g.:
  - LinkedIn company URL
  - Facebook page
  - Instagram / X only if official
- **`address`:** Consider full `PostalAddress` (street, city, postal code) — matches **Kontakt** page; helps local SEO.
- **`contactPoint`:** Add `telephone`, `email` if you want rich results (optional).
- **Offers / prices:** Ensure numbers match current pricing policy; misleading schema can violate Google guidelines.

---

## 6. Phase 2 — Per-route metadata (SPA)

**Problem:** React Router pages (`/kontakt`, `/napiste-nam`, `/zasady-ochrany-soukromi`, …) still ship **one** `index.html`; crawlers and some bots only see default tags unless you:

1. **SSR / SSG** (e.g. Vite SSR, Astro, Next) — best for SEO + previews per URL.
2. **Prerender** static HTML per route at build time.
3. **`react-helmet-async`** (or similar) — updates `<title>` and meta **after** JS runs; fine for **Google** (executes JS), **unreliable** for some messengers that only fetch initial HTML.

**Recommendation:**  
- **Short term:** Perfect **`index.html`** + single canonical preview image.  
- **Medium term:** Prerender or SSR for **legal** and **contact** URLs if organic SEO matters.

---

## 7. Platform-specific notes

| Platform | Relies on | Tip |
|----------|-------------|-----|
| **Facebook / Messenger** | `og:*` | Use [Sharing Debugger](https://developers.facebook.com/tools/debug/) — **scrape again** after deploy. |
| **LinkedIn** | `og:*` | [Post Inspector](https://www.linkedin.com/post-inspector/) |
| **X (Twitter)** | `twitter:*` + falls back to `og:*` | [Card Validator](https://cards-dev.twitter.com/validator) (availability varies) |
| **WhatsApp / Telegram** | `og:*` | Cache aggressively; change image URL query `?v=2` if preview stuck |
| **Discord / Slack** | `og:*` | Same; unfurl uses OG |
| **iMessage** | `og:*` | Caches; may need time to refresh |

---

## 8. Deployment & environment

- **Production base URL:** `https://pk-digital.cz` — keep **HTTPS** in all absolute meta URLs.
- **Staging:** Use `VITE_SITE_URL` or build-time env; **do not** point `og:url` to staging in production builds.
- **Cache busting:** After replacing image, append `?v=YYYYMMDD` to image URL **once** if platforms show old art.

---

## 9. Files to touch (implementation order)

1. **`Images/metadata.png`** → export → **`public/og-image.png`** (or `public/metadata.png` + URL updates).
2. **`index.html`** — align title/description/OG/Twitter/image dimensions/theme-color.
3. **`index.html`** JSON-LD — `image`, `sameAs`, optional `address` / `contactPoint`.
4. **Optional:** `public/robots.txt` if not present; **sitemap.xml** for Google Search Console.
5. **Optional (Phase 2):** Helmet per route + prerender strategy.

---

## 10. Validation before sign-off

- [ ] Image loads at `https://pk-digital.cz/og-image.png` (or chosen path) — **200**, correct `Content-Type`.
- [ ] Facebook Sharing Debugger — no critical errors.
- [ ] LinkedIn Post Inspector — preview OK.
- [ ] Share link in WhatsApp (mobile) — correct image + text.
- [ ] `title` + `description` unique and accurate for 2025 offer wording.

---

## 11. Ownership

- **Content:** Marketing / product (Czech copy, claims, stats).
- **Technical:** Frontend — `index.html`, asset pipeline, optional Helmet/prerender.
- **Review cadence:** After any rebranding, pricing change, or domain change — re-run §10.

---

*Document version: 1.0 — created for PK-Digital / AI_agency repo.*
