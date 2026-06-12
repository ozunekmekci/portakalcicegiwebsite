"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MessageCircle } from "lucide-react";
import { ProductWithCategory } from "@/lib/db-queries-types";
import { getOptimizedUrl } from "@/lib/cloudinary";

interface BestsellersSliderProps {
  products: ProductWithCategory[];
}

const mockBestsellers = [
  {
    id: 1,
    name: "Akrilik Bulut Baby Shower Magnet",
    slug: "akrilik-bulut-baby-shower-magnet",
    category_name: "Babyshower",
    cover_image: "/images/gallery-1.webp",
    price_range: "₺45 - ₺65",
    min_order: 100,
  },
  {
    id: 2,
    name: "Kurutulmuş Çiçekli Nişan Davetiyesi",
    slug: "kurutulmus-cicekli-nisan-davetiyesi",
    category_name: "Düğün & Nişan",
    cover_image: "/images/gallery-2.webp",
    price_range: "₺75 - ₺95",
    min_order: 100,
  },
  {
    id: 3,
    name: "Kelebek Figürlü Doğum Günü Pleksisi",
    slug: "kelebek-figurlu-dogum-gunu-pleksisi",
    category_name: "Doğum Günü",
    cover_image: "/images/gallery-3.webp",
    price_range: "₺50 - ₺70",
    min_order: 100,
  },
  {
    id: 4,
    name: "Deniz Yıldızı Pleksi Düğün Magneti",
    slug: "deniz-yildizi-pleksi-dugun-magneti",
    category_name: "Düğün & Nişan",
    cover_image: "/images/gallery-4.webp",
    price_range: "₺40 - ₺60",
    min_order: 100,
  },
  {
    id: 5,
    name: "Bulut Figürlü Bebek Anısı Aynalı Pleksi",
    slug: "bulut-figurlu-bebek-anisi-aynali-pleksi",
    category_name: "Babyshower",
    cover_image: "/images/gallery-5.webp",
    price_range: "₺48 - ₺68",
    min_order: 100,
  },
  {
    id: 6,
    name: "Zarif Çiçek Desenli Aynalı Söz Hatırası",
    slug: "zarif-cicek-desenli-aynali-soz-hatirasi",
    category_name: "Düğün & Nişan",
    cover_image: "/images/gallery-6.webp",
    price_range: "₺65 - ₺85",
    min_order: 100,
  }
];

function getOldPrice(priceRange: string) {
  if (!priceRange) return "₺75";
  const numbers = priceRange.match(/\d+/g);
  if (numbers && numbers.length > 0) {
    if (numbers.length === 2) {
      const min = parseInt(numbers[0]);
      const max = parseInt(numbers[1]);
      const oldMin = Math.round(min * 1.35);
      const oldMax = Math.round(max * 1.35);
      return `₺${oldMin} - ₺${oldMax}`;
    } else {
      const val = parseInt(numbers[0]);
      const oldVal = Math.round(val * 1.35);
      return `₺${oldVal}`;
    }
  }
  return "₺85";
}

export default function BestsellersSlider({ products = [] }: BestsellersSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Use mock products if DB has no products
  const displayProducts = products.length > 0 ? products : mockBestsellers;

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section aria-label="En Çok Satanlar" className="w-full bg-[#fbf7f0] py-4 overflow-hidden">
      {/* Hide Scrollbars CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* High Contrast Showcase container bg-[#f3ece3] */}
      <div className="bg-[#f3ece3] py-8 px-4 md:px-12 rounded-2xl mx-4 md:mx-12 my-6 shadow-sm max-w-[1400px] lg:mx-auto relative">
        
        {/* Header Ribbon Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-xs px-4 py-1.5 rounded-full shadow-xs border border-white/40">
            <span className="text-xs md:text-sm font-serif font-bold text-neutral-800">
              ✨ Haftanın Yıldız Seçimleri & En Çok Satanlar ✨
            </span>
          </div>
        </div>

        {/* Outer Slider Box with Absolute Caret Button */}
        <div className="relative w-full">
          
          {/* Scroll List container */}
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 w-full"
          >
            {displayProducts.map((product: any, idx: number) => {
              const coverImage = product.cover_image || "/images/gallery-5.webp";
              const imageUrl = coverImage.includes("res.cloudinary.com")
                ? getOptimizedUrl(coverImage, { width: 300, height: 400, crop: "fill" })
                : coverImage;

              const oldPrice = getOldPrice(product.price_range);
              const newPrice = product.price_range || "Fiyat Sorun";
              
              // Alternate badges for marketing variation
              const badgeText = idx % 2 === 0 ? "🔥 En Popüler Butik Tercih" : "📦 Güvenli Kargo Bedava";

              return (
                <div
                  key={product.id}
                  className="w-[260px] md:w-[280px] flex-shrink-0 flex flex-col bg-white rounded-xl p-3 shadow-sm border border-[#eaeaea] snap-start transition-all duration-300 hover:shadow-[0_15px_30px_rgba(255,145,75,0.2)] hover:border-[#ff914b]/20 group relative"
                >
                  <Link href={`/urunler/${product.slug}`} className="block">
                    {/* Portrait Image container */}
                    <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#fbf7f0] border border-[#f0f0f0] mb-3">
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-w-768px) 260px, 280px"
                        className="object-cover transition-transform duration-500 group-hover:scale-103"
                      />

                      {/* "ADD" button appearing smoothly on hover */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 z-10">
                        <div className="bg-[#ff914b] text-white rounded-full py-2 px-4 text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 hover:bg-[#fa3500] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          <MessageCircle size={14} className="fill-white text-[#ff914b]" />
                          <span>💬 Tasarımı Başlat</span>
                        </div>
                      </div>
                    </div>

                    {/* Product Title */}
                    <h3 className="font-serif text-sm font-bold text-brand-text-dark line-clamp-1 group-hover:text-brand-orange transition-colors">
                      {product.name}
                    </h3>

                    {/* Marketing Badges */}
                    <div className="mt-1">
                      <span className="inline-block text-[9px] font-semibold text-brand-orange-dark bg-brand-orange/10 px-2 py-0.5 rounded">
                        {badgeText}
                      </span>
                    </div>

                    {/* Price Area: struck-through old price + bold new price */}
                    <div className="flex items-baseline mt-2 font-sans">
                      <span className="text-[11px] text-neutral-400 line-through mr-2 font-normal">
                        {oldPrice}
                      </span>
                      <span className="text-sm font-bold text-brand-orange-dark">
                        {newPrice}
                      </span>
                    </div>

                    {/* Min Order Badge */}
                    <div className="mt-1.5">
                      <span className="text-[10px] text-neutral-500 font-sans">
                        Min. Sipariş: {product.min_order || 100} adet
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Absolute Navigation Button (Sağa Git ➔) */}
          <button
            onClick={handleScrollRight}
            aria-label="Sağa kaydır"
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white text-neutral-800 w-11 h-11 rounded-full flex items-center justify-center shadow-md border border-neutral-200 hover:bg-[#ff914b] hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>

        </div>

      </div>
    </section>
  );
}
