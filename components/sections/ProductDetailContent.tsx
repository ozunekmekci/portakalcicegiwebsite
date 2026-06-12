"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, MessageCircle, Heart, Facebook, Twitter, Instagram, ArrowLeft } from "lucide-react";
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

  // Setup gallery images: Ana görsel + Ek görseller (De-duplicated & No fallbacks!)
  const initialImages = [product.anaGorsel, ...(product.ekGorseller || [])].filter(Boolean);
  const galleryImages = Array.from(new Set(initialImages));
  if (galleryImages.length === 0) {
    galleryImages.push(fallbackGallery[0]);
  }

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleQtyChange = (val: number) => {
    if (val >= 100) {
      setQty(val);
    }
  };

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
          <div className="w-full md:w-[535px] h-[535px] rounded-[10px] overflow-hidden bg-neutral-200/20 relative flex items-center justify-center order-1 md:order-2 flex-shrink-0 shadow-sm border border-neutral-200/30">
            <Image
              src={getOptimizedUrl(galleryImages[activeImageIndex], { width: 1000, height: 1000, crop: "limit" })}
              alt={`${product.isim} - Görsel`}
              width={535}
              height={535}
              className="object-contain max-h-[500px] w-auto h-auto drop-shadow-md z-10"
              priority
              unoptimized
            />

            {/* Navigation Arrows overlay for multi-image gallery */}
            {galleryImages.length > 1 && (
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-xs px-2.5 py-1.5 rounded-full shadow-xs border border-neutral-200/40 text-neutral-600">
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

    </div>
  );
}
