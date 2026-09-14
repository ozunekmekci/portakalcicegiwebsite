import { MetadataRoute } from "next";
import { getCategories, getProducts } from "@/lib/db-queries";
import { fallbackCollections } from "@/content/collections";
import { fallbackProducts } from "@/content/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://portakalcicegiwebsite.vercel.app";
  let categories: any[] = [];
  let products: any[] = [];

  try {
    categories = await getCategories();
    products = await getProducts();
  } catch {
    categories = [];
    products = [];
  }

  const koleksiyonUrls = (categories.length > 0 ? categories : fallbackCollections).map((c) => ({
    url: `${baseUrl}/koleksiyonlar/${c.slug || "babyshower"}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const urunUrls = (products.length > 0 ? products : fallbackProducts).map((p) => ({
    url: `${baseUrl}/urunler/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/gizlilik-politikasi`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/kullanim-kosullari`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/tesekkur-ederiz`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];

  return [...staticPages, ...koleksiyonUrls, ...urunUrls];
}
