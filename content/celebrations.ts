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
    id: "magnet", title: groupLabels.magnet, line: "Kutlamadan kalan küçük bir hatıra.",
    description: "Bebeğinin adı, seçtiğin renkler ve kutlamanın teması bir magnetin üzerinde buluşsun. Tek bir ürünü yakından, siparişin tamamını birlikte incele.",
    image: "/images/celebrations/magnet-detail.webp", detailImage: "/images/celebrations/magnet-detail.webp",
    useImage: "/images/celebrations/magnet-bulk.webp", video: "/videos/celebrations/mihrimah-set.mp4", location: "Konuklarına ayırdığın hatıralarda",
    details: ["İsim ve kutlama temasına göre tasarım", "Tekil ürün ve toplu sunum", "İhtiyacına göre birlikte netleştirilen adet"],
  },
  {
    id: "kapi-susu", title: groupLabels["kapi-susu"], line: "Kutlamanın ilk karşılaması.",
    description: "İsimli kapı süsünü, kutlamanın renklerine ve diğer parçalarına uyarlayalım. Mihrimah için hazırlanan pembe, ay ve güneş detaylı tasarımı yakından görebilirsin.",
    image: "/images/celebrations/door-detail.webp", detailImage: "/images/celebrations/door-detail.webp",
    useImage: "/images/celebrations/mihrimah-set.webp", video: "/videos/celebrations/door.mp4", location: "Kutlamanın girişinde",
    details: ["Kişiye özel isim detayı", "Renk ve tema uyumu", "Magnetlerle birlikte tasarlanabilen görünüm"],
  },
  {
    id: "pasta-susleri", title: groupLabels["pasta-susleri"], line: "Pastanın üzerinde senin hikâyen.",
    description: "Fotoğraflı büyük pasta süsü, şapkalı kürdanlar ve küçük ikram detayları. Seti pasta üzerinde gör, sonra parçaları ayrı ayrı incele.",
    image: "/images/celebrations/pink-cake.webp", detailImage: "/images/celebrations/pink-pieces.webp",
    useImage: "/images/celebrations/blue-cake.webp", location: "Pasta ve ikram masasında",
    details: ["Fotoğrafına göre hazırlanan süsler", "Büyük süs ve küçük tamamlayıcı parçalar", "Temaya göre değişen set içerikleri"],
  },
];
