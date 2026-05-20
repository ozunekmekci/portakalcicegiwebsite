"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/lib/utils";

type Props = {
  isim: string;
  aciklama: string;
  kategori: string;
  gorselUrl: string;
  index: number;
};

const getEmoji = (category: string) => {
  const normalized = category.toLowerCase().trim();
  if (normalized.includes("babyshower") || normalized.includes("baby shower")) return "🍼";
  if (normalized.includes("doğum günü") || normalized.includes("dogum gunu")) return "🎂";
  if (normalized.includes("diş buğdayı") || normalized.includes("dis bugdayi")) return "🌾";
  if (normalized.includes("düğün") || normalized.includes("nişan") || normalized.includes("dugun") || normalized.includes("nisan")) return "💍";
  return "🎁";
};

export default function CollectionCard({ isim, aciklama, kategori, gorselUrl, index }: Props) {
  const emoji = getEmoji(kategori);
  const fallbackAciklama = aciklama || "Size özel tasarlanmış, el yapımı ve 3D akrilik detaylı hediyelik.";
  const waText = encodeURIComponent(`Merhaba! ${kategori} koleksiyonu hakkında bilgi almak istiyorum.`);
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "90XXXXXXXXXXX";
  const waNumber = rawNumber.replace(/\D/g, "");
  const waHref = `https://wa.me/${waNumber}?text=${waText}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ 
        y: -6, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)" 
      }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#eaeaea] transition-all duration-300 flex flex-col h-full"
    >
      {/* Visual Header */}
      <div className="relative aspect-[4/3] w-full bg-brand-bg-cream flex items-center justify-center overflow-hidden border-b border-[#f0f0f0]">
        {gorselUrl ? (
          <Image
            src={gorselUrl}
            alt={isim}
            fill
            sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <span className="text-7xl select-none">{emoji}</span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
        <div className="space-y-2">
          <span className="inline-block text-brand-orange text-xs font-bold tracking-wider uppercase font-sans">
            {kategori || "Koleksiyon"}
          </span>
          <h3 className="font-serif text-xl font-bold text-brand-text-dark leading-snug line-clamp-1">
            {isim}
          </h3>
          <p className="font-sans text-sm text-brand-text-mid leading-relaxed line-clamp-2">
            {fallbackAciklama}
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <Link
            href={`/koleksiyonlar/${slugify(kategori)}`}
            className="inline-flex items-center justify-center min-h-[44px] border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-all duration-300 rounded-full px-6 py-2 text-sm font-medium font-sans text-center"
          >
            İncele
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#555555] hover:text-brand-orange transition-colors font-sans text-center"
          >
            veya direkt sipariş için →
          </a>
        </div>
      </div>
    </motion.div>
  );
}
