"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { slugify } from "@/lib/utils";
import { getOptimizedUrl } from "@/lib/cloudinary";

type Props = {
  isim: string;
  aciklama?: string;
  kategori: string;
  gorselUrl?: string;
  imageType?: string | null;
  imageUrl?: string | null;
  index: number;
};

// Default high quality atelier images for categories if not explicitly set
const fallbackCategoryImages = [
  "/images/gallery-1.webp",
  "/images/gallery-2.webp",
  "/images/gallery-3.webp",
  "/images/gallery-4.webp",
  "/images/gallery-5.webp",
  "/images/gallery-6.webp",
];

export default function CollectionCard({ isim, aciklama, kategori, imageType, imageUrl, index }: Props) {
  const defaultImage = fallbackCategoryImages[index % fallbackCategoryImages.length];
  const finalImage = (imageType === "image" && imageUrl) ? imageUrl : defaultImage;
  const optimizedUrl = finalImage.includes("res.cloudinary.com")
    ? getOptimizedUrl(finalImage, { width: 340, height: 420, crop: "fill" })
    : finalImage;

  return (
    <Link href={`/koleksiyonlar/${slugify(kategori)}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col text-left h-full"
      >
        {/* Mediterranean Arch Visual Container */}
        <div className="relative w-full aspect-[4/5] bg-[#F5EFEB] rounded-t-[72px] rounded-b-2xl overflow-hidden border border-[#EDE6DF] shadow-soft-sm transition-all duration-500 group-hover:shadow-soft-md group-hover:border-[#D95A2B]/40">
          <Image
            src={optimizedUrl}
            alt={isim}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />

          {/* Delicate bottom gradient for smooth transition */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </div>

        {/* Editorial Info */}
        <div className="pt-4 pb-2 flex flex-col justify-between flex-grow space-y-1.5">
          <h3 className="font-serif text-lg font-bold text-[#1E1C1A] group-hover:text-[#D95A2B] transition-colors leading-snug">
            {isim}
          </h3>
          
          {aciklama && (
            <p className="font-sans text-xs text-[#696159] line-clamp-2 leading-relaxed font-normal">
              {aciklama}
            </p>
          )}

          <div className="pt-1.5 flex items-center gap-1.5 text-xs font-sans font-medium text-[#D95A2B] group-hover:translate-x-1 transition-transform">
            <span>Koleksiyonu İncele</span>
            <ArrowRight size={13} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
