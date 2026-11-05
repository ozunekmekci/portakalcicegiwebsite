# Set görselleri

Güncel katalog ve kullanım fotoğrafları için [pasta süsü set galerisine](cake-set-gallery.md) bak.

Eski `/set-studyosu` sayfası iki sunumu karşılaştırıyordu:

- Kutlamada gör: fotoğraf gerçekliğinde pasta, cupcake ve içecek sahnesinde gerçek ürün katmanları.
- Parçaları incele: aynı ürün katmanlarını ayrı ayrı gösteren etkileşimli düzen.

İlk örnekte Pembe ve Mavi setler bulunur. Adetler kaynak Canva afişleriyle aynıdır:
1 büyük pasta süsü, 10 şapkalı süs, 10 cupcake süsü, 10 pipet.
Kullanım sahnesi bir yerleşim örneğidir; tüm paket adedini görselde tekrar etmez.
Büyük süs arkada, yedi farklı şapkalı örnek ise pastanın üst yüzeyinde farklı
yüksekliklerde durur. Fotoğraflı süsler yapay zekâyla yeniden çizilmez.
Yiyecek sahnesinin üretim promptları ve dosya bilgileri: [gerçekçi sahne](realistic-scene-asset.md).

## Kaynaklar

- Canva tasarımı: `DAHZsmWyAwQ` — Black Minimal Motivational Quote Instagram Post.
- Yerel kaynaklar: `assets/Black Minimal Motivational Quote Instagram Post/1.svg` ve `2.svg`.
- Kaynak SVG'ler, gömülü PNG renk katmanları ile ayrı gri tonlu alfa maskeleri içerir.
- Web çıktıları: `public/images/set-layers/`. Kaynak afişler değişmez.

Katmanları yeniden üretmek için proje kökünde:

```sh
node scripts/extract-set-layers.mjs
```

Her katman kendi maskesiyle birleştirilir, boş kenarlar kırpılır, uzun kenarı en fazla
1000 piksel olan şeffaf WebP olarak kaydedilir. Kullanım sahnesindeki küçük tekil
örnekler, cupcake ve pipet görsellerinin ilk parçasından kırpılır. Bunlar nihai
ürün görselleri yerine geçmez; ayrı orijinal parçalar geldikçe değiştirilebilir.
`pick-head-1.webp`–`pick-head-7.webp` dosyaları, her temanın şapkalı süs
katmanındaki farklı başlıkların kesimleridir. Betik, bu kesimlerden önce kaynak
katmanın boyutunu doğrular; yerleşim değişmişse yanlış yüz kesmek yerine durur.
Kaynak dosyaların eleman sırası değişirse betik eşlemeleri de kontrol edilmelidir.

## Sonraki temalar için tercih edilen teslim biçimi

| İçerik | Kaynak biçim | Hazırlık |
| --- | --- | --- |
| Fotoğraflı büyük süs | Şeffaf PNG | Uzun kenarı yaklaşık 1600–2000 px; yalnızca ürün |
| Her farklı şapkalı/küçük süs | Ayrı şeffaf PNG | Uzun kenarı yaklaşık 800–1200 px; parçayı kesmeyen dar kenar boşluğu |
| Pipet veya pipet süsü | Ayrı şeffaf PNG | Fiziksel pipetin dahil olup olmadığı dosya adında belirtilmeli |
| Gerçek vektör çizim/çerçeve | SVG | Yazılar ve görseller afişin tamamından ayrı tutulmalı |
| Adet, isim, açıklama | Metin | Görsele gömmek yerine sayfa içeriğinde kullanılmalı |

SVG içine fotoğraf gömmek dosyayı vektöre dönüştürmez. Fotoğraflı ürünlerde
şeffaf PNG kaynak alıp web için WebP üretmek daha uygun bir akıştır.

Yeni temalarda parça sayıları ve adetler kaynak tasarımla doğrulanmadan aynı
31 parça varsayımı kullanılmamalıdır. Önizleme dış hizmete fotoğraf yüklemez.
