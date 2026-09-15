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
    // Filter specifically for the 3 core categories if available
    const coreSlugs = ["magnet", "cake-topper", "kapi-susu"];
    const matched = categories.filter(c => coreSlugs.includes(c.slug));
    if (matched.length === 3) {
      collections = matched.map(cat => ({
        id: String(cat.id),
        isim: cat.name,
        aciklama: cat.description || "",
        kategori: cat.slug,
        gorselUrl: cat.banner_image || "",
        imageType: cat.image_type || "image",
        imageUrl: cat.image_url || "",
        aktif: true,
      }));
    } else {
      collections = fallbackCollections.slice(0, 3).map(col => ({
        ...col,
        kategori: col.kategori,
      }));
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    collections = fallbackCollections.slice(0, 3);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {collections.map((col, i) => (
        <CollectionCard key={col.id} {...col} index={i} />
      ))}
    </div>
  );
}

export function CollectionsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col animate-pulse space-y-4">
          <div className="w-full aspect-[4/5] bg-[#F5EFEB] rounded-none" />
          <div className="w-3/4 h-5 bg-[#F5EFEB] rounded-none" />
          <div className="w-1/2 h-4 bg-[#F5EFEB] rounded-none" />
        </div>
      ))}
    </div>
  );
}

export default function Collections() {
  return (
    <section id="koleksiyonlar" aria-label="Koleksiyonlar" className="bg-[#FDFBF7] py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#EDE6DF]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Editorial Header */}
        <div className="max-w-2xl text-left space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] font-bold tracking-tight">
            3 Temel Atölye Koleksiyonumuz
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#696159] leading-relaxed">
            Kutlamanızın her anına dokunan el emeği tasarımlar: Konuklarınıza hatıra magnetler, pastanız için göz alıcı cake topper süsleri ve odanızı taçlandıran kapı panoları.
          </p>
        </div>

        {/* 3-Pillar Balanced Grid */}
        <Suspense fallback={<CollectionsGridSkeleton />}>
          <CollectionsGrid />
        </Suspense>

        {/* View All Collections Link */}
        <div className="pt-2 text-left">
          <Link
            href="/koleksiyonlar/magnet"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-sans font-semibold text-[#C86D51] hover:text-[#A85338] transition-colors group"
          >
            <span>Tüm koleksiyonları ve modelleri keşfedin</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
