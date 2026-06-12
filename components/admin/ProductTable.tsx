"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit2, Trash2, Eye, EyeOff, Filter } from "lucide-react";
import { ProductWithCategory, Category } from "@/lib/db-queries";
import { getOptimizedUrl } from "@/lib/cloudinary";

interface ProductTableProps {
  products: ProductWithCategory[];
  categories: Category[];
  onRefresh: () => void;
}

export default function ProductTable({ products, categories, onRefresh }: ProductTableProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [actionId, setActionId] = useState<number | null>(null);

  // Kategori filtresi uygula
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category_slug === selectedCategory;
  });

  const handleToggleActive = async (id: number, currentStatus: number) => {
    setActionId(id);
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: newStatus }),
      });

      if (res.ok) {
        onRefresh();
      } else {
        alert("Ürün durumu güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Toggle active error:", error);
      alert("Bağlantı hatası oluştu.");
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`"${name}" isimli ürünü silmek istediğinize emin misiniz?`)) {
      return;
    }

    setActionId(id);

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onRefresh();
      } else {
        alert("Ürün silinirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Delete product error:", error);
      alert("Bağlantı hatası oluştu.");
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="bg-white border border-[#dcdcd9] rounded-3xl p-6 shadow-sm">
      {/* Table Header / Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-serif text-xl font-bold text-brand-text-dark">
            Katalog Listesi
          </h2>
          <p className="text-xs text-brand-text-mid font-sans mt-0.5">
            Eklenen tüm ürünleri buradan yönetebilirsiniz.
          </p>
        </div>

        {/* Category Filter Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={18} className="text-brand-text-mid" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-grow sm:flex-grow-0 px-3 py-2 bg-[#fbf7f0] border border-[#dcdcd9] rounded-xl text-sm font-sans text-brand-text-dark focus:outline-none focus:border-[#ff914b] focus:ring-1 focus:ring-[#ff914b] transition-all cursor-pointer font-semibold"
          >
            <option value="all">Tüm Kategoriler</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.emoji} {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-sans text-sm">
          <thead>
            <tr className="border-b border-[#dcdcd9] text-brand-text-mid font-semibold text-xs uppercase tracking-wider">
              <th className="pb-3 w-16 text-center">Görsel</th>
              <th className="pb-3 px-4">Ürün Adı</th>
              <th className="pb-3 px-4">Kategori</th>
              <th className="pb-3 px-4">Min Sipariş</th>
              <th className="pb-3 px-4">Fiyat Aralığı</th>
              <th className="pb-3 px-4 w-28 text-center">Durum</th>
              <th className="pb-3 w-28 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, idx) => {
                const coverImageSrc = product.cover_image
                  ? getOptimizedUrl(product.cover_image, { width: 100, height: 100 })
                  : null;

                return (
                  <tr
                    key={product.id}
                    className={`border-b border-gray-100 hover:bg-[#fbf7f0]/40 transition-colors ${
                      idx % 2 === 1 ? "bg-gray-50/30" : ""
                    }`}
                  >
                    {/* Cover Image / Fallback Emoji */}
                    <td className="py-3 text-center">
                      <div className="relative w-10 h-10 mx-auto bg-[#fbf7f0] border border-gray-100 rounded-xl overflow-hidden flex items-center justify-center text-xl">
                        {coverImageSrc ? (
                          <Image
                            src={coverImageSrc}
                            alt={product.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <span>{product.category_emoji || "🎁"}</span>
                        )}
                      </div>
                    </td>

                    {/* Product Name */}
                    <td className="py-3 px-4 font-semibold text-brand-text-dark">
                      {product.name}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-brand-text-mid font-medium">
                      {product.category_emoji} {product.category_name}
                    </td>

                    {/* Min Order */}
                    <td className="py-3 px-4 text-brand-text-mid">
                      {product.min_order} adet
                    </td>

                    {/* Price Range */}
                    <td className="py-3 px-4 text-brand-orange font-semibold">
                      {product.price_range || "Belirtilmedi"}
                    </td>

                    {/* Status Toggle Switch */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(product.id, product.is_active)}
                        disabled={actionId === product.id}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          product.is_active === 1
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                        }`}
                      >
                        {product.is_active === 1 ? (
                          <>
                            <Eye size={12} />
                            <span>Yayında</span>
                          </>
                        ) : (
                          <>
                            <EyeOff size={12} />
                            <span>Taslak</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Edit & Delete Actions */}
                    <td className="py-3 text-right space-x-1.5">
                      <Link
                        href={`/admin/urun-duzenle/${product.id}`}
                        className="inline-flex p-2 text-brand-text-mid hover:text-brand-orange hover:bg-brand-orange/5 rounded-full transition-all"
                        title="Düzenle"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        disabled={actionId === product.id}
                        className="inline-flex p-2 text-brand-text-mid hover:text-brand-orange-dark hover:bg-red-50 rounded-full transition-all disabled:opacity-50 cursor-pointer"
                        title="Sil"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-10 text-brand-text-mid">
                  Katalogda henüz ürün bulunmuyor.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
