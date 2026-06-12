"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, MessageCircle, Heart, Facebook, Twitter, Instagram, ArrowLeft, X } from "lucide-react";
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

export default function ProductDetailContent({ product, ilgiliUrunler = [] }: ProductDetailContentProps) {
  const [qty, setQty] = useState(100);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Setup gallery images: Ana görsel + Ek görseller (De-duplicated & No fallbacks!)
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

  const handleQtyChange = (val: number) => {
    if (val >= 100) {
      setQty(val);
    }
  };

  // Prevent scroll when lightbox is open
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

  // Handle keyboard events for lightbox
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

  // WhatsApp Deep Link configuration
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905555555555";
  const waNumber = rawNumber.replace(/\D/g, "");
  const waText = encodeURIComponent(
    `Merhaba! "${product.isim}" ürününden ${qty} adet sipariş vermek istiyorum. Fiyat ve detaylar konusunda bilgi alabilir miyim?`
  );
  const waHref = `https://wa.me/${waNumber}?text=${waText}`;

  // Struck-through price calculation (Original Price is roughly 35% higher)
  const formatPrice = (p: string) => p || "₺50";
  const parsedPriceStr = formatPrice(product.fiyatAraligi);
  const numbers = parsedPriceStr.match(/\d+/g);
  let oldPriceStr = "₺75";
  if (numbers && numbers.length > 0) {
    if (numbers.length === 2) {
      const min = parseInt(numbers[0]);
      const max = parseInt(numbers[1]);
      oldPriceStr = `₺${Math.round(min * 1.35)} - ₺${Math.round(max * 1.35)}`;
    } else {
      const val = parseInt(numbers[0]);
      oldPriceStr = `₺${Math.round(val * 1.35)}`;
    }
  }

  const formattedNewPrice = product.fiyatAraligi
    ? (product.fiyatAraligi.includes("₺") || product.fiyatAraligi.includes("TL")
        ? product.fiyatAraligi
        : `₺${product.fiyatAraligi}`)
    : "Fiyat Sorun";

  return (
    <div className="proxima-page px-8 md:px-24 py-12 max-w-[1512px] mx-auto bg-[#fbf7f0] border-b border-[#eaeaea] relative overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.cdnfonts.com/css/proxima-nova-2');
        .proxima-page, .proxima-page * {
          font-family: 'Proxima Nova', 'Inter', sans-serif !important;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scaleUp {
          animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
      
      {/* Asymmetric Ellipse Background decoration */}
      <div className="absolute w-[1503px] h-[1503px] left-[338px] top-[-529px] rounded-full bg-white -z-10 pointer-events-none hidden lg:block" />

      {/* Back Arrow (Above main grid columns) */}
      <div className="mb-6 flex justify-start z-10 relative">
        <Link 
          href={`/koleksiyonlar/${product.koleksiyonSlug}`} 
          className="inline-flex items-center text-neutral-500 hover:text-[#ff914b] transition-colors"
          aria-label="Koleksiyona Geri Dön"
        >
          <ArrowLeft size={24} strokeWidth={1.5} className="text-neutral-700" />
        </Link>
      </div>

      {/* Top Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start z-10 relative">
        
        {/* 1. LEFT PANEL: Media Gallery (Vertical Thumbnails on left + Square Main Image) */}
        <div className="lg:col-span-7 flex flex-col md:flex-row items-start gap-5 w-full">
          
          {/* Vertical/Horizontal Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-x-visible w-full md:w-[91px] md:flex-shrink-0 order-2 md:order-1 pb-2 md:pb-0">
              {galleryImages.map((imgUrl, i) => {
                const isActive = activeImageIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`relative w-[70px] h-[70px] md:w-[91px] md:h-[91px] rounded-[10px] overflow-hidden border-2 cursor-pointer flex-shrink-0 transition-all ${
                      isActive ? "border-[#ff914b] scale-[1.02]" : "border-neutral-200 hover:border-[#ff914b]/40"
                    }`}
                  >
                    <Image
                      src={getOptimizedUrl(imgUrl, { width: 200, height: 200, crop: "limit" })}
                      alt={`${product.isim} - Thumbnail ${i + 1}`}
                      fill
                      sizes="91px"
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* Main Image Box */}
          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="w-full md:w-[535px] h-[535px] rounded-[10px] overflow-hidden bg-neutral-200/20 relative flex items-center justify-center order-1 md:order-2 flex-shrink-0 shadow-sm border border-neutral-200/30 cursor-zoom-in group"
          >
            <Image
              src={getOptimizedUrl(galleryImages[activeImageIndex], { width: 1000, height: 1000, crop: "limit" })}
              alt={`${product.isim} - Görsel`}
              width={535}
              height={535}
              className="object-contain max-h-[500px] w-auto h-auto drop-shadow-md z-10 transition-transform duration-300 group-hover:scale-[1.02]"
              priority
              unoptimized
            />

            {/* Navigation Arrows overlay for multi-image gallery */}
            {galleryImages.length > 1 && (
              <div 
                onClick={(e) => e.stopPropagation()}
                className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-xs px-2.5 py-1.5 rounded-full shadow-xs border border-neutral-200/40 text-neutral-600"
              >
                <button
                  onClick={handlePrevImage}
                  aria-label="Önceki resim"
                  className="hover:text-[#ff914b] transition-colors cursor-pointer"
                >
                  <ChevronLeft size={18} strokeWidth={2} />
                </button>
                <span className="text-xs font-bold font-sans">
                  {activeImageIndex + 1} / {galleryImages.length}
                </span>
                <button
                  onClick={handleNextImage}
                  aria-label="Sonraki resim"
                  className="hover:text-[#ff914b] transition-colors cursor-pointer"
                >
                  <ChevronRight size={18} strokeWidth={2} />
                </button>
              </div>
            )}
          </div>

        </div>

        {/* 2. RIGHT PANEL: Product Info & CTA Buttons */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          
          <div className="space-y-6">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="text-xs md:text-sm font-light text-neutral-500 font-sans tracking-wide">
              <Link href="/" className="hover:text-brand-orange transition-colors">Ana Sayfa</Link>
              <span className="mx-2">/</span>
              <Link href={`/koleksiyonlar/${product.koleksiyonSlug}`} className="hover:text-brand-orange transition-colors">{product.koleksiyon || "Koleksiyon"}</Link>
              <span className="mx-2">/</span>
              <span className="text-neutral-800 font-medium">{product.isim}</span>
            </nav>

            {/* Title & Reviews Row */}
            <div className="space-y-3">
              <h1 className="font-sans text-[33px] font-bold text-neutral-800 leading-[40px] tracking-tight">
                {product.isim}
              </h1>
              
              {/* Star Rating row */}
              <div className="flex items-center gap-2 text-xs font-sans text-neutral-500 pt-1">
                <div className="flex items-center text-yellow-500 gap-0.5">
                  <Star size={14} fill="currentColor" className="text-yellow-500" />
                  <Star size={14} fill="currentColor" className="text-yellow-500" />
                  <Star size={14} fill="currentColor" className="text-yellow-500" />
                  <Star size={14} fill="currentColor" className="text-yellow-500" />
                  <Star size={14} fill="currentColor" className="text-yellow-500" />
                </div>
                <span className="font-bold ml-1 text-neutral-700">4.9 / 5.0</span>
                <span className="text-neutral-400 font-light">({product.id ? parseInt(product.id) % 30 + 20 : 48} Değerlendirme)</span>
              </div>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 pt-2">
              {oldPriceStr && (
                <span className="text-base md:text-lg text-neutral-400 line-through font-light">
                  {oldPriceStr}
                </span>
              )}
              <span className="text-[30px] font-bold text-brand-orange-dark font-sans leading-[41px]">
                {formattedNewPrice}
              </span>
            </div>

            {/* Qty & WhatsApp CTA Buttons - Auto layout elements (65px Height) */}
            <div className="pt-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                
                {/* Qty Selector (65px Height) */}
                <div className="flex items-center justify-between border border-neutral-300 rounded-[10px] bg-white w-full sm:w-[150px] h-[65px] px-4 flex-shrink-0">
                  <button
                    onClick={() => handleQtyChange(qty - 10)}
                    disabled={qty <= 100}
                    className="text-neutral-500 hover:text-[#ff914b] disabled:opacity-30 disabled:hover:text-neutral-500 cursor-pointer font-bold select-none text-xl"
                  >
                    -
                  </button>
                  <span className="font-sans font-bold text-neutral-800 select-none text-[16px]">
                    {qty}
                  </span>
                  <button
                    onClick={() => handleQtyChange(qty + 10)}
                    className="text-neutral-500 hover:text-[#ff914b] cursor-pointer font-bold select-none text-xl"
                  >
                    +
                  </button>
                </div>

                {/* WhatsApp Direct Buy button (65px Height) */}
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 w-full h-[65px] text-[15px] tracking-wider uppercase bg-[#ff914b] text-white rounded-[10px] shadow-sm hover:bg-[#e07f3e] transition-colors flex items-center justify-center gap-2 cursor-pointer font-sans text-center font-bold"
                >
                  <MessageCircle size={20} className="fill-white text-[#ff914b]" />
                  <span>WhatsApp ile Sipariş Ver ➔</span>
                </a>

              </div>
            </div>

          </div>

          {/* Social shares */}
          <div className="pt-6 border-t border-neutral-200/40 flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-sans tracking-wide">Ürünü Sosyal Medyada Paylaş:</span>
            <div className="flex items-center gap-4 text-neutral-400">
              <a href="#" className="hover:text-[#ff914b] transition-colors" aria-label="Facebook'ta Paylaş"><Facebook size={18} /></a>
              <a href="#" className="hover:text-[#ff914b] transition-colors" aria-label="Twitter'da Paylaş"><Twitter size={18} /></a>
              <a href="#" className="hover:text-[#ff914b] transition-colors" aria-label="Instagram'da Paylaş"><Instagram size={18} /></a>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Detail Section (Description & Specifications Columns) */}
      <div className="mt-16 pt-12 border-t border-neutral-200/30 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Description heading and text */}
          <div className="lg:col-span-7 space-y-4 max-w-[777px]">
            <h2 className="text-[27px] font-semibold text-neutral-800 tracking-wide font-sans">
              Ürün Açıklaması
            </h2>
            <div className="text-[18px] leading-[28px] text-neutral-600 font-light font-sans whitespace-pre-line">
              <p>{product.kisaAciklama}</p>
              {product.detayAciklama && product.detayAciklama !== product.kisaAciklama && (
                <p className="mt-4 border-l-2 border-brand-orange/40 pl-4 italic text-neutral-500 text-[16px]">
                  {product.detayAciklama}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: What's Included & Features */}
          <div className="lg:col-span-5 space-y-8 lg:pl-6">
            
            {/* What's Included */}
            <div className="space-y-3">
              <h3 className="text-[20px] font-semibold text-neutral-800 tracking-wide font-sans">
                Paket İçeriği
              </h3>
              <ul className="text-[16px] leading-[26px] text-neutral-600 font-light font-sans space-y-2">
                <li>✓ Kişiye Özel 3D Tasarım Entegrasyonu</li>
                <li>✓ Hasarsız Kargo ve Kırılma Garantisi</li>
                <li>✓ Canlı WhatsApp Taslak ve Tasarım Onayı</li>
              </ul>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="text-[20px] font-semibold text-neutral-800 tracking-wide font-sans">
                Özellikler
              </h3>
              <ul className="text-[16px] leading-[26px] text-neutral-600 font-light font-sans space-y-2">
                <li>• Malzeme: Premium Akrilik ve Aynalı Pleksi</li>
                <li>• Minimum Sipariş Adedi: 100 Adet</li>
                <li>• Teslimat Süresi: 3-5 İş Gününde Kargo</li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* Premium Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 z-[10000] text-white/70 hover:text-white transition-colors cursor-pointer p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10"
            aria-label="Kapat"
          >
            <X size={28} />
          </button>

          {/* Left Arrow */}
          {galleryImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-4 md:left-8 z-[10000] text-white/70 hover:text-white transition-colors cursor-pointer p-3.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10"
              aria-label="Önceki Resim"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {/* Main Zoomed Image */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center select-none"
          >
            <Image
              src={getOptimizedUrl(galleryImages[activeImageIndex], { width: 1600, height: 1600, crop: "limit" })}
              alt={`${product.isim} - Büyütülmüş Görsel`}
              width={1200}
              height={1200}
              className="object-contain max-h-[80vh] w-auto h-auto rounded-lg shadow-2xl animate-scaleUp"
              unoptimized
            />
          </div>

          {/* Right Arrow */}
          {galleryImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 md:right-8 z-[10000] text-white/70 hover:text-white transition-colors cursor-pointer p-3.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10"
              aria-label="Sonraki Resim"
            >
              <ChevronRight size={32} />
            </button>
          )}

          {/* Bottom Info Bar / Thumbnail Indicators */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-6 flex flex-col items-center gap-3 z-[10000]"
          >
            <span className="text-white/60 text-[14px] font-sans tracking-wide">
              {product.isim} ({activeImageIndex + 1} / {galleryImages.length})
            </span>
            
            {/* Small thumbnail indicators */}
            {galleryImages.length > 1 && (
              <div className="flex gap-2 bg-white/5 backdrop-blur-xs p-2 rounded-full border border-white/10">
                {galleryImages.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeImageIndex === i ? "bg-[#ff914b] w-6" : "bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Görsel ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
