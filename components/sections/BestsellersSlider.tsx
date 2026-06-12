"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Tag, Star } from "lucide-react";
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

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -344, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 344, behavior: "smooth" });
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
        
        {/* Header Ribbon Section - Playfair Display title with arrows on the right */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div className="text-left space-y-1">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-800">
              ✨ Haftanın Yıldız Seçimleri & En Çok Satanlar ✨
            </h2>
            <p className="font-sans text-xs md:text-sm text-neutral-600">
              Sizin için özenle seçilen en popüler Akdeniz esintili el yapımı tasarımlarımız.
            </p>
          </div>
          
          {/* Navigation Sol (<) and Sağ (>) Ok Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
            <button
              onClick={handleScrollLeft}
              aria-label="Sola kaydır"
              className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-800 bg-white/80 hover:bg-[#ff914b] hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer shadow-xs active:scale-95"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button
              onClick={handleScrollRight}
              aria-label="Sağa kaydır"
              className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-800 bg-white/80 hover:bg-[#ff914b] hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer shadow-xs active:scale-95"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
          
          {/* Scroll List container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 w-full"
          >
            {displayProducts.map((product: any, idx: number) => {
              const coverImage = product.cover_image || "/images/gallery-5.webp";
              const imageUrl = coverImage.includes("res.cloudinary.com")
                ? getOptimizedUrl(coverImage, { width: 350, height: 480, crop: "fill" })
                : coverImage;

              const oldPrice = getOldPrice(product.price_range);
              const newPrice = product.price_range || "Fiyat Sorun";

              return (
                <div
                  key={product.id}
                  className="w-[320px] h-[440px] flex-shrink-0 relative group rounded-[32px] overflow-hidden snap-start transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_rgba(255,145,75,0.25)] border-[3px] border-white/90 hover:border-[#ff914b] cursor-pointer bg-neutral-900"
                >
                  <Link href={`/urunler/${product.slug}`} className="block w-full h-full">
                    {/* Full-bleed Portrait Image */}
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      sizes="320px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Dark gradient overlay covering the bottom portion for readability */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pt-32 pb-6 px-6 flex flex-col justify-end z-10">
                      
                      {/* Product Title (sans-serif, white, bold, text-[19px], tracking-wide) */}
                      <h3 className="font-sans text-[19px] font-bold text-white leading-tight mb-3 transition-colors line-clamp-2 drop-shadow-md">
                        {product.name}
                      </h3>

                      {/* Info Row (Price & Rating) */}
                      <div className="flex items-center gap-4 text-white/90 text-sm font-sans font-medium">
                        {/* Price with tag icon */}
                        <div className="flex items-center gap-1.5 drop-shadow-sm">
                          <Tag size={14} className="text-[#ff914b]" />
                          <span>{newPrice}</span>
                        </div>

                        {/* Rating with star icon */}
                        <div className="flex items-center gap-1.5 drop-shadow-sm ml-auto">
                          <Star size={14} fill="#eab308" className="text-[#eab308]" />
                          <span>4.9/5</span>
                        </div>
                      </div>

                    </div>

                    {/* Top-Right Diagonal Arrow Badge ↗ */}
                    <div className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#ff914b] group-hover:border-transparent shadow-xs">
                      <span className="text-lg font-sans font-medium transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        ↗
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
