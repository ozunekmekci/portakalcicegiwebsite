"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Product } from "@/lib/types"

type Props = {
  product: Product
  index: number
}

const slugToIsim: Record<string, string> = {
  "babyshower": "Babyshower",
  "dogum-gunu": "Doğum Günü",
  "dis-bugdayi": "Diş Buğdayı",
  "dugun-nisan": "Düğün & Nişan",
}

const getEmoji = (slug: string) => {
  switch (slug) {
    case "babyshower":
      return "🍼"
    case "dogum-gunu":
      return "🎂"
    case "dis-bugdayi":
      return "🌾"
    case "dugun-nisan":
      return "💍"
    default:
      return "🎁"
  }
}

export default function ProductCard({ product, index }: Props) {
  const categoryName = slugToIsim[product.koleksiyonSlug] ?? product.koleksiyonSlug
  const emoji = getEmoji(product.koleksiyonSlug)

  return (
    <Link href={`/urunler/${product.slug}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
        whileHover={{ y: -6 }}
        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#eaeaea] transition-all duration-300 flex flex-col h-full group"
      >
        {/* Visual Area */}
        <div className="relative aspect-[3/4] w-full bg-[#fbf7f0] flex items-center justify-center overflow-hidden border-b border-[#f0f0f0]">
          {product.anaGorsel ? (
            <Image
              src={product.anaGorsel}
              alt={product.isim}
              fill
              sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="text-6xl select-none flex items-center justify-center h-full">
              {emoji}
            </span>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-medium px-4 py-2 border border-white rounded-full bg-black/10 backdrop-blur-xs text-sm">
              İncele →
            </span>
          </div>
        </div>

        {/* Info Area */}
        <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
          <div className="space-y-1">
            <span className="inline-block text-xs font-bold tracking-wide uppercase text-[#ff914b]">
              {categoryName}
            </span>
            <h3 className="font-serif text-lg font-bold text-[#1a1a1a] line-clamp-1">
              {product.isim}
            </h3>
            <p className="text-sm font-medium text-[#fa3500]">
              {product.fiyatAraligi}
            </p>
          </div>

          <div className="pt-1">
            <span className="inline-block text-xs bg-[#fbf7f0] text-brand-text-mid rounded-full px-2.5 py-1 font-medium">
              min. {product.minimumAdet || 100} adet
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
