import { Client } from "@notionhq/client";
import { driveUrlToDirectUrl, slugify } from "@/lib/utils";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  fetch: (url, options) => {
    return fetch(url, {
      ...options,
      cache: "no-store",
    });
  },
});

export type Collection = {
  id: string;
  isim: string;
  aciklama: string;
  kategori: string;
  gorselUrl: string;
  aktif: boolean;
};

export async function getCollections(): Promise<Collection[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: { property: "Aktif", checkbox: { equals: true } },
  });

  return response.results.map((page: any) => ({
    id: page.id,
    isim: page.properties["İsim"]?.title?.[0]?.plain_text ?? "",
    aciklama: page.properties["Açıklama"]?.rich_text?.[0]?.plain_text ?? "",
    kategori: page.properties["Kategori"]?.select?.name ?? "",
    gorselUrl: page.properties["Görsel URL"]?.url ?? "",
    aktif: page.properties["Aktif"]?.checkbox ?? false,
  }));
}

export type Product = {
  id: string
  slug: string
  isim: string
  koleksiyon: string
  koleksiyonSlug: string
  anaGorsel: string
  ekGorseller: string[]
  fiyatAraligi: string
  kisaAciklama: string
  detayAciklama: string
  minimumAdet: number
  aktif: boolean
}

export async function getProducts(koleksiyonSlug?: string): Promise<Product[]> {
  let collections: Collection[] = []
  try {
    collections = await getCollections()
  } catch (e) {
    console.error("Failed to fetch collections in getProducts:", e)
  }

  const collectionMap = new Map<string, Collection>()
  collections.forEach(c => {
    const normalizedId = c.id.replace(/-/g, "")
    collectionMap.set(normalizedId, c)
  })

  const response = await notion.databases.query({
    database_id: process.env.NOTION_PRODUCTS_DATABASE_ID!,
    filter: { property: "Aktif", checkbox: { equals: true } },
  })

  const products = response.results.map((page: any) => {
    const anaGorselRaw = page.properties["Ana Görsel"]?.url ?? ""
    const ekGorsellerRaw = page.properties["Ek Görseller"]?.rich_text?.[0]?.plain_text ?? ""
    
    const relationId = page.properties["Koleksiyon"]?.relation?.[0]?.id?.replace(/-/g, "") ?? ""
    const relatedCollection = relationId ? collectionMap.get(relationId) : null
    
    const koleksiyonIsim = relatedCollection ? relatedCollection.isim : ""
    const resolvedKoleksiyonSlug = relatedCollection ? slugify(relatedCollection.kategori) : ""

    let finalAnaGorsel = driveUrlToDirectUrl(anaGorselRaw)
    let finalEkGorseller: string[] = ekGorsellerRaw
      ? ekGorsellerRaw.split(",").map((u: string) => driveUrlToDirectUrl(u.trim())).filter(Boolean)
      : []

    const isPlaceholder = (url: string) => !url || url.includes("EXAMPLE_") || url.includes("placeholder")

    // Filter out placeholders from ekGorseller
    finalEkGorseller = finalEkGorseller.filter((url: string) => !isPlaceholder(url))

    if (isPlaceholder(finalAnaGorsel)) {
      if (finalEkGorseller.length > 0) {
        finalAnaGorsel = finalEkGorseller[0]
      } else {
        finalAnaGorsel = ""
      }
    }

    return {
      id: page.id,
      slug: page.properties["Slug"]?.rich_text?.[0]?.plain_text ?? "",
      isim: page.properties["İsim"]?.title?.[0]?.plain_text ?? "",
      koleksiyon: koleksiyonIsim,
      koleksiyonSlug: resolvedKoleksiyonSlug,
      anaGorsel: finalAnaGorsel,
      ekGorseller: finalEkGorseller,
      fiyatAraligi: page.properties["Fiyat Aralığı"]?.rich_text?.[0]?.plain_text ?? "",
      kisaAciklama: page.properties["Kısa Açıklama"]?.rich_text?.[0]?.plain_text ?? "",
      detayAciklama: page.properties["Detay Açıklama"]?.rich_text?.[0]?.plain_text ?? "",
      minimumAdet: page.properties["Minimum Adet"]?.number ?? 100,
      aktif: page.properties["Aktif"]?.checkbox ?? false,
    }
  })

  if (koleksiyonSlug) {
    const normalize = (s: string) => s.toLowerCase().replace(/-/g, "")
    return products.filter(p => normalize(p.koleksiyonSlug) === normalize(koleksiyonSlug))
  }

  return products
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts()
  return products.find(p => p.slug === slug) ?? null
}

