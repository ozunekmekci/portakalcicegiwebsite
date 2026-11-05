export interface SetPoster {
  id: string;
  title: string;
  image: string;
  alt: string;
  counts: { topper: number; picks: number; cupcakes: number; straws: number; card?: number };
}

const posters: SetPoster[] = [
  {
    id: "pembe",
    title: "Pembe Set",
    image: "/images/set-posters/pembe.webp",
    alt: "Pembe temalı kutlama seti afişi; büyük pasta süsü, şapkalı süsler, cupcake süsleri ve pipetler",
    counts: { topper: 1, picks: 10, cupcakes: 10, straws: 10 },
  },
  {
    id: "mavi",
    title: "Mavi Set",
    image: "/images/set-posters/mavi.webp",
    alt: "Mavi temalı kutlama seti afişi; büyük pasta süsü, şapkalı süsler, cupcake süsleri ve pipetler",
    counts: { topper: 1, picks: 10, cupcakes: 10, straws: 10 },
  },
  {
    id: "party",
    title: "Party Set",
    image: "/images/set-posters/party.webp",
    alt: "Party temalı kutlama seti afişi ve set içeriği",
    counts: { topper: 1, picks: 10, cupcakes: 10, straws: 10 },
  },
  {
    id: "magic",
    title: "Magic Set",
    image: "/images/set-posters/magic.webp",
    alt: "Magic temalı kutlama seti afişi ve set içeriği",
    counts: { topper: 1, picks: 7, cupcakes: 10, straws: 10, card: 1 },
  },
  {
    id: "paw-party",
    title: "Paw Party Set",
    image: "/images/set-posters/paw-party.webp",
    alt: "Paw Party temalı kutlama seti afişi ve set içeriği",
    counts: { topper: 1, picks: 13, cupcakes: 10, straws: 10 },
  },
  {
    id: "horror",
    title: "Horror Set",
    image: "/images/set-posters/horror.webp",
    alt: "Horror temalı kutlama seti afişi ve set içeriği",
    counts: { topper: 1, picks: 6, cupcakes: 10, straws: 10 },
  },
  {
    id: "peri-kizi",
    title: "Peri Kızı Seti",
    image: "/images/set-posters/peri-kizi.webp",
    alt: "Pembe peri kızı temalı kutlama seti afişi ve set içeriği",
    counts: { topper: 1, picks: 5, cupcakes: 10, straws: 10 },
  },
  {
    id: "pembe-kelebek",
    title: "Kelebekli Peri Kızı",
    image: "/images/set-posters/pembe-kelebek.webp",
    alt: "Kelebekli peri kızı temalı kutlama seti afişi ve set içeriği",
    counts: { topper: 1, picks: 6, cupcakes: 10, straws: 10 },
  },
  {
    id: "stardew-valley",
    title: "Stardew Valley Seti",
    image: "/images/set-posters/stardew-valley.webp",
    alt: "Stardew Valley temalı kutlama seti afişi ve set içeriği",
    counts: { topper: 2, picks: 6, cupcakes: 10, straws: 10 },
  },
  {
    id: "snowy",
    title: "Snowy Seti",
    image: "/images/set-posters/snowy.webp",
    alt: "Karlı kış temalı kutlama seti afişi ve set içeriği",
    counts: { topper: 1, picks: 7, cupcakes: 10, straws: 10 },
  },
  {
    id: "minecraft",
    title: "Minecraft Seti",
    image: "/images/set-posters/minecraft.webp",
    alt: "Minecraft temalı kutlama seti afişi ve set içeriği",
    counts: { topper: 1, picks: 9, cupcakes: 10, straws: 10 },
  },
  {
    id: "masa-ve-koca-ayi",
    title: "Maşa ve Koca Ayı Seti",
    image: "/images/set-posters/masa-ve-koca-ayi.webp",
    alt: "Maşa ve Koca Ayı temalı kutlama seti afişi ve set içeriği",
    counts: { topper: 1, picks: 5, cupcakes: 10, straws: 10 },
  },
];

export const cakeCatalogPath = "/urun-gruplari/pasta-susleri";

export function cakeSetPath(id: string) {
  return `${cakeCatalogPath}/${id}`;
}

const cakeSetParts = [
  { id: "topper", title: "Büyük pasta süsü", slide: 1 },
  { id: "picks", title: "Pasta kürdanı", slide: 1 },
  { id: "cupcakes", title: "Cupcake süsü", slide: 2 },
  { id: "straws", title: "Süslü pipet", slide: 3 },
  { id: "card", title: "Fotoğraflı kart", slide: 0 },
] as const;

export function getCakeSetParts(set: SetPoster) {
  return cakeSetParts.flatMap(part => {
    const count = set.counts[part.id];
    return count ? [{ ...part, count }] : [];
  });
}

export function cakeSetTotal(set: SetPoster) {
  return getCakeSetParts(set).reduce((total, part) => total + part.count, 0);
}

export function cakeSetImage(id: string, image: string) {
  return `/images/cake-sets/${id}/${image}.webp`;
}

export const setPosters = posters.map(set => ({
  ...set,
  included: getCakeSetParts(set).map(({ count, title }) => `${count} ${title.toLocaleLowerCase("tr")}`),
}));
