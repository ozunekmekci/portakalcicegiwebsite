import type { Metadata } from "next";
import CelebrationHome from "@/components/celebration/CelebrationHome";

export const metadata: Metadata = {
  title: { absolute: "Portakal Çiçeği Atölye | Kutlamana özel tasarımlar" },
  description: "Kişiye özel magnet, kapı süsü ve fotoğraflı pasta süsleri. Ürünleri kullanımda gör, uyumlu parçaları seç ve kutlaman için talep oluştur.",
  alternates: { canonical: "/" },
  openGraph: { title: "Portakal Çiçeği Atölye", description: "Kutlamanın her parçası sana özel.", images: ["/images/celebrations/mihrimah-set.webp"], url: "https://portakalcicegiwebsite.vercel.app" },
};

export default function Home() { return <CelebrationHome />; }
