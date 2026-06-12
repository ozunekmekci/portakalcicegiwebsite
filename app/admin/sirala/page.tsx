"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, Move, Save, ArrowUpDown } from "lucide-react";
import { ProductWithCategory, Category } from "@/lib/db-queries";
import { getOptimizedUrl } from "@/lib/cloudinary";

export default function ProductReorderPage() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<ProductWithCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Verileri yükle
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/admin/categories"),
      ]);

      if (!productsRes.ok || !categoriesRes.ok) {
        throw new Error("Veriler yüklenirken bir sorun oluştu.");
      }

      const [productsData, categoriesData] = await Promise.all([
        productsRes.json(),
        categoriesRes.json(),
      ]);

      setProducts(productsData);
      setCategories(categoriesData);

      // İlk kategoriyi seçili yap
      if (categoriesData.length > 0) {
        setSelectedCategory(categoriesData[0].slug);
      }
    } catch (err) {
      console.error(err);
      setError("Veritabanı bağlantısı kurulamadı veya veriler yüklenemedi.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Kategori veya ürünler değiştiğinde filtrele
  useEffect(() => {
    if (selectedCategory) {
      const filtered = products
        .filter((p) => p.category_slug === selectedCategory)
        .sort((a, b) => a.display_order - b.display_order);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategory, products]);

  // DRAG & DROP HANDLERS (Native HTML5)
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // drag görüntüsünü özelleştirmek için veri atayabiliriz
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const reordered = [...filteredProducts];
    const draggedItem = reordered[draggedIndex];
    
    // Elemanı listeden çıkar ve yeni yerine koy
    reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, draggedItem);

    setFilteredProducts(reordered);
    setDraggedIndex(null);
  };

  const handleSaveOrder = async () => {
    setIsSaving(true);
    setError(null);
    setSuccessMsg(null);

    // Yeni display_order değerlerini ata (1'den başlayarak sırala)
    const payload = filteredProducts.map((p, idx) => ({
      id: p.id,
      display_order: idx + 1,
    }));

    try {
      const res = await fetch("/api/admin/products/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: payload }),
      });

      if (!res.ok) {
        throw new Error("Sıralama kaydedilemedi.");
      }

      setSuccessMsg("Ürün sıralaması başarıyla kaydedildi.");
      // State'i güncellemek için ürünleri yeniden çek
      const productsRes = await fetch("/api/admin/products");
      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData);
      }
      
      setTimeout(() => {
        setSuccessMsg(null);
      }, 3000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Kaydetme sırasında bir hata oluştu.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center font-sans text-brand-text-mid">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#ff914b] border-t-transparent mb-3" />
          <p className="font-semibold text-sm">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="p-2 hover:bg-gray-100 rounded-full transition-all text-brand-text-mid"
          >
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 className="font-serif text-3xl font-bold text-brand-text-dark flex items-center gap-2">
              Ürün Sıralama <ArrowUpDown className="text-brand-orange-dark" size={24} />
            </h1>
            <p className="text-sm text-brand-text-mid mt-0.5 font-sans">
              Koleksiyon sayfalarında ürünlerin hangi sırada görüneceğini sürükle bırakla düzenleyin.
            </p>
          </div>
        </div>

        <button
          onClick={handleSaveOrder}
          disabled={isSaving || filteredProducts.length === 0}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white font-semibold rounded-full shadow-md shadow-brand-orange/15 hover:bg-brand-orange/90 active:scale-[0.99] disabled:opacity-50 transition-all font-sans cursor-pointer text-sm w-full sm:w-auto"
        >
          <Save size={18} />
          <span>{isSaving ? "Kaydediliyor..." : "Sıralamayı Kaydet"}</span>
        </button>
      </div>

      {/* Message Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm font-sans">
          {error}
        </div>
      )}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl text-sm font-sans">
          {successMsg}
        </div>
      )}

      {/* Main Board */}
      <div className="bg-white border border-[#dcdcd9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Category Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="text-sm font-bold text-brand-text-dark font-sans uppercase tracking-wider">
            Koleksiyon Seç:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 bg-[#fbf7f0] border border-[#dcdcd9] rounded-xl text-sm font-semibold font-sans text-brand-text-dark focus:outline-none focus:border-[#ff914b] cursor-pointer min-w-[200px]"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.emoji} {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Draggable List */}
        {filteredProducts.length > 0 ? (
          <div className="space-y-3 max-w-xl font-sans">
            {filteredProducts.map((product, idx) => {
              const coverImageSrc = product.cover_image
                ? getOptimizedUrl(product.cover_image, { width: 100, height: 100 })
                : null;
              
              const isDragOver = dragOverIndex === idx;

              return (
                <div
                  key={product.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, idx)}
                  className={`flex items-center justify-between p-4 bg-[#fbf7f0]/40 border rounded-2xl cursor-grab active:cursor-grabbing hover:bg-[#fbf7f0]/85 transition-all duration-150 ${
                    isDragOver 
                      ? "border-brand-orange bg-[#ff914b]/10 scale-[1.01]" 
                      : "border-[#dcdcd9]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Drag Handle Icon */}
                    <div className="text-[#dcdcd9] hover:text-brand-orange transition-colors">
                      <Move size={18} />
                    </div>

                    {/* Badge Number */}
                    <span className="text-xs font-bold text-brand-text-mid bg-white border border-[#dcdcd9] w-6 h-6 flex items-center justify-center rounded-full">
                      {idx + 1}
                    </span>

                    {/* Image */}
                    <div className="relative w-12 h-12 bg-white border border-[#dcdcd9] rounded-xl overflow-hidden flex items-center justify-center text-2xl">
                      {coverImageSrc ? (
                        <Image
                          src={coverImageSrc}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <span>{product.category_emoji || "🎁"}</span>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <h4 className="font-bold text-brand-text-dark text-sm">{product.name}</h4>
                      <p className="text-[11px] text-brand-text-mid mt-0.5">
                        {product.price_range || "Fiyat aralığı girilmedi"}
                      </p>
                    </div>
                  </div>

                  {/* Active/Draft Status Badge */}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    product.is_active === 1 
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                  }`}>
                    {product.is_active === 1 ? "Yayında" : "Taslak"}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-[#dcdcd9] rounded-2xl text-brand-text-mid font-sans text-sm">
            Seçilen koleksiyonda sıralanacak ürün bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
}
