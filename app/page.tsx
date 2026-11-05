import type { Metadata } from "next";
import CelebrationHome from "@/components/celebration/CelebrationHome";

export const metadata: Metadata = {
  title: { absolute: "Portakal Çiçeği Atölye | Kutlamana özel tasarımlar" },
  description: "Kişiye özel magnet, kapı süsü ve fotoğraflı pasta süsleri. Ürünlere ve set içeriklerine göz at, beğendiklerin için bize yaz.",
  alternates: { canonical: "/" },
  openGraph: { title: "Portakal Çiçeği Atölye", description: "İsimli magnetler, kapı süsleri ve fotoğraflı pasta süsleri.", images: ["/images/celebrations/mihrimah-set.webp"], url: "https://portakalcicegiwebsite.vercel.app" },
};

export default function Home() { return <CelebrationHome />; }
