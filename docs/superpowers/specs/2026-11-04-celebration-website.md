# Portakal Çiçeği: kutlama odaklı site

## Onaylanan amaç

Ziyaretçi markanın ne hazırladığını, ürünlerin kutlamada nasıl kullanıldığını ve
kendi ihtiyacı için nasıl talep oluşturacağını kolayca anlamalı. Site üç ürün
grubu etrafında kurulur: magnet, kapı süsü, pasta üstü ve kürdan topper.
Gruplar ayrı seçilebilir; üç ürünün birlikte alınması zorunlu değildir.

## Müşteri yolu

1. Ana sayfada gerçek ürünleri ve üç grubu tanır.
2. Ürün grubunda kullanım sunumu ile detay görünümü arasında geçiş yapar.
3. Aynı tema ve renklerle bir araya getirilebilen ürünlerin kullanımını görür.
4. Bir veya birden fazla ürün, konsept ve tahmini adet seçer.
5. İsim, etkinlik ve isteğe bağlı tarih/iletişim/not bilgisiyle talep taslağını hazırlar.
6. Taslağı kayıtlı WhatsApp numarasına açar veya Instagram için kopyalar.
   Ekran, paylaşım gerçekleşmeden talebin gönderildiğini söylemez.

## Görsel ve metin kararları

- Editoryal, sıcak krem zeminli playful-premium yön korunur.
- Pasta stüdyosunun kabul edilen iki görünümü ve Pembe/Mavi seçimi korunur.
- Magnet ve kapı süsü gerçek fotoğraflar ve sessiz, kullanıcı tarafından oynatılan videolarla anlatılır.
- Gerçek ürün fotoğrafları kullanım örneği olarak sunulur. Müşteri adları ve belirli bir siparişin hikâyesi genel site metnine taşınmaz. Topper klasöründeki pasta görselleri kullanım örneğidir.
- Kaynak görseller `assets/` altında korunur; web kopyaları küçültülür.
- Doğrulanmamış fiyat, asgari adet, üretim malzemesi, teslim süresi, indirim,
  adres, çalışma saati, yorum ve garanti metni yeni ana akışta kullanılmaz.
- Metinler Türkçe, kısa ve somut olur; humanizer yazım kuralları uygulanır.

## Teknik sınırlar

- Mevcut Next.js, React, Tailwind ve CSS modülleri kullanılır. Yeni bağımlılık eklenmez.
- Kullanıcının seçimiyle mevcut `codex/v3` dalında ve localhost'ta çalışılır.
- Önceden silinen belgeler ve ham medya arşivleri commit kapsamına alınmaz.
- Yalnızca ürün seçimi, adet ve konsept oturumda saklanır. İsim ve telefon saklanmaz.
- Oturum verisi bozuksa form boş bir seçimle açılır ve kullanılmaya devam eder.
- Bilinmeyen ürünler kabul edilmez. Girilmiş adet pozitif bir tam sayı olmalıdır.
- Seçim yokken veya isim/etkinlik eksikken paylaşılabilir taslak oluşturulmaz.
- Telefon yoksa ya da örnek numaraysa Instagram yolu kullanılır; örnek numaraya yönlendirme yapılmaz.
- Form dosya yüklemez ve otomatik dış mesaj göndermez.
- Mevcut yönetim paneli ve veritabanı korunur; eski ürün URL'leri silinmez.
- Public metadata ve sitemap yeni müşteri yolunu yansıtır.
- Klavye, mobil görünüm, azaltılmış hareket tercihi ve form hataları kontrol edilir.

## Onaylanan test sınırları

Kullanıcı mevcut dalı, ürün seçiminin korunmasını, talep formu doğrulamasını ve
iletişim yönlendirmesini onayladı. Bu davranışlar saf alan fonksiyonları ve
gerçek tarayıcıdaki müşteri yolu üzerinden kontrol edilir. Görsel metinler ve
CSS sabitleri için kaynak metni eşleyen testler yazılmaz.

## Tamamlanma

Ana sayfa, üç ürün inceleme yolu, mevcut set içerikleri/stüdyo ve talep formu
birbirine bağlı ve localhost'ta görülebilir olur. TypeScript, testler ve üretim
derlemesi geçer. Standart ve kapsam incelemesi ayrı, taze bağlamlarda yapılır.
Yalnızca bu çalışmaya ait değişiklikler mevcut dala commit edilir; yayın/push yapılmaz.
