import type { MetadataRoute } from "next";
import { getCategories, getProducts } from "@/lib/db-queries";
import { productGroups } from "@/content/celebrations";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://portakalcicegiwebsite.vercel.app";
  let databasePaths: string[] = [];
  try {
    const [categories, products] = await Promise.all([getCategories(), getProducts({ onlyActive: true })]);
    databasePaths = [...categories.map(item => `/koleksiyonlar/${item.slug}`), ...products.map(item => `/urunler/${item.slug}`)];
  } catch { /* Veritabanı yokken doğrulanmış sabit sayfalar listelenir. */ }
  const paths = ["", "/set-icerikleri", "/set-studyosu", "/gizlilik-politikasi", "/kullanim-kosullari", ...productGroups.map(group => `/urun-gruplari/${group.id}`), ...databasePaths];
  return Array.from(new Set(paths)).map(path => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "weekly", priority: path ? 0.8 : 1 }));
}
