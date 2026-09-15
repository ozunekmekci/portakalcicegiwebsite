# Implementation Plan: Straight-Edge Artisan E-Commerce & 3-Category Architecture

Convert Portakal Çiçeği Atölye website into a product-first, straight-edge editorial artisan e-commerce store with pastel terracotta accents and a focused 3-category catalog (Magnet, Cake Topper, Kapı Süsü).

## Proposed Changes

### 1. Color Tokens & Global Styling
- **`app/globals.css`**:
  - Update `--color-terracotta` to soft pastel terracotta `#C86D51`
  - Update `--color-terracotta-dark` to `#A85338`
  - Add `--color-terracotta-light` `#F7EDE8`
  - Update focus ring and text selection to pastel terracotta

### 2. Catalog & Data Architecture
- **`content/collections.ts`**:
  - Define exactly 3 core collections:
    1. `magnet`: "Magnetler & Hatıralıklar" (Min. 25 Adet)
    2. `cake-topper`: "Cake Topper (Pasta Süsleri)" (1 Adet Özel Üretim)
    3. `kapi-susu`: "Kapı Süsleri & Odası Panoları" (1 Adet Özel Üretim)
- **`content/products.ts`**:
  - Assign existing products to `magnet` and `cake-topper`
  - Add 3 signature products for `kapi-susu`:
    - `gold-aynali-pleksi-bebek-kapi-susu` (650 ₺, 1 Adet)
    - `ahsap-kasnak-kuru-cicekli-kapi-susu` (750 ₺, 1 Adet)
    - `safari-temali-3d-cocuk-odasi-kapi-panosu` (690 ₺, 1 Adet)
- **`app/koleksiyonlar/[slug]/page.tsx`**:
  - Update category slug mappings (`magnet`, `cake-topper`, `kapi-susu`), keep aliases for legacy links.

### 3. Straight-Edge Layout & Navigation
- **`components/layout/AnnouncementBar.tsx`**:
  - Replace rounded corners with `rounded-none`, apply pastel bar style.
- **`components/layout/Navbar.tsx`**:
  - Replace rounded pills (`rounded-full`) with crisp straight edges (`rounded-none`).
  - Update category dropdown to Magnet, Cake Topper, Kapı Süsü.
  - Update CTA button to pastel terracotta with `rounded-none`.
- **`components/layout/StickyMobileCTA.tsx`**:
  - Update with `rounded-none`, clean 1px border, pastel terracotta button.
- **`components/ui/ProductCard.tsx`**:
  - Replace all `rounded-2xl`, `rounded-xl`, `rounded-full` with `rounded-none`.
  - Apply clean 1px border `border-[#EDE6DF]`, pastel terracotta badges and hover state.

### 4. Product-First Hero Section
- **`components/sections/Hero.tsx`**:
  - Reframe hero as product-first: clear editorial headline, 3 category quick-jump buttons with straight edges, and an architectural product preview card.
  - Remove bubbly elements and oversized decorative padding.

### 5. Collections & Bestsellers Sections
- **`components/sections/Collections.tsx`**:
  - 3-column architectural straight-edge grid showcasing Magnet, Cake Topper, Kapı Süsü.
- **`components/sections/BestsellersSlider.tsx`**:
  - Straight-edge cards showcasing products across all 3 categories with appropriate `1 Adet` vs `Min. 25 Adet` badges.

### 6. Remaining Sections & Forms
- **`components/sections/HowItWorks.tsx`**: Straight-edge step cards.
- **`components/sections/About.tsx`**: Straight-edge image frames and artisan storytelling.
- **`components/sections/Contact.tsx`**:
  - Update select dropdown options: Magnet, Cake Topper (Pasta Süsü), Kapı Süsü.
  - Change all inputs/textareas to `rounded-none border border-[#EDE6DF]`.
- **`components/ui/CookieBanner.tsx`**: `rounded-none border border-[#EDE6DF]`.

---

## Verification Plan

### Automated Tests
1. `npx tsc --noEmit` to verify type safety.
2. `/home/znekm/.gemini/config/plugins/impeccable/skills/impeccable/scripts/impeccable detect --json components/ app/` to verify 0 design violations.
3. W3C Nu Validator python script across key routes:
   - `/`
   - `/koleksiyonlar/magnet`
   - `/koleksiyonlar/cake-topper`
   - `/koleksiyonlar/kapi-susu`
   - `/urunler/gold-aynali-pleksi-bebek-kapi-susu`
4. `npm run build` to ensure all static and dynamic pages compile cleanly.

### Deployment & Sync
1. Restart `npm run dev` in background.
2. Commit all changes to `v2-redesign`.
3. Push to `origin/v2-redesign`.
