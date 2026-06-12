import { getCategories } from "@/lib/db-queries";
import { fallbackCollections } from "@/content/collections";
import CollectionCard from "@/components/ui/CollectionCard";
import { Suspense } from "react";
import Link from "next/link";

// 1. Grid renderer that fetches data asynchronously and pads up to 6 items
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
      imageType: cat.image_type || "emoji",
      imageUrl: cat.image_url || "",
      emoji: cat.emoji || "",
      aktif: true,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  // Pad to exactly 6 items using fallback collections
  if (collections.length < 6) {
    const existingNames = new Set(collections.map(c => c.isim.toLowerCase()));
    const padItems = fallbackCollections.filter(f => !existingNames.has(f.isim.toLowerCase()));
    collections = [...collections, ...padItems].slice(0, 6);
  }

  return (
    <div className="flex flex-row md:grid md:grid-cols-6 gap-6 overflow-x-auto md:overflow-visible flex-nowrap md:flex-wrap pb-4 md:pb-0 justify-start md:justify-center w-full scrollbar-hide">
      {collections.map((col, i) => (
        <CollectionCard key={col.id} {...col} index={i} />
      ))}
    </div>
  );
}

// 2. Pulse loading skeleton matching the 6-column layout
export function CollectionsGridSkeleton() {
  return (
    <div className="flex flex-row md:grid md:grid-cols-6 gap-6 overflow-x-auto md:overflow-visible flex-nowrap md:flex-wrap pb-4 md:pb-0 justify-start md:justify-center w-full scrollbar-hide">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="w-[212px] flex-shrink-0 flex flex-col items-center animate-pulse">
          <div className="w-full h-[263px] bg-white border border-[#eaeaea] rounded-t-full" />
          <div className="mt-3 w-3/4 h-4 bg-brand-bg-cream/80 rounded" />
          <div className="mt-1.5 w-1/2 h-3 bg-brand-bg-cream/80 rounded" />
        </div>
      ))}
    </div>
  );
}

// 3. Main wrapper
export default function Collections() {
  return (
    <section id="koleksiyonlar" aria-label="Koleksiyonlar" className="bg-[#fbf7f0] py-16 px-4 md:px-8 overflow-hidden border-b border-[#eaeaea]">
      <div className="max-w-[1400px] mx-auto space-y-12">
        {/* Header Block */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs md:text-sm font-sans tracking-widest text-[#fa3500] font-bold uppercase">
            KOLEKSİYONLAR
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-text-dark leading-tight font-bold">
            Özel Günleriniz İçin Akdeniz Dokunuşları
          </h2>
          <p className="font-sans text-xs md:text-sm text-brand-text-mid">
            Her biri atölyemizde özenle tasarlanan, kişiselleştirilebilir premium koleksiyonlar.
          </p>
        </div>

        {/* Suspense wrapper with 6-item skeleton fallback */}
        <Suspense fallback={<CollectionsGridSkeleton />}>
          <CollectionsGrid />
        </Suspense>

        <div className="text-center pt-4">
          <Link
            href="/koleksiyonlar/babyshower"
            className="inline-block text-[#ff914b] hover:text-[#fa3500] font-semibold font-sans text-sm transition-all duration-300 hover:underline"
          >
            Tüm koleksiyonları keşfet →
          </Link>
        </div>
      </div>
    </section>
  );
}
