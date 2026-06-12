"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Package, Eye, Tag, PlusCircle, AlertCircle } from "lucide-react";
import ProductTable from "@/components/admin/ProductTable";
import { ProductWithCategory, Category } from "@/lib/db-queries";

export default function AdminDashboard() {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verileri çekme fonksiyonu
  const fetchData = useCallback(async () => {
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
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Veritabanı bağlantısı kurulamadı veya veriler yüklenemedi.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Toplam İstatistikler
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.is_active === 1).length;
  const totalCategories = categories.length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center font-sans text-brand-text-mid">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#ff914b] border-t-transparent mb-3" />
          <p className="font-semibold text-sm">Yönetim paneli yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-[#dcdcd9] rounded-3xl p-8 shadow-sm max-w-lg mx-auto text-center mt-12">
        <AlertCircle className="mx-auto text-brand-orange-dark mb-4" size={48} />
        <h2 className="font-serif text-xl font-bold text-brand-text-dark mb-2">
          Veri Yükleme Hatası
        </h2>
        <p className="text-sm text-brand-text-mid mb-6 font-sans leading-relaxed">
          {error}
        </p>
        <button
          onClick={fetchData}
          className="px-6 py-2.5 bg-brand-orange text-white font-semibold rounded-full hover:bg-brand-orange/90 transition-all font-sans cursor-pointer"
        >
          Yeniden Dene
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Upper Info Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-text-dark">
            Kontrol Paneli
          </h1>
          <p className="text-sm text-brand-text-mid mt-0.5 font-sans">
            Portakal Çiçeği Atölye katalog ve ürün verilerini buradan yönetin.
          </p>
        </div>

        {/* Quick Action Button */}
        <Link
          href="/admin/urun-ekle"
          className="flex items-center gap-2 px-6 py-3 bg-brand-orange text-white font-semibold rounded-full shadow-md shadow-brand-orange/15 hover:bg-brand-orange/90 hover:scale-[1.01] active:scale-[0.99] transition-all font-sans"
        >
          <PlusCircle size={18} />
          <span>Yeni Ürün Ekle</span>
        </Link>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Products Card */}
        <div className="bg-white border border-[#dcdcd9] rounded-3xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-brand-orange flex items-center justify-center">
            <Package size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-brand-text-mid uppercase tracking-wider font-sans">
              Toplam Ürün
            </p>
            <h3 className="text-2xl font-bold text-brand-text-dark font-sans mt-0.5">
              {totalProducts} adet
            </h3>
          </div>
        </div>

        {/* Active Products Card */}
        <div className="bg-white border border-[#dcdcd9] rounded-3xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Eye size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-brand-text-mid uppercase tracking-wider font-sans">
              Yayındaki Ürünler
            </p>
            <h3 className="text-2xl font-bold text-brand-text-dark font-sans mt-0.5">
              {activeProducts} adet
            </h3>
          </div>
        </div>

        {/* Categories Card */}
        <div className="bg-white border border-[#dcdcd9] rounded-3xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Tag size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-brand-text-mid uppercase tracking-wider font-sans">
              Kategori Sayısı
            </p>
            <h3 className="text-2xl font-bold text-brand-text-dark font-sans mt-0.5">
              {totalCategories} kategori
            </h3>
          </div>
        </div>
      </div>

      {/* Main Catalog Table */}
      <ProductTable
        products={products}
        categories={categories}
        onRefresh={fetchData}
      />
    </div>
  );
}
