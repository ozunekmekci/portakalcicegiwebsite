"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { ProductWithCategory } from "@/lib/db-queries-types";
import { getOptimizedUrl } from "@/lib/cloudinary";

interface BestsellersSliderProps {
  products: ProductWithCategory[];
}

const mockBestsellers = [
  {
    id: 1,
    name: "Aynalı Pleksi Özel İsimli Pasta Süsü",
    slug: "aynali-pleksi-ozel-isimli-pasta-susu",
    category_name: "Pasta Süsü",
    cover_image: "/images/gallery-5.webp",
    price_range: "₺180 - ₺240",
    min_order: 1,
  },
  {
    id: 2,
    name: "3D Katmanlı Akrilik Bulut Baby Shower Magneti",
    slug: "3d-katmanli-akrilik-bulut-baby-shower-magneti",
    category_name: "Baby Shower",
    cover_image: "/images/gallery-2.webp",
    price_range: "₺45 - ₺65 / adet",
    min_order: 25,
  },
  {
    id: 3,
    name: "Safari Konsept Pasta Süsü & 30 Magnet Paketi",
    slug: "safari-konsept-pasta-susu-ve-30-adet-magnet-paketi",
    category_name: "Kombin Set",
    cover_image: "/images/gallery-4.webp",
    price_range: "₺1.450 - ₺1.850",
    min_order: 1,
  },
  {
    id: 4,
    name: "İlk Yaş 'One' Akrilik Pasta Süsü",
    slug: "ilk-yas-one-akrilik-pasta-susu",
    category_name: "Pasta Süsü",
    cover_image: "/images/gallery-3.webp",
    price_range: "₺190 - ₺260",
    min_order: 1,
  },
  {
    id: 5,
    name: "Ay Dede & Yıldız Aynalı Pleksi Bebek Hatırası",
    slug: "ay-dede-yildiz-aynali-pleksi-bebek-hatirasi",
    category_name: "Baby Shower",
    cover_image: "/images/gallery-5.webp",
    price_range: "₺48 - ₺68 / adet",
    min_order: 25,
  },
  {
    id: 6,
    name: "Zarif Çift İsimli Düğün & Nişan Pasta Süsü",
    slug: "zarif-cift-isimli-dugun-nisan-pasta-susu",
    category_name: "Pasta Süsü",
    cover_image: "/images/gallery-1.webp",
    price_range: "₺210 - ₺280",
    min_order: 1,
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
    <section id="one-cikanlar" aria-label="Öne Çıkan Tasarımlar" className="w-full bg-[#F5EFEB] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#EDE6DF]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Editorial Section Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="space-y-2 max-w-xl text-left">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1C1A] tracking-tight">
              Atölyeden Yeni Çıkanlar &amp; Çok Sevilenler
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#696159] leading-relaxed">
              Kutlamanız için tekil özel pasta süsleri, uyumlu hatıra magnetleri ve avantajlı kutlama kombinlerimiz.
            </p>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto flex-shrink-0">
            <button
              onClick={handleScrollLeft}
              aria-label="Önceki ürünleri göster"
              className="w-11 h-11 rounded-full border border-[#EDE6DF] flex items-center justify-center text-[#1E1C1A] bg-[#FDFBF7] hover:bg-[#D95A2B] hover:text-white hover:border-transparent transition-all duration-300 shadow-soft-sm active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={19} />
            </button>
            <button
              onClick={handleScrollRight}
              aria-label="Sonraki ürünleri göster"
              className="w-11 h-11 rounded-full border border-[#EDE6DF] flex items-center justify-center text-[#1E1C1A] bg-[#FDFBF7] hover:bg-[#D95A2B] hover:text-white hover:border-transparent transition-all duration-300 shadow-soft-sm active:scale-95 cursor-pointer"
            >
              <ChevronRight size={19} />
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
                className="w-[300px] sm:w-[340px] flex-shrink-0 relative group rounded-2xl overflow-hidden snap-start transition-all duration-300 bg-[#FDFBF7] border border-[#EDE6DF] shadow-soft-sm hover:shadow-soft-md"
              >
                <Link href={`/urunler/${product.slug}`} className="block h-full flex flex-col">
                  
                  {/* Image Container with Natural Light */}
                  <div className="relative w-full h-[360px] overflow-hidden bg-[#F5EFEB]">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 300px, 340px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    
                    {/* Subtle Category Tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[11px] font-sans font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-[#FDFBF7]/90 backdrop-blur-sm text-[#1E1C1A] border border-[#EDE6DF] shadow-soft-sm">
                        {categoryName}
                      </span>
                    </div>

                    {/* Corner Detail Arrow */}
                    <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#FDFBF7]/90 backdrop-blur-sm border border-[#EDE6DF] flex items-center justify-center text-[#1E1C1A] group-hover:bg-[#D95A2B] group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-soft-sm">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  {/* Editorial Content Below Image */}
                  <div className="p-5 flex flex-col justify-between flex-grow space-y-3">
                    <h3 className="font-serif text-lg font-semibold text-[#1E1C1A] group-hover:text-[#D95A2B] transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between pt-2 border-t border-[#EDE6DF]/80 text-xs font-sans text-[#696159]">
                      <span className="font-semibold text-[#1E1C1A] text-sm font-sans">
                        {price}
                      </span>
                      <span className="text-[#5A6855] bg-[#5A6855]/10 px-2 py-0.5 rounded-full text-[11px] font-medium">
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
