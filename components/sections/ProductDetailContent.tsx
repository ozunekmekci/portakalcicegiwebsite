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

const materials = [
  { id: "gold", name: "Aynalı Gold", color: "#e5c158" },
  { id: "silver", name: "Gümüş", color: "#C0C0C0" },
  { id: "acrylic", name: "Şeffaf Akrilik", color: "transparent", isTransparent: true },
  { id: "wood", name: "Ahşap", color: "#a67c52" }
];

const fallbackGallery = [
  "/images/gallery-1.webp",
  "/images/gallery-2.webp",
  "/images/gallery-3.webp",
  "/images/gallery-4.webp",
  "/images/gallery-5.webp"
];

export default function ProductDetailContent({ product, ilgiliUrunler = [] }: ProductDetailContentProps) {
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [qty, setQty] = useState(100);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Setup gallery images: Ana görsel + Ek görseller
  const initialImages = [product.anaGorsel, ...(product.ekGorseller || [])].filter(Boolean);
  
  // Pad images to exactly 5 items so the thumbnail grid is fully populated
  let galleryImages = [...initialImages];
  while (galleryImages.length < 5) {
    const nextFallback = fallbackGallery[galleryImages.length % fallbackGallery.length];
    galleryImages.push(nextFallback);
  }
  galleryImages = galleryImages.slice(0, 5);

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
    `Merhaba! "${product.isim}" ürününden ${qty} adet sipariş vermek istiyorum. Malzeme tercihim: ${selectedMaterial.name}. Fiyat ve detaylar konusunda bilgi alabilir miyim?`
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

  return (
    <div className="px-8 md:px-24 py-12 max-w-[1440px] mx-auto bg-[#fbf7f0] border-b border-[#eaeaea]">
      
      {/* Back Arrow (Above main grid columns) */}
      <div className="mb-6 flex justify-start">
        <Link 
          href={`/koleksiyonlar/${product.koleksiyonSlug}`} 
          className="inline-flex items-center text-neutral-500 hover:text-[#ff914b] transition-colors"
          aria-label="Koleksiyona Geri Dön"
        >
          <ArrowLeft size={24} strokeWidth={1.5} className="text-neutral-700" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* 1. LEFT PANEL: Info, Material and Order Panel */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          
          {/* Top Info Area */}
          <div className="space-y-6">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="text-xs md:text-sm font-light text-neutral-500 font-sans tracking-wide">
              <Link href="/" className="hover:text-brand-orange transition-colors">Ana Sayfa</Link>
              <span className="mx-2">/</span>
              <Link href={`/koleksiyonlar/${product.koleksiyonSlug}`} className="hover:text-brand-orange transition-colors">{product.koleksiyon || "Koleksiyon"}</Link>
              <span className="mx-2">/</span>
              <span className="text-neutral-800 font-medium">{product.isim}</span>
            </nav>

            {/* Title and Rating */}
            <div className="space-y-3">
              <h1 className="font-serif text-3xl md:text-4xl lg:text-[40px] font-bold text-neutral-800 leading-tight tracking-tight">
                {product.isim}
              </h1>
              
              {/* Price & Star Rating row */}
              <div className="flex flex-wrap items-center gap-6 pt-1">
                <div className="flex items-baseline font-sans">
                  {oldPriceStr && (
                    <span className="text-sm text-neutral-400 line-through mr-2 font-normal">
                      {oldPriceStr}
                    </span>
                  )}
                  <span className="text-xl font-bold text-brand-orange-dark">
                    {product.fiyatAraligi || "Fiyat Sorun"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-xs border border-[#eaeaea] text-xs font-medium text-neutral-700">
                  <div className="flex items-center text-yellow-500">
                    <Star size={13} fill="currentColor" className="text-yellow-500" />
                    <Star size={13} fill="currentColor" className="text-yellow-500" />
                    <Star size={13} fill="currentColor" className="text-yellow-500" />
                    <Star size={13} fill="currentColor" className="text-yellow-500" />
                    <Star size={13} fill="currentColor" className="text-yellow-500" />
                  </div>
                  <span className="font-bold ml-1">4.9 / 5.0</span>
                  <span className="text-neutral-400 font-normal">(48 Değerlendirme)</span>
                </div>
              </div>
            </div>

            <hr className="border-t border-neutral-200/60" />

            {/* Description */}
            <div className="space-y-3 font-sans text-neutral-600 text-[15px] leading-8 tracking-wide font-light">
              <p>{product.kisaAciklama}</p>
              {product.detayAciklama && product.detayAciklama !== product.kisaAciklama && (
                <p className="text-xs md:text-sm text-neutral-500 border-l-2 border-brand-orange/40 pl-3 italic whitespace-pre-line leading-relaxed">
                  {product.detayAciklama}
                </p>
              )}
            </div>

            <hr className="border-t border-neutral-200/60" />

            {/* Material Selector (Daireler) */}
            <div className="space-y-3">
              <span className="block text-xs font-bold uppercase tracking-wider text-neutral-700 font-sans">
                Malzeme Seçimi: <span className="text-neutral-500 font-normal normal-case ml-1">{selectedMaterial.name}</span>
              </span>
              <div className="flex items-center gap-4">
                {materials.map((mat) => {
                  const isActive = selectedMaterial.id === mat.id;
                  return (
                    <button
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat)}
                      title={mat.name}
                      className={`relative w-7 h-7 rounded-full border border-neutral-300 cursor-pointer transition-all duration-300 ${
                        isActive ? "ring-1 ring-offset-4 ring-[#ff914b] scale-110" : "hover:scale-105"
                      }`}
                      style={{
                        backgroundColor: mat.isTransparent ? "transparent" : mat.color,
                        backgroundImage: mat.isTransparent 
                          ? "linear-gradient(45deg, #eaeaea 25%, transparent 25%, transparent 75%, #eaeaea 75%), linear-gradient(45deg, #eaeaea 25%, transparent 25%, transparent 75%, #eaeaea 75%)" 
                          : "none",
                        backgroundSize: mat.isTransparent ? "8px 8px" : "auto",
                        backgroundPosition: mat.isTransparent ? "0 0, 4px 4px" : "auto"
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <hr className="border-t border-neutral-200/60" />

            {/* Qty & WhatsApp Action Side-by-Side */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Qty Selector */}
                <div className="flex items-center justify-between border border-neutral-300 rounded-none bg-white w-full sm:max-w-[120px] h-12 px-3 flex-shrink-0">
                  <button
                    onClick={() => handleQtyChange(qty - 10)}
                    disabled={qty <= 100}
                    className="text-neutral-500 hover:text-[#ff914b] disabled:opacity-30 disabled:hover:text-neutral-500 cursor-pointer font-bold select-none text-lg"
                  >
                    -
                  </button>
                  <span className="font-sans font-bold text-neutral-800 select-none text-[15px]">
                    {qty}
                  </span>
                  <button
                    onClick={() => handleQtyChange(qty + 10)}
                    className="text-neutral-500 hover:text-[#ff914b] cursor-pointer font-bold select-none text-lg"
                  >
                    +
                  </button>
                </div>

                {/* WhatsApp CTA button */}
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 w-full h-12 text-[14px] tracking-wider uppercase bg-[#ff914b] text-white rounded-none shadow-sm hover:bg-[#e07f3e] transition-colors flex items-center justify-center gap-2 cursor-pointer font-sans text-center font-bold"
                >
                  <MessageCircle size={18} className="fill-white text-[#ff914b]" />
                  <span>WhatsApp ile Tasarımı Başlat ➔</span>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Value Badges & Actions */}
          <div className="pt-6 border-t border-neutral-200/60 space-y-4">
            <p className="text-[10px] md:text-xs text-neutral-500 font-sans tracking-wide text-center lg:text-left leading-relaxed">
              ✨ Kişiye Özel 3D Tasarım &bull; 📦 Hasarsız Kargo Garantisi &bull; 💬 WhatsApp Canlı Taslak Onayı
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200/40">
              <button className="flex items-center gap-2 text-sm text-neutral-600 hover:text-[#ff914b] transition-colors font-sans font-medium">
                <Heart size={18} className="text-neutral-500" />
                <span>Seçilenlere Ekle</span>
              </button>
              
              <div className="flex items-center gap-4 text-neutral-400">
                <a href="#" className="hover:text-[#ff914b] transition-colors" aria-label="Facebook'ta Paylaş"><Facebook size={16} /></a>
                <a href="#" className="hover:text-[#ff914b] transition-colors" aria-label="Twitter'da Paylaş"><Twitter size={16} /></a>
                <a href="#" className="hover:text-[#ff914b] transition-colors" aria-label="Instagram'da Paylaş"><Instagram size={16} /></a>
              </div>
            </div>
          </div>

        </div>

        {/* 2. RIGHT PANEL: Media Gallery & Thumbnail Grid */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-8">
          
          {/* Main Carrier */}
          <div className="relative w-full h-[550px] flex items-center justify-center">
            
            {/* Asimetrik Arka Plan Bloğu */}
            <div className="absolute right-0 top-20 w-[80%] h-[350px] bg-neutral-200/40 rounded-l-[4rem] -z-10" />

            {/* Özgür Görsel (c_limit ensures entire aspect ratio fits inside max-h-[460px] box) */}
            <div className="relative w-full h-[460px] flex items-center justify-center z-10">
              <Image
                src={getOptimizedUrl(galleryImages[activeImageIndex], { width: 1000, height: 1000, crop: "limit" })}
                alt={`${product.isim} - Görsel`}
                width={600}
                height={460}
                className="object-contain max-h-[460px] w-auto h-auto drop-shadow-md z-10"
                priority
                unoptimized
              />
            </div>

            {/* Yön Okları ve Sayaç */}
            <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1 font-sans select-none">
              <div className="flex items-baseline text-sm md:text-base">
                <span className="font-bold text-neutral-800 text-lg md:text-xl">
                  {String(activeImageIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-neutral-400 mx-1">/</span>
                <span className="text-neutral-400 text-sm">
                  {String(galleryImages.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <button
                  onClick={handlePrevImage}
                  aria-label="Önceki resim"
                  className="text-neutral-600 hover:text-[#ff914b] transition-colors cursor-pointer"
                >
                  <ChevronLeft size={20} strokeWidth={1.5} />
                </button>
                <button
                  onClick={handleNextImage}
                  aria-label="Sonraki resim"
                  className="text-neutral-600 hover:text-[#ff914b] transition-colors cursor-pointer"
                >
                  <ChevronRight size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>

          </div>

          {/* Thumbnails row */}
          <div className="flex items-center justify-center gap-3 overflow-x-auto w-full pb-2 z-10">
            {galleryImages.map((imgUrl, i) => {
              const isActive = activeImageIndex === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative w-[70px] h-[70px] md:w-[104px] md:h-[104px] rounded-lg overflow-hidden border-2 cursor-pointer flex-shrink-0 transition-all ${
                    isActive ? "border-[#ff914b] scale-[1.03]" : "border-neutral-200 hover:border-[#ff914b]/40"
                  }`}
                >
                  <Image
                    src={getOptimizedUrl(imgUrl, { width: 200, height: 200, crop: "limit" })}
                    alt={`${product.isim} - Thumbnail ${i + 1}`}
                    fill
                    sizes="104px"
                    className="object-cover"
                    unoptimized
                  />
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
