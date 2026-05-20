import { getProductBySlug, getProducts, Product } from "@/lib/notion"
import { fallbackProducts } from "@/content/products"
import ProductGallery from "@/components/ui/ProductGallery"
import ProductCard from "@/components/ui/ProductCard"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MessageCircle } from "lucide-react"
import Breadcrumb from "@/components/ui/Breadcrumb"

type Props = {
  params: {
    slug: string
  }
}

const slugToIsim: Record<string, string> = {
  "babyshower": "Babyshower",
  "baby-shower": "Babyshower",
  "dogum-gunu": "Doğum Günü",
  "dis-bugdayi": "Diş Buğdayı",
  "dugun-nisan": "Düğün & Nişan",
}

const getEmoji = (slug: string) => {
  switch (slug) {
    case "babyshower":
    case "baby-shower":
      return "🍼"
    case "dogum-gunu":
      return "🎂"
    case "dis-bugdayi":
      return "🌾"
    case "dugun-nisan":
      return "💍"
    default:
      return "🎁"
  }
}

export async function generateMetadata({ params }: Props) {
  const normalize = (s: string) => s.toLowerCase().replace(/-/g, "")
  let product: Product | null = null

  try {
    product = await getProductBySlug(params.slug)
  } catch (error) {
    // ignore
  }

  if (!product) {
    product = fallbackProducts.find(p => normalize(p.slug) === normalize(params.slug)) ?? null
  }

  if (!product) return { title: "Ürün Bulunamadı" }

  return {
    title: `${product.isim} | Portakal Çiçeği Atölye`,
    description: product.kisaAciklama,
  }
}

export async function generateStaticParams() {
  try {
    const products = await getProducts()
    return products.map(p => ({ slug: p.slug }))
  } catch {
    return fallbackProducts.map(p => ({ slug: p.slug }))
  }
}

export default async function UrunDetayPage({ params }: Props) {
  const normalize = (s: string) => s.toLowerCase().replace(/-/g, "")
  let product: Product | null = null
  let ilgiliUrunler: Product[] = []

  try {
    product = await getProductBySlug(params.slug)
    ilgiliUrunler = await getProducts()
  } catch (error) {
    // ignore
  }

  if (!product) {
    product = fallbackProducts.find(p => normalize(p.slug) === normalize(params.slug)) ?? null
    if (ilgiliUrunler.length === 0) {
      ilgiliUrunler = fallbackProducts
    }
  }

  if (!product) {
    notFound()
  }

  const koleksiyonIsim = slugToIsim[product.koleksiyonSlug] ?? product.koleksiyonSlug
  const emoji = getEmoji(product.koleksiyonSlug)

  const waText = encodeURIComponent(`Merhaba! ${product.isim} için sipariş vermek istiyorum. Detay alabilir miyim?`)
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "90XXXXXXXXXXX"
  const waHref = `https://wa.me/${waNumber}?text=${waText}`

  // Aynı koleksiyondaki diğer aktif ürünler (maksimum 4 adet, mevcut ürün hariç)
  const otherProducts = ilgiliUrunler
    .filter(p => normalize(p.koleksiyonSlug) === normalize(product!.koleksiyonSlug) && p.id !== product!.id)
    .slice(0, 4)

  return (
    <main className="bg-[#fbf7f0] min-h-screen">
      {/* Breadcrumb Nav */}
      <div className="py-4 px-6 max-w-7xl mx-auto">
        <Breadcrumb items={[
          { label: "Ana Sayfa", href: "/" },
          { label: koleksiyonIsim, href: `/koleksiyonlar/${product.koleksiyonSlug}` },
          { label: product.isim },
        ]} />
      </div>

      {/* Main Content Grid */}
      <section className="py-8 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Product Gallery */}
          <div className="md:sticky md:top-24">
            <ProductGallery
              anaGorsel={product.anaGorsel}
              ekGorseller={product.ekGorseller}
              isim={product.isim}
              emoji={emoji}
            />
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col">
            {/* Category badge */}
            <div className="mb-4">
              <Link
                href={`/koleksiyonlar/${product.koleksiyonSlug}`}
                className="inline-block text-xs bg-[#fbf7f0] border border-[#ff914b] rounded-full px-3.5 py-1 text-[#ff914b] font-medium font-sans hover:bg-[#ff914b] hover:text-white transition-all"
              >
                {koleksiyonIsim} Koleksiyonu
              </Link>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] font-bold leading-tight mb-2">
              {product.isim}
            </h1>

            {/* Price range */}
            <div className="text-2xl font-medium text-[#fa3500] mb-2">
              {product.fiyatAraligi}
            </div>

            {/* Minimum quantity */}
            <div className="text-sm text-[#555555] font-sans mb-6">
              Minimum sipariş: <span className="font-semibold text-brand-text-dark">{product.minimumAdet || 100} adet</span>
            </div>

            {/* Divider line */}
            <hr className="border-t border-[#dcdcd9] my-6" />

            {/* Short description */}
            <p className="text-base text-[#555555] leading-relaxed font-sans mb-4">
              {product.kisaAciklama}
            </p>

            {/* Detailed description */}
            {product.detayAciklama && (
              <p className="text-sm text-[#555555] leading-relaxed font-sans whitespace-pre-line">
                {product.detayAciklama}
              </p>
            )}

            {/* Divider line */}
            <hr className="border-t border-[#dcdcd9] my-6" />

            {/* WhatsApp CTA Button */}
            <div className="w-full">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white rounded-full py-4 px-6 text-lg font-medium hover:bg-[#20ba59] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 font-sans"
              >
                <MessageCircle size={22} className="fill-white text-[#25D366]" />
                <span>Bu Ürün İçin Sipariş Ver</span>
              </a>

              <Link
                href={`/koleksiyonlar/${product.koleksiyonSlug}`}
                className="text-sm text-center mt-4 block text-brand-text-mid hover:text-[#ff914b] transition-colors font-sans"
              >
                ← {koleksiyonIsim} Koleksiyonuna Dön
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other Products Section */}
      {otherProducts.length > 0 && (
        <section className="bg-[#dcdcd9] py-16 px-6 mt-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-text-dark mb-8">
              Bu Koleksiyonun Diğer Ürünleri
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {otherProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
