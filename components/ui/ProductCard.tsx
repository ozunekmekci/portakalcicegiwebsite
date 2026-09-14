"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Product } from "@/lib/types";

type Props = {
  product: Product;
  index: number;
};

const slugToIsim: Record<string, string> = {
  "pasta-susleri": "Pasta Süsleri",
  babyshower: "Baby Shower & Doğum",
  "kombin-setler": "Kombin Setler",
  "dogum-gunu": "İlk Yaş & Doğum Günü",
  "dis-bugdayi": "Diş Buğdayı",
  "dugun-nisan": "Düğün & Nişan",
};

export default function ProductCard({ product, index }: Props) {
  const categoryName = slugToIsim[product.koleksiyonSlug] ?? (product.koleksiyon || "Özel Koleksiyon");
  const fallbackImage = "/images/gallery-5.webp";
  const displayImage = product.anaGorsel || fallbackImage;

  return (
    <Link href={`/urunler/${product.slug}`} className="block group h-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#FDFBF7] rounded-2xl overflow-hidden shadow-soft-sm hover:shadow-soft-md border border-[#EDE6DF] transition-all duration-300 flex flex-col h-full"
      >
        {/* Visual Area */}
        <div className="relative aspect-[3/4] w-full bg-[#F5EFEB] overflow-hidden">
          <Image
            src={displayImage}
            alt={`${product.isim} — Portakal Çiçeği Atölyesi el yapımı 3D akrilik hatıralık`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />

          {/* Top Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[10px] font-sans font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FDFBF7]/90 backdrop-blur-sm text-[#1E1C1A] border border-[#EDE6DF] shadow-soft-sm">
              {categoryName}
            </span>
          </div>

          {/* Corner Detail Arrow */}
          <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#FDFBF7]/90 backdrop-blur-sm border border-[#EDE6DF] flex items-center justify-center text-[#1E1C1A] group-hover:bg-[#D95A2B] group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-soft-sm">
            <ArrowUpRight size={15} />
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow space-y-3 text-left">
          <div className="space-y-1">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#1E1C1A] group-hover:text-[#D95A2B] transition-colors line-clamp-1">
              {product.isim}
            </h3>
            <p className="text-xs text-[#696159] line-clamp-1">
              {product.kisaAciklama || "3D Katmanlı Pleksi & Özel İsim İşçiliği"}
            </p>
          </div>

          <div className="pt-2 border-t border-[#EDE6DF] flex items-center justify-between">
            <span className="text-sm font-semibold text-[#1E1C1A] font-sans">
              {product.fiyatAraligi || "Fiyat Sorun"}
            </span>
            <span className="text-[11px] font-sans text-[#5A6855] bg-[#5A6855]/10 px-2 py-0.5 rounded-full font-medium">
              {product.minimumAdet === 1 ? "1 Adet Özel Üretim" : `Min. ${product.minimumAdet || 25} Adet`}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
