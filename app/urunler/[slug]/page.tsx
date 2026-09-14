import { Metadata } from "next";
import { getProductBySlug, getProducts, incrementProductViewCount } from "@/lib/db-queries";
import { fallbackProducts } from "@/content/products";
import ProductCard from "@/components/ui/ProductCard";
import ProductDetailContent from "@/components/sections/ProductDetailContent";
import JsonLd from "@/components/seo/JsonLd";
import { notFound } from "next/navigation";
import { Product } from "@/lib/types";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type Props = {
  params: {
    slug: string;
  };
};

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
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const normalize = (s: string) => s.toLowerCase().replace(/-/g, "");
  let product: Product | null = null;
  const baseUrl = "https://portakalcicegiwebsite.vercel.app";

  try {
    const dbProd = await getProductBySlug(params.slug);
    if (dbProd) {
      product = mapProduct(dbProd);
    }
  } catch {
    // ignore
  }

  if (!product) {
    product = fallbackProducts.find((p) => normalize(p.slug) === normalize(params.slug)) ?? null;
  }

  if (!product) return { title: "Ürün Bulunamadı | Portakal Çiçeği Atölye" };

  const desc = product.kisaAciklama || `${product.isim} — Doğum, baby shower, düğün ve nişan kutlamaları için özel tasarım 3D akrilik hatıralık. 100+ adet siparişlerde özel fiyat.`;

  return {
    title: `${product.isim} | Portakal Çiçeği Atölye`,
    description: desc,
    alternates: {
      canonical: `${baseUrl}/urunler/${product.slug}`,
    },
    openGraph: {
      title: `${product.isim} | Portakal Çiçeği Atölye`,
      description: desc,
      url: `${baseUrl}/urunler/${product.slug}`,
      type: "website",
      images: product.anaGorsel ? [{ url: product.anaGorsel, alt: product.isim }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.isim} | Portakal Çiçeği Atölye`,
      description: desc,
      images: product.anaGorsel ? [product.anaGorsel] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return fallbackProducts.map((p) => ({ slug: p.slug }));
  }
}

export default async function UrunDetayPage({ params }: Props) {
  const normalize = (s: string) => s.toLowerCase().replace(/-/g, "");
  let product: Product | null = null;
  let ilgiliUrunler: Product[] = [];

  try {
    const dbProd = await getProductBySlug(params.slug);
    if (dbProd) {
      product = mapProduct(dbProd);
      incrementProductViewCount(params.slug).catch((err) => {
        console.error("View count increment error:", err);
      });
    }
    const dbProducts = await getProducts();
    ilgiliUrunler = dbProducts.map(mapProduct);
  } catch {
    // ignore
  }

  if (!product) {
    product = fallbackProducts.find((p) => normalize(p.slug) === normalize(params.slug)) ?? null;
    if (ilgiliUrunler.length === 0) {
      ilgiliUrunler = fallbackProducts;
    }
  }

  if (!product) {
    notFound();
  }

  const otherProducts = ilgiliUrunler
    .filter((p) => normalize(p.koleksiyonSlug) === normalize(product!.koleksiyonSlug) && p.id !== product!.id)
    .slice(0, 4);

  return (
    <div className="bg-[#FDFBF7] min-h-screen flex flex-col justify-between">
      <JsonLd
        type="product"
        productData={{
          name: product.isim,
          description: product.kisaAciklama || product.detayAciklama,
          image: product.anaGorsel || "/images/gallery-5.webp",
          price: product.fiyatAraligi || "50",
          slug: product.slug,
        }}
      />

      {/* Product Detail Main Content */}
      <ProductDetailContent product={product} ilgiliUrunler={ilgiliUrunler} />

      {/* Related Products Section (Warm Background) */}
      {otherProducts.length > 0 && (
        <section className="bg-[#F5EFEB] py-16 px-4 sm:px-6 lg:px-8 border-t border-[#EDE6DF]">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="space-y-2 text-left">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1C1A] tracking-tight">
                Bu Koleksiyondan İlginizi Çekebilecek Diğer Tasarımlar
              </h2>
              <p className="font-sans text-sm text-[#696159]">
                Aynı zevk ve zarafetle hazırlanan tamamlayıcı hatıra modelleri.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
