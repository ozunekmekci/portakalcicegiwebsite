# Design Spec: Straight-Edge Artisan E-Commerce & 3-Category Architecture

**Date:** 2026-09-15  
**Brand:** Portakal Çiçeği Atölye (@portakalcicegi.atolye)  
**Status:** Approved by user  
**Target Branch:** `v2-redesign`

---

## 1. Context & Motivation

The website previously retained bubbly rounded edges (`rounded-full`, `rounded-2xl`, `rounded-3xl`), saturated orange tones (`#D95A2B`), and a broad category structure that diluted its e-commerce product focus.

This specification defines the transformation into:
1. **Geometric Precision & Editorial Luxury:** Eliminating all bubbly radii in favor of crisp, straight edges (`rounded-none`), clean 1px borders (`border-[#EDE6DF]`), and architectural product framing.
2. **Pastel Terracotta Palette:** Softening the accent color from intense orange to refined pastel terracotta (`#C86D51` / `#BD6B4D`) paired with warm linen backgrounds (`#FDFBF7`) and soft peach-clay accents (`#F7EDE8`).
3. **Product-First E-Commerce Hierarchy:** Foregrounding product imagery, pricing, and tactile details over lengthy decorative prose.
4. **Three Core Product Pillars:** Restructuring the brand into exactly three distinct handmade product lines:
   - **Magnet** (Baby shower, newborn, engagement keepsakes — Min. 25 pcs)
   - **Cake Topper (Pasta Süsleri)** (Custom acrylic, wood, and mirrored cake centerpieces — 1 pc)
   - **Kapı Süsü** (Hospital room, nursery, and children's room 3D door plaques — 1 pc)

---

## 2. Visual Design System Updates

### 2.1 Edge Radius (The Anti-Slop Floor)
- **Buttons:** `rounded-full` → `rounded-none px-6 py-3 font-semibold text-xs uppercase tracking-wider`.
- **Cards:** `rounded-2xl` / `rounded-xl` → `rounded-none border border-[#EDE6DF] bg-white transition-colors hover:border-[#C86D51]`.
- **Image Wrappers:** `rounded-2xl` / `rounded-xl` → `rounded-none overflow-hidden border border-[#EDE6DF]`.
- **Badges:** `rounded-full` → `rounded-none px-2 py-0.5 text-[11px] uppercase tracking-wider font-semibold`.
- **Form Inputs & Selects:** `rounded-xl` → `rounded-none border border-[#EDE6DF] px-4 py-3 text-sm focus:border-[#C86D51]`.
- **Modals, Banners & Sticky Bars:** `rounded-full` / `rounded-2xl` → `rounded-none border border-[#EDE6DF]`.

### 2.2 Color Tokens (`app/globals.css` & `tailwind.config.ts`)
```css
:root {
  --color-bg-cream: #FDFBF7;        /* Warm linen base */
  --color-bg-warm: #F5EFEB;         /* Sand / limestone */
  --color-bg-pastel: #F7EDE8;       /* Soft peach-clay tint */
  --color-text-ink: #1E1C1A;        /* Deep charcoal soot */
  --color-text-sepia: #696159;      /* Muted sepia */
  --color-terracotta: #C86D51;      /* Pastel Mediterranean terracotta */
  --color-terracotta-dark: #A85338; /* Rich terracotta hover */
  --color-terracotta-light: #F7EDE8;/* Pastel terracotta surface */
  --color-olive: #5A6855;           /* Olive accent */
  --color-amber: #D49B35;           /* Honey warm glow */
  --color-border: #EDE6DF;          /* Delicate architectural seam */
}
```

---

## 3. Product Catalog & Category Architecture

### 3.1 Three Core Categories

1. **Magnet (`/koleksiyonlar/magnet`)**
   - **Title:** Magnetler & Hatıralıklar
   - **Minimum Order:** Min. 25 Adet
   - **Lead Time:** 3-5 İş Günü
   - **Hero Products:** Gold Pleksi Bebek Magneti, 3D Bulut Temalı Magnet, Nişan & Düğün Hatıra Magneti.

2. **Cake Topper (`/koleksiyonlar/cake-topper`)**
   - **Title:** Cake Topper (Pasta Süsleri)
   - **Minimum Order:** 1 Adet Özel Üretim
   - **Lead Time:** 2-4 İş Günü
   - **Hero Products:** Kişiye Özel Aynalı Pleksi Pasta Süsü, İlk Yaş "One" Temalı Pasta Süsü, Safari Temalı 3D Ahşap & Pleksi Pasta Süsü.

3. **Kapı Süsü (`/koleksiyonlar/kapi-susu`)**
   - **Title:** Kapı Süsleri & Odası Panoları
   - **Minimum Order:** 1 Adet Özel Üretim
   - **Lead Time:** 3-5 İş Günü
   - **Hero Products:**
     - `gold-aynali-pleksi-bebek-kapi-susu`: Gold Aynalı Pleksi Bebek Kapı Süsü (30cm çap, pleksi isimlik, kuru çiçek & kurdele detayı, 650 ₺).
     - `ahsap-kasnak-kuru-cicekli-kapi-susu`: Doğal Ahşap Kasnak & Kuru Çiçekli İsimli Kapı Süsü (Doğal okaliptüs & cipso kuru çiçek, ahşap lazer kesim isim, 750 ₺).
     - `safari-temali-3d-cocuk-odasi-kapi-panosu`: Safari Temalı 3D Katmanlı Kapı Panosu (Ahşap ve renkli pleksi hayvan figürleri, kabartma isim, 690 ₺).

### 3.2 Backward Compatibility & Slug Redirection
- Old slugs (`pasta-susleri`, `babyshower`, `dugun-nisan`, `kombin-setler`) will smoothly redirect or map into the 3 core pillars so existing links remain functional.

---

## 4. Components Impact Analysis

1. **`app/globals.css`**: Update color tokens and add straight-edge utilities if needed.
2. **`components/layout/AnnouncementBar.tsx`**: Update banner with pastel accent and straight edges.
3. **`components/layout/Navbar.tsx`**: Replace rounded pills with clean architectural links, update dropdown menu to 3 categories.
4. **`components/layout/StickyMobileCTA.tsx`**: Update mobile bar with `rounded-none` straight edges and pastel terracotta CTA.
5. **`components/sections/Hero.tsx`**: Transform into an e-commerce product hero with category quick-switchers and straight-edge product card previews.
6. **`components/sections/Collections.tsx`**: Feature the 3 pillars (Magnet, Cake Topper, Kapı Süsü) in a balanced 3-column architectural grid with straight edges.
7. **`components/sections/BestsellersSlider.tsx`**: Render products across the 3 categories with straight-edged cards and clear single vs. batch badges.
8. **`components/sections/About.tsx`**: Straight-edge image frames and warm atelier narrative.
9. **`components/sections/HowItWorks.tsx`**: Straight-edge step cards.
10. **`components/sections/Contact.tsx`**: Straight-edge form inputs and category select options (Magnet, Cake Topper, Kapı Süsü).
11. **`components/ui/ProductCard.tsx`**: Straight edges (`rounded-none`), clean 1px border, pastel terracotta badges and hover state.
12. **`components/ui/CookieBanner.tsx`**: Straight-edge modal.
13. **`content/collections.ts` & `content/products.ts`**: Update data model to include 3 categories and the new Kapı Süsü product line.
14. **Database `portakalcicegi.db`**: Register the 3 categories in SQLite.

---

## 5. Verification Plan
- **TypeScript:** `npx tsc --noEmit` cleanly passing.
- **Impeccable Linter:** `impeccable detect` returning 0 violations.
- **W3C Nu Validator:** 0 errors across `/`, `/koleksiyonlar/magnet`, `/koleksiyonlar/cake-topper`, `/koleksiyonlar/kapi-susu`, and product pages.
- **Next.js Build:** `npm run build` cleanly generating all static pages.
- **Git Push:** Auto-commit and push to `origin/v2-redesign`.
