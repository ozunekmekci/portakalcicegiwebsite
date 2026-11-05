# Pasta süsü set galerisi

Katalog: `/urun-gruplari/pasta-susleri`. Her temanın kendi adresi ve dört karesi
var: bütün set, pasta süsleri, cupcake süsleri, pipetler. Adetler
[`content/set-posters.ts`](../content/set-posters.ts) içinden gelir.

Web çıktıları [`public/images/cake-sets/`](../public/images/cake-sets/): tema başına
bir bütün set görseli ve üç ürün/kullanım görseli çifti. Set çizimleri ve
fotoğraflar mevcut Canva kaynaklarından alındı. Süs adedini göstermek için
gerekli yerlerde kaynak tasarımdaki aynı süs tekrar kullanıldı.

Alt panellerdeki boş pasta, cupcake ve içecek sahneleri yerleşik `image_gen`
aracıyla oluşturuldu. Mevcut ürün çizimleri bu sahnelere ayrı katmanlar olarak
yerleştirildi ve web için WebP olarak kaydedildi. İlk kare önceki etkileşimli
sahnenin şeffaf yiyecek görselini kullanır.

## Üretim promptları

### Pasta

Use case: photorealistic-natural. Asset: a wide 2.35:1 photographic lower panel of a Turkish artisan party supplies gallery. Warm editorial window-lit birthday table photo, camera almost at front with a slight downward angle to see the oval top. One plain medium-sized ivory single-tier cylindrical buttercream cake on a low turned oak pedestal, centered at x=50%. IMPORTANT framing: the whole cake plus oak pedestal fits into only the LOWER 56% of the frame, top ellipse at about y=49%, feet of pedestal at y=94%, cake diameter about 35% of frame width. The upper 45% is clean light ivory plaster wall above the cake to allow paper toppers to be inserted later. Natural flax tablecloth on warm wooden table. At far right only, a small folded cream linen napkin and a cake server. Soft sunlight from upper left, warm off-white neutral backdrop, realistic texture, crisp bakery editorial photography. Absolutely no decorations, writing, toppers, candies, cupcakes, glasses, people, logos, or watermark. The top of the cake stays entirely blank. Landscape panorama, don't crop stand.

### Cupcake

Use case: photorealistic-natural. Asset: wide landscape 2.35:1 photographic lower panel of an artisan birthday supplies gallery. From a moderately high angle (about 35 degrees to table), show EXACTLY TEN small plain golden vanilla cupcakes, each in its own pale cream fluted paper liner with a low, neat white buttercream swirl, lined up in two parallel rows of five on a matte ivory rectangular serving tray. Five clearly separated cupcakes in the back row and five clearly separated cupcakes in the front row, all ten fully visible. Preserve fairly even spacing and aligned columns with centers at about 18,34,50,66,82 percent width. Keep all props outside the tray. Warm flax tablecloth, oak table, subtle afternoon daylight from upper left, neutral warm colors, real edible frosting and paper texture, premium editorial product photo. Composition leaves a gap above the back row and around the edges so printed picks can be placed later. No picks, no toppers, no candles, no color on cupcakes, no other baked goods, no text or logos. Landscape panorama.

### Pipet

Use case: photorealistic-natural. Asset: wide landscape 2.35:1 photographic lower panel of an artisan birthday supplies gallery. Show exactly TEN small clear straight-sided tumblers of pale peach-pink lemonade and a few ice cubes on a warm flax-clad birthday table, lined up in two parallel rows of five, each glass completely separate and countable. Camera about 35 degrees down towards table, far row rims around y=42%, near row rims around y=64%; glass centers in each row around 16,33,50,67,84 percent canvas width. Use small tumblers, keep plenty of blank light neutral background above their rims where actual paper decorated drinking straws will be added later. No straws yet, no other glassware, no cut fruit, no flowers, no cake, no writing, no logos. Soft daylight from upper left, glass reflections and condensation, warm cream and oak colors. Calm realistic product editorial photography. Entire ten glasses visible with clear spacing. Landscape panorama.
