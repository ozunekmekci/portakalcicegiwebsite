# PLAN V2 — Portakal Çiçeği Atölye
> **Versiyon:** 2.0 | **Başlangıç:** Haziran 2026  
> **Önceki plan:** Sprint 1–5 tamamlandı (18 oturum). Bu plan V1'in devamıdır.  
> **Ana değişiklik:** Notion CMS → SQLite + Cloudinary + Admin Panel mimarisi

---

## 🎯 V2 Hedefi

Ürün kataloğunu (50–200 ürün, 4 kategori) tarayıcıdan yönetilebilir hale getirmek.  
Teknik olmayan kullanıcı da fotoğraf yükleyip ürün ekleyebilmeli.  
Lokal çalışır, Vercel'e deploy edilince canlıda da çalışır.

---

## 🏗️ Yeni Mimari

```
VERİ AKIŞI:
/admin (şifreli Next.js sayfası)
  └─ Ürün formu (isim, kategori, açıklama, min adet, fiyat aralığı)
  └─ Cloudinary Upload Widget (fotoğraf sürükle-bırak)
  └─ SQLite veritabanı (better-sqlite3)
       └─ products tablosu
       └─ categories tablosu

PUBLIC SAYFALAR:
/koleksiyonlar/[slug]  → SQLite'dan çeker (Notion kaldırılıyor)
/urunler/[slug]        → SQLite'dan çeker
/                      → Ana sayfa Collections section SQLite'dan çeker

GÖRSEL AKIŞI:
Kullanıcı → Admin Panel → Cloudinary Upload Widget
                        → Cloudinary CDN (URL saklanır SQLite'da)
                        → next/image (Cloudinary URL ile)
```

### Neden Bu Stack?

| Bileşen | Seçim | Neden |
|---|---|---|
| Veritabanı (lokal) | SQLite + better-sqlite3 | Sıfır kurulum, dosya tabanlı, hızlı |
| Veritabanı (prod) | Vercel Postgres veya Turso | SQLite → Postgres migration tek seferlik |
| Görsel depolama | Cloudinary | Ücretsiz 25GB, CDN, upload widget hazır |
| Admin güvenlik | Next.js middleware + env şifre | Basit, sıfır dependency |
| ORM | Yok — raw SQL | better-sqlite3 sync API, tip güvenliği yeterli |

---

## 📁 Yeni Klasör Yapısı

```
portakalcicegi/
├── app/
│   ├── admin/
│   │   ├── page.tsx              ← Admin dashboard (ürün listesi)
│   │   ├── urun-ekle/
│   │   │   └── page.tsx          ← Yeni ürün formu
│   │   └── urun-duzenle/
│   │       └── [id]/
│   │           └── page.tsx      ← Ürün düzenleme formu
│   ├── api/
│   │   ├── admin/
│   │   │   ├── auth/
│   │   │   │   └── route.ts      ← Şifre doğrulama
│   │   │   ├── products/
│   │   │   │   ├── route.ts      ← GET (liste) + POST (yeni ürün)
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts  ← PUT (güncelle) + DELETE (sil)
│   │   │   └── categories/
│   │   │       └── route.ts      ← GET kategoriler
│   │   └── cloudinary/
│   │       └── signature/
│   │           └── route.ts      ← Upload imzası üret
│   ├── koleksiyonlar/
│   │   └── [slug]/
│   │       └── page.tsx          ← SQLite'dan çeker (Notion kaldırılır)
│   └── urunler/
│       └── [slug]/
│           └── page.tsx          ← SQLite'dan çeker (Notion kaldırılır)
├── lib/
│   ├── db.ts                     ← SQLite bağlantısı ve tip tanımları
│   ├── db-queries.ts             ← Tüm SQL sorguları
│   ├── cloudinary.ts             ← Cloudinary helper fonksiyonları
│   └── utils.ts                  ← slugify, formatlar (mevcut)
├── components/
│   └── admin/
│       ├── ProductForm.tsx        ← Ürün ekleme/düzenleme formu
│       ├── CloudinaryUpload.tsx   ← Görsel yükleme widget bileşeni
│       ├── ProductTable.tsx       ← Admin ürün listesi tablosu
│       └── AdminNav.tsx           ← Admin navigasyon
├── middleware.ts                  ← Admin route koruması
├── portakalcicegi.db             ← SQLite dosyası (gitignore'da)
└── .env.local                    ← Yeni env değişkenleri
```

---

## 🗃️ Veritabanı Şeması

```sql
-- Kategoriler tablosu
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,           -- "Düğün & Nişan"
  slug TEXT NOT NULL UNIQUE,    -- "dugun-nisan"
  emoji TEXT,                   -- "💍"
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Ürünler tablosu
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,                    -- "Kelebek Pleksi Magnet"
  slug TEXT NOT NULL UNIQUE,             -- "kelebek-pleksi-magnet"
  category_id INTEGER NOT NULL,
  description TEXT,
  min_order INTEGER DEFAULT 1,           -- Minimum sipariş adedi
  price_range TEXT,                      -- "₺45 - ₺65 / adet"
  images TEXT NOT NULL DEFAULT '[]',     -- JSON array: Cloudinary URL'leri
  cover_image TEXT,                      -- İlk/ana görsel URL
  is_active INTEGER DEFAULT 1,           -- 0 = gizli, 1 = yayında
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Başlangıç verileri
INSERT INTO categories (name, slug, emoji, display_order) VALUES
  ('Düğün & Nişan', 'dugun-nisan', '💍', 1),
  ('Babyshower', 'babyshower', '🍼', 2),
  ('Diş Buğdayı', 'dis-bugdayi', '🌾', 3),
  ('Doğum Günü', 'dogum-gunu', '🎂', 4);
```

---

## 🔐 Ortam Değişkenleri (.env.local)

```bash
# Mevcut (değişmiyor)
NOTION_API_KEY=                        # Geçici olarak tutuluyor, migration sonrası silinecek
NOTION_DATABASE_ID=
NOTION_PRODUCTS_DATABASE_ID=
FORMSPREE_ENDPOINT=https://formspree.io/f/mgoqoprk
NEXT_PUBLIC_WHATSAPP_NUMBER=           # ← EKSİK! Hemen doldurulacak

# Yeni — Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=     # Cloudinary dashboard → Settings → Cloud name
CLOUDINARY_API_KEY=                    # Cloudinary dashboard → Settings → API Keys
CLOUDINARY_API_SECRET=                 # Cloudinary dashboard → Settings → API Keys
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=  # Cloudinary → Settings → Upload Presets → "portakalcicegi"

# Yeni — Admin Panel
ADMIN_PASSWORD=                        # Güçlü bir şifre belirle (min 12 karakter)
ADMIN_SECRET=                          # Rastgele string (openssl rand -hex 32)

# Production'da eklenecek (Vercel dashboard)
DATABASE_URL=                          # Vercel Postgres veya Turso URL (ileride)
```

---

## 📋 Sprint Planı

### 🔴 SPRINT 6 — Kritik Fixler + Altyapı Kurulumu
> Tahmini süre: 1–2 oturum

#### GÖREV 6.1 — Kritik fixler (hemen yapılacak)
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` env variable'ını Vercel'e ekle ve test et
- [ ] WhatsApp butonlarının `wa.me/90XXXXXXXXXX` formatında çalıştığını doğrula
- [ ] `og:url` metadata'sını gerçek domain ile güncelle

#### GÖREV 6.2 — Cloudinary kurulumu
- [ ] Cloudinary hesabı açık ve hazır (kullanıcı yapacak)
- [ ] Cloudinary upload preset oluştur: `portakalcicegi` adıyla, Unsigned, klasör: `products/`
- [ ] `.env.local`'a Cloudinary değişkenlerini ekle
- [ ] `lib/cloudinary.ts` yardımcı dosyasını yaz (imza üretimi, URL transformasyonları)
- [ ] `app/api/cloudinary/signature/route.ts` endpoint'ini yaz

#### GÖREV 6.3 — SQLite altyapısı
- [ ] `better-sqlite3` ve tip tanımlarını (`@types/better-sqlite3`) kur
- [ ] `lib/db.ts` — bağlantı, tablo oluşturma (CREATE TABLE IF NOT EXISTS), başlangıç verileri
- [ ] `lib/db-queries.ts` — CRUD fonksiyonları (getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct, getCategories)
- [ ] Tip tanımları: `Product`, `Category`, `ProductWithCategory` interface'leri
- [ ] `portakalcicegi.db` dosyasını `.gitignore`'a ekle

---

### 🟠 SPRINT 7 — Admin Panel
> Tahmini süre: 2–3 oturum

#### GÖREV 7.1 — Admin güvenliği
- [ ] `middleware.ts` — `/admin` rotalarını koru, şifresiz erişimi `/admin/giris`'e yönlendir
- [ ] `app/admin/giris/page.tsx` — şifre giriş sayfası (marka renklerinde sade form)
- [ ] `app/api/admin/auth/route.ts` — şifre doğrulama, httpOnly cookie set
- [ ] `app/admin/layout.tsx` — Admin layout (AdminNav + auth kontrolü)
- [ ] `components/admin/AdminNav.tsx` — Admin navigasyon

#### GÖREV 7.2 — Admin dashboard
- [ ] `app/admin/page.tsx` — Ürün listesi dashboard
- [ ] `components/admin/ProductTable.tsx` — Ürünleri kategori bazlı listeler, düzenle/sil/gizle aksiyonları
- [ ] `app/api/admin/products/route.ts` — GET (liste) + POST (yeni)
- [ ] `app/api/admin/products/[id]/route.ts` — PUT (güncelle) + DELETE (sil)
- [ ] `app/api/admin/categories/route.ts` — GET kategoriler

#### GÖREV 7.3 — Cloudinary Upload bileşeni
- [ ] `components/admin/CloudinaryUpload.tsx` — Cloudinary Upload Widget entegrasyonu
  - Sürükle-bırak destekli
  - Çoklu fotoğraf yükleme (max 10 adet/ürün)
  - Yükleme sonrası URL'leri form state'ine aktar
  - Yüklenen görselleri önizleme + sırala + sil
- [ ] Cloudinary Upload Widget script'ini `app/admin/layout.tsx`'e ekle

#### GÖREV 7.4 — Ürün ekleme formu
- [ ] `components/admin/ProductForm.tsx` — Tam ürün formu:
  - Ürün adı (otomatik slug üretir)
  - Kategori seçimi (dropdown)
  - Açıklama (textarea)
  - Minimum sipariş adedi (number input)
  - Fiyat aralığı (text input, örn: "₺45 - ₺65 / adet")
  - Fotoğraf yükleme (CloudinaryUpload bileşeni)
  - Yayınla / Taslak olarak kaydet toggle
- [ ] `app/admin/urun-ekle/page.tsx` — Yeni ürün sayfası
- [ ] `app/admin/urun-duzenle/[id]/page.tsx` — Düzenleme sayfası (form aynı, dolu gelir)

---

### 🟡 SPRINT 8 — Public Sayfa Migrasyonu
> Tahmini süre: 1–2 oturum

#### GÖREV 8.1 — Notion'dan SQLite'a geçiş
- [ ] `lib/notion.ts` — import'ları kaldır, silinmeye hazırla
- [ ] `app/koleksiyonlar/[slug]/page.tsx` — `getProducts` artık SQLite'dan çekecek şekilde güncelle
- [ ] `app/urunler/[slug]/page.tsx` — aynı şekilde güncelle
- [ ] `components/sections/Collections.tsx` — SQLite'dan kategorileri çek
- [ ] `app/sitemap.ts` — SQLite'dan dinamik URL üret
- [ ] Notion env değişkenlerini `.env.local`'dan kaldır, Vercel'den de kaldır

#### GÖREV 8.2 — Görsel optimizasyonu (Cloudinary)
- [ ] `next.config.mjs` — Cloudinary domain'ini `remotePatterns`'e ekle (`res.cloudinary.com`)
- [ ] Tüm bileşenlerdeki `next/image` bileşenlerinin Cloudinary URL'lerini doğru şekilde işlediğini doğrula
- [ ] Cloudinary URL'lerini otomatik `w_800,q_auto,f_auto` parametresiyle dönüştüren helper yaz (`lib/cloudinary.ts` içinde `getOptimizedUrl()`)

#### GÖREV 8.3 — İlk ürün içeriklerini ekle
- [ ] Admin panelden 4 kategori için ilk ürünleri ekle (kullanıcı yapacak, ajan yardım eder)
- [ ] Her kategoride en az 3 ürün yayınlanmış olsun
- [ ] Public sayfalarda görüntülendiğini doğrula

---

### 🟢 SPRINT 9 — Production Deploy
> Tahmini süre: 1 oturum

#### GÖREV 9.1 — Vercel Postgres kurulumu
- [ ] Vercel dashboard'dan Postgres database oluştur (ücretsiz hobby plan)
- [ ] `DATABASE_URL` env variable'ını Vercel'e ekle
- [ ] `lib/db.ts`'i production ortamında Vercel Postgres'e bağlanacak şekilde güncelle
  - `process.env.NODE_ENV === 'production'` → `@vercel/postgres` kullan
  - `development` → `better-sqlite3` kullan
- [ ] Şema ve başlangıç verilerini production DB'ye uygula (migration script)

#### GÖREV 9.2 — Vercel env değişkenleri
- [ ] Tüm yeni env değişkenlerini Vercel dashboard'a ekle
- [ ] `ADMIN_PASSWORD`, `ADMIN_SECRET`, Cloudinary değişkenleri, `DATABASE_URL`

#### GÖREV 9.3 — Son testler ve deploy
- [ ] Admin panele giriş → ürün ekle → public sayfada görünüyor mu?
- [ ] Cloudinary'den fotoğraf yükleniyor mu?
- [ ] WhatsApp butonları çalışıyor mu?
- [ ] `npm run build` sıfır hata
- [ ] Vercel'e push, canlıda test

---

## ⚠️ Ajan İçin Kritik Notlar

1. **Notion'u hemen kaldırma** — Sprint 8'e kadar her iki sistem paralel çalışır. Sprint 8'de Notion kaldırılır.
2. **`portakalcicegi.db` dosyası Git'e gitmez** — `.gitignore`'a eklenmeli. Sadece migration script'i Git'te olur.
3. **Admin şifresini .env.local'da tut** — asla kod içine yazma.
4. **Cloudinary preset `unsigned` olmalı** — Widget'ın sunucu geçmeden direkt yükleyebilmesi için.
5. **SQLite sync API kullan** — `better-sqlite3` sync'tir, `await` kullanma. Next.js Server Actions veya Route Handlers içinde çalışır.
6. **Production'da Vercel Postgres** — `lib/db.ts` env'e göre doğru DB'yi seçmeli.

### 🔵 SPRINT 10 — Dashboard Genişletme, Sıralama (Drag & Drop), Referans Yönetimi ve İçerik Yönetimi
> Tahmini süre: 3–4 oturum

#### GÖREV 10.1 — Veritabanı Schema Güncellemeleri & Göç İşlemleri
- [ ] `lib/db.ts` (SQLite) ve `lib/db-init.ts` (Postgres) dosyalarında `ALTER TABLE` göç kontrolü ekle:
  - `products` tablosuna `view_count INTEGER DEFAULT 0` sütununu ekle.
  - `categories` tablosuna `banner_image TEXT` sütununu ekle.
- [ ] SQLite ve Postgres üzerinde `testimonials` ve `site_settings` tablolarını oluştur.
- [ ] `site_settings` tablosunu varsayılan Hero, Hakkımızda ve İletişim içerikleriyle dolduran seeder (tohumlama) kodunu yaz.
- [ ] `lib/db-queries-types.ts` dosyasına `Testimonial` arayüzünü tanımla, `Product` ve `Category` arayüzlerini güncelle.
- [ ] `lib/db-testimonials.ts` ve `lib/db-settings.ts` sorgu modüllerini yaz ve `db-queries.ts` üzerinden dışa aktar.

#### GÖREV 10.2 — İstatistik Dashboard ve Görüntüleme Sayacı
- [ ] `app/admin/page.tsx` sayfasını genişlet:
  - "Boş Görsel Uyarısı" veren ürünlerin sayısını hesaplayan kart ekle.
  - "En Çok Görüntülenen 5 Ürün" tablosunu ekle.
  - "Son Eklenen 5 Ürün" tablosunu ekle.
  - Tailwind ile sıfırdan "Kategoriye Göre Ürün Dağılımı" yatay bar grafiği (horizontal bar chart) tasarla.
- [ ] `app/urunler/[slug]/page.tsx` sayfasında ürün yüklendiğinde `incrementProductViewCount` fonksiyonunu tetikleyerek veritabanındaki `view_count` sayacını asenkron olarak 1 artır.

#### GÖREV 10.3 — Ürün Sıralama (Drag & Drop) Sayfası
- [ ] Harici kütüphane kullanmadan HTML5 Drag & Drop API'si ile `app/admin/sirala/page.tsx` sıralama ekranını oluştur.
- [ ] Kullanıcının kategori seçebileceği ve o kategorideki ürünleri sürükle-bırak yöntemiyle sıralayabileceği React state tabanlı arayüzü kodla.
- [ ] `/api/admin/products/reorder` API rotasını yaz; bulk update transaction çalıştırarak ürün önceliklerini (`display_order`) toplu güncelle.

#### GÖREV 10.4 — Referans/Yorum Yönetimi (CRUD) ve Vitrini
- [ ] Müşteri yorumlarını listeyen, silen ve durumunu değiştiren `/admin/yorumlar` yönetim arayüzünü tasarla.
- [ ] Yeni yorum ekleyen `/admin/yorumlar/ekle` ve düzenleyen `/admin/yorumlar/duzenle/[id]` sayfalarını ve formlarını oluştur. Avatar resmi için CloudinaryUpload bileşenini entegre et.
- [ ] Ana sayfa için `components/sections/Testimonials.tsx` (Müşteri Referansları) bileşenini modern, minimalist ve Framer Motion animasyonlu olarak tasarla.
- [ ] `app/page.tsx` sayfasına Müşteri Referansları bölümünü `<Testimonials>` olarak ekle.

#### GÖREV 10.5 — Ana Sayfa İçerik & Koleksiyon Banner Yönetimi
- [ ] Admin panelinde Hero ve Hakkımızda bölümlerini yönetmeyi sağlayan `/admin/ayarlar` sayfasını oluştur.
- [ ] `app/page.tsx` sayfasında DB settings verilerini server tarafında çekip `Hero` ve `About` bileşenlerine prop olarak besle; statik fallbacks ekle.
- [ ] Kategori ekleme ve düzenleme sayfalarında CloudinaryUpload kullanarak `banner_image` yükleme özelliği ekle; API rotalarını ve CRUD sorgularını güncelle.
- [ ] `/koleksiyonlar/[slug]` sayfasında `banner_image` alanını dinamik banner arka plan görseli olarak kullan; boş ise mevcut `#dcdcd9` yapısını koru.
- [ ] Ana sayfa Collections bileşeninde kategori resmini emoji yerine dinamik cover fotoğrafı olarak ata.

---

## 🔗 Referanslar

- Cloudinary Upload Widget: https://cloudinary.com/documentation/upload_widget
- better-sqlite3: https://github.com/WiseLibs/better-sqlite3
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
- Next.js Middleware: https://nextjs.org/docs/app/building-your-application/routing/middleware
- HTML5 Drag and Drop API: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
