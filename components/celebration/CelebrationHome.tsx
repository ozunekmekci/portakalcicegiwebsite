import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { productGroups } from "@/content/celebrations";
import { SelectProductLink } from "./InquiryContext";
import styles from "./Celebration.module.css";

export function ProductGroupCards() {
  return <div className={styles.groupGrid}>{productGroups.map((group, index) => <article className={styles.groupCard} key={group.id}>
    <Link href={`/urun-gruplari/${group.id}`} className={styles.groupImage}>
      <Image src={group.image} alt={group.title} fill sizes="(max-width: 700px) 90vw, 33vw" />
      <span className={styles.imageArrow}><ArrowUpRight size={20} /></span>
    </Link>
    <div className={styles.groupText}><span className={styles.index}>0{index + 1}</span><h3><Link href={`/urun-gruplari/${group.id}`}>{group.title}</Link></h3><p>{group.line}</p>
      <Link href={`/urun-gruplari/${group.id}`} className={styles.textLink}>Yakından bak <ArrowRight size={15} /></Link>
    </div>
  </article>)}</div>;
}

export default function CelebrationHome() {
  return <div className={styles.site}>
    <section className={`${styles.container} ${styles.hero}`} aria-labelledby="home-title">
      <div className={styles.heroCopy}><p className={styles.eyebrow}>Portakal Çiçeği Atölye</p>
        <h1 id="home-title">İsimli magnetler,<br />kapı süsleri ve<br /><em>pasta süsleri.</em></h1>
        <p className={styles.heroDescription}>Doğum günleri ve diğer kutlamalar için isimli ve fotoğraflı süsler hazırlıyoruz. Beğendiğin modelleri seçip bize yazabilirsin.</p>
        <div className={styles.actions}><Link href="#urunler" className={styles.primary}>Ürünlere bak <ArrowRight size={17} /></Link><Link href="/talep-olustur" className={styles.textLink}>Sipariş için bilgi al <ArrowUpRight size={16} /></Link></div>
        <div className={styles.heroFootnote}><span className={styles.smallFlower}>✳</span><span>İsim ve renk seçenekleri<br />için bize yazabilirsin.</span></div>
      </div>
      <div className={styles.heroComposition}>
        <div className={styles.heroPaper}><Image src="/images/celebrations/mihrimah-set.webp" alt="İsimli kapı süsü ve sepet içindeki uyumlu magnetler" fill priority sizes="(max-width: 900px) 80vw, 460px" /><span>İsimli kapı süsü ve magnetler</span></div>
        <Link href="/set-studyosu" className={styles.heroInset}><div><Image src="/images/celebrations/pink-cake.webp" alt="Pasta üzerindeki fotoğraflı büyük süs ve şapkalı kürdan topper kullanım örneği" fill priority sizes="(max-width: 900px) 32vw, 210px" /></div><span>Pasta üzerinde gör <ArrowUpRight size={14} /></span></Link>
        <span className={styles.heroHandwritten}>isimli kapı süsü<br />ve magnetler</span>
      </div>
    </section>

    <section id="urunler" className={`${styles.container} ${styles.productSection}`} aria-labelledby="products-title">
      <span id="koleksiyonlar" className={styles.anchor} />
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Atölyeden</p><h2 id="products-title">Ürünler</h2></div><p>Ürünleri tek tek veya set olarak sipariş edebilirsin.</p></div>
      <ProductGroupCards />
    </section>

    <section id="kutlamalar" className={styles.storySection} aria-labelledby="story-title">
      <div className={`${styles.container} ${styles.storyGrid}`}>
        <div className={styles.storyMedia}><video controls playsInline muted loop preload="none" poster="/images/celebrations/mihrimah-set.webp" aria-label="Kapı süsü ve magnetlerin birlikte sunumu"><source src="/videos/celebrations/mihrimah-set.mp4" type="video/mp4" />Tarayıcın videoyu desteklemiyor.</video><span>Bir arada kullanım</span></div>
        <div className={styles.storyCopy}><p className={styles.eyebrow}>Setler</p><h2 id="story-title">İsimli magnetler<br /><em>ve kapı süsleri</em></h2><p>Misafirlerine vereceğin magnetlerle kapı süsünü aynı isim, renk ve temayla hazırlayabiliriz.</p><p>Videoda örnek bir seti görebilirsin.</p>
          <div className={styles.storyTags}><Link href="/urun-gruplari/magnet">İsimli magnet</Link><Link href="/urun-gruplari/kapi-susu">Kapı süsü</Link></div>
          <SelectProductLink products={["magnet", "kapi-susu"]} className={styles.primary}>Magnet ve kapı süsünü seç <ArrowRight size={16} /></SelectProductLink>
        </div>
      </div>
    </section>

    <section id="hakkinda" className={`${styles.container} ${styles.studioTeaser}`} aria-labelledby="studio-title">
      <div className={styles.studioPhoto}><Image src="/images/celebrations/pink-pieces.webp" alt="Fotoğraflı büyük pasta süsü ile farklı şapkalı kürdan süslerinin bir arada görünümü" fill sizes="(max-width: 800px) 90vw, 500px" /><span>Kullanım örneklerinden</span></div>
      <div><p className={styles.eyebrow}>Pasta süsleri</p><h2 id="studio-title">Fotoğraflı<br /><em>pasta süsü setleri</em></h2><p>Pembe ve Mavi setlerin pastada ve ikramlarda nasıl göründüğüne bak. Setlerde hangi süslerden kaçar adet olduğunu da görebilirsin.</p><Link href="/set-studyosu" className={styles.primary}>Seti yakından incele <ArrowRight size={16} /></Link><Link href="/set-icerikleri" className={styles.textLink}>Diğer tema setlerine bak <ArrowUpRight size={15} /></Link></div>
    </section>

    <section id="surec" className={`${styles.container} ${styles.process}`} aria-labelledby="process-title"><span id="nasil-calisir" className={styles.anchor} />
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Sipariş öncesi</p><h2 id="process-title">Nasıl ilerliyoruz?</h2></div></div>
      <div className={styles.steps}>{[
        ["01", "Ürünleri seç", "Magnet, kapı süsü veya pasta süsü. İhtiyacın olan ürünleri talebine ekle."],
        ["02", "Kutlama bilgilerini yaz", "Kutlamanın tarihini, kullanılacak ismi ve düşündüğün renkleri yaz. Varsa beğendiğin bir örneği de paylaş."],
        ["03", "Detayları konuşalım", "Kaç adet istediğini ve tasarımın nasıl olacağını birlikte kararlaştıralım."],
      ].map(([number, title, text]) => <div key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
    </section>
    <section id="iletisim" className={styles.finalCta}><div className={styles.container}><p className={styles.eyebrow}>Portakal Çiçeği Atölye</p><h2>Sipariş vermek<br /><em>ister misin?</em></h2><p>İstediğin ürünleri seçip bize mesaj gönderebilirsin.</p><Link href="/talep-olustur" className={styles.primary}>Talebini oluştur <ArrowRight size={17} /></Link></div></section>
  </div>;
}
