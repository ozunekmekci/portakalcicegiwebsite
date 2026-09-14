# Tasarım ve Pazarlama Spesifikasyonu (Spec): Portakal Çiçeği Atölye

- **Tarih:** 14 Eylül 2026
- **Marka:** Portakal Çiçeği Atölye
- **Instagram:** [@portakalcicegi.atolye](https://www.instagram.com/portakalcicegi.atolye/)
- **Yöntem:** Impeccable Design Directives + Corey Haines MarketingSkills (Offers, Copywriting, CRO, Psychology)

---

## 1. Amaç ve Değer Önerisi

### 1.1 Gerçek Marka Gerçeği (Brand Truth)
Portakal Çiçeği Atölye; seri üretim fabrikasyon ürünler satan bir şirket değil, evdeki atölye masasında her parçayı tek tek elde tasarlayan, lazerle kesen ve özenle bir araya getiren butik bir zanaatkâr üreticidir.

Instagram'da (@portakalcicegi.atolye) yakalanan samimiyet, güven ve özgün görsel estetik web sitesine taşınacaktır.

### 1.2 İki Ana Ürün Direği
1. **Kişiye Özel Pasta Süsleri (Cake Toppers):**
   - 1 adet tekil sipariş.
   - Doğum günü, baby shower, 1. yaş, nişan ve düğün pastaları için pleksi, akrilik ve ahşap katmanlı isimli/figürlü süsler.
2. **Baby Shower & Özel Gün Magnetleri:**
   - 25, 50, 100+ adetlik hediyelikler.
   - 3D katmanlı pleksi, aynalı detaylar, kurutulmuş çiçekli magnetler.
3. **Kutlama Kombin Paketi (Corey Haines Offer Stacking):**
   - *1 Adet Özel Pasta Süsü + 25 veya 50 Adet Uyumlu Konsept Magnet.*
   - Masadaki pasta ile davetlilere dağıtılan hediyeliklerin tam konsept ve renk uyumu.

---

## 2. Değer Denklemi ve Risk Giderme (Offer & Risk Reversal)

### A. Hayal Edilen Sonuç (Dream Outcome)
Kutlama gününde pastanın üzerinde parlayan, fotoğraflarda öne çıkan ve davetlilerin evlerine götürüp yıllarca buzdolaplarında sakladıkları ömürlük hatıralar.

### B. Başarı Güvencesi (Perceived Likelihood)
1. **WhatsApp Taslak Onayı:** Üretime başlanmadan önce isim, font, renk ve ölçü dijital görsel taslak olarak WhatsApp'tan gönderilir. Müşteri "Tamamdır" demeden fiziksel kesim yapılmaz.
2. **Kargoda Sıfır Risk Garantisi:** Kargoda en ufak bir kırılma veya ezilme olması durumunda, müşteriden hiçbir ücret talep edilmeden derhal yenisi üretilip kargolanır.
3. **Özenli Hediye Paketi:** Her sipariş, atölye zarafetinde korumalı şık kutularda paketlenir.

---

## 3. Arayüz ve Bileşen Mimarisi (Component Breakdown)

### 3.1 Üst Bar ve Navigasyon (`AnnouncementBar.tsx`, `Navbar.tsx`)
- Üst bar: *"✦ Ev Atölyemizde Özel Tasarım: Pasta süsü & baby shower magnetlerinde 1'e 1 dijital onay ve kargo güvencesi."*
- Menü:
  - Kişiye Özel Pasta Süsleri
  - Baby Shower Magnetleri
  - Kutlama Kombinleri
  - Atölye Hikayemiz
  - İletişim / WhatsApp

### 3.2 Hero Bölümü (`Hero.tsx`)
- Doğrudan ve samimi ana başlık:
  *"Evimizde, ellerimizle, en narin kutlamanız için tasarlıyoruz."*
- Alt açıklama:
  *"Doğum, baby shower, ilk yaş ve nişan kutlamaları için 3D akrilik pasta süsleri ve kişiye özel magnet hatıralıkları. Önce WhatsApp'ta taslağınızı görün, onaylayın; sonra sevgiyle üretelim."*
- Çift CTA:
  - `[Pasta Süsü Tasarla / Fikir Al]` -> WhatsApp
  - `[Koleksiyonları ve Kombinleri İncele]` -> Sayfa içi kaydırma
- 3 Güven Sütunu:
  - ✦ 1 Adet Pasta Süsü veya 25+ Magnet
  - ✦ WhatsApp'ta Birebir Taslak Onayı
  - ✦ Kırılmaya Karşı %100 Telafi Garantisi

### 3.3 Vitrin & Çok Satanlar (`BestsellersSlider.tsx`)
- Pasta süsleri ve magnetleri net etiketlerle sunan kartlar:
  - *Örn: "Zarif İsimli Aynalı Pleksi Pasta Süsü" (Tekil 1 Adet)*
  - *Örn: "3D Katmanlı Bulut Baby Shower Magnet" (Min. 25 Adet)*
  - *Örn: "İlk Yaş 'One' Akrilik Pasta Süsü" (Tekil 1 Adet)*
  - *Örn: "Safari Konsept Pasta Süsü & 30 Magnet Kombini" (Avantajlı Set)*

### 3.4 Koleksiyonlar (`Collections.tsx`)
1. **Kişiye Özel Pasta Süsleri** (1 Adet Özel Çizim)
2. **Baby Shower & Doğum Magnetleri** (25, 50, 100+ Adet)
3. **Kutlama Kombin Setleri** (Pasta Süsü + Uyumlu Magnet)
4. **Düğün & Nişan Hatıraları** (Özel İsimli Tasarımlar)

### 3.5 Atölye Süreci (`HowItWorks.tsx`)
1. **1. Hayalinizi & Temanızı Paylaşın:** Pasta modelinizi, bebeğinizin ismini veya etkinliğinizin konseptini WhatsApp'tan iletin.
2. **2. WhatsApp'ta Taslağınızı Görün:** Renkleri, yazı tipini ve yerleşimi dijital taslak olarak onayınıza sunalım.
3. **3. Ev Atölyemizde Özenli Üretim:** Onayınızın ardından tek tek elde keselim, temizleyelim ve korumalı kutuda kapınıza gönderelim.

### 3.6 Güven ve Garanti Kutusu (`OfferGuarantee`)
- Sayfada öne çıkan samimi zanaatkâr taahhüt kartı.
- WhatsApp doğrudan sipariş ve danışmanlık bağlantısı.

---

## 4. Doğrulama ve Kalite Kriterleri
- Impeccable Design Directives uyumu (0 ihlal, all-caps kicker yok, emoji kirliliği yok).
- W3C Nu Validator uyumu (0 error).
- Next.js production build hatasızlığı (`npm run build`).
- Sayfa hızı (LCP < 1.2s, CLS 0, WebP/AVIF görseller).
