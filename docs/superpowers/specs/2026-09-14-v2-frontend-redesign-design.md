# Portakal Çiçeği Atölye — v2 Frontend Redesign Tasarım Şartnamesi (Spec)

## 1. Amaç ve Vizyon
Bu şartname, Portakal Çiçeği Atölye web sitesinin mevcut "AI Slop" (yapay zeka şablonu) görünümünden tamamen arındırılarak; **Modern Akdeniz Atölyesi (Sıcak Editoryal Lüks)** konseptine kavuşturulmasını hedefler.

Atölye; doğum, baby shower, düğün, nişan ve ilk yaş kutlamaları için çok katmanlı 3D akrilik (pleksi) hatıra tasarımları üretmektedir. Yeni tasarım, "Detaylar önemlidir. Hediyeliklerimiz kutlamanın ertesi günü unutulmaz — bir ömür saklanır" felsefesini butik ve editoryal bir tasarım stüdyosu zarafetiyle yansıtacaktır.

---

## 2. Tasarım İlkeleri & Craft Floor Kuralları (AI Slop Karşıtı)

1. **Sıfır Eyebrow / Kicker Etiketi:**  
   Başlıkların üzerindeki `KOLEKSİYONLAR`, `HAKKIMIZDA`, `NASIL ÇALIŞIR` gibi tüm ALL CAPS etiketler silinecek. Başlıklar doğrudan konuşacaktır.
2. **Sıfır Emoji Kirliliği & Sahte İkonlar:**  
   `✨`, `🍼`, `🎂`, `🌾`, `💍`, `🎁` gibi yapay emojiler kaldırılacak; gerçek ürün detayları ve tutarlı SVG ikonografisi kullanılacak.
3. **Kart Kolaycılığına ("Cardocalypse") Son:**  
   Tekdüze kutu ızgaraları ve arkasına dev soluk numaralar (`01`, `02`, `03`) basılmış kartlar yerine, editoryal anlatım ve aşamalı tasarım yolculuğu çizgisi kullanılacak.
4. **Doğal Işık ve Renk Uyumu:**  
   Karanlık hero overlay'leri (`bg-black/40`), neon gölgeler (`shadow-[0_25px_50px_rgba(255,145,75,0.25)]`) ve soğuk sanayi grisi (`#dcdcd9`) kaldırılacak.
5. **Tarayıcı Yüzeyleri:**  
   `::selection`, `:focus-visible` ve özel kaydırma çubuğu sıcak krem ve terakota tonlarına uyumlu hale getirilecek.

---

## 3. Renk Paleti ve Tipografi

| Rol | Değer | Açıklama |
|---|---|---|
| Ana Zemin | `#FDFBF7` | Sıcak keten & kemik krem |
| İkincil Zemin | `#F5EFEB` | Kireçtaşı / sıcak kağıt dokusu |
| Ana Metin | `#1E1C1A` | Sıcak is kömürü (mürekkep hissi) |
| İkincil Metin | `#696159` | Sepya / kül kahvesi (zeminle uyumlu) |
| Aksan Terakota | `#D95A2B` | Pişmiş toprak / Akdeniz sıcağı |
| Aksan Zeytin | `#5A6855` | Doğal zeytin yaprağı |
| Aksan Amber | `#D49B35` | Bal ve güneş ışıltısı |

- **Başlık Fontu:** `var(--font-playfair)` (Playfair Display) — zarif serif, `text-balance` destekli.
- **Gövde Fontu:** `var(--font-inter)` (Inter) — ferah satır aralıkları, 65–75ch okuma sınırı.
- **Rakamlar:** `font-variant-numeric: tabular-nums`.

---

## 4. Bölüm Mimarisi

### 4.1. Navbar (`components/layout/Navbar.tsx`)
- Sıcak krem zeminle pürüzsüz bütünleşen, şeffaf cam efektlerinden arındırılmış temiz üst bar.
- Sol: Zarif serif `Portakal Çiçeği Atölye` + mikro `Akdeniz Hatıra Tasarımları`.
- Sağ: Menü bağlantıları ve terakota dolgulu `Özel Sipariş Oluştur` butonu.

### 4.2. Hero (`components/sections/Hero.tsx`)
- Asimetrik editoryal çift sütun düzeni.
- Sol sütun: Editoryal başlık (*“Hayatın en narin anları için, akrilikten ömürlük hatıralar.”*), atölye manifestosu ve 2 net CTA butonu (*“Koleksiyonları Keşfet”* ve *“WhatsApp ile Fikir Al”*).
- Sağ sütun: Pleksi derinliğini ve ışık kırılımlarını gösteren zarif ürün kompozisyonu (siyah örtü perdesi olmadan, doğal ışıkta).

### 4.3. Vitrin (`components/sections/BestsellersSlider.tsx`)
- Emojisiz, neon ışıksız, ferah yatay akış.
- Ürün adı, kategori ve adet bilgileri fotoğrafın altına taşınmış, nefes alan editoryal kartlar.

### 4.4. Koleksiyonlar (`components/sections/Collections.tsx` & `CollectionCard.tsx`)
- Emojiler (`🍼`, `🎂`, vb.) yerine zarif Akdeniz kemer formları ve gerçek ürün/illüstrasyon dokuları.
- 4 temel kategori: *Baby Shower & Doğum*, *Düğün & Nişan*, *İlk Yaş & Doğum Günü*, *Diş Buğdayı & Mevlit*.

### 4.5. Süreç & Zanaat (`components/sections/HowItWorks.tsx`)
- 3 kutucuklu klişe grid yerine, soldan sağa akan editoryal bir süreç hattı (*Model Seçimi*, *Kişiye Özel İşleme*, *Özenli Teslimat*).

### 4.6. Manifesto & Müşteri Hatıraları (`components/sections/About.tsx` & `Testimonials.tsx`)
- Soğuk gri blok ve sol kenar çizgisi (`border-l-4`) kaldırılmış sıcak alıntı alanı (*“Detaylar önemlidir...”*).
- Siyah yıldızlar yerine zarif tırnak işaretleriyle samimi müşteri hatıraları.

### 4.7. İletişim & Hızlı Teklif (`components/sections/Contact.tsx`)
- Doğrudan WhatsApp bağlantısı ve 3 alanlı (İsim, Telefon, Etkinlik/Adet) minimalist teklif formu.

---

## 5. Doğrulama ve Canlı Test

- Local dev server (`npm run dev`) başlatılarak `http://localhost:3000` üzerinden canlı test edilebilir olacak.
- `npm run build` ile hatasız üretim derlemesi teyit edilecek.
- Her aşama `v2-redesign` dalına commit edilecek ve GitHub uzak dalına (`origin v2-redesign`) pushlanacaktır.
