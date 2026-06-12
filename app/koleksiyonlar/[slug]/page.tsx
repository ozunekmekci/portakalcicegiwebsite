import Link from "next/link"
import { getProducts } from "@/lib/db-queries"
import { fallbackProducts } from "@/content/products"
import ProductCard from "@/components/ui/ProductCard"
import { Product } from "@/lib/types"
import Breadcrumb from "@/components/ui/Breadcrumb"

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

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

  let searchSlug = params.slug;
  if (searchSlug === "baby-shower") {
    searchSlug = "babyshower";
  }

  try {
    const dbProducts = await getProducts({ categorySlug: searchSlug, onlyActive: true })
    filtered = dbProducts.map((p) => ({
      id: String(p.id),
      slug: p.slug,
      isim: p.name,
      koleksiyon: p.category_name,
      koleksiyonSlug: p.category_slug,
      anaGorsel: p.cover_image || "",
      ekGorseller: p.images || [],
      fiyatAraligi: p.price_range || "",
      kisaAciklama: p.description || "",
      detayAciklama: p.description || "",
      minimumAdet: p.min_order || 100,
      aktif: p.is_active === 1,
    }))

    if (filtered.length === 0) {
      const normalize = (s: string) => s.toLowerCase().replace(/-/g, "")
      filtered = fallbackProducts.filter(p => normalize(p.koleksiyonSlug) === normalize(params.slug))
    }
  } catch (error) {
    console.error("Error fetching products from SQLite:", error)
    const normalize = (s: string) => s.toLowerCase().replace(/-/g, "")
    filtered = fallbackProducts.filter(p => normalize(p.koleksiyonSlug) === normalize(params.slug))
  }


  const waText = encodeURIComponent(`Merhaba! ${isim} koleksiyonu için özel sipariş vermek istiyorum.`)
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "90XXXXXXXXXXX"
  const waNumber = rawNumber.replace(/\D/g, "")
  const waHref = `https://wa.me/${waNumber}?text=${waText}`

  return (
    <main className="bg-[#fbf7f0] min-h-screen">
      {/* Upper Banner */}
      <section className="bg-[#dcdcd9] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-4">
            <Breadcrumb
              items={[
                { label: "Ana Sayfa", href: "/" },
                { label: isim },
              ]}
            />
          </div>

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
