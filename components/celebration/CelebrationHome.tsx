import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { productGroups } from "@/content/celebrations";
import { SelectProductLink } from "./InquiryContext";
import { PageReveals, SetPreview } from "./HomeInteractions";
import styles from "./Celebration.module.css";

const steps = [
  ["Ürünleri seç", "Magnet, kapı süsü veya pasta süsü. İhtiyacın olan ürünleri talebine ekle."],
  ["Kutlamanı anlat", "Tarihi, kullanılacak ismi ve düşündüğün renkleri yaz. Varsa beğendiğin bir örneği paylaş."],
  ["Detayları konuşalım", "Kaç adet istediğini ve tasarımın nasıl olacağını birlikte kararlaştıralım."],
];

export default function CelebrationHome() {
  return (
    <div className={styles.site}>
      <PageReveals />
      <section className={`${styles.container} ${styles.hero}`} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <h1 id="home-title" data-reveal>Kutlamana özel<br />tasarımlar</h1>
          <p data-reveal>İsimli magnet, kapı süsü ve fotoğraflı pasta süslerini kutlaman için hazırlıyoruz.</p>
          <div data-reveal><Link href="#urunler" className={styles.primary}>Ürünleri keşfet <ArrowRight size={18} /></Link></div>
        </div>
        <figure className={styles.heroFigure}>
          <div className={styles.heroImage}>
            <Image src="/images/celebrations/mihrimah-set.webp" alt="Mihrimah yazılı kapı süsü ve sepetteki uyumlu magnetler" fill priority sizes="(max-width: 700px) 92vw, 53vw" />
          </div>
          <figcaption>Mihrimah için hazırladığımız kapı süsü ve magnetler</figcaption>
        </figure>
      </section>

      <section id="urunler" className={`${styles.container} ${styles.productSection}`} aria-labelledby="products-title">
        <span id="koleksiyonlar" className={styles.anchor} />
        <div className={styles.sectionHeading}>
          <h2 id="products-title" data-reveal>Ürünler</h2>
          <p data-reveal>Tek tek seçebilir ya da aynı isim ve renklerle bir set hazırlatabilirsin.</p>
        </div>
        <div className={styles.groupGrid}>
          {productGroups.map(group => (
            <Link key={group.id} href={`/urun-gruplari/${group.id}`} className={styles.groupLink} data-reveal>
              <div className={styles.groupImage}><Image src={group.image} alt="" fill sizes="(max-width: 600px) 90vw, 33vw" /></div>
              <div className={styles.groupText}><h3>{group.title}</h3><ArrowUpRight aria-hidden="true" size={22} /><p>{group.line}</p></div>
            </Link>
          ))}
        </div>
      </section>

      <section id="hakkinda" className={styles.studioTeaser} aria-labelledby="studio-title">
        <div className={`${styles.container} ${styles.studioGrid}`}>
          <div className={styles.studioCopy}>
            <h2 id="studio-title" data-reveal>Fotoğraflı pasta süsleri</h2>
            <p data-reveal>Pembe ve Mavi setlerin her birinde 31 parça var. Pastadaki büyük süsten pipetlere kadar fotoğrafınla hazırlıyoruz.</p>
          </div>
          <SetPreview />
        </div>
      </section>

      <section id="kutlamalar" className={`${styles.container} ${styles.storyGrid}`} aria-labelledby="story-title">
        <div className={styles.storyCopy}>
          <h2 id="story-title" data-reveal>Aynı isim, iki hatıra</h2>
          <p data-reveal>Mihrimah setindeki gibi, misafirlerine vereceğin magnetlerle kapı süsünü aynı isim, renk ve temayla hazırlayabiliriz.</p>
          <div data-reveal><SelectProductLink products={["magnet", "kapi-susu"]} className={styles.primary}>Magnet ve kapı süsünü seç <ArrowRight size={16} /></SelectProductLink></div>
        </div>
        <video className={styles.storyVideo} data-reveal controls playsInline muted loop preload="none" poster="/images/celebrations/magnet-bulk.webp" aria-label="Mihrimah kapı süsü ve magnetlerinin birlikte sunumu">
          <source src="/videos/celebrations/mihrimah-set.mp4" type="video/mp4" />
          Tarayıcın videoyu desteklemiyor.
        </video>
      </section>

      <section id="surec" className={styles.process} aria-labelledby="process-title">
        <div className={`${styles.container} ${styles.processGrid}`}>
          <span id="nasil-calisir" className={styles.anchor} />
          <h2 id="process-title" data-reveal>Nasıl ilerliyoruz?</h2>
          <ol className={styles.steps}>{steps.map(([title, description]) => <li key={title} data-reveal><h3>{title}</h3><p>{description}</p></li>)}</ol>
        </div>
      </section>

      <section id="iletisim" className={styles.finalCta} aria-labelledby="contact-title">
        <div className={styles.container}>
          <h2 id="contact-title" data-reveal>Kutlamanı anlat</h2>
          <p data-reveal>Beğendiğin ürünleri ve kutlama detaylarını bize gönder.</p>
          <div data-reveal><Link href="/talep-olustur" className={styles.primary}>Talebini oluştur <ArrowRight size={17} /></Link></div>
        </div>
      </section>
    </div>
  );
}
