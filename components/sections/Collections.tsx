import { getCategories } from "@/lib/db-queries";
import { fallbackCollections } from "@/content/collections";
import CollectionCard from "@/components/ui/CollectionCard";
import { Suspense } from "react";
import Link from "next/link";

// 1. Grid renderer that fetches data asynchronously
async function CollectionsGrid() {
  let collections = [];
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
    if (collections.length === 0) {
      collections = fallbackCollections;
    }
  } catch (error) {
    collections = fallbackCollections;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {collections.map((col, i) => (
        <CollectionCard key={col.id} {...col} index={i} />
      ))}
    </div>
  );
}

// 2. Pulse loading skeleton for 4 items
export function CollectionsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse flex flex-col h-full border border-brand-bg-gray/10">
          <div className="aspect-[4/3] bg-brand-bg-cream/60 w-full" />
          <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="h-4 bg-brand-bg-cream/80 w-1/3 rounded" />
              <div className="h-6 bg-brand-bg-cream/80 w-3/4 rounded" />
              <div className="h-4 bg-brand-bg-cream/80 w-5/6 rounded" />
            </div>
            <div className="h-11 bg-brand-bg-cream/80 w-full rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

// 3. Main wrapper containing static Header and Suspense boundary
export default function Collections() {
  return (
    <section id="koleksiyonlar" aria-label="Koleksiyonlar" className="bg-brand-bg-gray py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className="text-xs md:text-sm font-sans tracking-widest text-brand-orange-dark font-bold uppercase">
            KOLEKSİYONLAR
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-text-dark leading-tight font-bold whitespace-pre-line">
            Özel günleriniz için<br />
            tasarladık.
          </h2>
          <p className="font-sans text-base text-brand-text-mid">
            Her koleksiyon, yönetim panelinden anlık güncellenir.
          </p>
        </div>

        {/* Suspense wrapper with loading skeleton fallback */}
        <Suspense fallback={<CollectionsGridSkeleton />}>
          <CollectionsGrid />
        </Suspense>

        <div className="text-center">
          <Link
            href="/koleksiyonlar/babyshower"
            className="inline-block text-[#ff914b] hover:underline font-semibold font-sans transition-all duration-300"
          >
            Tüm koleksiyonları keşfet →
          </Link>
        </div>
      </div>
    </section>
  );
}
