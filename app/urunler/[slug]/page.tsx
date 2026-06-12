import { getProductBySlug, getProducts, incrementProductViewCount } from "@/lib/db-queries"
import { fallbackProducts } from "@/content/products"
import ProductCard from "@/components/ui/ProductCard"
import ProductDetailContent from "@/components/sections/ProductDetailContent"
import { notFound } from "next/navigation"
import { Product } from "@/lib/types"

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type Props = {
  params: {
    slug: string
  }
}

function mapProduct(p: any): Product {
  return {
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
    paketIcerigi: p.package_content || "",
    ozellikler: p.features || "",
  }
}

export async function generateMetadata({ params }: Props) {
  const normalize = (s: string) => s.toLowerCase().replace(/-/g, "")
  let product: Product | null = null

  try {
    const dbProd = await getProductBySlug(params.slug)
    if (dbProd) {
      product = mapProduct(dbProd)
    }
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
    const dbProd = await getProductBySlug(params.slug)
    if (dbProd) {
      product = mapProduct(dbProd)
      // Sayfa her yüklendiğinde görüntüleme sayısını artır
      incrementProductViewCount(params.slug).catch(err => {
        console.error("View count increment error:", err);
      });
    }
    const dbProducts = await getProducts()
    ilgiliUrunler = dbProducts.map(mapProduct)
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

  // Aynı koleksiyondaki diğer aktif ürünler (maksimum 4 adet, mevcut ürün hariç)
  const otherProducts = ilgiliUrunler
    .filter(p => normalize(p.koleksiyonSlug) === normalize(product!.koleksiyonSlug) && p.id !== product!.id)
    .slice(0, 4)

  return (
    <main className="bg-[#fbf7f0] min-h-screen flex flex-col justify-between">
      {/* Cozy Split-Screen Product Panel */}
      <ProductDetailContent product={product} ilgiliUrunler={ilgiliUrunler} />

      {/* Related Products Slider Section */}
      {otherProducts.length > 0 && (
        <section className="bg-[#dcdcd9] py-16 px-6 border-t border-neutral-300/40">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-text-dark mb-8 text-center lg:text-left">
              Bu Koleksiyonun Diğer Ürünleri
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
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
