"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { ProductWithCategory } from "@/lib/db-queries-types";
import { getOptimizedUrl } from "@/lib/cloudinary";

interface BestsellersSliderProps {
  products?: ProductWithCategory[];
}

const mockBestsellers = [
  {
    id: 1,
    name: "Aynalı Pleksi Özel İsimli Pasta Süsü",
    slug: "aynali-pleksi-ozel-isimli-pasta-susu",
    category_name: "Cake Topper",
    cover_image: "/images/gallery-5.webp",
    price_range: "₺180 - ₺240",
    min_order: 1,
  },
  {
    id: 2,
    name: "3D Katmanlı Akrilik Bulut Baby Shower Magneti",
    slug: "3d-katmanli-akrilik-bulut-baby-shower-magneti",
    category_name: "Magnet",
    cover_image: "/images/gallery-2.webp",
    price_range: "₺45 - ₺65 / adet",
    min_order: 25,
  },
  {
    id: 3,
    name: "Gold Aynalı Pleksi Bebek Odası Kapı Süsü",
    slug: "gold-aynali-pleksi-bebek-kapi-susu",
    category_name: "Kapı Süsü",
    cover_image: "/images/gallery-3.webp",
    price_range: "₺550 - ₺750",
    min_order: 1,
  },
  {
    id: 4,
    name: "İlk Yaş 'One' Akrilik Pasta Süsü",
    slug: "ilk-yas-one-akrilik-pasta-susu",
    category_name: "Cake Topper",
    cover_image: "/images/gallery-4.webp",
    price_range: "₺190 - ₺260",
    min_order: 1,
  },
  {
    id: 5,
    name: "Doğal Ahşap Kasnak & Kuru Çiçekli Kapı Süsü",
    slug: "ahsap-kasnak-kuru-cicekli-kapi-susu",
    category_name: "Kapı Süsü",
    cover_image: "/images/gallery-7.webp",
    price_range: "₺650 - ₺850",
    min_order: 1,
  },
  {
    id: 6,
    name: "Ay Dede & Yıldız Aynalı Pleksi Bebek Hatırası",
    slug: "ay-dede-yildiz-aynali-pleksi-bebek-hatirasi",
    category_name: "Magnet",
    cover_image: "/images/gallery-1.webp",
    price_range: "₺48 - ₺68 / adet",
    min_order: 25,
  }
];

export default function BestsellersSlider({ products = [] }: BestsellersSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayProducts = products.length > 0 ? products : mockBestsellers;

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section id="one-cikanlar" aria-label="Öne Çıkan Tasarımlar" className="w-full bg-[#F5EFEB] py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#EDE6DF]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Editorial Section Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="space-y-2 max-w-xl text-left">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1C1A] tracking-tight">
              Atölyeden Yeni Çıkanlar &amp; Çok Sevilenler
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#696159] leading-relaxed">
              Kişiye özel cake topper süsleri, hatıra magnetleri ve bebek odası kapı panoları.
            </p>
          </div>
          
          {/* Navigation Controls (Straight edge) */}
          <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
            <button
              onClick={handleScrollLeft}
              aria-label="Önceki ürünleri göster"
              className="w-10 h-10 rounded-none border border-[#EDE6DF] flex items-center justify-center text-[#1E1C1A] bg-white hover:bg-[#C86D51] hover:text-white hover:border-transparent transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleScrollRight}
              aria-label="Sonraki ürünleri göster"
              className="w-10 h-10 rounded-none border border-[#EDE6DF] flex items-center justify-center text-[#1E1C1A] bg-white hover:bg-[#C86D51] hover:text-white hover:border-transparent transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Showcase Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none w-full scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayProducts.map((product: any) => {
            const coverImage = product.cover_image || "/images/gallery-5.webp";
            const imageUrl = coverImage.includes("res.cloudinary.com")
              ? getOptimizedUrl(coverImage, { width: 380, height: 460, crop: "fill" })
              : coverImage;

            const categoryName = product.category_name || "Özel Koleksiyon";
            const price = product.price_range || "Fiyat Sorun";
            const minOrder = product.min_order ?? 1;

            return (
              <div
                key={product.id}
                className="w-[280px] sm:w-[320px] flex-shrink-0 relative group rounded-none overflow-hidden snap-start transition-all duration-200 bg-white border border-[#EDE6DF] hover:border-[#C86D51]"
              >
                <Link href={`/urunler/${product.slug}`} className="block h-full flex flex-col">
                  
                  {/* Image Container with Natural Light */}
                  <div className="relative w-full h-[320px] sm:h-[350px] overflow-hidden bg-[#F5EFEB]">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 280px, 320px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    
                    {/* Subtle Category Tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-none bg-[#FDFBF7]/95 backdrop-blur-sm text-[#1E1C1A] border border-[#EDE6DF]">
                        {categoryName}
                      </span>
                    </div>

                    {/* Corner Detail Arrow */}
                    <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-none bg-[#FDFBF7]/95 backdrop-blur-sm border border-[#EDE6DF] flex items-center justify-center text-[#1E1C1A] group-hover:bg-[#C86D51] group-hover:text-white group-hover:border-transparent transition-all duration-200">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  {/* Editorial Content Below Image */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow space-y-3 text-left">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#1E1C1A] group-hover:text-[#C86D51] transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between pt-2 border-t border-[#EDE6DF] text-xs font-sans text-[#696159]">
                      <span className="font-semibold text-[#1E1C1A] text-sm font-sans">
                        {price}
                      </span>
                      <span className="text-[10px] font-sans uppercase tracking-wider text-[#5A6855] bg-[#5A6855]/10 px-2 py-0.5 rounded-none font-semibold">
                        {minOrder === 1 ? "1 Adet Özel Üretim" : `Min. ${minOrder} Adet`}
                      </span>
                    </div>
                  </div>

                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
