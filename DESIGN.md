# Design System — Portakal Çiçeği Atölye (v2)

## 1. Görsel Konsept & Dünya
**Modern Akdeniz Atölyesi (Sıcak Editoryal Lüks)**
- Sıcak kemik/keten dokular, doğal kireçtaşı ve terakota tonları.
- Sanatsal gravür zarafeti, nefes alan ferah editoryal tipografi.
- Katmanlı 3D pleksi/akrilik malzemenin ışık ve derinliğini ön plana çıkaran doğal ışık kurgusu.
- Evde el yapımı, samimi ve güven veren bir zanaatkâr atölyesi hissi.

## 2. Renk Paleti (Tokens)
```css
:root {
  --color-bg-cream: #FDFBF7;      /* Ana zemin - sıcak keten */
  --color-bg-warm: #F5EFEB;       /* İkincil zemin - sıcak kireçtaşı */
  --color-text-ink: #1E1C1A;      /* Ana metin - sıcak mürekkep / is kömürü */
  --color-text-sepia: #696159;    /* İkincil metin - sepya kül */
  --color-terracotta: #D95A2B;    /* Aksan - pişmiş Akdeniz toprağı */
  --color-terracotta-dark: #B8471D; /* Hover & vurgulu terakota */
  --color-olive: #5A6855;         /* Aksan - Akdeniz zeytin yaprağı */
  --color-amber: #D49B35;         /* Aksan - bal ve güneş ışıltısı */
  --color-border: #EDE6DF;        /* Zarif doğal ayırıcı sınır */
}
```

## 3. Tipografi Hiyerarşisi
- **Display / Başlıklar:** `Playfair Display` (`var(--font-playfair)`), serif, `font-bold` veya `font-medium`, `text-balance`.
- **Gövde Metinleri:** `Inter` (`var(--font-inter)`), sans-serif, `leading-relaxed`, maksimum okuma sütunu `65–75ch`.
- **Rakamlar & Fiyatlar:** `font-variant-numeric: tabular-nums`.

## 4. Kesin Tasarım Kuralları (Impeccable Craft Floor)
- ❌ Başlık üstü büyük harf etiketler (`ALL CAPS KICKER/EYEBROW`) kesinlikle yasaktır.
- ❌ Emojiler (`✨`, `🍼`, `🎂`, `🌾`, `💍`, `🎁`) ikon veya dekorasyon olarak kullanılamaz.
- ❌ Aynı boyutlu 3-4 kutucuklu klişe kart ızgaraları ("Cardocalypse") yasaktır.
- ❌ Kart veya alıntı soluna kalın şerit (`border-left: 4px solid ...`) konulamaz.
- ❌ Fotoğrafların üzerine zifiri karanlık perde (`bg-black/40`) ve neon ışıklı gölgeler (`shadow-[...rgba(255,145,75,...)]`) atılamaz.
- ❌ Soğuk sanayi grisi (`#dcdcd9`) kullanılamaz; tüm nötrler sıcak krem/sepya ailesinden türetilir.
- ✅ Tarayıcı yüzeyleri (`::selection`, `:focus-visible`, kaydırma çubuğu) sisteme özel stilize edilir.

## 5. Dönüşüm ve Teklif Standartları (MarketingSkills & CRO)
- **Net İkili Odak:** Sayfada hem **Kişiye Özel Pasta Süsleri (1 adet tekil)** hem de **Baby Shower & Özel Gün Magnetleri (25-100+ adet)** eşit zarafetle yer alır.
- **Kutlama Kombini Teklifi:** Pasta süsü ile uyumlu konsept magnetlerin birlikte sunulduğu paketler görünür kılınır.
- **Risk Giderme (Risk Reversal):**
  - "Önce WhatsApp'tan dijital taslak onayı, sonra el işçiliği."
  - "Kargoda hasara karşı %100 anında ücretsiz yeniden üretim."
- **Eyleme Geçiren Butonlar (Concrete CTAs):** "Tıklayın" veya "Devam Et" gibi genel butonlar yerine "WhatsApp ile Tasarım Konuşalım", "Kombin Set Fiyatı Al", "Pasta Süsü Taslağı İste" gibi somut eylemler kullanılır.
