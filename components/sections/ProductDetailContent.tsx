"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
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
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#fbf7f0] border-b border-[#eaeaea]">
      
      {/* 1. LEFT PANEL: Info, Material and Order Panel */}
      <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-between space-y-10 lg:space-y-0">
        
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
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-baseline font-sans">
                <span className="text-sm text-neutral-400 line-through mr-2 font-normal">
                  {oldPriceStr}
                </span>
                <span className="text-xl font-bold text-brand-orange-dark">
                  {product.fiyatAraligi || "Fiyat Sorun"}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-xs border border-[#eaeaea] text-xs font-medium text-neutral-700">
                <Star size={13} fill="currentColor" className="text-yellow-500" />
                <span>4.9</span>
                <span className="text-neutral-400">(48 Değerlendirme)</span>
              </div>
            </div>
          </div>

          <hr className="border-t border-neutral-200/60" />

          {/* Description */}
          <div className="space-y-3 font-sans text-sm md:text-base text-neutral-600 leading-relaxed">
            <p>{product.kisaAciklama}</p>
            {product.detayAciklama && product.detayAciklama !== product.kisaAciklama && (
              <p className="text-xs md:text-sm text-neutral-500 border-l-2 border-brand-orange/40 pl-3 italic whitespace-pre-line">
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
            <div className="flex items-center gap-3">
              {materials.map((mat) => {
                const isActive = selectedMaterial.id === mat.id;
                return (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat)}
                    title={mat.name}
                    className={`relative w-7 h-7 rounded-full border border-neutral-300 cursor-pointer transition-all duration-300 ${
                      isActive ? "ring-2 ring-[#ff914b] ring-offset-2 scale-110" : "hover:scale-105"
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

          {/* Qty & WhatsApp Action */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              {/* Qty Selector */}
              <div className="flex items-center border border-neutral-300 rounded-md bg-white">
                <span className="px-3 text-xs uppercase tracking-wider font-bold text-neutral-500 select-none">
                  Qty
                </span>
                <button
                  onClick={() => handleQtyChange(qty - 10)}
                  disabled={qty <= 100}
                  className="px-3 py-2 text-neutral-500 hover:text-[#ff914b] disabled:opacity-30 disabled:hover:text-neutral-500 cursor-pointer font-bold select-none"
                >
                  -
                </button>
                <span className="w-10 text-center font-sans font-bold text-neutral-800 select-none">
                  {qty}
                </span>
                <button
                  onClick={() => handleQtyChange(qty + 10)}
                  className="px-3 py-2 text-neutral-500 hover:text-[#ff914b] cursor-pointer font-bold select-none"
                >
                  +
                </button>
              </div>
            </div>

            {/* WhatsApp CTA button */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#ff914b] text-white font-medium px-8 py-4 rounded-md shadow-sm hover:bg-[#fa3500] hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-sans text-base text-center"
            >
              <MessageCircle size={18} className="fill-white text-[#ff914b]" />
              <span>💬 WhatsApp ile Tasarımı Başlat ➔</span>
            </a>
          </div>

        </div>

        {/* Bottom Value Badges */}
        <div className="pt-6 border-t border-neutral-200/60">
          <p className="text-[10px] md:text-xs text-neutral-500 font-sans tracking-wide text-center lg:text-left leading-relaxed">
            ✨ Kişiye Özel 3D Tasarım &bull; 📦 Hasarsız Kargo Garantisi &bull; 💬 WhatsApp Canlı Taslak Onayı
          </p>
        </div>

      </div>

      {/* 2. RIGHT PANEL: Media Gallery & Thumbnail Grid */}
      <div className="w-full lg:w-1/2 relative bg-white flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 border-l border-neutral-100/60 space-y-8">
        
        {/* Main Big Image Area aspect-[844/461] */}
        <div className="relative w-full max-w-[844px] aspect-[844/461] rounded-2xl overflow-hidden shadow-xs border border-neutral-200/40">
          <Image
            src={getOptimizedUrl(galleryImages[activeImageIndex], { width: 850, height: 465, crop: "fill" })}
            alt={`${product.isim} - Büyük Görsel`}
            fill
            sizes="(max-w-1024px) 100vw, 844px"
            className="object-cover transition-all duration-500"
            unoptimized
          />

          {/* Floating Indicators & Arrows inside the Main Image */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-3 bg-black/60 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-white font-sans text-xs select-none">
            {/* Index Counter */}
            <span className="font-semibold tracking-wider">
              {String(activeImageIndex + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
            </span>
            <div className="w-[1px] h-3.5 bg-white/30" />
            
            {/* Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevImage}
                aria-label="Önceki resim"
                className="hover:text-brand-orange transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button
                onClick={handleNextImage}
                aria-label="Sonraki resim"
                className="hover:text-brand-orange transition-colors cursor-pointer"
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnails row */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto w-full pb-2">
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
                  src={getOptimizedUrl(imgUrl, { width: 150, height: 150, crop: "fill" })}
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
  );
}
