"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, Save, AlertCircle } from "lucide-react";
import CloudinaryUpload from "@/components/admin/CloudinaryUpload";

export default function SettingsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    hero_badge: "",
    hero_title: "",
    hero_description: "",
    hero_image: "",
    about_badge: "",
    about_title: "",
    about_text_1: "",
    about_text_2: "",
    about_quote: "",
    about_image: "",
    contact_phone: "",
    testimonial_image: "",
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (!res.ok) throw new Error("Ayarlar yüklenemedi.");
        const data = await res.json();
        setFormData({
          hero_badge: data.hero_badge || "",
          hero_title: data.hero_title || "",
          hero_description: data.hero_description || "",
          hero_image: data.hero_image || "",
          about_badge: data.about_badge || "",
          about_title: data.about_title || "",
          about_text_1: data.about_text_1 || "",
          about_text_2: data.about_text_2 || "",
          about_quote: data.about_quote || "",
          about_image: data.about_image || "",
          contact_phone: data.contact_phone || "",
          testimonial_image: data.testimonial_image || "",
        });
      } catch (err) {
        console.error(err);
        setError("Ayarlar yüklenirken bir hata oluştu.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Ayarlar kaydedilemedi.");
      }

      setSuccessMsg("İçerik ayarları başarıyla güncellendi.");
      router.refresh();
      setTimeout(() => {
        setSuccessMsg(null);
      }, 3000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Kaydetme sırasında bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center font-sans text-brand-text-mid">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#ff914b] border-t-transparent mb-3" />
          <p className="font-semibold text-sm">Ayarlar yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-text-dark flex items-center gap-2">
            Ana Sayfa İçerik Yönetimi <Settings className="text-brand-orange-dark" size={24} />
          </h1>
          <p className="text-sm text-brand-text-mid mt-0.5 font-sans">
            Kodun içindeki sabit metinleri (Hero sloganı, Hakkımızda hikayesi vb.) buradan güncelleyin.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white font-semibold rounded-full shadow-md shadow-brand-orange/15 hover:bg-brand-orange/90 active:scale-[0.99] transition-all font-sans cursor-pointer text-sm w-full sm:w-auto"
        >
          <Save size={18} />
          <span>{isSubmitting ? "Kaydediliyor..." : "Ayarları Kaydet"}</span>
        </button>
      </div>

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

      <form onSubmit={handleSubmit} className="space-y-8 font-sans">
        {/* HERO SECTION SETTINGS */}
        <div className="bg-white border border-[#dcdcd9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold text-brand-text-dark border-b border-gray-100 pb-3">
            1. Karşılama (Hero) Alanı
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2">
                Rozet Yazısı (Badge Text)
              </label>
              <input
                type="text"
                value={formData.hero_badge}
                onChange={(e) => setFormData({ ...formData, hero_badge: e.target.value })}
                className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm focus:outline-none focus:border-brand-orange text-brand-text-dark"
                placeholder="Örn: ÖZEL TASARIM • EL YAPIMI • HATIRLIK"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2">
                Ana Başlık (Title)
              </label>
              <textarea
                value={formData.hero_title}
                onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm focus:outline-none focus:border-brand-orange text-brand-text-dark resize-none"
                placeholder="Yeni satır için Enter tuşuna basabilirsiniz..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2">
                Alt Açıklama (Description)
              </label>
              <textarea
                value={formData.hero_description}
                onChange={(e) => setFormData({ ...formData, hero_description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm focus:outline-none focus:border-brand-orange text-brand-text-dark resize-none"
                placeholder="Karşılama alanında görünecek kısa tanıtım metni..."
              />
            </div>

            <div className="pt-2">
              <CloudinaryUpload
                images={formData.hero_image ? [formData.hero_image] : []}
                onChange={(newImages) => setFormData({ ...formData, hero_image: newImages[0] || "" })}
                maxImages={1}
                label="Giriş Banner Arka Plan Görseli"
                folder="site"
              />
            </div>
          </div>
        </div>

        {/* ABOUT SECTION SETTINGS */}
        <div className="bg-white border border-[#dcdcd9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold text-brand-text-dark border-b border-gray-100 pb-3">
            2. Hakkımızda (About) Alanı
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2">
                Bölüm Başlığı (Badge)
              </label>
              <input
                type="text"
                value={formData.about_badge}
                onChange={(e) => setFormData({ ...formData, about_badge: e.target.value })}
                className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm focus:outline-none focus:border-brand-orange text-brand-text-dark"
                placeholder="Örn: HAKKIMIZDA"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2">
                Büyük Slogan Başlık
              </label>
              <input
                type="text"
                value={formData.about_title}
                onChange={(e) => setFormData({ ...formData, about_title: e.target.value })}
                className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm focus:outline-none focus:border-brand-orange text-brand-text-dark"
                placeholder="Örn: Detaylar önemlidir. Biz buna inanıyoruz."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2">
                Hakkımızda Metni - Paragraf 1
              </label>
              <textarea
                value={formData.about_text_1}
                onChange={(e) => setFormData({ ...formData, about_text_1: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm focus:outline-none focus:border-brand-orange text-brand-text-dark resize-none"
                placeholder="Hikayenizin ilk paragrafı..."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2">
                Hakkımızda Metni - Paragraf 2
              </label>
              <textarea
                value={formData.about_text_2}
                onChange={(e) => setFormData({ ...formData, about_text_2: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm focus:outline-none focus:border-brand-orange text-brand-text-dark resize-none"
                placeholder="Hikayenizin ikinci paragrafı..."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2">
                Eğik Alıntı Cümlesi (Italic Quote)
              </label>
              <input
                type="text"
                value={formData.about_quote}
                onChange={(e) => setFormData({ ...formData, about_quote: e.target.value })}
                className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm focus:outline-none focus:border-brand-orange text-brand-text-dark"
                placeholder="Örn: Her hediyelik bir sanat eseri, her kutlama bir anı."
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <CloudinaryUpload
                images={formData.about_image ? [formData.about_image] : []}
                onChange={(newImages) => setFormData({ ...formData, about_image: newImages[0] || "" })}
                maxImages={1}
                label="Hakkımızda Görseli"
                folder="site"
              />
            </div>
          </div>
        </div>

        {/* TESTIMONIALS SECTION SETTINGS */}
        <div className="bg-white border border-[#dcdcd9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold text-brand-text-dark border-b border-gray-100 pb-3">
            3. Yorumlar (Testimonials) Alanı
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="pt-2">
              <CloudinaryUpload
                images={formData.testimonial_image ? [formData.testimonial_image] : []}
                onChange={(newImages) => setFormData({ ...formData, testimonial_image: newImages[0] || "" })}
                maxImages={1}
                label="Yorum Alanı Yan Görseli"
                folder="site"
              />
            </div>
          </div>
        </div>

        {/* OTHER SETTINGS */}
        <div className="bg-white border border-[#dcdcd9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold text-brand-text-dark border-b border-gray-100 pb-3">
            4. İletişim Bilgileri
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-xs font-semibold text-brand-text-dark uppercase tracking-wider mb-2">
                WhatsApp Sipariş Numarası (Sitedeki Butonları Yönlendirir)
              </label>
              <input
                type="text"
                value={formData.contact_phone}
                onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                className="w-full px-4 py-3 bg-[#fbf7f0] border border-[#dcdcd9] rounded-2xl text-sm focus:outline-none focus:border-brand-orange text-brand-text-dark"
                placeholder="Örn: 905555555555"
              />
              <p className="text-[11px] text-brand-text-mid mt-1.5">
                * Numarayı başında ülke kodu (Türkiye için 90) olacak şekilde rakamlardan oluşacak biçimde yazın (örn: 905051234567). Boş bırakılırsa <code>NEXT_PUBLIC_WHATSAPP_NUMBER</code> ortam değişkeni kullanılır.
              </p>
            </div>
          </div>
        </div>

        {/* Save Button Bar */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 sm:flex-none px-8 py-3.5 bg-brand-orange text-white font-semibold rounded-full shadow-md shadow-brand-orange/15 hover:bg-brand-orange/90 transition-all font-sans cursor-pointer disabled:opacity-50 text-center"
          >
            {isSubmitting ? "Kaydediliyor..." : "Ayarları Kaydet"}
          </button>
        </div>
      </form>
    </div>
  );
}
