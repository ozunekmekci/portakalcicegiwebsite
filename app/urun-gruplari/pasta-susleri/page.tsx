import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { cakeCatalogPath, cakeSetImage, cakeSetPath, cakeSetTotal, setPosters } from "@/content/set-posters";
import styles from "@/components/sections/SetStudio.module.css";

const description = "Pasta, cupcake ve pipet süsü setlerine göz at. Bir set seçip içindeki parçaları ve kutlama masasında nasıl göründüklerini incele.";

export const metadata: Metadata = {
  title: "Pasta Süsü Setleri",
  description,
  alternates: { canonical: cakeCatalogPath },
  openGraph: { title: "Pasta Süsü Setleri", description, images: [cakeSetImage("pembe", "overview")] },
};

export default function CakeSetCatalog() {
  return (
    <div className={styles.studio}>
      <div className={styles.container}>
        <Link href="/#urunler" className={styles.backLink}><ArrowLeft size={16} aria-hidden="true" /> Ürünler</Link>
        <header className={styles.catalogHeading}>
          <p className={styles.eyebrow}>Portakal Çiçeği Atölye</p>
          <h1>Pasta süsü setleri</h1>
          <p>Bir tema seç; setin içindekilere ve kutlama masasında nasıl durduğuna bak.</p>
        </header>
        <div className={styles.catalogCount}>{setPosters.length} tema</div>
        <ul className={styles.catalogGrid}>
          {setPosters.map((set, index) => (
            <li key={set.id}>
              <Link href={cakeSetPath(set.id)} className={styles.catalogCard}>
                <div className={styles.catalogImage}>
                  <Image
                    src={cakeSetImage(set.id, "overview")}
                    alt=""
                    fill
                    priority={index < 2}
                    sizes="(max-width: 600px) 46vw, (max-width: 900px) 31vw, 23vw"
                  />
                </div>
                <div className={styles.catalogLabel}>
                  <div><h2>{set.title}</h2><p>{cakeSetTotal(set)} parça</p></div>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
