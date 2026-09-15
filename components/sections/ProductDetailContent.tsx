"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, MessageCircle, Facebook, Twitter, Instagram, ArrowLeft, X } from "lucide-react";
import { Product } from "@/lib/types";
import { getOptimizedUrl } from "@/lib/cloudinary";

interface ProductDetailContentProps {
  product: Product;
  ilgiliUrunler?: Product[];
}

const fallbackGallery = [
  "/images/gallery-1.webp",
  "/images/gallery-2.webp",
  "/images/gallery-3.webp",
  "/images/gallery-4.webp",
  "/images/gallery-5.webp"
];

export default function ProductDetailContent({ product }: ProductDetailContentProps) {
  const minQty = product.minimumAdet || (product.koleksiyonSlug === "magnet" ? 25 : 1);
  const [qty, setQty] = useState(minQty);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const initialImages = [product.anaGorsel, ...(product.ekGorseller || [])].filter(Boolean);
  const galleryImages = Array.from(new Set(initialImages));
  if (galleryImages.length === 0) {
    galleryImages.push(fallbackGallery[0]);
  }

  const handlePrevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  }, [galleryImages.length]);

  const handleNextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  }, [galleryImages.length]);

  const step = minQty === 1 ? 1 : 10;
  const handleQtyChange = (val: number) => {
    if (val >= minQty) {
      setQty(val);
    }
  };

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft" && galleryImages.length > 1) {
        handlePrevImage();
      } else if (e.key === "ArrowRight" && galleryImages.length > 1) {
        handleNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, galleryImages.length, handlePrevImage, handleNextImage]);

  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905555555555";
  const waNumber = rawNumber.replace(/\D/g, "");
  const waText = encodeURIComponent(
    `Merhaba! "${product.isim}" ürününden ${qty} adet için tasarım taslağı ve sipariş bilgisi almak istiyorum.`
  );
  const waHref = `https://wa.me/${waNumber}?text=${waText}`;

  const formatPrice = (p: string) => p || "₺50";
  const parsedPriceStr = formatPrice(product.fiyatAraligi);
  const numbers = parsedPriceStr.match(/\d+/g);
  let oldPriceStr = "";
  if (numbers && numbers.length > 0) {
    if (numbers.length === 2) {
      const min = parseInt(numbers[0]);
      const max = parseInt(numbers[1]);
      oldPriceStr = `₺${Math.round(min * 1.3)} - ₺${Math.round(max * 1.3)}`;
    } else {
      const val = parseInt(numbers[0]);
      oldPriceStr = `₺${Math.round(val * 1.3)}`;
    }
  }

  const formattedNewPrice = product.fiyatAraligi
    ? (product.fiyatAraligi.includes("₺") || product.fiyatAraligi.includes("TL")
        ? product.fiyatAraligi
        : `₺${product.fiyatAraligi}`)
    : "Fiyat Sorun";

  const packageItems = product.paketIcerigi
    ? product.paketIcerigi.split("\n").map(item => item.trim()).filter(Boolean)
    : [
        "✓ Kişiye Özel 3D Tasarım Entegrasyonu",
        "✓ Hasarsız Kargo ve Kırılma Garantisi",
        "✓ Canlı WhatsApp Taslak ve Tasarım Onayı"
      ];

  const featureItems = product.ozellikler
    ? product.ozellikler.split("\n").map(item => item.trim()).filter(Boolean)
    : [
        "• Malzeme: Premium Akrilik ve Aynalı Pleksi",
        `• Minimum Sipariş: ${minQty === 1 ? "1 Adet Özel Üretim" : `${minQty} Adet`}`,
        "• Teslimat Süresi: 3-5 İş Gününde Kargo"
      ];

  return (
    <div className="px-6 md:px-16 py-10 max-w-[1400px] mx-auto bg-[#FDFBF7] border-b border-[#EDE6DF] relative">
      {/* Back Arrow */}
      <div className="mb-6 flex justify-start z-10 relative">
        <Link 
          href={`/koleksiyonlar/${product.koleksiyonSlug}`} 
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#696159] hover:text-[#C86D51] transition-colors"
          aria-label="Koleksiyona Geri Dön"
        >
          <ArrowLeft size={16} />
          <span>Koleksiyona Dön</span>
        </Link>
      </div>

      {/* Top Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start z-10 relative">
        
        {/* LEFT PANEL: Media Gallery */}
        <div className="lg:col-span-7 flex flex-col md:flex-row items-start gap-4 w-full">
          
          {/* Thumbnails - Straight Edges */}
          {galleryImages.length > 1 && (
            <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-x-visible w-full md:w-[84px] md:flex-shrink-0 order-2 md:order-1 pb-2 md:pb-0">
              {galleryImages.map((imgUrl, i) => {
                const isActive = activeImageIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`relative w-[64px] h-[64px] md:w-[84px] md:h-[84px] rounded-none overflow-hidden border cursor-pointer flex-shrink-0 transition-all ${
                      isActive ? "border-[#C86D51]" : "border-[#EDE6DF] hover:border-[#C86D51]/50"
                    }`}
                  >
                    <Image
                      src={getOptimizedUrl(imgUrl, { width: 180, height: 180, crop: "limit" })}
                      alt={`${product.isim} - Thumbnail ${i + 1}`}
                      fill
                      sizes="84px"
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* Main Image Box - Straight Edges */}
          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="w-full md:flex-1 aspect-square rounded-none overflow-hidden bg-white border border-[#EDE6DF] relative flex items-center justify-center order-1 md:order-2 flex-shrink-0 shadow-sm cursor-zoom-in group p-4"
          >
            <div className="relative w-full h-full bg-[#F5EFEB] rounded-none overflow-hidden flex items-center justify-center">
              <Image
                src={getOptimizedUrl(galleryImages[activeImageIndex], { width: 1000, height: 1000, crop: "limit" })}
                alt={`${product.isim} - Görsel`}
                fill
                className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02]"
                priority
                unoptimized
              />
            </div>

            {/* Navigation Arrows for multi-image */}
            {galleryImages.length > 1 && (
              <div 
                onClick={(e) => e.stopPropagation()}
                className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-[#FDFBF7]/95 backdrop-blur-xs px-2.5 py-1 rounded-none border border-[#EDE6DF] text-[#1E1C1A]"
              >
                <button
                  onClick={handlePrevImage}
                  aria-label="Önceki resim"
                  className="hover:text-[#C86D51] transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-semibold font-sans">
                  {activeImageIndex + 1} / {galleryImages.length}
                </span>
                <button
                  onClick={handleNextImage}
                  aria-label="Sonraki resim"
                  className="hover:text-[#C86D51] transition-colors cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT PANEL: Product Info & CTA Buttons */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between text-left">
          
          <div className="space-y-6">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="text-xs font-sans text-[#696159] tracking-wide">
              <Link href="/" className="hover:text-[#C86D51] transition-colors">Ana Sayfa</Link>
              <span className="mx-2">/</span>
              <Link href={`/koleksiyonlar/${product.koleksiyonSlug}`} className="hover:text-[#C86D51] transition-colors">{product.koleksiyon || "Koleksiyon"}</Link>
              <span className="mx-2">/</span>
              <span className="text-[#1E1C1A] font-semibold">{product.isim}</span>
            </nav>

            {/* Title & Reviews */}
            <div className="space-y-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1C1A] leading-tight">
                {product.isim}
              </h1>
              
              <div className="flex items-center gap-2 text-xs font-sans text-[#696159] pt-1">
                <div className="flex items-center text-[#D49B35] gap-0.5">
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                </div>
                <span className="font-semibold text-[#1E1C1A]">4.9 / 5.0</span>
                <span>(Atölye Yorumları)</span>
              </div>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 pt-1">
              {oldPriceStr && (
                <span className="text-sm sm:text-base text-[#696159] line-through font-light">
                  {oldPriceStr}
                </span>
              )}
              <span className="text-2xl sm:text-3xl font-bold text-[#C86D51] font-sans">
                {formattedNewPrice}
              </span>
            </div>

            {/* Qty & WhatsApp CTA */}
            <div className="pt-4 space-y-3">
              <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#696159]">
                Sipariş Adedi ({minQty === 1 ? "1 Adet Özel Üretim" : `Asgari ${minQty} Adet`})
              </label>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Qty Selector - Straight Edges */}
                <div className="flex items-center justify-between border border-[#EDE6DF] bg-white rounded-none w-full sm:w-[130px] h-[52px] px-4">
                  <button
                    onClick={() => handleQtyChange(qty - step)}
                    disabled={qty <= minQty}
                    className="text-[#696159] hover:text-[#C86D51] disabled:opacity-30 cursor-pointer font-bold select-none text-lg"
                  >
                    -
                  </button>
                  <span className="font-sans font-bold text-[#1E1C1A] select-none text-base">
                    {qty}
                  </span>
                  <button
                    onClick={() => handleQtyChange(qty + step)}
                    className="text-[#696159] hover:text-[#C86D51] cursor-pointer font-bold select-none text-lg"
                  >
                    +
                  </button>
                </div>

                {/* WhatsApp Direct Buy button - Straight Edges */}
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-[52px] text-xs font-sans font-semibold uppercase tracking-wider bg-[#C86D51] hover:bg-[#A85338] text-white rounded-none shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp ile Sipariş Ver ➔</span>
                </a>
              </div>
            </div>

          </div>

          {/* Social shares */}
          <div className="pt-6 border-t border-[#EDE6DF] flex items-center justify-between">
            <span className="text-xs text-[#696159] font-sans">Paylaş:</span>
            <div className="flex items-center gap-4 text-[#696159]">
              <a href="#" className="hover:text-[#C86D51] transition-colors" aria-label="Facebook"><Facebook size={16} /></a>
              <a href="#" className="hover:text-[#C86D51] transition-colors" aria-label="Twitter"><Twitter size={16} /></a>
              <a href="#" className="hover:text-[#C86D51] transition-colors" aria-label="Instagram"><Instagram size={16} /></a>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Detail Section */}
      <div className="mt-16 pt-12 border-t border-[#EDE6DF] z-10 relative text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Description */}
          <div className="lg:col-span-7 space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1C1A]">
              Ürün Açıklaması
            </h2>
            <div className="text-sm leading-relaxed text-[#696159] font-sans whitespace-pre-line space-y-3">
              <p>{product.kisaAciklama}</p>
              {product.detayAciklama && product.detayAciklama !== product.kisaAciklama && (
                <p className="border-l-2 border-[#C86D51]/50 pl-3 italic text-[#1E1C1A]">
                  {product.detayAciklama}
                </p>
              )}
            </div>
          </div>

          {/* Included & Features */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#1E1C1A]">
                Paket İçeriği
              </h3>
              <ul className="text-xs sm:text-sm text-[#696159] font-sans space-y-1.5">
                {packageItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[#1E1C1A]">
                Özellikler
              </h3>
              <ul className="text-xs sm:text-sm text-[#696159] font-sans space-y-1.5">
                {featureItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal - Straight Edges */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 z-[10000] text-white/70 hover:text-white transition-colors cursor-pointer p-2 rounded-none bg-white/10 hover:bg-white/20 border border-white/20"
            aria-label="Kapat"
          >
            <X size={24} />
          </button>

          {galleryImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-4 md:left-8 z-[10000] text-white/70 hover:text-white transition-colors cursor-pointer p-3 rounded-none bg-white/10 hover:bg-white/20 border border-white/20"
              aria-label="Önceki Resim"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center select-none"
          >
            <Image
              src={getOptimizedUrl(galleryImages[activeImageIndex], { width: 1600, height: 1600, crop: "limit" })}
              alt={`${product.isim} - Büyütülmüş Görsel`}
              width={1200}
              height={1200}
              className="object-contain max-h-[80vh] w-auto h-auto rounded-none shadow-2xl animate-scaleUp"
              unoptimized
            />
          </div>

          {galleryImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 md:right-8 z-[10000] text-white/70 hover:text-white transition-colors cursor-pointer p-3 rounded-none bg-white/10 hover:bg-white/20 border border-white/20"
              aria-label="Sonraki Resim"
            >
              <ChevronRight size={28} />
            </button>
          )}

          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-6 flex flex-col items-center gap-2 z-[10000]"
          >
            <span className="text-white/70 text-xs font-sans">
              {product.isim} ({activeImageIndex + 1} / {galleryImages.length})
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
