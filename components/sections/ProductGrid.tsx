"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ProductWithCategory } from "@/lib/db-queries-types";
import { getOptimizedUrl } from "@/lib/cloudinary";

interface ProductGridProps {
  products: ProductWithCategory[];
}

const mockProducts = [
  {
    id: 1,
    name: "Akrilik Bulut Baby Shower Magnet",
    slug: "akrilik-bulut-baby-shower-magnet",
    category_name: "Babyshower",
    cover_image: "/images/gallery-1.webp",
    price_range: "₺45 - ₺65",
    min_order: 100,
    rating: "4.9",
  },
  {
    id: 2,
    name: "Kurutulmuş Çiçekli Nişan Davetiyesi",
    slug: "kurutulmus-cicekli-nisan-davetiyesi",
    category_name: "Düğün & Nişan",
    cover_image: "/images/gallery-2.webp",
    price_range: "₺75 - ₺95",
    min_order: 100,
    rating: "4.9",
  },
  {
    id: 3,
    name: "Kelebek Figürlü Doğum Günü Pleksisi",
    slug: "kelebek-figurlu-dogum-gunu-pleksisi",
    category_name: "Doğum Günü",
    cover_image: "/images/gallery-3.webp",
    price_range: "₺50 - ₺70",
    min_order: 100,
    rating: "4.9",
  },
  {
    id: 4,
    name: "Deniz Yıldızı Pleksi Düğün Magneti",
    slug: "deniz-yildizi-pleksi-dugun-magneti",
    category_name: "Düğün & Nişan",
    cover_image: "/images/gallery-4.webp",
    price_range: "₺40 - ₺60",
    min_order: 100,
    rating: "4.9",
  }
];

export default function ProductGrid({ products = [] }: ProductGridProps) {
  // Use mock products if there are no products in the database
  const displayProducts = products.length > 0 ? products.slice(0, 4) : mockProducts;

  return (
    <section id="vitrin" aria-label="Ürün Vitrini" className="bg-white py-24 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto space-y-16">
        
        {/* Header Block */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs md:text-sm font-sans tracking-widest text-[#fa3500] font-bold uppercase">
            ÖNE ÇIKANLAR
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-text-dark leading-tight font-bold">
            En Çok Beğenilen Atölye Tasarımları
          </h2>
          <p className="font-sans text-xs md:text-sm text-brand-text-mid">
            En çok talep gören premium 3D akrilik ve aynalı pleksi tasarımlarımız.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center justify-items-center">
          {displayProducts.map((product: any, idx: number) => {
            const coverImage = product.cover_image || "/images/gallery-5.webp";
            const imageUrl = coverImage.includes("res.cloudinary.com")
              ? getOptimizedUrl(coverImage, { width: 350, height: 500, crop: "fill" })
              : coverImage;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="w-full max-w-[282px] flex flex-col group"
              >
                <Link href={`/urunler/${product.slug}`} className="block">
                  {/* Portrait Image Area w-[282px] h-[420px] */}
                  <div className="relative w-full h-[420px] bg-[#fbf7f0] rounded-2xl overflow-hidden border border-[#eaeaea] transition-all duration-300 group-hover:shadow-md group-hover:border-[#ff914b]/30">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      sizes="282px"
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                    />

                    {/* Minimalist ⭐ 4.9 rating badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-semibold text-[#1a1a1a] shadow-xs flex items-center gap-1 select-none pointer-events-none">
                      <span>⭐</span>
                      <span className="font-sans">4.9</span>
                    </div>
                  </div>

                  {/* Title and Price Row - flex justify-between items-start text-[14px] */}
                  <div className="flex justify-between items-start text-[14px] mt-4 font-sans px-1">
                    <h3 className="font-serif font-bold text-brand-text-dark line-clamp-1 max-w-[190px] group-hover:text-brand-orange transition-colors">
                      {product.name}
                    </h3>
                    <span className="font-semibold text-brand-orange-dark">
                      {product.price_range || "Fiyat Sorun"}
                    </span>
                  </div>

                  {/* Soft tone Min. Sipariş badge */}
                  <div className="mt-2 px-1">
                    <span className="inline-block text-[11px] bg-[#fbf7f0] text-brand-text-mid border border-brand-bg-gray/40 rounded-full px-2.5 py-0.5 font-medium font-sans">
                      Min. Sipariş: {product.min_order || 100} Adet
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
