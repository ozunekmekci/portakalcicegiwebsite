import { groupLabels, type GroupId } from "@/lib/inquiry";

export interface ProductGroup {
  id: GroupId;
  title: string;
  line: string;
  description: string;
  image: string;
  detailImage: string;
  video?: string;
  useImage: string;
  location: string;
  details: string[];
}

export const productGroups: ProductGroup[] = [
  {
    id: "magnet", title: groupLabels.magnet, line: "İsimli hatıra magnetleri",
    description: "Magnetlerini istediğin isim, renk ve temayla hazırlayalım. Fotoğraflarda hem tek bir magneti hem de toplu halini görebilirsin.",
    image: "/images/celebrations/magnet-detail.webp", detailImage: "/images/celebrations/magnet-detail.webp",
    useImage: "/images/celebrations/magnet-bulk.webp", video: "/videos/celebrations/mihrimah-set.mp4", location: "Misafirlerine vermek için",
    details: ["İsim ve kutlama temasına göre tasarım", "Tek tek veya bir arada sunum", "İhtiyacına göre adet seçimi"],
  },
  {
    id: "kapi-susu", title: groupLabels["kapi-susu"], line: "İsimli kapı süsleri",
    description: "Kapı süsünü istediğin isimle, kutlamanın renklerine uygun hazırlayalım. Dilersen magnetlerle aynı tasarımı kullanabiliriz.",
    image: "/images/celebrations/door-detail.webp", detailImage: "/images/celebrations/door-detail.webp",
    useImage: "/images/celebrations/mihrimah-set.webp", video: "/videos/celebrations/door.mp4", location: "Kutlamanın girişinde",
    details: ["Kişiye özel isim detayı", "Renk ve tema uyumu", "Magnetlerle uyumlu tasarım"],
  },
  {
    id: "pasta-susleri", title: groupLabels["pasta-susleri"], line: "Fotoğraflı pasta ve ikram süsleri",
    description: "Fotoğrafınla hazırlanan büyük pasta süsü, şapkalı kürdanlar ve ikram süsleri. Pastanın üzerinde nasıl göründüklerine bakabilir, setin içeriğini inceleyebilirsin.",
    image: "/images/celebrations/pink-cake.webp", detailImage: "/images/celebrations/pink-pieces.webp",
    useImage: "/images/celebrations/blue-cake.webp", location: "Pasta ve ikram masasında",
    details: ["Fotoğrafına göre hazırlanan süsler", "Büyük pasta süsü ve küçük ikram süsleri", "Temaya göre değişen set içerikleri"],
  },
];
