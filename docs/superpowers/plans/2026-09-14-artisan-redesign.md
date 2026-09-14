# Portakal Çiçeği Atölye Butik Yeniden Tasarım Uygulama Planı (Implementation Plan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Portakal Çiçeği Atölye web sitesini Instagram'daki (@portakalcicegi.atolye) gerçek ev atölyesi kimliğiyle, hem kişiye özel pasta süslerini (1 adet tekil) hem de baby shower magnetlerini (25-100 adet) ve avantajlı kombin setlerini Corey Haines'in MarketingSkills ilkeleriyle dönüştürmek.

**Architecture:** Next.js 14 App Router, Tailwind CSS, Framer Motion, TypeScript, WebP görsel optimizasyonu, WhatsApp doğrudan dönüşüm hunisi.

**Tech Stack:** Next.js 14, React 18, Tailwind CSS 3, Lucide React, Framer Motion.

**Spec:** [`docs/superpowers/specs/2026-09-14-artisan-redesign.md`](file:///home/znekm/Masaüstü/portakalcicegi/docs/superpowers/specs/2026-09-14-artisan-redesign.md)

## Global Constraints
- Impeccable Craft Floor kuralları: Kicker/all-caps etiket yok, emoji kirliliği yok, Cardocalypse yok, saf nötr gri yok.
- W3C Nu Validator standartları: Sıfır hata (0 errors), nested `<main>` yok, h1->h2->h3 hiyerarşisi tam.
- Tüm görsellerde anlamlı Türkçe `alt` etiketleri ve WebP sıkıştırması.
- `main` dalı korunacak, tüm çalışmalar `v2-redesign` dalında yapılacak ve `origin/v2-redesign`'a pushlanacak.

---

### Task 1: Ürün Kataloğu ve Veri Modeli Zenginleştirmesi
**Files:**
- Modify: `content/products.ts`
- Modify: `lib/types.ts`

- [ ] **Step 1: Ürün kataloğuna Pasta Süsleri, Baby Shower Magnetleri ve Kombin Setleri ekle**
- [ ] **Step 2: TypeScript tiplerinde `koleksiyonSlug` ve `minimumAdet` eşleşmelerini doğrula**
- [ ] **Step 3: Test et ve derleme kontrolü yap (`npx tsc --noEmit`)**
- [ ] **Step 4: Commit et**

---

### Task 2: Üst Bar (Announcement) & Header Navigasyonu
**Files:**
- Modify: `components/layout/AnnouncementBar.tsx`
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: AnnouncementBar metnini ev atölyesi, dijital taslak onayı ve kargo güvencesi mesajıyla güncelle**
- [ ] **Step 2: Navbar menüsüne "Pasta Süsleri", "Baby Shower Magnetleri" ve "Kutlama Kombinleri" ekle**
- [ ] **Step 3: Mobil menüyü yeni kategoriler ve doğrudan WhatsApp butonu ile güncelle**
- [ ] **Step 4: Tarayıcı ve mobil testlerini yap**
- [ ] **Step 5: Commit et**

---

### Task 3: Hero Bölümü Dönüşümü
**Files:**
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1: Başlığı ve editoryal metni evde el yapımı üretim ve özgün tasarım ruhuyla güncelle**
- [ ] **Step 2: Çift eylem butonunu ("Pasta Süsü Tasarla" & "Koleksiyonları İncele") entegre et**
- [ ] **Step 3: 3 temel güven sütununu (1 Adet Pasta Süsü / 25+ Magnet, WhatsApp Taslak Onayı, %100 Telafi Garantisi) yerleştir**
- [ ] **Step 4: LCP ve responsive hizalamayı doğrula**
- [ ] **Step 5: Commit et**

---

### Task 4: Koleksiyonlar ve Kategori Sayfaları
**Files:**
- Modify: `components/sections/Collections.tsx`
- Modify: `app/koleksiyonlar/[slug]/page.tsx`

- [ ] **Step 1: Koleksiyon kartlarını 4 ana kategoriye uyarla (Pasta Süsleri, Baby Shower, Kombin Setler, Düğün & Nişan)**
- [ ] **Step 2: Kategori sayfasındaki filtreleme mantığını ve breadcrumb'ları doğrula**
- [ ] **Step 3: W3C heading hiyerarşisini (h1 -> h2 -> h3) koru**
- [ ] **Step 4: Commit et**

---

### Task 5: Vitrin & Çok Satanlar Slider
**Files:**
- Modify: `components/sections/BestsellersSlider.tsx`

- [ ] **Step 1: Slider ürünlerine pasta süsleri ve popüler baby shower modellerini ekle**
- [ ] **Step 2: Kartlara "1 Adet Özel Üretim" ve "25+ Adet Hatıralık" rozetlerini yerleştir**
- [ ] **Step 3: Her ürün için doğrudan WhatsApp tasarım talebi açan akıllı bağlantılar ekle**
- [ ] **Step 4: Slider kaydırma ve a11y etiketlerini test et**
- [ ] **Step 5: Commit et**

---

### Task 6: Atölye Yolculuğu ve Güven Kutusu
**Files:**
- Modify: `components/sections/HowItWorks.tsx`
- Modify: `components/sections/About.tsx`

- [ ] **Step 1: HowItWorks aşamalarını 3 adımlı WhatsApp taslak onay deneyimi haline getir**
- [ ] **Step 2: About bölümünde ev atölyesi zanaatkâr manifestosu ve kırılma garantisi kartı ekle**
- [ ] **Step 3: Görsel ve metin kontrast oranlarını (WCAG AAA) doğrula**
- [ ] **Step 4: Commit et**

---

### Task 7: WhatsApp Doğrudan Sipariş & Teklif Formu
**Files:**
- Modify: `components/sections/Contact.tsx`
- Modify: `components/layout/StickyMobileCTA.tsx`

- [ ] **Step 1: Contact formunda ürün tipi seçimini (Pasta Süsü, Baby Shower Magnet, Kombin Paket) sun**
- [ ] **Step 2: WhatsApp hızlı mesaj metinlerini konsept ve isim bilgisiyle zenginleştir**
- [ ] **Step 3: Mobil yapışkan CTA çubuğunu pasta süsü ve magnet için optimize et**
- [ ] **Step 4: Form doğrulamasını ve yönlendirmeyi test et**
- [ ] **Step 5: Commit et**

---

### Task 8: Kalite Kapıları, W3C ve Canlı Senkronizasyon
- [ ] **Step 1: W3C Nu Validator ile tüm sayfaları tara (0 errors)**
- [ ] **Step 2: `impeccable detect` denetimini çalıştır (0 ihlal)**
- [ ] **Step 3: `npm run build` ile üretim derlemesini tamamla (26/26 rotalar yeşil)**
- [ ] **Step 4: Değişiklikleri `origin/v2-redesign` dalına pushla**
