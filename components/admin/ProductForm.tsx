"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Category } from "@/lib/db-queries";
import CloudinaryUpload from "./CloudinaryUpload";

interface ProductFormProps {
  initialData?: {
    name: string;
    category_id: number;
    description: string | null;
    min_order: number;
    price_range: string | null;
    images: string[];
    is_active: number;
    display_order: number;
  };
  categories: Category[];
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
}

export default function ProductForm({
  initialData,
  categories,
  onSubmit,
  isSubmitting,
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    description: "",
    min_order: 1,
    price_range: "",
    images: [] as string[],
    is_active: 1,
    display_order: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        category_id: String(initialData.category_id),
        description: initialData.description || "",
        min_order: initialData.min_order ?? 1,
        price_range: initialData.price_range || "",
        images: initialData.images || [],
        is_active: initialData.is_active ?? 1,
        display_order: initialData.display_order ?? 0,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category_id) {
      alert("Lütfen ürün adı ve kategori alanlarını doldurun.");
      return;
    }
    onSubmit({
      ...formData,
      category_id: Number(formData.category_id),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white border border-[#dcdcd9] rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2 font-sans">
            Ürün Adı *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm font-sans focus:outline-none focus:border-brand-orange text-brand-text-dark"
            placeholder="Örn: Portakal Kokulu Mum"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2 font-sans">
            Kategori *
          </label>
          <select
            required
            value={formData.category_id}
            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm font-sans focus:outline-none focus:border-brand-orange text-brand-text-dark cursor-pointer"
          >
            <option value="">Kategori Seçiniz</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.emoji ? `${cat.emoji} ` : ""}{cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2 font-sans">
            Minimum Sipariş Adedi
          </label>
          <input
            type="number"
            min="1"
            value={formData.min_order}
            onChange={(e) => setFormData({ ...formData, min_order: parseInt(e.target.value) || 1 })}
            className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm font-sans focus:outline-none focus:border-brand-orange text-brand-text-dark"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2 font-sans">
            Fiyat Aralığı / Açıklaması
          </label>
          <input
            type="text"
            value={formData.price_range}
            onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
            className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm font-sans focus:outline-none focus:border-brand-orange text-brand-text-dark"
            placeholder="Örn: ₺45 - ₺65 / adet"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2 font-sans">
          Açıklama
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm font-sans focus:outline-none focus:border-brand-orange text-brand-text-dark resize-none"
          placeholder="Ürün detaylarını, koku/tasarım özelliklerini yazın..."
        />
      </div>

      <CloudinaryUpload
        images={formData.images}
        onChange={(newImages) => setFormData({ ...formData, images: newImages })}
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
            Ürün yayında olsun (Aktif)
          </label>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-brand-orange text-white font-semibold rounded-full shadow-md shadow-brand-orange/15 hover:bg-brand-orange/90 transition-all font-sans cursor-pointer disabled:opacity-50 text-center"
        >
          {isSubmitting ? "Kaydediliyor..." : "Ürünü Kaydet"}
        </button>
        <Link
          href="/admin"
          className="px-6 py-3 border border-[#dcdcd9] text-brand-text-mid font-semibold rounded-full hover:bg-gray-50 transition-all font-sans text-center animate-none"
        >
          İptal
        </Link>
      </div>
    </form>
  );
}
