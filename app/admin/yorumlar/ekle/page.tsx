"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import CloudinaryUpload from "@/components/admin/CloudinaryUpload";

export default function TestimonialEklePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    text: "",
    avatar: null as string | null,
    display_order: 0,
    is_active: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim()) {
      alert("Lütfen müşteri adı ve yorum metni alanlarını doldurun.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Yorum eklenemedi.");
      }

      router.push("/admin/yorumlar");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "İşlem sırasında bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href="/admin/yorumlar"
          className="p-2 hover:bg-gray-100 rounded-full transition-all text-brand-text-mid"
        >
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-text-dark">
            Yeni Yorum Ekle
          </h1>
          <p className="text-sm text-brand-text-mid mt-0.5 font-sans">
            Müşterinizin fotoğrafını ve yorum yazısını buraya girin.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm font-sans max-w-2xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white border border-[#dcdcd9] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2 font-sans">
              Müşteri / Çift Adı *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm font-sans focus:outline-none focus:border-brand-orange text-brand-text-dark"
              placeholder="Örn: Selin & Ahmet"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2 font-sans">
            Yorum Metni *
          </label>
          <textarea
            required
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            rows={5}
            className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm font-sans focus:outline-none focus:border-brand-orange text-brand-text-dark resize-none"
            placeholder="Müşterinizin yorumunu buraya yazın..."
          />
        </div>

        <CloudinaryUpload
          images={formData.avatar ? [formData.avatar] : []}
          onChange={(newImages) => setFormData({ ...formData, avatar: newImages[0] || null })}
          maxImages={1}
          label="Müşteri Fotoğrafı"
          folder="testimonials"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#dcdcd9]">
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

          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active === 1}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })}
              className="w-5 h-5 accent-brand-orange border border-[#dcdcd9] rounded cursor-pointer"
            />
            <label htmlFor="is_active" className="text-sm font-semibold text-brand-text-dark font-sans cursor-pointer select-none">
              Yorum yayında olsun (Aktif)
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-brand-orange text-white font-semibold rounded-full shadow-md shadow-brand-orange/15 hover:bg-brand-orange/90 transition-all font-sans cursor-pointer disabled:opacity-50 text-center"
          >
            {isSubmitting ? "Kaydediliyor..." : "Yorumu Kaydet"}
          </button>
          <Link
            href="/admin/yorumlar"
            className="px-6 py-3 border border-[#dcdcd9] text-brand-text-mid font-semibold rounded-full hover:bg-gray-50 transition-all font-sans text-center"
          >
            İptal
          </Link>
        </div>
      </form>
    </div>
  );
}
