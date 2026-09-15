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

const fallbackCategoryImages = [
  "/images/gallery-2.webp",
  "/images/gallery-5.webp",
  "/images/gallery-3.webp",
];

export default function CollectionCard({ isim, aciklama, kategori, imageType, imageUrl, index }: Props) {
  const defaultImage = fallbackCategoryImages[index % fallbackCategoryImages.length];
  const finalImage = (imageType === "image" && imageUrl) ? imageUrl : defaultImage;
  const optimizedUrl = finalImage.includes("res.cloudinary.com")
    ? getOptimizedUrl(finalImage, { width: 400, height: 500, crop: "fill" })
    : finalImage;

  return (
    <Link href={`/koleksiyonlar/${slugify(kategori)}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col text-left h-full"
      >
        {/* Straight-Edge Architectural Frame */}
        <div className="relative w-full aspect-[4/5] bg-white rounded-none overflow-hidden border border-[#EDE6DF] transition-all duration-300 group-hover:border-[#C86D51] p-2">
          <div className="relative w-full h-full rounded-none overflow-hidden bg-[#F5EFEB]">
            <Image
              src={optimizedUrl}
              alt={isim}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </div>

        {/* Editorial Info */}
        <div className="pt-4 pb-2 flex flex-col justify-between flex-grow space-y-1.5">
          <h3 className="font-serif text-lg font-bold text-[#1E1C1A] group-hover:text-[#C86D51] transition-colors leading-snug">
            {isim}
          </h3>
          
          {aciklama && (
            <p className="font-sans text-xs text-[#696159] line-clamp-2 leading-relaxed font-normal">
              {aciklama}
            </p>
          )}

          <div className="pt-1.5 flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-[#C86D51] group-hover:translate-x-1 transition-transform">
            <span>Koleksiyonu İncele</span>
            <ArrowRight size={13} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
