import { Metadata } from "next";
import Link from "next/link";
import { getProducts, getCategoryBySlug } from "@/lib/db-queries";
import { fallbackProducts } from "@/content/products";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/lib/types";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { MessageCircle } from "lucide-react";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type Props = {
  params: {
    slug: string;
  };
};

const slugToIsim: Record<string, string> = {
  magnet: "Magnet & Hediyelik",
  "cake-topper": "Cake Topper (Pasta Süsleri)",
  "kapi-susu": "Kapı Süsü & Pano",
  // Geriye dönük uyumluluk eşlemeleri
  "pasta-susleri": "Cake Topper (Pasta Süsleri)",
  babyshower: "Magnet & Hediyelik",
  "baby-shower": "Magnet & Hediyelik",
  "kombin-setler": "Kutlama Kombin Setleri",
  "dugun-nisan": "Düğün & Nişan Hatıraları",
  "dogum-gunu": "İlk Yaş & Doğum Günü",
  "dis-bugdayi": "Diş Buğdayı",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isim = slugToIsim[params.slug] ?? params.slug;
  const baseUrl = "https://portakalcicegiwebsite.vercel.app";

  return {
    title: `${isim} Koleksiyonu | Portakal Çiçeği Atölye`,
    description: `${isim} için el yapımı özel tasarım 3D akrilik ve pleksi hatıralıklar. 100+ adet toplu siparişlerde atölye indirimi.`,
    alternates: {
      canonical: `${baseUrl}/koleksiyonlar/${params.slug}`,
    },
    openGraph: {
      title: `${isim} Koleksiyonu | Portakal Çiçeği Atölye`,
      description: `${isim} kutlamalarına özel tasarım 3D pleksi hatıralar.`,
      url: `${baseUrl}/koleksiyonlar/${params.slug}`,
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return Object.keys(slugToIsim).map((slug) => ({ slug }));
}

export default async function KoleksiyonPage({ params }: Props) {
  let filtered: Product[] = [];
  let categoryObj = null;

  let searchSlug = params.slug;
  if (searchSlug === "baby-shower") {
    searchSlug = "babyshower";
  }

  try {
    categoryObj = await getCategoryBySlug(searchSlug);
    const dbProducts = await getProducts({ categorySlug: searchSlug, onlyActive: true });
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
    }));

    if (filtered.length === 0) {
      const target = params.slug.toLowerCase();
      if (target === "magnet" || target === "babyshower" || target === "baby-shower") {
        filtered = fallbackProducts.filter((p) => p.koleksiyonSlug === "magnet" || p.koleksiyonSlug === "babyshower" || p.koleksiyonSlug === "dugun-nisan");
      } else if (target === "cake-topper" || target === "pasta-susleri") {
        filtered = fallbackProducts.filter((p) => p.koleksiyonSlug === "cake-topper" || p.koleksiyonSlug === "pasta-susleri");
      } else if (target === "kapi-susu") {
        filtered = fallbackProducts.filter((p) => p.koleksiyonSlug === "kapi-susu");
      } else {
        const normalize = (s: string) => s.toLowerCase().replace(/-/g, "");
        filtered = fallbackProducts.filter((p) => normalize(p.koleksiyonSlug) === normalize(params.slug));
      }
    }
  } catch {
    const target = params.slug.toLowerCase();
    if (target === "magnet" || target === "babyshower" || target === "baby-shower") {
      filtered = fallbackProducts.filter((p) => p.koleksiyonSlug === "magnet" || p.koleksiyonSlug === "babyshower" || p.koleksiyonSlug === "dugun-nisan");
    } else if (target === "cake-topper" || target === "pasta-susleri") {
      filtered = fallbackProducts.filter((p) => p.koleksiyonSlug === "cake-topper" || p.koleksiyonSlug === "pasta-susleri");
    } else if (target === "kapi-susu") {
      filtered = fallbackProducts.filter((p) => p.koleksiyonSlug === "kapi-susu");
    } else {
      const normalize = (s: string) => s.toLowerCase().replace(/-/g, "");
      filtered = fallbackProducts.filter((p) => normalize(p.koleksiyonSlug) === normalize(params.slug));
    }
  }

  const isim = categoryObj?.name || slugToIsim[params.slug] || params.slug;
  const description = categoryObj?.description || `Özel günleriniz için atölyemizde özenle tasarlanan ${isim.toLowerCase()} modelleri.`;
  const bannerImage = categoryObj?.banner_image;

  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905555555555";
  const waNumber = rawNumber.replace(/\D/g, "");
  const waText = encodeURIComponent(`Merhaba! ${isim} koleksiyonu modelleriniz için özel fiyat ve sipariş bilgisi almak istiyorum.`);
  const waHref = `https://wa.me/${waNumber}?text=${waText}`;

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      <JsonLd
        type="collection"
        collectionData={{
          name: isim,
          description,
          slug: params.slug,
        }}
      />

      {/* Upper Banner */}
      <section 
        className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F5EFEB] border-b border-[#EDE6DF] overflow-hidden"
        style={bannerImage ? { backgroundImage: `url(${bannerImage})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
      >
        {bannerImage && (
          <div className="absolute inset-0 bg-[#FDFBF7]/90 backdrop-blur-[1px] z-0" />
        )}
        
        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <Breadcrumb
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Koleksiyonlar", href: "/#koleksiyonlar" },
              { label: isim },
            ]}
          />

          <div className="max-w-2xl space-y-2 text-left">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1C1A] tracking-tight">
              {isim} Koleksiyonu
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#696159] leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1E1C1A] bg-white px-3 py-1 rounded-none border border-[#EDE6DF] shadow-soft-sm">
              <span className="w-1.5 h-1.5 rounded-none bg-[#C86D51]" />
              <span>{filtered.length} Tasarım Modeli</span>
            </span>
            <span className="text-xs text-[#696159]">✦ Kişiye Özel Atölye Üretimi</span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section aria-label="Koleksiyon Ürünleri" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="sr-only">{isim} Koleksiyonu Modelleri</h2>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filtered.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 space-y-6">
            <p className="text-[#696159] text-base font-sans">
              Bu koleksiyon için yeni tasarımlar atölye masasında hazırlanıyor.
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#C86D51] hover:bg-[#A85338] text-[#FDFBF7] transition-all rounded-none px-8 py-3.5 text-sm font-semibold shadow-sm"
            >
              <MessageCircle size={16} />
              <span>Özel Tasarım Talebi İletin</span>
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
