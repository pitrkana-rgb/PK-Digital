# Implementation Plan V6

## Tasks

### 1. Hero Section – Reduce Heading Font Size
- [ ] Lower `clamp(38px, 7vw, 68px)` → `clamp(30px, 5vw, 54px)` (desktop max 3 rows)
- [ ] Mobile: reduce to `28px !important`
- **File:** `MainHeroSection.tsx`

### 2. Badge Section (UserTestimonialsSection) – Redesign
- [ ] Replace current stat-counter cards with 3-level structured badges:
  - Badge 1: **Garance spokojenosti** / 100 % / description
  - Badge 2: **Prototyp zdarma** / 3 dny / description
  - Badge 3: **Hotový web** / 14 dnů / description
- [ ] Center-align all text, clear title/value/description hierarchy
- **File:** `UserTestimonialsSection.tsx`

### 3. "Jak probíhá spolupráce" Section – Full Redesign
- [ ] Update subtitle text
- [ ] Replace PNG circular images with SVG vector icons (outline/minimal style)
- [ ] Add 360° spin on icon hover (0.6–0.8s ease-in-out)
- [ ] Update step titles and descriptions
- **File:** `AiDesignFeaturesSection.tsx`

### 4. Pricing Section – Update Prices
- [ ] "Tvorba webu na míru": `od 24 900 Kč` → `od 19 900 Kč`
- [ ] "Modernizace webových stránek": `od 17 900 Kč` → `od 14 900 Kč`
- **File:** `SubscriptionPlansSection.tsx`

### 5. Header – Kontakt Link
- [ ] "Kontakt" nav navigates to `/kontakt` and scrolls to Firemní údaje section
- **File:** `Header.tsx`, `ContactSection.tsx`

### 6. Contact Page – Headline
- [ ] Change headline to: "Udělejte první krok k novému webu. Zabere to jen 5 minut."
- **File:** `ContactPage.tsx`

### 7. Contact Page – Form Redesign
- [ ] New "Typ projektu" options (5 items)
- [ ] Add "Požadované funkce / AI nástroje" multiselect (10 options)
- [ ] Add "Máte doménu / webhosting?" Ano/Ne
- [ ] Remove budget field
- [ ] Update FormState, validation, and Supabase mapping
- **File:** `ContactSection.tsx`

### 8. FAQ Section – Replace All Q&As
- [ ] Replace with 8 new business-relevant questions
- **File:** `FrequentlyAskedQuestionsSection.tsx`

---

## Progress Legend
- [ ] Not started
- [x] Complete
