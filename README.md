# Portakal Çiçeği Atölye

Portakal Çiçeği Atölye'nin web sitesi. İsimli magnetleri, kapı süslerini ve fotoğraflı pasta süslerini incelemek; bir kutlama için fiyat ve tasarım bilgisi almak isteyenler için hazırlandı.

<p align="center">
  <img src="public/images/celebrations/mihrimah-set.webp" alt="İsimli kapı süsü ve sepet içinde aynı temada hazırlanmış magnetler" width="420">
</p>

<p align="center"><em>İsimli kapı süsü ve magnetlerden bir örnek</em></p>

[Siteyi ziyaret et](https://portakalcicegiwebsite.vercel.app) · [Set içeriklerine bak](https://portakalcicegiwebsite.vercel.app/set-icerikleri) · [Instagram](https://www.instagram.com/portakalcicegi.atolye/)

## Sitede neler var?

Ürün gruplarında magnetleri ve kapı süslerini yakından görebilir, fotoğraf ve videolardaki örneklere bakabilirsin. Pasta süsü setlerinin sayfasında temalara göre değişen parçalar ve adetleri listeleniyor. Pembe ve mavi setler için parçaları masa üzerindeki örnekte ayrı ayrı incelemek de mümkün.

Beğendiğin ürünleri talebine ekleyip isim, tarih, renk ve adet gibi bilgileri yazabilirsin. Site önce bir mesaj taslağı hazırlar; sen kontrol edip paylaşana kadar mesaj gönderilmez. Bir WhatsApp numarası tanımlıysa mesaj WhatsApp'ta açılır. Numara yoksa metni kopyalayıp Instagram üzerinden gönderebilirsin.

## Projeyi çalıştırmak

Proje Next.js 14 ve React ile geliştirildi. Yerel geliştirmede SQLite kullanılıyor.

```bash
npm install
npm run dev
```

Ardından [localhost:3000](http://localhost:3000) adresini aç. Yerel veritabanı proje klasöründe `portakalcicegi.db` adıyla oluşturulur ve Git tarafından takip edilmez.

Yönetim paneline giriş için `.env.local` dosyasında `ADMIN_PASSWORD` ve `ADMIN_SECRET` tanımlanmalı. `NEXT_PUBLIC_WHATSAPP_NUMBER` isteğe bağlıdır; numara uluslararası biçimde, yalnızca rakamlarla girilebilir. Panelden kaydedilen iletişim numarası da talep akışında kullanılır.

Üretim ortamındaki veritabanı ve görsel yükleme özellikleri ilgili PostgreSQL ve Cloudinary yapılandırmasına bağlıdır. Gerçek parolaları ve servis anahtarlarını depoya ekleme.

## Kontroller

```bash
npm test           # Talep akışı ve yapılandırılmış veri testleri
npm run lint       # Kod kontrolleri
npm run build      # Üretim derlemesi
```

Sayfalar `app/`, arayüz bileşenleri `components/`, ürün grupları ve set içerikleri `content/` klasöründe. Görseller ve videolar `public/` altında yer alıyor.
