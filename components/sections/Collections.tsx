import { getCollections } from "@/lib/notion";
import { fallbackCollections } from "@/content/collections";
import CollectionCard from "@/components/ui/CollectionCard";

export default async function Collections() {
  let collections = [];
  try {
    collections = await getCollections();
    if (!collections || collections.length === 0) {
      collections = fallbackCollections;
    }
  } catch (error) {
    collections = fallbackCollections;
  }

  return (
    <section id="koleksiyonlar" aria-label="Koleksiyonlar" className="bg-brand-bg-gray py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className="text-xs md:text-sm font-sans tracking-widest text-brand-orange font-bold uppercase">
            KOLEKSİYONLAR
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-text-dark leading-tight font-bold whitespace-pre-line">
            Özel günleriniz için<br />
            tasarladık.
          </h2>
          <p className="font-sans text-base text-brand-text-mid">
            Her koleksiyon, Notion&apos;dan anlık güncellenir.
          </p>
        </div>

        {/* Grid layout for Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((col, i) => (
            <CollectionCard key={col.id} {...col} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
