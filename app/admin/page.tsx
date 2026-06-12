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

  // Görseli bulunmayan (kapak görseli veya tüm görsel listesi boş olan) ürünler
  const missingImageProducts = products.filter(
    (p) => !p.cover_image || p.cover_image.trim() === "" || p.images.length === 0
  );
  const totalMissingImages = missingImageProducts.length;

  // En çok görüntülenen ilk 5 ürün
  const topViewedProducts = [...products]
    .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
    .slice(0, 5);

  // Son eklenen ilk 5 ürün
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  // Kategori dağılımı verilerini hesapla
  const categoryCounts = categories.map((cat) => {
    const count = products.filter((p) => p.category_id === cat.id).length;
    return {
      name: cat.name,
      emoji: cat.emoji || "🎁",
      count,
    };
  });

  const maxProductCount = Math.max(...categoryCounts.map((c) => c.count), 1);

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
          className="px-6 py-2.5 bg-[#ff914b] text-white font-semibold rounded-full hover:bg-[#ff914b]/90 transition-all font-sans cursor-pointer"
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

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/sirala"
            className="flex items-center gap-2 px-5 py-3 bg-[#fbf7f0] border border-[#ff914b] text-[#ff914b] font-semibold rounded-full hover:bg-[#ff914b] hover:text-white transition-all font-sans text-sm"
          >
            Sıralamayı Düzenle
          </Link>
          <Link
            href="/admin/urun-ekle"
            className="flex items-center gap-2 px-6 py-3 bg-[#ff914b] text-white font-semibold rounded-full shadow-md shadow-brand-orange/15 hover:bg-[#ff914b]/90 hover:scale-[1.01] active:scale-[0.99] transition-all font-sans text-sm"
          >
            <PlusCircle size={18} />
            <span>Yeni Ürün Ekle</span>
          </Link>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products Card */}
        <div className="bg-white border border-[#dcdcd9] rounded-3xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#ff914b] flex items-center justify-center">
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
              Koleksiyon Sayısı
            </p>
            <h3 className="text-2xl font-bold text-brand-text-dark font-sans mt-0.5">
              {totalCategories} kategori
            </h3>
          </div>
        </div>

        {/* Warnings / Image Status Card */}
        <div className={`bg-white border rounded-3xl p-6 shadow-sm flex items-center gap-4 ${
          totalMissingImages > 0 ? "border-red-200" : "border-[#dcdcd9]"
        }`}>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            totalMissingImages > 0 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
          }`}>
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-brand-text-mid uppercase tracking-wider font-sans">
              Görsel Uyarısı
            </p>
            <h3 className={`text-2xl font-bold font-sans mt-0.5 ${
              totalMissingImages > 0 ? "text-red-600" : "text-brand-text-dark"
            }`}>
              {totalMissingImages > 0 ? `${totalMissingImages} ürün eksik` : "Sorun yok"}
            </h3>
          </div>
        </div>
      </div>

      {/* Expanded Stats Section: Lists & horizontal chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Lists */}
        <div className="space-y-8">
          
          {/* Top Viewed Products */}
          <div className="bg-white border border-[#dcdcd9] rounded-3xl p-6 shadow-sm">
            <h2 className="font-serif text-lg font-bold text-brand-text-dark mb-4 flex items-center gap-2">
              <span className="text-[#ff914b]">📈</span> En Çok Görüntülenen Ürünler
            </h2>
            <div className="space-y-3 font-sans">
              {topViewedProducts.length > 0 ? (
                topViewedProducts.map((p, idx) => (
                  <div key={p.id} className="flex items-center justify-between text-sm py-1.5 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-brand-text-mid w-4">#{idx + 1}</span>
                      <span className="font-semibold text-brand-text-dark line-clamp-1">{p.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-brand-text-mid">{p.category_emoji} {p.category_name}</span>
                      <span className="bg-amber-50 text-[#ff914b] font-bold px-2 py-0.5 rounded-full">
                        {p.view_count || 0} izlenme
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-brand-text-mid py-2">Görüntüleme verisi bulunmuyor.</p>
              )}
            </div>
          </div>

          {/* Recently Added Products */}
          <div className="bg-white border border-[#dcdcd9] rounded-3xl p-6 shadow-sm">
            <h2 className="font-serif text-lg font-bold text-brand-text-dark mb-4 flex items-center gap-2">
              <span className="text-[#ff914b]">🆕</span> Son Eklenen 5 Ürün
            </h2>
            <div className="space-y-3 font-sans">
              {recentProducts.length > 0 ? (
                recentProducts.map((p) => {
                  const dateStr = new Date(p.created_at).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  });
                  return (
                    <div key={p.id} className="flex items-center justify-between text-sm py-1.5 border-b border-gray-100 last:border-0">
                      <span className="font-semibold text-brand-text-dark line-clamp-1">{p.name}</span>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-brand-text-mid">{p.category_emoji} {p.category_name}</span>
                        <span className="text-brand-text-mid bg-[#fbf7f0] border border-[#dcdcd9] px-2 py-0.5 rounded-full">
                          {dateStr}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-brand-text-mid py-2">Henüz ürün eklenmemiş.</p>
              )}
            </div>
          </div>

          {/* Missing Images List Warning (Collapsible/Conditional) */}
          {totalMissingImages > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-3xl p-6">
              <h2 className="font-serif text-sm font-bold text-red-800 mb-3 flex items-center gap-1.5">
                ⚠️ Görsel Yüklenmemiş Ürünler
              </h2>
              <div className="max-h-36 overflow-y-auto space-y-1.5 font-sans">
                {missingImageProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-xs text-red-700 py-1 border-b border-red-100 last:border-0">
                    <span className="font-semibold">{p.name}</span>
                    <span className="text-[10px] bg-red-100 px-2 py-0.5 rounded-full">{p.category_name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Category Distribution Bar Chart */}
        <div className="bg-white border border-[#dcdcd9] rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-brand-text-dark mb-4">
              Kategoriye Göre Ürün Dağılımı
            </h2>
            
            <div className="space-y-5 py-2">
              {categoryCounts.map((c) => {
                const percentage = totalProducts > 0 ? (c.count / maxProductCount) * 100 : 0;
                
                return (
                  <div key={c.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold font-sans">
                      <span className="text-brand-text-dark flex items-center gap-1.5">
                        <span className="text-sm">{c.emoji}</span> {c.name}
                      </span>
                      <span className="text-brand-text-mid font-bold">{c.count} ürün</span>
                    </div>
                    {/* Horizontal Bar */}
                    <div className="w-full bg-[#fbf7f0] h-3 rounded-full overflow-hidden border border-[#eaeaea]">
                      <div
                        className="bg-[#ff914b] h-full rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 text-[11px] text-brand-text-mid font-sans leading-relaxed">
            * Grafikteki çubukların uzunluğu, en çok ürün barındıran kategoriye göre orantılandırılmıştır.
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
