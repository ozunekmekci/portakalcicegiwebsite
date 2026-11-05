# Portakal Çiçeği Atölye — TasteSkills Review

5 Kasım 2026 · `codex/tasteskills-review` · başlangıç: `main`, `93a947e`

En büyük fırsat, kişiselleştirilebilen ürünleri büyük ve anlaşılır biçimde göstermek. Bugünkü sayfa sıcak bir atölye hissi veriyor; ancak küçük metinler, uzun açılış başlığı ve birbirine benzeyen bölümler ürünlerin karakterini zayıflatıyor. Önerim **Kutlama Masası**: gerçek ürün fotoğraflarını, mevcut set stüdyosunun tema ve parça seçimiyle aynı deneyimde buluşturan bir tasarım.

Bu çalışma inceleme ve tasarım önerisidir. Uygulama dosyaları değiştirilmedi, yayın yapılmadı. Başlangıçta bulunan izlenmeyen ham tasarım dosyaları ile `SetContentsTeaser.tsx` ve `SetProductGroups.tsx` bu incelemenin değişikliği değildir.

## İncelemenin dayanağı

Next.js 14 / React 18, Tailwind 3 ve CSS Modules kullanılıyor. Mevcut Inter / Playfair Display eşleşmesi, ürün fotoğrafları, videolar, bağlantılar, seçim durumu ve talep akışı korunabilecek malzemeler.

`npm run build` başarılı. İnceleme geliştirme sunucusunda değil, yerel üretim derlemesinde (`next start`, port 3100) yapıldı. `/`, `/set-studyosu`, `/set-icerikleri`, `/urun-gruplari/magnet` sayfaları Chromium ile **1440×900, 768×1024 ve 390×844** boyutlarında ölçüldü. Bu dört sayfaya ait 27 ekran görüntüsü/temas sayfası açılarak incelendi. Uzun mobil katalog için ayrıca son ekran alındı.

Kanıtlar [`.taste-skill/before`](../.taste-skill/before/) altında; etkileşim sonuçları [flows/results.json](../.taste-skill/flows/results.json), kaynak taraması [source-lint.txt](../.taste-skill/source-lint.txt), derleme çıktısı [build.txt](../.taste-skill/build.txt) içinde.

| Sayfa | Inspector FAIL / WARN | Baskın gövde boyutu | Kritik gözlem |
| --- | --- | --- | --- |
| Ana sayfa | 15 / 6 | 12 px | Ana başlık masaüstü / tablet / mobilde 4 / 3 / 4 satır |
| Set stüdyosu | 11 / 9 | 12 px | Tema ve adet seçimi mobilde büyük sahnenin altında |
| Set içerikleri | 9 / 7 | 13 px | Mobil sayfa 10.889 px, yaklaşık 12,9 ekran |
| Magnet | 10 / 10 | 13 px | Ürün başlığı tablette 1.144 px, mobilde 833 px aşağıda |

Sayılar aracın birleştirilmiş bulgularıdır; her ekran için ayrı hata toplamı değildir. Kaynak lint taraması 14 dosyada 55 FAIL / 12 WARN verdi. Bu sayılar bağımsız ürün hatası sayısı olarak okunmamalı: TasteSkill'in estetik tercihleri de FAIL üretir.

Ölçülen ekranlarda yatay taşma, bozuk görsel kaydı veya konsol hatası yok. İki font da yükleniyor. Kaydırma/yükleme sırasında araç sıfır hareketli öğe saydı; bu, hover ve tıklama tepkilerinin olmadığı anlamına gelmez. Mevcut video kullanıcı tarafından başlatılıyor.

## Markadan çıkan malzeme

Yeni tasarımın dayandığı on somut unsur:

- Portakal Çiçeği Atölye adı; renk araştırmasında portakal çiçeğinin beyazı ve yaprağın koyu yeşili kullanılabilir.
- Üç gerçek ürün grubu: magnet, kapı süsü, fotoğraflı pasta/ikram süsleri.
- Mihrimah adıyla hazırlanmış gerçek kapı süsü ve magnetler.
- Aynı ismi ve temayı girişte ve misafir hediyesinde birleştirme imkânı.
- Fotoğraflardaki ay/güneş figürleri, inci detayları ve isim yazısı.
- Magnetin tekli detayı ve sepet içindeki toplu sunumu.
- Gerçek Mihrimah seti ve kapı süsü videoları.
- Pembe/Mavi süslerin gerçek fotoğraf ve ayrılmış görsel katmanları.
- Bu iki sette 1 büyük süs + 10 şapkalı süs + 10 cupcake süsü + 10 pipet: 31 parça.
- İçerikleri birbirinden farklı 12 tema afişi ve bunların okunabilir metin verisi.

Bunlar projede doğrulanan malzemelerdir; hepsinin pazarda yalnızca bu markada bulunduğu iddia edilmiyor. Markayı farklılaştıracak şey, kendi ürünlerinin ve kendi örneklerinin işlenişi.

## Önce düzeltilmesi gereken üç şey

### İlk ekranı ürünle kurmak

Ana sayfanın 48 karakterlik başlığı mobilde dört satır; metnin saydığı ürünler güçlü bir katalog başlığına dönüşmüyor. Fotoğraf kolajı daha aşağıda başlıyor ve ilk ziyaret çerez kutusunun arkasında kalıyor. [Mobil açılış](../.taste-skill/before/home/mobile-fold.jpg), [masaüstü açılış](../.taste-skill/before/home/desktop-fold.jpg).

Öneri: **“Kutlamana özel tasarımlar”** başlığı; altında **“İsimli magnet, kapı süsü ve fotoğraflı pasta süslerini birlikte seç.”**; tek ana eylem **“Ürünleri keşfet”**. Görsel alan en az açılışın yarısı olmalı. Telefonda kısa başlık, ürünün görülebildiği büyük fotoğraf ve eylem birlikte tasarlanmalı. Mevcut uzun ürün listesi açıklamaya taşınabilir.

Magnet sayfasında sıra ayrıca değişmeli: kısa ürün adı ve açıklama, ürün fotoğrafı, seçimler. Bugün başlık mobilde 833 px'de başlıyor ve alt sabit barın arkasına denk geliyor; tablette ilk ekranın tamamen dışında. [Magnet mobil](../.taste-skill/before/magnet/mobile-fold.jpg).

### Okunabilirliği ve katmanları toparlamak

Ana sayfada 18 ayrı yazı boyutu, masaüstünde 13 px altı 46 metin bloğu var. Çoğu açıklama 12–13 px. Yasal alt bağlantıların kontrastı yaklaşık 3,3:1, çerez kutusundaki gizlilik bağlantısının 3,5:1.

Öneri: beş görevli ölçek; gövde 16–18 px, ikincil bilgi en az 13–14 px, metin koyu mürekkep renginde. Alt bağlantılar en az 4,5:1 kontrasta çıkarılmalı. Küçük büyük harf etiketleri, 01/02 numaraları, başlığın ortasında değişen italik renkler ve sabit görsellerdeki gölgeler azaltılmalı.

Çerez kutusu 390 px telefonda **191 px** yüksekliğinde, y=573–764 aralığını kapatıyor; alttaki sabit eylem barı da eklenince ürün alanı daha da daralıyor. İlk ziyaret ve tercih verilmiş durum ayrı tasarlanmalı. Tercihler erişilebilir kalırken bildirim daha kısa kurulmalı; aynı anda üst duyuru, sabit başlık, alt eylem ve büyük çerez panelinin rekabeti çözülmeli. Bu bir görsel yerleşim tespitidir; çerez uygulamasına ilişkin hukuki denetim yapılmadı.

### Kataloğu seçime dönüştürmek

Set içerikleri sayfası önce ana sayfadaki üç ürün grubunu tekrar ediyor. Telefonda tema afişlerine ulaşmak bile birkaç ekran sürüyor; ardından 12 büyük afiş tek sütunda geliyor. [Mobil katalog temas sayfası](../.taste-skill/before/sets/mobile-page-01.jpg).

Öneri: “Tema seç” alanını erkene almak; tema adlarıyla çalışan arama veya kısa filtreler; seçilen temaya ait büyük bir afiş ve yanında/altında canlı metin olarak adetler. Tüm temalara ulaşılabilen sade bir liste korunmalı. Afişteki el yazısı ve küçük adetler tek bilgi kaynağı olmamalı. Pembe/Mavi için stüdyoya doğrudan geçiş verilmeli. Diğer on tema için mevcut olmayan 3D/katmanlı önizleme vaat edilmemeli.

## Üç tasarım yönü

TasteSkill `draw.mjs` üç kompozisyon verdi: `uneven-photographs`, `split-stage`, `loud-flat-poster`. Renk ve tipografi karşılaştırılabilirlik için `--keep palette,type` ile korundu. Aşağıdaki renk alternatifleri ek tasarım önerisidir; mevcut marka sistemine uygulanmış değişiklikler değildir.

| Yön | Nasıl görünür? | Markaya ne kazandırır? | Dikkat edilmesi gereken |
| --- | --- | --- | --- |
| **Kutlama Masası** · split-stage · önerim | Büyük ürün/sahne bir tarafta; tema, parça ve içerik diğer tarafta. Mobilde kısa başlık + sahne + hemen yanında/altında tema seçimi. | Mevcut set stüdyosunu görünür bir marka deneyimine dönüştürür; ürünün birlikte nasıl kullanılacağını anlatır. | Uzun sabitlemelerden kaçınmak; mobil kontrolleri sahnenin çok altına bırakmamak. |
| **Atölye Albümü** · uneven-photographs | Farklı ölçeklerde gerçek fotoğraflar; bir büyük kutlama seti, yanında tek ürün detayı. Bol ve okunaklı açıklama; keskin fotoğraf kenarları. | El emeğini, kişisel isimleri ve gerçek ürün dokusunu öne çıkarır. | Bugünkü döndürülmüş fotoğraf kolajını çoğaltmak yeterli olmaz; ışık, kadraj ve ölçekte birlik gerekir. |
| **Kutlama Afişi** · loud-flat-poster | Büyük kısa tipografi, düz renk alanları, fotoğraflı topperların güçlü kesimleri; tema değişiminde görsel değişir. | Fotoğraflı doğum günü ürünlerinin neşesini ve temaların çeşitliliğini güçlü yansıtır. | Yenidoğan/kapı süsü ürünlerinde fazla gürültülü kalabilir; her yere aynı yoğunluğu taşımamak gerekir. |

Benim seçimim **The split stage**, seed **1965344461**. [Ham yön föyü](../.taste-skill/proposals/direction.json). Yeniden çekim/redraw yapılmadı. Seçim nedeni: projede zaten çalışan bir ürün sahnesi, gerçek set örnekleri, tema seçimi ve parça listesi var. İkinci yön fotoğraf çekimi genişlediğinde daha da güçlenir; üçüncü yön özellikle pasta süsleri bölümünde düşünülebilir.

Fikir cümlesi: **“Bu sayfada Mihrimah'ın uyumlu kapı süsü ve magnetleri ile Pembe/Mavi setlerin 31 parçası, ziyaretçinin ürünleri birlikte keşfettiği bir kutlama masasına dönüşür.”**

Canlı unsur: mevcut Pembe/Mavi seçimi, “kutlamada gör / parçaları incele”, seçilen parçanın vurgulanması ve gerçek adetlerin gösterilmesi. Magnet ve kapı süsünde gerçek fotoğraf/video arasında geçiş. İsim yazma eklenirse bu yalnızca kişiselleştirme taslağı olarak belirtilmeli; üretilecek tasarımın birebir önizlemesi izlenimi vermemeli. İlk sürüm için fotoğraf yükleme veya yeni bir yapılandırıcı gerekmiyor.

Rakip testi: “kutlama masası” fikri tek başına sektöre ait. Özgünlük kendi Mihrimah örneği, kendi fotoğraflı süsleri, gerçek içerik ve iyi çalışan sahneyle gelecek. Bunu pazarda benzersiz bir buluş olarak puanlamıyorum.

Renk araştırmasında bir seçenek: çiçek beyazı `#FFFFFF`, koyu yaprak mürekkebi `#24372C`, yalnızca ana eylemde portakal tonu `#C65420`. Ürünlerin pembe ve mavisi fotoğraflardan gelsin. TasteSkill mevcut krem–terracotta eşleşmesini reddediyor; bu estetik bir kural. Kararı tek başına araç hatasına bağlamak yerine ürünlerin ve marka adının taşıdığı renklere dayandırmak gerekir. Yeni renklerin tüm durumlarda kontrast kontrolü uygulama aşamasında yapılmalı.

## Önerilen ana sayfa argümanı

| Bölüm | İddia | Kanıt / içerik |
| --- | --- | --- |
| Açılış | Kutlamana göre kişiselleştirilen süsleri birlikte seçebilirsin. | Gerçek bir tamamlanmış set, kısa açıklama, ürünlere giden tek eylem. |
| Kutlama masası | Parçaların nerede ve nasıl kullanıldığını görebilirsin. | Çalışan Pembe/Mavi sahnesi, dört parça grubu, toplam 31 adet. |
| Uyumlu hatıralar | Kapı süsü ve magnetler aynı isim/tema ile hazırlanabilir. | Mihrimah set videosu, tekli magnet ve isim detayı. |
| Tema seçimi | Her setin içeriğini sipariş öncesi görebilirsin. | 12 gerçek afiş, temaya özel adet listesi; hepsini aynı içerikmiş gibi sunmamak. |
| Sipariş bilgisi | Ürününü seçip kutlama detaylarını paylaşabilirsin. | Mevcut ürün seçimi → talep → mesajı kontrol et akışı. |
| Kapanış | Atölyeyle iletişime geçebilirsin. | Büyük marka adı, Instagram ve tek açık talep bağlantısı. |

Fiyat, üretim süresi, malzeme, ölçü ve minimum adet netleşirse ürün kararını çok güçlendirir. Bunlar şu incelemede doğrulanamadı; örnek rakam eklenmemeli. Atölye üretim fotoğrafı ve paketleme videosu da gerçek çekimle eklenebilir; eldeki Mihrimah videoları üretim süreci kanıtı olarak sunulmamalı.

## Görsel eleştiri — ROUND 1

Puanlar bu incelemenin öznel değerlendirmesidir, Awwwards veya dış bir jüri puanı değildir. Ağırlıklar: tasarım %40, kullanım %30, yaratıcılık %20, içerik %10. Araçta FAIL bulunduğu için toplam tavanı 6,0. İnceleme kapsamında tasarım değiştirilmediğinden ikinci tur/sonrası karşılaştırması yok.

### Ana sayfa

ROUND 1

Seen in one second: Büyük serif ürün listesi ve eğik fotoğraf kolajı.

Idea (one sentence): Gerçek kişiselleştirilmiş ürünler sıcak bir atölye albümü içinde gösteriliyor; bu fikir aşağıdaki standart bloklara taşınmıyor.

Live thing: Ana sayfada ürün inceleme/ürün seçimi bağlantıları ve kullanıcı kontrollü video; asıl tema-parça etkileşimi başka sayfada.

Layout words by section: hero=kolajlı split / ürünler=üçlü grid / setler=split / pasta süsleri=split / süreç=üçlü sütun / kapanış=merkez metin.

Scores: design 6 · usability 5.5 · creativity 5.5 · content 7 → overall 5.9.

Caps applied: Inspector FAIL tavanı 6.0; uzun başlık, gölgeler, ince çizgiler, küçük gri gövde metni. Konsept benzer atölyelere kolay taşınabildiğinden yaratıcılık tavanı 6.

Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. `before/home/mobile-fold.jpg`: dört satır başlık ve çerez paneli ürünün ilk izlenimini zayıflatıyor → kısa başlık, büyük ve erken fotoğraf, daha kısa bildirim.
2. `before/home/desktop-page-01.jpg`: video ve pasta süsleri arka arkaya aynı görsel-soldaki split → birinde tam genişlikte ürün sahnesi, diğerinde açık bir detay/isim hikâyesi.
3. `before/home/desktop-page-02.jpg`: süreç ve kapanış küçük yardımcı metinlere dayanıyor → okunur gövde ölçeği ve tek, doğrudan eylem.

### Set stüdyosu

ROUND 1

Seen in one second: Kişinin fotoğrafından hazırlanmış pasta süsleri.

Idea (one sentence): Aynı fotoğraf dört farklı süse dönüşüyor ve kullanım yerleri sahne üzerinde incelenebiliyor.

Live thing: Tema değişimi, kullanım/parça görünümü, parça seçimi ve seçili parçayı tek başına gösterme.

Layout words by section: giriş=başlık / ürün=sahne ve içerik paneli / devam=bağlantı satırı / footer=kolonlar.

Scores: design 6.8 · usability 6.5 · creativity 7 · content 7.5 → overall 6.0 (ham 6.8).

Caps applied: Inspector FAIL tavanı 6.0. Konsept rakibe de uygulanabilir; yaratıcılık tavanı 7.

Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. `before/studio/mobile-page-01.jpg`: Pembe/Mavi düğmeleri sahneden sonra geliyor → mobilde sahneye yakın, yukarıda tema kontrolü.
2. `before/studio/desktop-fold.jpg`: adetler ve yardımcı açıklamalar büyük sahneye göre çok küçük → 16 px okunur içerik, daha belirgin seçili parça.
3. `before/studio/tablet-page-01.jpg`: sahne ve açıklama mobil/tablette uzun ayrı bloklar → daha kısa mobil sahne ve yan yana/komşu kontrol-içerik düzeni.

### Set içerikleri

ROUND 1

Seen in one second: Tema afişlerinden önce tekrar gelen üç ürün fotoğrafı.

Idea (one sentence): Hazır tema afişleri set içeriklerini kanıtlıyor; web deneyimi çoğunlukla afişleri sıralıyor.

Live thing: Afişi büyütme, içerik okuma ve seçili temayı talebe ekleme.

Layout words by section: giriş=metin / ürünler=üçlü grid / temalar=tekrarlayan afiş grid / iletişim=kısa metin.

Scores: design 6 · usability 5.8 · creativity 5.8 · content 7 → overall 5.9.

Caps applied: Inspector FAIL tavanı 6.0; estetik tekrarlar, küçük metinler. Rakip testi yaratıcılık tavanı 6.

Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. `before/sets/mobile-page-01.jpg`: tema aramak uzun bir tek-sütun taraması gerektiriyor → tema adlarını erken gösteren arama/liste ve seçili tema alanı.
2. `before/sets/desktop-page-01.jpg`: afişlerin küçük içerik yazıları okumayı zorlaştırıyor → gerçek metin olarak içerik ve adetler, afişi büyütme korunsun.
3. `before/sets/mobile-fold.jpg`: “set içerikleri” ziyaretinde önce genel ürün grupları geliyor → doğrudan temaları öne al, genel ürünlere ikincil bağlantı ver.

### Magnet ürün sayfası

ROUND 1

Seen in one second: Gerçek magnetlerin sepet içinde sunumu; telefonda ürün adı görünmüyor.

Idea (one sentence): Ürünün tekli ve toplu hâli arasında geçiş, ürünün kullanımını açıklıyor.

Live thing: Detay/toplu sunum değişimi, video, talebe ekleme/çıkarma.

Layout words by section: ürün=görsel ve açıklama split / uyumlu set=kısa metin / footer=kolonlar.

Scores: design 6.2 · usability 5 · creativity 5.5 · content 6.5 → overall 5.7.

Caps applied: Inspector FAIL tavanı 6.0; mobil/tablette ilk ekranda okunabilir ürün başlığı yok; yaratıcılık tavanı 6.

Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. `before/magnet/mobile-fold.jpg` ve `tablet-fold.jpg`: ürün adı fotoğraftan sonra ve aşağıda → başlık/açıklamayı görsel öncesine getir.
2. `before/magnet/desktop-fold.jpg`: çerez paneli seçim alanını kapatıyor → panelin yüksekliğini ve seçim alanıyla çakışmasını çöz.
3. `before/magnet/tablet-page-01.jpg`: gerçek ölçü, malzeme ve fiyat bilgisi bulunmadığından karar için mesajlaşmak gerekiyor → doğrulanmış bilgiler geldikçe kısa ürün detayları olarak ekle.

## Aracın kararını yorumladığım yerler

- Krem–terracotta, italik vurgu, çizgiler ve gölgeler TasteSkill'in tercihleriyle çelişiyor. Bunlar tek başına işlev bozukluğu değil; okunabilirlik ve ürün hiyerarşisinden sonra ele alınmalı.
- Stüdyo aracı aynı sahnenin küçük görsel katmanlarını bağımsız ürün fotoğrafı saymıyor. “Dört görselden az” bulgusunu gidermek için süs amacıyla fotoğraf çoğaltmak gerekmiyor. Farklı gerçek detaylar karar vermeyi kolaylaştıracaksa eklenmeli.
- Magnet sayfası başlangıçta bir fotoğrafı gösteriyor; detay ve video tıklama ile açılıyor. Otomatik ilk DOM fotoğraf sayısı bu etkileşimde sunulan toplam medyayı temsil etmiyor.
- Bazı temas sayfalarında lazy-loaded görseller yakalanma anında boş görünüyor. Raporlarda kalıcı bozuk görsel yok; bunu doğrulanmış eksik dosya olarak sınıflamıyorum. Görsellerin yüklenme/çözülme zamanlaması ayrı performans kontrolü gerektirir.
- Çerez paneli ve sabit başlık altında kalan başlıklar ekranlarda da görülüyor. Otomatik `covered-text` kayıtlarının tümünü ayrı ürün hatası saymadan, gerçek katman rekabetini önceliklendiriyorum.
- Hareket eksikliğini ilk üç düzeltmenin önüne koymuyorum. Yeni tasarımda tema/parça değişimi esas hareket olabilir; kısa girişler ve reduced-motion karşılığıyla desteklenebilir.

## Korunması gereken çalışan davranışlar

390 px Chromium'da menünün açılması, Escape ile kapanıp odağın menü düğmesine dönmesi; Mavi temanın seçilmesi; parça görünümüne geçiş ve pipet açıklamasının değişmesi; afiş penceresinin açılması, Escape ile kapanıp odağın afiş düğmesine dönmesi; Pembe Set seçiminin talep formuna ürün ve konsept olarak taşınması; magnet detay fotoğrafına geçiş ve talebe ekleme kontrol edildi. Sonuçlar `flows/results.json` içinde.

Bu bir tam erişilebilirlik veya uçtan uca sipariş denetimi değildir. Harici iletişim bağlantısı açılmadı ve mesaj gönderilmedi. Tasarım uygulaması yapılırsa mevcut davranışlar yeniden doğrulanmalı; klavye, hata durumları ve tüm sayfalar ayrıca kontrol edilmeli.

## Görseller, içerik ve sonraki uygulama sınırı

Yeni harici fotoğraf, klip veya çizim kullanılmadı. Yön föyünün sunduğu genel stok fotoğraflar seçilmedi/indirilmedi; gerçek ürün varlıkları yeterli. Dolayısıyla yeni kaynak/lisans/atıf listesi yok. Mevcut stüdyo sahnesi bir kullanım kompozisyonu; birebir çekilmiş ürün fotoğrafı olduğu iddia edilmemeli.

Önerilen başlık ve açıklama taslak metindir, yayınlanmadı. Yeni müşteri yorumu, satış istatistiği, fiyat, teslimat süresi veya ürün özelliği uydurulmadı. Tasarım için yeni bağımlılık gerekmiyor.

Uygulama sırası: önce ana sayfa açılışı + okunabilirlik + çerez/sabit bar yerleşimi; sonra mevcut stüdyonun görünürlüğü ve mobil kontroller; ardından tema keşfi ve ürün bilgileri. Tasarım uygulanırsa aynı üretim derlemesi ve üç boyutla yeniden ölçülerek önce/sonra karşılaştırması yapılmalı. Bu rapordaki mevcut FAIL kayıtları düzeltilmiş kabul edilmiyor.
