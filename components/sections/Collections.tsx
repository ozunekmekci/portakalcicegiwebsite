import { getCategories } from "@/lib/db-queries";
import { fallbackCollections } from "@/content/collections";
import CollectionCard from "@/components/ui/CollectionCard";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function CollectionsGrid() {
  let collections: any[] = [];
  try {
    const categories = await getCategories();
    collections = categories.map((cat) => ({
      id: String(cat.id),
      isim: cat.name,
      aciklama: cat.description || "",
      kategori: cat.name,
      gorselUrl: cat.banner_image || "",
      imageType: cat.image_type || "image",
      imageUrl: cat.image_url || "",
      aktif: true,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  // Ensure 4 high quality categories
  if (collections.length < 4) {
    const existingNames = new Set(collections.map(c => c.isim.toLowerCase()));
    const padItems = fallbackCollections.filter(f => !existingNames.has(f.isim.toLowerCase()));
    collections = [...collections, ...padItems].slice(0, 4);
  } else {
    collections = collections.slice(0, 4);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {collections.map((col, i) => (
        <CollectionCard key={col.id} {...col} index={i} />
      ))}
    </div>
  );
}

export function CollectionsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col animate-pulse space-y-4">
          <div className="w-full aspect-[4/5] bg-[#F5EFEB] rounded-t-[72px] rounded-b-2xl" />
          <div className="w-3/4 h-5 bg-[#F5EFEB] rounded" />
          <div className="w-1/2 h-4 bg-[#F5EFEB] rounded" />
        </div>
      ))}
    </div>
  );
}

export default function Collections() {
  return (
    <section id="koleksiyonlar" aria-label="Koleksiyonlar" className="bg-[#FDFBF7] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#EDE6DF]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Editorial Header (No eyebrow label) */}
        <div className="max-w-2xl text-left space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] font-bold tracking-tight">
            Özel Günleriniz İçin Akdeniz Dokunuşları
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#696159] leading-relaxed">
            Her biri atölyemizde özenle tasarlanan, kişiselleştirilebilir hatıra koleksiyonlarımız.
          </p>
        </div>

        {/* 4-Item Balanced Grid */}
        <Suspense fallback={<CollectionsGridSkeleton />}>
          <CollectionsGrid />
        </Suspense>

        {/* View All Collections Link */}
        <div className="pt-2 text-left">
          <Link
            href="/koleksiyonlar/babyshower"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-[#D95A2B] hover:text-[#B8471D] transition-colors group"
          >
            <span>Tüm koleksiyonları ve ürün detaylarını inceleyin</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
