"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function KategoriDuzenlePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params.id;

  const [formData, setFormData] = useState({
    name: "",
    emoji: "",
    description: "",
    display_order: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/admin/categories/${id}`);
        if (!res.ok) throw new Error("Koleksiyon bilgileri yüklenemedi.");
        const data = await res.json();
        setFormData({
          name: data.name || "",
          emoji: data.emoji || "",
          description: data.description || "",
          display_order: data.display_order || 0,
        });
      } catch (err: any) {
        console.error(err);
        setError("Koleksiyon bilgileri alınırken hata oluştu.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Lütfen koleksiyon adını girin.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Koleksiyon güncellenemedi.");
      }

      router.push("/admin/kategoriler");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Güncelleme sırasında bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#ff914b] border-t-transparent mb-3" />
      </div>
    );
  }

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
            Koleksiyonu Düzenle
          </h1>
          <p className="text-sm text-brand-text-mid mt-0.5 font-sans">
            Koleksiyon bilgilerini güncelleyin.
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

        <div className="flex items-center gap-4 pt-4 border-t border-[#dcdcd9]">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-brand-orange text-white font-semibold rounded-full shadow-md shadow-brand-orange/15 hover:bg-brand-orange/90 transition-all font-sans cursor-pointer disabled:opacity-50 text-center"
          >
            {isSubmitting ? "Kaydediliyor..." : "Koleksiyonu Güncelle"}
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
