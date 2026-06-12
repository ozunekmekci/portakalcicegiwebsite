"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { PlusCircle, Edit2, Trash2, Eye, EyeOff, MessageSquare, AlertCircle } from "lucide-react";
import { Testimonial } from "@/lib/db-queries";
import { getOptimizedUrl } from "@/lib/cloudinary";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<number | null>(null);

  const fetchTestimonials = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/testimonials");
      if (!res.ok) throw new Error("Yorumlar yüklenirken hata oluştu.");
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error(err);
      setError("Veritabanı bağlantısı kurulamadı veya veriler yüklenemedi.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleToggleActive = async (id: number, currentStatus: number) => {
    setActionId(id);
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: newStatus }),
      });

      if (res.ok) {
        fetchTestimonials();
      } else {
        alert("Yorum durumu güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Toggle active error:", error);
      alert("Bağlantı hatası oluştu.");
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`"${name}" isimli müşterinin yorumunu silmek istediğinize emin misiniz?`)) {
      return;
    }

    setActionId(id);

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchTestimonials();
      } else {
        alert("Yorum silinirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Delete testimonial error:", error);
      alert("Bağlantı hatası oluştu.");
    } finally {
      setActionId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center font-sans text-brand-text-mid">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#ff914b] border-t-transparent mb-3" />
          <p className="font-semibold text-sm">Müşteri yorumları yükleniyor...</p>
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
          onClick={fetchTestimonials}
          className="px-6 py-2.5 bg-[#ff914b] text-white font-semibold rounded-full hover:bg-[#ff914b]/90 transition-all font-sans cursor-pointer"
        >
          Yeniden Dene
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-text-dark flex items-center gap-2">
            Müşteri Yorumları Yönetimi
          </h1>
          <p className="text-sm text-brand-text-mid mt-0.5 font-sans">
            Müşterilerinizin yorumlarını ekleyin, düzenleyin ve ana sayfada yayınlayın.
          </p>
        </div>

        <Link
          href="/admin/yorumlar/ekle"
          className="flex items-center gap-2 px-6 py-3 bg-[#ff914b] text-white font-semibold rounded-full shadow-md shadow-brand-orange/15 hover:bg-[#ff914b]/90 hover:scale-[1.01] active:scale-[0.99] transition-all font-sans text-sm w-full sm:w-auto justify-center"
        >
          <PlusCircle size={18} />
          <span>Yeni Yorum Ekle</span>
        </Link>
      </div>

      {/* Main Testimonials Table */}
      <div className="bg-white border border-[#dcdcd9] rounded-3xl p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-sm">
            <thead>
              <tr className="border-b border-[#dcdcd9] text-brand-text-mid font-semibold text-xs uppercase tracking-wider">
                <th className="pb-3 w-16 text-center">Görsel</th>
                <th className="pb-3 px-4">Müşteri / Çift Adı</th>
                <th className="pb-3 px-4">Yorum Metni</th>
                <th className="pb-3 px-4 w-24 text-center">Sıralama</th>
                <th className="pb-3 px-4 w-28 text-center">Durum</th>
                <th className="pb-3 w-28 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.length > 0 ? (
                testimonials.map((t, idx) => {
                  const avatarSrc = t.avatar
                    ? getOptimizedUrl(t.avatar, { width: 100, height: 100 })
                    : null;

                  return (
                    <tr
                      key={t.id}
                      className={`border-b border-gray-100 hover:bg-[#fbf7f0]/40 transition-colors ${
                        idx % 2 === 1 ? "bg-gray-50/30" : ""
                      }`}
                    >
                      {/* Avatar image */}
                      <td className="py-3 text-center">
                        <div className="relative w-10 h-10 mx-auto bg-[#fbf7f0] border border-gray-100 rounded-full overflow-hidden flex items-center justify-center text-xl">
                          {avatarSrc ? (
                            <Image
                              src={avatarSrc}
                              alt={t.name}
                              fill
                              sizes="40px"
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <MessageSquare className="text-[#ff914b]" size={18} />
                          )}
                        </div>
                      </td>

                      {/* Name */}
                      <td className="py-3 px-4 font-semibold text-brand-text-dark">
                        {t.name}
                      </td>

                      {/* Text snippet */}
                      <td className="py-3 px-4 text-brand-text-mid max-w-xs truncate">
                        {t.text}
                      </td>

                      {/* Display order */}
                      <td className="py-3 px-4 text-center text-brand-text-mid">
                        {t.display_order}
                      </td>

                      {/* Status switch */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleToggleActive(t.id, t.is_active)}
                          disabled={actionId === t.id}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                            t.is_active === 1
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                              : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                          }`}
                        >
                          {t.is_active === 1 ? (
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
                          href={`/admin/yorumlar/duzenle/${t.id}`}
                          className="inline-flex p-2 text-brand-text-mid hover:text-brand-orange hover:bg-brand-orange/5 rounded-full transition-all"
                          title="Düzenle"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(t.id, t.name)}
                          disabled={actionId === t.id}
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
                  <td colSpan={6} className="text-center py-10 text-brand-text-mid">
                    Henüz müşteri yorumu eklenmemiş.
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
