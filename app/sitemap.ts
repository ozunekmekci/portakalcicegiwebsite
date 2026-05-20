import { getCollections, getProducts } from "@/lib/notion"
import { fallbackCollections } from "@/content/collections"
import { fallbackProducts } from "@/content/products"
import { slugify } from "@/lib/utils"

export default async function sitemap() {
  let collections = fallbackCollections
  let products = fallbackProducts
  
  try {
    collections = await getCollections()
    products = await getProducts()
  } catch {}

  const koleksiyonUrls = collections.map(c => ({
    url: `https://portakalcicegiwebsite.vercel.app/koleksiyonlar/${slugify(c.kategori)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const urunUrls = products.map(p => ({
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
