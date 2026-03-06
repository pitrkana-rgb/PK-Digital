# Color Rebranding Plan (V2) — pk-digital.cz → Cyan/Teal Dark Theme

## Checklist

- [x] **Global palette**: background, surfaces, text, borders, glows
- [x] **Logo**: switch to `Company_logo_V2.png` (new logo)
- [x] **Navigation**: cyan CTA, cyan underline/active, dark blue-black tint
- [x] **Hero**: cyan accent + cyan CTA, remove remaining orange tints
- [x] **Stats bar**: cyan labels, navy cards, subtle cyan borders
- [x] **Jak probíhá spolupráce**: magenta emphasis word, cyan icons/badges/lines
- [x] **Co nabízíme**: cyan active tab, cyan checks/arrows, cyan CTA
- [x] **Proč si vybrat**: cyan highlights + subtle cyan border/glow
- [x] **Testimonials**: cyan decorative accents + controls
- [x] **Pricing**: magenta “Populární” badge, cyan price/checks/CTA, cyan border glow
- [x] **FAQ**: cyan open state + focus, optional magenta section accent
- [x] **Footer / CTA**: cyan CTA + borders/badges, cyan micro-interactions
- [x] **Contact page**: cyan focus/CTA, cyan accents (keep layout/design)

## Target Palette

- **Primary accent**: `#00E5FF`
- **Secondary accent**: `#0ABDC6`
- **Magenta (sparingly)**: `#E040FB`
- **Background**: `#070B14` / `#0A1628`
- **Surface**: `#0D1B2A` / `#1B2838`
- **Border accent**: `rgba(0, 229, 255, 0.15)`
- **Text primary**: `#F0F4F8`
- **Text secondary**: `#8899AA`
- **Glow**: `0 0 20px rgba(0, 229, 255, 0.3)`

# IMPROVEMENT_VISUALS_V2 – Full Visual Rebuild Checklist

> **Scope:** Complete premium AI-agency landing page visual rebuild (11 sections)
> **Date:** 2026-02-26
> **Status:** ✅ Implemented — pending live QA preview

---

## Layout

- [x] **Hero**: Full-viewport hero, particle grid overlay, ambient glow blobs (orange left, purple right)
- [x] **Stats**: 3-column glassmorphism card grid, responsive to 1-column on mobile
- [x] **Process (How it Works)**: 4-step horizontal stepper with gradient connecting line, collapses to 2-col tablet / row mobile
- [x] **Testimonials**: Two-row infinite marquee (opposite directions), edge fade masks
- [x] **Pricing**: 2-column cards, centered, "Popular" card elevated with gradient border
- [x] **FAQ**: Centered max-width 800px accordion layout
- [x] **CTA section**: Glass card with radial glow, centered content
- [x] **Contact**: Split 2-column (headline+trust left, form right), collapses on mobile
- [x] **Footer**: Brand left, nav center, social icons, bottom bar with legal links
- [x] **Nav**: Sticky backdrop-blur header, desktop CTA hidden on mobile, hamburger menu with slide-in drawer
- [x] Max-width `1200px` container centered on all sections

## Typography

- [x] Font: **Space Grotesk** (Google Fonts) throughout all sections
- [x] Hero headline: `clamp(38px, 7vw, 68px)`, weight 800, line-height 1.05, letter-spacing -0.02em
- [x] Section headings: `clamp(32px, 4.5vw, 56px)`, weight 700, letter-spacing -0.02em
- [x] Stat numbers: `clamp(40px, 5vw, 56px)`, weight 700, letter-spacing -0.03em
- [x] Timeline step numbers: 72px, weight 700
- [x] Feature card titles: `clamp(24px, 2.5vw, 30px)`, weight 600
- [x] Body text: 16–19px, weight 400, line-height 1.6–1.7
- [x] Labels/badges: 12–13px, weight 500–600, letter-spacing 0.06–0.1em
- [x] CTA buttons: 16–17px, weight 600

## Color / Contrast

- [x] Primary `#FFFFFF` text on `#000000` → 21:1 contrast (WCAG AAA)
- [x] Secondary `rgba(255,255,255,0.65–0.72)` → ≥ 4.5:1 on black (WCAG AA)
- [x] Accent `#FF5A1F` used consistently: badges, icon containers, active states, check icons, stars, dots
- [x] Gradient text on "AI": `linear-gradient(135deg, #FF6A2A, #FFB347)` + orange glow drop-shadow
- [x] Pricing popular badge: `linear-gradient(145deg, #FF6A2A, #FF3C00, #6B21A8)` gradient border
- [x] Green availability indicator `#22C55E` — decorative only
- [x] No pure grey text below `rgba(255,255,255,0.55)` on black background
- [x] Orange focus rings `#FF5A1F` on all interactive elements

## Spacing

- [x] 8px spacing system throughout
- [x] Section padding: `96px 0 120px` (standard), `140px 0 160px` (timeline)
- [x] Hero padding-top: `88px` (clears fixed header)
- [x] Container horizontal padding: `24px` on all breakpoints
- [x] CTA–badges gap: `0` (stat strip `padding-top: 0`)
- [x] Card internal padding: `36–40px` desktop, `28px` mobile
- [x] Step gap: `0` with `24px` column gap
- [x] Marquee card gap: `20px`

## Imagery

- [x] **Hero particle grid**: CSS `backgroundImage` grid lines + `radial-gradient` mask — no raster asset needed
- [x] **Ambient glows**: CSS `radial-gradient` blobs with `blur()` — no raster asset
- [x] **Step icons**: Lucide React (MessageCircle, CheckCircle2, Code2, Cog) — no broken SVG refs
- [x] **Avatar initials**: Inline gradient SVG circles — no external images
- [x] **Testimonial avatars**: CSS `background` gradient initials circles
- [x] **Check icons**: Lucide `CheckIcon` in pricing — removed `/feature-icon.svg` and `/feature-icon-2.svg` references
- [x] **CTA card**: CSS radial gradient replacing broken `/mask-group.svg`
- [x] **Footer social icons**: Lucide (Github, Twitter, LinkedIn) — removed broken `/frame-57.svg`
- [x] **Footer logo**: Inline SVG — duplicated from header
- [x] **FAQ toggle**: Lucide `PlusIcon`/`MinusIcon` — removed broken `/faq-toggle-icon.svg`
- [x] **Noise texture**: Inline SVG data URI (feTurbulence filter) — no external noise file
- [x] **Pricing plan icons**: Removed broken `/feature-icon.svg` references

## Components

- [x] **Stat card**: glassmorphism card, count-up animation hook, orange accent line
- [x] **Step circle**: Gradient orange circle, number badge top-right, hover glow ring
- [x] **Testimonial card**: Glass, filled stars, gradient avatar, double marquee rows
- [x] **Pricing card**: Gradient border wrapper (popular), feature checklist, CTA button
- [x] **FAQ item**: Custom accordion (not Radix), `max-height` smooth transition
- [x] **Floating label field**: Animated label that floats on focus/value, orange focus ring + glow
- [x] **Contact submit**: Loading spinner state, success checkmark state
- [x] **Mobile drawer**: Slide-in from right, backdrop blur overlay, close button
- [x] **Scroll indicator**: Animated dot bouncing inside a rounded rectangle
- [x] **Trust badge list**: Dot + text items in contact section left column

## States (hover / focus / active)

- [x] **Hero primary CTA**: `translateY(-3px)` + `brightness(1.1)` on hover; `scale(0.97)` on mousedown
- [x] **Hero secondary CTA**: background + border-color change on hover
- [x] **Stat cards**: `translateY(-6px)` + orange border + shadow on hover
- [x] **Step circles**: `scale(1.08)` + 12px orange glow ring on hover
- [x] **Pricing cards**: `translateY(-8px)` + colored shadow on hover
- [x] **Pricing CTA**: `brightness(1.1)` + `translateY(-2px)` on hover
- [x] **FAQ trigger**: orange color + filled circle on open; `:focus-visible` ring
- [x] **nav links**: orange underline slide-in via `.nav-link-underline` CSS class
- [x] **Contact submit**: `translateY(-2px)` + `brightness(1.08)` on hover; disabled cursor on loading
- [x] **Footer social icons**: orange tint on hover
- [x] **CTA button**: `translateY(-4px)` + `brightness(1.08)` + deeper shadow on hover
- [x] All buttons have `:focus-visible { outline: 2px solid #FF5A1F; outline-offset: 3-4px }`

## Responsiveness

- [x] **Nav**: `hidden md:inline-flex` hides CTA on mobile, hamburger shown with `md:hidden`
- [x] **Hero**: `flex-wrap` on CTAs, full-width on `< 640px`
- [x] **Stats**: 1-column on `< 768px`
- [x] **Process stepper**: 2-col tablet `< 768px`, 1-col with horizontal layout `< 480px`, line hidden
- [x] **Testimonials marquee**: Works at all widths (horizontal scroll, no wrapping)
- [x] **Pricing**: 1-column on `< 768px`
- [x] **FAQ**: full-width accordion works at all widths
- [x] **Contact**: 1-column on `< 768px`, form fields 1-col on mobile
- [x] **Footer**: wraps on `< 768px` via `flex-wrap`
- [x] **CTA section**: padding reduced on `< 768px`
- [x] All font sizes use `clamp()` for smooth vw scaling

## QA Notes

> [!NOTE]
> The CompanyMilestonesSection was reverted by the user to its original state. It still uses broken image references (`/images.png` etc.) and should be redesigned in a future pass.

> [!WARNING]
> The `ContactSection` uses a polymorphic `Tag` component (`input | textarea`). TypeScript will show a warning about the `type` prop on `textarea`. This is a known pattern — the prop is guarded by `!multiline`. No runtime error occurs.

> [!TIP]
> Run `npm run dev` and check these on desktop + mobile:
> - Count-up animation triggers correctly on first scroll-into-view
> - Marquee pause-on-hover works in both rows
> - Mobile drawer opens/closes smoothly and traps no focus
> - Contact form floating labels render correctly on all field types
> - FAQ accordion animates open/close without layout shift
> - Pricing "Popular" badge does not overflow on narrow viewports
> - Noise texture is imperceptible but adds subtle depth (opacity 0.025)

> [!CAUTION]
> Czech typographic quotes `„..."` inside JSX double-quoted strings will break the TypeScript parser. Always use Unicode escapes `\u201e...\u201c` or template literals for strings containing these characters.
