import type { Metadata } from "next";
import SetPosterGallery from "@/components/sections/SetPosterGallery";
import Link from "next/link";
import { PageReveals } from "@/components/celebration/HomeInteractions";
import { SelectProductLink } from "@/components/celebration/InquiryContext";
import styles from "@/components/celebration/Celebration.module.css";

export const metadata: Metadata = {
  title: "Kutlama setleri ve içerikleri",
  description: "Magnet, kapı süsü ve pasta süslerini kutlamana göre birlikte seç. Fotoğraflı pasta süsü setlerinin parçalarını ve adetlerini incele.",
  alternates: { canonical: "/set-icerikleri" },
  openGraph: { title: "Kutlama setleri | Portakal Çiçeği Atölye", images: ["/images/celebrations/mihrimah-set.webp"] },
};

export default function SetContentsPage() {
  return <div className={styles.site}><PageReveals /><div className={styles.container}>
    <div className={styles.setIntro}><h1 data-reveal>Set içerikleri</h1><p data-reveal>Fotoğraflı pasta ve ikram süsleri için bir tema seç. Her sette hangi süsten kaçar adet olduğunu inceleyebilirsin.</p></div>
    <section id="tema-setleri" className={styles.posterSection} aria-labelledby="themes-title"><h2 id="themes-title" data-reveal>Bir tema seç</h2><SetPosterGallery /></section>
    <section className={styles.experienceEnd}><h2>Farklı bir tema mı arıyorsun?</h2><p>Kullanılacak ismi, kutlama tarihini ve düşündüğün renkleri yaz. İstediğin süsleri birlikte seçelim.</p><SelectProductLink products={[]} className={styles.textLink}>Sipariş için bilgi al ↗</SelectProductLink><Link href="/#urunler" className={styles.textLink}>Magnet ve kapı süslerine de bak ↗</Link></section>
  </div></div>;
}
