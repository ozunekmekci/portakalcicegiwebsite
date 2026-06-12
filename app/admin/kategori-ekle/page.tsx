"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import CloudinaryUpload from "@/components/admin/CloudinaryUpload";

export default function KategoriEklePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    emoji: "",
    description: "",
    display_order: 0,
    banner_image: null as string | null,
    image_type: "emoji",
    image_url: null as string | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Lütfen koleksiyon adını girin.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Koleksiyon eklenemedi.");
      }

      router.push("/admin/kategoriler");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Kaydetme sırasında bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href="/admin/kategoriler"
          className="p-2 hover:bg-gray-100 rounded-full transition-all text-brand-text-mid"
        >
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-text-dark">
            Yeni Koleksiyon Ekle
          </h1>
          <p className="text-sm text-brand-text-mid mt-0.5 font-sans">
            Siteniz için yeni bir ürün koleksiyonu tanımlayın.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm font-sans">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl bg-white border border-[#dcdcd9] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2 font-sans">
              Koleksiyon Adı *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm font-sans focus:outline-none focus:border-brand-orange text-brand-text-dark"
              placeholder="Örn: Bebek Mevlidi"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2 font-sans">
              Kart Görsel Seçimi
            </label>
            <div className="flex gap-6 p-4 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl">
              <label className="flex items-center gap-2 font-sans text-sm text-brand-text-dark cursor-pointer">
                <input
                  type="radio"
                  name="image_type"
                  value="emoji"
                  checked={formData.image_type === "emoji"}
                  onChange={() => setFormData({ ...formData, image_type: "emoji" })}
                  className="text-brand-orange focus:ring-brand-orange"
                />
                Emoji Kullan
              </label>
              <label className="flex items-center gap-2 font-sans text-sm text-brand-text-dark cursor-pointer">
                <input
                  type="radio"
                  name="image_type"
                  value="image"
                  checked={formData.image_type === "image"}
                  onChange={() => setFormData({ ...formData, image_type: "image" })}
                  className="text-brand-orange focus:ring-brand-orange"
                />
                Fotoğraf Yükle
              </label>
            </div>
          </div>

          {formData.image_type === "emoji" ? (
            <div>
              <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2 font-sans">
                Emoji İkonu
              </label>
              <input
                type="text"
                value={formData.emoji}
                onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm font-sans focus:outline-none focus:border-brand-orange text-brand-text-dark"
                placeholder="Örn: 👶"
                maxLength={4}
              />
            </div>
          ) : (
            <div className="sm:col-span-2">
              <CloudinaryUpload
                images={formData.image_url ? [formData.image_url] : []}
                onChange={(newImages) => setFormData({ ...formData, image_url: newImages[0] || null })}
                maxImages={1}
                label="Koleksiyon Kart Görseli"
                folder="categories"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2 font-sans">
              Sıralama Önceliği
            </label>
            <input
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm font-sans focus:outline-none focus:border-brand-orange text-brand-text-dark"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2 font-sans">
            Koleksiyon Açıklaması
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm font-sans focus:outline-none focus:border-brand-orange text-brand-text-dark resize-none"
            placeholder="Koleksiyona dair kısa bir tanıtım metni..."
          />
        </div>

        <CloudinaryUpload
          images={formData.banner_image ? [formData.banner_image] : []}
          onChange={(newImages) => setFormData({ ...formData, banner_image: newImages[0] || null })}
          maxImages={1}
          label="Koleksiyon Banner Görseli"
          folder="categories"
        />

        <div className="flex items-center gap-4 pt-4 border-t border-[#dcdcd9]">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-brand-orange text-white font-semibold rounded-full shadow-md shadow-brand-orange/15 hover:bg-brand-orange/90 transition-all font-sans cursor-pointer disabled:opacity-50 text-center"
          >
            {isSubmitting ? "Kaydediliyor..." : "Koleksiyonu Kaydet"}
          </button>
          <Link
            href="/admin/kategoriler"
            className="px-6 py-3 border border-[#dcdcd9] text-brand-text-mid font-semibold rounded-full hover:bg-gray-50 transition-all font-sans text-center"
          >
            İptal
          </Link>
        </div>
      </form>
    </div>
  );
}
