"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Trash2, ArrowLeft, ArrowRight, Image as ImageIcon } from "lucide-react";
import { getOptimizedUrl } from "@/lib/cloudinary";

interface CloudinaryUploadProps {
  images: string[];
  onChange: (newImages: string[]) => void;
  maxImages?: number;
  label?: string;
  folder?: string;
}

declare global {
  interface Window {
    cloudinary: any;
  }
}

/**
 * Cloudinary URL'inden public_id değerini ayıklar.
 */
function getPublicIdFromUrl(url: string): string | null {
  const segment = "/image/upload/";
  const uploadIndex = url.indexOf(segment);
  if (uploadIndex === -1) return null;

  const pathAfterUpload = url.substring(uploadIndex + segment.length);
  const parts = pathAfterUpload.split("/");

  // Versiyon numarası varsa (örn: v1782346734) diziden çıkar
  if (parts[0] && parts[0].startsWith("v") && /^\d+$/.test(parts[0].substring(1))) {
    parts.shift();
  }

  // Dosya uzantısını temizle
  const publicIdWithExt = parts.join("/");
  const dotIndex = publicIdWithExt.lastIndexOf(".");
  if (dotIndex !== -1) {
    return publicIdWithExt.substring(0, dotIndex);
  }
  return publicIdWithExt;
}

export default function CloudinaryUpload({
  images,
  onChange,
  maxImages = 10,
  label = "Ürün Görselleri",
  folder = "products",
}: CloudinaryUploadProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const handleOpenWidget = () => {
    if (!window.cloudinary) {
      alert("Cloudinary yükleme aracı henüz yüklenmedi. Lütfen sayfayı yenileyin.");
      return;
    }

    if (!cloudName || !uploadPreset) {
      alert("Cloudinary ortam değişkenleri eksik. Lütfen yapılandırmayı kontrol edin.");
      return;
    }

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: ["local", "url", "camera"],
        multiple: maxImages > 1,
        maxFiles: maxImages - images.length,
        clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
        folder,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          const uploadedUrl = result.info.secure_url;
          onChange([...images, uploadedUrl]);
        }
      }
    );

    myWidget.open();
  };

  const handleDeleteImage = async (urlToDelete: string) => {
    setIsDeleting(urlToDelete);

    // Görseli listeden hemen çıkar
    const updatedImages = images.filter((img) => img !== urlToDelete);
    onChange(updatedImages);

    const publicId = getPublicIdFromUrl(urlToDelete);
    if (!publicId) {
      setIsDeleting(null);
      return;
    }

    try {
      // 1. Sunucudan silme işlemi için imza talep et
      const signatureRes = await fetch("/api/cloudinary/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: publicId }),
      });

      if (!signatureRes.ok) {
        throw new Error("İmza alınamadı.");
      }

      const { signature, timestamp, api_key } = await signatureRes.json();

      // 2. Cloudinary'nin destroy API'sine istek gönder
      const formData = new FormData();
      formData.append("public_id", publicId);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", api_key);

      await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
        method: "POST",
        body: formData,
      });

      console.log(`Cloudinary'den görsel başarıyla silindi: ${publicId}`);
    } catch (err) {
      console.error("Cloudinary destroy error:", err);
      // Cloudinary'de silinemese bile listeden çıkmış olacak
    } finally {
      setIsDeleting(null);
    }
  };

  const handleMove = (index: number, direction: "left" | "right") => {
    const newIndex = direction === "left" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= images.length) return;

    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;

    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider font-sans">
          {label} ({images.length}/{maxImages})
        </label>
        
        {images.length < maxImages && (
          <button
            type="button"
            onClick={handleOpenWidget}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#fbf7f0] border border-[#ff914b] text-[#ff914b] text-xs font-semibold rounded-full hover:bg-[#ff914b] hover:text-white transition-all cursor-pointer font-sans"
          >
            <Upload size={14} />
            <span>Görsel Yükle</span>
          </button>
        )}
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {images.map((imgUrl, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === images.length - 1;
            const optimizedThumb = getOptimizedUrl(imgUrl, { width: 150, height: 150 });

            return (
              <div
                key={imgUrl}
                className="relative bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl p-2 flex flex-col items-center group"
              >
                {/* Image Preview */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-100 mb-2">
                  <Image
                    src={optimizedThumb}
                    alt={`${label} görseli ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="object-cover"
                    unoptimized
                  />
                  {isFirst && maxImages > 1 && (
                    <span className="absolute top-1 left-1 bg-brand-orange text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow font-sans">
                      Kapak
                    </span>
                  )}
                </div>

                {/* Shifting and Delete Actions */}
                <div className="flex items-center justify-between w-full px-1 gap-1">
                  {maxImages > 1 ? (
                    <div className="flex items-center gap-0.5">
                      {/* Move Left */}
                      <button
                        type="button"
                        onClick={() => handleMove(idx, "left")}
                        disabled={isFirst}
                        className="p-1.5 text-brand-text-mid hover:text-brand-orange hover:bg-gray-100 rounded-full transition-all disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                        title="Sola Taşı"
                      >
                        <ArrowLeft size={14} />
                      </button>
                      
                      {/* Move Right */}
                      <button
                        type="button"
                        onClick={() => handleMove(idx, "right")}
                        disabled={isLast}
                        className="p-1.5 text-brand-text-mid hover:text-brand-orange hover:bg-gray-100 rounded-full transition-all disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                        title="Sağa Taşı"
                      >
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  ) : (
                    <div />
                  )}

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(imgUrl)}
                    disabled={isDeleting === imgUrl}
                    className="p-1.5 text-brand-orange-dark hover:bg-red-50 rounded-full transition-all disabled:opacity-50 cursor-pointer"
                    title="Görseli Sil"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="border-2 border-dashed border-[#dcdcd9] rounded-2xl p-8 flex flex-col items-center justify-center text-brand-text-mid">
          <ImageIcon size={36} className="text-[#dcdcd9] mb-2" />
          <p className="text-xs font-semibold font-sans mb-3 text-center">
            Henüz fotoğraf yüklenmedi. En fazla {maxImages} adet görsel ekleyebilirsiniz.
          </p>
          <button
            type="button"
            onClick={handleOpenWidget}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange text-white text-xs font-semibold rounded-full shadow shadow-brand-orange/15 hover:bg-brand-orange/90 transition-all cursor-pointer font-sans"
          >
            <Upload size={14} />
            <span>İlk Görseli Yükle</span>
          </button>
        </div>
      )}
    </div>
  );
}
