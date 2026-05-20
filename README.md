# 🍊 Portakal Çiçeği Atölye — Proje Kontrol Merkezi

## Bu Klasördeki Dosyalar

| Dosya | Ne İşe Yarar | Ne Zaman Dokunulur |
|-------|-------------|-------------------|
| `SYSTEM_PROMPT.md` | AI ajanının kimliği ve kuralları | Her oturumun başında ajana verilir |
| `PROJECT_BRIEF.md` | Marka, renkler, ton, teknik kararlar | Değişmez — sadece koleksiyon isimleri netleşince güncellenir |
| `PLAN.md` | 4 haftalık görev listesi | Görevler tamamlandıkça PROGRESS.md'ye taşınır |
| `PROGRESS.md` | Nerede kaldık? Sıradaki ne? | Her oturum sonunda ajan günceller |

---

## 🤖 AI Ajanını Nasıl Kullanacaksın

### Her Oturum Başında Şunu Yap:

1. AI ajanını aç (Claude Code, Cursor, Windsurf, vb.)
2. **İlk mesajında şunu kopyala-yapıştır:**

```
Sen bu projenin geliştiricisisin. Önce şu dosyaları oku:
1. SYSTEM_PROMPT.md
2. PROGRESS.md
3. PLAN.md (sadece aktif sprint bölümünü)

Sonra kaldığın yerden devam et.
```

3. Ajan sana "Kaldığım yerden devam ediyorum: [görev]" diyecek ve işe başlayacak.
4. Sen sadece onaylarsın veya yönlendirirsin.

### Her Oturum Sonunda:

"Bitti" veya "bugünlük kapat" de. Ajan PROGRESS.md'yi güncelleyecek.

---

## ⚡ Hızlı Başlangıç (İlk Oturum)

İlk oturumda ajana şunu söyle:

```
Sen bu projenin geliştiricisisin. Önce şu dosyaları oku:
SYSTEM_PROMPT.md, PROGRESS.md, PLAN.md

Sonra GÖREV 1.1'den başla: Next.js 14 projesi oluştur.
Proje adı: portakalcicegi
```

---

## 📋 Karar Bekleyen Şeyler (Önce Bunları Tamamla)

Ajan Hafta 3'e gelmeden bunları hazır et:

- [ ] **Koleksiyon isimleri:** Kaç koleksiyonun var ve isimleri ne? (örn: "Bebek Koleksiyonu", "Düğün Koleksiyonu")
- [ ] **WhatsApp numarası:** Siteye eklenecek numara
- [ ] **Formspree hesabı aç:** https://formspree.io → ücretsiz → endpoint URL'ini al
- [ ] **Notion hesabı:** Zaten varsa token al, yoksa aç (ücretsiz)
- [ ] **Ürün fotoğrafları:** En az 6-8 adet yüksek kaliteli fotoğraf hazırla

---

## 🎯 1 Ay Sonunda Ne Olacak?

- Vercel'de canlı, gerçek domainli profesyonel web sitesi
- Notion'dan 5 dakikada koleksiyon güncelleyebileceksin
- WhatsApp'a direkt sipariş yönlendirmesi çalışıyor
- Google'da aranabilir (SEO hazır)
- Aylık maliyet: ₺0
