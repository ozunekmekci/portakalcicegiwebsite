import { Client } from "@notionhq/client";
import { driveUrlToDirectUrl } from "@/lib/utils";

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
  const response = await notion.databases.query({
    database_id: process.env.NOTION_PRODUCTS_DATABASE_ID!,
    filter: { property: "Aktif", checkbox: { equals: true } },
  })

  const products = response.results.map((page: any) => {
    const anaGorselRaw = page.properties["Ana Görsel"]?.url ?? ""
    const ekGorsellerRaw = page.properties["Ek Görseller"]?.rich_text?.[0]?.plain_text ?? ""
    const koleksiyonIsim = page.properties["Koleksiyon"]?.relation?.[0] 
      ? "bilinmiyor" // relation ID gelir, isim ayrıca çekilmeli
      : ""

    return {
      id: page.id,
      slug: page.properties["Slug"]?.rich_text?.[0]?.plain_text ?? "",
      isim: page.properties["İsim"]?.title?.[0]?.plain_text ?? "",
      koleksiyon: page.properties["Koleksiyon"]?.relation?.[0]?.id ?? "",
      koleksiyonSlug: page.properties["Koleksiyon Slug"]?.formula?.string ?? "",
      anaGorsel: driveUrlToDirectUrl(anaGorselRaw),
      ekGorseller: ekGorsellerRaw
        ? ekGorsellerRaw.split(",").map((u: string) => driveUrlToDirectUrl(u.trim()))
        : [],
      fiyatAraligi: page.properties["Fiyat Aralığı"]?.rich_text?.[0]?.plain_text ?? "",
      kisaAciklama: page.properties["Kısa Açıklama"]?.rich_text?.[0]?.plain_text ?? "",
      detayAciklama: page.properties["Detay Açıklama"]?.rich_text?.[0]?.plain_text ?? "",
      minimumAdet: page.properties["Minimum Adet"]?.number ?? 100,
      aktif: page.properties["Aktif"]?.checkbox ?? false,
    }
  })

  // Koleksiyon slug filtresi — Notion'dan koleksiyon adı çekilemediği için
  // slug eşleşmesini koleksiyon ID üzerinden yapacağız (5.2'de çözülür)
  return products
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts()
  return products.find(p => p.slug === slug) ?? null
}

