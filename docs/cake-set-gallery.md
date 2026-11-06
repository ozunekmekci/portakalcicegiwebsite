# Pasta süsü set galerisi

Katalog: `/urun-gruplari/pasta-susleri`. Her temanın kendi adresi ve yedi karesi
var. Bütün seti ve üç ürün detayını, aynı ürünlerin kutlama masasındaki
görünümleri izliyor. Adetler
[`content/set-posters.ts`](../content/set-posters.ts) içinden gelir.

[`public/images/cake-sets/`](../public/images/cake-sets/) klasöründe her tema için
bir bütün set görseli, üç adet 1200 × 1500 piksel `*-post.webp` dosyası ve
aynı ölçüde üç adet `*-party.webp` kutlama ortamı görseli var.
Dikey gönderilerde Canva'daki ürün çizimleri solda, kullanım örneği sağda.
Pipet karesinde yerleşik `image_gen` aracıyla üretilen uzun çilekli limonata
bardağı kullanılıyor.

Kutlama fotoğraflarında pasta, cupcake, limonata ve Canva süs katmanları,
detay karelerindeki boyut ve yerleşimleriyle yeniden kullanılıyor. Yerleşik
`image_gen` aracı yalnızca boş ortam arka planlarını üretti.

İlk kare, önceki etkileşimli sahnenin şeffaf yiyecek görselini kullanır.
Önceki yatay sahnelerin üretim promptları da aşağıda kayıtlıdır.

## Üretim promptları

### Kutlama ortamları

**Pasta masası**

Generate a photoreal EMPTY BACKGROUND plate for a portrait 4:5 artisan birthday party product photograph. Bright indoor birthday party corner with a soft warm white plaster wall, out-of-focus butter-yellow, dusty rose and cream balloons grouped asymmetrically at the top edges, and a subtle blurry off-white bunting high in the background. Natural diffused window light from upper left. The key requirement: a completely clear continuous warm oatmeal linen-covered tabletop spanning the full frame from approximately 54 percent of the image height to the entire bottom edge. The near edge of the table is outside the frame. Shoot from a seated eye-level position looking slightly down around 12 degrees, visible tabletop and quiet background. A natural wooden cake stand will be composited afterward centered at x=50%, with its base at y=78% and its top decoration extending to y=18%, so keep center and entire tabletop unobstructed. At the extreme left and right table edges, optional small neutral wrapping or a folded napkin, very subtle and well outside the central area. Realistic linen texture, natural imperfect soft folds, no center wrinkles or glaring reflections. Warm neutral photo, relaxed afternoon birthday celebration, soft realistic depth of field. NO cake, desserts, candles, drinks, plates, standing objects on the center of the table, people, letters, numbers, logos, graphic frames, or watermarks. Full bleed 4:5 portrait camera photograph.

**Cupcake masası**

Generate a full bleed 4:5 portrait photoreal empty background plate for a set of cupcake decorations photographed at a real birthday party. A broad warm oatmeal linen-covered dessert table fills the foreground and bottom 73 percent of the image, viewed from a moderately elevated front camera looking downward about 35 degrees so the tabletop recedes toward the upper edge. The far edge of the table is near y=24 percent and the near edge falls outside the frame. A soft, out-of-focus cream wall and a small cluster of pale apricot, cream and dusty rose party balloons visible in the upper corners. Warm window light from upper left, no harsh diagonal sunbars. Put only a small stack of blush linen napkins at the extreme side edge, and a few subtle paper confetti pieces far along the edges, entirely outside the central 72 percent of the width. Keep the ENTIRE central field of table fabric absolutely empty, even in the background, from y=27 percent to the bottom, because ten vanilla cupcakes in three rows will be composited on it. No trays, no plates, no food, no glasses, no people, no candles, no text or watermark. Soft palette, realistic fabric with light, unobtrusive texture, photographic detail, believable birthday setting. Do not add a border or collage.

**Limonata masası**

Generate a full bleed 4:5 portrait photoreal empty background plate for tall strawberry lemonade glasses photographed at a birthday party. A broad light natural oak table, with a matte neutral oat linen runner spanning the central field, fills the bottom 75 percent of the image. The far edge of the table is close to y=23 percent and the near edge is outside the bottom of the frame. Moderately elevated front camera angle, looking slightly downward, compatible with upright Collins glasses showing oval rims. The center, from x=16 percent to 84 percent across the full table, is absolutely empty and unobstructed for ten glasses to be composited later in three rows. Keep the runner texture understated and the light soft and warm from upper left. Subtle pink, cream and pale yellow out-of-focus birthday balloons or garland up high along the far edges in a cream room. An understated small wedge of lemon and a few strawberries on a light plate may be visible ONLY at the very bottom right corner, outside central area, to imply homemade lemonade. No glasses, no bottles, no alcohol, no straws, no people, no hands, no cake, no graphic panels, no typography or watermark. Natural bright daytime birthday photography with soft realistic shadows, pastel warmth and subtle depth of field.

### Uzun çilekli limonata bardağı

Asset for an artisan party supply shop, isolated transparent photoreal product cutout. ONE tall, narrow, straight-sided clear Collins lemonade glass (not a short tumbler), no stem, sides nearly parallel, glass height 2.8 times its width, filled 85 percent with translucent pastel strawberry-pink lemonade, a few irregular ice cubes, a small fresh pale yellow lemon wheel visible against the interior of the glass, two small sliced strawberries visible near the bottom, subtle condensation. Homemade nonalcoholic lemonade for a birthday party. No garnish on the rim, no straws, no umbrellas, no herbs, no salt or sugar rim, no branding, no text, no hands, no other glassware, no props. Soft warm daylight from upper left. Very slightly elevated straight-on eye-level front view so the oval rim is visible, clear rim and whole base, glass silhouette upright with a little breathing room. Authentic commercial photo, warm highlights, maintain soft salmon-pink liquid. Isolate exactly one full glass with a true transparent alpha background. No visible floor and no large detached shadow. A separate customized party straw will be placed into the glass by the website.

### Pasta

Use case: photorealistic-natural. Asset: a wide 2.35:1 photographic lower panel of a Turkish artisan party supplies gallery. Warm editorial window-lit birthday table photo, camera almost at front with a slight downward angle to see the oval top. One plain medium-sized ivory single-tier cylindrical buttercream cake on a low turned oak pedestal, centered at x=50%. IMPORTANT framing: the whole cake plus oak pedestal fits into only the LOWER 56% of the frame, top ellipse at about y=49%, feet of pedestal at y=94%, cake diameter about 35% of frame width. The upper 45% is clean light ivory plaster wall above the cake to allow paper toppers to be inserted later. Natural flax tablecloth on warm wooden table. At far right only, a small folded cream linen napkin and a cake server. Soft sunlight from upper left, warm off-white neutral backdrop, realistic texture, crisp bakery editorial photography. Absolutely no decorations, writing, toppers, candies, cupcakes, glasses, people, logos, or watermark. The top of the cake stays entirely blank. Landscape panorama, don't crop stand.

### Cupcake

Use case: photorealistic-natural. Asset: wide landscape 2.35:1 photographic lower panel of an artisan birthday supplies gallery. From a moderately high angle (about 35 degrees to table), show EXACTLY TEN small plain golden vanilla cupcakes, each in its own pale cream fluted paper liner with a low, neat white buttercream swirl, lined up in two parallel rows of five on a matte ivory rectangular serving tray. Five clearly separated cupcakes in the back row and five clearly separated cupcakes in the front row, all ten fully visible. Preserve fairly even spacing and aligned columns with centers at about 18,34,50,66,82 percent width. Keep all props outside the tray. Warm flax tablecloth, oak table, subtle afternoon daylight from upper left, neutral warm colors, real edible frosting and paper texture, premium editorial product photo. Composition leaves a gap above the back row and around the edges so printed picks can be placed later. No picks, no toppers, no candles, no color on cupcakes, no other baked goods, no text or logos. Landscape panorama.

### Pipet

Use case: photorealistic-natural. Asset: wide landscape 2.35:1 photographic lower panel of an artisan birthday supplies gallery. Show exactly TEN small clear straight-sided tumblers of pale peach-pink lemonade and a few ice cubes on a warm flax-clad birthday table, lined up in two parallel rows of five, each glass completely separate and countable. Camera about 35 degrees down towards table, far row rims around y=42%, near row rims around y=64%; glass centers in each row around 16,33,50,67,84 percent canvas width. Use small tumblers, keep plenty of blank light neutral background above their rims where actual paper decorated drinking straws will be added later. No straws yet, no other glassware, no cut fruit, no flowers, no cake, no writing, no logos. Soft daylight from upper left, glass reflections and condensation, warm cream and oak colors. Calm realistic product editorial photography. Entire ten glasses visible with clear spacing. Landscape panorama.
