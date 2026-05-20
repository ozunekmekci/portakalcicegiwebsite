# PLAN.md — 1 Aylık Geliştirme Yol Haritası
> Bu dosya değişmez. Tamamlanan görevler PROGRESS.md'ye işlenir.

---

## 📐 Mimari & Klasör Yapısı

```
portakalcicegi/
├── app/
│   ├── layout.tsx          # Root layout, metadata, font
│   ├── page.tsx            # Ana sayfa (tüm section'lar)
│   ├── globals.css         # Tailwind base + custom CSS vars
│   └── api/
│       └── contact/
│           └── route.ts    # Formspree proxy (opsiyonel)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Collections.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Gallery.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── CollectionCard.tsx
│       └── GalleryItem.tsx
├── lib/
│   └── notion.ts           # Notion API client
├── public/
│   ├── images/
│   └── fonts/
├── content/
│   └── collections.ts      # Fallback static data
├── PLAN.md                 # Bu dosya
├── PROGRESS.md             # Oturum takibi
├── PROJECT_BRIEF.md        # Marka brief
└── SYSTEM_PROMPT.md        # Ajan kimliği
```

---

## 🗓️ Sprint Planı

### HAFTA 1 — Temel Altyapı
**Hedef:** Çalışan, deploy edilmiş boş Next.js projesi

- [ ] **GÖREV 1.1** — Next.js 14 projesi oluştur (`create-next-app`)
  - App Router, TypeScript, Tailwind CSS seçili
  - `globals.css`'e marka renkleri CSS variable olarak ekle
  - Temel font kurulumu (Google Fonts: Playfair Display + Inter)

- [ ] **GÖREV 1.2** — Vercel'e bağla ve ilk deploy
  - GitHub repo aç
  - Vercel'e bağla
  - `portakalcicegi.vercel.app` üzerinde canlı olsun

- [ ] **GÖREV 1.3** — Navbar ve Footer component'ları
  - Navbar: Logo (metin) + navigasyon linkleri + "Sipariş Ver" CTA butonu
  - Footer: Instagram linki, WhatsApp linki, kısa slogan, renk paleti uyumlu

- [ ] **GÖREV 1.4** — Notion veritabanı kur
  - Notion'da "Koleksiyonlar" veritabanı oluştur
  - Alanlar: İsim, Açıklama, Fotoğraf URL, Kategori, Aktif (checkbox)
  - Notion API entegrasyon token'ı al
  - `lib/notion.ts` dosyasını yaz

---

### HAFTA 2 — Ana Sayfa Section'ları (Statik)
**Hedef:** Tüm section'lar görsel olarak tamamlanmış, Framer Motion entegre

- [ ] **GÖREV 2.1** — Hero Section
  - Tam ekran, `#fbf7f0` arka plan
  - Büyük serif başlık + alt başlık
  - 2 CTA: "Koleksiyonları Keşfet" (scroll) + "Sipariş Ver" (WhatsApp deeplink)
  - Framer Motion: fade-in + subtle float animasyonu

- [ ] **GÖREV 2.2** — About Section
  - Sol: marka hikayesi metni ("detaylar önemlidir" narratifi)
  - Sağ: ürün fotoğrafı placeholder
  - Scroll reveal animasyonu

- [ ] **GÖREV 2.3** — HowItWorks Section
  - 3 adım kartı: Seç → Kişiselleştir → Teslim Al
  - İkon + başlık + kısa açıklama
  - Stagger animasyonu (kartlar sırayla belirir)

- [ ] **GÖREV 2.4** — Contact Section
  - WhatsApp butonu (büyük, belirgin)
  - Formspree formu (İsim, Telefon, Mesaj)
  - Instagram linki
  - Basit form validasyon

---

### HAFTA 3 — Dinamik İçerik & Koleksiyonlar
**Hedef:** Notion'dan gelen verilerle koleksiyonlar ve galeri canlı

- [ ] **GÖREV 3.1** — Collections Section (Notion entegrasyonu)
  - `lib/notion.ts` ile veritabanından koleksiyon kartlarını çek
  - Her kart: fotoğraf, isim, açıklama, "İncele" butonu
  - Fallback: Notion çalışmazsa `content/collections.ts` statik datası

- [ ] **GÖREV 3.2** — Gallery Section
  - Masonry veya grid düzeni
  - Hover efekti (scale + overlay)
  - İlk aşamada statik görseller (sahip manuel ekler)

- [ ] **GÖREV 3.3** — SEO & Metadata
  - `layout.tsx`'e `metadata` objesi ekle
  - Title: "Portakal Çiçeği Atölye | Premium Hediyelik Tasarımı"
  - Description, OG image, canonical URL
  - `robots.txt` ve `sitemap.xml`

- [ ] **GÖREV 3.4** — Mobile responsiveness audit
  - Tüm section'lar mobilde test et
  - Navbar mobile menu (hamburger)
  - Touch-friendly CTA butonları

---

### HAFTA 4 — Cilalama, Test & Yayın
**Hedef:** Gerçek domain'de canlı, performans puanı 90+

- [ ] **GÖREV 4.1** — Görsel optimizasyon
  - Tüm görseller `next/image` ile optimize
  - WebP formatına çevir
  - Lazy loading kontrol

- [ ] **GÖREV 4.2** — Performans & Lighthouse
  - Lighthouse skoru ≥90 (Performance, SEO, Accessibility)
  - Core Web Vitals kontrol

- [ ] **GÖREV 4.3** — Domain bağlantısı
  - `.com.tr` domain satın al
  - Vercel'e custom domain ekle
  - SSL otomatik aktif olur

- [ ] **GÖREV 4.4** — Son içerik doldurma
  - Gerçek ürün fotoğrafları yükle
  - Koleksiyon açıklamalarını Notion'a gir
  - WhatsApp numarasını deeplink'e ekle
  - Formspree endpoint'ini bağla

- [ ] **GÖREV 4.5** — Yayın öncesi kontrol listesi
  - Tüm linkler çalışıyor mu?
  - Form test gönderimi
  - Mobile Safari / Chrome test
  - Analytics (Vercel Analytics — ücretsiz)

---

## ⚠️ Bağımlılıklar & Riskler

| Risk | Çözüm |
|------|-------|
| Notion API rate limit | Statik fallback data her zaman hazır |
| Görseller yok | Placeholder ile başla, sahip ekler |
| Koleksiyon isimleri belirsiz | Hafta 3'e kadar sahibinden alınacak |
| Domain gecikmesi | Vercel subdomain ile yayına alınır, domain sonra eklenir |

---

## HAFTA 5 — Ürün Kataloğu Sistemi
**Hedef:** Amazon tarzı ürün listeleme + detay sayfaları, Notion'dan yönetilen

### Mimari Ek

```
app/
├── koleksiyonlar/
│   └── [slug]/
│       └── page.tsx          # Koleksiyon ürün listesi
├── urunler/
│   └── [slug]/
│       └── page.tsx          # Tekil ürün sayfası
components/
├── sections/
│   └── Collections.tsx       # Mevcut — koleksiyon kartları (güncellenir)
├── ui/
│   ├── ProductCard.tsx       # Yeni — ürün kartı (liste görünümü)
│   └── ProductGallery.tsx    # Yeni — ürün detay görseli
lib/
└── notion.ts                 # Genişletilecek — getProducts(), getProductBySlug()
```

### Notion Yapısı Eklentisi

**Ürünler** veritabanı (Koleksiyonlar'a Relation):
- İsim (Title)
- Slug (Text) — URL için: "babyshower-bulut-set"
- Koleksiyon (Relation → Koleksiyonlar)
- Ana Görsel (URL) — Google Drive public link
- Ek Görseller (Text) — virgülle ayrılmış URL'ler
- Fiyat Aralığı (Text) — "₺850 - ₺1.200"
- Kısa Açıklama (Text) — kart için 1-2 cümle
- Detay Açıklama (Text) — ürün sayfası için
- Minimum Adet (Number) — 100
- Aktif (Checkbox)

### Google Drive Görsel Dönüşümü

Normal Drive linki çalışmaz — direkt görsel URL'e çevrilmeli:
`https://drive.google.com/file/d/FILE_ID/view`
→ `https://drive.google.com/uc?export=view&id=FILE_ID`

lib/utils.ts'e yardımcı fonksiyon eklenecek.

---

### GÖREV 5.1 — Notion Ürünler Veritabanı & API

- [ ] Notion'da "Ürünler" veritabanı oluştur (yukarıdaki alanlar)
- [ ] Koleksiyonlar DB ile Relation kur
- [ ] `lib/notion.ts` güncelle:
  - `getProducts(koleksiyonSlug?)` — tüm veya filtreli ürünler
  - `getProductBySlug(slug)` — tekil ürün
- [ ] `lib/utils.ts` oluştur:
  - `driveUrlToDirectUrl(url)` — Drive link dönüşümü
  - `slugify(text)` — Türkçe slug üretimi
- [ ] `content/products.ts` fallback data (3-4 örnek ürün)

---

### GÖREV 5.2 — Koleksiyon Listesi Sayfası

- [ ] `app/koleksiyonlar/[slug]/page.tsx` — Server Component
  - Notion'dan o koleksiyonun ürünlerini çek
  - Üst: koleksiyon adı + açıklama banner
  - Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
  - Her kart: ProductCard.tsx
- [ ] `components/ui/ProductCard.tsx` — Client Component
  - Büyük görsel (aspect-[3/4])
  - Ürün adı (font-serif)
  - Fiyat aralığı (turuncu)
  - Minimum adet badge
  - Hover: scale + overlay "İncele" butonu
  - Tıklanınca: `/urunler/[slug]`
- [ ] Ana sayfadaki Collections kartları güncelle:
  - "İncele" butonu artık `/koleksiyonlar/[slug]`'a gitsin
  - WhatsApp deeplink yine de altta kalsın

---

### GÖREV 5.3 — Tekil Ürün Sayfası

- [ ] `app/urunler/[slug]/page.tsx` — Server Component
  - generateMetadata ile SEO (her ürüne özel title/description)
  - Sol: Ana görsel + thumbnail'lar (ProductGallery)
  - Sağ: Ürün adı, fiyat aralığı, min adet, açıklama
  - Büyük WhatsApp CTA: "Bu Ürün İçin Sipariş Ver"
    deeplink: `wa.me/90XXX?text=Merhaba! [Ürün Adı] için sipariş vermek istiyorum.`
  - Altında: "Bu Koleksiyonun Diğer Ürünleri" grid (3 kart)
- [ ] `components/ui/ProductGallery.tsx` — Client Component
  - Ana görsel büyük, altında küçük thumbnail'lar
  - Thumbnail'a tıklayınca ana görsel değişir (useState)
  - Framer Motion: görsel geçişi fade

---

### GÖREV 5.4 — Navigasyon & Breadcrumb

- [ ] Navbar "Koleksiyonlar" linki dropdown olsun:
  - Babyshower → /koleksiyonlar/babyshower
  - Doğum Günü → /koleksiyonlar/dogum-gunu
  - Diş Buğdayı → /koleksiyonlar/dis-bugdayi
  - Düğün & Nişan → /koleksiyonlar/dugun-nisan
- [ ] Tüm iç sayfalara breadcrumb:
  Ana Sayfa > Babyshower > Ürün Adı
- [ ] Ana sayfa Collections section güncelle:
  Koleksiyon kartına tıklayınca /koleksiyonlar/[slug]'a git

---

### GÖREV 5.5 — Son Test & PROGRESS Güncellemesi

- [ ] Notion'a 2-3 gerçek ürün gir, tüm alanları doldur
- [ ] Her sayfayı telefonda test et
- [ ] Lighthouse skoru kontrol (≥90 korunmalı)
- [ ] Tüm WhatsApp deeplink'leri çalışıyor mu kontrol
- [ ] PROGRESS.md son duruma güncelle
