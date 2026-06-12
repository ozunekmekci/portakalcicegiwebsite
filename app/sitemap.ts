import { getCategories, getProducts } from "@/lib/db-queries"
import { fallbackCollections } from "@/content/collections"
import { fallbackProducts } from "@/content/products"

export default async function sitemap() {
  let categories: any[] = []
  let products: any[] = []
  
  try {
    categories = await getCategories()
    products = await getProducts()
  } catch {
    categories = []
    products = []
  }

  const koleksiyonUrls = (categories.length > 0 ? categories : fallbackCollections).map(c => ({
    url: `https://portakalcicegiwebsite.vercel.app/koleksiyonlar/${c.slug || "babyshower"}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const urunUrls = (products.length > 0 ? products : fallbackProducts).map(p => ({
    url: `https://portakalcicegiwebsite.vercel.app/urunler/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [
    {
      url: "https://portakalcicegiwebsite.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...koleksiyonUrls,
    ...urunUrls,
  ]
}
