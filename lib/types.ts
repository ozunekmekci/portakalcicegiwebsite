export type Collection = {
  id: string;
  isim: string;
  aciklama: string;
  kategori: string;
  gorselUrl: string;
  aktif: boolean;
};

export type Product = {
  id: string;
  slug: string;
  isim: string;
  koleksiyon: string;
  koleksiyonSlug: string;
  anaGorsel: string;
  ekGorseller: string[];
  fiyatAraligi: string;
  kisaAciklama: string;
  detayAciklama: string;
  minimumAdet: number;
  aktif: boolean;
};
