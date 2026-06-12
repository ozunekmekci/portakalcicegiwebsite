"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Folder, PlusCircle, Edit2, Trash2, AlertCircle } from "lucide-react";
import { Category } from "@/lib/db-queries";

export default function KategorilerPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/categories");
      if (!res.ok) throw new Error("Koleksiyonlar yüklenemedi.");
      const data = await res.json();
      setCategories(data);
    } catch (err: any) {
      console.error(err);
      setError("Veriler yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    const confirmDelete = window.confirm(
      `"${name}" koleksiyonunu silmek istediğinize emin misiniz?\nDİKKAT: Bu koleksiyona ait TÜM ürünler otomatik olarak silinecektir!`
    );
    if (!confirmDelete) return;

    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Koleksiyon silinemedi.");
      }
      loadCategories();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Silme işlemi sırasında bir hata oluştu.");
    } finally {
      setIsDeleting(null);
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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-text-dark">
            Koleksiyon Yönetimi
          </h1>
          <p className="text-sm text-brand-text-mid mt-0.5 font-sans">
            Sitenizdeki ürün koleksiyonlarını (kategorilerini) buradan yönetin.
          </p>
        </div>

        <Link
          href="/admin/kategori-ekle"
          className="flex items-center gap-2 px-6 py-3 bg-brand-orange text-white font-semibold rounded-full shadow-md shadow-brand-orange/15 hover:bg-brand-orange/90 transition-all font-sans"
        >
          <PlusCircle size={18} />
          <span>Yeni Koleksiyon Ekle</span>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm font-sans flex items-center gap-2">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white border border-[#dcdcd9] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-[#fbf7f0] border-b border-[#dcdcd9]">
                <th className="px-6 py-4 text-xs font-semibold text-brand-text-dark uppercase tracking-wider">İkon</th>
                <th className="px-6 py-4 text-xs font-semibold text-brand-text-dark uppercase tracking-wider">Koleksiyon Adı</th>
                <th className="px-6 py-4 text-xs font-semibold text-brand-text-dark uppercase tracking-wider">Slug</th>
                <th className="px-6 py-4 text-xs font-semibold text-brand-text-dark uppercase tracking-wider">Açıklama</th>
                <th className="px-6 py-4 text-xs font-semibold text-brand-text-dark uppercase tracking-wider text-center">Öncelik</th>
                <th className="px-6 py-4 text-xs font-semibold text-brand-text-dark uppercase tracking-wider text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaeaea]">
              {categories.map((cat, idx) => (
                <tr key={cat.id} className={idx % 2 === 1 ? "bg-gray-50/50" : ""}>
                  <td className="px-6 py-4 text-xl">{cat.emoji || "🎁"}</td>
                  <td className="px-6 py-4 font-semibold text-brand-text-dark">{cat.name}</td>
                  <td className="px-6 py-4 text-sm text-brand-text-mid font-mono">{cat.slug}</td>
                  <td className="px-6 py-4 text-sm text-brand-text-mid max-w-xs truncate">{cat.description || "—"}</td>
                  <td className="px-6 py-4 text-sm text-brand-text-dark text-center">{cat.display_order}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/kategori-duzenle/${cat.id}`}
                        className="p-2 text-brand-text-mid hover:text-brand-orange hover:bg-gray-100 rounded-full transition-all"
                        title="Düzenle"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        disabled={isDeleting === cat.id}
                        className="p-2 text-brand-orange-dark hover:bg-red-50 rounded-full transition-all cursor-pointer disabled:opacity-50"
                        title="Sil"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-brand-text-mid text-sm">
                    Henüz hiç koleksiyon oluşturulmadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
