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
    <section className={styles.setIntro}><p className={styles.eyebrow}>Birlikte düşündüğümüz detaylar</p><h1>Kutlamana hangi parçalar eşlik etsin?</h1><p>Magnet ve kapı süsünü aynı isim ve renklerle bir araya getirebilir, fotoğraflı pasta süsleriyle ikram masanı tamamlayabilirsin. İstediğin ürünleri ayrı ayrı seçmen de mümkün.</p></section>
    <ProductGroupCards />
    <section id="tema-setleri" className={styles.posterSection}><h2>Fotoğraflı pasta süsü setleri</h2><p>Her temanın parçaları ve adetleri afişte yer alıyor. Büyütüp inceleyebilir, beğendiğin seti talebine ekleyebilirsin. İçerikler temaya göre değişir.</p><SetPosterGallery /></section>
    <section className={styles.experienceEnd}><h2>Aklında başka bir tema mı var?</h2><p>İsmi, kutlamanın tarihini ve düşündüğün renkleri paylaş. Hangi parçaları istediğini birlikte netleştirelim.</p><SelectProductLink products={[]} className={styles.textLink}>Kutlamanı anlat ↗</SelectProductLink></section>
    <div className="h-14" />
  </div></div>;
}
