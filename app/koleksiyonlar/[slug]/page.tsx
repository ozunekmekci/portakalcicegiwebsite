import Link from "next/link"
import { getProducts } from "@/lib/notion"
import { fallbackProducts } from "@/content/products"
import ProductCard from "@/components/ui/ProductCard"
import { Product } from "@/lib/notion"

type Props = {
  params: {
    slug: string
  }
}

// Slug → koleksiyon isim eşleşmesi
const slugToIsim: Record<string, string> = {
  "babyshower": "Babyshower",
  "baby-shower": "Babyshower",
  "dogum-gunu": "Doğum Günü",
  "dis-bugdayi": "Diş Buğdayı",
  "dugun-nisan": "Düğün & Nişan",
}

export async function generateMetadata({ params }: Props) {
  const isim = slugToIsim[params.slug] ?? params.slug
  return {
    title: `${isim} Koleksiyonu | Portakal Çiçeği Atölye`,
    description: `${isim} için özel tasarım 3D akrilik hediyelikler. 100+ adet toplu siparişlerde özel fiyat.`,
  }
}

export function generateStaticParams() {
  return Object.keys(slugToIsim).map(slug => ({ slug }))
}

export default async function KoleksiyonPage({ params }: Props) {
  const isim = slugToIsim[params.slug] ?? params.slug
  let filtered: Product[] = []

  const normalize = (s: string) => s.toLowerCase().replace(/-/g, "")

  try {
    const products = await getProducts()
    filtered = products.filter(p => normalize(p.koleksiyonSlug) === normalize(params.slug))
    if (filtered.length === 0) {
      filtered = fallbackProducts.filter(p => normalize(p.koleksiyonSlug) === normalize(params.slug))
    }
  } catch (error) {
    filtered = fallbackProducts.filter(p => normalize(p.koleksiyonSlug) === normalize(params.slug))
  }


  const waText = encodeURIComponent(`Merhaba! ${isim} koleksiyonu için özel sipariş vermek istiyorum.`)
  const waHref = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "90XXXXXXXXXXX"}?text=${waText}`

  return (
    <main className="bg-[#fbf7f0] min-h-screen">
      {/* Upper Banner */}
      <section className="bg-[#dcdcd9] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-xs md:text-sm text-brand-text-mid mb-4 font-sans" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-orange transition-colors">
              Ana Sayfa
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-brand-text-dark font-medium">{isim}</span>
          </nav>

          {/* Title and details */}
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-text-dark leading-tight">
            {isim} Koleksiyonu
          </h1>
          <p className="text-sm md:text-base text-brand-text-mid mt-3 font-sans max-w-2xl">
            Özel günleriniz için tasarlanan {isim.toLowerCase()} koleksiyonu.
          </p>

          <span className="inline-block mt-4 text-xs font-semibold bg-white/60 text-brand-text-dark px-3 py-1 rounded-full border border-black/5">
            {filtered.length} ürün
          </span>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <p className="text-brand-text-mid text-lg mb-6 font-sans">
              Bu koleksiyona henüz ürün eklenmedi. Yakında!
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#25D366] text-white hover:bg-[#20ba59] transition-all duration-300 rounded-full px-8 py-3.5 text-base font-semibold shadow-md"
            >
              Özel sipariş için yazın
            </a>
          </div>
        )}
      </section>
    </main>
  )
}
