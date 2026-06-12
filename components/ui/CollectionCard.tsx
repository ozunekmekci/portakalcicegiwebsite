"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { getOptimizedUrl } from "@/lib/cloudinary";

type Props = {
  isim: string;
  aciklama: string;
  kategori: string;
  gorselUrl?: string;
  imageType?: string | null;
  imageUrl?: string | null;
  emoji?: string | null;
  index: number;
};

const getEmoji = (category: string) => {
  const normalized = category.toLowerCase().trim();
  if (normalized.includes("babyshower") || normalized.includes("baby shower")) return "🍼";
  if (normalized.includes("doğum günü") || normalized.includes("dogum gunu")) return "🎂";
  if (normalized.includes("diş buğdayı") || normalized.includes("dis bugdaily")) return "🌾";
  if (normalized.includes("düğün") || normalized.includes("nişan") || normalized.includes("dugun") || normalized.includes("nisan")) return "💍";
  return "🎁";
};

export default function CollectionCard({ isim, kategori, imageType, imageUrl, emoji: dbEmoji, index }: Props) {
  const showImage = imageType === "image" && !!imageUrl;
  const displayEmoji = dbEmoji || getEmoji(kategori);

  return (
    <Link href={`/koleksiyonlar/${slugify(kategori)}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
        whileHover={{ y: -6 }}
        className="w-[212px] flex-shrink-0 flex flex-col items-center text-center"
      >
        {/* Arch Visual Area */}
        <div className="relative w-full h-[263px] bg-white rounded-t-full overflow-hidden border border-[#eaeaea] shadow-xs flex items-center justify-center transition-all duration-300 group-hover:shadow-md group-hover:border-[#ff914b]/30">
          {showImage ? (
            <Image
              src={getOptimizedUrl(imageUrl!, { width: 300, height: 400, crop: "fill" })}
              alt={isim}
              fill
              sizes="212px"
              className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-full"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-b from-[#ff914b]/5 to-transparent rounded-t-full pt-6">
              <span className="text-6xl select-none transition-transform duration-300 group-hover:scale-110">{displayEmoji}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-3">
          <h3 className="font-serif text-sm font-bold text-brand-text-dark group-hover:text-brand-orange transition-colors">
            {isim}
          </h3>
          <span className="text-[10px] text-brand-orange font-bold uppercase tracking-wider font-sans mt-0.5 block">
            Koleksiyonu Keşfet
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
