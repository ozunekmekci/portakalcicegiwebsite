"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";
import { Category, ProductWithCategory } from "@/lib/db-queries";

interface UrunDuzenlePageProps {
  params: {
    id: string;
  };
}

export default function UrunDuzenlePage({ params }: UrunDuzenlePageProps) {
  const router = useRouter();
  const productId = Number(params.id);

  const [product, setProduct] = useState<ProductWithCategory | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`/api/admin/products/${productId}`),
          fetch("/api/admin/categories"),
        ]);

        if (!prodRes.ok) throw new Error("Ürün bilgileri yüklenemedi.");
        if (!catRes.ok) throw new Error("Kategoriler yüklenemedi.");

        const prodData = await prodRes.json();
        const catData = await catRes.json();

        setProduct(prodData);
        setCategories(catData);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Veriler yüklenirken bir hata oluştu.");
      } finally {
        setIsLoading(false);
      }
    }
    if (productId) {
      loadData();
    }
  }, [productId]);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ürün güncellenemedi.");
      }

      router.push("/admin");
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

  if (!product && !isLoading) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm font-sans max-w-lg mx-auto text-center mt-12">
        Ürün bulunamadı veya geçersiz kimlik.
        <div className="mt-4">
          <Link href="/admin" className="text-brand-orange underline font-semibold">
            Panele Geri Dön
          </Link>
        </div>
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
            Ürünü Düzenle
          </h1>
          <p className="text-sm text-brand-text-mid mt-0.5 font-sans">
            &ldquo;{product?.name}&rdquo; ürün bilgilerini güncelleyin.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm font-sans">
          {error}
        </div>
      )}

      <ProductForm
        initialData={product || undefined}
        categories={categories}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
