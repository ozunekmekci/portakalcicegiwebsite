import { Client } from "@notionhq/client";

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
