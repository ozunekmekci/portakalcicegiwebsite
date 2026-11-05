import type { Metadata } from "next";
import SetPosterGallery from "@/components/sections/SetPosterGallery";
import { ProductGroupCards } from "@/components/celebration/CelebrationHome";
import { SelectProductLink } from "@/components/celebration/InquiryContext";
import styles from "@/components/celebration/Celebration.module.css";

export const metadata: Metadata = {
  title: "Kutlama setleri ve içerikleri",
  description: "Magnet, kapı süsü ve pasta süslerini kutlamana göre birlikte seç. Fotoğraflı pasta süsü setlerinin parçalarını ve adetlerini incele.",
  alternates: { canonical: "/set-icerikleri" },
  openGraph: { title: "Kutlama setleri | Portakal Çiçeği Atölye", images: ["/images/celebrations/mihrimah-set.webp"] },
};

export default function SetContentsPage() {
  return <div className={styles.site}><div className={styles.container}>
    <section className={styles.setIntro}><p className={styles.eyebrow}>Kutlama setleri</p><h1>Kutlama setleri ve ürünler</h1><p>Magnet ve kapı süsünü aynı isim ve renklerle hazırlayabiliriz. Pasta ve ikramlar için de fotoğraflı süsler seçebilirsin. Her ürünü ayrı ayrı istemen de mümkün.</p></section>
    <ProductGroupCards />
    <section id="tema-setleri" className={styles.posterSection}><h2>Fotoğraflı pasta süsü setleri</h2><p>Setlerde hangi süsten kaçar adet olduğunu afişlerde görebilirsin. Beğendiğin temayı büyütüp incele, ardından talebine ekle. Her setin içeriği farklı olabilir.</p><SetPosterGallery /></section>
    <section className={styles.experienceEnd}><h2>Farklı bir tema mı arıyorsun?</h2><p>Kullanılacak ismi, kutlama tarihini ve düşündüğün renkleri yaz. İstediğin süsleri birlikte seçelim.</p><SelectProductLink products={[]} className={styles.textLink}>Sipariş için bilgi al ↗</SelectProductLink></section>
    <div className="h-14" />
  </div></div>;
}
