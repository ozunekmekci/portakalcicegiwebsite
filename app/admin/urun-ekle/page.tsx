"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";
import { Category } from "@/lib/db-queries";

export default function UrunEklePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/admin/categories");
        if (!res.ok) throw new Error("Kategoriler yüklenemedi.");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("Kategoriler yüklenirken bir hata oluştu.");
      } finally {
        setIsLoading(false);
      }
    }
    loadCategories();
  }, []);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ürün eklenemedi.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Kaydetme sırasında bir hata oluştu.");
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
          href="/admin"
          className="p-2 hover:bg-gray-100 rounded-full transition-all text-brand-text-mid"
        >
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-text-dark">
            Yeni Ürün Ekle
          </h1>
          <p className="text-sm text-brand-text-mid mt-0.5 font-sans">
            Kataloğunuz için yeni bir ürün tanımlayın.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm font-sans">
          {error}
        </div>
      )}

      <ProductForm
        categories={categories}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
